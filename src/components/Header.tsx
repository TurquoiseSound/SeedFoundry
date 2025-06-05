'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import { useMediaQuery } from '@/hooks/useMediaQuery';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const isMobile = !useMediaQuery('(min-width: 768px)');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'backdrop-blur-xl bg-black/30 border-b border-white/5' : ''
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 relative flex justify-between items-center">
        <Link href="/" className="flex items-center space-x-4">
          {!isMobile && (
            <div className="flex flex-col space-y-0">
              <h2 className="text-xl md:text-2xl font-bold text-white leading-none">
                The Institute of Wise Innovation
              </h2>
              <h3 className="text-lg md:text-xl font-bold text-gradient leading-none">
                SEED FOUNDRY
              </h3>
            </div>
          )}
          {isMobile && (
            <div className="flex items-center">
              <Image
                src="/seed_logo copy.png"
                alt="SEED Logo"
                width={32}
                height={32}
                className="transition-transform duration-300 hover:scale-110"
                priority
              />
              <span className="ml-3 text-lg font-bold text-white">SEED</span>
            </div>
          )}
        </Link>
      </div>
    </header>
  );
}