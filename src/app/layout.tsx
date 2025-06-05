import type { Metadata } from "next";
import Image from "next/image";
import Link from 'next/link';
import "./globals.css";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;

import GoalsProvider from './GoalsProvider'

export const metadata: Metadata = {
  title: "The Institute of Wise Innovation | SEED Foundry",
  description: "How do you want to plant and grow your ethical tech business",
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
        <header className='header-container'>
          <div className='max-w-7xl mx-auto pl-[50px] pr-4 sm:pr-6 lg:pr-8 py-1 relative flex justify-between items-start'>
            <Link href='/' className="flex flex-col">
              <h2 className='text-[2.1rem] font-bold text-white mb-0 leading-tight'>The Institute of Wise Innovation</h2>
              <h3 className='text-[2.25rem] font-bold text-gradient leading-tight'>SEED FOUNDRY</h3>
            </Link>
            <Image
              src="/seed_logo.png"
              alt="Institute of Wise Innovation Logo"
              width={72}
              height={72}
              className='transition-transform duration-300 hover:scale-110 mt-1'
            />
            <div className='absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-white/30 via-transparent to-white/30 transform transition-opacity duration-300 header-divider'></div>
          </div>
        </header>
        <div className='relative pt-20'>
          <GoalsProvider>
            {children}
          </GoalsProvider>
        </div>
        <script dangerouslySetInnerHTML={{
          __html: `
            window.addEventListener('scroll', () => {
              const header = document.querySelector('.header-container');
              const divider = document.querySelector('.header-divider');
              if (window.scrollY > 20) {
                header.classList.add('scrolled');
                divider.classList.add('opacity-0');
              } else {
                header.classList.remove('scrolled');
                divider.classList.remove('opacity-0');
              }
            });
          `
        }} />
      </body>
    </html>
  );
}