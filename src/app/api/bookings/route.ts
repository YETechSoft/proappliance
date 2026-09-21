import { NextResponse } from 'next/server';
import { createBookingFormSchema } from '@/lib/booking';
import { getAdminApiUrl, getBookingOptions } from '@/lib/booking-options';

export const runtime = 'nodejs';

export async function POST(req: Request) {
  const apiKey = process.env.PUBLIC_BOOKING_API_KEY;
  if (!apiKey) return NextResponse.json({ message: 'Booking service is not configured.' }, { status: 503 });

  const options = await getBookingOptions();
  const parsed = createBookingFormSchema(options).safeParse(await req.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ message: 'Please check all required booking details.' }, { status: 400 });

  const idempotencyKey = req.headers.get('Idempotency-Key');
  if (!idempotencyKey) return NextResponse.json({ message: 'Please try submitting again.' }, { status: 400 });

  try {
    const response = await fetch(`${getAdminApiUrl()}/public/bookings`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Public-Booking-Key': apiKey,
        'Idempotency-Key': idempotencyKey,
      },
      body: JSON.stringify({
        name: parsed.data.name,
        phone: parsed.data.phone,
        email: parsed.data.email,
        serviceType: parsed.data.service,
        applianceType: parsed.data.appliance,
        applianceBrand: parsed.data.brand,
        applianceModel: parsed.data.model,
        address: parsed.data.address,
        unitOrApt: parsed.data.unitOrApt,
        city: parsed.data.city,
        state: parsed.data.state,
        zip: parsed.data.zip,
        message: parsed.data.message,
      }),
      signal: AbortSignal.timeout(20000),
    });
    const body = await response.json().catch(() => ({ message: 'Booking service error.' }));
    return NextResponse.json(body, { status: response.status });
  } catch {
    return NextResponse.json({ message: 'Booking service is temporarily unavailable.' }, { status: 502 });
  }
}
