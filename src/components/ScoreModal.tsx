import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Award, RotateCcw, ArrowRight, Zap, Target, Clock, AlertCircle, AlertTriangle } from 'lucide-react';
import type { TestResult } from '../types';

interface ScoreModalProps {
  result: TestResult;
  onRestart: () => void;
  onNext?: () => void;
  title: string;
}

export const ScoreModal: React.FC<ScoreModalProps> = ({
  result,
  onRestart,
  onNext,
  title,
}) => {
  useEffect(() => {
    // Fire confetti for celebration
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
      });
    } catch {
      // Ignore
    }
  }, []);

  // Calculate stars
  let stars = 1;
  if (result.accuracy >= 95 && result.wpm >= 25) {
    stars = 3;
  } else if (result.accuracy >= 85) {
    stars = 2;
  }

  // Get list of struggled characters
  const struggledEntries = result.struggledChars
    ? Object.entries(result.struggledChars).sort((a, b) => b[1] - a[1])
    : [];

  return (
    <div className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-100 max-w-lg w-full p-6 sm:p-8 text-center relative overflow-hidden max-h-[90vh] overflow-y-auto">
        {/* Top ribbon banner */}
        <div className="absolute top-0 left-0 right-0 h-3 bg-linear-to-r from-emerald-500 via-teal-500 to-indigo-500" />

        {/* Big Icon / Badge */}
        <div className="mx-auto w-20 h-20 rounded-full bg-emerald-50 border-4 border-emerald-100 flex items-center justify-center text-emerald-500 mb-4 shadow-inner">
          <Award className="w-10 h-10" />
        </div>

        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-800 tracking-tight">
          দারুণ লিখেছেন! 🎉
        </h2>
        <p className="text-slate-700 text-sm mt-1">{title}</p>

        {/* Star Rating */}
        <div className="flex justify-center gap-2 my-5">
          {[1, 2, 3].map(s => (
            <span
              key={s}
              className={`text-4xl transition-all duration-300 transform ${
                s <= stars ? 'scale-110 drop-shadow-md' : 'grayscale opacity-30'
              }`}
            >
              ⭐
            </span>
          ))}
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-5">
          <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100">
            <div className="flex items-center justify-center gap-1 text-emerald-600 text-xs font-semibold mb-1">
              <Zap className="w-3.5 h-3.5" /> WPM
            </div>
            <div className="text-2xl font-black text-slate-800">{result.wpm}</div>
            <div className="text-[10px] text-slate-700">শব্দ / মিনিট</div>
          </div>

          <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100">
            <div className="flex items-center justify-center gap-1 text-blue-600 text-xs font-semibold mb-1">
              <Target className="w-3.5 h-3.5" /> নির্ভুলতা
            </div>
            <div className="text-2xl font-black text-slate-800">{result.accuracy}%</div>
            <div className="text-[10px] text-slate-700">Accuracy</div>
          </div>

          <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100">
            <div className="flex items-center justify-center gap-1 text-purple-600 text-xs font-semibold mb-1">
              <Clock className="w-3.5 h-3.5" /> সময়
            </div>
            <div className="text-2xl font-black text-slate-800">{result.durationSeconds}s</div>
            <div className="text-[10px] text-slate-700">সেকেন্ড</div>
          </div>

          <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100">
            <div className="flex items-center justify-center gap-1 text-rose-600 text-xs font-semibold mb-1">
              <AlertCircle className="w-3.5 h-3.5" /> ভুল
            </div>
            <div className="text-2xl font-black text-slate-800">{result.errorsCount}</div>
            <div className="text-[10px] text-slate-700">অক্ষর ভুল</div>
          </div>
        </div>

        {/* Struggled Characters in this session */}
        {struggledEntries.length > 0 && (
          <div className="mb-5 p-3.5 bg-rose-50/70 border border-rose-200/80 rounded-2xl text-left">
            <div className="flex items-center gap-1.5 text-xs font-bold text-rose-700 mb-2">
              <AlertTriangle className="w-4 h-4" />
              এই সেশনে যে বর্ণগুলোতে বেশি ভুল হয়েছে:
            </div>
            <div className="flex flex-wrap gap-2">
              {struggledEntries.map(([char, count]) => (
                <span
                  key={char}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white border border-rose-300 rounded-lg text-xs font-bold text-slate-800 shadow-xs"
                >
                  <span className="text-base text-rose-600 font-bold font-bangla">{char === ' ' ? 'স্পেস' : char}</span>
                  <span className="text-[10px] text-rose-500 font-semibold">({count} বার)</span>
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 mt-4">
          <button
            onClick={onRestart}
            className="flex-1 flex items-center justify-center gap-2 py-3 px-5 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 font-semibold transition-all shadow-xs cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" /> আবার করুন
          </button>

          {onNext && (
            <button
              onClick={onNext}
              className="flex-1 flex items-center justify-center gap-2 py-3 px-5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold transition-all shadow-md shadow-emerald-600/20 cursor-pointer"
            >
              পরবর্তী ধাপ <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
