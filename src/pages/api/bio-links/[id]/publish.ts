import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from '@auth0/nextjs-auth0';
import { prisma } from '../../../../lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'PUT') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  // Get Auth0 session
  const session = await getSession(req, res);
  if (!session?.user) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const { id } = req.query;
    const bioPage = await prisma.bioPage.update({
      where: {
        id: String(id),
        userId: session.user.sub // Auth0 uses 'sub' for user ID
      },
      data: { isPublished: true }
    });

    return res.status(200).json(bioPage);
  } catch (error) {
    console.error('Error publishing bio page:', error);
    return res.status(500).json({ message: 'Failed to publish bio page' });
  }
}