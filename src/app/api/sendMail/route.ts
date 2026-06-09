import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

const CONTACT_EMAIL_TO =
  process.env.CONTACT_EMAIL_TO || 'proapplianceexpress@gmail.com';
const CONTACT_EMAIL_FROM =
  process.env.CONTACT_EMAIL_FROM || 'Pro Appliance Express <onboarding@resend.dev>';

export async function POST(req: Request) {
  const { name, phone, email, message } = await req.json();
  const resendApiKey = process.env.RESEND_API_KEY;

  try {
    if (!resendApiKey) {
      console.error('Mail error: RESEND_API_KEY is missing');
      return NextResponse.json(
        { success: false, error: 'Mail service is not configured' },
        { status: 500 }
      );
    }

    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: CONTACT_EMAIL_FROM,
        to: [CONTACT_EMAIL_TO],
        reply_to: email,
        subject: 'Yeni Muraciet',
        html: `
          <h3>Yeni Muraciet:</h3>
          <p><strong>Ad:</strong> ${name}</p>
          <p><strong>Telefon:</strong> ${phone}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Mesaj:</strong> ${message}</p>
        `,
      }),
      signal: AbortSignal.timeout(15000),
    });

    if (!response.ok) {
      const errorBody = await response.text();
      console.error('Mail error:', {
        status: response.status,
        body: errorBody,
      });

      return NextResponse.json(
        { success: false, error: 'Failed to send mail' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    const error = err as Error | undefined;
    const isTimeout = error?.name === 'TimeoutError' || error?.message?.includes('timeout');

    console.error('Mail error:', {
      message: error?.message,
      name: error?.name,
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
