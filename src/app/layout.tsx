import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'aos/dist/aos.css';

import type { Metadata } from 'next';
import { Barlow, Roboto } from 'next/font/google';
import Header from '@/component/Header/Header';
import './globals.css';
import Footer from '@/component/Footer/Footer';

const barlow = Barlow({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});
const roboto = Roboto({
  subsets: ['latin'],
  weight: ['100', '300', '400', '500', '700', '900'],
});

export const metadata: Metadata = {
  title: 'Pro Appliance Express',
  description:
    'Best Appliance Repair Services in Boston MA | Pro Appliance Express',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
        <meta name="theme-color" content="#ffffff" />
        {/* SEO Meta Tags */}
        <meta name="robots" content="index, follow" />
        <meta name="author" content="Pro Appliance Express" />
        <meta
          name="keywords"
          content="Appliance Repair, Boston, Washer, Dryer, Fridge, Pro Appliance Express"
        />
        {/* Open Graph Tags */}
        <meta
          property="og:title"
          content="Pro Appliance Express | Appliance Repair in Boston"
        />
        <meta
          property="og:description"
          content="Get professional appliance repair services in Boston. Same day service available!"
        />
        <meta property="og:image" content="/og-image.jpg" />
        <meta property="og:url" content="https://proapplianceexpress.com" />
        <meta property="og:type" content="website" />
        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Pro Appliance Express | Appliance Repair in Boston"
        />
        <meta
          name="twitter:description"
          content="Fast and reliable appliance repair service in Boston MA."
        />
        <meta name="twitter:image" content="/og-image.jpg" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'LocalBusiness',
              name: 'Pro Appliance Express',
              image: 'https://proapplianceexpress.com/logo.png',
              url: 'https://proapplianceexpress.com',
              telephone: '+1-617-337-7045',
              address: {
                '@type': 'PostalAddress',
                streetAddress: '75 Wolcott St',
                addressLocality: 'Malden',
                addressRegion: 'MA',
                postalCode: '02148',
                addressCountry: 'US',
              },
              priceRange: '$$',
              openingHours: ['Mo-Su 08:00-20:00'],
              description:
                'Professional appliance repair services across Massachusetts, specializing in fridges, washers, dryers, ovens, and more.',
              areaServed: {
                '@type': 'Place',
                address: {
                  '@type': 'PostalAddress',
                  addressRegion: 'MA',
                  addressCountry: 'US',
                },
              },
            }),
          }}
        ></script>
      </head>
      <body className={`${barlow.className} ${roboto.className}`}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
