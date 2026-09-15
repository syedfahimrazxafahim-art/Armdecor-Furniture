import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'motion/react';
import { ChevronLeft, ChevronRight, Play, Pause, Star, Quote } from 'lucide-react';
import { SAMPLE_REVIEWS } from '../data/furnitureData';

export const ReviewsSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const touchStartX = useRef<number | null>(null);

  // Determine items per page based on window size
  const [itemsPerPage, setItemsPerPage] = useState(3);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setItemsPerPage(1);
      } else if (window.innerWidth < 1024) {
        setItemsPerPage(2);
      } else {
        setItemsPerPage(3);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const totalSlides = Math.max(1, SAMPLE_REVIEWS.length - itemsPerPage + 1);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1 >= totalSlides ? 0 : prev + 1));
  }, [totalSlides]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 < 0 ? totalSlides - 1 : prev - 1));
  }, [totalSlides]);

  // Autoplay with tab visibility, hover, focus and reduced-motion checks
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || !isPlaying || isHovered || isFocused) {
      return;
    }

    const interval = setInterval(() => {
      if (!document.hidden) {
        nextSlide();
      }
    }, 6000);

    return () => clearInterval(interval);
  }, [isPlaying, isHovered, isFocused, nextSlide]);

  // Touch Swipe Handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;

    if (diff > 50) {
      nextSlide();
    } else if (diff < -50) {
      prevSlide();
    }
    touchStartX.current = null;
  };

  return (
    <section
      id="reviews"
      aria-label="Customer Reviews and Feedback"
      className="py-20 sm:py-28 bg-[#F5F1E8] dark:bg-[#1C1611] transition-colors duration-300 overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <div className="flex items-center justify-center gap-3 mb-2">
            <span className="w-8 h-[2px] bg-[#C88916]" />
            <span className="text-xs uppercase tracking-[0.25em] text-[#C88916] font-semibold">
              Showroom Experiences
            </span>
            <span className="w-8 h-[2px] bg-[#C88916]" />
          </div>

          <h2
            id="reviews-heading"
            className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#2B2118] dark:text-[#F5F1E8] tracking-tight leading-[1.2] mb-3"
          >
            WHAT OUR CUSTOMERS SAY
          </h2>

          {/* Honest Transparent Development Notice as per Prompt Instructions */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#E8DFCE]/60 dark:bg-[#2B2118]/60 text-[11px] uppercase tracking-wider text-[#6F685D] dark:text-[#A89F93] border border-[#E8DFCE] dark:border-[#382E25]">
            <span>Sample Reviews — Illustrative showroom preview</span>
          </div>
        </div>

        {/* Carousel Container */}
        <div
          className="relative px-2 sm:px-6"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <div className="overflow-hidden">
            <motion.div
              className="flex transition-transform duration-500 ease-out gap-6"
              style={{
                transform: `translateX(-${currentIndex * (100 / itemsPerPage)}%)`,
              }}
            >
              {SAMPLE_REVIEWS.map((review) => (
                <div
                  key={review.id}
                  className="w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] shrink-0 flex flex-col"
                >
                  <div className="h-full flex flex-col justify-between p-6 sm:p-8 bg-[#FFFFFF] dark:bg-[#231A13] border border-[#E8DFCE] dark:border-[#382E25] shadow-[0_4px_24px_rgba(43,33,24,0.04)] dark:shadow-[0_4px_24px_rgba(0,0,0,0.3)]">
                    <div>
                      {/* Quotation mark & Gold Stars */}
                      <div className="flex items-center justify-between mb-4">
                        <Quote className="w-7 h-7 text-[#C88916]/40 rotate-180" />
                        <div className="flex items-center gap-1 text-[#C88916]" aria-label="5 out of 5 stars">
                          {[...Array(review.rating)].map((_, i) => (
                            <Star key={i} className="w-3.5 h-3.5 fill-[#C88916]" />
                          ))}
                        </div>
                      </div>

                      {/* Quote Text */}
                      <p className="text-sm sm:text-base text-[#2B2118] dark:text-[#E8DFCE] leading-relaxed font-light italic mb-6">
                        "{review.quote}"
                      </p>
                    </div>

                    {/* Author & Service Info */}
                    <div className="pt-4 border-t border-[#E8DFCE]/60 dark:border-[#382E25]/60 flex items-center justify-between text-xs">
                      <div>
                        <p className="font-semibold text-[#2B2118] dark:text-[#F5F1E8]">
                          {review.author}
                        </p>
                        <p className="text-[#6F685D] dark:text-[#8E8478]">
                          {review.location}
                        </p>
                      </div>
                      <span className="text-[11px] text-[#C88916] font-medium tracking-wide">
                        {review.serviceType}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Controls Bar: Prev, Pagination Dots, Next, and Autoplay Toggle */}
          <div className="flex items-center justify-between max-w-md mx-auto mt-10">
            {/* Previous Button */}
            <button
              id="reviews-prev-btn"
              type="button"
              onClick={prevSlide}
              aria-label="Previous testimonial"
              className="p-2.5 rounded-full border border-[#E8DFCE] dark:border-[#382E25] bg-[#FFFFFF] dark:bg-[#231A13] text-[#2B2118] dark:text-[#F5F1E8] hover:text-[#C88916] hover:border-[#C88916] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C88916]"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Pagination Dots */}
            <div className="flex items-center gap-2" role="tablist" aria-label="Review Carousel Pagination">
              {Array.from({ length: totalSlides }).map((_, idx) => (
                <button
                  key={idx}
                  role="tab"
                  aria-selected={currentIndex === idx}
                  aria-label={`Slide ${idx + 1}`}
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-2 transition-all rounded-full ${
                    currentIndex === idx
                      ? 'w-6 bg-[#C88916]'
                      : 'w-2 bg-[#E8DFCE] dark:bg-[#382E25] hover:bg-[#C88916]/50'
                  }`}
                />
              ))}
            </div>

            {/* Next Button */}
            <button
              id="reviews-next-btn"
              type="button"
              onClick={nextSlide}
              aria-label="Next testimonial"
              className="p-2.5 rounded-full border border-[#E8DFCE] dark:border-[#382E25] bg-[#FFFFFF] dark:bg-[#231A13] text-[#2B2118] dark:text-[#F5F1E8] hover:text-[#C88916] hover:border-[#C88916] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C88916]"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            {/* Visible Play/Pause Toggle */}
            <button
              id="reviews-autoplay-toggle-btn"
              type="button"
              onClick={() => setIsPlaying(!isPlaying)}
              aria-label={isPlaying ? 'Pause slideshow' : 'Play slideshow'}
              className="p-2 text-xs text-[#6F685D] dark:text-[#A89F93] hover:text-[#C88916] transition-colors flex items-center gap-1 ml-2 focus:outline-none focus-visible:ring-1 focus-visible:ring-[#C88916]"
            >
              {isPlaying ? (
                <>
                  <Pause className="w-3.5 h-3.5 text-[#C88916]" />
                  <span className="text-[10px] uppercase tracking-wider">Pause</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 text-[#C88916]" />
                  <span className="text-[10px] uppercase tracking-wider">Play</span>
                </>
              )}
            </button>
          </div>

        </div>
      </div>
    </section>
  );
};
