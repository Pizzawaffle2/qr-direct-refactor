// src\app\api\s\[slug]\route.ts
import { prisma } from "../../../../lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: { params: { slug: string } }) {
  const { slug } = params;

  const shortLink = await prisma.shortLink.findUnique({
    where: { slug },
  });

  if (!shortLink) {
    return NextResponse.redirect("/404", 404);
  }

  // Optionally, log the scan
  await prisma.scanLog.create({
    data: {
      slug,
      timestamp: new Date(),
    },
  });

  return NextResponse.redirect(shortLink.destination);
}
