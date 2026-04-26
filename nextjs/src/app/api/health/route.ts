import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    status: "ok",
    checkedAt: new Date().toISOString(),
    region: process.env.VERCEL_REGION ?? "local",
  });
}
