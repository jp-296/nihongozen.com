'use client';
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Play, Pause, RotateCcw } from 'lucide-react';

type TimerMode = 'focus' | 'short' | 'long';

const MODES: Record<TimerMode, { label: string; duration: number; color: string }> = {
  focus: { label: 'Focus', duration: 25 * 60, color: 'var(--primary)' },
  short: { label: 'Short Break', duration: 5 * 60, color: 'var(--jlpt-n5)' },
  long: { label: 'Long Break', duration: 15 * 60, color: 'var(--jlpt-n4)' },
};

export default function PomodoroTimer() {
  const [mode, setMode] = useState<TimerMode>('focus');
  const [timeLeft, setTimeLeft] = useState(MODES.focus.duration);
  const [running, setRunning] = useState(false);
  const [sessions, setSessions] = useState(2);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const totalTime = MODES[mode].duration;
  const progress = timeLeft / totalTime;
  const circumference = 2 * Math.PI * 54;
  const dashOffset = circumference * progress;

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60).toString().padStart(2, '0');
    const sec = (s % 60).toString().padStart(2, '0');
    return `${m}:${sec}`;
  };

  const reset = useCallback(() => {
    setRunning(false);
    setTimeLeft(MODES[mode].duration);
    if (intervalRef.current) clearInterval(intervalRef.current);
  }, [mode]);

  useEffect(() => {
    reset();
  }, [mode, reset]);

  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((t) => {
          if (t <= 1) {
            setRunning(false);
            if (mode === 'focus') setSessions((s) => s + 1);
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
    <div className="rounded-xl border border-border bg-card p-5 fade-up stagger-3">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-foreground">Pomodoro Timer</h3>
        <div className="flex items-center gap-1">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={`session-dot-${i + 1}`}
              className="w-2 h-2 rounded-full transition-colors"
              style={{ background: i < sessions ? color : 'var(--card-elevated)', border: `1px solid ${i < sessions ? color : 'var(--border)'}` }}
            />
          ))}
        </div>
      </div>

      <div className="flex border border-border rounded-lg overflow-hidden mb-5 text-xs">
        {(Object.keys(MODES) as TimerMode[]).map((m) => (
          <button
            key={`timer-mode-${m}`}
            onClick={() => setMode(m)}
            className="btn-press flex-1 py-1.5 font-medium transition-all"
            style={{
              background: mode === m ? `${MODES[m].color}22` : 'transparent',
              color: mode === m ? MODES[m].color : 'var(--muted-foreground)',
            }}>
            {MODES[m].label}
          </button>
        ))}
      </div>

      <div className="flex flex-col items-center">
        <div className="relative w-32 h-32 mb-4">
          <svg className="w-32 h-32 -rotate-90" viewBox="0 0 120 120">
            <circle cx="60" cy="60" r="54" fill="none" stroke="var(--card-elevated)" strokeWidth="6" />
            <circle
              cx="60" cy="60" r="54" fill="none"
              stroke={color} strokeWidth="6"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={dashOffset}
              style={{ transition: running ? 'stroke-dashoffset 1s linear' : 'none' }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="font-mono text-2xl font-bold tabular-nums text-foreground">{formatTime(timeLeft)}</span>
            <span className="text-[10px] text-muted-foreground">{MODES[mode].label}</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setRunning((r) => !r)}
            className="btn-press flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-semibold text-white transition-all"
            style={{ background: color }}>
            {running ? <Pause size={14} /> : <Play size={14} />}
            {running ? 'Pause' : 'Start'}
          </button>
          <button
            onClick={reset}
            className="btn-press p-2 rounded-lg bg-card-elevated border border-border hover:border-primary transition-colors">
            <RotateCcw size={15} className="text-muted-foreground" />
          </button>
        </div>

        <p className="text-xs text-muted-foreground mt-3">{sessions} sessions completed today</p>
      </div>
    </div>
  );
}
