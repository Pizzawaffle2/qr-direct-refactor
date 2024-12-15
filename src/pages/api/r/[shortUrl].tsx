// src/pages/api/r/[shortUrl].ts
import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { getGeolocation } from '@/services/geolocation';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { shortUrl } = req.query;
  const { password } = req.body;

  try {
    const link = await prisma.link.findUnique({
      where: { shortUrl: String(shortUrl) }
    });

    if (!link || !link.isActive) {
      return res.status(404).json({ message: 'Link not found or inactive' });
    }

    // Check expiration
    if (link.expiresAt && link.expiresAt < new Date()) {
      await prisma.link.update({
        where: { id: link.id },
        data: { isActive: false }
      });
      return res.status(410).json({ message: 'Link has expired' });
    }

    // Check password if required
    if (link.password) {
      if (!password) {
        return res.status(401).json({ 
          message: 'Password required', 
          isPasswordProtected: true 
        });
      }

      const isValidPassword = await bcrypt.compare(password, link.password);
      if (!isValidPassword) {
        return res.status(401).json({ message: 'Invalid password' });
      }
    }

    // Record analytics
    await prisma.click.create({
      data: {
        linkId: link.id,
        ipAddress: req.headers['x-forwarded-for']?.toString() || null,
        userAgent: req.headers['user-agent'] || null,
        referer: req.headers['referer'] || null,
        // You might want to use a geolocation service here
        country: null,
        city: null
      }
    });

    return res.status(200).json({ redirectUrl: link.originalUrl });

  } catch (error) {
    console.error('Error processing redirect:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}