import React, { useState, useEffect } from 'react';
import { FaHeart, FaPenNib, FaPaperPlane, FaQuoteLeft, FaRotateRight, FaRegFaceSmile } from 'react-icons/fa6';
import confetti from 'canvas-confetti';

interface Note {
  id: number;
  author: string;
  relation: string | null;
  content: string;
  likes: number;
  created_at: string;
  updated_at: string;
}

const API_BASE_URL = 'https://api.liryna.app:24443/api';

export const LoveNotes: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [author, setAuthor] = useState('');
  const [relation, setRelation] = useState('');
  const [content, setContent] = useState('');
  const [showForm, setShowForm] = useState(false);

  const fetchNotes = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_BASE_URL}/grossesse/notes`);
      if (!res.ok) throw new Error('Impossible de charger les messages');
      const data = await res.json();
      if (data.success && Array.isArray(data.data)) {
        setNotes(data.data);
      }
    } catch (err: any) {
      console.error('Erreur chargement livre d\'or:', err);
      setError('Impossible de joindre le livre d\'or pour le moment.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const handleLike = async (id: number) => {
    // Optimistic update
    setNotes(prev => prev.map(n => n.id === id ? { ...n, likes: n.likes + 1 } : n));
    confetti({
      particleCount: 25,
      spread: 40,
      origin: { y: 0.8 },
      colors: ['#f472b6', '#fda4af', '#fecdd3']
    });

    try {
      await fetch(`${API_BASE_URL}/grossesse/notes/${id}/like`, {
        method: 'POST',
      });
    } catch (err) {
      console.warn('Erreur like API:', err);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!author.trim() || !content.trim() || isSubmitting) return;

    setIsSubmitting(true);
    setError(null);

    try {
      const res = await fetch(`${API_BASE_URL}/grossesse/notes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          author: author.trim(),
          relation: relation.trim() || null,
          content: content.trim()
        })
      });

      const result = await res.json();
      if (!res.ok || !result.success) {
        throw new Error(result.message || 'Erreur lors de l\'envoi');
      }

      // Add to beginning of list
      if (result.data) {
        setNotes([result.data, ...notes]);
      } else {
        await fetchNotes();
      }

      setAuthor('');
      setRelation('');
      setContent('');
      setShowForm(false);

      confetti({
        particleCount: 60,
        spread: 60,
        colors: ['#f472b6', '#fbcfe8', '#fed7aa', '#bae6fd']
      });
    } catch (err: any) {
      console.error('Erreur enregistrement message:', err);
      setError(err.message || 'Erreur lors de l\'enregistrement du message.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatDate = (dateStr: string) => {
    try {
      const d = new Date(dateStr);
      return d.toLocaleDateString('fr-FR', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      });
    } catch {
      return '';
    }
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
            Laissez un message, une attention ou un souvenir pour célébrer la venue d'Edenn.
          </p>

          <div className="mt-4 flex items-center justify-center gap-2">
            <button
              onClick={() => setShowForm(!showForm)}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-pink-500 to-rose-400 text-white text-xs font-semibold shadow hover:shadow-glow transition active:scale-95"
            >
              <FaPenNib className="text-[10px]" />
              <span>{showForm ? 'Fermer le formulaire' : 'Écrire un mot doux'}</span>
            </button>

            <button
              onClick={fetchNotes}
              className="p-2.5 rounded-full bg-pink-50 hover:bg-pink-100 text-pink-600 transition active:scale-95 border border-pink-100"
              title="Rafraîchir les messages"
              aria-label="Rafraîchir les messages"
            >
              <FaRotateRight className={`text-xs ${isLoading ? 'animate-spin' : ''}`} />
            </button>
          </div>
        </div>

        {/* Message Input Form */}
        {showForm && (
          <form 
            onSubmit={handleSubmit}
            className="mb-8 p-5 bg-white/95 rounded-2xl border border-pink-200 shadow-sm animate-in fade-in zoom-in-95 duration-200"
          >
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-600 mb-3 flex items-center gap-1.5">
              <span>Nouveau message pour Edenn et ses parents</span>
              <FaHeart className="text-pink-400 text-[10px]" />
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-1">Votre Prénom *</label>
                <input
                  type="text"
                  required
                  maxLength={100}
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  placeholder="Ex : Julie, Papi Jean, Anthony..."
                  className="w-full px-3 py-2 rounded-xl text-xs bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-pink-300 transition"
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-1">Lien / Relation (facultatif)</label>
                <input
                  type="text"
                  maxLength={100}
                  value={relation}
                  onChange={(e) => setRelation(e.target.value)}
                  placeholder="Ex : Marraine, Tata, Tonton, Ami..."
                  className="w-full px-3 py-2 rounded-xl text-xs bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-pink-300 transition"
                />
              </div>
            </div>

            <div className="mb-3">
              <label className="block text-[11px] font-semibold text-slate-600 mb-1">Votre Message *</label>
              <textarea
                required
                rows={3}
                maxLength={2000}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Un mot d'encouragement, un doux vœu pour le bébé..."
                className="w-full px-3 py-2 rounded-xl text-xs bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-pink-300 transition"
              />
            </div>

            {error && (
              <p className="text-xs text-rose-500 mb-3 font-medium">
                {error}
              </p>
            )}

            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs font-semibold transition"
              >
                Annuler
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-5 py-2 rounded-xl bg-gradient-to-r from-pink-500 to-rose-400 text-white text-xs font-semibold shadow hover:shadow-glow transition active:scale-95 flex items-center gap-1.5 disabled:opacity-50"
              >
                <FaPaperPlane className="text-[10px]" />
                <span>{isSubmitting ? 'Publication...' : 'Publier le mot doux'}</span>
              </button>
            </div>
          </form>
        )}

        {/* Loading state */}
        {isLoading && notes.length === 0 && (
          <div className="py-12 text-center text-slate-400 text-xs">
            <div className="w-8 h-8 mx-auto mb-2 border-2 border-pink-400 border-t-transparent rounded-full animate-spin" />
            <p>Connexion au livre d'amour...</p>
          </div>
        )}

        {/* Empty state */}
        {!isLoading && notes.length === 0 && (
          <div className="py-12 text-center text-slate-500 bg-white/60 rounded-2xl border border-pink-100 p-6">
            <FaRegFaceSmile className="text-3xl text-pink-300 mx-auto mb-2" />
            <p className="text-sm font-semibold text-slate-700">Aucun message pour le moment</p>
            <p className="text-xs text-slate-400 mt-1">
              Soyez le premier à déposer un mot doux pour Emma, Anthony et le petit Edenn !
            </p>
            <button
              onClick={() => setShowForm(true)}
              className="mt-4 px-4 py-2 rounded-xl bg-pink-100 hover:bg-pink-200 text-pink-700 text-xs font-semibold transition"
            >
              Écrire le premier mot doux ✨
            </button>
          </div>
        )}

        {/* Notes Grid */}
        {notes.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {notes.map((note) => (
              <div 
                key={note.id}
                className="bg-white/85 p-4 rounded-2xl border border-pink-100/90 shadow-sm flex flex-col justify-between hover:shadow-soft transition transform hover:-translate-y-1"
              >
                <div>
                  <FaQuoteLeft className="text-pink-300 text-sm mb-2" />
                  <p className="text-xs text-slate-700 italic leading-relaxed mb-3 whitespace-pre-wrap">
                    "{note.content}"
                  </p>
                </div>

                <div className="pt-2 border-t border-pink-50 flex items-center justify-between">
                  <div>
                    <div className="text-xs font-bold text-slate-800">{note.author}</div>
                    <div className="text-[10px] text-pink-600 font-medium">
                      {note.relation ? `${note.relation} • ` : ''}{formatDate(note.created_at)}
                    </div>
                  </div>

                  <button
                    onClick={() => handleLike(note.id)}
                    className="flex items-center gap-1 text-[11px] font-semibold text-pink-500 hover:text-pink-600 px-2 py-1 rounded-full bg-pink-50 hover:bg-pink-100 transition active:scale-90"
                    aria-label="Aimer ce message"
                    title="Aimer ce mot"
                  >
                    <FaHeart className="text-[10px]" />
                    <span>{note.likes}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
};
