// src/pages/api/bio-links/[id]/index.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from '@auth0/nextjs-auth0';
import { prisma } from '../../../../lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession(req, res);
  if (!session?.user) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const { id } = req.query;
  const userId = session.user.sub; // Auth0 user ID

  switch (req.method) {
    case 'GET':
      try {
        const bioPage = await prisma.bioPage.findUnique({
          where: {
            id: String(id),
            userId: userId
          }
        });

        if (!bioPage) {
          return res.status(404).json({ message: 'Bio page not found' });
        }

        return res.status(200).json(bioPage);
      } catch (error) {
        console.error('Error fetching bio page:', error);
        return res.status(500).json({ message: 'Failed to fetch bio page' });
      }

    case 'PUT':
      try {
        const { name, bio, theme, links } = req.body;

        const bioPage = await prisma.bioPage.update({
          where: {
            id: String(id),
            userId: userId
          },
          data: {
            name,
            bio,
            theme,
            links,
            updatedAt: new Date()
          }
        });

        return res.status(200).json(bioPage);
      } catch (error) {
        console.error('Error updating bio page:', error);
        return res.status(500).json({ message: 'Failed to update bio page' });
      }

    case 'DELETE':
      try {
        await prisma.bioPage.delete({
          where: {
            id: String(id),
            userId: userId
          }
        });

        return res.status(204).end();
      } catch (error) {
        console.error('Error deleting bio page:', error);
        return res.status(500).json({ message: 'Failed to delete bio page' });
      }

    default:
      res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
      return res.status(405).json({ message: `Method ${req.method} Not Allowed` });
  }
}