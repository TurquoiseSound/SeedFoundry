import type { Metadata } from 'next';
import Image from 'next/image';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Library | SEED Founding',
  description: 'How do you want to plant and grow your ethical tech business',
};

export default function LibraryLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="wrapper">
      <div>{children}</div>
    </div>
  );
}
