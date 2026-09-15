import React from 'react';
import { Phone, Mail, Instagram, Facebook } from 'lucide-react';
import { BUSINESS_INFO } from '../data/furnitureData';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      id="main-footer"
      className="bg-[#231A13] dark:bg-[#120E0A] text-[#EDE6D8] border-t border-[#382E25] py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
        
        {/* Armdecor Furniture Logo (Uncropped, preserved proportions) */}
        <div className="mb-6">
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('hero');
            }}
            className="inline-block transition-opacity hover:opacity-90"
            aria-label="Armdecor Furniture Home"
          >
            <img
              src={BUSINESS_INFO.logoUrl}
              alt="Armdecor Furniture Logo"
              className="h-12 sm:h-14 w-auto object-contain brightness-105"
              loading="lazy"
            />
          </a>
        </div>

        {/* Minimal Navigation */}
        <nav
          aria-label="Footer Navigation"
          className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 mb-8 text-xs uppercase tracking-[0.15em] font-medium"
        >
          <button
            type="button"
            onClick={() => onNavigate('hero')}
            className="text-[#DDD4C7] hover:text-[#C88916] transition-colors"
          >
            Home
          </button>
          <button
            type="button"
            onClick={() => onNavigate('about')}
            className="text-[#DDD4C7] hover:text-[#C88916] transition-colors"
          >
            About
          </button>
          <button
            type="button"
            onClick={() => onNavigate('furniture')}
            className="text-[#DDD4C7] hover:text-[#C88916] transition-colors"
          >
            Furniture
          </button>
          <button
            type="button"
            onClick={() => onNavigate('gallery')}
            className="text-[#DDD4C7] hover:text-[#C88916] transition-colors"
          >
            Gallery
          </button>
          <button
            type="button"
            onClick={() => onNavigate('contact')}
            className="text-[#DDD4C7] hover:text-[#C88916] transition-colors"
          >
            Contact
          </button>
        </nav>

        {/* Contact Links: Phone & Email */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-[#DDD4C7] mb-6 font-light">
          <a
            href={`tel:${BUSINESS_INFO.primaryPhone}`}
            className="flex items-center gap-1.5 hover:text-[#C88916] transition-colors"
          >
            <Phone className="w-3.5 h-3.5 text-[#C88916]" />
            <span>{BUSINESS_INFO.primaryPhoneFormatted}</span>
          </a>
          <span className="text-[#6F685D]">•</span>
          <a
            href={`tel:${BUSINESS_INFO.secondaryPhone}`}
            className="flex items-center gap-1.5 hover:text-[#C88916] transition-colors"
          >
            <Phone className="w-3.5 h-3.5 text-[#C88916]" />
            <span>{BUSINESS_INFO.secondaryPhoneFormatted}</span>
          </a>
          <span className="text-[#6F685D]">•</span>
          <a
            href={`mailto:${BUSINESS_INFO.email}`}
            className="flex items-center gap-1.5 hover:text-[#C88916] transition-colors"
          >
            <Mail className="w-3.5 h-3.5 text-[#C88916]" />
            <span>{BUSINESS_INFO.email}</span>
          </a>
        </div>

        {/* Social Icons */}
        <div className="flex items-center justify-center gap-4 mb-8">
          <a
            id="footer-instagram-link"
            href={BUSINESS_INFO.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Armdecor Furniture Instagram"
            className="p-2 rounded-full border border-[#382E25] hover:border-[#C88916] text-[#DDD4C7] hover:text-[#C88916] transition-colors"
          >
            <Instagram className="w-4 h-4" />
          </a>
          <a
            id="footer-facebook-link"
            href={BUSINESS_INFO.facebookUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Armdecor Furniture Facebook"
            className="p-2 rounded-full border border-[#382E25] hover:border-[#C88916] text-[#DDD4C7] hover:text-[#C88916] transition-colors"
          >
            <Facebook className="w-4 h-4" />
          </a>
        </div>

        {/* Location & Copyright */}
        <div className="pt-6 border-t border-[#382E25]/60 w-full max-w-2xl text-center text-[11px] text-[#A89F93] tracking-wide">
          <p className="mb-1">{BUSINESS_INFO.locationString}</p>
          <p>© {currentYear} {BUSINESS_INFO.name}. All rights reserved.</p>
        </div>

      </div>
    </footer>
  );
};
