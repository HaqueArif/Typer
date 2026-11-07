import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Keyboard } from './Keyboard';
import { ScoreModal } from './ScoreModal';
import { getBijoyKeystrokeSteps, canonicalizeBangla } from '../engine/bijoyLayout';
import { soundEngine } from '../engine/soundEngine';
import type { Finger, TestResult, BijoyKeystrokeStep } from '../types';
import { RotateCcw, Volume2, VolumeX, ShieldCheck, Cpu, ChevronLeft, ChevronRight, Info } from 'lucide-react';

interface TypingAreaProps {
  title: string;
  targetText: string;
  instruction?: string;
  stepNumber?: number;
  totalSteps?: number;
  onPrevStep?: () => void;
  onNextStep?: () => void;
  onSelectStep?: (index: number) => void;
  timedSeconds?: number; // If set, acts as countdown timer test
  onComplete?: (result: TestResult) => void;
  onNext?: () => void;
  inputMode: 'engine' | 'native';
  onChangeInputMode: (mode: 'engine' | 'native') => void;
}

export const TypingArea: React.FC<TypingAreaProps> = ({
  title,
  targetText,
  instruction,
  stepNumber,
  totalSteps,
  onPrevStep,
  onNextStep,
  onSelectStep,
  timedSeconds,
  onComplete,
  onNext,
  inputMode,
  onChangeInputMode,
}) => {
  const [stepIndex, setStepIndex] = useState(0);
  const [errorsCount, setErrorsCount] = useState(0);
  const [totalKeystrokes, setTotalKeystrokes] = useState(0);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [lastErrorIndex, setLastErrorIndex] = useState<number | null>(null);
  const [activePressedCode, setActivePressedCode] = useState<string | null>(null);
  const [soundOn, setSoundOn] = useState(true);
  const [struggledChars, setStruggledChars] = useState<Record<string, number>>({});
  const [finalResult, setFinalResult] = useState<TestResult | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const nativeInputRef = useRef<HTMLInputElement>(null);

  // Normalize target text string with NFC and canonicalize nukta sequences (ড+় -> ড়)
  const normalizedText = React.useMemo(() => {
    return canonicalizeBangla(targetText.normalize('NFC'));
  }, [targetText]);

  // Grapheme clusters for unbroken visual Bengali rendering
  const graphemeSegments = React.useMemo(() => {
    if (typeof Intl !== 'undefined' && Intl.Segmenter) {
      const segmenter = new Intl.Segmenter('bn', { granularity: 'grapheme' });
      return Array.from(segmenter.segment(normalizedText)).map((s, idx) => ({
        text: s.segment,
        index: idx,
      }));
    }
    return Array.from(normalizedText).map((ch, idx) => ({
      text: ch,
      index: idx,
    }));
  }, [normalizedText]);

  // Generate authentic Bijoy keystroke sequence steps (pre-kars before, post-kars after, conjunct rules)
  const keystrokeSteps: BijoyKeystrokeStep[] = React.useMemo(() => {
    return getBijoyKeystrokeSteps(normalizedText);
  }, [normalizedText]);

  const currentStep: BijoyKeystrokeStep | null = keystrokeSteps[stepIndex] || null;
  const currentGraphemeIndex = currentStep ? currentStep.graphemeIndex : (keystrokeSteps.length > 0 ? graphemeSegments.length : 0);

  const targetKeyLabel = currentStep ? currentStep.key : null;
  const requiresShift = currentStep ? currentStep.shift : false;
  const activeFinger: Finger | null = currentStep ? currentStep.finger : null;

  // Timer loop
  useEffect(() => {
    if (!startTime || isFinished) return;

    const timer = setInterval(() => {
      const now = Date.now();
      const elapsed = Math.floor((now - startTime) / 1000);
      setElapsedSeconds(elapsed);

      // Check countdown limit if timed test
      if (timedSeconds && elapsed >= timedSeconds) {
        clearInterval(timer);
        finishTest(elapsed);
      }
    }, 500);

    return () => clearInterval(timer);
  }, [startTime, isFinished, timedSeconds]);

  // Finish calculation
  const finishTest = useCallback((finalElapsed: number) => {
    setIsFinished(true);
    soundEngine.playSuccess();

    const duration = finalElapsed > 0 ? finalElapsed : 1;
    const wpm = Math.round((totalKeystrokes / 5) / (duration / 60));
    const cpm = Math.round(totalKeystrokes / (duration / 60));
    const accuracy = totalKeystrokes > 0
      ? Math.max(0, Math.round(((totalKeystrokes - errorsCount) / totalKeystrokes) * 100))
      : 100;

    const result: TestResult = {
      id: `${Date.now()}`,
      date: new Date().toLocaleDateString('bn-BD'),
      wpm: isNaN(wpm) ? 0 : wpm,
      cpm: isNaN(cpm) ? 0 : cpm,
      accuracy,
      durationSeconds: duration,
      totalKeystrokes,
      errorsCount,
      lessonOrTestTitle: title,
      struggledChars,
    };

    setFinalResult(result);
    if (onComplete) {
      onComplete(result);
    }
  }, [totalKeystrokes, errorsCount, title, onComplete, struggledChars]);

  // Restart function
  const handleRestart = () => {
    setStepIndex(0);
    setErrorsCount(0);
    setTotalKeystrokes(0);
    setStartTime(null);
    setElapsedSeconds(0);
    setIsFinished(false);
    setLastErrorIndex(null);
    setStruggledChars({});
    setFinalResult(null);
    focusInput();
  };

  const advanceStep = useCallback(() => {
    setStepIndex(prev => {
      const next = prev + 1;
      if (next >= keystrokeSteps.length) {
        const finalElapsed = startTime ? Math.floor((Date.now() - startTime) / 1000) : 1;
        finishTest(finalElapsed);
      }
      return next;
    });
  }, [keystrokeSteps.length, finishTest, startTime]);

  const handleMistake = useCallback(() => {
    soundEngine.playError();
    setErrorsCount(prev => prev + 1);

    if (currentStep) {
      setLastErrorIndex(currentStep.graphemeIndex);
      const name = currentStep.charName;
      setStruggledChars(prev => ({
        ...prev,
        [name]: (prev[name] || 0) + 1,
      }));
    }
  }, [currentStep]);

  // Unified engine keystroke processor
  const processEngineKey = useCallback(
    (e: { key: string; code: string; shiftKey: boolean; preventDefault: () => void }) => {
      if (isFinished || !currentStep) return;

      // Ignore solitary modifier keys
      if (['Shift', 'Control', 'Alt', 'Meta', 'CapsLock'].includes(e.key)) {
        return;
      }

      setActivePressedCode(e.code);
      setTimeout(() => setActivePressedCode(null), 120);

      if (!startTime) {
        setStartTime(Date.now());
      }

      setTotalKeystrokes(prev => prev + 1);

      if (inputMode === 'engine') {
        e.preventDefault();

        const pressedKey = e.key;
        const expectedKey = currentStep.key;
        const expectedShift = currentStep.shift;

        // Space detection: matches ' ', 'Spacebar', e.code === 'Space'
        const isSpaceExpected =
          expectedKey === ' ' ||
          currentStep.code === 'Space' ||
          currentStep.display === 'Space' ||
          currentStep.charName === 'স্পেস';

        const isSpacePressed =
          pressedKey === ' ' ||
          e.code === 'Space' ||
          pressedKey === 'Spacebar';

        if (isSpaceExpected) {
          if (isSpacePressed) {
            soundEngine.playKeyClick();
            setLastErrorIndex(null);
            advanceStep();
          } else {
            handleMistake();
          }
          return;
        }

        // If user pressed space when a letter was expected
        if (isSpacePressed) {
          handleMistake();
          return;
        }

        // Check if key matches any
        const keyMatches = pressedKey.toLowerCase() === expectedKey.toLowerCase();
        const shiftMatches = expectedShift ? e.shiftKey : !e.shiftKey;

        if (keyMatches && shiftMatches) {
          soundEngine.playKeyClick();
          setLastErrorIndex(null);
          advanceStep();
        } else {
          handleMistake();
        }
      }
    },
    [
      isFinished,
      currentStep,
      startTime,
      inputMode,
      advanceStep,
      handleMistake,
    ]
  );

  // Keyboard handler for container
  const handleKeyDown = (e: React.KeyboardEvent) => {
    processEngineKey(e);
  };

  // Handler for Native Input Mode
  const handleNativeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (!val || isFinished) return;

    if (!startTime) {
      setStartTime(Date.now());
    }

    setTotalKeystrokes(prev => prev + 1);

    const targetGrapheme = graphemeSegments[currentGraphemeIndex]?.text;
    const isTargetSpace = targetGrapheme === ' ' || !targetGrapheme?.trim();
    const isTypedSpace = val === ' ' || val.endsWith(' ');

    if (isTargetSpace) {
      if (isTypedSpace) {
        soundEngine.playKeyClick();
        setLastErrorIndex(null);
        // Advance to next grapheme cluster
        const nextStepIdx = keystrokeSteps.findIndex((s, idx) => idx > stepIndex && s.graphemeIndex > currentGraphemeIndex);
        if (nextStepIdx === -1) {
          const finalElapsed = startTime ? Math.floor((Date.now() - startTime) / 1000) : 1;
          finishTest(finalElapsed);
        } else {
          setStepIndex(nextStepIdx);
        }
      } else {
        handleMistake();
      }
    } else {
      if (val.trim() === targetGrapheme?.trim() || val.endsWith(targetGrapheme || '')) {
        soundEngine.playKeyClick();
        setLastErrorIndex(null);
        // Advance to next grapheme cluster
        const nextStepIdx = keystrokeSteps.findIndex((s, idx) => idx > stepIndex && s.graphemeIndex > currentGraphemeIndex);
        if (nextStepIdx === -1) {
          const finalElapsed = startTime ? Math.floor((Date.now() - startTime) / 1000) : 1;
          finishTest(finalElapsed);
        } else {
          setStepIndex(nextStepIdx);
        }
      } else {
        handleMistake();
      }
    }

    // Reset input value so it can accept next character
    e.target.value = '';
  };

  // Focus helper
  const focusInput = useCallback(() => {
    if (inputMode === 'native') {
      nativeInputRef.current?.focus();
    } else {
      containerRef.current?.focus();
    }
  }, [inputMode]);

  // Auto-focus on mount, exercise step change, text change, or inputMode change
  useEffect(() => {
    focusInput();
    const t1 = setTimeout(focusInput, 30);
    const t2 = setTimeout(focusInput, 150);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [targetText, stepNumber, inputMode, focusInput]);

  // Global keydown listener: automatically route keystrokes to the typing engine without needing to click
  useEffect(() => {
    if (isFinished) return;

    const handleWindowKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;

      // Don't intercept if user is intentionally interacting with an input/textarea/select
      if (
        target &&
        ['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName) &&
        target !== nativeInputRef.current
      ) {
        return;
      }

      // Ignore browser shortcuts with modifiers (e.g. Ctrl+R, Alt+Tab, Ctrl+W)
      if (e.ctrlKey || e.altKey || e.metaKey) return;

      if (inputMode === 'engine') {
        // If containerRef already has focus, its onKeyDown handles it
        if (document.activeElement === containerRef.current) {
          return;
        }

        // If focus is on a button or elsewhere, refocus container
        if (target && target.tagName === 'BUTTON') {
          target.blur();
        }
        containerRef.current?.focus();

        // Process this keystroke immediately so user never loses a keystroke
        processEngineKey(e);
      } else if (inputMode === 'native') {
        if (document.activeElement !== nativeInputRef.current) {
          nativeInputRef.current?.focus();
        }
      }
    };

    window.addEventListener('keydown', handleWindowKeyDown);
    return () => window.removeEventListener('keydown', handleWindowKeyDown);
  }, [isFinished, inputMode, processEngineKey]);

  // Toggle Sound
  const toggleSound = () => {
    const next = !soundOn;
    setSoundOn(next);
    soundEngine.setEnabled(next);
  };

  // Real-time WPM
  const currentDuration = elapsedSeconds > 0 ? elapsedSeconds : 1;
  const currentWpm = Math.round((totalKeystrokes / 5) / (currentDuration / 60));
  const currentAccuracy = totalKeystrokes > 0
    ? Math.max(0, Math.round(((totalKeystrokes - errorsCount) / totalKeystrokes) * 100))
    : 100;

  // Progress percentage of keystroke steps
  const textProgress = keystrokeSteps.length > 0 ? Math.round((stepIndex / keystrokeSteps.length) * 100) : 0;

  return (
    <div
      ref={containerRef}
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onClick={focusInput}
      className="outline-none focus:ring-0 max-w-5xl mx-auto px-4 py-3"
    >
      {/* Multi-step Header Bar if in a Lesson */}
      {totalSteps && totalSteps > 1 && (
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs px-4 py-3 mb-3 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-lg bg-emerald-100 text-emerald-800 font-bold text-xs font-bangla">
              ধাপ {stepNumber} / {totalSteps}
            </span>
            <div className="w-32 sm:w-48 bg-slate-100 rounded-full h-2 overflow-hidden">
              <div
                className="bg-emerald-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${Math.round(((stepNumber || 1) / totalSteps) * 100)}%` }}
              />
            </div>
          </div>

          {/* Quick Step Buttons / Stepper */}
          <div className="flex items-center gap-1.5">
            {onPrevStep && (
              <button
                onClick={onPrevStep}
                disabled={stepNumber === 1}
                className="p-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-30 disabled:cursor-not-allowed text-slate-700 cursor-pointer"
                title="পূর্ববর্তী ধাপ"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
            )}

            {/* Step selector dropdown for quick navigation through 20 steps */}
            {onSelectStep && (
              <select
                value={(stepNumber || 1) - 1}
                onChange={e => onSelectStep(Number(e.target.value))}
                className="text-xs font-semibold px-2 py-1.5 rounded-lg border border-slate-200 bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer"
              >
                {Array.from({ length: totalSteps }).map((_, i) => (
                  <option key={i} value={i}>
                    ধাপ {i + 1}
                  </option>
                ))}
              </select>
            )}

            {onNextStep && (
              <button
                onClick={onNextStep}
                disabled={stepNumber === totalSteps}
                className="p-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-30 disabled:cursor-not-allowed text-slate-700 cursor-pointer"
                title="পরবর্তী ধাপ"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      )}

      {/* Top Controls & Metrics Bar */}
      <div className="bg-white rounded-2xl shadow-xs border border-slate-200/90 p-4 mb-3 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-800 font-bangla">{title}</h2>
          {instruction ? (
            <div className="text-sm text-emerald-800 font-medium flex items-center gap-1.5 mt-0.5 font-bangla">
              <Info className="w-3.5 h-3.5" /> {instruction}
            </div>
          ) : (
            <div className="text-xs text-slate-700 mt-0.5 font-bangla">
              কিবোর্ডে টাইপ করে অনুশীলন শুরু করুন
            </div>
          )}
        </div>

        {/* Live Metrics */}
        <div className="flex items-center gap-3 sm:gap-6 text-center">
          <div className="px-3 py-1 bg-slate-50 rounded-xl border border-slate-100">
            <div className="text-[11px] text-slate-700 font-medium">WPM (শব্দ/মি)</div>
            <div className="text-lg font-black text-emerald-600">{currentWpm}</div>
          </div>
          <div className="px-3 py-1 bg-slate-50 rounded-xl border border-slate-100">
            <div className="text-[11px] text-slate-700 font-medium">নির্ভুলতা</div>
            <div className="text-lg font-black text-blue-600">{currentAccuracy}%</div>
          </div>
          <div className="px-3 py-1 bg-slate-50 rounded-xl border border-slate-100">
            <div className="text-[11px] text-slate-700 font-medium">সময়</div>
            <div className="text-lg font-black text-purple-600">
              {timedSeconds ? `${Math.max(0, timedSeconds - elapsedSeconds)}s` : `${elapsedSeconds}s`}
            </div>
          </div>
        </div>

        {/* Action Toggles */}
        <div className="flex items-center gap-2">
          {/* Mode Switcher */}
          <button
            onClick={() => onChangeInputMode(inputMode === 'engine' ? 'native' : 'engine')}
            title="ইনপুট মোড পরিবর্তন করুন"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 transition cursor-pointer"
          >
            {inputMode === 'engine' ? (
              <>
                <Cpu className="w-3.5 h-3.5 text-emerald-600" />
                <span>ভার্চুয়াল বিজয় মোড</span>
              </>
            ) : (
              <>
                <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
                <span>সরাসরি বাংলা ইনপুট</span>
              </>
            )}
          </button>

          {/* Sound Toggle */}
          <button
            onClick={toggleSound}
            title={soundOn ? 'সাউন্ড বন্ধ করুন' : 'সাউন্ড চালু করুন'}
            className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 transition cursor-pointer"
          >
            {soundOn ? <Volume2 className="w-4 h-4 text-emerald-600" /> : <VolumeX className="w-4 h-4 text-slate-400" />}
          </button>

          {/* Restart */}
          <button
            onClick={handleRestart}
            title="পুনরায় শুরু করুন"
            className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 transition cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Hidden input for Native Mode */}
      {inputMode === 'native' && (
        <div className="mb-3 text-center">
          <input
            ref={nativeInputRef}
            type="text"
            placeholder="এখানে বিজয় কিবোর্ডে বাংলা টাইপ করুন..."
            onChange={handleNativeInput}
            className="w-full max-w-md px-4 py-2 text-center rounded-xl border-2 border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-400 font-bold text-lg bg-emerald-50/50"
            autoFocus
          />
        </div>
      )}

      {/* Typing Display Box with Character Progress */}
      <div
        onClick={e => {
          e.stopPropagation();
          focusInput();
        }}
        className="bg-white rounded-2xl shadow-md border-2 border-slate-200/80 hover:border-emerald-300 p-6 sm:p-8 mb-4 min-h-36 flex flex-col justify-between leading-relaxed font-bangla text-2xl sm:text-3xl tracking-wide select-none relative cursor-text transition-colors"
      >
        <div className="w-full flex flex-wrap gap-x-1 gap-y-2 items-baseline">
          {graphemeSegments.map((seg, idx) => {
            const isCompleted = idx < currentGraphemeIndex;
            const isCurrent = idx === currentGraphemeIndex;
            const isError = lastErrorIndex === idx;

            if (seg.text === ' ' || !seg.text.trim()) {
              let spaceStyle = 'border-slate-300';
              if (isCompleted) {
                spaceStyle = 'border-transparent';
              } else if (isCurrent) {
                spaceStyle = isError
                  ? 'border-rose-500 bg-rose-200 ring-2 ring-rose-400 rounded-xs'
                  : 'border-emerald-500 bg-emerald-100 rounded-xs';
              }

              return (
                <span
                  key={idx}
                  className={`inline-block w-3 sm:w-4 border-b-4 transition-colors ${spaceStyle}`}
                >
                  &nbsp;
                </span>
              );
            }

            let segStyle = 'text-slate-400';
            if (isCompleted) {
              segStyle = 'text-emerald-700 font-medium';
            } else if (isCurrent) {
              segStyle = isError
                ? 'bg-rose-100 text-rose-700 rounded-md px-1.5 py-0.5 ring-2 ring-rose-400 font-bold'
                : 'bg-emerald-100 text-emerald-950 font-bold rounded-md px-1.5 py-0.5 border-b-4 border-emerald-500 ring-2 ring-emerald-300/40 shadow-xs';
            }

            return (
              <span
                key={idx}
                className={`transition-colors duration-75 inline-block ${segStyle}`}
              >
                {seg.text}
              </span>
            );
          })}
        </div>

        {/* Text Progress indicator line */}
        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-700 font-sans">
          <span>টাইপিং অগ্রগতি: {textProgress}%</span>
          <span>
            {stepIndex} / {keystrokeSteps.length} কি-স্ট্রোক
          </span>
        </div>
      </div>

      {/* Next Keystroke Visual Prompt */}
      <div className="mb-4 flex items-center justify-center gap-3">
        <span className="text-xs font-semibold text-slate-700 uppercase tracking-wider">
          এখন চাপুন:
        </span>
        <div
          className={`inline-flex items-center gap-2 ${
            lastErrorIndex !== null && lastErrorIndex === currentGraphemeIndex
              ? 'bg-rose-950 border-rose-500 ring-2 ring-rose-400'
              : 'bg-slate-900 border-slate-700'
          } text-white px-4 py-1.5 rounded-full shadow-md font-mono text-sm font-bold border transition-colors`}
        >
          <span
            className={
              lastErrorIndex !== null && lastErrorIndex === currentGraphemeIndex
                ? 'text-rose-400'
                : 'text-amber-400'
            }
          >
            {currentStep?.display || 'Space'}
          </span>
          <span className="text-slate-400 text-xs font-normal">→</span>
          <span className="text-emerald-400 font-bangla font-bold text-lg">
            {currentStep?.charName || 'স্পেস'}
          </span>
        </div>
      </div>

      {/* Interactive Bijoy Keyboard */}
      <div className="mb-4">
        <Keyboard
          targetKeyLabel={targetKeyLabel}
          requiresShift={requiresShift}
          activePressedCode={activePressedCode}
          activeFinger={activeFinger}
        />
      </div>

      {/* Score Modal on Finish */}
      {isFinished && finalResult && (
        <ScoreModal
          result={finalResult}
          onRestart={handleRestart}
          onNext={onNext}
          title={title}
        />
      )}
    </div>
  );
};
