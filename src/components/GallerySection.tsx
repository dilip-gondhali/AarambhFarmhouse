import React, { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Expand, X } from 'lucide-react';
import { GALLERY_PHOTOS, GalleryCategory, GalleryPhoto } from '../data/resortData';
import { ResilientImage } from './ResilientImage';

const CATEGORIES: GalleryCategory[] = [
  'All',
  'Swimming Pool',
  'AC Rooms',
  'Gazebo & Lawn',
  'Resort Exterior',
];

export const GallerySection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<GalleryCategory>('All');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filteredPhotos: GalleryPhoto[] =
    activeCategory === 'All'
      ? GALLERY_PHOTOS
      : GALLERY_PHOTOS.filter((photo) => photo.category === activeCategory);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
  };

  const closeLightbox = useCallback(() => {
    setLightboxIndex(null);
  }, []);

  const showPrev = useCallback(() => {
    setLightboxIndex((prev) => {
      if (prev === null) return null;
      return prev === 0 ? filteredPhotos.length - 1 : prev - 1;
    });
  }, [filteredPhotos.length]);

  const showNext = useCallback(() => {
    setLightboxIndex((prev) => {
      if (prev === null) return null;
      return prev === filteredPhotos.length - 1 ? 0 : prev + 1;
    });
  }, [filteredPhotos.length]);

  useEffect(() => {
    if (lightboxIndex === null) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeLightbox();
      if (event.key === 'ArrowLeft') showPrev();
      if (event.key === 'ArrowRight') showNext();
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [lightboxIndex, closeLightbox, showPrev, showNext]);

  const activePhoto = lightboxIndex !== null ? filteredPhotos[lightboxIndex] : null;

  return (
    <section id="gallery" className="bg-[#FFFFFF] py-24 lg:py-32 border-t border-[#E8DDC8]">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        {/* Header & Interactive Filter Controls */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12">
          <div className="max-w-xl">
            <p className="text-[#607D50] text-xs font-semibold tracking-[0.18em] uppercase mb-3">
              Authentic Resort Photography
            </p>
            <h2 className="font-serif text-[#183D2B] text-4xl sm:text-5xl leading-[1.1] font-medium">
              A Glimpse of Aarambh
            </h2>
            <p className="text-sm sm:text-base text-[#242824]/75 mt-3 leading-relaxed">
              Every photograph below is captured directly at Aarambh Farmhouse Staycation &amp;
              Resort in Morbe, Panvel. Select any image to view in full screen.
            </p>
          </div>

          {/* Functional Segmented Filter Bar */}
          <div
            role="tablist"
            aria-label="Filter resort gallery by area"
            className="flex flex-wrap items-center gap-1.5 p-1.5 rounded-xl bg-[#F8F5EC] border border-[#E8DDC8] self-start lg:self-auto"
          >
            {CATEGORIES.map((category) => {
              const isSelected = activeCategory === category;
              return (
                <button
                  key={category}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => {
                    setActiveCategory(category);
                    setLightboxIndex(null);
                  }}
                  className={`px-3.5 py-2 text-xs sm:text-sm font-medium rounded-lg transition-colors duration-200 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#607D50] ${
                    isSelected
                      ? 'bg-[#183D2B] text-[#F8F5EC]'
                      : 'text-[#242824]/75 hover:text-[#183D2B] hover:bg-[#E8DDC8]/45'
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </div>

        {/* Editorial Bento / Masonry Photo Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 auto-rows-[260px] sm:auto-rows-[280px]">
          {filteredPhotos.map((photo, index) => (
            <button
              key={photo.id}
              type="button"
              onClick={() => openLightbox(index)}
              aria-label={`View ${photo.title} in full screen`}
              className={`group relative rounded-2xl overflow-hidden bg-[#E8DDC8] text-left cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#183D2B] ${
                activeCategory === 'All' ? photo.spanClass : 'md:col-span-1 md:row-span-1'
              }`}
            >
              <ResilientImage
                src={photo.src}
                alt={photo.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#183D2B]/85 via-[#183D2B]/15 to-transparent opacity-80 group-hover:opacity-95 transition-opacity duration-300" />

              <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-[#183D2B]/65 backdrop-blur-sm text-[#F8F5EC] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <Expand className="w-4 h-4" strokeWidth={1.75} />
              </div>

              <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
                <p className="text-[11px] text-[#E8DDC8] uppercase tracking-[0.14em] mb-1">
                  {photo.category}
                </p>
                <h3 className="font-serif text-xl sm:text-2xl text-[#FFFFFF] font-medium leading-snug">
                  {photo.title}
                </h3>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Accessible Full-Screen Lightbox Viewer */}
      {activePhoto && lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-[#0F1B14]/95 backdrop-blur-md flex flex-col justify-between p-4 sm:p-8"
          role="dialog"
          aria-modal="true"
          aria-label={activePhoto.title}
          onClick={closeLightbox}
        >
          {/* Lightbox Top Bar */}
          <div
            className="flex items-center justify-between text-[#F8F5EC] max-w-6xl w-full mx-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 text-xs sm:text-sm text-[#E8DDC8] tabular-nums">
              <span>
                {String(lightboxIndex + 1).padStart(2, '0')} /{' '}
                {String(filteredPhotos.length).padStart(2, '0')}
              </span>
              <span aria-hidden="true">·</span>
              <span>{activePhoto.category}</span>
            </div>

            <button
              type="button"
              onClick={closeLightbox}
              aria-label="Close gallery lightbox"
              className="inline-flex items-center justify-center w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-[#FFFFFF] transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" strokeWidth={1.75} />
            </button>
          </div>

          {/* Lightbox Image Stage */}
          <div
            className="relative flex-1 flex items-center justify-center my-4 max-w-6xl w-full mx-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {filteredPhotos.length > 1 && (
              <button
                type="button"
                onClick={showPrev}
                aria-label="Previous photograph"
                className="absolute left-0 sm:left-2 z-10 inline-flex items-center justify-center w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#183D2B]/80 hover:bg-[#183D2B] text-[#F8F5EC] border border-white/15 transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-6 h-6" strokeWidth={1.75} />
              </button>
            )}

            <img
              src={activePhoto.src}
              alt={activePhoto.title}
              referrerPolicy="no-referrer"
              className="max-h-[72vh] max-w-full object-contain rounded-xl shadow-2xl"
            />

            {filteredPhotos.length > 1 && (
              <button
                type="button"
                onClick={showNext}
                aria-label="Next photograph"
                className="absolute right-0 sm:right-2 z-10 inline-flex items-center justify-center w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#183D2B]/80 hover:bg-[#183D2B] text-[#F8F5EC] border border-white/15 transition-colors cursor-pointer"
              >
                <ChevronRight className="w-6 h-6" strokeWidth={1.75} />
              </button>
            )}
          </div>

          {/* Lightbox Caption */}
          <div
            className="max-w-3xl w-full mx-auto text-center text-[#F8F5EC]"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="font-serif text-2xl sm:text-3xl font-medium text-[#FFFFFF]">
              {activePhoto.title}
            </h3>
            <p className="text-sm text-[#E8DDC8]/90 mt-1.5 leading-relaxed">
              {activePhoto.caption}
            </p>
          </div>
        </div>
      )}
    </section>
  );
};
