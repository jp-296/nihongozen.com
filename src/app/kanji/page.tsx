'use client';
import React, { useState } from 'react';
import AppLayout from '@/components/AppLayout';
import { Volume2, X, BookOpen, Search } from 'lucide-react';

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
    { id: 'k-n5-013', kanji: '下', reading: 'した・か', meaning: 'Below / Down', kun: 'した、くだ', on: 'カ、ゲ', example: '机の下にある。', exampleMeaning: 'It is under the desk.', learned: true },
    { id: 'k-n5-014', kanji: '中', reading: 'なか・ちゅう', meaning: 'Middle / Inside', kun: 'なか', on: 'チュウ', example: '箱の中に入れる。', exampleMeaning: 'Put it inside the box.', learned: false },
    { id: 'k-n5-015', kanji: '国', reading: 'くに・こく', meaning: 'Country', kun: 'くに', on: 'コク', example: '日本は美しい国です。', exampleMeaning: 'Japan is a beautiful country.', learned: true },
    { id: 'k-n5-016', kanji: '年', reading: 'とし・ねん', meaning: 'Year', kun: 'とし', on: 'ネン', example: '今年は何年ですか。', exampleMeaning: 'What year is this year?', learned: true },
    { id: 'k-n5-017', kanji: '生', reading: 'い・せい', meaning: 'Life / Birth', kun: 'い、う', on: 'セイ、ショウ', example: '学生です。', exampleMeaning: 'I am a student.', learned: false },
    { id: 'k-n5-018', kanji: '先', reading: 'さき・せん', meaning: 'Before / Previous', kun: 'さき', on: 'セン', example: '先生に聞く。', exampleMeaning: 'Ask the teacher.', learned: true },
    { id: 'k-n5-019', kanji: '学', reading: 'まな・がく', meaning: 'Study / Learn', kun: 'まな', on: 'ガク', example: '日本語を学ぶ。', exampleMeaning: 'Study Japanese.', learned: true },
    { id: 'k-n5-020', kanji: '校', reading: 'こう', meaning: 'School', kun: '', on: 'コウ', example: '学校に行く。', exampleMeaning: 'Go to school.', learned: true },
  ],
  N4: [
    { id: 'k-n4-001', kanji: '駅', reading: 'えき', meaning: 'Station', kun: '', on: 'エキ', example: '駅まで歩きます。', exampleMeaning: 'I walk to the station.', learned: true },
    { id: 'k-n4-002', kanji: '映', reading: 'えい', meaning: 'Reflect / Movie', kun: 'うつ', on: 'エイ', example: '映画を見ました。', exampleMeaning: 'I watched a movie.', learned: false },
    { id: 'k-n4-003', kanji: '運', reading: 'うん・はこ', meaning: 'Transport / Luck', kun: 'はこ', on: 'ウン', example: '運動が好きです。', exampleMeaning: 'I like exercise.', learned: true },
    { id: 'k-n4-004', kanji: '開', reading: 'ひら・かい', meaning: 'Open', kun: 'ひら、あ', on: 'カイ', example: 'ドアを開けてください。', exampleMeaning: 'Please open the door.', learned: false },
    { id: 'k-n4-005', kanji: '去', reading: 'さ・きょ', meaning: 'Past / Leave', kun: 'さ', on: 'キョ、コ', example: '去年日本に行った。', exampleMeaning: 'I went to Japan last year.', learned: true },
    { id: 'k-n4-006', kanji: '急', reading: 'いそ・きゅう', meaning: 'Hurry / Sudden', kun: 'いそ', on: 'キュウ', example: '急いでください！', exampleMeaning: 'Please hurry!', learned: true },
    { id: 'k-n4-007', kanji: '近', reading: 'ちか・きん', meaning: 'Near / Close', kun: 'ちか', on: 'キン', example: '駅の近くに住む。', exampleMeaning: 'Live near the station.', learned: false },
    { id: 'k-n4-008', kanji: '強', reading: 'つよ・きょう', meaning: 'Strong', kun: 'つよ', on: 'キョウ', example: '強い風が吹く。', exampleMeaning: 'A strong wind blows.', learned: true },
    { id: 'k-n4-009', kanji: '教', reading: 'おし・きょう', meaning: 'Teach', kun: 'おし', on: 'キョウ', example: '英語を教える。', exampleMeaning: 'Teach English.', learned: true },
    { id: 'k-n4-010', kanji: '銀', reading: 'ぎん', meaning: 'Silver / Bank', kun: '', on: 'ギン', example: '銀行に行く。', exampleMeaning: 'Go to the bank.', learned: false },
    { id: 'k-n4-011', kanji: '計', reading: 'はか・けい', meaning: 'Measure / Plan', kun: 'はか', on: 'ケイ', example: '時計を見る。', exampleMeaning: 'Look at the clock.', learned: true },
    { id: 'k-n4-012', kanji: '建', reading: 'た・けん', meaning: 'Build / Construct', kun: 'た', on: 'ケン', example: '建物が高い。', exampleMeaning: 'The building is tall.', learned: false },
  ],
  N3: [
    { id: 'k-n3-001', kanji: '影', reading: 'かげ・えい', meaning: 'Shadow / Influence', kun: 'かげ', on: 'エイ', example: '影響を受けました。', exampleMeaning: 'I was influenced.', learned: false },
    { id: 'k-n3-002', kanji: '演', reading: 'えん', meaning: 'Perform / Demonstrate', kun: '', on: 'エン', example: '演劇を楽しんだ。', exampleMeaning: 'Enjoyed the play.', learned: false },
    { id: 'k-n3-003', kanji: '応', reading: 'おう', meaning: 'Answer / Respond', kun: 'こた', on: 'オウ', example: '応援してください。', exampleMeaning: 'Please cheer for me.', learned: true },
    { id: 'k-n3-004', kanji: '横', reading: 'よこ・おう', meaning: 'Side / Horizontal', kun: 'よこ', on: 'オウ', example: '横断歩道を渡る。', exampleMeaning: 'Cross the crosswalk.', learned: false },
    { id: 'k-n3-005', kanji: '温', reading: 'あたた・おん', meaning: 'Warm / Temperature', kun: 'あたた', on: 'オン', example: '温かいお茶を飲む。', exampleMeaning: 'Drink warm tea.', learned: true },
    { id: 'k-n3-006', kanji: '化', reading: 'か', meaning: 'Change / Transform', kun: 'ば', on: 'カ、ケ', example: '文化を学ぶ。', exampleMeaning: 'Learn about culture.', learned: false },
    { id: 'k-n3-007', kanji: '価', reading: 'か', meaning: 'Value / Price', kun: 'ね', on: 'カ', example: '価格が高い。', exampleMeaning: 'The price is high.', learned: false },
    { id: 'k-n3-008', kanji: '果', reading: 'は・か', meaning: 'Fruit / Result', kun: 'は', on: 'カ', example: '結果を見る。', exampleMeaning: 'See the result.', learned: true },
  ],
  N2: [
    { id: 'k-n2-001', kanji: '握', reading: 'にぎ', meaning: 'Grip / Hold', kun: 'にぎ', on: 'アク', example: '手を握る。', exampleMeaning: 'Grip the hand.', learned: false },
    { id: 'k-n2-002', kanji: '威', reading: 'い', meaning: 'Dignity / Authority', kun: '', on: 'イ', example: '威厳がある。', exampleMeaning: 'Has dignity.', learned: false },
    { id: 'k-n2-003', kanji: '慰', reading: 'なぐさ', meaning: 'Comfort / Console', kun: 'なぐさ', on: 'イ', example: '慰める言葉。', exampleMeaning: 'Words of comfort.', learned: false },
    { id: 'k-n2-004', kanji: '維', reading: 'い', meaning: 'Maintain / Fiber', kun: '', on: 'イ', example: '維持する。', exampleMeaning: 'Maintain.', learned: false },
  ],
  N1: [
    { id: 'k-n1-001', kanji: '曖', reading: 'あい', meaning: 'Vague / Ambiguous', kun: '', on: 'アイ', example: '曖昧な返事。', exampleMeaning: 'An ambiguous answer.', learned: false },
    { id: 'k-n1-002', kanji: '彙', reading: 'い', meaning: 'Vocabulary / Collect', kun: '', on: 'イ', example: '語彙を増やす。', exampleMeaning: 'Expand vocabulary.', learned: false },
    { id: 'k-n1-003', kanji: '韻', reading: 'いん', meaning: 'Rhyme / Echo', kun: '', on: 'イン', example: '韻を踏む。', exampleMeaning: 'Rhyme.', learned: false },
    { id: 'k-n1-004', kanji: '淫', reading: 'いん', meaning: 'Lewd / Excessive', kun: 'みだ', on: 'イン', example: '淫らな行為。', exampleMeaning: 'Lewd behavior.', learned: false },
  ],
};

