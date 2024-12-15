import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from '@auth0/nextjs-auth0';
import { prisma } from '../../../lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession(req, res);
  if (!session?.user) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const userId = session.user.sub; // Auth0 user ID

  switch (req.method) {
    case 'POST':
      try {
        const { name, bio, theme, links } = req.body;
        
        const bioPage = await prisma.bioPage.create({
          data: {
            userId,
            name,
            bio,
            theme,
            links,
            isPublished: false,
          }
        });

        return res.status(201).json(bioPage);
      } catch (error) {
        console.error('Error creating bio page:', error);
        return res.status(500).json({ message: 'Failed to create bio page' });
      }
      
    case 'GET':
      try {
        const bioPages = await prisma.bioPage.findMany({
          where: { userId },
          orderBy: { updatedAt: 'desc' }
        });
        
        return res.status(200).json(bioPages);
      } catch (error) {
        console.error('Error fetching bio pages:', error);
        return res.status(500).json({ message: 'Failed to fetch bio pages' });
      }

    default:
      res.setHeader('Allow', ['POST', 'GET']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}