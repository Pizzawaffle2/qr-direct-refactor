// app/api/user/social-links/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSession } from '@auth0/nextjs-auth0';

export async function PUT(req: Request) {
  try {
    const session = await getSession();
    if (!session?.user) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const data = await req.json();
    const user = await prisma.user.findUnique({
      where: { auth0Id: session.user.sub },
    });

    if (!user) {
      return new NextResponse('User not found', { status: 404 });
    }

    const socialLinks = await prisma.socialLinks.upsert({
      where: { userId: user.id },
      update: {
        twitter: data.twitter,
        linkedin: data.linkedin,
        github: data.github,
        website: data.website,
      },
      create: {
        userId: user.id,
        twitter: data.twitter,
        linkedin: data.linkedin,
        github: data.github,
        website: data.website,
      },
    });

    return NextResponse.json(socialLinks);
  } catch (error) {
    console.error('Error updating social links:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}