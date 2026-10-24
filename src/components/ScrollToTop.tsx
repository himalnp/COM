import React, { useState, useEffect } from 'react';
import { Language } from '../types';

interface ScrollToTopProps {
  lang?: Language;
}

export const ScrollToTop: React.FC<ScrollToTopProps> = ({ lang = 'ne' }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 280) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label={lang === 'ne' ? 'पृष्ठको माथि जानुहोस्' : 'Scroll to top'}
      title={lang === 'ne' ? 'माथि जानुहोस्' : 'Scroll to top'}
      className={`fixed bottom-6 right-6 z-40 flex items-center justify-center w-11 h-11 bg-[#701518] hover:bg-[#8f2024] text-white rounded-full shadow-lg border border-[#8f2024] cursor-pointer transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#701518] focus-visible:ring-offset-2 ${
        visible
          ? 'opacity-100 translate-y-0 pointer-events-auto'
          : 'opacity-0 translate-y-4 pointer-events-none'
      }`}
    >
      <span className="material-symbols-outlined text-xl">
        north
      </span>
    </button>
  );
};
