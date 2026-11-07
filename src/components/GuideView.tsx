import React from 'react';
import { HelpCircle, Key, CheckCircle, Zap } from 'lucide-react';

export const GuideView: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Title */}
      <div className="text-center max-w-xl mx-auto mb-8">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-teal-100 text-teal-600 mb-3">
          <HelpCircle className="w-6 h-6" />
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-800">
          বিজয় বায়ান্ন কিবোর্ড গাইড ও নিয়মাবলী
        </h2>
        <p className="text-slate-700 text-sm mt-1">
          সঠিক নিয়মে দ্রুত বাংলা টাইপ করার জন্য নিয়ম ও কীবোর্ড শর্টকাট রেফারেন্স।
        </p>
      </div>

      {/* Guide Cards */}
      <div className="space-y-6">
        {/* Card 1: Touch Typing Rules */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs">
          <h3 className="text-lg font-bold text-slate-800 mb-3 flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-emerald-600" /> ১. হাতের আঙুল বসানোর সঠিক নিয়ম (Home Row)
          </h3>
          <p className="text-sm text-slate-700 leading-relaxed">
            টাচ টাইপিংয়ের মূল ভিত্তি হচ্ছে হোম রো। কিবোর্ডের দিকে না তাকিয়ে স্ক্রিনের দিকে লক্ষ্য রেখে টাইপ করতে হবে:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4 text-xs">
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
              <span className="font-bold text-slate-800 block mb-1">বাম হাত (A, S, D, F):</span>
              কনিষ্ঠা = A (ৃ), অনামিকা = S (ু), মধ্যমা = D (ি), তর্জনী = F (া) ও G (্)।
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
              <span className="font-bold text-slate-800 block mb-1">ডান হাত (H, J, K, L):</span>
              তর্জনী = H (ব) ও J (ক), মধ্যমা = K (ত), অনামিকা = L (দ), কনিষ্ঠা = ; ও Enter।
            </div>
          </div>
        </div>

        {/* Card 2: Swaraborno rules */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs">
          <h3 className="text-lg font-bold text-slate-800 mb-3 flex items-center gap-2">
            <Key className="w-5 h-5 text-indigo-600" /> ২. বাংলা স্বরবর্ণ লেখার নিয়ম (G + কার)
          </h3>
          <p className="text-sm text-slate-700 leading-relaxed mb-4">
            বিজয় কিবোর্ডে স্বরবর্ণ লেখার জন্য প্রথমে লিংক কী <span className="font-mono font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-sm">G</span> (হসন্ত) চেপে তারপর সংশ্লিষ্ট কার চিহ্ন চাপতে হয়:
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-mono">
            <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-100 flex justify-between">
              <span className="font-bold text-slate-700 font-sans">অ</span>
              <span className="text-indigo-600 font-bold">Shift + F</span>
            </div>
            <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-100 flex justify-between">
              <span className="font-bold text-slate-700 font-sans">আ</span>
              <span className="text-indigo-600 font-bold">G + F</span>
            </div>
            <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-100 flex justify-between">
              <span className="font-bold text-slate-700 font-sans">ই</span>
              <span className="text-indigo-600 font-bold">G + D</span>
            </div>
            <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-100 flex justify-between">
              <span className="font-bold text-slate-700 font-sans">ঈ</span>
              <span className="text-indigo-600 font-bold">G + Shift + D</span>
            </div>
            <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-100 flex justify-between">
              <span className="font-bold text-slate-700 font-sans">উ</span>
              <span className="text-indigo-600 font-bold">G + S</span>
            </div>
            <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-100 flex justify-between">
              <span className="font-bold text-slate-700 font-sans">ঊ</span>
              <span className="text-indigo-600 font-bold">G + Shift + S</span>
            </div>
            <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-100 flex justify-between">
              <span className="font-bold text-slate-700 font-sans">ঋ</span>
              <span className="text-indigo-600 font-bold">G + A</span>
            </div>
            <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-100 flex justify-between">
              <span className="font-bold text-slate-700 font-sans">এ</span>
              <span className="text-indigo-600 font-bold">G + C</span>
            </div>
            <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-100 flex justify-between">
              <span className="font-bold text-slate-700 font-sans">ঐ</span>
              <span className="text-indigo-600 font-bold">G + Shift + C</span>
            </div>
            <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-100 flex justify-between">
              <span className="font-bold text-slate-700 font-sans">ও</span>
              <span className="text-indigo-600 font-bold">X</span>
            </div>
            <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-100 flex justify-between">
              <span className="font-bold text-slate-700 font-sans">ঔ</span>
              <span className="text-indigo-600 font-bold">G + Shift + X</span>
            </div>
          </div>
        </div>

        {/* Card 3: Conjuncts (যুক্তবর্ণ) */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs">
          <h3 className="text-lg font-bold text-slate-800 mb-3 flex items-center gap-2">
            <Zap className="w-5 h-5 text-amber-500" /> ৩. যুক্তবর্ণ লেখার জাদুকরী নিয়ম
          </h3>
          <p className="text-sm text-slate-700 leading-relaxed mb-4">
            যেকোনো যুক্তবর্ণ তৈরি করতে হয়: <span className="font-bold text-slate-900">প্রথম বর্ণ + G (হসন্ত) + দ্বিতীয় বর্ণ</span>।
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-xs">
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
              <span className="font-bold text-slate-800 text-sm">ক্ষ (ক + ্ষ):</span>
              <div className="text-emerald-700 font-mono mt-1">J + G + Shift + N</div>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
              <span className="font-bold text-slate-800 text-sm">জ্ঞ (জ + ্ঞ):</span>
              <div className="text-emerald-700 font-mono mt-1">U + G + Shift + I</div>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
              <span className="font-bold text-slate-800 text-sm">ঞ্চ (ঞ + ্চ):</span>
              <div className="text-emerald-700 font-mono mt-1">Shift + I + G + Y</div>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
              <span className="font-bold text-slate-800 text-sm">ত্ত (ত + ্ত):</span>
              <div className="text-emerald-700 font-mono mt-1">K + G + K</div>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
              <span className="font-bold text-slate-800 text-sm">ত্র (ত + ্র):</span>
              <div className="text-emerald-700 font-mono mt-1">K + Z</div>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
              <span className="font-bold text-slate-800 text-sm">ষ্ঠ (ষ + ্ঠ):</span>
              <div className="text-emerald-700 font-mono mt-1">Shift + N + G + Shift + T</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

