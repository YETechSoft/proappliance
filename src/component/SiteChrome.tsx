'use client';

import { usePathname } from 'next/navigation';
import type { ReactNode } from 'react';

export default function SiteChrome({ children, header, footer }: {
  children: ReactNode;
  header: ReactNode;
  footer: ReactNode;
}) {
  const isBooking = usePathname() === '/book-online';
  return <>{!isBooking && header}{children}{!isBooking && footer}</>;
}
