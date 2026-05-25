'use client';
import React, { useState, useEffect, useCallback } from 'react';
import AppLayout from '@/components/AppLayout';
import { Volume2, ChevronLeft, ChevronRight, RotateCcw } from 'lucide-react';

const categories = ['All', 'Education', 'Transport', 'Places', 'Adjectives', 'People', 'Work', 'Food', 'Nature', 'Body'];

const vocabWords = [
  { id: 'v-001', jp: '勉強', romaji: 'benkyou', en: 'Study / Learning', category: 'Education', level: 'N5' },
  { id: 'v-002', jp: '電車', romaji: 'densha', en: 'Train / Electric train', category: 'Transport', level: 'N4' },
  { id: 'v-003', jp: '図書館', romaji: 'toshokan', en: 'Library', category: 'Places', level: 'N5' },
  { id: 'v-004', jp: '難しい', romaji: 'muzukashii', en: 'Difficult / Hard', category: 'Adjectives', level: 'N4' },
  { id: 'v-005', jp: '友達', romaji: 'tomodachi', en: 'Friend', category: 'People', level: 'N5' },
  { id: 'v-006', jp: '仕事', romaji: 'shigoto', en: 'Work / Job', category: 'Work', level: 'N4' },
  { id: 'v-007', jp: '自転車', romaji: 'jitensha', en: 'Bicycle', category: 'Transport', level: 'N4' },
  { id: 'v-008', jp: '料理', romaji: 'ryouri', en: 'Cooking / Cuisine', category: 'Food', level: 'N3' },
  { id: 'v-009', jp: '先生', romaji: 'sensei', en: 'Teacher', category: 'People', level: 'N5' },
  { id: 'v-010', jp: '学校', romaji: 'gakkou', en: 'School', category: 'Education', level: 'N5' },
  { id: 'v-011', jp: '電話', romaji: 'denwa', en: 'Telephone', category: 'Work', level: 'N5' },
  { id: 'v-012', jp: '病院', romaji: 'byouin', en: 'Hospital', category: 'Places', level: 'N5' },
  { id: 'v-013', jp: '美しい', romaji: 'utsukushii', en: 'Beautiful', category: 'Adjectives', level: 'N3' },
  { id: 'v-014', jp: '山', romaji: 'yama', en: 'Mountain', category: 'Nature', level: 'N5' },
  { id: 'v-015', jp: '海', romaji: 'umi', en: 'Sea / Ocean', category: 'Nature', level: 'N5' },
  { id: 'v-016', jp: '頭', romaji: 'atama', en: 'Head', category: 'Body', level: 'N5' },
  { id: 'v-017', jp: '会社', romaji: 'kaisha', en: 'Company / Office', category: 'Work', level: 'N4' },
  { id: 'v-018', jp: '飛行機', romaji: 'hikouki', en: 'Airplane', category: 'Transport', level: 'N4' },
  { id: 'v-019', jp: '公園', romaji: 'kouen', en: 'Park', category: 'Places', level: 'N5' },
  { id: 'v-020', jp: '音楽', romaji: 'ongaku', en: 'Music', category: 'Education', level: 'N4' },
  { id: 'v-021', jp: '映画', romaji: 'eiga', en: 'Movie / Film', category: 'Education', level: 'N4' },
  { id: 'v-022', jp: '天気', romaji: 'tenki', en: 'Weather', category: 'Nature', level: 'N5' },
  { id: 'v-023', jp: '家族', romaji: 'kazoku', en: 'Family', category: 'People', level: 'N5' },
  { id: 'v-024', jp: '旅行', romaji: 'ryokou', en: 'Travel / Trip', category: 'Places', level: 'N4' },
];

const levelColor = (level: string) => {
  const map: Record<string, string> = { N5: 'var(--jlpt-n5)', N4: 'var(--jlpt-n4)', N3: 'var(--jlpt-n3)' };
  return map[level] || 'var(--primary)';
};

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

