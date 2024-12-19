// src\app\api\qr-codes\route.ts
import { prisma } from "../../../lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { content, destination, color, background, logo, userId } = await req.json();

  const slug = Math.random().toString(36).substring(2, 8); // Generate a unique slug

  const qrCode = await prisma.qRCode.create({
    data: {
      content,
      slug,
      destination,
      color,
      background,
      logo,
      userId,
    },
  });

  return NextResponse.json({ qrCode });
}

export async function GET() {
    const qrCodes = await prisma.qRCode.findMany();
    return NextResponse.json(qrCodes);
  }
  