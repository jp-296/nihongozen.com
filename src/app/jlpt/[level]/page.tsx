import React from 'react';
import AppLayout from '@/components/AppLayout';
import Link from 'next/link';
import { ChevronRight, BookMarked, Headphones, FileText, BookOpen, Mic } from 'lucide-react';
import Icon from '@/components/ui/AppIcon';


const levelInfo = {
  n5: { level: 'N5', title: '初級', subtitle: 'Beginner', color: 'var(--jlpt-n5)', dim: 'var(--jlpt-n5-dim)', kanji: '初', desc: 'Basic hiragana, katakana, and 100 kanji. Everyday expressions.', progress: 94, total: 100, learned: 94 },
  n4: { level: 'N4', title: '初中級', subtitle: 'Elementary', color: 'var(--jlpt-n4)', dim: 'var(--jlpt-n4-dim)', kanji: '中', desc: '300 kanji, everyday conversation and basic grammar.', progress: 72, total: 300, learned: 216 },
  n3: { level: 'N3', title: '中級', subtitle: 'Intermediate', color: 'var(--jlpt-n3)', dim: 'var(--jlpt-n3-dim)', kanji: '語', desc: '650 kanji, news comprehension and complex sentences.', progress: 28, total: 650, learned: 182 },
};

type LevelKey = keyof typeof levelInfo;

interface JLPTPageProps {
  params: { level: string };
}

export default function JLPTPage({ params }: JLPTPageProps) {
  const key = params.level as LevelKey;
  const info = levelInfo[key];

  if (!info) {
    return (
      <AppLayout>
        <div className="max-w-screen-lg mx-auto px-4 py-6 text-center">
          <p className="text-4xl mb-3">🔒</p>
          <h1 className="text-xl font-bold text-foreground mb-2">Level not found</h1>
          <Link href="/" className="text-primary text-sm hover:opacity-80">← Back to Dashboard</Link>
        </div>
      </AppLayout>
    );
  }

  const sections = [
    { id: 'sec-kanji', icon: BookMarked, label: '漢字 Kanji', desc: `${info.learned} of ${info.total} learned`, href: '/kanji', color: info.color },
    { id: 'sec-vocab', icon: BookOpen, label: '語彙 Vocabulary', desc: 'Practice vocabulary words', href: '/vocab', color: 'var(--jlpt-n4)' },
    { id: 'sec-grammar', icon: FileText, label: '文法 Grammar', desc: 'Grammar patterns and rules', href: '/grammar', color: 'var(--jlpt-n3)' },
    { id: 'sec-listen', icon: Headphones, label: '聴解 Listening', desc: 'Dialogue comprehension', href: '/listening', color: 'var(--primary)' },
    { id: 'sec-reading', icon: FileText, label: '読解 Reading', desc: 'Reading passages', href: '/reading', color: 'var(--accent)' },
    { id: 'sec-kana', icon: Mic, label: 'Kana Chart', desc: 'Hiragana & Katakana', href: '/kana', color: 'var(--jlpt-n2)' },
  ];

  return (
    <AppLayout>
      <div className="max-w-screen-lg mx-auto px-4 lg:px-6 py-6">
        {/* Hero */}
        <div className="relative overflow-hidden rounded-2xl border p-8 mb-6"
          style={{ borderColor: info.color, background: `linear-gradient(135deg, ${info.dim}, var(--card))` }}>
          <div className="absolute top-4 right-6 font-serif-jp text-[100px] font-bold opacity-10 leading-none pointer-events-none"
            style={{ color: info.color }}>
            {info.kanji}
          </div>
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-3">
              <div className="px-3 py-1 rounded-lg text-sm font-bold font-mono"
                style={{ background: info.dim, color: info.color, border: `1px solid ${info.color}` }}>
                {info.level}
              </div>
              <span className="text-sm text-muted-foreground">{info.subtitle}</span>
            </div>
            <h1 className="font-serif-jp text-4xl font-bold mb-2" style={{ color: info.color }}>{info.title}</h1>
            <p className="text-sm text-muted-foreground mb-5 max-w-md">{info.desc}</p>
            <div className="max-w-xs">
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="text-muted-foreground">{info.learned}/{info.total} kanji</span>
                <span className="font-mono font-semibold" style={{ color: info.color }}>{info.progress}%</span>
              </div>
              <div className="h-2 rounded-full bg-card-elevated overflow-hidden">
                <div className="h-full rounded-full" style={{ width: `${info.progress}%`, background: info.color }} />
              </div>
            </div>
          </div>
        </div>

        {/* Study sections */}
        <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">Study Sections</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {sections.map((s) => {
            const Icon = s.icon;
            return (
              <Link key={s.id} href={s.href}>
                <div className="card-hover rounded-xl border border-border bg-card p-4 cursor-pointer flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: `${s.color}22` }}>
                    <Icon size={18} style={{ color: s.color }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-foreground font-sans-jp">{s.label}</p>
                    <p className="text-xs text-muted-foreground">{s.desc}</p>
                  </div>
                  <ChevronRight size={14} className="text-muted-foreground flex-shrink-0" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </AppLayout>
  );
}
