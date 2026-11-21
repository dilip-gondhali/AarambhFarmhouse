import React from 'react';
import { Instagram, MapPin, MessageCircle, Phone, ExternalLink } from 'lucide-react';
import { RESORT_CONFIG, RESORT_IMAGES, getQuickWhatsAppUrl } from '../data/resortData';
import { ResilientImage } from './ResilientImage';

const QUICK_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'About Us', href: '#about' },
  { label: 'Facilities', href: '#facilities' },
  { label: 'Experiences', href: '#experiences' },
  { label: 'Food & Dining', href: '#dining' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Location', href: '#location' },
  { label: 'Guest Reviews', href: '#testimonials' },
  { label: 'Contact Us', href: '#booking' },
] as const;

const FOOTER_FACILITIES = [
  'Big Swimming Pool',
  '4 AC Rooms (Double Beds & Extra Beds)',
  'Massive AC Hall (70–80 Guests)',
  'Complimentary Breakfast & Unlimited Food',
  'Two-Level Poolside Gazebo',
  'Special Lawn & Garden Area',
  'Music System & BBQ on Request',
  'Free Wi-Fi & Free Parking',
] as const;

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#183D2B] text-[#F8F5EC] border-t border-white/10">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 pt-20 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16 border-b border-white/15">
          {/* Column 1: Brand Identity */}
          <div className="lg:col-span-4 space-y-5">
            <a href="#home" aria-label="Aarambh Farmhouse Staycation & Resort" className="inline-block">
              <div className="w-52 sm:w-60 overflow-hidden">
                <ResilientImage
                  src={RESORT_IMAGES.brandLogoDark}
                  alt="Aarambh Farmhouse Staycation & Resort Transparent Logo"
                  className="w-full h-auto object-contain object-left"
                />
              </div>
            </a>

            <p className="text-sm text-[#E8DDC8]/85 leading-relaxed max-w-sm">
              A serene nature-inspired farmhouse staycation in Morbe, Panvel designed for peaceful
              family getaways, poolside celebrations, corporate retreats, and unforgettable
              weekends near Navi Mumbai.
            </p>

            <div className="flex items-center gap-3 pt-1">
              <a
                href={RESORT_CONFIG.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow Aarambh Farmhouse on Instagram"
                className="inline-flex items-center justify-center w-10 h-10 rounded-full border border-white/20 text-[#F8F5EC] hover:bg-[#F8F5EC] hover:text-[#183D2B] transition-colors"
              >
                <Instagram className="w-4 h-4" strokeWidth={1.75} />
              </a>
              <a
                href={getQuickWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Message Aarambh Farmhouse on WhatsApp"
                className="inline-flex items-center justify-center w-10 h-10 rounded-full border border-white/20 text-[#F8F5EC] hover:bg-[#F8F5EC] hover:text-[#183D2B] transition-colors"
              >
                <MessageCircle className="w-4 h-4" strokeWidth={1.75} />
              </a>
              <a
                href={RESORT_CONFIG.defaultMapsSearchUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="View Aarambh Farmhouse on Google Maps"
                className="inline-flex items-center justify-center w-10 h-10 rounded-full border border-white/20 text-[#F8F5EC] hover:bg-[#F8F5EC] hover:text-[#183D2B] transition-colors"
              >
                <MapPin className="w-4 h-4" strokeWidth={1.75} />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Navigation */}
          <div className="lg:col-span-2">
            <h3 className="font-serif text-xl text-[#FFFFFF] font-medium mb-5">Quick Links</h3>
            <ul className="space-y-2.5 text-sm text-[#E8DDC8]/85">
              {QUICK_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="hover:text-[#FFFFFF] transition-colors inline-block py-0.5"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Resort Facilities */}
          <div className="lg:col-span-3">
            <h3 className="font-serif text-xl text-[#FFFFFF] font-medium mb-5">
              Resort Facilities
            </h3>
            <ul className="space-y-2.5 text-sm text-[#E8DDC8]/85">
              {FOOTER_FACILITIES.map((facility) => (
                <li key={facility}>{facility}</li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact Details */}
          <div className="lg:col-span-3">
            <h3 className="font-serif text-xl text-[#FFFFFF] font-medium mb-5">Contact Us</h3>
            <div className="space-y-4 text-sm text-[#E8DDC8]/85">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#E8DDC8] shrink-0 mt-1" strokeWidth={1.65} />
                <p className="leading-relaxed">
                  Aarambh Farmhouse Staycation &amp; Resort, Morbe, Panvel, Maharashtra, India
                </p>
              </div>

              <a
                href={RESORT_CONFIG.phoneHref}
                className="flex items-center gap-3 hover:text-[#FFFFFF] transition-colors tabular-nums"
              >
                <Phone className="w-4 h-4 text-[#E8DDC8] shrink-0" strokeWidth={1.65} />
                <span>{RESORT_CONFIG.phoneDisplay}</span>
              </a>

              <a
                href={RESORT_CONFIG.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 hover:text-[#FFFFFF] transition-colors break-all"
              >
                <Instagram className="w-4 h-4 text-[#E8DDC8] shrink-0" strokeWidth={1.65} />
                <span>{RESORT_CONFIG.instagramHandle}</span>
              </a>

              <a
                href={RESORT_CONFIG.defaultDirectionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.14em] text-[#FFFFFF] border-b border-white/35 pb-1 hover:border-[#FFFFFF] transition-colors mt-2"
              >
                <span>Open in Google Maps</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>

        {/* Quiet Copyright & Local SEO Strip */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#E8DDC8]/75">
          <p>&copy; 2026 Aarambh Farmhouse Staycation &amp; Resort. All Rights Reserved.</p>
          <p className="text-center sm:text-right">
            Farmhouse in Panvel · Resort in Morbe · Staycation near Panvel · Family Resort near
            Navi Mumbai
          </p>
        </div>
      </div>
    </footer>
  );
};
