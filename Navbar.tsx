import React, { useState } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';

export type SectionId = 'home' | 'about' | 'skills' | 'projects' | 'journey' | 'contact';

interface NavbarProps {
  activeSection: SectionId;
  onNavigate: (id: SectionId) => void;
}

const NAV_ITEMS: { id: SectionId; label: string }[] = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'journey', label: 'Journey' },
  { id: 'contact', label: 'Contact' },
];

export const Navbar: React.FC<NavbarProps> = ({ activeSection, onNavigate }) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: SectionId) => {
    e.preventDefault();
    onNavigate(id);
    setMobileOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#08090B]/90 border-b border-[#F1F2F4]/[0.06] transition-colors">
      <div className="max-w-[1400px] mx-auto flex items-center justify-between gap-8 px-6 lg:px-12 h-20">
        {/* Zone 1: Single text element wordmark */}
        <a
          href="#home"
          onClick={(e) => handleNavClick(e, 'home')}
          className="font-display text-lg font-semibold tracking-tight text-[#F1F2F4] hover:text-[#C4C9D0] transition-colors whitespace-nowrap shrink-0"
        >
          benyamin<span className="font-editorial italic font-normal text-[#C4C9D0]">.fn</span>
        </a>

        {/* Zone 2: Concise single-line navigation links */}
        <nav
          aria-label="Primary Navigation"
          className="hidden md:flex items-center gap-8 font-mono-tech text-[11px] tracking-[0.18em] uppercase font-medium"
        >
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => handleNavClick(e, item.id)}
                className={`relative py-1.5 transition-colors whitespace-nowrap shrink-0 ${
                  isActive
                    ? 'text-[#F1F2F4]'
                    : 'text-[#C4C9D0]/65 hover:text-[#F1F2F4]'
                }`}
              >
                {item.label}
                <span
                  className={`absolute left-0 right-0 -bottom-0.5 h-[1.5px] bg-[#F1F2F4] transition-transform duration-200 origin-left ${
                    isActive ? 'scale-x-100' : 'scale-x-0'
                  }`}
                />
              </a>
            );
          })}
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-3 shrink-0">
          <a
            href="#contact"
            onClick={(e) => handleNavClick(e, 'contact')}
            className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 font-display text-xs font-medium tracking-wide text-[#F1F2F4] bg-[#121417] border border-[#C4C9D0]/30 rounded-full hover:border-[#F1F2F4] hover:bg-[#1B1F24] transition-all duration-200 whitespace-nowrap shrink-0"
          >
            <span>Let&apos;s Connect</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-[#C4C9D0]" />
          </a>

          <button
            type="button"
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((prev) => !prev)}
            className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-lg border border-[#C4C9D0]/20 text-[#F1F2F4] hover:bg-[#1B1F24] transition-colors"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Responsive Mobile Navigation Drawer */}
      {mobileOpen && (
        <div className="md:hidden bg-[#08090B] border-b border-[#C4C9D0]/15 px-6 py-6">
          <nav aria-label="Mobile Navigation" className="flex flex-col space-y-3">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(e) => handleNavClick(e, item.id)}
                  className={`py-2.5 font-mono-tech text-xs font-medium tracking-wider uppercase transition-colors ${
                    isActive ? 'text-[#F1F2F4]' : 'text-[#C4C9D0]/70 hover:text-[#F1F2F4]'
                  }`}
                >
                  {item.label}
                </a>
              );
            })}
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, 'contact')}
              className="mt-2 inline-flex items-center justify-center gap-2 px-5 py-3 font-display text-xs font-medium tracking-wide text-[#08090B] bg-[#F1F2F4] rounded-full hover:bg-[#C4C9D0] transition-colors"
            >
              <span>Let&apos;s Connect</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </nav>
        </div>
      )}
    </header>
  );
};
