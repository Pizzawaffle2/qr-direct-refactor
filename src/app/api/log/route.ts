// src\app\api\log\route.ts

import { NextResponse } from "next/server";

const logs: Record<string, number> = {};

export async function POST(req: Request) {
  const { qrId } = await req.json();
  logs[qrId] = (logs[qrId] || 0) + 1;
  return NextResponse.json({ success: true, count: logs[qrId] });
}

export async function GET() {
  return NextResponse.json({ logs });
}
