import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { RESORT_IMAGES } from '../data/resortData';

const NAV_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'About Us', href: '#about' },
  { label: 'Facilities', href: '#facilities' },
  { label: 'Experiences', href: '#experiences' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Location', href: '#location' },
  { label: 'Contact Us', href: '#booking' },
] as const;

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 48);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const handleLinkClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-40 transition-colors duration-300 ${
          isScrolled
            ? 'bg-[#F8F5EC]/95 backdrop-blur-md border-b border-[#E8DDC8] text-[#183D2B]'
            : 'bg-gradient-to-b from-[#183D2B]/70 to-transparent text-[#F8F5EC]'
        }`}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8 h-20 flex items-center justify-between gap-8">
          {/* Zone 1: Clean single-element Brand Zone with transparent logo */}
          <a
            href="#home"
            aria-label="Aarambh Farmhouse Staycation & Resort Home"
            className="flex items-center whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#607D50] rounded-sm"
          >
            <img
              src={isScrolled ? RESORT_IMAGES.brandLogoLight : RESORT_IMAGES.brandLogoDark}
              alt="Aarambh Farmhouse Staycation & Resort"
              className={`h-12 sm:h-14 w-auto object-contain transition-opacity duration-200 ${
                isScrolled ? '' : 'drop-shadow-[0_2px_8px_rgba(0,0,0,0.45)]'
              }`}
            />
          </a>

          {/* Zone 2: Clean single-line text navigation links */}
          <nav
            aria-label="Primary Navigation"
            className="hidden lg:flex items-center gap-7"
          >
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`relative text-sm font-medium whitespace-nowrap shrink-0 py-1 transition-colors duration-200 after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[1.5px] after:w-0 after:transition-all after:duration-200 hover:after:w-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#607D50] rounded-sm ${
                  isScrolled
                    ? 'text-[#242824]/85 hover:text-[#183D2B] after:bg-[#183D2B]'
                    : 'text-[#F8F5EC]/90 hover:text-[#FFFFFF] after:bg-[#F8F5EC]'
                }`}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Zone 3: Single primary CTA + mobile menu toggle */}
          <div className="flex items-center gap-3 shrink-0">
            <a
              href="#booking"
              className={`hidden sm:inline-flex items-center justify-center px-5 py-2.5 text-sm font-medium rounded-full transition-all duration-200 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#607D50] ${
                isScrolled
                  ? 'bg-[#183D2B] text-[#F8F5EC] hover:bg-[#23533B]'
                  : 'bg-[#F8F5EC] text-[#183D2B] hover:bg-[#FFFFFF]'
              }`}
            >
              Book Your Stay
            </a>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open navigation menu"
              aria-expanded={mobileMenuOpen}
              className={`lg:hidden inline-flex items-center justify-center w-11 h-11 rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#607D50] ${
                isScrolled
                  ? 'text-[#183D2B] hover:bg-[#E8DDC8]/60'
                  : 'text-[#FFFFFF] hover:bg-white/15'
              }`}
            >
              <Menu className="w-6 h-6" strokeWidth={1.75} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Full-Height Drawer */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-50 lg:hidden bg-[#183D2B] text-[#F8F5EC] flex flex-col"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation"
        >
          <div className="px-6 h-20 flex items-center justify-between border-b border-white/15">
            <img
              src={RESORT_IMAGES.brandLogoDark}
              alt="Aarambh Farmhouse Staycation & Resort"
              className="h-14 w-auto object-contain"
            />
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              aria-label="Close navigation menu"
              className="inline-flex items-center justify-center w-11 h-11 rounded-full text-[#F8F5EC] hover:bg-white/10 transition-colors"
            >
              <X className="w-6 h-6" strokeWidth={1.75} />
            </button>
          </div>

          <nav className="flex-1 flex flex-col justify-center px-8 gap-2">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={handleLinkClick}
                className="font-serif text-3xl text-[#F8F5EC]/95 hover:text-[#E8DDC8] py-2.5 border-b border-white/10 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="p-8 border-t border-white/15">
            <a
              href="#booking"
              onClick={handleLinkClick}
              className="w-full inline-flex items-center justify-center px-6 py-3.5 rounded-full bg-[#F8F5EC] text-[#183D2B] font-semibold text-base hover:bg-[#FFFFFF] transition-colors"
            >
              Book Your Stay
            </a>
          </div>
        </div>
      )}
    </>
  );
};
