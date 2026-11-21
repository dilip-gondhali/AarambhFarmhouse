import React from 'react';
import { motion } from 'motion/react';
import {
  BedDouble,
  Building2,
  Waves,
  Wind,
  Coffee,
  Utensils,
  Tent,
  Music,
  Trees,
  Sparkles,
  Wifi,
  Flame,
  Car,
  Users,
} from 'lucide-react';
import { FACILITIES, FacilityItem, RESORT_IMAGES } from '../data/resortData';
import { ResilientImage } from './ResilientImage';

const ICON_MAP: Record<FacilityItem['iconName'], React.FC<{ className?: string; strokeWidth?: number }>> = {
  waves: Waves,
  wind: Wind,
  coffee: Coffee,
  utensils: Utensils,
  tent: Tent,
  music: Music,
  trees: Trees,
  sparkles: Sparkles,
  wifi: Wifi,
  flame: Flame,
  car: Car,
  users: Users,
};

const FEATURED_SPACES = [
  {
    title: 'Big Swimming Pool & Deck',
    subtitle: 'Crystal-clear mosaic pool with shallow & deep zones',
    image: RESORT_IMAGES.poolCourtyard,
    alt: 'Large blue tiled swimming pool surrounded by warm lighting and poolside rooms',
    colClass: 'lg:col-span-6',
  },
  {
    title: 'Two-Level Gazebo & Lawn',
    subtitle: 'Open-air pavilion for sunsets, games & gatherings',
    image: RESORT_IMAGES.gazeboPavilion,
    alt: 'Vibrant two-story poolside gazebo pavilion at Aarambh Farmhouse',
    colClass: 'lg:col-span-3',
  },
  {
    title: '4 Air-Conditioned Rooms',
    subtitle: 'Double beds, clean attached bathrooms & extra beds provided',
    image: RESORT_IMAGES.acBedroom,
    alt: 'Air-conditioned bedroom interior with double bed at Aarambh Farmhouse Staycation & Resort',
    colClass: 'lg:col-span-3',
  },
] as const;

export const FacilitiesSection: React.FC = () => {
  return (
    <section id="facilities" className="bg-[#FFFFFF] py-24 lg:py-32 border-t border-[#E8DDC8]">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        {/* Section Heading */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-14">
          <div className="max-w-2xl">
            <p className="text-[#607D50] text-xs font-semibold tracking-[0.18em] uppercase mb-3">
              Resort Facilities
            </p>
            <h2 className="font-serif text-[#183D2B] text-4xl sm:text-5xl leading-[1.1] font-medium">
              Everything You Need for a Perfect Stay
            </h2>
          </div>
          <p className="text-[#242824]/75 text-sm sm:text-base max-w-md leading-relaxed">
            Every detail across our grounds is thoughtfully arranged so families, couples, and
            groups can relax effortlessly from check-in to farewell.
          </p>
        </div>

        {/* Asymmetric Visual Showcase of Signature Spaces */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-5 mb-6">
          {FEATURED_SPACES.map((space) => (
            <div
              key={space.title}
              className={`${space.colClass} group relative rounded-2xl overflow-hidden bg-[#E8DDC8] h-72 sm:h-80`}
            >
              <ResilientImage
                src={space.image}
                alt={space.alt}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#183D2B]/80 via-[#183D2B]/20 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6">
                <h3 className="font-serif text-2xl text-[#FFFFFF] font-medium leading-snug">
                  {space.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#E8DDC8] mt-1">{space.subtitle}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Dedicated Stay & Event Capacity Highlight */}
        <div className="grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-[#E8DDC8] rounded-2xl bg-[#F8F5EC] border border-[#E8DDC8] mb-14">
          <div className="p-7 sm:p-8 flex items-start gap-5">
            <div className="w-12 h-12 rounded-xl bg-[#183D2B] text-[#F8F5EC] flex items-center justify-center shrink-0">
              <BedDouble className="w-5 h-5" strokeWidth={1.65} />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#607D50] mb-1">
                Overnight Stay Comfort
              </p>
              <h3 className="font-serif text-2xl sm:text-[1.7rem] text-[#183D2B] font-semibold leading-snug mb-2">
                4 AC Rooms with Double Beds &amp; Clean Attached Bathrooms
              </h3>
              <p className="text-sm text-[#242824]/80 leading-relaxed">
                Unwind in four well-appointed, air-conditioned rooms equipped with comfortable
                double beds and spotless attached bathrooms. Extra beds are readily provided so
                larger families and groups can stay together comfortably.
              </p>
            </div>
          </div>

          <div className="p-7 sm:p-8 flex items-start gap-5">
            <div className="w-12 h-12 rounded-xl bg-[#183D2B] text-[#F8F5EC] flex items-center justify-center shrink-0">
              <Building2 className="w-5 h-5" strokeWidth={1.65} />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#607D50] mb-1">
                Indoor Celebrations &amp; Group Events
              </p>
              <h3 className="font-serif text-2xl sm:text-[1.7rem] text-[#183D2B] font-semibold leading-snug mb-2">
                Massive AC Hall for 70–80 Guests Easily
              </h3>
              <p className="text-sm text-[#242824]/80 leading-relaxed">
                Our expansive, fully air-conditioned indoor hall easily accommodates 70 to 80
                people—ideal for birthday parties, family get-togethers, corporate offsites,
                pre-wedding celebrations, and large group dining.
              </p>
            </div>
          </div>
        </div>

        {/* Clean 12-Item Facilities Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {FACILITIES.map((facility, idx) => {
            const IconComponent = ICON_MAP[facility.iconName];
            return (
              <motion.article
                key={facility.id}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{
                  duration: 0.4,
                  delay: Math.min(idx * 0.03, 0.25),
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="group p-6 rounded-2xl border border-[#E8DDC8] bg-[#F8F5EC]/55 hover:bg-[#F8F5EC] hover:border-[#607D50]/50 transition-colors duration-200"
              >
                <div className="w-11 h-11 rounded-xl bg-[#183D2B]/8 text-[#183D2B] flex items-center justify-center mb-5 group-hover:bg-[#183D2B] group-hover:text-[#F8F5EC] transition-colors duration-200">
                  <IconComponent className="w-5 h-5" strokeWidth={1.65} />
                </div>
                <h3 className="font-serif text-[1.35rem] font-semibold text-[#183D2B] leading-snug mb-2">
                  {facility.title}
                </h3>
                <p className="text-sm text-[#242824]/75 leading-relaxed">
                  {facility.description}
                </p>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
};
