import { ProjectSchema } from "@/public/files/projects";
import axios from "axios";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { project: string } }
) {
  try {
    // Assuming `params.project` holds the project ID
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
    const response = await axios.get<ProjectSchema[]>(
      `${baseUrl}/api/projects`
    );

    // Find the specific project based on the ID
    const project = response.data.find((p) => p.p_id === params.project);

    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    return NextResponse.json(project);
  } catch (error) {
    console.error("Error fetching project:", error);
    return NextResponse.json(
      { error: "Failed to fetch project" },
      { status: 500 }
    );
  }
}
