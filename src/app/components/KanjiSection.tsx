'use client';
import React, { useState } from 'react';
import { Volume2, X, BookOpen } from 'lucide-react';

const kanjiData: Record<string, Array<{
  id: string; kanji: string; reading: string; meaning: string;
  kun: string; on: string; example: string; exampleMeaning: string; learned: boolean;
}>> = {
  N5: [
    { id: 'k-n5-001', kanji: '日', reading: 'にち・ひ', meaning: 'Sun / Day', kun: 'ひ、か', on: 'ニチ、ジツ', example: '今日は晴れです。', exampleMeaning: 'Today is sunny.', learned: true },
    { id: 'k-n5-002', kanji: '月', reading: 'つき・げつ', meaning: 'Moon / Month', kun: 'つき', on: 'ゲツ、ガツ', example: '月曜日に会います。', exampleMeaning: 'We meet on Monday.', learned: true },
    { id: 'k-n5-003', kanji: '山', reading: 'やま・さん', meaning: 'Mountain', kun: 'やま', on: 'サン', example: '富士山は美しい。', exampleMeaning: 'Mt. Fuji is beautiful.', learned: true },
    { id: 'k-n5-004', kanji: '川', reading: 'かわ・せん', meaning: 'River', kun: 'かわ', on: 'セン', example: '川で泳ぎます。', exampleMeaning: 'I swim in the river.', learned: false },
    { id: 'k-n5-005', kanji: '木', reading: 'き・もく', meaning: 'Tree / Wood', kun: 'き、こ', on: 'モク、ボク', example: '木の下で休む。', exampleMeaning: 'Rest under the tree.', learned: true },
    { id: 'k-n5-006', kanji: '火', reading: 'ひ・か', meaning: 'Fire', kun: 'ひ', on: 'カ', example: '火曜日は忙しい。', exampleMeaning: 'Tuesday is busy.', learned: true },
    { id: 'k-n5-007', kanji: '水', reading: 'みず・すい', meaning: 'Water', kun: 'みず', on: 'スイ', example: '水を飲んでください。', exampleMeaning: 'Please drink water.', learned: false },
    { id: 'k-n5-008', kanji: '土', reading: 'つち・ど', meaning: 'Earth / Soil', kun: 'つち', on: 'ド、ト', example: '土曜日に遊ぶ。', exampleMeaning: 'Play on Saturday.', learned: true },
    { id: 'k-n5-009', kanji: '人', reading: 'ひと・じん', meaning: 'Person', kun: 'ひと', on: 'ジン、ニン', example: 'あの人は先生です。', exampleMeaning: 'That person is a teacher.', learned: true },
    { id: 'k-n5-010', kanji: '大', reading: 'おお・だい', meaning: 'Big / Large', kun: 'おお', on: 'ダイ、タイ', example: '大きな犬がいる。', exampleMeaning: 'There is a big dog.', learned: false },
    { id: 'k-n5-011', kanji: '小', reading: 'ちい・しょう', meaning: 'Small', kun: 'ちい、こ', on: 'ショウ', example: '小さい猫が好き。', exampleMeaning: 'I like small cats.', learned: true },
    { id: 'k-n5-012', kanji: '上', reading: 'うえ・じょう', meaning: 'Above / Up', kun: 'うえ、のぼ', on: 'ジョウ', example: '机の上にある。', exampleMeaning: 'It is on the desk.', learned: true },
  ],
  N4: [
    { id: 'k-n4-001', kanji: '駅', reading: 'えき', meaning: 'Station', kun: '', on: 'エキ', example: '駅まで歩きます。', exampleMeaning: 'I walk to the station.', learned: true },
    { id: 'k-n4-002', kanji: '映', reading: 'えい', meaning: 'Reflect / Movie', kun: 'うつ', on: 'エイ', example: '映画を見ました。', exampleMeaning: 'I watched a movie.', learned: false },
    { id: 'k-n4-003', kanji: '運', reading: 'うん・はこ', meaning: 'Transport / Luck', kun: 'はこ', on: 'ウン', example: '運動が好きです。', exampleMeaning: 'I like exercise.', learned: true },
    { id: 'k-n4-004', kanji: '開', reading: 'ひら・かい', meaning: 'Open', kun: 'ひら、あ', on: 'カイ', example: 'ドアを開けてください。', exampleMeaning: 'Please open the door.', learned: false },
    { id: 'k-n4-005', kanji: '去', reading: 'さ・きょ', meaning: 'Past / Leave', kun: 'さ', on: 'キョ、コ', example: '去年日本に行った。', exampleMeaning: 'I went to Japan last year.', learned: true },
    { id: 'k-n4-006', kanji: '急', reading: 'いそ・きゅう', meaning: 'Hurry / Sudden', kun: 'いそ', on: 'キュウ', example: '急いでください！', exampleMeaning: 'Please hurry!', learned: true },
  ],
  N3: [
    { id: 'k-n3-001', kanji: '影', reading: 'かげ・えい', meaning: 'Shadow / Influence', kun: 'かげ', on: 'エイ', example: '影響を受けました。', exampleMeaning: 'I was influenced.', learned: false },
    { id: 'k-n3-002', kanji: '演', reading: 'えん', meaning: 'Perform / Demonstrate', kun: '', on: 'エン', example: '演劇を楽しんだ。', exampleMeaning: 'Enjoyed the play.', learned: false },
    { id: 'k-n3-003', kanji: '応', reading: 'おう', meaning: 'Answer / Respond', kun: 'こた', on: 'オウ', example: '応援してください。', exampleMeaning: 'Please cheer for me.', learned: true },
    { id: 'k-n3-004', kanji: '横', reading: 'よこ・おう', meaning: 'Side / Horizontal', kun: 'よこ', on: 'オウ', example: '横断歩道を渡る。', exampleMeaning: 'Cross the crosswalk.', learned: false },
  ],
};

