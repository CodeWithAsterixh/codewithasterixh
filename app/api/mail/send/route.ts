import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// POST handler for sending emails
export async function POST(req: NextRequest) {
  const body = await req.json();
  const { name, email, service, projectName, projectDescription } = body;
  const toEmail = process.env.EMAIL_USER
  const pass = process.env.EMAIL_PASS

  if (!name || !email || !service || !projectName || !projectDescription) {
    return NextResponse.json(
      { message: 'All fields are required.' },
      { status: 400 }
    );
  }

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
      to: toEmail, // Replace with your recipient email
      subject: `New Request from ${name}`,
      html: `
        <html>
            <head>
              <style>
                body {
                  font-family: Arial, sans-serif;
                  line-height: 1.6;
                  background-color: #f9f9f9;
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
                  font-size: 16px;
                  border-radius: 5px;
                }
                .button:hover {
                  background-color: #456b9a;
                }
              </style>
            </head>
            <body>
              <div class="email-container">
                <h1>Alert Asterixh!</h1>
                <p>Dear ${name},</p>
                <p>Thank you for submitting your project inquiry. We’re excited to work with you!</p>
                <p><span class="highlight">Your Request:</span></p>
                <ul>
                  <li><strong>Service:</strong> ${service}</li>
                  <li><strong>Project Name:</strong> ${projectName}</li>
                  <li><strong>Description:</strong> ${projectDescription}</li>
                </ul>
                <p>Our team will get back to you within 2 business days.</p>
                <p>If you have any questions or additional information to share, feel free to contact us!</p>
                <a href="mailto:${process.env.EMAIL_USER}" class="button">Contact Us Anytime</a>
              </div>
            </body>
          </html>
      `,
    };

    // Send Email
    await transporter.sendMail(mailOptions);

    return NextResponse.json({ message: 'Email sent successfully!' });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { message: 'Failed to send email.', error },
      { status: 500 }
    );
  }
}
