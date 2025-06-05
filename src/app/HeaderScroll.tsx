'use client';

import { useEffect } from 'react';

export default function HeaderScroll() {
  useEffect(() => {
    const handleScroll = () => {
      const header = document.querySelector('.header-container');
      if (header) {
        if (window.scrollY > 20) {
          header.classList.add('scrolled');
        } else {
          header.classList.remove('scrolled');
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return null;
}