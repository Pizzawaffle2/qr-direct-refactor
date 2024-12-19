// src/pages/api/team/members.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma';
import { getSession } from '@auth0/nextjs-auth0';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession(req, res);

  if (!session?.user) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const { method } = req;

  switch (method) {
    case 'GET': {
      try {
        const members = await prisma.teamMember.findMany({
          where: { teamId: session.user.teamId }, // Replace with actual user/team logic
        });
        return res.status(200).json(members);
      } catch (error) {
        console.error('Error fetching team members:', error);
        return res.status(500).json({ message: 'Internal server error' });
      }
    }
    default:
      res.setHeader('Allow', ['GET']);
      return res.status(405).end(`Method ${method} Not Allowed`);
  }
}
