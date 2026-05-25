'use client';
import React from 'react';
import { Zap, Flame, BookMarked, Target, TrendingUp, TrendingDown } from 'lucide-react';
import Icon from '@/components/ui/AppIcon';


const stats = [
  {
    id: 'stat-xp',
    label: 'XP Today',
    value: '340',
    unit: 'XP',
    delta: '+12%',
    deltaPositive: true,
    deltaLabel: 'vs yesterday',
    icon: Zap,
    color: 'var(--primary)',
    dimColor: 'var(--primary-dim)',
    sublabel: 'Goal: 500 XP',
  },
  {
    id: 'stat-streak',
    label: 'Day Streak',
    value: '14',
    unit: 'days',
    delta: '+2',
    deltaPositive: true,
    deltaLabel: 'this week',
    icon: Flame,
    color: 'var(--accent)',
    dimColor: 'var(--accent-dim)',
    sublabel: 'Best: 21 days',
  },
  {
    id: 'stat-kanji',
    label: 'Kanji Learned',
    value: '284',
    unit: 'kanji',
    delta: '+8',
    deltaPositive: true,
    deltaLabel: 'this week',
    icon: BookMarked,
    color: 'var(--jlpt-n4)',
    dimColor: 'var(--jlpt-n4-dim)',
    sublabel: 'N4 level: 72%',
  },
  {
    id: 'stat-accuracy',
    label: 'Quiz Accuracy',
    value: '76',
    unit: '%',
    delta: '-4%',
    deltaPositive: false,
    deltaLabel: 'vs last week',
    icon: Target,
    color: 'var(--jlpt-n3)',
    dimColor: 'var(--jlpt-n3-dim)',
    sublabel: 'Needs improvement',
  },
];

export default function StatsGrid() {
  return (
    <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 fade-up stagger-1">
      {stats?.map((stat) => {
        const Icon = stat?.icon;
        return (
          <div
            key={stat?.id}
            className="card-hover rounded-xl border border-border bg-card p-4 cursor-default"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: stat?.dimColor }}>
                <Icon size={16} style={{ color: stat?.color }} />
              </div>
              <div className={`flex items-center gap-1 text-xs font-medium ${stat?.deltaPositive ? 'text-green-400' : 'text-primary'}`}>
                {stat?.deltaPositive
                  ? <TrendingUp size={11} />
                  : <TrendingDown size={11} />}
                {stat?.delta}
              </div>
            </div>
            <div className="mb-0.5">
              <span className="text-3xl font-bold tabular-nums text-foreground">{stat?.value}</span>
              <span className="text-sm text-muted-foreground ml-1">{stat?.unit}</span>
            </div>
            <p className="text-xs font-medium text-muted-foreground mb-1">{stat?.label}</p>
            <p className="text-[11px] text-foreground-subtle">{stat?.sublabel}</p>
            <p className="text-[10px] text-foreground-subtle mt-0.5">{stat?.deltaLabel}</p>
          </div>
        );
      })}
    </div>
  );
}
