import React from 'react';
import { motion } from 'motion/react';
import { Check } from 'lucide-react';
import { BUSINESS_INFO, FURNITURE_ITEMS } from '../data/furnitureData';

interface AboutSectionProps {
  onExploreFurniture: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onExploreFurniture }) => {
  // Use supplied furniture image for the split layout
  const aboutImageItem = FURNITURE_ITEMS[1]; // Sculptural Tailored Lounge Suite

  const pillars = [
    { title: 'Craftsmanship', desc: 'Precise joinery, hand-finished detailing, and thoughtful proportions.' },
    { title: 'Quality', desc: 'Selected textiles and durable framework engineered for longevity.' },
    { title: 'Comfort', desc: 'Deep ergonomics and cushioning tailored for everyday living.' },
    { title: 'Timeless Design', desc: 'Modern classic aesthetics that transcend passing trends.' },
  ];

  return (
    <section
      id="about"
      aria-label="About Armdecor Furniture"
      className="py-20 sm:py-28 bg-[#F5F1E8] dark:bg-[#1A140E] transition-colors duration-300 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Visual Showcase (One supplied furniture image, strictly preserved without cropping) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-6 relative"
          >
            <div className="relative p-3 sm:p-4 bg-[#FFFFFF] dark:bg-[#241C15] shadow-[0_12px_40px_rgba(43,33,24,0.08)] dark:shadow-[0_12px_40px_rgba(0,0,0,0.4)] border border-[#E8DFCE] dark:border-[#382E25]">
              {/* Antique gold accent border frame */}
              <div className="relative overflow-hidden bg-[#E8DFCE]/30 dark:bg-[#16120E] flex items-center justify-center min-h-[320px] sm:min-h-[420px]">
                <img
                  src={aboutImageItem.imageUrl}
                  alt="Armdecor Furniture Showroom Presentation"
                  className="w-full h-auto max-h-[520px] object-contain transition-transform duration-700 hover:scale-[1.02]"
                  loading="lazy"
                />
              </div>

              {/* Caption pill */}
              <div className="mt-3.5 flex items-center justify-between text-xs tracking-wider text-[#6F685D] dark:text-[#A89F93]">
                <span className="font-serif italic">Los Angeles Showroom Collection</span>
                <span className="text-[#C88916] font-medium">Bespoke Living</span>
              </div>
            </div>

            {/* Subtle decorative gold line behind the card */}
            <div className="hidden sm:block absolute -bottom-4 -left-4 w-28 h-28 border-b-2 border-l-2 border-[#C88916]/40 pointer-events-none -z-10" />
          </motion.div>

          {/* Split Content Side */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="lg:col-span-6 flex flex-col justify-center"
          >
            {/* Subtle Antique Gold Header Rule */}
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-[2px] bg-[#C88916]" />
              <span className="text-xs uppercase tracking-[0.25em] text-[#C88916] font-semibold">
                {BUSINESS_INFO.name}
              </span>
            </div>

            {/* Heading */}
            <h2
              id="about-heading"
              className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#2B2118] dark:text-[#F5F1E8] tracking-tight leading-[1.2] mb-6"
            >
              CRAFTED FOR BEAUTIFUL SPACES
            </h2>

            {/* Brand-focused, verified copy */}
            <p className="text-base sm:text-lg text-[#6F685D] dark:text-[#DDD4C7] leading-relaxed mb-8">
              Based in Los Angeles, California, Armdecor Furniture presents a refined balance of timeless elegance and modern comfort. We curate and craft furniture pieces designed to bring warmth, balance, and quiet luxury to residential and bespoke interior settings.
            </p>

            {/* The 4 Core Focus Areas */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-10">
              {pillars.map((pillar) => (
                <div
                  key={pillar.title}
                  className="p-4 bg-[#FFFFFF]/70 dark:bg-[#241C15]/70 border border-[#E8DFCE] dark:border-[#382E25] transition-all hover:border-[#C88916]/50"
                >
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="w-5 h-5 rounded-full bg-[#C88916]/15 flex items-center justify-center text-[#C88916]">
                      <Check className="w-3 h-3 stroke-[3]" />
                    </span>
                    <h3 className="text-sm font-semibold tracking-wide text-[#2B2118] dark:text-[#F5F1E8] uppercase">
                      {pillar.title}
                    </h3>
                  </div>
                  <p className="text-xs text-[#6F685D] dark:text-[#B3A99D] leading-normal pl-7">
                    {pillar.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* Action CTA */}
            <div>
              <button
                id="about-explore-collection-btn"
                type="button"
                onClick={onExploreFurniture}
                className="inline-flex items-center justify-center px-7 py-3 bg-[#2B2118] dark:bg-[#C88916] text-[#F5F1E8] dark:text-[#1F1F1F] text-xs sm:text-sm uppercase tracking-[0.16em] font-medium hover:bg-[#C88916] dark:hover:bg-[#D99A29] transition-all duration-200 cursor-pointer shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C88916]"
              >
                Browse Our Furniture
              </button>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