type KanjiEntry = (typeof kanjiData.N5)[number];
type Level = 'N5' | 'N4' | 'N3' | 'N2' | 'N1';

const jlptColor = (level: string) => {
  const map: Record<string, string> = {
    N5: 'var(--jlpt-n5)', N4: 'var(--jlpt-n4)', N3: 'var(--jlpt-n3)',
    N2: 'var(--jlpt-n2)', N1: 'var(--jlpt-n1)',
  };
  return map[level] || 'var(--primary)';
};

export default function KanjiPage() {
  const [activeTab, setActiveTab] = useState<Level>('N5');
  const [selectedKanji, setSelectedKanji] = useState<KanjiEntry | null>(null);
  const [search, setSearch] = useState('');
  const [learnedSet, setLearnedSet] = useState<Set<string>>(
    new Set(Object.values(kanjiData).flat().filter(k => k.learned).map(k => k.id))
  );

  const tabs: Level[] = ['N5', 'N4', 'N3', 'N2', 'N1'];
  const currentKanji = (kanjiData[activeTab] || []).filter(k =>
    !search || k.kanji.includes(search) || k.meaning.toLowerCase().includes(search.toLowerCase()) || k.reading.includes(search)
  );

  const markLearned = (id: string) => {
    setLearnedSet(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const speak = (text: string) => {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.cancel();
      const utt = new SpeechSynthesisUtterance(text);
      utt.lang = 'ja-JP';
      utt.rate = 0.8;
      window.speechSynthesis.speak(utt);
    }
  };

  return (
    <AppLayout>
      <div className="max-w-screen-xl mx-auto px-4 lg:px-6 py-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-foreground mb-1">漢字 Kanji Study</h1>
          <p className="text-sm text-muted-foreground">Master kanji characters from N5 to N1 level</p>
        </div>

        {/* Level tabs + search */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mb-5">
          <div className="flex rounded-xl border border-border bg-card overflow-hidden">
            {tabs.map((tab) => (
              <button
                key={`ktab-${tab}`}
                onClick={() => setActiveTab(tab)}
                className="btn-press px-4 py-2.5 text-sm font-semibold transition-all relative"
                style={{
                  color: activeTab === tab ? jlptColor(tab) : 'var(--muted-foreground)',
                  background: activeTab === tab ? `${jlptColor(tab)}18` : 'transparent',
                  borderBottom: activeTab === tab ? `2px solid ${jlptColor(tab)}` : '2px solid transparent',
                }}
              >
                {tab}
              </button>
            ))}
          </div>
          <div className="relative flex-1 max-w-xs">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search kanji, meaning..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-border bg-card text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
            />
          </div>
          <span className="text-xs text-muted-foreground ml-auto">
            {learnedSet.size} learned · {currentKanji.length} shown
          </span>
        </div>

        {/* Kanji grid */}
        <div className="grid gap-2" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(90px, 1fr))' }}>
          {currentKanji.map((k) => (
            <button
              key={k.id}
              onClick={() => setSelectedKanji(k)}
              className="btn-press group relative rounded-xl border bg-card p-3 flex flex-col items-center gap-1.5 transition-all hover:border-primary hover:-translate-y-0.5"
              style={{ borderColor: learnedSet.has(k.id) ? `${jlptColor(activeTab)}55` : 'var(--border)' }}
            >
              {learnedSet.has(k.id) && (
                <div className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full" style={{ background: jlptColor(activeTab) }} />
              )}
              <span className="font-serif-jp text-3xl leading-none" style={{ color: jlptColor(activeTab) }}>
                {k.kanji}
              </span>
              <span className="font-mono text-[9px] text-muted-foreground text-center leading-tight truncate w-full">
                {k.reading.split('・')[0]}
              </span>
              <span className="text-[9px] text-foreground-subtle text-center leading-tight truncate w-full">
                {k.meaning.split(' / ')[0]}
              </span>
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-card/80 rounded-xl">
                <Volume2 size={16} className="text-primary" />
              </div>
            </button>
          ))}
        </div>

        {currentKanji.length === 0 && (
          <div className="text-center py-16 text-muted-foreground">
            <p className="text-4xl mb-3">🔍</p>
            <p className="text-sm">No kanji found for &quot;{search}&quot;</p>
          </div>
        )}
      </div>

      {/* Kanji Modal */}
      {selectedKanji && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: 'rgba(0,0,0,0.8)' }}
          onClick={(e) => { if (e.target === e.currentTarget) setSelectedKanji(null); }}
        >
          <div className="w-full max-w-md rounded-2xl border border-border bg-card p-6 shadow-2xl"
            style={{ animation: 'fadeUp 0.2s ease forwards' }}>
            <div className="flex items-start justify-between mb-5">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => speak(selectedKanji.kanji)}
                  className="btn-press relative group"
                >
                  <span className="font-serif-jp leading-none" style={{ fontSize: '5rem', color: jlptColor(activeTab) }}>
                    {selectedKanji.kanji}
                  </span>
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-card/70 rounded-lg">
                    <Volume2 size={20} className="text-primary" />
                  </div>
                </button>
                <div>
                  <div className="px-2 py-0.5 rounded text-xs font-bold font-mono mb-2 inline-block"
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
                { label: 'On Reading 音', value: selectedKanji.on, speakVal: selectedKanji.on },
                { label: 'Kun Reading 訓', value: selectedKanji.kun || '—', speakVal: selectedKanji.kun },
                { label: 'Meaning 意味', value: selectedKanji.meaning, speakVal: null },
                { label: 'JLPT Level', value: activeTab, speakVal: null },
              ].map((item) => (
                <div key={`modal-${item.label}`} className="rounded-lg bg-card-elevated border border-border p-3">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] text-muted-foreground">{item.label}</span>
                    {item.speakVal && (
                      <button onClick={() => item.speakVal && speak(item.speakVal)}
                        className="btn-press p-0.5 rounded hover:bg-card transition-colors">
                        <Volume2 size={11} className="text-primary" />
                      </button>
                    )}
                  </div>
                  <p className="font-mono text-sm text-foreground">{item.value}</p>
                </div>
              ))}
            </div>

            <div className="rounded-lg bg-card-elevated border border-border p-3 mb-4">
              <div className="flex items-center gap-2 mb-2">
                <BookOpen size={13} className="text-muted-foreground" />
                <span className="text-xs text-muted-foreground">Example Sentence</span>
                <button onClick={() => speak(selectedKanji.example)}
                  className="btn-press ml-auto flex items-center gap-1 text-[10px] text-primary hover:opacity-80">
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
    </AppLayout>
  );
}
