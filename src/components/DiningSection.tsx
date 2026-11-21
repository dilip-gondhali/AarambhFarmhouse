import React from 'react';
import { motion } from 'motion/react';
import { DINING_HIGHLIGHTS, RESORT_IMAGES } from '../data/resortData';
import { ResilientImage } from './ResilientImage';

export const DiningSection: React.FC = () => {
  return (
    <section id="dining" className="bg-[#F8F5EC] py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-stretch">
          {/* Left: Authentic Outdoor Dining Veranda & Culinary Flow */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 flex flex-col gap-5"
          >
            <div className="relative rounded-2xl overflow-hidden bg-[#E8DDC8] flex-1 min-h-[320px] lg:min-h-[420px]">
              <ResilientImage
                src={RESORT_IMAGES.sunsetPoolVilla}
                alt="Covered open-air dining veranda beside the lawn and illuminated pool at Aarambh Farmhouse"
                objectPosition="left center"
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-[1.03]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#183D2B]/80 via-[#183D2B]/15 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
                <p className="text-xs uppercase tracking-[0.16em] text-[#E8DDC8] mb-2">
                  Courtyard Dining Pavilion
                </p>
                <p className="font-serif text-2xl sm:text-3xl text-[#FFFFFF] leading-snug max-w-md">
                  Fresh homestyle meals served beside the garden breeze and poolside lights
                </p>
              </div>
            </div>

            {/* Quiet Culinary Schedule Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-6 rounded-2xl bg-[#FFFFFF] border border-[#E8DDC8]">
              <div>
                <p className="text-xs text-[#607D50] font-semibold uppercase tracking-wider">
                  Morning
                </p>
                <p className="font-serif text-lg text-[#183D2B] font-semibold mt-1">
                  Free Breakfast
                </p>
              </div>
              <div className="border-l border-[#E8DDC8] pl-4">
                <p className="text-xs text-[#607D50] font-semibold uppercase tracking-wider">
                  Afternoon
                </p>
                <p className="font-serif text-lg text-[#183D2B] font-semibold mt-1">
                  Unlimited Lunch
                </p>
              </div>
              <div className="sm:border-l border-[#E8DDC8] sm:pl-4">
                <p className="text-xs text-[#607D50] font-semibold uppercase tracking-wider">
                  Evening
                </p>
                <p className="font-serif text-lg text-[#183D2B] font-semibold mt-1">
                  Hi-Tea &amp; BBQ
                </p>
              </div>
              <div className="border-l border-[#E8DDC8] pl-4">
                <p className="text-xs text-[#607D50] font-semibold uppercase tracking-wider">
                  Night
                </p>
                <p className="font-serif text-lg text-[#183D2B] font-semibold mt-1">
                  Unlimited Dinner
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right: Editorial Dining Story & 4 Highlights */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 flex flex-col justify-between"
          >
            <div className="mb-10">
              <p className="text-[#607D50] text-xs font-semibold tracking-[0.18em] uppercase mb-3">
                Food &amp; Dining
              </p>
              <h2 className="font-serif text-[#183D2B] text-4xl sm:text-5xl leading-[1.1] font-medium mb-5">
                Delicious Food. Beautiful Memories.
              </h2>
              <p className="text-[#242824]/80 text-[15px] sm:text-base leading-[1.75] max-w-xl">
                Enjoy delicious meals and memorable dining experiences with your loved ones. From
                complimentary breakfast to unlimited food, every meal adds something special to
                your stay.
              </p>
            </div>

            {/* Clean Hairline-Separated Dining Highlights */}
            <div className="divide-y divide-[#E8DDC8] border-y border-[#E8DDC8]">
              {DINING_HIGHLIGHTS.map((highlight) => (
                <div key={highlight.number} className="py-5 sm:py-6 flex items-start gap-5">
                  <span className="font-serif text-xl text-[#607D50] font-medium tabular-nums pt-0.5 shrink-0">
                    {highlight.number}
                  </span>
                  <div>
                    <h3 className="font-serif text-2xl text-[#183D2B] font-medium leading-snug mb-1.5">
                      {highlight.title}
                    </h3>
                    <p className="text-sm text-[#242824]/75 leading-relaxed">
                      {highlight.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
