import type { Metadata } from "next";
import Image from "next/image";
import Link from 'next/link';
import { Inter } from "next/font/google";
import "./globals.css";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;

import GoalsProvider from './GoalsProvider'

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SEED Founding",
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
        <div className="fixed inset-0 bg-gradient-radial from-primary-800/30 via-primary-900/50 to-primary-900 -z-10"></div>
        <header className='max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-6 flex items-center'>
          <Link href='/' className="flex items-center group">
            <Image
              src="/seed_logo.png"
              alt="SEED Logo"
              width={48}
              height={48}
              className='transition-transform duration-300 group-hover:scale-110'
            />
            <h2 className='text-2xl ml-4 text-gradient font-bold'>SEED Founding</h2>
          </Link>
        </header>
        <div className='relative'>
          <GoalsProvider>
            {children}
          </GoalsProvider>
        </div>
      </body>
    </html>
  );
}