'use client';
import React, { useEffect, useState } from 'react';
import { Flame, BookOpen, ChevronRight } from 'lucide-react';
import Link from 'next/link';

export default function WelcomeBanner() {
  const [progress, setProgress] = useState(0);
  const xpToday = 340;
  const xpGoal = 500;
  const circumference = 2 * Math.PI * 45;

  useEffect(() => {
    const timer = setTimeout(() => {
      setProgress(xpToday / xpGoal);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  const dashOffset = circumference * (1 - progress);

  return (
    <div className="relative overflow-hidden rounded-xl border border-border bg-card fade-up"
      style={{ background: 'linear-gradient(135deg, #1A0D12 0%, #16161E 60%, #0F0F14 100%)' }}>
      <div className="absolute inset-0 opacity-5 pointer-events-none select-none flex items-center justify-end pr-8">
        <span className="font-serif-jp text-[160px] font-bold text-primary leading-none">禅</span>
      </div>

      <div className="relative z-10 p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-mono text-muted-foreground uppercase tracking-widest">今日も一緒に学びましょう</span>
          </div>
          <h1 className="text-2xl font-bold text-foreground mb-1">
            おはようございます、<span className="text-primary">Kenji</span> さん 👋
          </h1>
          <p className="text-sm text-muted-foreground mb-4">
            You&apos;re on a <span className="text-accent font-semibold">14-day streak</span> 🔥 — keep the momentum going today!
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <Link href="/">
              <button className="btn-press flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold text-primary-foreground transition-all"
                style={{ background: 'var(--primary)' }}>
                <BookOpen size={15} />
                Continue Studying
                <ChevronRight size={14} />
              </button>
            </Link>
            <div className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-card-elevated border border-border text-sm">
              <Flame size={14} className="text-accent" />
              <span className="font-semibold tabular-nums text-accent">14</span>
              <span className="text-muted-foreground">day streak</span>
            </div>
          </div>
        </div>

        <div className="flex-shrink-0 flex items-center gap-5">
          <div className="text-center">
            <div className="relative w-28 h-28">
              <svg className="w-28 h-28 -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="45" fill="none" stroke="var(--border)" strokeWidth="6" />
                <circle
                  cx="50" cy="50" r="45" fill="none"
                  stroke="var(--primary)" strokeWidth="6"
                  strokeLinecap="round"
                  strokeDasharray={circumference}
                  strokeDashoffset={dashOffset}
                  style={{ transition: 'stroke-dashoffset 1.2s cubic-bezier(0.4,0,0.2,1)' }}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-xl font-bold tabular-nums text-foreground">{xpToday}</span>
                <span className="text-[10px] text-muted-foreground font-mono">/ {xpGoal} XP</span>
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-1">Today&apos;s XP</p>
          </div>
        </div>
      </div>

      <div className="relative z-10 px-6 pb-3">
        <div className="flex items-center justify-between mb-1">
          <span className="text-xs text-muted-foreground">Daily XP Progress</span>
          <span className="text-xs font-mono text-primary">{Math.round((xpToday / xpGoal) * 100)}%</span>
        </div>
        <div className="h-1.5 rounded-full bg-card-elevated overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-1000"
            style={{ width: `${(xpToday / xpGoal) * 100}%`, background: 'linear-gradient(90deg, var(--primary), #F06080)' }}
          />
        </div>
      </div>
    </div>
  );
}
