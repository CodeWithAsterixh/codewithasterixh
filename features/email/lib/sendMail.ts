/**
 * sendMail - Email utility using Gmail SMTP via nodemailer
 * 
 * Configure with:
 * - SMTP_HOST=smtp.gmail.com
 * - SMTP_PORT=587
 * - SMTP_USER=your-email@gmail.com
 * - SMTP_PASS=your-app-password (generate at https://myaccount.google.com/apppasswords)
 * - FROM_EMAIL=your-email@gmail.com
 */

import nodemailer from "nodemailer";

interface SendMailOptions {
  subject: string;
  html: string;
  mailTo: string;
}

interface SendMailResult {
  ok: boolean;
  messageId?: string;
  error?: string;
}

let transporter: nodemailer.Transporter | null = null;

/**
 * Initialize or get the SMTP transporter
 */
function getTransporter(): nodemailer.Transporter {
  if (transporter) return transporter;

  const smtpHost = process.env.SMTP_HOST;
  const smtpPort = process.env.SMTP_PORT;
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;

  if (!smtpHost || !smtpPort || !smtpUser || !smtpPass) {
    throw new Error(
      "Missing SMTP configuration. Please set SMTP_HOST, SMTP_PORT, SMTP_USER, and SMTP_PASS environment variables."
    );
  }

  transporter = nodemailer.createTransport({
    host: smtpHost,
    port: parseInt(smtpPort),
    secure: false, // Use TLS (true for 465, false for 587)
    auth: {
      user: smtpUser,
      pass: smtpPass,
    },
  });

  return transporter;
}

export async function sendMail(options: SendMailOptions): Promise<SendMailResult> {
  const { subject, html, mailTo } = options;
  const fromEmail = process.env.FROM_EMAIL || process.env.SMTP_USER || "noreply@codewithasterixh.com";

  try {
    const transport = getTransporter();

    const result = await transport.sendMail({
      from: fromEmail,
      to: mailTo,
      subject,
      html,
    });

    return {
      ok: true,
      messageId: result.messageId,
    };
  } catch (error) {
    const errorMsg = error instanceof Error ? error.message : "Unknown error";
    return {
      ok: false,
      error: errorMsg,
    };
  }
}
