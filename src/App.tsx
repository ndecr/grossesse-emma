import { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { MonthSection } from './components/MonthSection';
import { BabyEvolutionTimeline } from './components/BabyEvolutionTimeline';
import { LoveNotes } from './components/LoveNotes';
import { Footer } from './components/Footer';
import { LightboxModal } from './components/LightboxModal';
import { PREGNANCY_MONTHS, MediaItem } from './data/pregnancyData';
import { FaHeart } from 'react-icons/fa6';

export function App() {
  const [activeMonthId, setActiveMonthId] = useState<string>(PREGNANCY_MONTHS[0].id);
  const [lightboxItem, setLightboxItem] = useState<MediaItem | null>(null);

  // Track active section in viewport
  useEffect(() => {
    const handleScroll = () => {
      for (const m of PREGNANCY_MONTHS) {
        const el = document.getElementById(m.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200 && rect.bottom >= 150) {
            setActiveMonthId(m.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen flex flex-col relative selection:bg-pink-200">
      {/* Header */}
      <Header 
        activeMonthId={activeMonthId} 
        onSelectMonth={setActiveMonthId} 
      />

      {/* Main Content Area */}
      <main className="flex-grow">
        {/* Hero Section */}
        <Hero 
          activeMonthId={activeMonthId} 
          onSelectMonth={setActiveMonthId} 
        />

        {/* Baby Bump Evolution Highlights */}
        <BabyEvolutionTimeline 
          onOpenLightbox={(item) => setLightboxItem(item)} 
        />

        {/* Section Divider */}
        <div className="max-w-md mx-auto my-8 flex items-center justify-center gap-3 text-pink-300">
          <div className="h-px bg-pink-200 flex-grow" />
          <FaHeart className="text-pink-400 text-xs animate-pulse" />
          <span className="text-[11px] font-semibold tracking-widest uppercase text-slate-400">
            L'Album Complet par Mois
          </span>
          <FaHeart className="text-pink-400 text-xs animate-pulse" />
          <div className="h-px bg-pink-200 flex-grow" />
        </div>

        {/* Monthly Sections (2ème Mois -> 9ème Mois) */}
        <div className="space-y-6">
          {PREGNANCY_MONTHS.map((month, index) => (
            <MonthSection
              key={month.id}
              month={month}
              isFirst={index === 0}
              onOpenLightbox={(item) => setLightboxItem(item)}
            />
          ))}
        </div>

        {/* Love Notes & Guestbook */}
        <LoveNotes />
      </main>

      {/* Footer */}
      <Footer />

      {/* Fullscreen Lightbox Modal */}
      <LightboxModal
        activeItem={lightboxItem}
        onClose={() => setLightboxItem(null)}
      />

    </div>
  );
}

export default App;
