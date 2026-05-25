'use client';
import React, { useEffect, useState } from 'react';
import { ChevronRight } from 'lucide-react';

const levels = [
  {
    id: 'jlpt-n5',
    level: 'N5',
    title: '初級',
    subtitle: 'Beginner',
    description: 'Basic hiragana, katakana, and 100 kanji',
    kanji: '初',
    progress: 94,
    total: 100,
    learned: 94,
    colorVar: 'var(--jlpt-n5)',
    dimVar: 'var(--jlpt-n5-dim)',
    status: 'Completed',
  },
  {
    id: 'jlpt-n4',
    level: 'N4',
    title: '初中級',
    subtitle: 'Elementary',
    description: '300 kanji, everyday conversation',
    kanji: '中',
    progress: 72,
    total: 300,
    learned: 216,
    colorVar: 'var(--jlpt-n4)',
    dimVar: 'var(--jlpt-n4-dim)',
    status: 'In Progress',
  },
  {
    id: 'jlpt-n3',
    level: 'N3',
    title: '中級',
    subtitle: 'Intermediate',
    description: '650 kanji, news comprehension',
    kanji: '語',
    progress: 28,
    total: 650,
    learned: 182,
    colorVar: 'var(--jlpt-n3)',
    dimVar: 'var(--jlpt-n3-dim)',
    status: 'In Progress',
  },
  {
    id: 'jlpt-n2',
    level: 'N2',
    title: '上級',
    subtitle: 'Upper-Inter.',
    description: '1000 kanji, professional texts',
    kanji: '上',
    progress: 5,
    total: 1000,
    learned: 50,
    colorVar: 'var(--jlpt-n2)',
    dimVar: 'var(--jlpt-n2-dim)',
    status: 'Unlocked',
  },
  {
    id: 'jlpt-n1',
    level: 'N1',
    title: '最上級',
    subtitle: 'Advanced',
    description: '2000 kanji, native-level texts',
    kanji: '極',
    progress: 0,
    total: 2000,
    learned: 0,
    colorVar: 'var(--jlpt-n1)',
    dimVar: 'var(--jlpt-n1-dim)',
    status: 'Locked',
  },
];

export default function JLPTLevelCards() {
  const [widths, setWidths] = useState<number[]>(levels.map(() => 0));

  useEffect(() => {
    const t = setTimeout(() => {
      setWidths(levels.map((l) => l.progress));
    }, 500);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="fade-up stagger-3">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-base font-semibold text-foreground">JLPT Levels</h2>
        <span className="text-xs text-muted-foreground font-mono">N5 → N1</span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3">
        {levels.map((lv, i) => (
          <div
            key={lv.id}
            className="card-hover rounded-xl border bg-card p-4 cursor-pointer relative overflow-hidden"
            style={{ borderColor: lv.colorVar }}
          >
            <div className="absolute top-2 right-2 font-serif-jp text-5xl font-bold opacity-10 pointer-events-none select-none leading-none"
              style={{ color: lv.colorVar }}>
              {lv.kanji}
            </div>

            <div className="flex items-center justify-between mb-2">
              <div className="px-2 py-0.5 rounded text-xs font-bold font-mono"
                style={{ background: lv.dimVar, color: lv.colorVar }}>
                {lv.level}
              </div>
              <span className="text-[10px] text-muted-foreground">{lv.status}</span>
            </div>

            <div className="font-serif-jp text-xl font-bold mb-0.5" style={{ color: lv.colorVar }}>
              {lv.title}
            </div>
            <p className="text-xs text-muted-foreground mb-1">{lv.subtitle}</p>
            <p className="text-[11px] text-foreground-subtle mb-3 leading-relaxed">{lv.description}</p>

            <div className="mb-3">
              <div className="flex items-center justify-between text-[10px] mb-1">
                <span className="text-muted-foreground">{lv.learned}/{lv.total}</span>
                <span className="font-mono" style={{ color: lv.colorVar }}>{lv.progress}%</span>
              </div>
              <div className="h-1.5 rounded-full bg-card-elevated overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-1000"
                  style={{ width: `${widths[i]}%`, backgroundColor: lv.colorVar }}
                />
              </div>
            </div>

            <button
              className="btn-press w-full flex items-center justify-center gap-1.5 py-1.5 rounded-lg text-xs font-semibold transition-all"
              style={{
                background: lv.progress > 0 ? lv.dimVar : 'var(--card-elevated)',
                color: lv.progress > 0 ? lv.colorVar : 'var(--muted-foreground)',
                border: `1px solid ${lv.progress > 0 ? lv.colorVar : 'var(--border)'}`,
              }}
              disabled={lv.status === 'Locked'}
              onClick={() => {
                if (lv.status !== 'Locked') {
                  window.location.href = `/jlpt/${lv.level.toLowerCase()}`;
                }
              }}
            >
              {lv.status === 'Locked' ? '🔒 Locked' : 'Start Learning'}
              {lv.status !== 'Locked' && <ChevronRight size={11} />}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
