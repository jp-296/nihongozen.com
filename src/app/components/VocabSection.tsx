'use client';
import React, { useState, useEffect, useCallback } from 'react';
import { Volume2, ChevronLeft, ChevronRight, RefreshCw } from 'lucide-react';

const vocabWords = [
  { id: 'vocab-001', jp: '勉強', romaji: 'benkyou', en: 'Study / Learning', category: 'Education', categoryColor: 'var(--jlpt-n5)' },
  { id: 'vocab-002', jp: '電車', romaji: 'densha', en: 'Train / Electric train', category: 'Transport', categoryColor: 'var(--jlpt-n4)' },
  { id: 'vocab-003', jp: '図書館', romaji: 'toshokan', en: 'Library', category: 'Places', categoryColor: 'var(--jlpt-n5)' },
  { id: 'vocab-004', jp: '難しい', romaji: 'muzukashii', en: 'Difficult / Hard', category: 'Adjectives', categoryColor: 'var(--jlpt-n4)' },
  { id: 'vocab-005', jp: '友達', romaji: 'tomodachi', en: 'Friend', category: 'People', categoryColor: 'var(--jlpt-n5)' },
  { id: 'vocab-006', jp: '仕事', romaji: 'shigoto', en: 'Work / Job', category: 'Work', categoryColor: 'var(--jlpt-n4)' },
  { id: 'vocab-007', jp: '自転車', romaji: 'jitensha', en: 'Bicycle', category: 'Transport', categoryColor: 'var(--jlpt-n4)' },
  { id: 'vocab-008', jp: '料理', romaji: 'ryouri', en: 'Cooking / Cuisine', category: 'Food', categoryColor: 'var(--jlpt-n3)' },
];

function speak(text: string, lang = 'ja-JP', rate = 0.85) {
  if (typeof window !== 'undefined' && window.speechSynthesis) {
    window.speechSynthesis.cancel();
    const utt = new SpeechSynthesisUtterance(text);
    utt.lang = lang;
    utt.rate = rate;
    window.speechSynthesis.speak(utt);
  }
}

function speakWord(jp: string, en: string) {
  if (typeof window !== 'undefined' && window.speechSynthesis) {
    window.speechSynthesis.cancel();
    const jpUtt = new SpeechSynthesisUtterance(jp);
    jpUtt.lang = 'ja-JP';
    jpUtt.rate = 0.8;
    jpUtt.onend = () => {
      setTimeout(() => {
        const enUtt = new SpeechSynthesisUtterance(en);
        enUtt.lang = 'en-US';
        enUtt.rate = 0.9;
        window.speechSynthesis.speak(enUtt);
      }, 600);
    };
    window.speechSynthesis.speak(jpUtt);
  }
}