export default function VocabPage() {
  const [mode, setMode] = useState<'grid' | 'flashcard'>('grid');
  const [activeCategory, setActiveCategory] = useState('All');
  const [cardIndex, setCardIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [speakingId, setSpeakingId] = useState<string | null>(null);

  const filtered = activeCategory === 'All' ? vocabWords : vocabWords.filter(w => w.category === activeCategory);
  const currentWord = filtered[cardIndex] ?? filtered[0];

  const nextCard = useCallback(() => {
    setFlipped(false);
    setTimeout(() => setCardIndex((i) => (i + 1) % filtered.length), 150);
  }, [filtered.length]);

  const prevCard = useCallback(() => {
    setFlipped(false);
    setTimeout(() => setCardIndex((i) => (i - 1 + filtered.length) % filtered.length), 150);
  }, [filtered.length]);

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

  useEffect(() => {
    setCardIndex(0);
    setFlipped(false);
  }, [activeCategory]);

  const handleSpeakBtn = (e: React.MouseEvent, word: typeof vocabWords[0]) => {
    e.stopPropagation();
    setSpeakingId(word.id);
    speakWord(word.jp, word.en);
    setTimeout(() => setSpeakingId(null), 3000);
  };

  return (
    <AppLayout>
      <div className="max-w-screen-xl mx-auto px-4 lg:px-6 py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-foreground mb-1">語彙 Vocabulary</h1>
            <p className="text-sm text-muted-foreground">{vocabWords.length} words across all levels</p>
          </div>
          <div className="flex items-center gap-2">
            {(['grid', 'flashcard'] as const).map(m => (
              <button key={m} onClick={() => { setMode(m); setFlipped(false); }}
                className="btn-press px-4 py-2 rounded-lg text-sm font-semibold transition-all"
                style={{
                  background: mode === m ? 'var(--primary)' : 'var(--card-elevated)',
                  color: mode === m ? '#fff' : 'var(--muted-foreground)',
                  border: `1px solid ${mode === m ? 'var(--primary)' : 'var(--border)'}`,
                }}>
                {m === 'grid' ? '⊞ Grid' : '🃏 Flashcards'}
              </button>
            ))}
          </div>
        </div>

        {/* Category tabs */}
        <div className="flex gap-2 overflow-x-auto pb-2 mb-5 scrollbar-hide">
          {categories.map(cat => (
            <button key={cat} onClick={() => setActiveCategory(cat)}
              className="btn-press flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold transition-all"
              style={{
                background: activeCategory === cat ? 'var(--primary)' : 'var(--card-elevated)',
                color: activeCategory === cat ? '#fff' : 'var(--muted-foreground)',
                border: `1px solid ${activeCategory === cat ? 'var(--primary)' : 'var(--border)'}`,
              }}>
              {cat}
            </button>
          ))}
        </div>

        {/* Grid mode */}
        {mode === 'grid' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
            {filtered.map((word) => (
              <div
                key={word.id}
                onClick={() => speak(word.jp)}
                className="card-hover rounded-xl border border-border bg-card p-4 group cursor-pointer relative"
                style={{ borderLeft: `3px solid ${levelColor(word.level)}` }}
              >
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <div className="font-sans-jp text-2xl font-bold text-foreground mb-0.5">{word.jp}</div>
                    <p className="font-mono text-xs text-muted-foreground italic">{word.romaji}</p>
                  </div>
                  <button
                    onClick={(e) => handleSpeakBtn(e, word)}
                    className="btn-press p-1.5 rounded-lg transition-all flex-shrink-0"
                    style={{
                      background: speakingId === word.id ? 'var(--primary-dim)' : 'transparent',
                      color: speakingId === word.id ? 'var(--primary)' : 'var(--muted-foreground)',
                    }}
                  >
                    {speakingId === word.id ? (
                      <div className="nz-equalizer">
                        <div className="nz-equalizer-bar" />
                        <div className="nz-equalizer-bar" />
                        <div className="nz-equalizer-bar" />
                      </div>
                    ) : (
                      <Volume2 size={15} />
                    )}
                  </button>
                </div>
                <p className="text-sm text-foreground mb-3">{word.en}</p>
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium"
                    style={{ background: `${levelColor(word.level)}22`, color: levelColor(word.level) }}>
                    {word.level}
                  </span>
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium bg-card-elevated text-muted-foreground">
                    {word.category}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Flashcard mode */}
        {mode === 'flashcard' && currentWord && (
          <div className="flex flex-col items-center max-w-sm mx-auto">
            <p className="text-xs text-muted-foreground mb-4">Click card to flip · Use ← → arrow keys to navigate · Space to flip</p>

            <div className="w-full perspective-1000 cursor-pointer mb-6" onClick={() => setFlipped(!flipped)}>
              <div className={`flip-card-inner w-full h-56 ${flipped ? 'flipped' : ''}`}>
                {/* Front */}
                <div className="backface-hidden absolute inset-0 rounded-2xl border border-border bg-card flex flex-col items-center justify-center p-8 gap-3">
                  <div className="font-sans-jp text-6xl font-bold text-foreground">{currentWord.jp}</div>
                  <p className="font-mono text-sm text-muted-foreground">{currentWord.romaji}</p>
                  <button
                    onClick={(e) => { e.stopPropagation(); speak(currentWord.jp); }}
                    className="btn-press flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs text-primary border border-primary/30 bg-primary/10 mt-2">
                    <Volume2 size={12} /> Tap to hear
                  </button>
                  <p className="text-xs text-foreground-subtle">Click to reveal meaning</p>
                </div>
                {/* Back */}
                <div className="backface-hidden rotate-y-180 absolute inset-0 rounded-2xl border-2 bg-card flex flex-col items-center justify-center p-8 gap-3"
                  style={{ borderColor: 'var(--primary)' }}>
                  <p className="text-2xl font-bold text-foreground text-center">{currentWord.en}</p>
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium"
                      style={{ background: `${levelColor(currentWord.level)}22`, color: levelColor(currentWord.level) }}>
                      {currentWord.level}
                    </span>
                    <span className="text-xs text-muted-foreground">{currentWord.category}</span>
                  </div>
                  <button
                    onClick={(e) => { e.stopPropagation(); speakWord(currentWord.jp, currentWord.en); }}
                    className="btn-press flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs text-primary border border-primary/30 bg-primary/10 mt-1">
                    <Volume2 size={12} /> Hear both
                  </button>
                  <p className="text-xs text-foreground-subtle">Click to flip back</p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4 mb-4">
              <button onClick={prevCard} className="btn-press p-2.5 rounded-xl bg-card-elevated border border-border hover:border-primary transition-colors">
                <ChevronLeft size={20} className="text-foreground" />
              </button>
              <span className="font-mono text-sm text-muted-foreground min-w-[60px] text-center">
                {cardIndex + 1} / {filtered.length}
              </span>
              <button onClick={nextCard} className="btn-press p-2.5 rounded-xl bg-card-elevated border border-border hover:border-primary transition-colors">
                <ChevronRight size={20} className="text-foreground" />
              </button>
              <button onClick={() => { setFlipped(false); setCardIndex(0); }}
                className="btn-press p-2.5 rounded-xl bg-card-elevated border border-border hover:border-primary transition-colors ml-2">
                <RotateCcw size={16} className="text-muted-foreground" />
              </button>
            </div>

            {/* Progress dots */}
            <div className="flex gap-1 flex-wrap justify-center max-w-xs">
              {filtered.slice(0, Math.min(filtered.length, 20)).map((_, i) => (
                <button key={`dot-${i}`} onClick={() => { setCardIndex(i); setFlipped(false); }}
                  className="w-2 h-2 rounded-full transition-all"
                  style={{ background: i === cardIndex ? 'var(--primary)' : 'var(--card-elevated)', border: `1px solid ${i === cardIndex ? 'var(--primary)' : 'var(--border)'}` }}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </AppLayout>
  );
}
