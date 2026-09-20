import { NextResponse } from 'next/server';
import { bookingAppliances, contactSchema } from '@/lib/booking';

export const runtime = 'nodejs';

const CONTACT_EMAIL_TO =
  process.env.CONTACT_EMAIL_TO || 'proapplianceexpress@gmail.com';
const CONTACT_EMAIL_FROM =
  process.env.CONTACT_EMAIL_FROM || 'Pro Appliance Express <onboarding@resend.dev>';

export async function POST(req: Request) {
  const parsed = contactSchema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ success: false, error: 'Please check your contact and service details.' }, { status: 400 });
  }
  const { name, phone, email, message, booking } = parsed.data;
  const escapeHtml = (value: string) => value.replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]!));
  const bookingMessage = booking ? [
    `Service: ${booking.service}`,
    `Appliance: ${bookingAppliances.find(item => item.value === booking.appliance)?.label}`,
    `Brand: ${booking.brand || 'Not specified'}`,
    `Service ZIP code: ${booking.zip}`,
    '', message,
  ].join('\n') : message;
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
        subject: booking ? 'Online service request - Pro Appliance Express' : 'Yeni Muraciet',
        html: `
          <h3>Yeni Muraciet:</h3>
          <p><strong>Ad:</strong> ${escapeHtml(name)}</p>
          <p><strong>Telefon:</strong> ${escapeHtml(phone)}</p>
          <p><strong>Email:</strong> ${escapeHtml(email)}</p>
          <p><strong>Mesaj:</strong><br />${escapeHtml(bookingMessage).replace(/\n/g, '<br />')}</p>
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
