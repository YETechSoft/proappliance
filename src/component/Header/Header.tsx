'use client';

import React, { useEffect, useState } from 'react';
import './header.css';
import Nav from '@/component/Navbar/Nav';
import Link from 'next/link';
import NavMobile from '../NavMobile/NavMobile';
import Image from 'next/image';
import BookOnline from '../BookOnline/BookOnline';

const Header = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const toggleMenu = () => {
    setOpenMenu(!openMenu);
  };

  const handleScroll = () => {
    if (window.scrollY > 50) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      <header
        id={'header'}
        className={`header d-flex align-items-center fixed-top ${
          isScrolled ? 'scrolled' : ''
        }`}
      >
        <div className="container-fluid  d-flex align-items-center justify-content-between">
          <Link href="/" className="logo d-flex align-items-center">
            <Image
              src={'/pro-logo.png'}
              alt="logo"
              layout="intrinsic"
              width={365}
              height={240}
              priority
            />
          </Link>
          <Nav />
          <div className="header-actions">
            <a className="header-phone" href="tel:+19789328806">
              <i className="bi bi-telephone-fill" aria-hidden="true" />
              <span>+1 (978) 932-8806</span>
            </a>
            <BookOnline />
          </div>
          <div className="mobile-menu">
            <a className="mobile-menu-button" href="#" onClick={toggleMenu}>
              <span className="icon-dots-menu-1"></span>
              <span className="icon-dots-menu-2"></span>
            </a>
          </div>
          <NavMobile
            onClose={() => {
              console.log('clik close');
              setOpenMenu(false);
            }}
            open={openMenu}
          />
        </div>
      </header>
      <nav className="mobile-booking-bar" aria-label="Book a repair or call us">
        <BookOnline />
        <a className="mobile-booking-call" href="tel:+19789328806">
          <i className="bi bi-telephone-fill" aria-hidden="true" />
          <span>Call Now</span>
        </a>
      </nav>
    </>
  );
};

export default Header;
