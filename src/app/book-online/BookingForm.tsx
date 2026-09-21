'use client';

import { useMemo, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { createBookingFormSchema, toApplianceKey, type BookingFormData, type BookingOptions } from '@/lib/booking';

export default function BookingForm({ initialAppliance, options }: { initialAppliance: string; options: BookingOptions }) {
  const [createdOrderNumber, setCreatedOrderNumber] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState('');
  const idempotencyKey = useRef<string | null>(null);
  const selectedAppliance = options.applianceTypes.find(item => toApplianceKey(item.name) === toApplianceKey(initialAppliance))?.name ?? '';
  const schema = useMemo(() => createBookingFormSchema(options), [options]);
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<BookingFormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      service: options.serviceTypes[0] ?? '',
      appliance: selectedAppliance,
      name: '', phone: '', email: '', brand: '', model: '', address: '', unitOrApt: '', city: '', state: '', zip: '', message: '',
    },
  });

  const submit = async (values: BookingFormData) => {
    setSubmitError('');
    idempotencyKey.current ??= crypto.randomUUID();
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 20000);
    try {
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Idempotency-Key': idempotencyKey.current },
        body: JSON.stringify(values),
        signal: controller.signal,
      });
      const data = await response.json();
      if (!response.ok || !data.orderNumber) throw new Error(data.message || 'Submission failed');
      setCreatedOrderNumber(data.orderNumber);
      idempotencyKey.current = null;
      reset();
    } catch (error) {
      setSubmitError(error instanceof Error && error.message !== 'Submission failed'
        ? error.message
        : 'We couldn’t create your order. Please try again or call +1 (978) 932-8806. Your details have been kept.');
    } finally {
      window.clearTimeout(timeout);
    }
  };

  if (createdOrderNumber) return (
    <section className="booking-success" role="status" aria-live="polite">
      <i className="bi bi-check-circle-fill" aria-hidden="true" />
      <h2>Your order has been created.</h2>
      <p>Order #{createdOrderNumber} is now in our system with New status. Our team will contact you to confirm the appointment details.</p>
      <button type="button" className="booking-submit" onClick={() => setCreatedOrderNumber(null)}>Create another request</button>
    </section>
  );

  return (
    <form className="booking-form" onSubmit={handleSubmit(submit)} noValidate>
      <fieldset disabled={isSubmitting} className="booking-fields">
        <fieldset className="booking-section">
          <legend><span>01</span> Select service</legend>
          <div className="booking-options booking-service-options">
            {options.serviceTypes.map(service => <label className="booking-option" key={service}>
              <input type="radio" value={service} {...register('service')} />
              <span><i className="bi bi-check-circle-fill" aria-hidden="true" />{service}</span>
            </label>)}
          </div>
        </fieldset>

        <fieldset className="booking-section">
          <legend><span>02</span> Choose your appliance</legend>
          <div className="booking-options" aria-describedby={errors.appliance ? 'appliance-error' : undefined}>
            {options.applianceTypes.map(appliance => <label className="booking-option" key={appliance.name}>
              <input type="radio" value={appliance.name} aria-invalid={!!errors.appliance} {...register('appliance')} />
              <span><i className="bi bi-check-circle-fill" aria-hidden="true" />{appliance.name}</span>
            </label>)}
          </div>
          {errors.appliance && <p id="appliance-error" className="booking-error" role="alert">{errors.appliance.message}</p>}
        </fieldset>

        <fieldset className="booking-section">
          <legend><span>03</span> Enter your information</legend>
          <div className="booking-input-grid">
            {([
              ['name', 'Full name', 'text', 'name', 'Your name'],
              ['phone', 'Phone number', 'tel', 'tel', '+1 (978) 555-0123'],
              ['email', 'Email address', 'email', 'email', 'you@example.com'],
              ['address', 'Service address', 'text', 'street-address', '75 Wolcott St'],
              ['unitOrApt', 'Unit or Apt (optional)', 'text', 'address-line2', 'Unit 2'],
              ['city', 'City', 'text', 'address-level2', 'Malden'],
              ['state', 'State', 'text', 'address-level1', 'MA'],
              ['zip', 'Service ZIP code', 'text', 'postal-code', '02148'],
              ['brand', 'Appliance brand (optional)', 'text', 'off', 'e.g. Whirlpool, Samsung, LG'],
              ['model', 'Appliance model (optional)', 'text', 'off', 'Model number'],
            ] as const).map(([name, label, type, autoComplete, placeholder]) => <div className="booking-field" key={name}>
              <label htmlFor={`booking-${name}`}>{label}</label>
              <input id={`booking-${name}`} type={type} autoComplete={autoComplete} placeholder={placeholder}
                inputMode={name === 'zip' ? 'numeric' : undefined} maxLength={name === 'zip' ? 20 : name === 'brand' ? 80 : name === 'phone' ? 30 : name === 'name' || name === 'unitOrApt' ? 120 : name === 'address' ? 500 : name === 'email' ? 254 : 100}
                aria-required={!['brand', 'model', 'unitOrApt'].includes(name)} aria-invalid={!!errors[name]} aria-describedby={errors[name] ? `${name}-error` : undefined} {...register(name)} />
              {errors[name] && <p id={`${name}-error`} className="booking-error" role="alert">{errors[name]?.message}</p>}
            </div>)}
            <div className="booking-field booking-message">
              <label htmlFor="booking-message">Tell us about the problem (optional)</label>
              <textarea id="booking-message" rows={3} maxLength={3000} placeholder="What is happening with your appliance?" {...register('message')} />
            </div>
          </div>
        </fieldset>
        <p className="booking-note">By submitting, you agree to be contacted about this service request. We’ll confirm availability with you before scheduling a visit.</p>
        {submitError && <p className="booking-error booking-submit-error" role="alert">{submitError}</p>}
        <button className="booking-submit" type="submit" disabled={isSubmitting} aria-busy={isSubmitting}>
          {isSubmitting ? 'Sending request…' : 'Send service request'}
          <i className="bi bi-arrow-right" aria-hidden="true" />
        </button>
      </fieldset>
    </form>
  );
}
