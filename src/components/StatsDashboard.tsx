import React from 'react';
import type { UserStats } from '../types';
import { Trophy, Zap, Target, Clock, BookCheck, Trash2, AlertTriangle, Sparkles, CheckCircle2 } from 'lucide-react';
import { getKeystrokesForChar, FINGER_NAMES_BN } from '../engine/bijoyLayout';

interface StatsDashboardProps {
  stats: UserStats;
  onClearStats: () => void;
  onPracticeTroubleKeys?: (troubleChars: string[]) => void;
}

export const StatsDashboard: React.FC<StatsDashboardProps> = ({
  stats,
  onClearStats,
  onPracticeTroubleKeys,
}) => {
  // Sort struggled characters by error count descending
  const struggledList = Object.values(stats.struggledCharacters || {}).sort(
    (a, b) => b.errorCount - a.errorCount
  );

  const totalErrorsTracked = struggledList.reduce((acc, curr) => acc + curr.errorCount, 0);

  const handleStartTroubleDrill = () => {
    if (onPracticeTroubleKeys && struggledList.length > 0) {
      const topChars = struggledList.slice(0, 5).map(item => item.char);
      onPracticeTroubleKeys(topChars);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Title */}
      <div className="text-center max-w-xl mx-auto mb-8">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-600 mb-3">
          <Trophy className="w-6 h-6" />
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-800">
          টাইপিং অগ্রগতি ও পরিসংখ্যান
        </h2>
        <p className="text-slate-700 text-sm mt-1">
          আপনার ব্রাউজারে সংরক্ষিত সম্পূর্ণ টাইপিং যাত্রা ও দুর্বল বর্ণ বিশ্লেষণ।
        </p>
      </div>

      {/* Highlights Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs">
          <div className="flex items-center gap-2 text-emerald-600 text-xs font-bold mb-2">
            <Zap className="w-4 h-4" /> সর্বোচ্চ গতি (Best WPM)
          </div>
          <div className="text-3xl font-black text-slate-800">{stats.bestWpm}</div>
          <div className="text-xs text-slate-700 mt-0.5">শব্দ প্রতি মিনিটে</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs">
          <div className="flex items-center gap-2 text-blue-600 text-xs font-bold mb-2">
            <Target className="w-4 h-4" /> গড় নির্ভুলতা
          </div>
          <div className="text-3xl font-black text-slate-800">{stats.averageAccuracy}%</div>
          <div className="text-xs text-slate-700 mt-0.5">Accuracy</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs">
          <div className="flex items-center gap-2 text-purple-600 text-xs font-bold mb-2">
            <BookCheck className="w-4 h-4" /> সম্পন্ন পাঠ
          </div>
          <div className="text-3xl font-black text-slate-800">{stats.completedLessons.length}</div>
          <div className="text-xs text-slate-700 mt-0.5">টি পাঠ শেষ করেছেন</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs">
          <div className="flex items-center gap-2 text-amber-600 text-xs font-bold mb-2">
            <Clock className="w-4 h-4" /> অনুশীলনের সময়
          </div>
          <div className="text-3xl font-black text-slate-800">
            {Math.round(stats.totalPracticeTimeSeconds / 60)}
          </div>
          <div className="text-xs text-slate-700 mt-0.5">মিনিট অনুশীলন</div>
        </div>
      </div>

      {/* STRUGGLED CHARACTERS TRACKING CARD */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xs p-6 mb-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-5 pb-4 border-b border-slate-100">
          <div>
            <h3 className="font-bold text-slate-800 text-lg flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-amber-500" />
              দুর্বল বর্ণ ট্র্যাকার (Troubled Characters)
            </h3>
            <p className="text-xs text-slate-700 mt-0.5">
              আপনার পুরো অনুশীলনের যাত্রায় যে বর্ণগুলোতে সবচেয়ে বেশি ভুল হয়েছে।
            </p>
          </div>

          {struggledList.length > 0 && onPracticeTroubleKeys && (
            <button
              onClick={handleStartTroubleDrill}
              className="flex items-center gap-2 px-4 py-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs rounded-xl shadow-md shadow-amber-500/20 transition cursor-pointer"
            >
              <Sparkles className="w-4 h-4" /> দুর্বল বর্ণ ড্রিল শুরু করুন
            </button>
          )}
        </div>

        {struggledList.length === 0 ? (
          <div className="py-8 text-center text-slate-700 text-sm flex flex-col items-center gap-2">
            <CheckCircle2 className="w-8 h-8 text-emerald-500" />
            <span>দারুণ! এখনও পর্যন্ত কোনো বর্ণে উল্লেখযোগ্য ভুল পাওয়া যায়নি। আপনি চমৎকার টাইপ করছেন!</span>
          </div>
        ) : (
          <div>
            <div className="text-xs text-slate-700 mb-3 flex items-center justify-between">
              <span>চিহ্নিত সমস্যা বর্ণ: {struggledList.length} টি</span>
              <span>মোট ভুল সংকেত: {totalErrorsTracked} টি</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {struggledList.slice(0, 12).map(item => {
                const seq = getKeystrokesForChar(item.char);
                const finger = seq?.keys[0]?.finger ? FINGER_NAMES_BN[seq.keys[0].finger] : '';
                const keyHints = seq?.keys.map(k => k.display).join(' + ');

                return (
                  <div
                    key={item.char}
                    className="p-3.5 bg-rose-50/50 border border-rose-200/70 rounded-2xl flex flex-col justify-between"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-3xl font-black font-bangla text-rose-600">
                        {item.char === ' ' ? 'স্পেস' : item.char}
                      </span>
                      <span className="text-xs font-bold text-rose-700 bg-rose-100 px-2 py-0.5 rounded-full">
                        {item.errorCount} বার ভুল
                      </span>
                    </div>

                    <div className="mt-3 pt-2 border-t border-rose-100/80 text-[11px] text-slate-600 space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-slate-700">কী:</span>
                        <span className="font-mono font-bold text-slate-800">{keyHints}</span>
                      </div>
                      {finger && (
                        <div className="flex items-center justify-between">
                          <span className="text-slate-700">আঙুল:</span>
                          <span className="font-bold text-emerald-700">{finger}</span>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* History Table */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xs overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <h3 className="font-bold text-slate-800 text-base">
            সাম্প্রতিক টাইপিং রেকর্ড ({stats.history.length})
          </h3>

          {stats.history.length > 0 && (
            <button
              onClick={onClearStats}
              className="text-xs font-semibold text-rose-600 hover:text-rose-700 hover:bg-rose-50 px-3 py-1.5 rounded-lg transition flex items-center gap-1 cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5" /> হিস্ট্রি মুছুন
            </button>
          )}
        </div>

        {stats.history.length === 0 ? (
          <div className="p-12 text-center text-slate-700 text-sm">
            এখনও কোনো টেস্ট সম্পন্ন হয়নি। পাঠ বা স্পিড টেস্ট নিয়ে আপনার টাইপিং পরীক্ষা করুন!
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-700 uppercase font-bold border-b border-slate-100">
                <tr>
                  <th className="py-3 px-4">অনুশীলন / টেস্টের নাম</th>
                  <th className="py-3 px-4 text-center">WPM</th>
                  <th className="py-3 px-4 text-center">CPM</th>
                  <th className="py-3 px-4 text-center">নির্ভুলতা</th>
                  <th className="py-3 px-4 text-center">সময়</th>
                  <th className="py-3 px-4 text-right">তারিখ</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {stats.history.slice(0, 15).map(item => (
                  <tr key={item.id} className="hover:bg-slate-50/80 transition">
                    <td className="py-3 px-4 font-semibold text-slate-800">
                      {item.lessonOrTestTitle}
                    </td>
                    <td className="py-3 px-4 text-center font-bold text-emerald-600">
                      {item.wpm}
                    </td>
                    <td className="py-3 px-4 text-center text-slate-700">
                      {item.cpm}
                    </td>
                    <td className="py-3 px-4 text-center font-bold text-blue-600">
                      {item.accuracy}%
                    </td>
                    <td className="py-3 px-4 text-center text-slate-700">
                      {item.durationSeconds}s
                    </td>
                    <td className="py-3 px-4 text-right text-slate-700">
                      {item.date}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
