import React, { useState } from 'react';
import { SPEED_TESTS } from '../data/lessonsData';
import { TypingArea } from './TypingArea';
import type { TestResult } from '../types';
import { Timer, ArrowLeft, Clock } from 'lucide-react';

interface SpeedTestViewProps {
  onSaveResult: (result: TestResult) => void;
  inputMode: 'engine' | 'native';
  onChangeInputMode: (mode: 'engine' | 'native') => void;
}

export const SpeedTestView: React.FC<SpeedTestViewProps> = ({
  onSaveResult,
  inputMode,
  onChangeInputMode,
}) => {
  const [selectedTest, setSelectedTest] = useState<typeof SPEED_TESTS[0] | null>(null);

  if (selectedTest) {
    return (
      <div className="py-4">
        <div className="max-w-5xl mx-auto px-4 mb-3">
          <button
            onClick={() => setSelectedTest(null)}
            className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-white px-3 py-1.5 rounded-lg border border-slate-200 transition cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" /> টেস্ট তালিকায় ফিরে যান
          </button>
        </div>

        <TypingArea
          title={selectedTest.title}
          targetText={selectedTest.text}
          timedSeconds={selectedTest.durationSeconds}
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
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-amber-100 text-amber-600 mb-3">
          <Timer className="w-6 h-6" />
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-800 font-bangla">
          বাংলা টাইপিং স্পিড টেস্ট
        </h2>
        <p className="text-slate-700 text-sm mt-1 font-bangla">
          ১, ৩ কিংবা ৫ মিনিটের নির্ধারিত পরীক্ষায় অংশ নিয়ে আপনার প্রতি মিনিটে শব্দের গতি (WPM) ও নির্ভুলতার সনদ যাচাই করুন।
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {SPEED_TESTS.map(test => (
          <div
            key={test.id}
            className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-emerald-300 transition-all flex flex-col justify-between group"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-lg mb-4 group-hover:scale-110 transition">
                <Clock className="w-6 h-6" />
              </div>

              <h3 className="text-lg font-bold text-slate-800 font-bangla">
                {test.title}
              </h3>

              <div className="mt-3 p-3 bg-slate-50 rounded-xl border border-slate-100 text-sm text-slate-700 line-clamp-3 leading-relaxed font-bangla">
                {test.text}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-700">
                সময়: {Math.floor(test.durationSeconds / 60)} মিনিট
              </span>

              <button
                onClick={() => setSelectedTest(test)}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-md shadow-emerald-600/20 transition cursor-pointer"
              >
                টেস্ট শুরু করুন
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
