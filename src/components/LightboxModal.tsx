import React, { useEffect, useState, useRef } from 'react';
import { 
  FaXmark, 
  FaChevronLeft, 
  FaChevronRight, 
  FaDownload, 
  FaHeart, 
  FaCalendarDays,
  FaVideo
} from 'react-icons/fa6';
import { MediaItem, ALL_MEDIA_ITEMS } from '../data/pregnancyData';

interface LightboxModalProps {
  activeItem: MediaItem | null;
  onClose: () => void;
}

export const LightboxModal: React.FC<LightboxModalProps> = ({ 
  activeItem, 
  onClose 
}) => {
  const [currentItem, setCurrentItem] = useState<MediaItem | null>(activeItem);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  useEffect(() => {
    setCurrentItem(activeItem);
  }, [activeItem]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (currentItem) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [currentItem]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!currentItem) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') navigate('prev');
      if (e.key === 'ArrowRight') navigate('next');
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentItem]);

  if (!currentItem) return null;

  const currentIndex = ALL_MEDIA_ITEMS.findIndex(item => item.id === currentItem.id);
  const totalCount = ALL_MEDIA_ITEMS.length;

  const navigate = (direction: 'prev' | 'next') => {
    if (currentIndex === -1) return;
    let nextIndex = direction === 'next' ? currentIndex + 1 : currentIndex - 1;
    if (nextIndex < 0) nextIndex = totalCount - 1;
    if (nextIndex >= totalCount) nextIndex = 0;
    setCurrentItem(ALL_MEDIA_ITEMS[nextIndex]);
  };

  // Touch Swipe Handlers for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const diffX = touchStartX.current - touchEndX.current;
    const threshold = 50; // min swipe distance in px
    if (diffX > threshold) {
      navigate('next');
    } else if (diffX < -threshold) {
      navigate('prev');
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-xl animate-in fade-in duration-200 select-none"
      onClick={onClose}
    >
      {/* Top Action Bar */}
      <div 
        className="absolute top-0 inset-x-0 h-16 px-4 flex items-center justify-between z-20 bg-gradient-to-b from-black/70 to-transparent"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Counter Badge */}
        <div className="flex items-center gap-2">
          <span className="glass-pill px-3 py-1 rounded-full text-xs font-semibold text-white/90">
            {currentIndex + 1} / {totalCount}
          </span>
          <span className="hidden sm:inline text-xs text-white/70">
            Mois {currentItem.monthNumber}
          </span>
        </div>

        {/* Right Tools: Download + Close */}
        <div className="flex items-center gap-2">
          <a
            href={currentItem.fullUrl}
            download={currentItem.filename}
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/25 text-white flex items-center justify-center transition active:scale-95"
            title="Télécharger ce souvenir"
            aria-label="Télécharger le fichier"
          >
            <FaDownload className="text-sm" />
          </a>

          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/25 text-white flex items-center justify-center transition active:scale-95"
            aria-label="Fermer la vue agrandie"
          >
            <FaXmark className="text-lg" />
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div 
        className="relative w-full h-full flex items-center justify-center p-2 sm:p-6"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onClick={(e) => e.stopPropagation()}
      >
        {currentItem.isVideo ? (
          <div className="relative max-w-4xl max-h-[78vh] flex items-center justify-center rounded-2xl overflow-hidden bg-black shadow-2xl">
            <video
              src={currentItem.fullUrl}
              poster={currentItem.thumbUrl}
              controls
              autoPlay
              playsInline
              className="max-h-[78vh] w-auto max-w-full rounded-2xl"
            />
          </div>
        ) : (
          <img
            src={currentItem.fullUrl}
            alt={currentItem.title}
            className="max-h-[78vh] max-w-full w-auto object-contain rounded-2xl shadow-2xl transition-all duration-200"
          />
        )}

        {/* Left Navigation Button */}
        <button
          onClick={() => navigate('prev')}
          className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/15 hover:bg-white/30 text-white flex items-center justify-center backdrop-blur-md transition active:scale-90"
          aria-label="Photo précédente"
        >
          <FaChevronLeft className="text-base" />
        </button>

        {/* Right Navigation Button */}
        <button
          onClick={() => navigate('next')}
          className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/15 hover:bg-white/30 text-white flex items-center justify-center backdrop-blur-md transition active:scale-90"
          aria-label="Photo suivante"
        >
          <FaChevronRight className="text-base" />
        </button>
      </div>

      {/* Bottom Info Floating Card */}
      <div 
        className="absolute bottom-4 inset-x-4 max-w-md mx-auto z-20 pointer-events-none"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="glass-panel rounded-2xl p-3 shadow-lg pointer-events-auto text-center border border-white/20">
          <div className="flex items-center justify-center gap-2 text-xs font-semibold text-slate-800">
            {currentItem.isVideo ? (
              <span className="flex items-center gap-1 text-pink-600 font-bold">
                <FaVideo className="text-[10px]" /> Vidéo
              </span>
            ) : (
              <span className="flex items-center gap-1 text-pink-600">
                <FaHeart className="text-[10px]" /> Photo
              </span>
            )}
            <span>•</span>
            <span className="flex items-center gap-1">
              <FaCalendarDays className="text-[10px] text-slate-400" />
              {currentItem.displayDate}
            </span>
          </div>
          <p className="text-[11px] text-slate-500 mt-0.5 truncate">
            {currentItem.title}
          </p>
        </div>
      </div>

    </div>
  );
};
