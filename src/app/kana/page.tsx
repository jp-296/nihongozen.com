'use client';
import React, { useState } from 'react';
import AppLayout from '@/components/AppLayout';
import { Volume2, Play } from 'lucide-react';

const hiragana = [
  { id: 'h-a', jp: 'あ', romaji: 'a' }, { id: 'h-i', jp: 'い', romaji: 'i' }, { id: 'h-u', jp: 'う', romaji: 'u' }, { id: 'h-e', jp: 'え', romaji: 'e' }, { id: 'h-o', jp: 'お', romaji: 'o' },
  { id: 'h-ka', jp: 'か', romaji: 'ka' }, { id: 'h-ki', jp: 'き', romaji: 'ki' }, { id: 'h-ku', jp: 'く', romaji: 'ku' }, { id: 'h-ke', jp: 'け', romaji: 'ke' }, { id: 'h-ko', jp: 'こ', romaji: 'ko' },
  { id: 'h-sa', jp: 'さ', romaji: 'sa' }, { id: 'h-shi', jp: 'し', romaji: 'shi' }, { id: 'h-su', jp: 'す', romaji: 'su' }, { id: 'h-se', jp: 'せ', romaji: 'se' }, { id: 'h-so', jp: 'そ', romaji: 'so' },
  { id: 'h-ta', jp: 'た', romaji: 'ta' }, { id: 'h-chi', jp: 'ち', romaji: 'chi' }, { id: 'h-tsu', jp: 'つ', romaji: 'tsu' }, { id: 'h-te', jp: 'て', romaji: 'te' }, { id: 'h-to', jp: 'と', romaji: 'to' },
  { id: 'h-na', jp: 'な', romaji: 'na' }, { id: 'h-ni', jp: 'に', romaji: 'ni' }, { id: 'h-nu', jp: 'ぬ', romaji: 'nu' }, { id: 'h-ne', jp: 'ね', romaji: 'ne' }, { id: 'h-no', jp: 'の', romaji: 'no' },
  { id: 'h-ha', jp: 'は', romaji: 'ha' }, { id: 'h-hi', jp: 'ひ', romaji: 'hi' }, { id: 'h-fu', jp: 'ふ', romaji: 'fu' }, { id: 'h-he', jp: 'へ', romaji: 'he' }, { id: 'h-ho', jp: 'ほ', romaji: 'ho' },
  { id: 'h-ma', jp: 'ま', romaji: 'ma' }, { id: 'h-mi', jp: 'み', romaji: 'mi' }, { id: 'h-mu', jp: 'む', romaji: 'mu' }, { id: 'h-me', jp: 'め', romaji: 'me' }, { id: 'h-mo', jp: 'も', romaji: 'mo' },
  { id: 'h-ya', jp: 'や', romaji: 'ya' }, { id: 'h-yu-empty', jp: '', romaji: '' }, { id: 'h-yu', jp: 'ゆ', romaji: 'yu' }, { id: 'h-ye-empty', jp: '', romaji: '' }, { id: 'h-yo', jp: 'よ', romaji: 'yo' },
  { id: 'h-ra', jp: 'ら', romaji: 'ra' }, { id: 'h-ri', jp: 'り', romaji: 'ri' }, { id: 'h-ru', jp: 'る', romaji: 'ru' }, { id: 'h-re', jp: 'れ', romaji: 're' }, { id: 'h-ro', jp: 'ろ', romaji: 'ro' },
  { id: 'h-wa', jp: 'わ', romaji: 'wa' }, { id: 'h-wi-empty', jp: '', romaji: '' }, { id: 'h-wo', jp: 'を', romaji: 'wo' }, { id: 'h-we-empty', jp: '', romaji: '' }, { id: 'h-n', jp: 'ん', romaji: 'n' },
];

