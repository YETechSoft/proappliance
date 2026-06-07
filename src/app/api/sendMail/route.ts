import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export const runtime = 'nodejs';

const CONTACT_EMAIL_TO =
  process.env.CONTACT_EMAIL_TO || 'proapplianceexpress@gmail.com';

export async function POST(req: Request) {
  const { name, phone, email, message } = await req.json();
  const emailUser = process.env.EMAIL_USER;
  const emailPass = process.env.EMAIL_PASS;

  try {
    if (!emailUser || !emailPass) {
      console.error('Mail error: EMAIL_USER or EMAIL_PASS is missing');
      return NextResponse.json(
        { success: false, error: 'Mail service is not configured' },
        { status: 500 }
      );
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: emailUser,
        pass: emailPass,
      },
    });

    await transporter.verify();

    await transporter.sendMail({
      from: emailUser,
      to: CONTACT_EMAIL_TO,
      replyTo: email,
      subject: 'Yeni Müraciət',
      html: `
        <h3>Yeni Müraciət:</h3>
        <p><strong>Ad:</strong> ${name}</p>
        <p><strong>Telefon:</strong> ${phone}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Mesaj:</strong> ${message}</p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    const error = err as
      | (Error & { code?: string; response?: string; responseCode?: number })
      | undefined;

    console.error('Mail error:', {
      message: error?.message,
      code: error?.code,
      responseCode: error?.responseCode,
      response: error?.response,
    });

    return NextResponse.json(
      { success: false, error: 'Failed to send mail' },
      { status: 500 }
    );
  }
}
