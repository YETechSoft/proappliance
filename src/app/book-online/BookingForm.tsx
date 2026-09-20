'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { bookingAppliances, bookingServices, bookingFormSchema, type BookingFormData } from '@/lib/booking';

export default function BookingForm({ initialAppliance }: { initialAppliance: string }) {
  const [sent, setSent] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<BookingFormData>({
    resolver: zodResolver(bookingFormSchema),
    defaultValues: {
      service: 'Repair',
      appliance: bookingAppliances.some(item => item.value === initialAppliance) ? initialAppliance : '',
      name: '', phone: '', email: '', brand: '', zip: '', message: '',
    },
  });

  const submit = async ({ service, appliance, brand, zip, message, ...contact }: BookingFormData) => {
    setSubmitError('');
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 20000);
    try {
      const response = await fetch('/api/sendMail', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...contact, message: message || 'No additional details provided.', booking: { service, appliance, brand, zip } }),
        signal: controller.signal,
      });
      const data = await response.json();
      if (!response.ok || !data.success) throw new Error('Submission failed');
      setSent(true);
      reset();
    } catch {
      setSubmitError('We couldn’t send your request. Please try again or call +1 (978) 932-8806. Your details have been kept.');
    } finally {
      window.clearTimeout(timeout);
    }
  };

  if (sent) return (
    <section className="booking-success" role="status" aria-live="polite">
      <i className="bi bi-check-circle-fill" aria-hidden="true" />
      <h2>Your service request has been sent.</h2>
      <p>Our team will contact you to discuss your appliance and confirm an appointment. Your visit is not scheduled yet.</p>
      <button type="button" className="booking-submit" onClick={() => setSent(false)}>Send another request</button>
    </section>
  );

  return (
    <form className="booking-form" onSubmit={handleSubmit(submit)} noValidate>
      <fieldset disabled={isSubmitting} className="booking-fields">
        <fieldset className="booking-section">
          <legend><span>01</span> Select service</legend>
          <div className="booking-options booking-service-options">
            {bookingServices.map(service => <label className="booking-option" key={service}>
              <input type="radio" value={service} {...register('service')} />
              <span><i className="bi bi-check-circle-fill" aria-hidden="true" />{service}</span>
            </label>)}
          </div>
        </fieldset>

        <fieldset className="booking-section">
          <legend><span>02</span> Choose your appliance</legend>
          <div className="booking-options" aria-describedby={errors.appliance ? 'appliance-error' : undefined}>
            {bookingAppliances.map(item => <label className="booking-option" key={item.value}>
              <input type="radio" value={item.value} aria-invalid={!!errors.appliance} {...register('appliance')} />
              <span><i className="bi bi-check-circle-fill" aria-hidden="true" />{item.label}</span>
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
              ['zip', 'Service ZIP code', 'text', 'postal-code', '02148'],
              ['brand', 'Appliance brand (optional)', 'text', 'off', 'e.g. Whirlpool, Samsung, LG'],
            ] as const).map(([name, label, type, autoComplete, placeholder]) => <div className="booking-field" key={name}>
              <label htmlFor={`booking-${name}`}>{label}</label>
              <input id={`booking-${name}`} type={type} autoComplete={autoComplete} placeholder={placeholder}
                inputMode={name === 'zip' ? 'numeric' : undefined} maxLength={name === 'zip' ? 5 : name === 'brand' ? 80 : name === 'phone' ? 30 : name === 'name' ? 120 : 254}
                aria-required={name !== 'brand'} aria-invalid={!!errors[name]} aria-describedby={errors[name] ? `${name}-error` : undefined} {...register(name)} />
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
