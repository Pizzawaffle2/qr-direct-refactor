import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma';
import { getSession } from '@auth0/nextjs-auth0';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession(req, res);

  if (!session?.user) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  if (req.method === 'POST') {
    const { email, role } = req.body;

    if (!email || !role) {
      return res.status(400).json({ message: 'Email and role are required' });
    }

    try {
      const existingInvitation = await prisma.invitation.findUnique({
        where: { email },
      });

      if (existingInvitation) {
        return res.status(409).json({ message: 'An invitation already exists for this email' });
      }

      const invitation = await prisma.invitation.create({
        data: {
          teamId: session.user.teamId, // Adjust this logic as per your schema
          email,
          role,
          invitedBy: session.user.email,
          expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
        },
      });

      // TODO: Add logic to send an email invitation using your preferred service

      return res.status(201).json(invitation);
    } catch (error) {
      console.error('Error sending invitation:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  res.setHeader('Allow', ['POST']);
  return res.status(405).end(`Method ${req.method} Not Allowed`);
}
