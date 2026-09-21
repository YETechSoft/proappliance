import type { ApplianceTypeOption, BookingOptions } from '@/lib/booking';

const FALLBACK_OPTIONS: BookingOptions = {
  serviceTypes: ['Repair', 'Installation', 'Maintenance'],
  applianceTypes: [
    'washer', 'dryer', 'ice-machine', 'refrigerator', 'dishwasher', 'oven',
    'cooktop', 'stove', 'range', 'microwave', 'wine-cooler', 'freezer',
    'garbage-disposal', 'vent-hood', 'kitchen-exhaust-fan', 'range-hood-fan',
    'downdraft',
  ].map(iconKey => ({
    iconKey,
    name: iconKey.split('-').map(part => part[0].toUpperCase() + part.slice(1)).join(' '),
  })),
};

const cleanOptions = (value: unknown): string[] => {
  if (!Array.isArray(value)) return [];
  return [...new Set(value
    .filter((item): item is string => typeof item === 'string')
    .map(item => item.trim())
    .filter(item => item.length > 0 && item.length <= 100))];
};

const cleanApplianceTypes = (value: unknown): ApplianceTypeOption[] => {
  if (!Array.isArray(value)) return [];
  const unique = new Map<string, ApplianceTypeOption>();
  for (const item of value) {
    if (!item || typeof item !== 'object') continue;
    const record = item as Record<string, unknown>;
    const name = typeof record.name === 'string' ? record.name.trim() : '';
    const iconKey = typeof record.iconKey === 'string' ? record.iconKey.trim() : '';
    if (!name || name.length > 100 || !/^[a-z0-9-]{1,100}$/.test(iconKey)) continue;
    unique.set(name.toLowerCase(), { name, iconKey });
  }
  return [...unique.values()];
};

export async function getBookingOptions(): Promise<BookingOptions> {
  const apiUrl = getAdminApiUrl();

  try {
    const response = await fetch(`${apiUrl}/public/booking-options`, {
      next: { revalidate: 300 },
      signal: AbortSignal.timeout(5000),
    });
    if (!response.ok) return FALLBACK_OPTIONS;

    const data = await response.json() as Record<string, unknown>;
    const serviceTypes = cleanOptions(data.serviceTypes);
    const applianceTypes = cleanApplianceTypes(data.applianceTypes);
    if (serviceTypes.length === 0 || applianceTypes.length === 0) return FALLBACK_OPTIONS;

    return { serviceTypes, applianceTypes };
  } catch {
    return FALLBACK_OPTIONS;
  }
}

export function getAdminApiUrl(): string {
  const configuredUrl = process.env.ADMIN_API_URL || process.env.NEXT_PUBLIC_API_URL;
  const apiUrl = configuredUrl || (process.env.NODE_ENV === 'development'
    ? 'http://localhost:8082/api'
    : 'https://api.proapplianceexpress.com/api');
  return apiUrl.replace(/\/$/, '');
}
