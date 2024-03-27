import type { Metadata } from "next";
import Image from "next/image";
import Link from 'next/link';
import { Inter } from "next/font/google";
import "./globals.css";
import "@fortawesome/fontawesome-svg-core/styles.css"; // import Font Awesome CSS
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false; // Tell Font Awesome to skip adding the CSS automatically since it's being imported above

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
      <body className={`${inter.className} bg-slate-200 p-3`}>
        <header className='align-middle'>
          <Link href='/'>
            <Image
              src="/seed_logo.png"
              alt="SEED Logo"
              width='40'
              height='40'
              className='inline'
            />
            <h1 className='text-2xl inline ml-2 align-middle' style={{ color:'#1489FB' }}>SEED Founding</h1>
          </Link>
        </header>
        <div className='px-10 pt-10'>{children}</div>
      </body>
    </html>
  );
}
