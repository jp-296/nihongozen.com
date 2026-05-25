'use client';
import React, { useState, useEffect, useRef, useCallback } from 'react';
import AppLayout from '@/components/AppLayout';
import { Play, Pause, RotateCcw, Bell } from 'lucide-react';

type TimerMode = 'focus' | 'short' | 'long';

const MODES: Record<TimerMode, { label: string; labelJp: string; duration: number; color: string }> = {
  focus: { label: 'Focus', labelJp: '集中', duration: 25 * 60, color: 'var(--primary)' },
  short: { label: 'Short Break', labelJp: '短休憩', duration: 5 * 60, color: 'var(--jlpt-n5)' },
  long: { label: 'Long Break', labelJp: '長休憩', duration: 15 * 60, color: 'var(--jlpt-n4)' },
};

function playChime() {
  if (typeof window === 'undefined') return;
  try {
    const ctx = new AudioContext();
    const notes = [261, 329, 392, 523];
    notes.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.frequency.value = freq;
      osc.type = 'sine';
      gain.gain.setValueAtTime(0.25, ctx.currentTime + i * 0.2);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + i * 0.2 + 0.5);
      osc.connect(gain).connect(ctx.destination);
      osc.start(ctx.currentTime + i * 0.2);
      osc.stop(ctx.currentTime + i * 0.2 + 0.5);
    });
  } catch (_) { /* AudioContext not available */ }
}

export default function TimerPage() {
  const [mode, setMode] = useState<TimerMode>('focus');
  const [timeLeft, setTimeLeft] = useState(MODES.focus.duration);
  const [running, setRunning] = useState(false);
  const [sessions, setSessions] = useState(0);
  const [finished, setFinished] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const totalTime = MODES[mode].duration;
  const progress = timeLeft / totalTime;
  const circumference = 2 * Math.PI * 70;
  const dashOffset = circumference * progress;

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60).toString().padStart(2, '0');
    const sec = (s % 60).toString().padStart(2, '0');
    return `${m}:${sec}`;
  };

  const reset = useCallback(() => {
    setRunning(false);
    setFinished(false);
    setTimeLeft(MODES[mode].duration);
    if (intervalRef.current) clearInterval(intervalRef.current);
  }, [mode]);

  useEffect(() => { reset(); }, [mode, reset]);

  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((t) => {
          if (t <= 1) {
            setRunning(false);
            setFinished(true);
            if (mode === 'focus') setSessions((s) => s + 1);
            playChime();
            return 0;
          }
          return t - 1;
        });
      }, 1000);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [running, mode]);

  const color = MODES[mode].color;

  return (
    <AppLayout>
      <div className="max-w-screen-md mx-auto px-4 lg:px-6 py-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-foreground mb-1">⏱ Study Timer</h1>
          <p className="text-sm text-muted-foreground">Pomodoro technique for focused Japanese study sessions</p>
        </div>

        <div className="rounded-2xl border border-border bg-card p-8">
          {/* Mode tabs */}
          <div className="flex border border-border rounded-xl overflow-hidden mb-8">
            {(Object.keys(MODES) as TimerMode[]).map((m) => (
              <button
                key={`timer-mode-${m}`}
                onClick={() => setMode(m)}
                className="btn-press flex-1 py-3 text-sm font-medium transition-all"
                style={{
                  background: mode === m ? `${MODES[m].color}22` : 'transparent',
                  color: mode === m ? MODES[m].color : 'var(--muted-foreground)',
                  borderBottom: mode === m ? `2px solid ${MODES[m].color}` : '2px solid transparent',
                }}>
                <span className="font-sans-jp block text-base">{MODES[m].labelJp}</span>
                <span className="text-[11px] block">{MODES[m].label}</span>
              </button>
            ))}
          </div>

          {/* SVG Timer */}
          <div className="flex flex-col items-center mb-8">
            <div className="relative w-48 h-48 mb-6">
              <svg className="w-48 h-48 -rotate-90" viewBox="0 0 160 160">
                <circle cx="80" cy="80" r="70" fill="none" stroke="var(--card-elevated)" strokeWidth="8" />
                <circle
                  cx="80" cy="80" r="70" fill="none"
                  stroke={color} strokeWidth="8"
                  strokeLinecap="round"
                  strokeDasharray={circumference}
                  strokeDashoffset={dashOffset}
                  style={{ transition: running ? 'stroke-dashoffset 1s linear' : 'none' }}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="font-mono text-4xl font-bold tabular-nums text-foreground">{formatTime(timeLeft)}</span>
                <span className="text-xs text-muted-foreground font-sans-jp mt-1">{MODES[mode].labelJp}</span>
                {finished && (
                  <div className="flex items-center gap-1 mt-1">
                    <Bell size={12} style={{ color }} />
                    <span className="text-xs font-semibold" style={{ color }}>Done!</span>
                  </div>
                )}
              </div>
            </div>

            {/* Session dots */}
            <div className="flex items-center gap-2 mb-6">
              {Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={`session-dot-${i + 1}`}
                  className="w-3 h-3 rounded-full transition-all"
                  style={{
                    background: i < sessions % 4 ? color : 'var(--card-elevated)',
                    border: `1.5px solid ${i < sessions % 4 ? color : 'var(--border)'}`,
                    transform: i < sessions % 4 ? 'scale(1.1)' : 'scale(1)',
                  }}
                />
              ))}
              <span className="text-xs text-muted-foreground ml-2">{sessions} sessions today</span>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => { setRunning((r) => !r); setFinished(false); }}
                className="btn-press flex items-center gap-2 px-8 py-3 rounded-xl text-base font-bold text-white transition-all"
                style={{ background: color }}>
                {running ? <><Pause size={18} /> Pause</> : <><Play size={18} /> {finished ? 'Restart' : 'Start'}</>}
              </button>
              <button
                onClick={reset}
                className="btn-press p-3 rounded-xl bg-card-elevated border border-border hover:border-primary transition-colors">
                <RotateCcw size={18} className="text-muted-foreground" />
              </button>
            </div>
          </div>

          {/* Tips */}
          <div className="border-t border-border pt-5">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Study Tips</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { emoji: '🎯', title: '25 min Focus', desc: 'Study kanji or vocabulary intensively' },
                { emoji: '☕', title: '5 min Break', desc: 'Rest your eyes, stretch, hydrate' },
                { emoji: '🏆', title: '4 Sessions', desc: 'Take a longer 15-minute break' },
              ].map((tip) => (
                <div key={tip.title} className="p-3 rounded-lg bg-card-elevated border border-border">
                  <div className="text-xl mb-1">{tip.emoji}</div>
                  <p className="text-xs font-semibold text-foreground mb-0.5">{tip.title}</p>
                  <p className="text-[11px] text-muted-foreground">{tip.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
