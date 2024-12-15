// src/pages/api/shorten-link.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import { nanoid } from 'nanoid';

const prisma = new PrismaClient();
const BASE_URL = 'https://Nodikam.com';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { url, alias } = req.body;
    console.log('Received request:', { url, alias });

    if (!url) {
      return res.status(400).json({ message: 'URL is required' });
    }

    // Generate short URL
    const shortUrl = alias || nanoid(8);
    console.log('Generated shortUrl:', shortUrl);

    // Create link in database
    const link = await prisma.link.create({
      data: {
        originalUrl: url,
        shortUrl,
      },
    });
    console.log('Created link:', link);

    // Construct response with new domain
    const response = {
      shortenedUrl: shortUrl,
      originalUrl: url,
      fullUrl: `${BASE_URL}/${shortUrl}`
    };
    console.log('Sending response:', response);

    return res.status(200).json(response);

  } catch (error) {
    console.error('Error in link shortener:', error);
    return res.status(500).json({ message: 'Failed to shorten link' });
  }
}