import HeroHome from '@/sections/HeroHome/HeroHome';
import OurServices from '@/sections/OurServices/OurServices';
import './page.css';
import AboutUs from '@/sections/AboutUs/AboutUs';
import BrandsRepair from '@/sections/BrandsRepair/BrandsRepair';
import ServiceRequest from '@/sections/ServiceRequest/ServiceRequest';
import Pricing from '@/sections/Pricing/Pricing';

export default function Home() {
  return (
    <main id={'main'}>
      <HeroHome />
      <div className="service-wrapper">
        <OurServices />
      </div>
      <AboutUs />
      <div className="pricing-wrapper">
        <Pricing />
      </div>
      <div className="request-wrapper" id="home-service-request">
        <ServiceRequest />
      </div>
      <BrandsRepair />
    </main>
  );
}
