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
          <div className='max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-4'>
            <Link href='/' className="flex items-start group">
              <Image
                src="/seed_logo.png"
                alt="Institute of Wise Innovation Logo"
                width={48}
                height={48}
                className='transition-transform duration-300 group-hover:scale-110'
              />
              <div className="ml-4">
                <h2 className='text-2xl font-bold text-white mb-0'>The Institute of Wise Innovation</h2>
                <h3 className='text-xl font-bold text-gradient'>SEED FOUNDRY</h3>
              </div>
            </Link>
          </div>
        </header>
        <div className='relative pt-24'>
          <GoalsProvider>
            {children}
          </GoalsProvider>
        </div>
        <script dangerouslySetInnerHTML={{
          __html: `
            window.addEventListener('scroll', () => {
              const header = document.querySelector('.header-container');
              if (window.scrollY > 20) {
                header.classList.add('scrolled');
              } else {
                header.classList.remove('scrolled');
              }
            });
          `
        }} />
      </body>
    </html>
  );
}