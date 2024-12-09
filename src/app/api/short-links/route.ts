import { prisma } from "../../../lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { destination } = await req.json();

  if (!destination) {
    return NextResponse.json({ error: "Destination URL is required" }, { status: 400 });
  }

  // Generate a random slug
  const slug = Math.random().toString(36).substring(2, 8);

  const shortLink = await prisma.shortLink.create({
    data: {
      slug,
      destination,
    },
  });

  return NextResponse.json({ shortLink });
}

export async function PUT(req: Request) {
  const { slug, destination } = await req.json();

  if (!slug || !destination) {
    return NextResponse.json({ error: "Slug and destination are required" }, { status: 400 });
  }

  const updatedLink = await prisma.shortLink.update({
    where: { slug },
    data: { destination },
  });

  return NextResponse.json({ updatedLink });
}
