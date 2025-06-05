'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useMediaQuery } from '@/hooks/useMediaQuery';

export default function Header() {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const isTablet = useMediaQuery('(min-width: 769px) and (max-width: 1024px)');

  return (
    <header className="header-container">
      <div className="max-w-7xl mx-auto pl-[35px] pr-4 sm:pr-6 lg:pr-8 py-1 relative flex justify-between items-start">
        <Link href="/" className="flex flex-col">
          {isMobile ? (
            // Mobile layout
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-bold text-white">IWI</h2>
              <span className="text-gradient font-bold">SEED</span>
            </div>
          ) : isTablet ? (
            // Tablet layout
            <div className="flex flex-col">
              <h2 className="text-xl font-bold text-white mb-0">Institute of Wise Innovation</h2>
              <h3 className="text-lg font-bold text-gradient">SEED FOUNDRY</h3>
            </div>
          ) : (
            // Desktop layout
            <div className="flex flex-col">
              <h2 className="text-[1.89rem] font-bold text-white mb-0 leading-tight">
                The Institute of Wise Innovation
              </h2>
              <h3 className="text-[1.69rem] font-bold text-gradient leading-tight">SEED FOUNDRY</h3>
            </div>
          )}
        </Link>
        <div className="flex flex-col items-end">
          <Image
            src="/seed_logo copy.png"
            alt="Institute of Wise Innovation Logo"
            width={isMobile ? 28 : 36}
            height={isMobile ? 28 : 36}
            className="transition-transform duration-300 hover:scale-110 mt-1"
            priority
          />
          <span className="text-white text-xs mt-1">Peer</span>
        </div>
      </div>
    </header>
  );
}