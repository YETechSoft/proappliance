import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import BookingForm from './BookingForm';
import { getBookingOptions } from '@/lib/booking-options';
import './booking.css';

export const metadata: Metadata = {
  title: 'Book Online | Pro Appliance Express',
  description: 'Request appliance repair, installation, or maintenance in Boston and nearby areas. Choose your appliance and contact Pro Appliance Express to arrange service.',
};

export default async function BookingPage({ searchParams }: {
  searchParams: Promise<{ appliance?: string | string[] }>;
}) {
  const params = await searchParams;
  const appliance = typeof params.appliance === 'string' ? params.appliance : '';
  const options = await getBookingOptions();
  return (
    <div className="booking-page">
      <header className="booking-header">
        <div className="booking-header-inner">
          <Link href="/" aria-label="Pro Appliance Express home">
            <Image src="/pro-logo.png" alt="Pro Appliance Express" width={365} height={240} priority />
          </Link>
          <span className="booking-header-title">Schedule Your Service</span>
          <a className="booking-phone" href="tel:+19789328806"><i className="bi bi-telephone-fill" aria-hidden="true" /> +1 (978) 932-8806</a>
        </div>
      </header>
      <main className="booking-main">
        <div className="booking-intro">
          <Link href="/" className="booking-back">← Back to home</Link>
          <h1>Let’s get your appliance working.</h1>
          <p>Appliance service in Boston and nearby areas. Send your request and our team will contact you to confirm the details and arrange a visit.</p>
        </div>
        <BookingForm key={appliance} initialAppliance={appliance} options={options} />
        <footer className="booking-footer">
          <a href="tel:+19789328806">Have questions? Call +1 (978) 932-8806</a>
          <Link href="/privacy">Privacy Policy</Link>
        </footer>
      </main>
    </div>
  );
}
