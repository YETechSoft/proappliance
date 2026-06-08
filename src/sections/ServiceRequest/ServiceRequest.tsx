'use client';
import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import Swal from 'sweetalert2';
import './servicerequest.css';

interface IProps {
  custom?: boolean;
}

const schema = z.object({
  name: z
    .string()
    .min(2, { message: 'Must be more than two characters' })
    .refine((value: string) => value.trim() !== '', {
      message: 'Name is required',
    }),
  phone: z
    .string()
    .min(1, 'Phone number is required')
    .regex(/^(?:\(\d{3}\)\s?|\d{3}[-.\s]?)\d{3}[-.\s]?\d{4}$/, {
      message: 'Invalid phone number format',
    }),
  email: z.string().regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, {
    message: 'Invalid email',
  }),
  message: z
    .string()
    .min(10, { message: 'Minimum 10 symbols' })
    .refine((value) => value.trim() !== '', { message: 'Message is required' }),
});

type FormData = z.infer<typeof schema>;

export default function ServiceRequest({ custom }: IProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (formData: FormData) => {
    const controller = new AbortController();
    const timeoutId = window.setTimeout(() => controller.abort(), 20000);

    try {
      const res = await fetch('/api/sendMail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
        signal: controller.signal,
      });

      const data = await res.json();
      if (data.success) {
        Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: 'Your message has been sent successfully!',
          timer: 5000,
        });
        reset();
        return;
      }

      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: data.error || 'Something wrong',
        timer: 5000,
      });
    } catch (error) {
      const isAbort = error instanceof DOMException && error.name === 'AbortError';

      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: isAbort
          ? 'Request timed out. Please try again shortly.'
          : 'Something went wrong',
        timer: 5000,
      });
    } finally {
      window.clearTimeout(timeoutId);
    }
  };

  return (
    <section className="request">
      <div className="container">
        <div className="row">
          <div className="col-xl-6 col-lg-6">
            <div className="request-left">
              <h3 className={`request-title ${custom ? 'custom-title' : ''}`}>
                Appliance Repair Specialist in Your Neighborhood
              </h3>
              <a
                className={`request-call ${custom ? 'custom-call' : ''}`}
                href="tel:+19789328806"
              >
                +1 (978) 932-8806
              </a>
            </div>
          </div>
          <div className="col-xl-6 col-lg-6">
            <div className="request-right">
              <h2 className="request-form-title">Submit a Service Request</h2>
              <form className="request-form" onSubmit={handleSubmit(onSubmit)}>
                <div className="row">
                  <div className="col-xl-12">
                    <input
                      type="text"
                      placeholder="Your Name"
                      className="request-form-field"
                      {...register('name')}
                    />
                    <p className="error">
                      {errors.name && `* ${errors.name.message}`}
                    </p>
                  </div>
                  <div className="col-xl-12">
                    <input
                      type="text"
                      placeholder="Phone No."
                      className="request-form-field"
                      {...register('phone')}
                    />
                    <p className="error">
                      {errors.phone && `* ${errors.phone.message}`}
                    </p>
                  </div>
                  <div className="col-xl-12">
                    <input
                      type="email"
                      placeholder="Email Address"
                      className="request-form-field"
                      {...register('email')}
                    />
                    <p className="error">
                      {errors.email && `* ${errors.email.message}`}
                    </p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-xl-12">
                    <textarea
                      placeholder="Message"
                      className="request-form-area"
                      {...register('message')}
                    ></textarea>
                    <p className="error">
                      {errors.message && `* ${errors.message.message}`}
                    </p>
                    <button
                      className="request-form-btn"
                      type="submit"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'sending' : 'send request'}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
