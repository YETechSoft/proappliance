import React from 'react';
import './pricing.css';

const includedItems = [
  'Professional in-home appliance diagnosis',
  'Thorough inspection and troubleshooting',
  'Clear explanation of the problem',
  'Upfront repair estimate, no hidden fees',
  '$99 credited toward repair if approved',
];

const goodToKnowItems = [
  'Fee is non-refundable once diagnosis is complete',
  'Credit applies only to the diagnosed appliance',
  'If you decline repair, only the $99 fee applies',
  'No repair performed without your approval',
];

export default function Pricing() {
  return (
    <section className="pricing">
      <div className="container">
        <div className="pricing-shell">
          <p className="pricing-eyebrow">Pricing</p>
          <h2 className="pricing-title">$99 service call & diagnostic fee</h2>
          <p className="pricing-description">
            Covers technician travel, full inspection, professional diagnostics
            and a clear explanation of the issue before any repair begins.
          </p>

          <div className="pricing-grid">
            <div className="pricing-card pricing-card-accent">
              <div className="pricing-card-head">
                <span className="pricing-icon pricing-icon-filled">
                  <span className="pricing-icon-square"></span>
                </span>
                <h3>What&apos;s included</h3>
              </div>
              <ul className="pricing-list">
                {includedItems.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>

            <div className="pricing-card">
              <div className="pricing-card-head">
                <span className="pricing-icon">
                  <span className="pricing-icon-square"></span>
                </span>
                <h3>Good to know</h3>
              </div>
              <ul className="pricing-list pricing-list-muted">
                {goodToKnowItems.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="pricing-actions">
            <a href="#home-service-request" className="pricing-button">
              Service Request
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
