import SectionTitle from '@/component/SectionTitle/SectionTitle';
import Facebook from '@/component/Svg/Facebook';
import Hero from '@/sections/Hero/Hero';
import React from 'react';
import './contact.css';

export const metadata = {
  title: 'Contact Us | Pro Appliance Express - Boston Appliance Repair',
  description:
    'Need to schedule an appliance repair? Contact Pro Appliance Express in Boston for fast and friendly service. Call, email, or fill out our contact form today.',
  keywords: [
    'Contact Pro Appliance Express',
    'Appliance repair contact',
    'Appliance repair Boston',
    'Schedule service',
    'Call appliance technician',
    'Boston home appliance repair',
    'Email appliance repair company',
    'Contact appliance service',
  ],
  openGraph: {
    title: 'Contact Us | Pro Appliance Express',
    description:
      'Reach out to Pro Appliance Express in Boston for expert appliance repair services. We’re here to help!',
    url: 'https://proapplianceexpress.com/contact',
    type: 'website',
    siteName: 'Pro Appliance Express',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Contact Pro Appliance Express',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact Us | Pro Appliance Express',
    description:
      'Get in touch with our appliance repair experts in Boston. Fast & friendly support from Pro Appliance Express.',
    images: ['/og-image.jpg'],
  },
};

export default function Contact() {
  return (
    <main id="main">
      <Hero title="contact" />
      <section className="contact">
        <div className="container">
          <div className="row">
            <div className="col-xl-6 col-lg-6 contact-left">
              <div className="contct-title">
                <SectionTitle tag="Get in touch" title="Have any questions?" />
              </div>
              <div className="contact-text">
                <p className="contact-text-sub">
                  Contact us with any and all of your appliance concerns today,
                  we’ll get your appliances repaired so you can get back to
                  normal!
                </p>
                <div className="contact-items">
                  <div className="contact-item">
                    <i className="bi bi-geo-alt"></i>
                    <div className="contact-item-content">
                      <a href="#" className="contact-item-link">
                        Location
                      </a>
                      <p className="contact-item-desc">
                        75 Wolcott St, Malden, MA 02148, United States
                      </p>
                    </div>
                  </div>
                  <div className="contact-item">
                    <i className="bi bi-envelope-at"></i>
                    <div className="contact-item-content">
                      <a
                        href="mailto:proapplianceexpress@gmail.com"
                        className="contact-item-link"
                      >
                        Email us
                      </a>
                      <p className="contact-item-desc">
                        proapplianceexpress@gmail.com
                      </p>
                    </div>
                  </div>
                  <div className="contact-item">
                    <i className="bi bi-telephone-inbound"></i>
                    <div className="contact-item-content">
                      <a href="tel:+19789328806" className="contact-item-link">
                        Call us
                      </a>
                      <p className="contact-item-desc">
                        +1 (978) 932-8806</p>
                    </div>
                  </div>
                </div>
                <div className="contact-bottom">
                  <h5>Follow our social media : </h5>
                  <div className="contact-bottom-icons">
                    <a href="#">
                      <Facebook width="20px" height="20px" color="#00a7eb" />
                    </a>
                    <a href="#">
                      <i className="bi bi-instagram"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-6 col-lg-6 contact-right">
              {/* <iframe
                loading="lazy"
                src="https://maps.google.com/maps?q=Fasteny%20Appliance%20Repair%20LLC&amp;t=m&amp;z=14&amp;output=embed&amp;iwloc=near"
                title="Pro Appliance Express"
                aria-label="Pro Appliance Express"
              ></iframe> */}
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5889.606779920423!2d-71.06379942416685!3d42.431919671186385!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89e373d76449ced1%3A0x24ea94bf57b95fef!2s75%20Wolcott%20St%2C%20Malden%2C%20MA%2002148!5e0!3m2!1saz!2sus!4v1743953391431!5m2!1saz!2sus"
                title="Pro Appliance Express"
                aria-label="Pro Appliance Express"
                loading="lazy"
              ></iframe>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
