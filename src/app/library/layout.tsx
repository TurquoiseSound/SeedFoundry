import type { Metadata } from 'next';

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

// src/app/layout.tsx or pages/_app.tsx
import '@fortawesome/fontawesome-svg-core/styles.css';
import { config } from '@fortawesome/fontawesome-svg-core';
config.autoAddCss = false;

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
