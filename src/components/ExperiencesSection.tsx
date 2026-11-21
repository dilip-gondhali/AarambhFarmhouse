import React from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { EXPERIENCES } from '../data/resortData';
import { ResilientImage } from './ResilientImage';

interface ExperiencesSectionProps {
  onSelectOccasion: (occasion: string) => void;
}

export const ExperiencesSection: React.FC<ExperiencesSectionProps> = ({ onSelectOccasion }) => {
  const handlePlanStay = (bookingType: string) => {
    onSelectOccasion(bookingType);
    const bookingEl = document.getElementById('booking');
    if (bookingEl) {
      bookingEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="experiences" className="bg-[#183D2B] text-[#F8F5EC] py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        {/* Section Heading */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-14">
          <div className="max-w-2xl">
            <p className="text-[#E8DDC8] text-xs font-semibold tracking-[0.18em] uppercase mb-3">
              Curated Stays &amp; Celebrations
            </p>
            <h2 className="font-serif text-[#FFFFFF] text-4xl sm:text-5xl leading-[1.1] font-medium">
              Make Every Moment Special
            </h2>
          </div>
          <p className="text-[#E8DDC8]/85 text-sm sm:text-base max-w-md leading-relaxed tracking-[0.01em]">
            From quiet weekend retreats to lively milestone celebrations, choose an experience
            tailored to your group and let us prepare the resort for your arrival.
          </p>
        </div>

        {/* 6 Large Photographic Experience Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {EXPERIENCES.map((item, idx) => (
            <motion.article
              key={item.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{
                duration: 0.45,
                delay: idx * 0.05,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="group relative rounded-2xl overflow-hidden bg-[#122F21] border border-white/10 flex flex-col"
            >
              <div className="relative h-64 sm:h-72 overflow-hidden">
                <ResilientImage
                  src={item.image}
                  alt={item.imageAlt}
                  objectPosition={item.objectPosition}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#122F21] via-[#122F21]/20 to-transparent" />
                <span className="absolute top-4 left-5 font-serif text-lg text-[#E8DDC8]/90 tabular-nums">
                  {item.index}
                </span>
              </div>

              <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-serif text-2xl sm:text-[1.65rem] text-[#FFFFFF] font-medium leading-snug mb-2.5">
                    {item.title}
                  </h3>
                  <p className="text-sm text-[#E8DDC8]/85 leading-relaxed tracking-[0.01em]">
                    {item.description}
                  </p>
                </div>

                <div className="mt-6 pt-5 border-t border-white/10">
                  <button
                    type="button"
                    onClick={() => handlePlanStay(item.bookingType)}
                    className="inline-flex items-center gap-2 text-sm font-medium text-[#F8F5EC] hover:text-[#E8DDC8] transition-colors cursor-pointer whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E8DDC8] rounded-sm"
                  >
                    <span>Plan this experience</span>
                    <ArrowUpRight
                      className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      strokeWidth={1.75}
                    />
                  </button>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};
