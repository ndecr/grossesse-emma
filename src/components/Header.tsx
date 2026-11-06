import React, { useState } from 'react';
import { FaBaby, FaHeart, FaCalendarDays, FaWandMagicSparkles } from 'react-icons/fa6';
import { PREGNANCY_MONTHS } from '../data/pregnancyData';
import confetti from 'canvas-confetti';

interface HeaderProps {
  activeMonthId: string;
  onSelectMonth: (monthId: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ activeMonthId, onSelectMonth }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const triggerConfetti = () => {
    confetti({
      particleCount: 70,
      spread: 60,
      origin: { y: 0.15 },
      colors: ['#f472b6', '#fbcfe8', '#fed7aa', '#bae6fd', '#ddd6fe', '#fef08a'],
    });
  };

  return (
    <header className="sticky top-0 z-40 w-full glass-panel border-b border-pink-100 shadow-sm transition-all duration-300">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        
        {/* Brand */}
        <a 
          href="#top" 
          className="flex items-center gap-2 group cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-400 rounded-full py-1 px-2"
        >
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-pink-300 via-rose-200 to-amber-100 flex items-center justify-center shadow-inner group-hover:scale-105 transition-transform duration-300">
            <FaBaby className="text-pink-600 text-lg" />
          </div>
          <div>
            <span className="font-serif font-bold text-lg md:text-xl text-slate-800 tracking-tight flex items-center gap-1.5">
              Emma & Anthony <FaHeart className="text-pink-500 text-xs animate-pulse" />
            </span>
            <span className="block text-[10px] tracking-wider uppercase text-pink-500 font-semibold -mt-1">
              En attendant Edenn ✨
            </span>
          </div>
        </a>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          
          {/* Quick Month Dropdown */}
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-pink-50 hover:bg-pink-100 text-pink-700 border border-pink-200/80 transition shadow-sm active:scale-95"
              aria-label="Accéder directement à un mois"
            >
              <FaCalendarDays className="text-pink-500" />
              <span className="hidden sm:inline">Mois</span>
              <span>▾</span>
            </button>

            {dropdownOpen && (
              <>
                <div 
                  className="fixed inset-0 z-40" 
                  onClick={() => setDropdownOpen(false)} 
                />
                <div className="absolute right-0 mt-2 w-56 rounded-2xl glass-panel shadow-soft-lg p-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                  <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider px-3 py-1">
                    Accès direct aux mois
                  </div>
                  <div className="max-h-72 overflow-y-auto space-y-1">
                    {PREGNANCY_MONTHS.map((m) => (
                      <button
                        key={m.id}
                        onClick={() => {
                          onSelectMonth(m.id);
                          setDropdownOpen(false);
                          const el = document.getElementById(m.id);
                          if (el) {
                            el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                          }
                        }}
                        className={`w-full text-left px-3 py-2 rounded-xl text-xs flex items-center justify-between transition ${
                          activeMonthId === m.id
                            ? 'bg-gradient-to-r from-pink-400 to-rose-400 text-white font-semibold shadow-sm'
                            : 'hover:bg-pink-50/80 text-slate-700'
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          <span className="w-5 h-5 rounded-full bg-white/30 flex items-center justify-center text-[10px]">
                            {m.monthNumber}
                          </span>
                          <span>{m.title}</span>
                        </span>
                        <span className="text-[10px] opacity-80">{m.items.length} 📸</span>
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Confetti Celebration Button */}
          <button
            onClick={triggerConfetti}
            title="Lancer des confettis d'amour !"
            className="w-9 h-9 rounded-full bg-gradient-to-tr from-pink-400 to-rose-300 text-white flex items-center justify-center shadow-soft hover:shadow-glow hover:scale-105 active:scale-95 transition duration-200"
            aria-label="Célébrer avec des confettis"
          >
            <FaWandMagicSparkles className="text-sm" />
          </button>

        </div>
      </div>
    </header>
  );
};
