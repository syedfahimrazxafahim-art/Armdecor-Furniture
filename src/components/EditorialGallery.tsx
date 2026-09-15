import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ChevronLeft, ChevronRight, Maximize2, Sparkles, Send } from 'lucide-react';
import { FURNITURE_ITEMS } from '../data/furnitureData';
import { FurnitureItem } from '../types';

interface EditorialGalleryProps {
  onInquireItem: (item: FurnitureItem) => void;
  selectedLightboxItem: FurnitureItem | null;
  setSelectedLightboxItem: (item: FurnitureItem | null) => void;
}

export const EditorialGallery: React.FC<EditorialGalleryProps> = ({
  onInquireItem,
  selectedLightboxItem,
  setSelectedLightboxItem,
}) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  // When selectedLightboxItem changes, update currentIndex
  useEffect(() => {
    if (selectedLightboxItem) {
      const idx = FURNITURE_ITEMS.findIndex((i) => i.id === selectedLightboxItem.id);
      if (idx !== -1) setCurrentIndex(idx);
    }
  }, [selectedLightboxItem]);

  const openLightbox = (item: FurnitureItem, index: number) => {
    setCurrentIndex(index);
    setSelectedLightboxItem(item);
  };

  const closeLightbox = () => {
    setSelectedLightboxItem(null);
  };

  const showNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % FURNITURE_ITEMS.length);
  }, []);

  const showPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + FURNITURE_ITEMS.length) % FURNITURE_ITEMS.length);
  }, []);

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (!selectedLightboxItem) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeLightbox();
      } else if (e.key === 'ArrowRight') {
        showNext();
      } else if (e.key === 'ArrowLeft') {
        showPrev();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedLightboxItem, showNext, showPrev]);

  const activeItem = FURNITURE_ITEMS[currentIndex];

  return (
    <section
      id="gallery"
      aria-label="Editorial Furniture Gallery"
      className="py-20 sm:py-28 bg-[#F5F1E8] dark:bg-[#1A140E] transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Gallery Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 border-b border-[#E8DFCE] dark:border-[#382E25] pb-8">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="w-8 h-[2px] bg-[#C88916]" />
              <span className="text-xs uppercase tracking-[0.25em] text-[#C88916] font-semibold">
                Permanent Exhibition
              </span>
            </div>
            <h2
              id="gallery-heading"
              className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#2B2118] dark:text-[#F5F1E8] tracking-tight leading-[1.2]"
            >
              EDITORIAL GALLERY
            </h2>
          </div>

          <div className="mt-4 md:mt-0 flex items-center gap-3 text-xs tracking-wider text-[#6F685D] dark:text-[#A89F93]">
            <span className="px-3 py-1 bg-[#FFFFFF] dark:bg-[#241C15] border border-[#E8DFCE] dark:border-[#382E25] font-medium text-[#2B2118] dark:text-[#E8DFCE]">
              All 17 Curated Pieces
            </span>
            <span>Click any piece to inspect details</span>
          </div>
        </div>

        {/* Editorial Asymmetric Masonry / Grid (All 17 items rendered, preserving aspect ratio without cropping) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
          {FURNITURE_ITEMS.map((item, index) => {
            // Assign deliberate editorial spans based on visual composition
            let colSpan = 'lg:col-span-4';
            if (index === 0 || index === 6 || index === 15) {
              colSpan = 'lg:col-span-8'; // Featured prominent pieces
            } else if (index === 1 || index === 4 || index === 9) {
              colSpan = 'lg:col-span-4';
            } else if (index === 2 || index === 7 || index === 13) {
              colSpan = 'lg:col-span-6';
            } else if (index === 10 || index === 16) {
              colSpan = 'lg:col-span-6';
            }

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6, delay: (index % 4) * 0.1 }}
                className={`relative ${colSpan} flex flex-col`}
              >
                <div
                  onClick={() => openLightbox(item, index)}
                  className="group relative cursor-pointer bg-[#FFFFFF] dark:bg-[#221A14] border border-[#E8DFCE] dark:border-[#382E25] hover:border-[#C88916] transition-all duration-300 shadow-[0_4px_24px_rgba(43,33,24,0.05)] hover:shadow-[0_12px_36px_rgba(43,33,24,0.12)] p-3 sm:p-4"
                >
                  {/* Image container ensuring NO cropping */}
                  <div className="relative w-full bg-[#F5F1E8]/70 dark:bg-[#15100C] flex items-center justify-center p-3 overflow-hidden min-h-[240px] sm:min-h-[300px]">
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="w-full h-auto max-h-[460px] object-contain transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                      loading="lazy"
                    />

                    {/* Hover Overlay with View Details trigger */}
                    <div className="absolute inset-0 bg-[#2B2118]/25 dark:bg-[#000000]/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
                      <div className="p-3 bg-[#FFFFFF] dark:bg-[#2B2118] text-[#2B2118] dark:text-[#F5F1E8] shadow-lg rounded-full transform translate-y-2 group-hover:translate-y-0 transition-transform">
                        <Maximize2 className="w-5 h-5 text-[#C88916]" />
                      </div>
                    </div>

                    {/* Number stamp */}
                    <span className="absolute bottom-2 right-2 text-[10px] tracking-widest text-[#6F685D]/60 dark:text-[#A89F93]/60 font-mono">
                      #{String(index + 1).padStart(2, '0')}
                    </span>
                  </div>

                  {/* Caption & Category */}
                  <div className="mt-3.5 flex items-start justify-between gap-2">
                    <div>
                      <h3 className="font-serif text-base sm:text-lg text-[#2B2118] dark:text-[#F5F1E8] group-hover:text-[#C88916] transition-colors leading-snug">
                        {item.title}
                      </h3>
                      <p className="text-xs text-[#6F685D] dark:text-[#A89F93] mt-0.5">
                        {item.category}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onInquireItem(item);
                      }}
                      className="text-[11px] uppercase tracking-wider text-[#C88916] hover:text-[#2B2118] dark:hover:text-[#F5F1E8] font-medium py-1 px-2 hover:bg-[#C88916]/10 transition-colors shrink-0"
                    >
                      Inquire
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>

      {/* Accessible Fullscreen Lightbox Modal */}
      <AnimatePresence>
        {selectedLightboxItem && activeItem && (
          <motion.div
            id="gallery-lightbox-modal"
            role="dialog"
            aria-modal="true"
            aria-label="Image Lightbox Preview"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 bg-[#16120E]/95 backdrop-blur-md flex flex-col justify-between p-4 sm:p-6 text-[#F5F1E8]"
          >
            {/* Top Toolbar */}
            <div className="flex items-center justify-between w-full max-w-7xl mx-auto pb-3 border-b border-[#382E25]">
              <div className="flex items-center gap-3">
                <span className="text-xs tracking-widest uppercase text-[#C88916] font-medium">
                  Piece {currentIndex + 1} of {FURNITURE_ITEMS.length}
                </span>
                <span className="hidden sm:inline text-xs text-[#A89F93]">|</span>
                <span className="hidden sm:inline text-xs text-[#E8DFCE]">
                  {activeItem.title}
                </span>
              </div>

              <div className="flex items-center gap-4">
                <button
                  type="button"
                  onClick={() => {
                    closeLightbox();
                    onInquireItem(activeItem);
                  }}
                  className="hidden sm:flex items-center gap-1.5 px-4 py-1.5 bg-[#C88916] hover:bg-[#B37810] text-[#FFFFFF] text-xs tracking-wider uppercase font-medium transition-colors"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Inquire Now</span>
                </button>

                <button
                  id="lightbox-close-btn"
                  type="button"
                  onClick={closeLightbox}
                  aria-label="Close Lightbox"
                  className="p-2 text-[#E8DFCE] hover:text-[#C88916] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C88916]"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* Central Display Area with Prev/Next Controls */}
            <div className="relative flex-grow flex items-center justify-center my-4 overflow-hidden max-w-6xl mx-auto w-full">
              {/* Prev Button */}
              <button
                type="button"
                onClick={showPrev}
                aria-label="Previous image"
                className="absolute left-2 sm:left-4 z-10 p-3 bg-[#241C15]/80 hover:bg-[#C88916] text-[#FFFFFF] rounded-full backdrop-blur-sm transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C88916]"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              {/* Preserved Full Image (Object-Contain, No Cropping) */}
              <div className="w-full h-full flex flex-col items-center justify-center p-2">
                <motion.img
                  key={activeItem.id}
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  src={activeItem.imageUrl}
                  alt={activeItem.title}
                  className="max-h-[65vh] sm:max-h-[72vh] w-auto max-w-full object-contain drop-shadow-2xl"
                />
              </div>

              {/* Next Button */}
              <button
                type="button"
                onClick={showNext}
                aria-label="Next image"
                className="absolute right-2 sm:right-4 z-10 p-3 bg-[#241C15]/80 hover:bg-[#C88916] text-[#FFFFFF] rounded-full backdrop-blur-sm transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C88916]"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>

            {/* Bottom Details Footer */}
            <div className="w-full max-w-4xl mx-auto text-center pt-3 border-t border-[#382E25]">
              <h4 className="font-serif text-xl sm:text-2xl text-[#FFFFFF] mb-1">
                {activeItem.title}
              </h4>
              <p className="text-xs sm:text-sm text-[#A89F93] max-w-xl mx-auto leading-relaxed mb-3">
                {activeItem.description}
              </p>
              
              <div className="flex sm:hidden justify-center mt-2">
                <button
                  type="button"
                  onClick={() => {
                    closeLightbox();
                    onInquireItem(activeItem);
                  }}
                  className="px-6 py-2 bg-[#C88916] text-[#FFFFFF] text-xs uppercase tracking-wider font-medium"
                >
                  Inquire About This Piece
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