const katakana = [
  { id: 'k-a', jp: 'ア', romaji: 'a' }, { id: 'k-i', jp: 'イ', romaji: 'i' }, { id: 'k-u', jp: 'ウ', romaji: 'u' }, { id: 'k-e', jp: 'エ', romaji: 'e' }, { id: 'k-o', jp: 'オ', romaji: 'o' },
  { id: 'k-ka', jp: 'カ', romaji: 'ka' }, { id: 'k-ki', jp: 'キ', romaji: 'ki' }, { id: 'k-ku', jp: 'ク', romaji: 'ku' }, { id: 'k-ke', jp: 'ケ', romaji: 'ke' }, { id: 'k-ko', jp: 'コ', romaji: 'ko' },
  { id: 'k-sa', jp: 'サ', romaji: 'sa' }, { id: 'k-shi', jp: 'シ', romaji: 'shi' }, { id: 'k-su', jp: 'ス', romaji: 'su' }, { id: 'k-se', jp: 'セ', romaji: 'se' }, { id: 'k-so', jp: 'ソ', romaji: 'so' },
  { id: 'k-ta', jp: 'タ', romaji: 'ta' }, { id: 'k-chi', jp: 'チ', romaji: 'chi' }, { id: 'k-tsu', jp: 'ツ', romaji: 'tsu' }, { id: 'k-te', jp: 'テ', romaji: 'te' }, { id: 'k-to', jp: 'ト', romaji: 'to' },
  { id: 'k-na', jp: 'ナ', romaji: 'na' }, { id: 'k-ni', jp: 'ニ', romaji: 'ni' }, { id: 'k-nu', jp: 'ヌ', romaji: 'nu' }, { id: 'k-ne', jp: 'ネ', romaji: 'ne' }, { id: 'k-no', jp: 'ノ', romaji: 'no' },
  { id: 'k-ha', jp: 'ハ', romaji: 'ha' }, { id: 'k-hi', jp: 'ヒ', romaji: 'hi' }, { id: 'k-fu', jp: 'フ', romaji: 'fu' }, { id: 'k-he', jp: 'ヘ', romaji: 'he' }, { id: 'k-ho', jp: 'ホ', romaji: 'ho' },
  { id: 'k-ma', jp: 'マ', romaji: 'ma' }, { id: 'k-mi', jp: 'ミ', romaji: 'mi' }, { id: 'k-mu', jp: 'ム', romaji: 'mu' }, { id: 'k-me', jp: 'メ', romaji: 'me' }, { id: 'k-mo', jp: 'モ', romaji: 'mo' },
  { id: 'k-ya', jp: 'ヤ', romaji: 'ya' }, { id: 'k-yu-empty', jp: '', romaji: '' }, { id: 'k-yu', jp: 'ユ', romaji: 'yu' }, { id: 'k-ye-empty', jp: '', romaji: '' }, { id: 'k-yo', jp: 'ヨ', romaji: 'yo' },
  { id: 'k-ra', jp: 'ラ', romaji: 'ra' }, { id: 'k-ri', jp: 'リ', romaji: 'ri' }, { id: 'k-ru', jp: 'ル', romaji: 'ru' }, { id: 'k-re', jp: 'レ', romaji: 're' }, { id: 'k-ro', jp: 'ロ', romaji: 'ro' },
  { id: 'k-wa', jp: 'ワ', romaji: 'wa' }, { id: 'k-wi-empty', jp: '', romaji: '' }, { id: 'k-wo', jp: 'ヲ', romaji: 'wo' }, { id: 'k-we-empty', jp: '', romaji: '' }, { id: 'k-n', jp: 'ン', romaji: 'n' },
];

const dakuten = [
  { id: 'd-ga', jp: 'が', romaji: 'ga' }, { id: 'd-gi', jp: 'ぎ', romaji: 'gi' }, { id: 'd-gu', jp: 'ぐ', romaji: 'gu' }, { id: 'd-ge', jp: 'げ', romaji: 'ge' }, { id: 'd-go', jp: 'ご', romaji: 'go' },
  { id: 'd-za', jp: 'ざ', romaji: 'za' }, { id: 'd-ji', jp: 'じ', romaji: 'ji' }, { id: 'd-zu', jp: 'ず', romaji: 'zu' }, { id: 'd-ze', jp: 'ぜ', romaji: 'ze' }, { id: 'd-zo', jp: 'ぞ', romaji: 'zo' },
  { id: 'd-da', jp: 'だ', romaji: 'da' }, { id: 'd-di', jp: 'ぢ', romaji: 'di' }, { id: 'd-du', jp: 'づ', romaji: 'du' }, { id: 'd-de', jp: 'で', romaji: 'de' }, { id: 'd-do', jp: 'ど', romaji: 'do' },
  { id: 'd-ba', jp: 'ば', romaji: 'ba' }, { id: 'd-bi', jp: 'び', romaji: 'bi' }, { id: 'd-bu', jp: 'ぶ', romaji: 'bu' }, { id: 'd-be', jp: 'べ', romaji: 'be' }, { id: 'd-bo', jp: 'ぼ', romaji: 'bo' },
  { id: 'd-pa', jp: 'ぱ', romaji: 'pa' }, { id: 'd-pi', jp: 'ぴ', romaji: 'pi' }, { id: 'd-pu', jp: 'ぷ', romaji: 'pu' }, { id: 'd-pe', jp: 'ぺ', romaji: 'pe' }, { id: 'd-po', jp: 'ぽ', romaji: 'po' },
];

