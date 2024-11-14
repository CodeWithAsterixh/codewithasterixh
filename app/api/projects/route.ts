import { projectsData } from "@/public/files/projects";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const data = projectsData.sort(
    (a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
  );
  
  const { searchParams } = new URL(req.url);
  const amount = searchParams.get("amount");
  const id = searchParams.get("id");

  // If both `id` and `amount` are provided, return the project for `id` and ignore `amount`
  if (id && amount) {
    const project = data.find(p => p.p_id === id);
    if (project) {
      return new NextResponse(JSON.stringify(project), {
        status: 200,
      });
    }
    // If no project is found for the given `id`
    return new NextResponse(JSON.stringify({ error: "Project not found" }), {
      status: 404,
    });
  }

  // If `id` is specified, return only the project for `id`
  if (id) {
    const project = data.find(p => p.p_id === id);
    if (project) {
      return new NextResponse(JSON.stringify(project), {
        status: 200,
      });
    }
    // If no project is found for the given `id`
    return new NextResponse(JSON.stringify({ error: "Project not found" }), {
      status: 404,
    });
  }

  // If `amount` is specified but not `id`, return the top `amount` items
  if (amount) {
    const numberAmount = parseInt(amount, 10);

    if (isNaN(numberAmount) || numberAmount <= 0) {
      return new NextResponse(JSON.stringify([]), {
        status: 400,
      });
    }

    const datas = data.slice(0, numberAmount);
    return new NextResponse(JSON.stringify(datas), {
      status: 200,
    });
  }

  // If neither `id` nor `amount` is specified, return all data
  return new NextResponse(JSON.stringify(data), {
    status: 200,
  });
}