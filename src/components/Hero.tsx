import React from 'react';
import { FaHeart, FaCamera, FaVideo, FaClock, FaArrowDown, FaBaby } from 'react-icons/fa6';
import { PREGNANCY_MONTHS, TOTAL_PHOTOS, TOTAL_VIDEOS, TOTAL_MONTHS } from '../data/pregnancyData';

interface HeroProps {
  activeMonthId: string;
  onSelectMonth: (monthId: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ activeMonthId, onSelectMonth }) => {
  const scrollToFirstMonth = () => {
    const el = document.getElementById(PREGNANCY_MONTHS[0].id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section id="top" className="relative pt-8 pb-12 px-4 overflow-hidden">
      {/* Decorative Pastel Background Glows */}
      <div 
        aria-hidden="true" 
        className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-gradient-to-br from-pink-200/50 via-rose-100/40 to-blue-100/30 rounded-full blur-3xl pointer-events-none -z-10"
      />
      <div 
        aria-hidden="true" 
        className="absolute top-48 -right-20 w-80 h-80 bg-gradient-to-br from-amber-100/50 to-pink-100/30 rounded-full blur-2xl pointer-events-none -z-10"
      />

      <div className="max-w-4xl mx-auto text-center">
        
        {/* Soft Badge */}
        <div 
          data-aos="fade-down"
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-pill text-xs font-semibold text-pink-700 shadow-soft mb-6"
        >
          <span className="w-2 h-2 rounded-full bg-pink-500 animate-ping" />
          <span>✨ Emma & Anthony • Le Journal Précieux</span>
        </div>

        {/* Main Title */}
        <h1 
          data-aos="fade-up" 
          data-aos-delay="100"
          className="font-serif text-3xl sm:text-5xl md:text-6xl font-bold text-slate-800 tracking-tight leading-[1.15] mb-4"
        >
          En attendant l'arrivée de notre petit trésor, Edenn
        </h1>

        {/* Subtitle */}
        <p 
          data-aos="fade-up" 
          data-aos-delay="200"
          className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto font-light leading-relaxed mb-8"
        >
          9 mois d'amour, de complicité et d'émotions partagées. De la toute première annonce du 2ème mois 
          jusqu'aux derniers jours du 9ème mois, découvrez l'aventure d'Emma et Anthony en attendant Edenn.
        </p>

        {/* Highlight Stats Badges */}
        <div 
          data-aos="fade-up" 
          data-aos-delay="300"
          className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-2xl mx-auto mb-10"
        >
          <div className="glass-panel p-3.5 rounded-2xl shadow-soft text-center transition transform hover:-translate-y-1">
            <div className="w-8 h-8 mx-auto mb-1 rounded-full bg-pink-100 text-pink-500 flex items-center justify-center text-sm">
              <FaClock />
            </div>
            <div className="font-serif font-bold text-lg text-slate-800">{TOTAL_MONTHS} Mois</div>
            <div className="text-[11px] text-slate-500 font-medium">D'aventure</div>
          </div>

          <div className="glass-panel p-3.5 rounded-2xl shadow-soft text-center transition transform hover:-translate-y-1">
            <div className="w-8 h-8 mx-auto mb-1 rounded-full bg-rose-100 text-rose-500 flex items-center justify-center text-sm">
              <FaCamera />
            </div>
            <div className="font-serif font-bold text-lg text-slate-800">{TOTAL_PHOTOS} Photos</div>
            <div className="text-[11px] text-slate-500 font-medium">De souvenirs</div>
          </div>

          <div className="glass-panel p-3.5 rounded-2xl shadow-soft text-center transition transform hover:-translate-y-1">
            <div className="w-8 h-8 mx-auto mb-1 rounded-full bg-blue-100 text-blue-500 flex items-center justify-center text-sm">
              <FaVideo />
            </div>
            <div className="font-serif font-bold text-lg text-slate-800">{TOTAL_VIDEOS} Vidéos</div>
            <div className="text-[11px] text-slate-500 font-medium">Moments magiques</div>
          </div>

          <div className="glass-panel p-3.5 rounded-2xl shadow-soft text-center transition transform hover:-translate-y-1">
            <div className="w-8 h-8 mx-auto mb-1 rounded-full bg-amber-100 text-amber-500 flex items-center justify-center text-sm">
              <FaBaby />
            </div>
            <div className="font-serif font-bold text-lg text-slate-800">Bébé Edenn</div>
            <div className="text-[11px] text-slate-500 font-medium">Tant attendu</div>
          </div>
        </div>

        {/* Mobile-Friendly Month Horizontal Scroller */}
        <div 
          data-aos="fade-up" 
          data-aos-delay="400"
          className="mb-8"
        >
          <div className="text-xs uppercase tracking-wider text-slate-400 font-semibold mb-3">
            Navigation par mois de grossesse
          </div>
          <div className="w-full overflow-x-auto pb-3 pt-1 scrollbar-none snap-carousel">
            <div className="flex items-center gap-2 min-w-max mx-auto px-4 justify-start sm:justify-center">
              {PREGNANCY_MONTHS.map((month) => {
                const isActive = activeMonthId === month.id;
                return (
                  <button
                    key={month.id}
                    onClick={() => {
                      onSelectMonth(month.id);
                      const el = document.getElementById(month.id);
                      if (el) {
                        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                      }
                    }}
                    className={`flex-shrink-0 px-4 py-2 rounded-2xl text-xs font-medium transition-all duration-300 flex items-center gap-1.5 shadow-sm active:scale-95 ${
                      isActive
                        ? 'bg-gradient-to-r from-pink-500 to-rose-400 text-white shadow-soft scale-105 font-bold'
                        : 'bg-white/90 hover:bg-pink-50 text-slate-700 border border-pink-100'
                    }`}
                  >
                    <FaHeart className={`text-[10px] ${isActive ? 'text-white' : 'text-pink-400'}`} />
                    <span>Mois {month.monthNumber}</span>
                    <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${isActive ? 'bg-white/20 text-white' : 'bg-pink-100 text-pink-600'}`}>
                      {month.items.length}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* CTA to scroll down */}
        <button
          onClick={scrollToFirstMonth}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-pink-500 via-rose-400 to-pink-400 text-white text-sm font-semibold shadow-soft hover:shadow-glow hover:scale-105 active:scale-95 transition-all duration-300 group"
        >
          <span>Découvrir l'album</span>
          <FaArrowDown className="text-xs group-hover:translate-y-0.5 transition-transform" />
        </button>

      </div>
    </section>
  );
};
