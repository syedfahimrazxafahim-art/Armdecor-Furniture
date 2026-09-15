import React, { useState, useEffect, useRef } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { BUSINESS_INFO } from '../data/furnitureData';

interface HeaderProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
}

const NAV_ITEMS = [
  { id: 'hero', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'furniture', label: 'Furniture' },
  { id: 'gallery', label: 'Gallery' },
  { id: 'contact', label: 'Contact' },
];

export const Header: React.FC<HeaderProps> = ({ activeSection, onNavigate }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const menuCloseBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle escape key and scroll locking for mobile menu
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };

    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
      setTimeout(() => {
        menuCloseBtnRef.current?.focus();
      }, 100);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [mobileMenuOpen]);

  const handleNavClick = (id: string) => {
    onNavigate(id);
    if (mobileMenuOpen) {
      setMobileMenuOpen(false);
    }
  };

  return (
    <>
      <header
        id="main-header"
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          isScrolled
            ? 'bg-[#F5F1E8]/95 dark:bg-[#1C1611]/95 backdrop-blur-md shadow-[0_4px_20px_rgba(43,33,24,0.06)] border-b border-[#E8DFCE] dark:border-[#382E25]'
            : 'bg-[#F5F1E8] dark:bg-[#1C1611] border-b border-[#E8DFCE]/60 dark:border-[#382E25]/60'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="flex items-center justify-between h-20 sm:h-24">
            
            {/* LEFT: Armdecor Furniture Logo (Natural, moderate size, uncropped, original colors) */}
            <div className="flex items-center">
              <a
                id="brand-logo-link"
                href="#hero"
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick('hero');
                }}
                className="inline-flex items-center transition-opacity duration-200 hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C88916]"
                aria-label="Armdecor Furniture Home"
              >
                <img
                  src={BUSINESS_INFO.logoUrl}
                  alt="Armdecor Furniture Logo"
                  className="h-10 sm:h-12 md:h-14 w-auto object-contain"
                  loading="eager"
                />
              </a>
            </div>

            {/* EXACT CENTER: Main Navigation (Desktop, Laptop, Tablet) */}
            <nav
              id="desktop-navigation"
              aria-label="Main Navigation"
              className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center gap-8 lg:gap-10 pointer-events-auto"
            >
              {NAV_ITEMS.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    id={`nav-link-${item.id}`}
                    type="button"
                    onClick={() => handleNavClick(item.id)}
                    className={`relative text-sm tracking-[0.15em] uppercase font-medium transition-colors duration-250 cursor-pointer py-1 ${
                      isActive
                        ? 'text-[#C88916]'
                        : 'text-[#2B2118] dark:text-[#E8DFCE] hover:text-[#C88916]'
                    } focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C88916]`}
                  >
                    <span>{item.label}</span>
                    {isActive && (
                      <motion.div
                        layoutId="activeNavUnderline"
                        className="absolute -bottom-1 left-0 right-0 h-[2px] bg-[#C88916]"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                  </button>
                );
              })}
            </nav>

            {/* Mobile / Tablet Menu Button (Clean hamburger on the right) */}
            <div className="flex md:hidden items-center">
              <button
                id="mobile-menu-toggle-btn"
                type="button"
                onClick={() => setMobileMenuOpen(true)}
                aria-label="Open navigation menu"
                aria-expanded={mobileMenuOpen}
                className="p-2 text-[#2B2118] dark:text-[#F5F1E8] hover:text-[#C88916] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C88916] cursor-pointer"
              >
                <Menu className="w-7 h-7" />
              </button>
            </div>

          </div>
        </div>
      </header>

      {/* Clean Full-Screen Mobile Navigation Overlay (100dvh) */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            id="mobile-navigation-overlay"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile Navigation"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 bg-[#F5F1E8] dark:bg-[#19130E] text-[#2B2118] dark:text-[#F5F1E8] flex flex-col justify-between p-6 sm:p-8"
            style={{ minHeight: '100dvh' }}
          >
            {/* Top Bar: Logo on the left, Close button on the right */}
            <div className="flex items-center justify-between w-full pb-4 border-b border-[#E8DFCE] dark:border-[#382E25]">
              <div className="flex items-center">
                <img
                  src={BUSINESS_INFO.logoUrl}
                  alt="Armdecor Furniture Logo"
                  className="h-10 w-auto object-contain"
                />
              </div>
              <button
                ref={menuCloseBtnRef}
                id="mobile-menu-close-btn"
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Close navigation menu"
                className="p-2 text-[#2B2118] dark:text-[#F5F1E8] hover:text-[#C88916] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C88916] cursor-pointer"
              >
                <X className="w-7 h-7" />
              </button>
            </div>

            {/* Navigation Links */}
            <nav className="flex flex-col items-center justify-center gap-6 my-auto py-8">
              {NAV_ITEMS.map((item, index) => {
                const isActive = activeSection === item.id;
                return (
                  <motion.button
                    key={item.id}
                    id={`mobile-nav-link-${item.id}`}
                    type="button"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 * index + 0.1, duration: 0.3 }}
                    onClick={() => handleNavClick(item.id)}
                    className={`text-2xl font-serif tracking-widest uppercase transition-colors py-2 px-4 cursor-pointer ${
                      isActive
                        ? 'text-[#C88916] font-medium'
                        : 'text-[#2B2118] dark:text-[#E8DFCE] hover:text-[#C88916]'
                    } focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C88916]`}
                  >
                    {item.label}
                  </motion.button>
                );
              })}
            </nav>

            {/* Bottom info inside overlay */}
            <div className="pt-4 border-t border-[#E8DFCE] dark:border-[#382E25] text-center text-xs tracking-wider text-[#6F685D] dark:text-[#A89F93]">
              <p className="font-serif italic mb-1">{BUSINESS_INFO.tagline}</p>
              <p>{BUSINESS_INFO.locationString}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
