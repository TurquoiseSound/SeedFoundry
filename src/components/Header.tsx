'use client';

import Image from 'next/image';
import Link from 'next/link';

import { useMediaQuery } from '@/hooks/useMediaQuery';

export default function Header() {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const isTablet = useMediaQuery('(min-width: 769px) and (max-width: 1024px)');

  return (
    <header className="header-container">
      <div className="max-w-7xl mx-auto pl-[35px] pr-4 sm:pr-6 lg:pr-8 h-full flex justify-between items-center">
        <Link href="/" className="flex items-center">
          {isMobile ? (
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-bold text-white">
                IWI <span className="text-gradient">SEED FOUNDRY</span>
              </h2>
            </div>
          ) : isTablet ? (
            <div className="flex items-center gap-3">
              <h2 className="text-xl font-bold text-white">
                Institute of Wise Innovation <span className="text-gradient">SEED FOUNDRY</span>
              </h2>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <h2 className="text-2xl font-bold text-white">
                The Institute of Wise Innovation <span className="text-gradient">SEED FOUNDRY</span>
              </h2>
            </div>
          )}
        </Link>
        <div className="flex items-center gap-4">
         
          <Image
            src="/seed_logo.png?auto=compress&cs=tinysrgb&w=50&h=50&fit=crop"
            alt="Institute of Wise Innovation Logo"
            width={isMobile ? 28 : 36}
            height={isMobile ? 28 : 36}
            className="transition-transform duration-300 hover:scale-110"
            priority
          />
        </div>
      </div>
    </header>
  );
}