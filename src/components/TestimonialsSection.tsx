import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, Quote, Star } from 'lucide-react';
import { GUEST_TESTIMONIALS, GuestTestimonial } from '../data/resortData';

export const TestimonialsSection: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [isPaused, setIsPaused] = useState(false);
  const [visibleCount, setVisibleCount] = useState(3);
  const touchStartX = useRef<number | null>(null);

  const total = GUEST_TESTIMONIALS.length;

  useEffect(() => {
    const updateVisibleCount = () => {
      if (window.innerWidth >= 1024) {
        setVisibleCount(3);
      } else if (window.innerWidth >= 768) {
        setVisibleCount(2);
      } else {
        setVisibleCount(1);
      }
    };

    updateVisibleCount();
    window.addEventListener('resize', updateVisibleCount, { passive: true });
    return () => window.removeEventListener('resize', updateVisibleCount);
  }, []);

  const handleNext = useCallback(() => {
    setDirection(1);
    setActiveIndex((prev) => (prev + 1) % total);
  }, [total]);

  const handlePrev = useCallback(() => {
    setDirection(-1);
    setActiveIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  const handleSelectSlide = (index: number) => {
    if (index === activeIndex) return;
    setDirection(index > activeIndex ? 1 : -1);
    setActiveIndex(index);
  };

  useEffect(() => {
    if (isPaused) return;
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const timer = window.setInterval(() => {
      handleNext();
    }, 6500);

    return () => window.clearInterval(timer);
  }, [isPaused, handleNext]);

  const visibleTestimonials: GuestTestimonial[] = Array.from(
    { length: Math.min(visibleCount, total) },
    (_, offset) => GUEST_TESTIMONIALS[(activeIndex + offset) % total]
  );

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    setIsPaused(true);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const deltaX = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(deltaX) > 48) {
      if (deltaX < 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }
    touchStartX.current = null;
    setIsPaused(false);
  };

  return (
    <section
      id="testimonials"
      aria-label="Guest Testimonials"
      className="bg-[#183D2B] text-[#F8F5EC] py-24 lg:py-32 border-t border-white/10"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        {/* Header Row + Carousel Controls */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-14">
          <div className="max-w-2xl">
            <p className="text-[#E8DDC8] text-xs font-semibold tracking-[0.18em] uppercase mb-3">
              Guest Testimonials
            </p>
            <h2 className="font-serif text-[#FFFFFF] text-4xl sm:text-5xl leading-[1.1] font-medium">
              Stories from Stays at Aarambh
            </h2>
            <p className="text-[#E8DDC8]/85 text-sm sm:text-base mt-3.5 leading-relaxed max-w-xl tracking-[0.01em]">
              Hear from families, celebration hosts, friends, and teams who chose Aarambh Farmhouse
              for their getaway in Morbe, Panvel.
            </p>
          </div>

          {/* Slide Readout & Prev/Next Controls */}
          <div className="flex items-center gap-4 self-start lg:self-auto">
            <span className="text-xs sm:text-sm text-[#E8DDC8]/85 tabular-nums tracking-wider">
              {String(activeIndex + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
            </span>

            <div className="flex items-center gap-2.5">
              <button
                type="button"
                onClick={handlePrev}
                aria-label="Previous guest testimonial"
                className="inline-flex items-center justify-center w-11 h-11 rounded-full border border-white/20 text-[#F8F5EC] hover:bg-[#F8F5EC] hover:text-[#183D2B] transition-colors duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E8DDC8]"
              >
                <ChevronLeft className="w-5 h-5" strokeWidth={1.75} />
              </button>
              <button
                type="button"
                onClick={handleNext}
                aria-label="Next guest testimonial"
                className="inline-flex items-center justify-center w-11 h-11 rounded-full border border-white/20 text-[#F8F5EC] hover:bg-[#F8F5EC] hover:text-[#183D2B] transition-colors duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E8DDC8]"
              >
                <ChevronRight className="w-5 h-5" strokeWidth={1.75} />
              </button>
            </div>
          </div>
        </div>

        {/* Sliding Cards Stage */}
        <div
          className="overflow-hidden"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={`${activeIndex}-${visibleCount}`}
              initial={{ opacity: 0, x: direction * 28 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction * -28 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch"
            >
              {visibleTestimonials.map((item) => (
                <article
                  key={item.id}
                  className="rounded-2xl bg-[#F8F5EC] text-[#242824] border border-[#E8DDC8] p-7 sm:p-8 flex flex-col justify-between"
                >
                  <div>
                    {/* Rating & Quote Emblem */}
                    <div className="flex items-center justify-between gap-4 mb-6">
                      <div
                        className="flex items-center gap-1"
                        aria-label={`Rated ${item.rating} out of 5 stars`}
                      >
                        {Array.from({ length: item.rating }).map((_, idx) => (
                          <Star
                            key={idx}
                            className="w-4 h-4 fill-[#B88B3B] text-[#B88B3B]"
                            strokeWidth={1.5}
                          />
                        ))}
                        <span className="ml-1.5 text-xs font-semibold text-[#183D2B] tabular-nums">
                          {item.rating}.0 / 5
                        </span>
                      </div>

                      <Quote
                        className="w-6 h-6 text-[#607D50]/45 shrink-0"
                        strokeWidth={1.5}
                        aria-hidden="true"
                      />
                    </div>

                    {/* Headline & Quote Body */}
                    <h3 className="font-serif text-2xl text-[#183D2B] font-semibold leading-snug mb-3.5">
                      &ldquo;{item.headline}&rdquo;
                    </h3>
                    <p className="text-sm sm:text-[15px] text-[#242824]/80 leading-[1.75]">
                      {item.quote}
                    </p>
                  </div>

                  {/* Clean Unboxed Guest Attribution */}
                  <div className="mt-7 pt-5 border-t border-[#E8DDC8]">
                    <p className="font-serif text-xl font-semibold text-[#183D2B] leading-snug">
                      {item.guestName}
                    </p>
                    <p className="text-xs text-[#242824]/65 mt-1 leading-relaxed">
                      <span>{item.stayType}</span>
                      <span aria-hidden="true" className="mx-1.5">
                        ·
                      </span>
                      <span>{item.groupSize}</span>
                      <span aria-hidden="true" className="mx-1.5">
                        ·
                      </span>
                      <span>{item.location}</span>
                    </p>
                    <p className="text-[11px] text-[#607D50] font-medium mt-1">
                      Stayed {item.stayPeriod}
                    </p>
                  </div>
                </article>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Interactive Slide Selector Indicators */}
        <div
          className="mt-10 flex items-center justify-center gap-2.5"
          role="tablist"
          aria-label="Select guest testimonial"
        >
          {GUEST_TESTIMONIALS.map((item, idx) => {
            const isActive = idx === activeIndex;
            return (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-label={`View testimonial from ${item.guestName}`}
                onClick={() => handleSelectSlide(idx)}
                className={`h-2 rounded-full transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E8DDC8] ${
                  isActive
                    ? 'w-9 bg-[#F8F5EC]'
                    : 'w-2.5 bg-[#E8DDC8]/35 hover:bg-[#E8DDC8]/65'
                }`}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};
