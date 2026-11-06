import React from 'react';
import { FaHeart, FaArrowUp, FaBaby } from 'react-icons/fa6';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full border-t border-pink-100 bg-gradient-to-b from-white/60 to-pink-50/60 py-10 px-4 text-center mt-12">
      <div className="max-w-2xl mx-auto flex flex-col items-center gap-4">
        
        {/* Floating baby badge */}
        <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-pink-300 via-rose-200 to-amber-100 flex items-center justify-center shadow-inner text-pink-600 text-lg">
          <FaBaby />
        </div>

        <div>
          <h3 className="font-serif font-bold text-lg text-slate-800">
            Emma & Anthony
          </h3>
          <p className="text-xs text-pink-600 font-medium mt-0.5">
            9 mois inoubliables pour la plus belle des rencontres avec Edenn ✨
          </p>
        </div>

        <p className="text-[11px] text-slate-400 max-w-sm">
          Photos et vidéos de Décembre 2025 à Juin 2026. Album de grossesse conçu avec amour.
        </p>

        {/* Scroll to top button */}
        <button
          onClick={scrollToTop}
          className="mt-2 inline-flex items-center gap-1.5 px-4 py-2 rounded-full glass-pill text-xs font-semibold text-slate-600 hover:text-pink-600 shadow-sm transition active:scale-95"
          aria-label="Retourner en haut de la page"
        >
          <FaArrowUp className="text-[10px]" />
          <span>Haut de page</span>
        </button>

        <div className="text-[10px] text-slate-400 flex items-center gap-1 mt-2">
          <span>Fait avec tendresse</span>
          <FaHeart className="text-pink-400 text-[10px]" />
          <span>pour Edenn</span>
        </div>

      </div>
    </footer>
  );
};
