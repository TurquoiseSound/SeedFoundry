import type { Metadata } from "next";
import Image from "next/image";
import Link from 'next/link';
import "./globals.css";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;

import GoalsProvider from './GoalsProvider'

export const metadata: Metadata = {
  title: "Institue of Wise Innovation | SEED Founding",
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
          <div className='max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-4 flex items-center'>
            <Link href='/' className="flex items-center group">
              <Image
                src="/seed_logo.png"
                alt="SEED Logo"
                width={36}
                height={36}
                className='transition-transform duration-300 group-hover:scale-110'
              />
              <h2 className='text-xl ml-3 text-gradient font-bold'>SEED Founding</h2>
            </Link>
          </div>
        </header>
        <div className='relative pt-16'>
          <GoalsProvider>
            {children}
          </GoalsProvider>
        </div>
      </body>
    </html>
  );
}