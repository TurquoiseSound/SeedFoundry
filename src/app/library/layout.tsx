import '@fortawesome/fontawesome-svg-core/styles.css';
import { config } from '@fortawesome/fontawesome-svg-core';
import type { Metadata } from 'next';

config.autoAddCss = false;

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