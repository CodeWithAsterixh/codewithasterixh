import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// POST handler for sending emails
export async function POST(req: NextRequest) {
  const body = await req.json();
  const { name, email } = body;
  const toEmail = process.env.EMAIL_USER
  const pass = process.env.EMAIL_PASS

  try {
    // Nodemailer Transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail', // Use your email provider
      auth: {
        user: toEmail, // Your email
        pass: pass, // Your password or app-specific password
      },
    });

    // Mail Options
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email, // Replace with your recipient email
      subject: `Response from CodeWithAsterixh`,
      html: `
        <html>
  <head>
    <style>
      body {
        font-family: Arial, sans-serif;
        line-height: 1.6;
        background-color: #f9f9f9;
        margin: 0;
        padding: 0;
      }
      .email-container {
        max-width: 600px;
        margin: 20px auto;
        background: #ffffff;
        padding: 20px;
        border-radius: 8px;
        border: 1px solid #e0e0e0;
      }
      h1 {
        color: #244d61;
        font-size: 20px;
        margin-bottom: 10px;
      }
      p {
        color: #333;
        margin: 0 0 10px;
      }
      .highlight {
        color: #5689c0;
        font-weight: bold;
      }
      .button {
        display: inline-block;
        background-color: #5689c0;
        color: #fff;
        text-decoration: none;
        padding: 12px 20px;
        font-size: 14px;
        border-radius: 5px;
        margin-top: 10px;
      }
      .button:hover {
        background-color: #456b9a;
      }
    </style>
  </head>
  <body>
    <div class="email-container">
      <h1>Thank You for Reaching Out!</h1>
      <p>Hi ${name},</p>
      <p>
        Thank you for messaging <span class="highlight">CodeWithAsterixh</span>. I’ve received your inquiry and
        will get back to you within <strong>2 business days</strong>.
      </p>
      <p>
        If you have any urgent updates or additional details to share, feel free to reach out via email!
      </p>
      <a href="mailto:${process.env.EMAIL_USER}" class="button">Reply to This Email</a>
    </div>
  </body>
</html>

      `,
    };

    // Send Email
    await transporter.sendMail(mailOptions);

    return NextResponse.json({ message: 'Email sent successfully!', status:200 });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { message: 'Failed to send email.', error },
      { status: 500 }
    );
  }
}
