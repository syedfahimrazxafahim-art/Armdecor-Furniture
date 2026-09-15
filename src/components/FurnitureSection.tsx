import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Eye, ArrowUpRight } from 'lucide-react';
import { FURNITURE_ITEMS } from '../data/furnitureData';
import { FurnitureItem } from '../types';

interface FurnitureSectionProps {
  onSelectProductForInquiry: (item: FurnitureItem) => void;
  onOpenQuickView: (item: FurnitureItem) => void;
}

export const FurnitureSection: React.FC<FurnitureSectionProps> = ({
  onSelectProductForInquiry,
  onOpenQuickView,
}) => {
  return (
    <section
      id="furniture"
      aria-label="Explore Our Furniture Collection"
      className="py-20 sm:py-28 bg-[#E8DFCE]/40 dark:bg-[#16120E] transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-18">
          <div className="flex items-center justify-center gap-3 mb-3">
            <span className="h-[1px] w-8 bg-[#C88916]" />
            <span className="text-xs uppercase tracking-[0.25em] text-[#C88916] font-semibold">
              Curated Showroom
            </span>
            <span className="h-[1px] w-8 bg-[#C88916]" />
          </div>

          <h2
            id="furniture-heading"
            className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#2B2118] dark:text-[#F5F1E8] tracking-tight leading-[1.2] mb-4"
          >
            EXPLORE OUR FURNITURE
          </h2>

          <p className="text-sm sm:text-base text-[#6F685D] dark:text-[#DDD4C7] font-light max-w-xl mx-auto">
            From tailored seating to sculptural dining and bedroom suites, browse our signature pieces crafted for enduring luxury and everyday ease.
          </p>
        </div>

        {/* Featured Editorial Grid (Showing all pieces without category buttons) */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
        >
          {FURNITURE_ITEMS.map((item, index) => (
            <motion.article
              key={item.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.04 }}
              className="group flex flex-col bg-[#FFFFFF] dark:bg-[#201812] border border-[#E8DFCE] dark:border-[#382E25] hover:border-[#C88916]/50 dark:hover:border-[#C88916]/50 transition-all duration-300 shadow-[0_4px_20px_rgba(43,33,24,0.04)] hover:shadow-[0_10px_30px_rgba(43,33,24,0.08)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.3)]"
            >
              {/* Image Stage (Preserving aspect ratio completely without cropping) */}
              <div className="relative bg-[#F5F1E8]/50 dark:bg-[#18120D] p-4 flex items-center justify-center min-h-[260px] sm:min-h-[290px] overflow-hidden">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-auto max-h-[260px] object-contain transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                  loading="lazy"
                />

                {/* Category Badge */}
                <span className="absolute top-3 left-3 px-2.5 py-1 bg-[#FFFFFF]/90 dark:bg-[#2B2118]/90 backdrop-blur-sm text-[11px] uppercase tracking-wider text-[#C88916] font-medium border border-[#E8DFCE] dark:border-[#382E25]">
                  {item.category}
                </span>

                {/* Quick View Button overlay */}
                <button
                  type="button"
                  onClick={() => onOpenQuickView(item)}
                  aria-label={`Quick view ${item.title}`}
                  className="absolute top-3 right-3 p-2 bg-[#FFFFFF]/90 dark:bg-[#2B2118]/90 text-[#2B2118] dark:text-[#F5F1E8] hover:text-[#C88916] border border-[#E8DFCE] dark:border-[#382E25] transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100 cursor-pointer"
                  title="Quick view image"
                >
                  <Eye className="w-4 h-4" />
                </button>
              </div>

              {/* Card Content */}
              <div className="p-5 sm:p-6 flex flex-col flex-grow justify-between border-t border-[#E8DFCE]/60 dark:border-[#382E25]/60">
                <div>
                  <h3 className="font-serif text-lg sm:text-xl text-[#2B2118] dark:text-[#F5F1E8] mb-2 leading-snug group-hover:text-[#C88916] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#6F685D] dark:text-[#A89F93] leading-relaxed mb-4 line-clamp-3">
                    {item.description}
                  </p>
                </div>

                {/* Specifications & Inquiry */}
                <div className="pt-4 border-t border-[#E8DFCE]/40 dark:border-[#382E25]/40 mt-auto">
                  <div className="flex items-center justify-between text-xs mb-3.5 text-[#6F685D] dark:text-[#8E8478]">
                    <span className="flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5 text-[#C88916]" />
                      <span>Bespoke / Showroom Inquiry</span>
                    </span>
                    <span className="italic font-serif">Los Angeles</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => onSelectProductForInquiry(item)}
                      className="w-full py-2.5 px-4 bg-[#2B2118] dark:bg-[#C88916] text-[#FFFFFF] dark:text-[#1F1F1F] hover:bg-[#C88916] dark:hover:bg-[#D99A29] text-xs uppercase tracking-wider font-medium transition-all flex items-center justify-center gap-1.5 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C88916]"
                    >
                      <span>Inquire About This Piece</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>

      </div>
    </section>
  );
};
