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
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: emailUser,
        pass: emailPass,
      },
      connectionTimeout: 10000,
      greetingTimeout: 10000,
      socketTimeout: 15000,
      tls: {
        servername: 'smtp.gmail.com',
      },
    });

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

    const isTimeout =
      error?.code === 'ETIMEDOUT' || error?.message?.includes('timeout');

    console.error('Mail error:', {
      message: error?.message,
      code: error?.code,
      responseCode: error?.responseCode,
      response: error?.response,
    });

    return NextResponse.json(
      {
        success: false,
        error: isTimeout
          ? 'Mail server connection timed out'
          : 'Failed to send mail',
      },
      { status: 500 }
    );
  }
}
