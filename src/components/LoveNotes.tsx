import React, { useState, useEffect } from 'react';
import { FaHeart, FaPenNib, FaPaperPlane, FaQuoteLeft } from 'react-icons/fa6';
import confetti from 'canvas-confetti';

interface Note {
  id: string;
  author: string;
  relation: string;
  content: string;
  date: string;
  likes: number;
}

const DEFAULT_NOTES: Note[] = [
  {
    id: '1',
    author: 'Anthony (Papa)',
    relation: 'Le Papa fier',
    content: "À notre petit Edenn : voir ta maman te porter avec tant de grâce et sentir tes petits coups de pied chaque soir est le plus grand bonheur de ma vie. Je t'aime déjà infiniment.",
    date: 'Juin 2026',
    likes: 12
  },
  {
    id: '2',
    author: 'Emma (Maman)',
    relation: 'La Maman comblée',
    content: "Mon petit trésor Edenn, 9 mois à grandir au creux de mon ventre, 9 mois à t'imaginer et à t'aimer. Avec ton papa, nous avons tellement hâte de croiser ton premier regard.",
    date: 'Juin 2026',
    likes: 15
  },
  {
    id: '3',
    author: 'Toute la Famille',
    relation: 'Papis, Mamies & Proches',
    content: "Petit Edenn, tu es attendu avec tant d'impatience, de joie et de tendresse par toute la famille ! Félicitations à Emma et Anthony pour cette magnifique aventure.",
    date: 'Juin 2026',
    likes: 8
  }
];

export const LoveNotes: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>(() => {
    try {
      const saved = localStorage.getItem('edenn_love_notes');
      return saved ? JSON.parse(saved) : DEFAULT_NOTES;
    } catch {
      return DEFAULT_NOTES;
    }
  });

  const [author, setAuthor] = useState('');
  const [relation, setRelation] = useState('');
  const [content, setContent] = useState('');
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem('edenn_love_notes', JSON.stringify(notes));
    } catch {
      // localStorage may fail in private mode
    }
  }, [notes]);

  const handleLike = (id: string) => {
    setNotes(prev => prev.map(n => n.id === id ? { ...n, likes: n.likes + 1 } : n));
    confetti({
      particleCount: 25,
      spread: 40,
      origin: { y: 0.8 },
      colors: ['#f472b6', '#fda4af', '#fecdd3']
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!author.trim() || !content.trim()) return;

    const newNote: Note = {
      id: Date.now().toString(),
      author: author.trim(),
      relation: relation.trim() || 'Ami(e) de la famille',
      content: content.trim(),
      date: 'Aujourd\'hui',
      likes: 1
    };

    setNotes([newNote, ...notes]);
    setAuthor('');
    setRelation('');
    setContent('');
    setShowForm(false);

    confetti({
      particleCount: 50,
      spread: 60,
      colors: ['#f472b6', '#fbcfe8', '#fed7aa']
    });
  };

  return (
    <section className="max-w-4xl mx-auto px-4 mb-16" data-aos="fade-up">
      <div className="glass-panel rounded-3xl p-6 sm:p-8 shadow-soft border border-pink-100">
        
        {/* Header */}
        <div className="text-center max-w-lg mx-auto mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full glass-pill text-[11px] font-semibold text-pink-700 shadow-sm mb-2">
            <FaHeart className="text-pink-500 animate-pulse" />
            <span>Mots doux pour Edenn</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-800 tracking-tight">
            Le Livre d'Amour d'Emma, Anthony & Edenn
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 font-light mt-1">
            Les doux messages et souvenirs partagés pour célébrer cette fabuleuse aventure.
          </p>

          <button
            onClick={() => setShowForm(!showForm)}
            className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-pink-100 hover:bg-pink-200 text-pink-700 text-xs font-semibold transition active:scale-95"
          >
            <FaPenNib className="text-[10px]" />
            <span>{showForm ? 'Fermer le formulaire' : 'Ajouter un mot doux'}</span>
          </button>
        </div>

        {/* Message Input Form */}
        {showForm && (
          <form 
            onSubmit={handleSubmit}
            className="mb-8 p-5 bg-white/90 rounded-2xl border border-pink-200 shadow-sm animate-in fade-in zoom-in-95 duration-200"
          >
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
              Écrire un mot pour Edenn et ses parents
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-1">Votre Prénom</label>
                <input
                  type="text"
                  required
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  placeholder="Ex : Julie"
                  className="w-full px-3 py-2 rounded-xl text-xs bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-pink-300"
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-1">Lien / Relation</label>
                <input
                  type="text"
                  value={relation}
                  onChange={(e) => setRelation(e.target.value)}
                  placeholder="Ex : Marraine, Tata, Ami..."
                  className="w-full px-3 py-2 rounded-xl text-xs bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-pink-300"
                />
              </div>
            </div>

            <div className="mb-3">
              <label className="block text-[11px] font-semibold text-slate-600 mb-1">Votre Message</label>
              <textarea
                required
                rows={3}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Un mot d'encouragement, un doux vœu pour le bébé..."
                className="w-full px-3 py-2 rounded-xl text-xs bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-pink-300"
              />
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-gradient-to-r from-pink-500 to-rose-400 text-white text-xs font-semibold shadow hover:shadow-glow transition active:scale-95 flex items-center gap-1.5"
              >
                <FaPaperPlane className="text-[10px]" />
                <span>Publier le message</span>
              </button>
            </div>
          </form>
        )}

        {/* Notes Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {notes.map((note) => (
            <div 
              key={note.id}
              className="bg-white/80 p-4 rounded-2xl border border-pink-100 shadow-sm flex flex-col justify-between hover:shadow-soft transition transform hover:-translate-y-1"
            >
              <div>
                <FaQuoteLeft className="text-pink-300 text-sm mb-2" />
                <p className="text-xs text-slate-700 italic leading-relaxed mb-3">
                  "{note.content}"
                </p>
              </div>

              <div className="pt-2 border-t border-pink-50 flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-slate-800">{note.author}</div>
                  <div className="text-[10px] text-pink-600 font-medium">{note.relation} • {note.date}</div>
                </div>

                <button
                  onClick={() => handleLike(note.id)}
                  className="flex items-center gap-1 text-[11px] font-semibold text-pink-500 hover:text-pink-600 px-2 py-1 rounded-full bg-pink-50 hover:bg-pink-100 transition active:scale-90"
                  aria-label="Aimer ce mot"
                >
                  <FaHeart className="text-[10px]" />
                  <span>{note.likes}</span>
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
