import type { Metadata } from "next";
import Image from "next/image";
import Link from 'next/link';
import { Inter } from "next/font/google";
import "./globals.css";

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
      <body className={`${inter.className} bg-slate-200`}>
        <header>
          <Link href='/'>
            <Image
              src="/seed_logo.png"
              alt="SEED Logo"
              width='72'
              height='72'
            />
          </Link>
        </header>
        <div className='px-20'>{children}</div>
      </body>
    </html>
  );
}
