'use client';
import React, { useState, useEffect, useRef } from 'react';
import AppLayout from '@/components/AppLayout';

// ─── Data ───────────────────────────────────────────────────────────────────

const stats = [
  { label: 'Day Streak', value: '14', emoji: '🔥' },
  { label: 'Kanji Learned', value: '312', emoji: '漢' },
  { label: 'Words Mastered', value: '1,048', emoji: '📖' },
  { label: 'Study Hours', value: '87', emoji: '⏱️' },
];

const jlptLevels = [
  { level: 'N5', progress: 100, color: 'bg-green-500', status: 'Completed' },
  { level: 'N4', progress: 100, color: 'bg-green-500', status: 'Completed' },
  { level: 'N3', progress: 72,  color: 'bg-yellow-500', status: 'In Progress' },
  { level: 'N2', progress: 15,  color: 'bg-blue-500',  status: 'Started' },
  { level: 'N1', progress: 0,   color: 'bg-gray-300',  status: 'Locked' },
];

const kanji = [
  { char: '日', meaning: 'Sun/Day',      reading: 'にち・ひ',     level: 'N5' },
  { char: '本', meaning: 'Origin/Book',  reading: 'ほん・もと',   level: 'N5' },
  { char: '語', meaning: 'Language',     reading: 'ご・かたる',   level: 'N4' },
  { char: '勉', meaning: 'Diligence',    reading: 'べん',         level: 'N4' },
  { char: '強', meaning: 'Strong',       reading: 'きょう・つよい', level: 'N4' },
  { char: '練', meaning: 'Practice',     reading: 'れん',         level: 'N3' },
];

const vocab = [
  { word: '勉強',   reading: 'べんきょう', meaning: 'Study',         level: 'N5' },
  { word: '練習',   reading: 'れんしゅう', meaning: 'Practice',      level: 'N4' },
  { word: '図書館', reading: 'としょかん', meaning: 'Library',       level: 'N4' },
  { word: '言葉',   reading: 'ことば',     meaning: 'Word/Language', level: 'N3' },
  { word: '辞書',   reading: 'じしょ',     meaning: 'Dictionary',    level: 'N4' },
];

const activities = [
  { icon: '✅', text: 'Completed N3 quiz',    time: '2m ago'   },
  { icon: '漢', text: 'Learned 5 new kanji',  time: '1h ago'   },
  { icon: '🔥', text: '14-day streak!',       time: '3h ago'   },
  { icon: '📖', text: 'Read 2 vocab lessons', time: 'Yesterday' },
  { icon: '⭐', text: 'Reached Level 12',     time: '2d ago'   },
];

const MODES = { focus: 25 * 60, short: 5 * 60, long: 15 * 60 };
type Mode = keyof typeof MODES;

// ─── Components ─────────────────────────────────────────────────────────────

function WelcomeBanner() {
  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'おはようございます' : hour < 18 ? 'こんにちは' : 'こんばんは';
  return (
    <div className="rounded-2xl bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-600 p-6 text-white shadow-lg">
      <p className="text-sm font-medium opacity-80">{greeting} 👋</p>
      <h1 className="mt-1 text-2xl font-bold">Welcome back, Student!</h1>
      <p className="mt-1 text-sm opacity-70">Keep up your Japanese study streak 🔥</p>
    </div>
  );
}

function StatsGrid() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
      {stats.map((s) => (
        <div key={s.label} className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800">
          <div className="text-2xl">{s.emoji}</div>
          <p className="mt-2 text-2xl font-bold text-gray-900 dark:text-white">{s.value}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400">{s.label}</p>
        </div>
      ))}
    </div>
  );
}

function XPLevelCard() {
  const xp = 2340, nextLevel = 3000, level = 12;
  const pct = Math.round((xp / nextLevel) * 100);
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-800">
      <div className="flex items-center justify-between">
        <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">Level {level}</span>
        <span className="rounded-full bg-indigo-100 px-2 py-0.5 text-xs font-bold text-indigo-600 dark:bg-indigo-900 dark:text-indigo-300">
          ⭐ {xp} XP
        </span>
      </div>
      <div className="mt-3 h-2.5 w-full rounded-full bg-gray-200 dark:bg-gray-700">
        <div className="h-2.5 rounded-full bg-gradient-to-r from-indigo-500 to-violet-500 transition-all" style={{ width: `${pct}%` }} />
      </div>
      <p className="mt-1.5 text-xs text-gray-400">{xp} / {nextLevel} XP to Level {level + 1}</p>
    </div>
  );
}

