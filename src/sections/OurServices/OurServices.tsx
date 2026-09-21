import React from 'react';
import './ourservices.css';
import SectionTitle from '@/component/SectionTitle/SectionTitle';
import { services as featuredServices } from '@/data/icondata';
import { services as serviceDetails } from '@/data/data';
import Link from 'next/link';
import Plus from '@/component/Svg/Plus';
import ApplianceService from '@/component/Svg/ApplianceService';
import { toApplianceKey } from '@/lib/booking';
import type { ApplianceTypeOption } from '@/lib/booking';

interface IPops {
  custom?: boolean;
  applianceTypes?: ApplianceTypeOption[];
}

export default function OurServices({ custom, applianceTypes }: IPops) {
  const detailSlugs = new Set(serviceDetails.map(service => service.slug));
  const backendServices = applianceTypes?.map(({ name, iconKey }) => {
    const slug = toApplianceKey(name);
    const hasDetailPage = detailSlugs.has(slug);
    return {
      id: name,
      name,
      icon: <ApplianceService iconKey={iconKey} />,
      link: hasDetailPage ? `/services/${slug}` : `/book-online?appliance=${encodeURIComponent(slug)}`,
      action: hasDetailPage ? 'Read more' : 'Book online',
    };
  });
  const services = backendServices ?? featuredServices.map(service => ({
    ...service,
    action: 'Read more',
  }));

  return (
    <div className="services">
      <div className="container">
        <div className="services-top">
          <div className="row services-row">
            <div className="col-xl-6 col-lg-6 ">
              <div className="services-top-left">
                <SectionTitle
                  tag="Our Services"
                  title="Making your appliances look their best."
                />
              </div>
            </div>
            <div className="col-xl-6 col-lg-6">
              <div className={`services-top-right ${custom && 'custom-right'}`}>
                <div className="service-top-icon">
                  <svg
                    viewBox="0 0 64 64"
                    fill="currentColor"
                    width={'80px'}
                    height={'80px'}
                  >
                    <path d="M47.6,42.11,39,40.2V38.106A14.049,14.049,0,0,0,45.41,30h.09a4.488,4.488,0,0,0,.5-8.949V15a14,14,0,0,0-28,0v6.051A4.488,4.488,0,0,0,18.5,30h.09A14.049,14.049,0,0,0,25,38.106V40.2L16.4,42.11A11.928,11.928,0,0,0,7,53.824V62a1,1,0,0,0,1,1H56a1,1,0,0,0,1-1V53.824A11.928,11.928,0,0,0,47.6,42.11ZM40,61H24V57H40Zm1-6H23a1,1,0,0,0-1,1v5H18V53H46v8H42V56A1,1,0,0,0,41,55ZM18,51V43.8l2-.444V51Zm28,0H44V43.358l2,.444Zm-4-8.087V51H22V42.913l3.114-.692a6.992,6.992,0,0,0,13.772,0ZM32,3.519l.979,1.119A20.272,20.272,0,0,1,37.955,17H26.045A20.272,20.272,0,0,1,31.021,4.638ZM42.519,19a15.831,15.831,0,0,1-21.038,0ZM48,25.5a2.5,2.5,0,0,1-2.154,2.465A13.99,13.99,0,0,0,46,26V23.051A2.5,2.5,0,0,1,48,25.5ZM44,15v2H39.955a22.278,22.278,0,0,0-5.47-13.679l-.066-.076A12.021,12.021,0,0,1,44,15ZM29.581,3.245l-.066.076A22.278,22.278,0,0,0,24.045,17H20V15A12.021,12.021,0,0,1,29.581,3.245ZM16,25.5a2.5,2.5,0,0,1,2-2.449V26a13.99,13.99,0,0,0,.154,1.965A2.5,2.5,0,0,1,16,25.5Zm4,.5V20.354a17.82,17.82,0,0,0,24,0V26a12,12,0,0,1-24,0ZM32,40a13.894,13.894,0,0,0,5-.939V41a5,5,0,0,1-10,0V39.061A13.894,13.894,0,0,0,32,40ZM9,53.824a9.933,9.933,0,0,1,7-9.54V61H9ZM55,61H48V44.284a9.933,9.933,0,0,1,7,9.54Z"></path>
                  </svg>
                </div>
                <div className="service-top-text">
                  We work to meet this ambitious goal by focusing on these key
                  areas of conservation.
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="services-mid">
          {!custom && <div className="service-bg-img"></div>}
          <ul className="services-mid-list">
            {services.map((service) => (
              <li key={service.id} className="services-list-item">
                <div
                  className={`services-list-icon ${custom && 'custom-icon'}`}
                >
                  {service.icon}
                </div>
                <div className="services-text-box">
                  <p className="service-list-name">
                    <Link href={service.link}>{service.name}</Link>
                  </p>
                  <p className={`service-list-text ${custom && 'custom-text'}`}>
                    Service and Repairs
                  </p>
                </div>
                <Link href={service.link} className="service-list-link">
                  {service.action}
                  <Plus width="13px" height="13px" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
        {!custom && (
          <div className="services-bottom">
            We Do All Differeent Services ....
            <Link href={'/services'}> View all Services</Link>
          </div>
        )}
      </div>
    </div>
  );
}
