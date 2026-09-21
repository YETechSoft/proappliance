import type { ReactNode } from 'react';

interface ApplianceServiceProps {
  iconKey: string;
  width?: string;
  height?: string;
}

const icons: Record<string, ReactNode> = {
  washer: <><rect x="10" y="6" width="44" height="52" rx="4" /><path d="M10 17h44M17 12h1M23 12h6" /><circle cx="32" cy="37" r="13" /><path d="M24 36c4-5 12 5 16 0" /></>,
  dryer: <><rect x="10" y="6" width="44" height="52" rx="4" /><path d="M10 17h44M17 12h1M23 12h1" /><circle cx="32" cy="36" r="13" /><path d="M27 31c8 0 4 8 10 9M43 52h5" /></>,
  'ice-machine': <><rect x="12" y="7" width="40" height="50" rx="4" /><path d="M12 18h40M22 28h20v20H22zM25 31l7 6 7-6M32 37v8" /><path d="M17 12h8" /></>,
  refrigerator: <><rect x="15" y="5" width="34" height="54" rx="4" /><path d="M15 34h34M42 12v14M42 40v9M20 59v2M44 59v2" /></>,
  dishwasher: <><rect x="9" y="8" width="46" height="48" rx="4" /><path d="M9 19h46M17 14h1M23 14h1M17 48h30M20 43h24" /><path d="M23 35c4 4 14 4 18 0" /></>,
  oven: <><rect x="10" y="6" width="44" height="52" rx="3" /><path d="M10 20h44M17 13h1M25 13h1M33 13h1M41 13h1" /><rect x="17" y="27" width="30" height="23" rx="2" /><path d="M22 44h20M24 33c5 5 11-5 16 0" /></>,
  cooktop: <><path d="M9 13h46v38H9z" /><circle cx="21" cy="25" r="7" /><circle cx="43" cy="25" r="7" /><circle cx="21" cy="42" r="5" /><circle cx="43" cy="42" r="5" /></>,
  stove: <><rect x="9" y="15" width="46" height="43" rx="3" /><path d="M9 26h46M16 20h1M24 20h1M40 20h1M48 20h1" /><circle cx="20" cy="10" r="5" /><circle cx="44" cy="10" r="5" /><rect x="17" y="33" width="30" height="18" rx="2" /></>,
  range: <><path d="M10 18h44v40H10zM14 6h36v12H14zM19 11h1M27 11h1M36 11h1M44 11h1" /><circle cx="21" cy="24" r="4" /><circle cx="43" cy="24" r="4" /><rect x="17" y="32" width="30" height="19" rx="2" /></>,
  microwave: <><rect x="6" y="14" width="52" height="36" rx="4" /><rect x="12" y="20" width="31" height="24" rx="2" /><circle cx="50" cy="24" r="2" /><circle cx="50" cy="32" r="2" /><path d="M48 41h4M17 29c4-4 8 4 12 0s7 4 10 0" /></>,
  'wine-cooler': <><rect x="14" y="5" width="36" height="54" rx="4" /><path d="M14 16h36M14 37h36M23 27h18M23 48h18" /><path d="M26 21c-3 4-3 8 0 11M38 42c-3 4-3 8 0 11" /></>,
  freezer: <><path d="M7 22h50l-4 33H11L7 22Z" /><path d="M5 14h54v9H5zM16 31h32M28 18h8" /></>,
  'garbage-disposal': <><path d="M10 10h44M17 10c0 9 5 14 15 14s15-5 15-14" /><path d="M24 24h16l3 10-4 20H25l-4-20 3-10Z" /><path d="M16 6v4M48 6v4M28 31h8M32 54v5" /></>,
  'vent-hood': <><path d="M20 8h24l3 20 10 13H7l10-13 3-20Z" /><path d="M13 41v8h38v-8M24 34h16M28 49v7M36 49v7" /></>,
  'kitchen-exhaust-fan': <><circle cx="32" cy="32" r="24" /><circle cx="32" cy="32" r="4" /><path d="M32 28c-4-10 2-16 8-14 5 2 3 11-8 14ZM36 32c10-4 16 2 14 8-2 5-11 3-14-8ZM32 36c4 10-2 16-8 14-5-2-3-11 8-14ZM28 32c-10 4-16-2-14-8 2-5 11-3 14 8Z" /></>,
  'range-hood-fan': <><path d="M18 8h28l4 19 8 11H6l8-11 4-19Z" /><circle cx="32" cy="28" r="7" /><path d="M32 21v14M25 28h14M14 38v9h36v-9" /></>,
  downdraft: <><path d="M8 14h48v34H8z" /><circle cx="20" cy="26" r="6" /><circle cx="44" cy="26" r="6" /><path d="M20 39h24M32 36v18M26 48l6 6 6-6" /></>,
};

const fallback = <><rect x="10" y="7" width="44" height="50" rx="4" /><path d="M10 18h44" /><circle cx="32" cy="38" r="12" /><path d="M24 38c4-5 12 5 16 0" /></>;

export default function ApplianceService({ iconKey, width = '64px', height = '64px' }: ApplianceServiceProps) {
  return (
    <svg
      viewBox="0 0 64 64"
      width={width}
      height={height}
      fill="none"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {icons[iconKey] ?? fallback}
    </svg>
  );
}
