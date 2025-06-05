'use client';

import { useEffect } from 'react';

export default function HeaderScroll() {
  useEffect(() => {
    const handleScroll = () => {
      const header = document.querySelector('.header-container');
      const divider = document.querySelector('.header-divider');
      if (header && divider) {
        if (window.scrollY > 20) {
          header.classList.add('scrolled');
          divider.classList.add('opacity-0');
        } else {
          header.classList.remove('scrolled');
          divider.classList.remove('opacity-0');
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return null;
}
