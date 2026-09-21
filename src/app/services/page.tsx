import React from 'react';
import Hero from '@/sections/Hero/Hero';
import OurServices from '@/sections/OurServices/OurServices';
import './services.css';
import { getBookingOptions } from '@/lib/booking-options';

export const metadata = {
  title: 'Appliance Repair Services in Boston | Pro Appliance Express',
  description:
    'Professional appliance repair services for refrigerators, ovens, washers, dryers & more. Trusted technicians in Boston. Book your repair today!',
  keywords: [
    'Appliance Repair Boston',
    'Washer repair',
    'Dryer repair',
    'Oven repair',
    'Refrigerator repair',
    'Home appliance service',
    'Same day appliance repair',
    'Pro Appliance Express',
    'Affordable appliance repair',
    'Licensed repair technicians',
  ],
  openGraph: {
    title: 'Appliance Repair Services in Boston | Pro Appliance Express',
    description:
      'Fast & reliable appliance repair services by Pro Appliance Express. Serving Boston with expert technicians and same-day service.',
    url: 'https://proapplianceexpress.com/services',
    type: 'website',
    siteName: 'Pro Appliance Express',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Pro Appliance Express - Appliance Repair Service',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Appliance Repair Services in Boston | Pro Appliance Express',
    description:
      'Expert repair for all home appliances in Boston. Book now with Pro Appliance Express.',
    images: ['/og-image.jpg'],
  },
};

export default async function Services() {
  const options = await getBookingOptions();
  return (
    <main id="main" className="page-services">
      <div className="services-content">
        <Hero title="services" />
      </div>
      <div className="services-wrapper">
        <div className="services-overlay"></div>
        <div className="services-content">
          <OurServices custom applianceTypes={options.applianceTypes} />
        </div>
      </div>
    </main>
  );
}
