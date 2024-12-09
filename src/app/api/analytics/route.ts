import { prisma } from "../../../lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const logs = await prisma.scanLog.groupBy({
    by: ["slug"],
    _count: {
      slug: true,
    },
  });

  return NextResponse.json({ logs });
}
