import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, MessageSquare } from 'lucide-react';
import { BUSINESS_INFO } from '../data/furnitureData';

interface HeroProps {
  onExplore: () => void;
  onContact: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExplore, onContact }) => {
  return (
    <section
      id="hero"
      aria-label="Welcome to Armdecor Furniture"
      className="relative min-h-[85vh] sm:min-h-[88vh] lg:min-h-[92vh] flex items-center justify-center overflow-hidden bg-[#F5F1E8] dark:bg-[#16120E]"
    >
      {/* Background Hero Image with Subtle Warm Legibility Overlay */}
      <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
        <img
          src={BUSINESS_INFO.heroBackgroundUrl}
          alt="Armdecor Furniture Luxury Showroom Interior"
          className="w-full h-full object-cover object-center transition-transform duration-1000 ease-out scale-100"
          loading="eager"
        />
        {/* Very subtle warm transparent overlay to guarantee WCAG text contrast without darkening the interior photography */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#2B2118]/80 via-[#2B2118]/45 to-[#2B2118]/30 dark:from-[#140E0A]/90 dark:via-[#140E0A]/60 dark:to-[#140E0A]/40" />
      </div>

      {/* Hero Content Container */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 text-center flex flex-col items-center">
        {/* Subtle Decorative Antique Gold Accent Line */}
        <motion.div
          initial={{ opacity: 0, width: 0 }}
          animate={{ opacity: 1, width: '4rem' }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="h-[2px] bg-[#C88916] mb-6"
        />

        {/* Location Subtitle */}
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-xs sm:text-sm uppercase tracking-[0.25em] text-[#E8DFCE] font-medium mb-4"
        >
          {BUSINESS_INFO.locationString}
        </motion.span>

        {/* Main Hero Heading */}
        <motion.h1
          id="hero-heading"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-serif text-[#FFFFFF] tracking-tight leading-[1.15] max-w-4xl drop-shadow-sm mb-6"
        >
          TIMELESS FURNITURE FOR BEAUTIFUL SPACES
        </motion.h1>

        {/* Supporting Text */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45 }}
          className="text-base sm:text-lg md:text-xl text-[#F5F1E8]/90 font-light max-w-2xl leading-relaxed mb-10"
        >
          Discover elegant, comfortable, and beautifully crafted furniture designed to transform your space.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-5 w-full max-w-md sm:max-w-none"
        >
          <button
            id="hero-explore-btn"
            type="button"
            onClick={onExplore}
            className="w-full sm:w-auto px-8 py-3.5 bg-[#C88916] hover:bg-[#B37810] active:scale-[0.98] text-[#FFFFFF] text-xs sm:text-sm uppercase tracking-[0.16em] font-medium transition-all duration-200 shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#C88916]"
          >
            <span>EXPLORE COLLECTION</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>

          <button
            id="hero-contact-btn"
            type="button"
            onClick={onContact}
            className="w-full sm:w-auto px-8 py-3.5 bg-[#2B2118]/80 hover:bg-[#2B2118] active:scale-[0.98] text-[#F5F1E8] border border-[#E8DFCE]/30 hover:border-[#C88916] text-xs sm:text-sm uppercase tracking-[0.16em] font-medium transition-all duration-200 backdrop-blur-sm flex items-center justify-center gap-2 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#C88916]"
          >
            <MessageSquare className="w-4 h-4 text-[#C88916]" />
            <span>CONTACT US</span>
          </button>
        </motion.div>
      </div>

      {/* Subtle Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.7 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 pointer-events-none"
      >
        <span className="text-[10px] tracking-[0.2em] uppercase text-[#F5F1E8]/70 font-light">Scroll</span>
        <div className="w-[1px] h-6 bg-gradient-to-b from-[#C88916] to-transparent animate-pulse" />
      </motion.div>
    </section>
  );
};
