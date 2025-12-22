import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

function sanitizeText(input:string) {
  return input
    .trim()
    .replace(/[<>]/g, "");
}
export async function POST(req: Request) {
  const sanitizedRequestObj = JSON.stringify(await req.json())
  const { name, email, message } = JSON.parse(sanitizeText(sanitizedRequestObj));

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const htmlTemplate = `
  <div style="font-family: Inter, Arial, sans-serif; background-color: #0F0F0F; color: #F1F1F1; padding: 32px; border-radius: 12px; max-width: 600px; margin: auto;">
    <h2 style="color: #7C3AED; text-align: center;">New Contact Message</h2>
    <div style="margin-top: 24px; background-color: #181818; padding: 20px; border-radius: 8px;">
      <p><strong style="color: #7C3AED;">Name:</strong> ${name}</p>
      <p><strong style="color: #7C3AED;">Email:</strong> ${email}</p>
      <p><strong style="color: #7C3AED;">Message:</strong></p>
      <p style="color: #D1D5DB;">${message}</p>
    </div>
    <p style="font-size: 12px; color: #9CA3AF; text-align: center; margin-top: 32px;">
      Sent from your portfolio contact form.
    </p>
  </div>
  `;

  try {
    // send to receiver
    await transporter.sendMail({
      from: `"Portfolio Contact" <${process.env.SMTP_USER}>`,
      to: process.env.MY_EMAIL,
      text:"new message!",
      subject: `New message from ${name}`,
      html: htmlTemplate,
    });

    // send acknowledgment to sender
    await transporter.sendMail({
      from: `"${name}" <${process.env.SMTP_USER}>`,
      to: email,
      subject: "Thanks for reaching out!",
      text: "Thanks for contacting asterixh, you will receive a response within 3 working days",
      html: `
      <div style="font-family: Inter, Arial, sans-serif; background-color: #0F0F0F; color: #F1F1F1; padding: 32px; border-radius: 12px; max-width: 600px; margin: auto;">
        <h2 style="color: #7C3AED; text-align: center;">Message Received</h2>
        <p style="color: #D1D5DB;">Hi ${name},</p>
        <p style="color: #D1D5DB;">I’ve received your message and will respond soon.</p>
        <div style="margin-top: 24px; background-color: #181818; padding: 16px; border-radius: 8px;">
          <p><strong>Your Message:</strong></p>
          <p style="color: #D1D5DB;">${message}</p>
        </div>
        <p style="font-size: 12px; color: #9CA3AF; text-align: center; margin-top: 32px;">
          Sent from my portfolio contact form.
        </p>
      </div>
      `,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json({ ok: false, error });
  }
}
