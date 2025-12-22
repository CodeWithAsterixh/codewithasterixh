/* eslint-disable @typescript-eslint/no-explicit-any */

import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const runtime = "nodejs"; // Ensure Node runtime, not Edge

function sanitizeText(input: string) {
  return input.trim().replace(/[<>]/g, "");
}

function sanitizePricingType(input: unknown) {
  const allowed = ["basic", "standard", "advanced"];
  if (typeof input !== "string") return undefined;
  return allowed.includes(input) ? input : undefined;
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(req: Request) {
  try {
    // Check environment variables
    const { SMTP_USER, SMTP_PASS, MY_EMAIL } = process.env;
    if (!SMTP_USER || !SMTP_PASS || !MY_EMAIL) {
      throw new Error("Missing required SMTP environment variables");
    }

    const body = await req.json();
    const name = sanitizeText(body.name || "");
    const email = sanitizeText(body.email || "");
    const message = sanitizeText(body.message || "");
    const pricingType = sanitizePricingType(body.pricingType);

    if (!name || !isValidEmail(email) || !message) {
      return NextResponse.json(
        { ok: false, error: "Invalid input" },
        { status: 400 }
      );
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      secure: false,
      port: 587,
      auth: { user: SMTP_USER, pass: SMTP_PASS },
    });

    // Admin notification email
    const htmlTemplate = `
      <div style="font-family: Inter, Arial, sans-serif; background-color: #0F0F0F; color: #F1F1F1; padding: 32px; border-radius: 12px; max-width: 600px; margin: auto;">
        <h2 style="color: #7C3AED; text-align: center;">New Contact Message</h2>
        <div style="margin-top: 24px; background-color: #181818; padding: 20px; border-radius: 8px;">
          <p><strong style="color: #7C3AED;">Name:</strong> ${name}</p>
          <p><strong style="color: #7C3AED;">Email:</strong> ${email}</p>
          ${pricingType ? `<p><strong style="color: #7C3AED;">Pricing Type:</strong> ${pricingType}</p>` : ""}
          <p><strong style="color: #7C3AED;">Message:</strong></p>
          <p style="color: #D1D5DB;">${message}</p>
        </div>
      </div>
    `;

    await transporter.sendMail({
      from: `"Portfolio Contact" <${SMTP_USER}>`,
      to: MY_EMAIL,
      replyTo: email,
      subject: `New message from ${name}`,
      text: "New message received",
      html: htmlTemplate,
    });

    // User acknowledgment email
    await transporter.sendMail({
      from: `"Portfolio Contact" <${SMTP_USER}>`,
      to: email,
      replyTo: MY_EMAIL,
      subject: "Thanks for reaching out",
      text: "Thanks for contacting Asterixh. You will receive a response within 3 working days.",
      html: `
        <div style="font-family: Inter, Arial, sans-serif; background-color: #0F0F0F; color: #F1F1F1; padding: 32px; border-radius: 12px; max-width: 600px; margin: auto;">
          <h2 style="color: #7C3AED; text-align: center;">Message Received</h2>
          <p>Hi ${name},</p>
          <p>Your message has been received and I will respond soon.</p>
        </div>
      `,
    });

    return NextResponse.json({ ok: true });
  } catch (err: any) {
    return NextResponse.json(
      { ok: false, error: err.message || "Email send failed" },
      { status: 500 }
    );
  }
}
