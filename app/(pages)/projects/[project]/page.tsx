import { ProjectSchema } from "@/public/files/projects";
import Project from "@/ui/components/Project/Project";
import axios, { AxiosResponse } from "axios";

export async function generateStaticParams() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

  const projects: AxiosResponse<ProjectSchema[]> = await axios.get(
    `${baseUrl}/api/projects`
  );

  return projects.data.map((project) => ({
    project: project.p_id,
  }));
}

export default async function Page({
  params,
}: {
  params: Promise<{ project: string }>;
}) {
  const { project } = await params;
  // ...

  return (
    <div>
      <Project p_id={project} />
    </div>
  );
}
