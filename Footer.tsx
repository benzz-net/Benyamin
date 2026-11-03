import React from 'react';
import { ArrowUp } from 'lucide-react';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-[#F1F2F4]/[0.08] bg-[#08090B] py-12">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div>
          <p className="font-display text-base font-semibold tracking-tight text-[#F1F2F4]">
            Benyamin Fernando{' '}
            <span className="font-editorial italic font-normal text-[#C4C9D0]">
              Napitupulu
            </span>
          </p>
          <p className="font-editorial italic text-base text-[#C4C9D0]/80 mt-1">
            Designed &amp; Developed with curiosity.
          </p>
        </div>

        <div className="flex items-center gap-6">
          <p className="font-mono-tech text-xs text-[#71869B]">
            &copy; {currentYear} Benyamin Fernando Napitupulu · SMAN 1 Tualang (11.1)
          </p>
          <button
            type="button"
            onClick={scrollToTop}
            aria-label="Scroll back to top"
            className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-[#121417] border border-[#C4C9D0]/20 text-[#C4C9D0] hover:text-[#F1F2F4] hover:border-[#F1F2F4] transition-colors"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
};
