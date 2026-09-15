import React from 'react';
import { motion } from 'motion/react';
import { Sofa, Award, Clock, HeartHandshake } from 'lucide-react';
import { BRAND_VALUES } from '../data/furnitureData';

const ICONS = [Sofa, Award, Clock, HeartHandshake];

export const WhyChooseUs: React.FC = () => {
  return (
    <section
      id="why-armdecor"
      aria-label="Why Choose Armdecor Furniture"
      className="py-20 sm:py-26 bg-[#E8DFCE]/30 dark:bg-[#15100C] transition-colors duration-300 border-y border-[#E8DFCE] dark:border-[#382E25]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 sm:mb-18">
          <div className="flex items-center justify-center gap-3 mb-2">
            <span className="w-8 h-[2px] bg-[#C88916]" />
            <span className="text-xs uppercase tracking-[0.25em] text-[#C88916] font-semibold">
              Our Principles
            </span>
            <span className="w-8 h-[2px] bg-[#C88916]" />
          </div>

          <h2
            id="why-choose-heading"
            className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#2B2118] dark:text-[#F5F1E8] tracking-tight leading-[1.2]"
          >
            WHY ARMDECOR
          </h2>
        </div>

        {/* 4 Feature Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
          {BRAND_VALUES.map((item, index) => {
            const IconComponent = ICONS[index % ICONS.length];
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex flex-col items-center text-center p-6 bg-[#FFFFFF]/80 dark:bg-[#201812]/80 border border-[#E8DFCE] dark:border-[#382E25] hover:border-[#C88916]/50 transition-all duration-300 group"
              >
                {/* Icon with subtle Antique Gold Accent */}
                <div className="w-14 h-14 rounded-full bg-[#F5F1E8] dark:bg-[#291F18] border border-[#E8DFCE] dark:border-[#382E25] flex items-center justify-center mb-5 group-hover:border-[#C88916] transition-colors">
                  <IconComponent className="w-6 h-6 text-[#2B2118] dark:text-[#E8DFCE] group-hover:text-[#C88916] transition-colors stroke-[1.5]" />
                </div>

                <h3 className="font-serif text-base sm:text-lg text-[#2B2118] dark:text-[#F5F1E8] tracking-wide mb-3 uppercase">
                  {item.title}
                </h3>

                <p className="text-xs sm:text-sm text-[#6F685D] dark:text-[#A89F93] leading-relaxed font-light">
                  {item.description}
                </p>

                {/* Subtle gold line accent on hover */}
                <div className="w-8 h-[2px] bg-transparent group-hover:bg-[#C88916] transition-colors duration-300 mt-5" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
