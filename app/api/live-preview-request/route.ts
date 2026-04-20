import { NextRequest, NextResponse } from "next/server";
import projectsData from "@/data/projects.json";
import { formatLivePreviewConfirmation } from "@/features/email/lib/formatMail/livePreviewConfirmation";
import { formatLivePreviewRequestMessage } from "@/features/email/lib/formatMail/livePreviewRequest";
import { sendMail } from "@/features/email/lib/sendMail";
import {
  livePreviewRequestSchema,
} from "@/features/works/schema/livePreviewRequest";
import { ZodError } from "zod";

const rateLimitMap = new Map<string, { windowStart: number; count: number }>();
const RATE_LIMIT_WINDOW = 60 * 1000;
const MAX_REQUESTS = 3;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry) {
    rateLimitMap.set(ip, { windowStart: now, count: 1 });
    return false;
  }

  const elapsed = now - entry.windowStart;
  if (elapsed > RATE_LIMIT_WINDOW) {
    rateLimitMap.set(ip, { windowStart: now, count: 1 });
    return false;
  }

  entry.count += 1;
  rateLimitMap.set(ip, entry);
  return entry.count > MAX_REQUESTS;
}

export async function POST(request: NextRequest) {
  try {
    const ipHeader =
      request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip");
    const ip = ipHeader ? ipHeader.split(",")[0].trim() : "unknown";

    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }

    const body = await request.json();

    let validatedData;
    try {
      validatedData = livePreviewRequestSchema.parse(body);
    } catch (err) {
      if (err instanceof ZodError) {
        const fieldErrors: Record<string, string> = {};
        err.issues.forEach((error) => {
          const path = error.path[0] as string;
          fieldErrors[path] = error.message;
        });

        return NextResponse.json(
          { error: "Validation failed", fields: fieldErrors },
          { status: 400 }
        );
      }

      throw err;
    }

    const { email, projectSlug } = validatedData;
    const project = projectsData.find((entry) => entry.slug === projectSlug);

    if (!project) {
      return NextResponse.json(
        { error: "Project not found." },
        { status: 404 }
      );
    }

    if (!project.url) {
      return NextResponse.json(
        { error: "Live preview is not available for this project." },
        { status: 400 }
      );
    }

    const businessEmail = process.env.FROM_EMAIL || process.env.SMTP_USER;
    if (!businessEmail) {
      return NextResponse.json(
        { error: "Mail configuration error: business email is not set." },
        { status: 500 }
      );
    }

    const businessMail = await sendMail({
      subject: `Live Preview Request: ${project.title}`,
      html: formatLivePreviewRequestMessage({
        projectTitle: project.title,
        projectSlug: project.slug,
        requesterEmail: email,
        liveUrl: project.url,
      }),
      mailTo: businessEmail,
      replyTo: email,
    });

    const userMail = await sendMail({
      subject: `Live preview request received for ${project.title}`,
      html: formatLivePreviewConfirmation({
        projectTitle: project.title,
      }),
      mailTo: email,
    });

    if (!businessMail.ok && !userMail.ok) {
      return NextResponse.json(
        { error: "Failed to send emails." },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message:
          "Request received. I will reach back to you within 2 days with the live preview link. Your email will only be used once for this request.",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Live preview request error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
