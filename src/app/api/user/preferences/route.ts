// app/api/user/preferences/route.ts
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

    const preferences = await prisma.userPreferences.upsert({
      where: { userId: user.id },
      update: {
        defaultQRColor: data.defaultQRColor,
        defaultQRSize: data.defaultQRSize,
        defaultQRBackground: data.defaultQRBackground,
        defaultQRLogo: data.defaultQRLogo,
      },
      create: {
        userId: user.id,
        defaultQRColor: data.defaultQRColor,
        defaultQRSize: data.defaultQRSize,
        defaultQRBackground: data.defaultQRBackground,
        defaultQRLogo: data.defaultQRLogo,
      },
    });

    return NextResponse.json(preferences);
  } catch (error) {
    console.error('Error updating preferences:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}