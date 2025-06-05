import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import './globals.css';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { config } from '@fortawesome/fontawesome-svg-core';
config.autoAddCss = false;

import GoalsProvider from './GoalsProvider';
import HeaderScroll from './HeaderScroll';

export const metadata: Metadata = {
  title: 'The Institute of Wise Innovation | SEED Foundry',
  description: 'How do you want to plant and grow your ethical tech business',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className="top-fade"></div>
        <header className="header-container">
          <div className="max-w-7xl mx-auto pl-[35px] pr-4 sm:pr-6 lg:pr-8 py-1 relative flex justify-between items-start">
            <Link href="/" className="flex flex-col">
              <h2 className="text-[1.89rem] font-bold text-white mb-0 leading-tight">
                The Institute of Wise Innovation
              </h2>
              <h3 className="text-[1.69rem] font-bold text-gradient leading-tight">SEED FOUNDRY</h3>
            </Link>
            <div className="flex flex-col items-end">
              <Image
                src="/cta_logo.png"
                alt="Collaborative Technology Alliance Logo"
                width={72}
                height={72}
                className="transition-transform duration-300 hover:scale-110 mt-1"
                priority
              />
            </div>
            <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-white/30 via-transparent to-white/30 transform transition-opacity duration-300 header-divider"></div>
          </div>
        </header>
        <div className="relative pt-20">
          <GoalsProvider>{children}</GoalsProvider>
        </div>
        <div className="text-center mt-8 mb-4">
          <small className="text-emerald-200 text-sm">
            Incubated at{' '}
            <a
              href="https://www.collaborative.tech/"
              className="text-emerald-200 hover:text-emerald-100 transition-colors duration-300"
              target="_blank"
              rel="noopener noreferrer"
            >
              The Collaborative Technology Alliance
            </a>{' '}
            |{' '}
            Team:{' '}
            <a
              href="https://turquoisesound.com"
              className="text-emerald-200 hover:text-emerald-100 transition-colors duration-300"
              target="_blank"
              rel="noopener noreferrer"
            >
              Turquoise Sound
            </a>
            ,{' '}
            <a
              href="https://xplusx.co"
              className="text-emerald-200 hover:text-emerald-100 transition-colors duration-300"
              target="_blank"
              rel="noopener noreferrer"
            >
              LX
            </a>
            ,{' '}
            <a
              href="https://www.linkedin.com/in/daywaterbury"
              className="text-emerald-200 hover:text-emerald-100 transition-colors duration-300"
              target="_blank"
              rel="noopener noreferrer"
            >
              Day Waterbury
            </a>
            ,{' '}
            <a
              href="https://www.linkedin.com/in/michaelgrossman"
              className="text-emerald-200 hover:text-emerald-100 transition-colors duration-300"
              target="_blank"
              rel="noopener noreferrer"
            >
              Michael Grossman
            </a>
            ,{' '}
            <a
              href="https://tibetsprague.com"
              className="text-emerald-200 hover:text-emerald-100 transition-colors duration-300"
              target="_blank"
              rel="noopener noreferrer"
            >
              Tibet Sprague
            </a>
            ,{' '}
            <a
              href="https://www.linkedin.com/in/aaronbrodeur"
              className="text-emerald-200 hover:text-emerald-100 transition-colors duration-300"
              target="_blank"
              rel="noopener noreferrer"
            >
              Aaron Brodeur
            </a>
            ,{' '}
            <a
              href="https://www.linkedin.com/in/samuelliebeskind"
              className="text-emerald-200 hover:text-emerald-100 transition-colors duration-300"
              target="_blank"
              rel="noopener noreferrer"
            >
              Sam Liebeskind
            </a>
            ,{' '}
            <a
              href="https://byrongo.com/"
              className="text-emerald-200 hover:text-emerald-100 transition-colors duration-300"
              target="_blank"
              rel="noopener noreferrer"
            >
              Byron Go
            </a>
          </small>
        </div>
        <HeaderScroll />
      </body>
    </html>
  );
}