export default function VocabSection() {
  const [mode, setMode] = useState<'grid' | 'flashcard'>('grid');
  const [cardIndex, setCardIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);

  const currentWord = vocabWords?.[cardIndex];

  const nextCard = useCallback(() => {
    setFlipped(false);
    setTimeout(() => setCardIndex((i) => (i + 1) % vocabWords.length), 150);
  }, []);

  const prevCard = useCallback(() => {
    setFlipped(false);
    setTimeout(() => setCardIndex((i) => (i - 1 + vocabWords.length) % vocabWords.length), 150);
  }, []);

  useEffect(() => {
    if (mode !== 'flashcard') return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') nextCard();
      else if (e.key === 'ArrowLeft') prevCard();
      else if (e.key === ' ') { e.preventDefault(); setFlipped(f => !f); }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [mode, nextCard, prevCard]);

  return (
    <div className="fade-up stagger-5">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-base font-semibold text-foreground">Vocabulary</h2>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setMode('grid')}
            className="btn-press px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
            style={{
              background: mode === 'grid' ? 'var(--primary-dim)' : 'var(--card-elevated)',
              color: mode === 'grid' ? 'var(--primary)' : 'var(--muted-foreground)',
              border: `1px solid ${mode === 'grid' ? 'var(--primary)' : 'var(--border)'}`,
            }}>
            Grid
          </button>
          <button
            onClick={() => { setMode('flashcard'); setFlipped(false); }}
            className="btn-press px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
            style={{
              background: mode === 'flashcard' ? 'var(--primary-dim)' : 'var(--card-elevated)',
              color: mode === 'flashcard' ? 'var(--primary)' : 'var(--muted-foreground)',
              border: `1px solid ${mode === 'flashcard' ? 'var(--primary)' : 'var(--border)'}`,
            }}>
            Flashcards
          </button>
        </div>
      </div>

      {mode === 'grid' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {vocabWords?.map((word) => (
            <div
              key={word?.id}
              onClick={() => speak(word.jp)}
              className="card-hover rounded-xl border border-border bg-card p-4 group cursor-pointer"
            >
              <div className="flex items-start justify-between mb-2">
                <div className="font-sans-jp text-xl font-bold text-foreground">{word?.jp}</div>
                <button
                  onClick={(e) => { e.stopPropagation(); speakWord(word.jp, word.en); }}
                  className="opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded-md hover:bg-card-elevated">
                  <Volume2 size={14} className="text-primary" />
                </button>
              </div>
              <p className="font-mono text-xs text-muted-foreground mb-2">{word?.romaji}</p>
              <p className="text-sm text-foreground-subtle mb-3">{word?.en}</p>
              <div className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium"
                style={{ background: `${word?.categoryColor}22`, color: word?.categoryColor }}>
                {word?.category}
              </div>
            </div>
          ))}
        </div>
      )}

      {mode === 'flashcard' && (
        <div className="flex flex-col items-center">
          <p className="text-xs text-muted-foreground mb-3">Click card to flip · ← → arrow keys to navigate · Space to flip</p>
          <div className="w-full max-w-sm perspective-1000 cursor-pointer mb-4" onClick={() => setFlipped(!flipped)}>
            <div className={`flip-card-inner w-full h-48 ${flipped ? 'flipped' : ''}`}>
              {/* Front */}
              <div className="backface-hidden absolute inset-0 rounded-2xl border border-border bg-card flex flex-col items-center justify-center p-6 gap-3">
                <div className="font-sans-jp text-5xl font-bold text-foreground">{currentWord?.jp}</div>
                <p className="font-mono text-sm text-muted-foreground">{currentWord?.romaji}</p>
                <button
                  onClick={(e) => { e.stopPropagation(); speak(currentWord?.jp ?? ''); }}
                  className="btn-press flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs text-primary border border-primary/30 bg-primary/10">
                  <Volume2 size={12} /> Tap to hear
                </button>
                <p className="text-xs text-foreground-subtle">Click to reveal meaning</p>
              </div>
              {/* Back */}
              <div className="backface-hidden rotate-y-180 absolute inset-0 rounded-2xl border-2 bg-card flex flex-col items-center justify-center p-6 gap-3"
                style={{ borderColor: 'var(--primary)' }}>
                <p className="text-lg font-semibold text-foreground text-center">{currentWord?.en}</p>
                <div className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium"
                  style={{ background: `${currentWord?.categoryColor}22`, color: currentWord?.categoryColor }}>
                  {currentWord?.category}
                </div>
                <button
                  onClick={(e) => { e.stopPropagation(); speakWord(currentWord?.jp ?? '', currentWord?.en ?? ''); }}
                  className="btn-press flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs text-primary border border-primary/30 bg-primary/10">
                  <Volume2 size={12} /> Hear both
                </button>
                <p className="text-xs text-foreground-subtle">Click to flip back</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button onClick={prevCard} className="btn-press p-2 rounded-lg bg-card-elevated border border-border hover:border-primary transition-colors">
              <ChevronLeft size={18} className="text-foreground" />
            </button>
            <span className="font-mono text-sm text-muted-foreground">
              {cardIndex + 1} / {vocabWords?.length}
            </span>
            <button onClick={nextCard} className="btn-press p-2 rounded-lg bg-card-elevated border border-border hover:border-primary transition-colors">
              <ChevronRight size={18} className="text-foreground" />
            </button>
            <button onClick={() => { setFlipped(false); setCardIndex(0); }} className="btn-press p-2 rounded-lg bg-card-elevated border border-border hover:border-primary transition-colors ml-2">
              <RefreshCw size={16} className="text-muted-foreground" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
