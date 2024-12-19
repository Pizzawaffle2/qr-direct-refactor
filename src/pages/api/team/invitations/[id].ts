import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma';
import { getSession } from '@auth0/nextjs-auth0';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession(req, res);

  if (!session?.user) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const { id } = req.query;

  switch (req.method) {
    case 'DELETE': {
      try {
        await prisma.invitation.delete({ where: { id: id as string } });
        return res.status(204).end();
      } catch (error) {
        console.error('Error deleting invitation:', error);
        return res.status(500).json({ message: 'Internal server error' });
      }
    }
    case 'POST': {
      // Resend logic here
      try {
        const updatedInvitation = await prisma.invitation.update({
          where: { id: id as string },
          data: { lastResent: new Date(), resendCount: { increment: 1 } },
        });
        return res.status(200).json(updatedInvitation);
      } catch (error) {
        console.error('Error resending invitation:', error);
        return res.status(500).json({ message: 'Internal server error' });
      }
    }
    default:
      res.setHeader('Allow', ['DELETE', 'POST']);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
