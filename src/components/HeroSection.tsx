import React from 'react';
import { motion } from 'motion/react';
import { ArrowDown, MapPin } from 'lucide-react';
import { RESORT_CONFIG, RESORT_IMAGES } from '../data/resortData';
import { ResilientImage } from './ResilientImage';

export const HeroSection: React.FC = () => {
  return (
    <section
      id="home"
      className="relative min-h-[100svh] w-full flex items-end lg:items-center overflow-hidden bg-[#183D2B]"
    >
      {/* Authentic Full-Screen Sunset Resort Photography */}
      <div className="absolute inset-0">
        <ResilientImage
          src={RESORT_IMAGES.sunsetPoolVilla}
          alt="Aarambh Farmhouse Staycation & Resort swimming pool, lawn, and villas at sunset in Morbe, Panvel"
          loading="eager"
          className="w-full h-full object-cover object-center scale-[1.01]"
        />
        {/* Measured multi-stop scrim guaranteeing crisp text legibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#183D2B]/65 via-[#183D2B]/30 to-[#183D2B]/85" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#183D2B]/70 via-[#183D2B]/25 to-transparent" />
      </div>

      {/* Editorial Hero Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-5 sm:px-8 pt-32 pb-20 lg:py-32">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl"
        >
          <p className="text-[#E8DDC8] text-sm sm:text-base font-medium tracking-[0.16em] uppercase mb-5">
            Escape the Ordinary. Embrace Nature.
          </p>

          <h1 className="font-serif text-[#FFFFFF] text-[clamp(2.75rem,6vw,5.25rem)] leading-[1.04] font-medium tracking-tight mb-6">
            Aarambh Farmhouse
            <span className="block italic font-normal text-[#E8DDC8] mt-1">
              Staycation &amp; Resort
            </span>
          </h1>

          <p className="text-[#F8F5EC]/95 text-base sm:text-lg lg:text-xl leading-relaxed max-w-xl font-normal mb-6 tracking-[0.01em]">
            Your perfect getaway surrounded by nature, comfort and unforgettable memories.
          </p>

          {/* Clean unboxed location line */}
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-[#E8DDC8] mb-10">
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-[#E8DDC8] shrink-0" strokeWidth={1.75} />
              <span>{RESORT_CONFIG.locationShort}</span>
            </span>
            <span aria-hidden="true" className="opacity-50">
              ·
            </span>
            <span>Sahyadri Foothills Retreat</span>
            <span aria-hidden="true" className="opacity-50">
              ·
            </span>
            <span>Near Navi Mumbai</span>
          </div>

          {/* Primary & Secondary CTAs */}
          <div className="flex flex-wrap items-center gap-4">
            <a
              href="#booking"
              className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-[#F8F5EC] text-[#183D2B] text-sm sm:text-[15px] font-semibold tracking-wide hover:bg-[#FFFFFF] transition-all duration-200 shadow-lg shadow-black/20 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#E8DDC8]"
            >
              Book Your Stay
            </a>
            <a
              href="#about"
              className="inline-flex items-center justify-center px-8 py-4 rounded-full border border-[#F8F5EC]/65 bg-[#183D2B]/35 backdrop-blur-sm text-[#FFFFFF] text-sm sm:text-[15px] font-medium tracking-wide hover:bg-[#F8F5EC]/15 hover:border-[#FFFFFF] transition-all duration-200 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#E8DDC8]"
            >
              Explore the Resort
            </a>
          </div>
        </motion.div>
      </div>

      {/* Subtle Scroll Cue */}
      <a
        href="#about"
        aria-label="Scroll to About Aarambh"
        className="hidden sm:inline-flex items-center gap-2 absolute bottom-8 right-8 z-10 text-xs tracking-[0.14em] uppercase text-[#E8DDC8]/90 hover:text-[#FFFFFF] transition-colors"
      >
        <span>Scroll to Explore</span>
        <ArrowDown className="w-4 h-4" strokeWidth={1.5} />
      </a>
    </section>
  );
};