const combinations = [
  { id: 'c-kya', jp: 'きゃ', romaji: 'kya' }, { id: 'c-kyu', jp: 'きゅ', romaji: 'kyu' }, { id: 'c-kyo', jp: 'きょ', romaji: 'kyo' },
  { id: 'c-sha', jp: 'しゃ', romaji: 'sha' }, { id: 'c-shu', jp: 'しゅ', romaji: 'shu' }, { id: 'c-sho', jp: 'しょ', romaji: 'sho' },
  { id: 'c-cha', jp: 'ちゃ', romaji: 'cha' }, { id: 'c-chu', jp: 'ちゅ', romaji: 'chu' }, { id: 'c-cho', jp: 'ちょ', romaji: 'cho' },
  { id: 'c-nya', jp: 'にゃ', romaji: 'nya' }, { id: 'c-nyu', jp: 'にゅ', romaji: 'nyu' }, { id: 'c-nyo', jp: 'にょ', romaji: 'nyo' },
  { id: 'c-hya', jp: 'ひゃ', romaji: 'hya' }, { id: 'c-hyu', jp: 'ひゅ', romaji: 'hyu' }, { id: 'c-hyo', jp: 'ひょ', romaji: 'hyo' },
  { id: 'c-mya', jp: 'みゃ', romaji: 'mya' }, { id: 'c-myu', jp: 'みゅ', romaji: 'myu' }, { id: 'c-myo', jp: 'みょ', romaji: 'myo' },
  { id: 'c-rya', jp: 'りゃ', romaji: 'rya' }, { id: 'c-ryu', jp: 'りゅ', romaji: 'ryu' }, { id: 'c-ryo', jp: 'りょ', romaji: 'ryo' },
  { id: 'c-gya', jp: 'ぎゃ', romaji: 'gya' }, { id: 'c-gyu', jp: 'ぎゅ', romaji: 'gyu' }, { id: 'c-gyo', jp: 'ぎょ', romaji: 'gyo' },
  { id: 'c-ja', jp: 'じゃ', romaji: 'ja' }, { id: 'c-ju', jp: 'じゅ', romaji: 'ju' }, { id: 'c-jo', jp: 'じょ', romaji: 'jo' },
];

type TabKey = 'hiragana' | 'katakana' | 'dakuten' | 'combinations';

const tabs: { key: TabKey; label: string; labelJp: string }[] = [
  { key: 'hiragana', label: 'Hiragana', labelJp: 'ひらがな' },
  { key: 'katakana', label: 'Katakana', labelJp: 'カタカナ' },
  { key: 'dakuten', label: 'Dakuten', labelJp: '濁点' },
  { key: 'combinations', label: 'Combinations', labelJp: '組み合わせ' },
];

const dataMap: Record<TabKey, typeof hiragana> = { hiragana, katakana, dakuten, combinations };

function speak(text: string, rate = 0.65) {
  if (typeof window !== 'undefined' && window.speechSynthesis && text) {
    window.speechSynthesis.cancel();
    const utt = new SpeechSynthesisUtterance(text);
    utt.lang = 'ja-JP';
    utt.rate = rate;
    window.speechSynthesis.speak(utt);
  }
}

