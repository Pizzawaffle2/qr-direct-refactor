// src/app/[shortUrl]/page.tsx
import { redirect } from 'next/navigation';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function RedirectPage({
  params
}: {
  params: { shortUrl: string }
}) {
  const { shortUrl } = params;

  try {
    // Find the link in the database
    const link = await prisma.link.findUnique({
      where: { shortUrl }
    });

    // If link exists and is active, redirect to original URL
    if (link && link.isActive) {
      redirect(link.originalUrl);
    }

    // If link doesn't exist or is inactive, redirect to 404 or home
    redirect('/');
  } catch (error) {
    console.error('Error during redirect:', error);
    redirect('/');
  }
}