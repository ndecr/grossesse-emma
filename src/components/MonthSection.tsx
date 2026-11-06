import React, { useState, useRef } from 'react';
import { 
  FaChevronDown, 
  FaChevronUp, 
  FaPlay, 
  FaImages, 
  FaSliders, 
  FaQuoteLeft,
  FaArrowLeft,
  FaArrowRight,
  FaHeart
} from 'react-icons/fa6';
import { MonthSection as MonthSectionType, MediaItem } from '../data/pregnancyData';

const FRUIT_EMOJIS: Record<number, string> = {
  2: '🍓',
  3: '🫐',
  4: '🥑',
  5: '🥭',
  6: '🌽',
  7: '🥥',
  8: '🍍',
  9: '🍉',
};

interface MonthSectionProps {
  month: MonthSectionType;
  isFirst: boolean;
  onOpenLightbox: (item: MediaItem) => void;
}

export const MonthSection: React.FC<MonthSectionProps> = ({ 
  month, 
  isFirst, 
  onOpenLightbox 
}) => {
  const [isOpen, setIsOpen] = useState(true);
  const [viewMode, setViewMode] = useState<'carousel' | 'grid'>('carousel');
  const carouselRef = useRef<HTMLDivElement>(null);

  const scrollCarousel = (direction: 'left' | 'right') => {
    if (carouselRef.current) {
      const scrollAmount = direction === 'left' ? -320 : 320;
      carouselRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <article 
      id={month.id}
      data-aos="fade-up"
      className="scroll-mt-24 mb-10 max-w-5xl mx-auto px-4"
    >
      <div className="glass-panel rounded-3xl p-5 sm:p-7 shadow-soft border border-pink-100/90 transition-all duration-300">
        
        {/* Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-pink-100/70">
          
          <div className="flex items-start sm:items-center gap-3">
            {/* Round month badge */}
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-pink-400 via-rose-300 to-amber-200 text-white flex flex-col items-center justify-center shadow-soft flex-shrink-0">
              <span className="text-[10px] font-bold uppercase tracking-wider leading-none">Mois</span>
              <span className="text-xl font-serif font-black leading-none mt-0.5">{month.monthNumber}</span>
            </div>

            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="font-serif text-2xl font-bold text-slate-800 tracking-tight">
                  {month.title}
                </h2>
                <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-pink-100 text-pink-700">
                  {month.badge}
                </span>
                <span className="text-[11px] text-slate-500 font-medium">
                  • {month.dateRange}
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium mt-0.5">
                {month.tagline}
              </p>
            </div>
          </div>

          {/* Action buttons: view mode switch + accordion collapse */}
          <div className="flex items-center gap-2 self-end sm:self-auto">
            {/* View switcher */}
            <div className="bg-pink-50/80 p-1 rounded-xl flex items-center border border-pink-200/60">
              <button
                onClick={() => setViewMode('carousel')}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium transition ${
                  viewMode === 'carousel'
                    ? 'bg-white text-pink-700 shadow-sm font-semibold'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
                aria-label="Mode carrousel"
                title="Affichage défilant horizontal (Carrousel)"
              >
                <FaSliders className="text-[10px]" />
                <span className="hidden xs:inline">Carrousel</span>
              </button>
              <button
                onClick={() => setViewMode('grid')}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium transition ${
                  viewMode === 'grid'
                    ? 'bg-white text-pink-700 shadow-sm font-semibold'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
                aria-label="Mode grille"
                title="Affichage mosaïque complète"
              >
                <FaImages className="text-[10px]" />
                <span className="hidden xs:inline">Grille</span>
              </button>
            </div>

            {/* Accordion toggle button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-xl bg-pink-50 hover:bg-pink-100 text-pink-600 transition active:scale-95 border border-pink-200/60"
              aria-label={isOpen ? 'Replier le mois' : 'Déplier le mois'}
              title={isOpen ? 'Replier le mois' : 'Déplier le mois'}
            >
              {isOpen ? <FaChevronUp className="text-xs" /> : <FaChevronDown className="text-xs" />}
            </button>
          </div>

        </div>

        {/* Baby Info & Quote Strip */}
        {isOpen && (
          <div className="mt-4 pt-1 animate-in fade-in duration-200">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-5">
              
              {/* Baby Fruit Comparison */}
              <div className="bg-gradient-to-r from-amber-50 to-pink-50/50 p-3 rounded-2xl border border-amber-100 flex items-center gap-3">
                <span className="text-2xl">{FRUIT_EMOJIS[month.monthNumber] || '🌱'}</span>
                <div>
                  <div className="text-[10px] uppercase font-bold tracking-wider text-amber-700">Taille d'Eden</div>
                  <div className="text-xs font-semibold text-slate-800">{month.babyComparison}</div>
                  <div className="text-[10px] text-slate-500 font-medium">{month.babySize}</div>
                </div>
              </div>

              {/* Poetic quote */}
              <div className="md:col-span-2 bg-pink-50/50 p-3 rounded-2xl border border-pink-100/70 flex items-center gap-2.5">
                <FaQuoteLeft className="text-pink-300 text-base flex-shrink-0" />
                <p className="text-xs italic text-slate-600 leading-snug">
                  "{month.quote}"
                </p>
              </div>

            </div>

            {/* PHOTOS DISPLAY: Carousel or Grid */}
            {viewMode === 'carousel' ? (
              <div className="relative group">
                
                {/* Horizontal scroll container with scroll snap */}
                <div 
                  ref={carouselRef}
                  className="snap-carousel flex gap-4 overflow-x-auto py-2 px-1 scroll-smooth"
                  tabIndex={0}
                  aria-label={`Galerie photos du ${month.title}`}
                >
                  {month.items.map((item, index) => {
                    const isLcp = isFirst && index === 0;
                    return (
                      <div 
                        key={item.id}
                        className="carousel-item w-64 sm:w-72 flex-shrink-0 cursor-pointer group/card focus:outline-none"
                        onClick={() => onOpenLightbox(item)}
                      >
                        <div className="relative rounded-2xl overflow-hidden bg-pink-50/40 border border-pink-100/80 shadow-soft hover:shadow-soft-lg transition-all duration-300 transform hover:-translate-y-1.5">
                          
                          {/* Image Thumbnail with zero CLS aspect ratio */}
                          <div className="w-full aspect-[3/4] relative overflow-hidden bg-slate-100">
                            <img
                              src={item.thumbUrl}
                              alt={item.title}
                              fetchPriority={isLcp ? 'high' : undefined}
                              loading={isLcp ? undefined : 'lazy'}
                              decoding="async"
                              className="w-full h-full object-cover object-center group-hover/card:scale-105 transition-transform duration-500"
                            />

                            {/* Video Play Badge if video */}
                            {item.isVideo && (
                              <div className="absolute inset-0 flex items-center justify-center bg-black/25 backdrop-blur-[1px]">
                                <div className="w-12 h-12 rounded-full bg-white/90 text-pink-600 flex items-center justify-center shadow-lg group-hover/card:scale-110 transition-transform">
                                  <FaPlay className="text-sm ml-0.5" />
                                </div>
                              </div>
                            )}

                            {/* Date Badge */}
                            <div className="absolute top-2.5 left-2.5">
                              <span className="glass-pill text-[11px] font-semibold text-slate-800 px-2.5 py-1 rounded-full shadow-sm flex items-center gap-1">
                                <FaHeart className="text-[9px] text-pink-500" />
                                {item.shortDate}
                              </span>
                            </div>

                            {/* Bottom Caption Pill on hover */}
                            <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent p-3 text-white transition-opacity duration-300">
                              <p className="text-xs font-semibold truncate drop-shadow-sm">
                                {item.title}
                              </p>
                              <span className="text-[10px] text-pink-200">
                                {item.isVideo ? 'Vidéo souvenir' : 'Photo souvenir'}
                              </span>
                            </div>
                          </div>

                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Left/Right Carousel Arrows (hidden on touch devices, visible on desktop) */}
                {month.items.length > 2 && (
                  <>
                    <button
                      onClick={() => scrollCarousel('left')}
                      className="hidden sm:flex absolute left-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full glass-panel shadow-soft text-slate-700 hover:text-pink-600 items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10 hover:scale-110"
                      aria-label="Photo précédente"
                    >
                      <FaArrowLeft className="text-xs" />
                    </button>
                    <button
                      onClick={() => scrollCarousel('right')}
                      className="hidden sm:flex absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full glass-panel shadow-soft text-slate-700 hover:text-pink-600 items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10 hover:scale-110"
                      aria-label="Photo suivante"
                    >
                      <FaArrowRight className="text-xs" />
                    </button>
                  </>
                )}

                {/* Mobile scroll hint */}
                <div className="flex items-center justify-between text-[11px] text-slate-400 mt-2 px-1">
                  <span>👈 Glissez pour faire défiler</span>
                  <span className="font-semibold text-pink-500">{month.items.length} souvenirs</span>
                </div>

              </div>
            ) : (
              /* GRID VIEW MODE */
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4">
                {month.items.map((item, index) => {
                  const isLcp = isFirst && index === 0;
                  return (
                    <div
                      key={item.id}
                      onClick={() => onOpenLightbox(item)}
                      className="group/grid relative rounded-2xl overflow-hidden bg-white border border-pink-100 shadow-soft hover:shadow-soft-lg cursor-pointer transform hover:-translate-y-1 transition-all duration-300"
                    >
                      <div className="w-full aspect-[3/4] relative overflow-hidden bg-slate-100">
                        <img
                          src={item.thumbUrl}
                          alt={item.title}
                          fetchPriority={isLcp ? 'high' : undefined}
                          loading={isLcp ? undefined : 'lazy'}
                          decoding="async"
                          className="w-full h-full object-cover object-center group-hover/grid:scale-105 transition-transform duration-500"
                        />

                        {/* Video overlay */}
                        {item.isVideo && (
                          <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                            <div className="w-10 h-10 rounded-full bg-white/90 text-pink-600 flex items-center justify-center shadow">
                              <FaPlay className="text-xs ml-0.5" />
                            </div>
                          </div>
                        )}

                        <div className="absolute top-2 left-2">
                          <span className="glass-pill text-[10px] font-semibold text-slate-800 px-2 py-0.5 rounded-full shadow-sm">
                            {item.shortDate}
                          </span>
                        </div>
                      </div>

                      <div className="p-2.5 bg-white text-left">
                        <p className="text-xs font-semibold text-slate-800 truncate">
                          {item.title}
                        </p>
                        <p className="text-[10px] text-slate-400">
                          {item.isVideo ? 'Vidéo souvenir' : 'Photo'}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

          </div>
        )}

      </div>
    </article>
  );
};
