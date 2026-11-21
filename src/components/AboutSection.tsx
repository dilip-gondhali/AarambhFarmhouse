import React from 'react';
import { motion } from 'motion/react';
import { RESORT_IMAGES } from '../data/resortData';
import { ResilientImage } from './ResilientImage';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="bg-[#F8F5EC] py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-stretch">
          {/* Editorial Copy Column */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 flex flex-col justify-between"
          >
            <div>
              <p className="text-[#607D50] text-xs font-semibold tracking-[0.18em] uppercase mb-4">
                About Aarambh
              </p>

              <h2 className="font-serif text-[#183D2B] text-4xl sm:text-5xl leading-[1.1] font-medium mb-8">
                Your Peaceful Escape Begins Here
              </h2>

              <div className="space-y-5 text-[#242824]/85 text-[15px] sm:text-base leading-[1.75]">
                <p>
                  Welcome to Aarambh Farmhouse Staycation &amp; Resort, your perfect destination to
                  unwind, reconnect, and create beautiful memories.
                </p>
                <p>
                  Nestled amidst the natural beauty of Morbe, Panvel, Aarambh offers a refreshing
                  escape from busy city life. Whether you&apos;re planning a relaxing family
                  vacation, a fun-filled gathering with friends, or a special celebration, we
                  provide the perfect setting for every occasion.
                </p>
                <p>
                  Experience comfortable AC accommodation, delicious food, refreshing swimming pool
                  moments, and beautiful outdoor spaces – all under one roof.
                </p>
              </div>
            </div>

            {/* Quiet Unboxed Editorial Highlights Strip */}
            <div className="mt-10 pt-8 border-t border-[#E8DDC8] grid grid-cols-3 gap-4">
              <div>
                <p className="font-serif text-2xl sm:text-3xl text-[#183D2B] font-medium tabular-nums">
                  4 AC Rooms
                </p>
                <p className="text-xs sm:text-[13px] text-[#242824]/70 mt-1">
                  Double beds, clean attached baths &amp; extra beds
                </p>
              </div>
              <div className="border-l border-[#E8DDC8] pl-4">
                <p className="font-serif text-2xl sm:text-3xl text-[#183D2B] font-medium tabular-nums">
                  70–80
                </p>
                <p className="text-xs sm:text-[13px] text-[#242824]/70 mt-1">
                  Guest capacity in our massive AC hall
                </p>
              </div>
              <div className="border-l border-[#E8DDC8] pl-4">
                <p className="font-serif text-2xl sm:text-3xl text-[#183D2B] font-medium">
                  All-Day
                </p>
                <p className="text-xs sm:text-[13px] text-[#242824]/70 mt-1">
                  Free breakfast &amp; unlimited meals
                </p>
              </div>
            </div>
          </motion.div>

          {/* Editorial Photography Composition */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-12 gap-5 items-stretch"
          >
            <div className="sm:col-span-8 relative rounded-2xl overflow-hidden bg-[#E8DDC8] min-h-[340px] lg:min-h-[480px]">
              <ResilientImage
                src={RESORT_IMAGES.goldenHourAerial}
                alt="Aerial view of Aarambh Farmhouse swimming pool, manicured lawn, red-roofed cottages and Sahyadri hills"
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-[1.03]"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#183D2B]/75 via-[#183D2B]/20 to-transparent p-5">
                <p className="text-xs text-[#E8DDC8] tracking-wide">
                  Poolside Courtyard &amp; Sahyadri Horizon · Morbe, Panvel
                </p>
              </div>
            </div>

            <div className="sm:col-span-4 flex flex-col gap-5">
              <div className="relative rounded-2xl overflow-hidden bg-[#E8DDC8] flex-1 min-h-[210px]">
                <ResilientImage
                  src={RESORT_IMAGES.gazeboPavilion}
                  alt="Two-level open-air poolside gazebo pavilion surrounded by greenery"
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-[1.03]"
                />
              </div>
              <div className="relative rounded-2xl overflow-hidden bg-[#E8DDC8] flex-1 min-h-[210px]">
                <ResilientImage
                  src={RESORT_IMAGES.acBedroom}
                  alt="Spacious clean air-conditioned bedroom at Aarambh Farmhouse"
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-[1.03]"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
