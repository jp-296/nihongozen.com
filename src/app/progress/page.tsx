import React from 'react';
import AppLayout from '@/components/AppLayout';
import { TrendingUp, Target, Zap, BookMarked, CheckCircle } from 'lucide-react';
import Icon from '@/components/ui/AppIcon';


const weeklyData = [
  { id: 'wd-mon', day: 'Mon', xp: 420, kanji: 8, vocab: 15 },
  { id: 'wd-tue', day: 'Tue', xp: 380, kanji: 6, vocab: 12 },
  { id: 'wd-wed', day: 'Wed', xp: 510, kanji: 10, vocab: 18 },
  { id: 'wd-thu', day: 'Thu', xp: 290, kanji: 4, vocab: 9 },
  { id: 'wd-fri', day: 'Fri', xp: 340, kanji: 7, vocab: 11 },
  { id: 'wd-sat', day: 'Sat', xp: 0, kanji: 0, vocab: 0 },
  { id: 'wd-sun', day: 'Sun', xp: 0, kanji: 0, vocab: 0 },
];

const maxXP = Math.max(...weeklyData?.map(d => d?.xp), 1);

const achievements = [
  { id: 'ach-1', icon: '🎯', title: 'N5 Complete', desc: 'Completed all N5 kanji', earned: true, date: 'Jan 2026' },
  { id: 'ach-2', icon: '🔥', title: '14-Day Streak', desc: 'Studied 14 days in a row', earned: true, date: 'May 2026' },
  { id: 'ach-3', icon: '📚', title: 'Scholar Rank', desc: 'Reached Level 12', earned: true, date: 'Apr 2026' },
  { id: 'ach-4', icon: '漢', title: '100 Kanji', desc: 'Learned 100 kanji characters', earned: true, date: 'Feb 2026' },
  { id: 'ach-5', icon: '⚡', title: 'XP Master', desc: 'Earn 50,000 total XP', earned: false, date: null },
  { id: 'ach-6', icon: '🏆', title: 'N4 Complete', desc: 'Complete all N4 kanji', earned: false, date: null },
];

export default function ProgressPage() {
  return (
    <AppLayout>
      <div className="max-w-screen-xl mx-auto px-4 lg:px-6 py-6 space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground mb-1">📈 Progress</h1>
          <p className="text-sm text-muted-foreground">Track your Japanese learning journey</p>
        </div>

        {/* Stats overview */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { id: 'ps-xp', icon: Zap, label: 'Total XP', value: '48,200', sub: '+340 today', color: 'var(--primary)' },
            { id: 'ps-streak', icon: TrendingUp, label: 'Best Streak', value: '21 days', sub: 'Current: 14', color: 'var(--accent)' },
            { id: 'ps-kanji', icon: BookMarked, label: 'Kanji Learned', value: '284', sub: 'N4: 72%', color: 'var(--jlpt-n4)' },
            { id: 'ps-accuracy', icon: Target, label: 'Quiz Accuracy', value: '76%', sub: '847 quizzes', color: 'var(--jlpt-n3)' },
          ]?.map((s) => {
            const Icon = s?.icon;
            return (
              <div key={s?.id} className="card-hover rounded-xl border border-border bg-card p-4">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: `${s?.color}22` }}>
                    <Icon size={16} style={{ color: s?.color }} />
                  </div>
                  <span className="text-xs text-muted-foreground">{s?.label}</span>
                </div>
                <p className="text-2xl font-bold tabular-nums text-foreground mb-0.5">{s?.value}</p>
                <p className="text-[11px] text-muted-foreground">{s?.sub}</p>
              </div>
            );
          })}
        </div>

        {/* Weekly XP chart */}
        <div className="rounded-xl border border-border bg-card p-5">
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-sm font-semibold text-foreground">Weekly XP</h3>
            <span className="text-xs text-muted-foreground font-mono">1,940 XP this week</span>
          </div>
          <div className="flex items-end gap-3 h-32">
            {weeklyData?.map((d) => (
              <div key={d?.id} className="flex-1 flex flex-col items-center gap-1">
                <span className="text-[10px] font-mono text-muted-foreground">{d?.xp > 0 ? d?.xp : ''}</span>
                <div className="w-full rounded-t-lg transition-all duration-700"
                  style={{
                    height: `${(d?.xp / maxXP) * 100}%`,
                    minHeight: d?.xp > 0 ? '4px' : '0',
                    background: d?.xp > 0 ? 'linear-gradient(180deg, var(--primary), #B02050)' : 'var(--card-elevated)',
                  }} />
                <span className="text-[10px] text-muted-foreground">{d?.day}</span>
              </div>
            ))}
          </div>
        </div>

        {/* JLPT Progress */}
        <div className="rounded-xl border border-border bg-card p-5">
          <h3 className="text-sm font-semibold text-foreground mb-4">JLPT Level Progress</h3>
          <div className="space-y-4">
            {[
              { level: 'N5', progress: 94, learned: 94, total: 100, color: 'var(--jlpt-n5)' },
              { level: 'N4', progress: 72, learned: 216, total: 300, color: 'var(--jlpt-n4)' },
              { level: 'N3', progress: 28, learned: 182, total: 650, color: 'var(--jlpt-n3)' },
              { level: 'N2', progress: 5, learned: 50, total: 1000, color: 'var(--jlpt-n2)' },
              { level: 'N1', progress: 0, learned: 0, total: 2000, color: 'var(--jlpt-n1)' },
            ]?.map((lv) => (
              <div key={lv?.level}>
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold font-mono px-2 py-0.5 rounded"
                      style={{ background: `${lv?.color}22`, color: lv?.color }}>
                      {lv?.level}
                    </span>
                    <span className="text-xs text-muted-foreground">{lv?.learned}/{lv?.total} kanji</span>
                  </div>
                  <span className="text-xs font-mono font-semibold" style={{ color: lv?.color }}>{lv?.progress}%</span>
                </div>
                <div className="h-2 rounded-full bg-card-elevated overflow-hidden">
                  <div className="h-full rounded-full transition-all duration-1000"
                    style={{ width: `${lv?.progress}%`, background: lv?.color }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Achievements */}
        <div className="rounded-xl border border-border bg-card p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-foreground">Achievements</h3>
            <span className="text-xs text-muted-foreground">{achievements?.filter(a => a?.earned)?.length}/{achievements?.length} earned</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {achievements?.map((a) => (
              <div key={a?.id}
                className="flex items-center gap-3 p-3 rounded-lg border transition-all"
                style={{
                  background: a?.earned ? 'var(--card-elevated)' : 'transparent',
                  borderColor: a?.earned ? 'var(--border)' : 'var(--border)',
                  opacity: a?.earned ? 1 : 0.5,
                }}>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
                  style={{ background: a?.earned ? 'var(--primary-dim)' : 'var(--card-elevated)' }}>
                  {a?.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <p className="text-sm font-semibold text-foreground truncate">{a?.title}</p>
                    {a?.earned && <CheckCircle size={12} style={{ color: 'var(--jlpt-n5)', flexShrink: 0 }} />}
                  </div>
                  <p className="text-[11px] text-muted-foreground">{a?.desc}</p>
                  {a?.date && <p className="text-[10px] text-foreground-subtle">{a?.date}</p>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
