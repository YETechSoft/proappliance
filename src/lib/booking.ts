import { z } from 'zod';
export interface BookingOptions {
  serviceTypes: string[];
  applianceTypes: ApplianceTypeOption[];
}

export interface ApplianceTypeOption {
  name: string;
  iconKey: string;
}

export interface BookingFormData {
  service: string;
  appliance: string;
  brand: string;
  model: string;
  address: string;
  unitOrApt: string;
  city: string;
  state: string;
  zip: string;
  name: string;
  phone: string;
  email: string;
  message: string;
}

const createBookingDetailsSchema = (options: BookingOptions) => z.object({
  service: z.string().refine(value => options.serviceTypes.includes(value), 'Choose a service type.'),
  appliance: z.string().refine(value => options.applianceTypes.some(item => item.name === value), 'Choose your appliance.'),
  brand: z.string().trim().max(80),
  model: z.string().trim().max(100),
  address: z.string().trim().min(3, 'Enter the service address.').max(500),
  unitOrApt: z.string().trim().max(120),
  city: z.string().trim().min(2, 'Enter the city.').max(100),
  state: z.string().trim().min(2, 'Enter the state.').max(50),
  zip: z.string().trim().regex(/^\d{5}$/, 'Enter a 5-digit ZIP code.'),
});

const contactFields = {
  name: z.string().trim().min(2, 'Enter your full name.').max(120),
  phone: z.string().trim().max(30).refine(value => /^(1)?\d{10}$/.test(value.replace(/[\s()+.-]/g, '')), 'Enter a valid US phone number.'),
  email: z.string().trim().email('Enter a valid email address.').max(254),
};

export const createContactSchema = (options: BookingOptions) => z.object({
  ...contactFields,
  message: z.string().trim().min(1).max(4000),
  booking: createBookingDetailsSchema(options).optional(),
});

export const createBookingFormSchema = (options: BookingOptions) => z.object({
  ...contactFields,
  ...createBookingDetailsSchema(options).shape,
  message: z.string().trim().max(3000),
});

export const toApplianceKey = (value: string) => value
  .trim()
  .toLowerCase()
  .replace(/[^a-z0-9]+/g, '-');
