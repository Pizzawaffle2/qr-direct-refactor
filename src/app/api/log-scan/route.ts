import { NextResponse } from "next/server";

const scanLogs: Record<string, number> = {};

export async function POST(req: Request) {
  const { qrId } = await req.json();

  if (!qrId) {
    return NextResponse.json({ error: "QR ID is required" }, { status: 400 });
  }

  scanLogs[qrId] = (scanLogs[qrId] || 0) + 1;

  return NextResponse.json({ success: true, count: scanLogs[qrId] });
}

export async function GET() {
  return NextResponse.json({ logs: scanLogs });
}
