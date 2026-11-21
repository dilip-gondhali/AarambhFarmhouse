import React from 'react';
import { MessageCircle } from 'lucide-react';
import { getQuickWhatsAppUrl } from '../data/resortData';

export const FloatingWhatsAppButton: React.FC = () => {
  return (
    <a
      href={getQuickWhatsAppUrl()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Book your stay on WhatsApp"
      className="fixed bottom-5 right-5 z-40 inline-flex items-center gap-2.5 px-4 sm:px-5 h-12 rounded-full bg-[#183D2B] text-[#F8F5EC] border border-[#E8DDC8]/35 shadow-xl shadow-black/20 hover:bg-[#23533B] hover:-translate-y-0.5 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#183D2B]"
    >
      <MessageCircle className="w-5 h-5 shrink-0" strokeWidth={1.85} />
      <span className="hidden sm:inline text-sm font-medium whitespace-nowrap">
        WhatsApp Booking
      </span>
    </a>
  );
};
