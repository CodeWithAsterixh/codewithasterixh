import { NextRequest, NextResponse } from 'next/server';
import { contactFormSchema } from '@/features/email/schema/contact';
import { formatConfirmationMessage } from '@/features/email/lib/formatMail/confirmation';
import { formatContactMessage } from '@/features/email/lib/formatMail/contact';
import { sendMail } from '@/features/email/lib/sendMail';
import { isRateLimited } from '@/features/email/lib/rateLimit';
import { ZodError } from 'zod';

export async function POST(request: NextRequest) {
  try {
    const ipHeader = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip');
    const ip = ipHeader ? ipHeader.split(',')[0].trim() : 'unknown';
    if (isRateLimited(ip)) {
      return NextResponse.json({ error: 'Too many requests. Please try again later.' }, { status: 429 });
    }

    const body = await request.json();
    let validatedData;
    try {
      validatedData = contactFormSchema.parse(body);
    } catch (err) {
      if (err instanceof ZodError) {
        const fieldErrors: Record<string, string> = {};
        err.issues.forEach((error) => { fieldErrors[error.path[0] as string] = error.message; });
        return NextResponse.json({ error: 'Validation failed', fields: fieldErrors }, { status: 400 });
      }
      throw err;
    }

    const { fullName, email, subject, message } = validatedData;
    const businessEmail = process.env.FROM_EMAIL;
    if (!businessEmail) {
      return NextResponse.json({ error: 'Mail configuration error: FROM_EMAIL is not set.' }, { status: 500 });
    }

    const businessMail = await sendMail({
      subject: `New Contact: ${subject} - from ${fullName}`,
      html: formatContactMessage({ fullName, email, message }),
      mailTo: businessEmail,
      replyTo: email,
    });

    const userMail = await sendMail({
      subject: 'We received your message, Asterixh',
      html: formatConfirmationMessage({ name: fullName }),
      mailTo: email,
    });

    if (!businessMail.ok && !userMail.ok) {
      console.error('Mail send error:', businessMail.error, userMail.error);
      return NextResponse.json({ error: 'Failed to send emails' }, { status: 500 });
    }

    return NextResponse.json(
      { success: true, message: "Your message has been sent! We'll get back to you within 24 hours." },
      { status: 200 }
    );
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
