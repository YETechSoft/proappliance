import { z } from 'zod';
import { services } from '@/data/data';

export const bookingAppliances = services.map(({ slug, name }) => ({
  value: slug,
  label: name.replace(/ Repair$/, ''),
}));
export const bookingServices = ['Repair', 'Maintenance'] as const;

export const bookingDetailsSchema = z.object({
  service: z.enum(bookingServices),
  appliance: z.string().refine(value => bookingAppliances.some(item => item.value === value), 'Choose your appliance.'),
  brand: z.string().trim().max(80),
  zip: z.string().trim().regex(/^\d{5}$/, 'Enter a 5-digit ZIP code.'),
});

export const contactSchema = z.object({
  name: z.string().trim().min(2, 'Enter your full name.').max(120),
  phone: z.string().trim().max(30).refine(value => /^(1)?\d{10}$/.test(value.replace(/[\s()+.-]/g, '')), 'Enter a valid US phone number.'),
  email: z.string().trim().email('Enter a valid email address.').max(254),
  message: z.string().trim().min(1).max(4000),
  booking: bookingDetailsSchema.optional(),
});

export const bookingFormSchema = contactSchema.omit({ message: true, booking: true }).extend({
  ...bookingDetailsSchema.shape,
  message: z.string().trim().max(3000),
});

export type BookingFormData = z.infer<typeof bookingFormSchema>;
