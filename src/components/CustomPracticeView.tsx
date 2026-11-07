import { useState } from 'react';
import { TypingArea } from './TypingArea';
import type { TestResult } from '../types';
import { PenTool, ArrowLeft, Sparkles, BookOpen } from 'lucide-react';

interface CustomPracticeViewProps {
  onSaveResult: (result: TestResult) => void;
  inputMode: 'engine' | 'native';
  onChangeInputMode: (mode: 'engine' | 'native') => void;
}

const PRESET_TEXTS = [
  {
    title: 'জাতীয় সঙ্গীত (প্রথম চার চরণ)',
    text: 'আমার সোনার বাংলা, আমি তোমায় ভালোবাসি। চিরদিন তোমার আকাশ, তোমার বাতাস, আমার প্রাণে বাজায় বাঁশি। ও মা, ফাগুনে তোর আমের বনে ঘ্রাণে পাগল করে, মরি হায়, হায় রে— ও মা, অঘ্রানে তোর ভরা ক্ষেতে আমি কি দেখেছি মধুর হাসি।',
  },
  {
    title: 'বিদ্রোহী কবিতা (কাজী নজরুল ইসলাম)',
    text: 'বল বীর— বল উন্নত মম শির! শির নেহারি’ আমারি নতশির ওই শিখর হিমাদ্রির! বল বীর— বল মহাবিশ্বের মহাকাশ ফাড়ি’ চন্দ্র সূর্য গ্রহ তারা ছাড়ি’ ভূলোক দ্যুলোক গোলক ভেদিয়া খোদার আসন ‘আরশ’ ছেদিয়া, উঠিয়াছি চির-বিস্ময় আমি বিশ্ববিধাতৃর!',
  },
  {
    title: 'সোনার তরী (রবীন্দ্রনাথ ঠাকুর)',
    text: 'গগনে গরজে মেঘ, ঘন বরষা। কূলে একা বসে আছি, নাহি ভরসা। রাশি রাশি ভারা ভারা ধান কাটা হল সারা, ভরা নদী ক্ষুরধারা খরপরশা। কাটিতে কাটিতে ধান এল বরষা।',
  },
];

export const CustomPracticeView: React.FC<CustomPracticeViewProps> = ({
  onSaveResult,
  inputMode,
  onChangeInputMode,
}) => {
  const [inputText, setInputText] = useState('');
  const [activeSession, setActiveSession] = useState<{ title: string; text: string } | null>(null);

  const handleStartCustom = () => {
    if (!inputText.trim()) return;
    setActiveSession({
      title: 'কাস্টম টেক্সট অনুশীলন',
      text: inputText.trim(),
    });
  };

  const handleSelectPreset = (preset: typeof PRESET_TEXTS[0]) => {
    setActiveSession({
      title: preset.title,
      text: preset.text,
    });
  };

  if (activeSession) {
    return (
      <div className="py-4">
        <div className="max-w-5xl mx-auto px-4 mb-3">
          <button
            onClick={() => setActiveSession(null)}
            className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-white px-3 py-1.5 rounded-lg border border-slate-200 transition cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" /> টেক্সট পরিবর্তনে ফিরে যান
          </button>
        </div>

        <TypingArea
          title={activeSession.title}
          targetText={activeSession.text}
          onComplete={result => {
            onSaveResult(result);
          }}
          inputMode={inputMode}
          onChangeInputMode={onChangeInputMode}
        />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="text-center max-w-xl mx-auto mb-8">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-indigo-100 text-indigo-600 mb-3">
          <PenTool className="w-6 h-6" />
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-800">
          কাস্টম টেক্সট প্র্যাকটিস
        </h2>
        <p className="text-slate-700 text-sm mt-1">
          আপনার পছন্দের যেকোনো বাংলা অনুচ্ছেদ এখানে পেস্ট করুন অথবা নিচের নমুনা থেকে বেছে নিয়ে টাইপিং চর্চা শুরু করুন।
        </p>
      </div>

      {/* Input Form */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm mb-8">
        <label className="block text-sm font-bold text-slate-700 mb-2">
          বাংলা লেখা পেস্ট বা লিখুন:
        </label>
        <textarea
          rows={5}
          value={inputText}
          onChange={e => setInputText(e.target.value)}
          placeholder="এখানে আপনার কাঙ্ক্ষিত বাংলা অনুচ্ছেদ পেস্ট করুন..."
          className="w-full p-4 rounded-2xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 font-bangla text-base leading-relaxed"
        />

        <div className="mt-4 flex justify-end">
          <button
            onClick={handleStartCustom}
            disabled={!inputText.trim()}
            className="px-6 py-2.5 rounded-xl text-sm font-bold bg-emerald-600 hover:bg-emerald-700 disabled:opacity-40 disabled:cursor-not-allowed text-white shadow-md shadow-emerald-600/20 transition cursor-pointer flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4" /> টাইপিং শুরু করুন
          </button>
        </div>
      </div>

      {/* Presets */}
      <div>
        <h3 className="text-base font-bold text-slate-800 mb-4 flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-emerald-600" /> নির্বাচিত সাহিত্য ও কবিতা থেকে অনুশীলন:
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {PRESET_TEXTS.map((p, idx) => (
            <div
              key={idx}
              onClick={() => handleSelectPreset(p)}
              className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs hover:border-emerald-400 hover:shadow-md transition cursor-pointer group"
            >
              <h4 className="font-bold text-slate-800 text-sm group-hover:text-emerald-600 transition mb-2 font-bangla">
                {p.title}
              </h4>
              <p className="text-sm text-slate-700 line-clamp-3 leading-relaxed font-bangla">
                {p.text}
              </p>
              <div className="mt-3 text-xs font-bold text-emerald-600 flex items-center gap-1">
                অনুশীলন করুন →
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
