import { NextRequest, NextResponse } from "next/server";
import { contactFormSchema } from "@/features/contact/schema/contact";
import { formatConfirmationMessage } from "@/features/email/lib/formatMail/confirmation";
import { formatContactMessage } from "@/features/email/lib/formatMail/contact";
import { sendMail } from "@/features/email/lib/sendMail";
import { ZodError } from "zod";

// Simple in-memory rate limiting
const rateLimitMap = new Map<string, number>();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
// const MAX_REQUESTS = 3; // 3 requests per minute

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const lastRequestTime = rateLimitMap.get(ip);

  if (lastRequestTime && now - lastRequestTime < RATE_LIMIT_WINDOW) {
    return true;
  }

  rateLimitMap.set(ip, now);
  return false;
}

export async function POST(request: NextRequest) {
  try {
    // Rate Limiting
    const ip = request.headers.get("x-forwarded-for") || "unknown";
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }

    // Parse request body
    const body = await request.json();

    // Validate with Zod schema
    let validatedData;
    try {
      validatedData = contactFormSchema.parse(body);
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

    const { fullName, email, subject, message } = validatedData;

    const businessEmail = process.env.FROM_EMAIL || "asterixh@gmail.com";

    const mailSubject = `New Contact: ${subject} - from ${fullName}`;
    const htmlMessage = formatContactMessage({ fullName, email, message });

    // Send notification to business
    const businessMail = await sendMail({
      subject: mailSubject,
      html: htmlMessage,
      mailTo: businessEmail,
    });

    // Send confirmation to user
    const userMail = await sendMail({
      subject: "We received your message — Asterixh",
      html: formatConfirmationMessage({
        name: fullName,
      }),
      mailTo: email,
    });

    if (!businessMail.ok && !userMail.ok) {
       // If both fail, report error
       console.error("Mail send error:", businessMail.error, userMail.error);
       return NextResponse.json(
        { error: "Failed to send emails" },
        { status: 500 }
      );
    }

    // Even if one fails, we can consider it a partial success or just success for the user
    // Ideally we want both to succeed.

    return NextResponse.json(
      {
        success: true,
        message: "Your message has been sent! We'll get back to you within 24 hours.",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
