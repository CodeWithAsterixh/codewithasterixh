import { educations } from "@/public/files/education";
import { NextResponse } from "next/server";

export async function GET() {
  const data = educations;

  return new NextResponse(JSON.stringify(data), {
    status: 200,
  });
}
