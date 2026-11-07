import React from 'react';
import { BookOpen, Timer, PenTool, BarChart3, Keyboard as KeyboardIcon, HelpCircle } from 'lucide-react';

export type ActiveTab = 'lessons' | 'speed-test' | 'custom' | 'stats' | 'guide';

interface HeaderProps {
  activeTab: ActiveTab;
  onSelectTab: (tab: ActiveTab) => void;
  inputMode: 'engine' | 'native';
  onChangeInputMode: (mode: 'engine' | 'native') => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  onSelectTab,
  inputMode,
  onChangeInputMode,
}) => {
  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-xs">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo */}
          <div
            onClick={() => onSelectTab('lessons')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-linear-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white shadow-md shadow-emerald-500/20 group-hover:scale-105 transition">
              <KeyboardIcon className="w-6 h-6" />
            </div>
            <div>
              <div className="font-extrabold text-lg text-slate-800 tracking-tight flex items-center gap-1.5">
                বিজয় <span className="text-emerald-600">টাইপিং</span>
                <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.5 rounded-sm">52</span>
              </div>
              <div className="text-[11px] text-slate-700 -mt-0.5 font-medium">
                Typing.com স্টাইল বাংলা টিউটর
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <nav className="hidden md:flex items-center gap-1">
            <button
              onClick={() => onSelectTab('lessons')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-semibold transition cursor-pointer ${
                activeTab === 'lessons'
                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-200/80 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              পাঠসমূহ (Lessons)
            </button>

            <button
              onClick={() => onSelectTab('speed-test')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-semibold transition cursor-pointer ${
                activeTab === 'speed-test'
                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-200/80 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Timer className="w-4 h-4" />
              স্পিড টেস্ট (Tests)
            </button>

            <button
              onClick={() => onSelectTab('custom')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-semibold transition cursor-pointer ${
                activeTab === 'custom'
                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-200/80 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <PenTool className="w-4 h-4" />
              কাস্টম প্র্যাকটিস
            </button>

            <button
              onClick={() => onSelectTab('stats')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-semibold transition cursor-pointer ${
                activeTab === 'stats'
                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-200/80 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <BarChart3 className="w-4 h-4" />
              অগ্রগতি (Stats)
            </button>

            <button
              onClick={() => onSelectTab('guide')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-semibold transition cursor-pointer ${
                activeTab === 'guide'
                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-200/80 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <HelpCircle className="w-4 h-4" />
              নিয়মাবলী
            </button>
          </nav>

          {/* Mode Switcher pill */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => onChangeInputMode(inputMode === 'engine' ? 'native' : 'engine')}
              className="text-xs font-semibold px-3 py-1.5 rounded-lg border border-slate-300 hover:border-emerald-500 bg-white hover:bg-emerald-50/50 transition flex items-center gap-1.5 cursor-pointer text-slate-700"
              title="ইনপুট মোড পরিবর্তন করুন"
            >
              <span className={`w-2 h-2 rounded-full ${inputMode === 'engine' ? 'bg-emerald-500' : 'bg-blue-500'}`} />
              <span className="hidden sm:inline">মোড:</span>
              <span className="font-bold">{inputMode === 'engine' ? 'ভার্চুয়াল বিজয়' : 'সরাসরি বিজয়'}</span>
            </button>
          </div>
        </div>

        {/* Mobile Navigation bar */}
        <div className="flex md:hidden overflow-x-auto py-2 gap-1 border-t border-slate-100">
          <button
            onClick={() => onSelectTab('lessons')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap ${
              activeTab === 'lessons' ? 'bg-emerald-600 text-white' : 'text-slate-600 bg-slate-100'
            }`}
          >
            পাঠসমূহ
          </button>
          <button
            onClick={() => onSelectTab('speed-test')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap ${
              activeTab === 'speed-test' ? 'bg-emerald-600 text-white' : 'text-slate-600 bg-slate-100'
            }`}
          >
            স্পিড টেস্ট
          </button>
          <button
            onClick={() => onSelectTab('custom')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap ${
              activeTab === 'custom' ? 'bg-emerald-600 text-white' : 'text-slate-600 bg-slate-100'
            }`}
          >
            কাস্টম
          </button>
          <button
            onClick={() => onSelectTab('stats')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap ${
              activeTab === 'stats' ? 'bg-emerald-600 text-white' : 'text-slate-600 bg-slate-100'
            }`}
          >
            পরিসংখ্যান
          </button>
          <button
            onClick={() => onSelectTab('guide')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap ${
              activeTab === 'guide' ? 'bg-emerald-600 text-white' : 'text-slate-600 bg-slate-100'
            }`}
          >
            নিয়মাবলী
          </button>
        </div>
      </div>
    </header>
  );
};

