'use client';
import React, { useEffect, useState } from 'react';
import { Award } from 'lucide-react';

const weekDots = [
  { id: 'dot-mon', day: 'M', active: true, xp: 420 },
  { id: 'dot-tue', day: 'T', active: true, xp: 380 },
  { id: 'dot-wed', day: 'W', active: true, xp: 510 },
  { id: 'dot-thu', day: 'T', active: true, xp: 290 },
  { id: 'dot-fri', day: 'F', active: true, xp: 340 },
  { id: 'dot-sat', day: 'S', active: false, xp: 0 },
  { id: 'dot-sun', day: 'S', active: false, xp: 0 },
];

export default function XPLevelCard() {
  const [barWidth, setBarWidth] = useState(0);
  const level = 12;
  const currentXP = 4820;
  const nextLevelXP = 6000;
  const progress = (currentXP / nextLevelXP) * 100;

  useEffect(() => {
    const t = setTimeout(() => setBarWidth(progress), 400);
    return () => clearTimeout(t);
  }, [progress]);

  return (
    <div className="rounded-xl border border-border bg-card p-5 fade-up stagger-2">
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-xs text-muted-foreground uppercase tracking-widest font-mono mb-1">Current Level</p>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-black tabular-nums text-foreground">{level}</span>
            <span className="text-sm text-muted-foreground">Scholar</span>
          </div>
        </div>
        <div className="w-12 h-12 rounded-xl flex items-center justify-center"
          style={{ background: 'linear-gradient(135deg, var(--accent), #A07020)' }}>
          <Award size={22} className="text-white" />
        </div>
      </div>
      <div className="mb-4">
        <div className="flex items-center justify-between text-xs mb-1.5">
          <span className="text-muted-foreground">{currentXP?.toLocaleString()} XP</span>
          <span className="text-muted-foreground">{nextLevelXP?.toLocaleString()} XP</span>
        </div>
        <div className="h-2 rounded-full bg-card-elevated overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-1000"
            style={{ width: `${barWidth}%`, background: 'linear-gradient(90deg, var(--accent), #E0B050)' }}
          />
        </div>
        <p className="text-[11px] text-muted-foreground mt-1">{Math.round(nextLevelXP - currentXP)} XP to Level {level + 1}</p>
      </div>
      <div>
        <p className="text-xs text-muted-foreground mb-2">This week</p>
        <div className="flex gap-1.5">
          {weekDots?.map((dot) => (
            <div key={dot?.id} className="flex flex-col items-center gap-1">
              <div
                className="w-7 h-7 rounded-md flex items-center justify-center text-[10px] font-mono font-medium transition-colors"
                style={{
                  background: dot?.active ? 'var(--primary-dim)' : 'var(--card-elevated)',
                  color: dot?.active ? 'var(--primary)' : 'var(--foreground-subtle)',
                  border: dot?.active ? '1px solid var(--primary)' : '1px solid var(--border)',
                }}
                title={dot?.active ? `${dot?.xp} XP` : 'No study'}
              >
                {dot?.active ? '✓' : dot?.day}
              </div>
              <span className="text-[9px] text-foreground-subtle">{dot?.day}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-4 pt-4 border-t border-border flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="px-2 py-0.5 rounded text-[10px] font-semibold font-mono"
            style={{ background: 'var(--jlpt-n4-dim)', color: 'var(--jlpt-n4)', border: '1px solid var(--jlpt-n4)' }}>
            N4
          </div>
          <span className="text-xs text-muted-foreground">Current target</span>
        </div>
        <span className="text-xs font-semibold text-accent">Rank: Scholar</span>
      </div>
    </div>
  );
}
