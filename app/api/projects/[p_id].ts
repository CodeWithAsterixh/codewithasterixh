import { ProjectSchema } from "@/public/files/projects";
import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

// GET handler for fetching project by project ID
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
    const { p_id } = req.query;

    // Fetch all projects from the base URL
    const response = await axios.get<ProjectSchema[]>(`${baseUrl}/api/projects`);

    // Find the project matching the requested project ID
    const project = response.data.find((p) => p.p_id === p_id);

    if (!project) {
      // Return a 404 response if the project is not found
      return res.status(404).json({ error: "Project not found" });
    }

    // Return the project details as a JSON response
    return res.status(200).json(project);
  } catch (error) {
    // Return a 500 error response if an exception occurs during the fetch
    console.error("Error fetching project:", error);
    return res.status(500).json({ error: `Failed to fetch project: ${error}` });
  }
}