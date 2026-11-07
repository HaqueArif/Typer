import React from 'react';
import { BIJOY_KEYBOARD_ROWS } from '../engine/bijoyLayout';
import type { Finger } from '../types';

interface KeyboardProps {
  targetKeyLabel: string | null;
  requiresShift: boolean;
  activePressedCode?: string | null;
  activeFinger?: Finger | null;
}

export const Keyboard: React.FC<KeyboardProps> = ({
  targetKeyLabel,
  requiresShift,
  activePressedCode,
}) => {
  const normTarget = targetKeyLabel?.toUpperCase();

  const renderKeyGlyph = (glyph: string) => {
    if (!glyph) return '';
    const combiningMarks = ['া', 'ি', 'ী', 'ু', 'ূ', 'ে', 'ৈ', 'ৌ', 'ৃ', '্', 'ঁ'];
    if (combiningMarks.includes(glyph)) {
      return `\u00A0${glyph}`;
    }
    return glyph;
  };

  return (
    <div className="bg-slate-900/95 backdrop-blur-md p-4 sm:p-5 rounded-2xl shadow-xl border border-slate-800 max-w-4xl mx-auto select-none">
      <div className="flex flex-col gap-1.5">
        {BIJOY_KEYBOARD_ROWS.map((row, rowIndex) => (
          <div key={rowIndex} className="flex gap-1.5 justify-center">
            {row.map(item => {
              const isTarget = normTarget === item.label.toUpperCase() || (item.code === 'Space' && (normTarget === ' ' || normTarget === 'SPACE'));
              const isShiftKey = item.code === 'ShiftLeft' || item.code === 'ShiftRight';
              const isShiftActive = isShiftKey && requiresShift;
              const isPhysicallyPressed = activePressedCode === item.code;

              // Finger color hints
              let fingerBorder = 'border-slate-700/60';
              if (item.finger.includes('pinky')) fingerBorder = 'border-rose-950/70 hover:border-rose-500/50';
              if (item.finger.includes('ring')) fingerBorder = 'border-amber-950/70 hover:border-amber-500/50';
              if (item.finger.includes('middle')) fingerBorder = 'border-blue-950/70 hover:border-blue-500/50';
              if (item.finger.includes('index')) fingerBorder = 'border-emerald-950/70 hover:border-emerald-500/50';
              if (item.finger === 'thumb') fingerBorder = 'border-purple-950/70 hover:border-purple-500/50';

              // Styling conditions
              let bgClass = 'bg-slate-800 text-slate-200';
              if (isPhysicallyPressed) {
                bgClass = 'bg-emerald-400 text-slate-950 scale-95 shadow-inner';
              } else if (isTarget) {
                bgClass = 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/40 ring-2 ring-emerald-300 font-bold animate-pulse';
              } else if (isShiftActive) {
                bgClass = 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/40 ring-2 ring-amber-300 font-bold animate-pulse';
              }

              const widthClass = item.width ? item.width : 'w-11 sm:w-13.5';

              return (
                <div
                  key={item.code}
                  className={`h-12 sm:h-13 ${widthClass} rounded-lg flex flex-col justify-between p-1 sm:p-1.5 border ${fingerBorder} ${bgClass} transition-all duration-100 cursor-default text-xs`}
                >
                  {/* Top: Shift character (Bangla shifted) & English letter */}
                  <div className="flex justify-between items-center leading-none">
                    <span className="text-[13px] font-semibold text-amber-300 font-bangla">
                      {item.shift && item.shift !== item.normal ? renderKeyGlyph(item.shift) : ''}
                    </span>
                    <span className="text-[11px] font-mono opacity-60">
                      {item.label}
                    </span>
                  </div>

                  {/* Bottom: Normal Bangla character */}
                  <div className="flex justify-start items-end leading-none">
                    <span className="text-[15px] sm:text-[17px] font-bold text-white font-bangla">
                      {renderKeyGlyph(item.normal)}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        ))}
      </div>

      {/* Keyboard Legend & Finger Color Bar */}
      <div className="mt-3 pt-3 border-t border-slate-800 flex flex-wrap items-center justify-between text-[11px] text-slate-400 gap-2">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
            পরবর্তী কি
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
            Shift কি (প্রয়োজনে)
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-300"></span>
            হলুদ অক্ষর = Shift চেপে
          </span>
        </div>
        <div className="text-slate-400 font-mono text-[11px]">
          বিজয় বায়ান্ন কিবোর্ড গাইড
        </div>
      </div>
    </div>
  );
};
