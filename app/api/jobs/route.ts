import { jobs } from "@/public/files/jobs";
import { NextResponse } from "next/server";

export async function GET() {
  const data = jobs;

  return new NextResponse(JSON.stringify(data), {
    status: 200,
  });
}
