import { z } from "zod";

export const livePreviewRequestSchema = z.object({
  projectSlug: z.string().min(1, "Project is required"),
  email: z.string().email("Please enter a valid email address"),
});

export type LivePreviewRequestData = z.infer<typeof livePreviewRequestSchema>;
