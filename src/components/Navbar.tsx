'use client';

import Image from 'next/image';
import React, { useCallback, useEffect, useState } from 'react';
import {
  BellIcon,
  MagnifyingGlassIcon,
  ChevronDownIcon,
} from '@heroicons/react/24/outline';
import AccountMenu from './AccountMenu';
import MobileMenu from './MobileMenu';
import NavbarItem from './NavbarItem';

const TOP_OFFSET = 66;

export default function Navbar() {
  const [showAccountMenu, setShowAccountMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showBackground, setShowBackground] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > TOP_OFFSET) {
        setShowBackground(true);
      } else {
        setShowBackground(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleAccountMenu = useCallback(() => {
    setShowAccountMenu((prev) => !prev);
  }, []);

  const toggleMobileMenu = useCallback(() => {
    setShowMobileMenu((prev) => !prev);
  }, []);

  return (
    <nav className="fixed z-40 w-full text-white">
      <div
        className={`flex items-center px-4 py-6 transition duration-500 md:px-16 ${
          showBackground ? 'bg-zinc-900/90' : ''
        }`}
      >
        <figure className="relative h-4 w-24 lg:h-7 lg:w-36">
          <Image
            src="/images/logo.png"
            alt="logo"
            fill
            sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw"
            priority={true}
          />
        </figure>

        <div className="ml-8 hidden gap-7 lg:flex">
          <NavbarItem label="Home" active />
          <NavbarItem label="Series" />
          <NavbarItem label="Films" />
          <NavbarItem label="New & Popular" />
          <NavbarItem label="My List" />
          <NavbarItem label="Browse by Languages" />
        </div>

        <div
          onClick={toggleMobileMenu}
          className="relative ml-8 flex cursor-pointer items-center gap-2 lg:hidden"
        >
          <p className="text-sm text-white">Browse</p>
          <ChevronDownIcon
            className={`w-4 fill-white text-white transition ${
              showMobileMenu ? 'rotate-180' : 'rotate-0'
            }`}
          />
          <MobileMenu visible={showMobileMenu} />
        </div>

        <div className="ml-auto flex items-center gap-7">
          <div className="cursor-pointer text-gray-200 transition hover:text-gray-300">
            <MagnifyingGlassIcon className="w-6" />
          </div>
          <div className="cursor-pointer text-gray-200 transition hover:text-gray-300">
            <BellIcon className="w-6" />
          </div>
          <div
            onClick={toggleAccountMenu}
            className="relative flex cursor-pointer items-center gap-2"
          >
            <figure className="relative h-6 w-6 overflow-hidden rounded-md lg:h-10 lg:w-10">
              <Image src="/images/default-blue.png" fill alt="profile button" />
            </figure>
            <ChevronDownIcon
              className={`w-4 fill-white text-white transition ${
                showAccountMenu ? 'rotate-180' : 'rotate-0'
              }`}
            />
            <AccountMenu visible={showAccountMenu} />
          </div>
        </div>
      </div>
    </nav>
  );
}
