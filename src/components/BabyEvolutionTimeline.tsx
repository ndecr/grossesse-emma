import React, { useState } from 'react';
import { FaHeart, FaSeedling, FaExpand } from 'react-icons/fa6';
import { PREGNANCY_MONTHS, MediaItem } from '../data/pregnancyData';

interface BabyEvolutionTimelineProps {
  onOpenLightbox: (item: MediaItem) => void;
}

const FRUIT_INFO: Record<number, { emoji: string; name: string; full: string }> = {
  2: { emoji: '🍓', name: 'Framboise', full: 'Comme une framboise (~1.5 cm)' },
  3: { emoji: '🫐', name: 'Prune', full: 'Comme une prune (~6 à 7 cm)' },
  4: { emoji: '🥑', name: 'Avocat', full: 'Comme un avocat (~13 cm)' },
  5: { emoji: '🥭', name: 'Mangue', full: 'Comme une mangue (~25 cm)' },
  6: { emoji: '🌽', name: 'Maïs', full: 'Comme un épi de maïs (~30 cm)' },
  7: { emoji: '🥥', name: 'Coco', full: 'Comme une noix de coco (~38 cm)' },
  8: { emoji: '🍍', name: 'Ananas', full: 'Comme un bel ananas (~44 cm)' },
  9: { emoji: '🍉', name: 'Pastèque', full: 'Comme une pastèque d\'amour (~50 cm)' },
};

export const BabyEvolutionTimeline: React.FC<BabyEvolutionTimelineProps> = ({ onOpenLightbox }) => {
  const [selectedMonthIndex, setSelectedMonthIndex] = useState(0);

  // Pick representative photo for each month
  const milestoneList = PREGNANCY_MONTHS.map(month => {
    const photo = month.items.find(it => !it.isVideo) || month.items[0];
    return {
      month,
      photo,
      fruit: FRUIT_INFO[month.monthNumber] || { emoji: '🌱', name: 'Pousse', full: month.babyComparison }
    };
  });

  const activeMilestone = milestoneList[selectedMonthIndex];

  return (
    <section className="max-w-5xl mx-auto px-4 mb-16 overflow-hidden" data-aos="fade-up">
      <div className="glass-panel rounded-3xl p-5 sm:p-8 shadow-soft border border-pink-100/90 relative overflow-hidden">
        
        {/* Soft background aura (contained) */}
        <div 
          aria-hidden="true" 
          className="absolute bottom-0 right-0 w-48 h-48 bg-pink-100/40 rounded-full blur-2xl pointer-events-none -z-10"
        />

        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-6">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full glass-pill text-[11px] font-semibold text-pink-700 shadow-sm mb-2">
            <FaSeedling className="text-emerald-500" />
            <span>Évolution au fil des mois</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-800 tracking-tight">
            Le Ventre d'Emma s'Arrondit & Edenn Grandit
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 font-light mt-1">
            Sélectionnez un mois pour voir l'évolution et la taille d'Edenn.
          </p>
        </div>

        {/* Month Selector Pills - Fluid natural swipe without aggressive snap bouncing */}
        <div className="w-full overflow-x-auto pb-3 pt-1 scrollbar-none overscroll-x-contain touch-pan-x -mx-1 px-1">
          <div className="flex items-center gap-2 px-3 w-max sm:mx-auto">
            {milestoneList.map((m, idx) => {
              const isSelected = idx === selectedMonthIndex;
              return (
                <button
                  key={m.month.id}
                  onClick={() => setSelectedMonthIndex(idx)}
                  className={`flex-shrink-0 px-4 py-2.5 rounded-2xl text-xs font-semibold transition-all duration-200 flex flex-col items-center gap-1 active:scale-95 ${
                    isSelected
                      ? 'bg-gradient-to-r from-pink-500 to-rose-400 text-white shadow-soft scale-105'
                      : 'bg-white hover:bg-pink-50 text-slate-700 border border-pink-200/70 shadow-sm'
                  }`}
                >
                  <span className="font-bold text-xs tracking-tight">Mois {m.month.monthNumber}</span>
                  <span className={`text-[11px] font-medium flex items-center gap-1 ${isSelected ? 'text-pink-100' : 'text-slate-500'}`}>
                    <span>{m.fruit.emoji}</span>
                    <span>{m.fruit.name}</span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Highlight Showcase Box */}
        {activeMilestone && (
          <div className="mt-4 grid grid-cols-1 md:grid-cols-12 gap-6 items-center bg-white/85 rounded-2xl p-4 sm:p-6 border border-pink-100 shadow-sm animate-in fade-in duration-300">
            
            {/* Photo Card */}
            <div className="md:col-span-5 flex justify-center">
              <div 
                className="relative group cursor-pointer max-w-xs w-full rounded-2xl overflow-hidden shadow-soft-lg bg-pink-50 border-4 border-white"
                onClick={() => onOpenLightbox(activeMilestone.photo)}
              >
                <div className="aspect-[3/4] overflow-hidden">
                  <img
                    src={activeMilestone.photo.fullUrl}
                    alt={activeMilestone.photo.title}
                    loading="lazy"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                
                {/* Enlarge Hint Button */}
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="glass-pill px-3 py-1.5 rounded-full text-white text-xs font-semibold flex items-center gap-1.5 shadow">
                    <FaExpand className="text-[10px]" />
                    <span>Agrandir</span>
                  </div>
                </div>

                {/* Date Tag */}
                <div className="absolute top-2 left-2">
                  <span className="glass-pill text-[10px] font-semibold text-slate-800 px-2.5 py-0.5 rounded-full shadow-sm">
                    {activeMilestone.photo.shortDate}
                  </span>
                </div>
              </div>
            </div>

            {/* Info and Details */}
            <div className="md:col-span-7 flex flex-col justify-center space-y-4 text-left">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-pink-100 text-pink-700 text-xs font-bold">
                  {activeMilestone.month.badge}
                </span>
                <span className="text-xs text-slate-500 font-medium">
                  {activeMilestone.month.dateRange}
                </span>
              </div>

              <h3 className="font-serif text-2xl font-bold text-slate-800">
                {activeMilestone.month.title} : {activeMilestone.month.tagline}
              </h3>

              {/* Baby Fruit & Size info */}
              <div className="bg-pink-50/70 p-4 rounded-2xl border border-pink-100 flex items-center gap-4">
                <div className="text-3xl">{activeMilestone.fruit.emoji}</div>
                <div>
                  <div className="text-xs font-bold text-slate-700">Taille d'Edenn dans le ventre :</div>
                  <div className="text-sm font-semibold text-pink-600">
                    {activeMilestone.fruit.full}
                  </div>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 italic leading-relaxed">
                "{activeMilestone.month.quote}"
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-3">
                <button
                  onClick={() => onOpenLightbox(activeMilestone.photo)}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-pink-500 to-rose-400 text-white text-xs font-semibold shadow hover:shadow-glow transition active:scale-95 flex items-center gap-1.5"
                >
                  <FaHeart className="text-[10px]" />
                  <span>Voir cette photo en grand</span>
                </button>

                <a
                  href={`#${activeMilestone.month.id}`}
                  className="px-4 py-2 rounded-xl bg-pink-50 hover:bg-pink-100 text-pink-700 text-xs font-semibold border border-pink-200 transition"
                >
                  Voir les {activeMilestone.month.items.length} souvenirs du mois →
                </a>
              </div>
            </div>

          </div>
        )}

      </div>
    </section>
  );
};