export default function KanaPage() {
  const [activeTab, setActiveTab] = useState<TabKey>('hiragana');
  const [activeCell, setActiveCell] = useState<string | null>(null);
  const [isPlayingAll, setIsPlayingAll] = useState(false);

  const currentData = dataMap[activeTab].filter(c => c.jp);

  const playAll = async () => {
    if (isPlayingAll) {
      window.speechSynthesis?.cancel();
      setIsPlayingAll(false);
      setActiveCell(null);
      return;
    }
    setIsPlayingAll(true);
    for (const cell of currentData) {
      if (!cell.jp) continue;
      setActiveCell(cell.id);
      await new Promise<void>((resolve) => {
        if (!window.speechSynthesis) { resolve(); return; }
        const utt = new SpeechSynthesisUtterance(cell.jp);
        utt.lang = 'ja-JP';
        utt.rate = 0.65;
        utt.onend = () => setTimeout(resolve, 800);
        window.speechSynthesis.speak(utt);
      });
    }
    setIsPlayingAll(false);
    setActiveCell(null);
  };

  const handleCellClick = (cell: typeof hiragana[0]) => {
    if (!cell.jp) return;
    setActiveCell(cell.id);
    speak(cell.jp);
    setTimeout(() => setActiveCell(null), 1000);
  };

  const gridCols = activeTab === 'combinations' ? 3 : 5;

  return (
    <AppLayout>
      <div className="max-w-screen-lg mx-auto px-4 lg:px-6 py-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-foreground mb-1">Kana Chart</h1>
            <p className="text-sm text-muted-foreground">Click any character to hear its pronunciation</p>
          </div>
          <button
            onClick={playAll}
            className="btn-press flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold text-white transition-all"
            style={{ background: isPlayingAll ? 'var(--jlpt-n3)' : 'var(--primary)' }}>
            {isPlayingAll ? <><Volume2 size={14} /> Stop</> : <><Play size={14} /> 🔊 Play All</>}
          </button>
        </div>

        {/* Tabs */}
        <div className="flex rounded-xl border border-border bg-card overflow-hidden mb-6">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => { setActiveTab(tab.key); setActiveCell(null); window.speechSynthesis?.cancel(); setIsPlayingAll(false); }}
              className="btn-press flex-1 py-3 text-sm font-medium transition-all relative"
              style={{
                color: activeTab === tab.key ? 'var(--primary)' : 'var(--muted-foreground)',
                background: activeTab === tab.key ? 'var(--primary-dim)' : 'transparent',
              }}
            >
              <span className="font-sans-jp block text-base">{tab.labelJp}</span>
              <span className="text-[10px] block">{tab.label}</span>
              {activeTab === tab.key && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full" style={{ background: 'var(--primary)' }} />
              )}
            </button>
          ))}
        </div>

        {/* Vowel column headers */}
        {activeTab !== 'combinations' && (
          <div className="grid gap-2 mb-2" style={{ gridTemplateColumns: `repeat(${gridCols}, 1fr)` }}>
            {['a', 'i', 'u', 'e', 'o'].map(v => (
              <div key={v} className="text-center text-xs font-mono text-muted-foreground py-1">{v}</div>
            ))}
          </div>
        )}

        {/* Kana grid */}
        <div className="grid gap-2" style={{ gridTemplateColumns: `repeat(${gridCols}, 1fr)` }}>
          {dataMap[activeTab].map((cell) => {
            if (!cell.jp) {
              return <div key={cell.id} className="rounded-lg h-16" style={{ background: 'var(--card-elevated)', opacity: 0.3 }} />;
            }
            const isActive = activeCell === cell.id;
            return (
              <button
                key={cell.id}
                onClick={() => handleCellClick(cell)}
                className="btn-press group relative rounded-xl border p-2 flex flex-col items-center justify-center gap-1 h-16 transition-all hover:border-primary hover:-translate-y-0.5"
                style={{
                  background: isActive ? 'var(--primary-dim)' : 'var(--card)',
                  borderColor: isActive ? 'var(--primary)' : 'var(--border)',
                }}
              >
                <span className="font-mono text-2xl leading-none" style={{ color: isActive ? 'var(--primary)' : 'var(--foreground)' }}>
                  {cell.jp}
                </span>
                <span className="text-[10px] font-mono text-muted-foreground">{cell.romaji}</span>
                <div className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Volume2 size={10} className="text-primary" />
                </div>
              </button>
            );
          })}
        </div>

        <p className="text-xs text-muted-foreground text-center mt-4">
          {currentData.length} characters · Click to hear pronunciation · Uses Web Speech API
        </p>
      </div>
    </AppLayout>
  );
}
