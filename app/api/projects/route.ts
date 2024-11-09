import { projectsData } from "@/public/files/projects";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const data = projectsData.sort(
    (a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
  );
  const { searchParams } = new URL(req.url);
  const amount = searchParams.get("amount");

  if (!amount) {
    return new NextResponse(JSON.stringify(data.reverse()), {
      status: 200,
    });
  }

  const numberAmount = parseInt(amount);

  if (typeof numberAmount !== "number") {
    return new NextResponse(JSON.stringify([]), {
      status: 400,
    });
  }
  const datas = data.slice(0, numberAmount);
  return new NextResponse(JSON.stringify(datas), {
    status: 200,
  });
}