function JLPTLevelCards() {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-800">
      <h2 className="mb-4 text-sm font-semibold text-gray-700 dark:text-gray-300">JLPT Progress</h2>
      <div className="space-y-3">
        {jlptLevels.map((l) => (
          <div key={l.level} className="flex items-center gap-3">
            <span className="w-8 text-sm font-bold text-gray-800 dark:text-gray-200">{l.level}</span>
            <div className="flex-1 h-2 rounded-full bg-gray-100 dark:bg-gray-700">
              <div className={`h-2 rounded-full ${l.color}`} style={{ width: `${l.progress}%` }} />
            </div>
            <span className="w-20 text-right text-xs text-gray-400">{l.status}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function KanjiSection() {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-800">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-sm font-semibold text-gray-700 dark:text-gray-300">Recent Kanji</h2>
        <button className="text-xs text-indigo-500 hover:underline">View all →</button>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {kanji.map((k) => (
          <div key={k.char} className="flex items-center gap-3 rounded-lg border border-gray-100 p-3 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-700/50">
            <span className="text-3xl font-bold text-gray-800 dark:text-white">{k.char}</span>
            <div>
              <p className="text-xs font-medium text-gray-700 dark:text-gray-300">{k.meaning}</p>
              <p className="text-xs text-gray-400">{k.reading}</p>
              <span className="mt-0.5 inline-block rounded bg-indigo-50 px-1 text-[10px] text-indigo-500 dark:bg-indigo-900/40">{k.level}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function VocabSection() {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-800">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-sm font-semibold text-gray-700 dark:text-gray-300">Vocabulary</h2>
        <button className="text-xs text-indigo-500 hover:underline">View all →</button>
      </div>
      <div className="divide-y divide-gray-100 dark:divide-gray-700">
        {vocab.map((v) => (
          <div key={v.word} className="flex items-center justify-between py-2.5">
            <div className="flex items-center gap-3">
              <span className="text-lg font-bold text-gray-800 dark:text-white">{v.word}</span>
              <span className="text-xs text-gray-400">{v.reading}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600 dark:text-gray-300">{v.meaning}</span>
              <span className="rounded bg-violet-50 px-1.5 py-0.5 text-[10px] font-semibold text-violet-500 dark:bg-violet-900/40">{v.level}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function PomodoroTimer() {
  const [mode, setMode] = useState<Mode>('focus');
  const [seconds, setSeconds] = useState(MODES.focus);
  const [running, setRunning] = useState(false);
  const ref = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => { setSeconds(MODES[mode]); setRunning(false); }, [mode]);
  useEffect(() => {
    if (running) ref.current = setInterval(() => setSeconds((s) => (s > 0 ? s - 1 : 0)), 1000);
    else if (ref.current) clearInterval(ref.current);
    return () => { if (ref.current) clearInterval(ref.current); };
  }, [running]);

  const fmt = (s: number) =>
    `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-800 text-center">
      <h2 className="mb-3 text-sm font-semibold text-gray-700 dark:text-gray-300">Pomodoro Timer</h2>
      <div className="flex justify-center gap-1 mb-4">
        {(Object.keys(MODES) as Mode[]).map((m) => (
          <button key={m} onClick={() => setMode(m)}
            className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
              mode === m ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-500 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-400'
            }`}>
            {m === 'focus' ? 'Focus' : m === 'short' ? 'Short' : 'Long'}
          </button>
        ))}
      </div>
      <p className="text-5xl font-bold tabular-nums text-gray-900 dark:text-white">{fmt(seconds)}</p>
      <div className="mt-4 flex justify-center gap-2">
        <button onClick={() => setRunning((r) => !r)}
          className="rounded-lg bg-indigo-600 px-6 py-2 text-sm font-semibold text-white hover:bg-indigo-700 transition-colors">
          {running ? 'Pause' : 'Start'}
        </button>
        <button onClick={() => { setRunning(false); setSeconds(MODES[mode]); }}
          className="rounded-lg border border-gray-200 px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-400">
          Reset
        </button>
      </div>
    </div>
  );
}

function ActivityFeed() {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-800">
      <h2 className="mb-4 text-sm font-semibold text-gray-700 dark:text-gray-300">Recent Activity</h2>
      <div className="space-y-3">
        {activities.map((a, i) => (
          <div key={i} className="flex items-start gap-3">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-indigo-50 text-sm dark:bg-indigo-900/30">
              {a.icon}
            </span>
            <div className="flex-1 min-w-0">
              <p className="text-xs text-gray-700 dark:text-gray-300">{a.text}</p>
              <p className="text-[10px] text-gray-400">{a.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default function DashboardPage() {
  return (
    <AppLayout>
      <div className="max-w-screen-2xl mx-auto px-4 lg:px-6 xl:px-8 2xl:px-10 py-6 space-y-6">
        <WelcomeBanner />
        <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          <div className="lg:col-span-2 xl:col-span-3 space-y-5">
            <StatsGrid />
            <JLPTLevelCards />
            <KanjiSection />
            <VocabSection />
          </div>
          <div className="space-y-5">
            <XPLevelCard />
            <PomodoroTimer />
            <ActivityFeed />
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
