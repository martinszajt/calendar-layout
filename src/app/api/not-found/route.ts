import { NextResponse } from "next/server";

export function GET() {
  return NextResponse.json("Not Found", { status: 404 });
}

export function POST() {
  return NextResponse.json("Not Found", { status: 404 });
}