type KanjiEntry = (typeof kanjiData.N5)[number];

export default function KanjiSection() {
  const [activeTab, setActiveTab] = useState<'N5' | 'N4' | 'N3'>('N5');
  const [selectedKanji, setSelectedKanji] = useState<KanjiEntry | null>(null);
  const [learnedSet, setLearnedSet] = useState<Set<string>>(
    new Set(Object.values(kanjiData).flat().filter(k => k.learned).map(k => k.id))
  );

  const tabs = ['N5', 'N4', 'N3'] as const;
  const currentKanji = kanjiData[activeTab] || [];

  const jlptColor = (level: string) => {
    const map: Record<string, string> = { N5: 'var(--jlpt-n5)', N4: 'var(--jlpt-n4)', N3: 'var(--jlpt-n3)' };
    return map[level] || 'var(--primary)';
  };

  const markLearned = (id: string) => {
    setLearnedSet(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <div className="fade-up stagger-4">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-base font-semibold text-foreground">Kanji Study</h2>
        <span className="text-xs text-muted-foreground">{learnedSet.size} learned</span>
      </div>

      <div className="rounded-xl border border-border bg-card overflow-hidden">
        <div className="flex border-b border-border bg-card-elevated">
          {tabs.map((tab) => (
            <button
              key={`kanji-tab-${tab}`}
              onClick={() => setActiveTab(tab)}
              className="btn-press flex-1 py-3 text-sm font-medium transition-all relative"
              style={{
                color: activeTab === tab ? jlptColor(tab) : 'var(--muted-foreground)',
                background: activeTab === tab ? 'var(--card)' : 'transparent',
              }}
            >
              {tab}
              {activeTab === tab && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full"
                  style={{ background: jlptColor(tab) }} />
              )}
            </button>
          ))}
        </div>

        <div className="p-4 grid gap-2"
          style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(80px, 1fr))' }}>
          {currentKanji.map((k) => (
            <button
              key={k.id}
              onClick={() => setSelectedKanji(k)}
              className="btn-press group relative rounded-lg border bg-card-elevated p-2 flex flex-col items-center gap-1 transition-all hover:border-primary"
              style={{
                borderColor: learnedSet.has(k.id) ? `${jlptColor(activeTab)}44` : 'var(--border)',
              }}
            >
              {learnedSet.has(k.id) && (
                <div className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full" style={{ background: jlptColor(activeTab) }} />
              )}
              <span className="font-serif-jp text-2xl leading-none" style={{ color: jlptColor(activeTab) }}>
                {k.kanji}
              </span>
              <span className="font-mono text-[9px] text-muted-foreground text-center leading-tight truncate w-full text-center">
                {k.reading.split('・')[0]}
              </span>
              <span className="text-[9px] text-foreground-subtle text-center leading-tight truncate w-full text-center">
                {k.meaning.split(' / ')[0]}
              </span>
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-card-elevated/80 rounded-lg">
                <Volume2 size={14} className="text-primary" />
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Kanji Modal */}
      {selectedKanji && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: 'rgba(0,0,0,0.8)' }}
          onClick={(e) => { if (e.target === e.currentTarget) setSelectedKanji(null); }}>
          <div className="w-full max-w-md rounded-2xl border border-border bg-card p-6 shadow-2xl"
            style={{ animation: 'fadeUp 0.2s ease forwards' }}>
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <span className="font-serif-jp leading-none" style={{ fontSize: '5rem', color: jlptColor(activeTab) }}>
                  {selectedKanji.kanji}
                </span>
                <div>
                  <div className="px-2 py-0.5 rounded text-xs font-bold font-mono mb-1 inline-block"
                    style={{ background: `${jlptColor(activeTab)}22`, color: jlptColor(activeTab), border: `1px solid ${jlptColor(activeTab)}` }}>
                    {activeTab}
                  </div>
                  <p className="font-mono text-sm text-muted-foreground">{selectedKanji.reading}</p>
                  <p className="text-sm font-semibold text-foreground">{selectedKanji.meaning}</p>
                </div>
              </div>
              <button onClick={() => setSelectedKanji(null)}
                className="btn-press p-2 rounded-lg hover:bg-card-elevated transition-colors">
                <X size={18} className="text-muted-foreground" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-4">
              {[
                { label: 'On Reading', value: selectedKanji.on, icon: '音' },
                { label: 'Kun Reading', value: selectedKanji.kun || '—', icon: '訓' },
                { label: 'Meaning', value: selectedKanji.meaning, icon: '意' },
                { label: 'JLPT Level', value: activeTab, icon: '級' },
              ].map((item) => (
                <div key={`modal-${item.label}`} className="rounded-lg bg-card-elevated border border-border p-3">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] text-muted-foreground uppercase tracking-wide">{item.label}</span>
                    <span className="font-serif-jp text-xs text-muted-foreground">{item.icon}</span>
                  </div>
                  <p className="font-mono text-sm text-foreground">{item.value}</p>
                  <button className="mt-1 flex items-center gap-1 text-[10px] text-primary hover:opacity-80">
                    <Volume2 size={10} /> Speak
                  </button>
                </div>
              ))}
            </div>

            <div className="rounded-lg bg-card-elevated border border-border p-3 mb-4">
              <div className="flex items-center gap-2 mb-2">
                <BookOpen size={13} className="text-muted-foreground" />
                <span className="text-xs text-muted-foreground">Example Sentence</span>
                <button className="ml-auto flex items-center gap-1 text-[10px] text-primary hover:opacity-80">
                  <Volume2 size={10} /> Read aloud
                </button>
              </div>
              <p className="font-sans-jp text-sm text-foreground mb-1">{selectedKanji.example}</p>
              <p className="text-xs text-muted-foreground italic">{selectedKanji.exampleMeaning}</p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => markLearned(selectedKanji.id)}
                className="btn-press flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all"
                style={{
                  background: learnedSet.has(selectedKanji.id) ? 'var(--card-elevated)' : jlptColor(activeTab),
                  color: learnedSet.has(selectedKanji.id) ? jlptColor(activeTab) : '#fff',
                  border: `1px solid ${jlptColor(activeTab)}`,
                }}>
                {learnedSet.has(selectedKanji.id) ? '✓ Learned' : 'Mark as Learned'}
              </button>
              <button onClick={() => setSelectedKanji(null)}
                className="btn-press px-4 py-2.5 rounded-lg text-sm font-medium bg-card-elevated border border-border text-muted-foreground hover:text-foreground transition-colors">
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
