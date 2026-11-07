import { useState, useEffect } from 'react';
import { Header } from './components/Header';
import type { ActiveTab } from './components/Header';
import { LessonList } from './components/LessonList';
import { TypingArea } from './components/TypingArea';
import { SpeedTestView } from './components/SpeedTestView';
import { CustomPracticeView } from './components/CustomPracticeView';
import { StatsDashboard } from './components/StatsDashboard';
import { GuideView } from './components/GuideView';
import { LESSONS } from './data/lessonsData';
import type { Lesson, TestResult, UserStats } from './types';
import { ArrowLeft } from 'lucide-react';

const STATS_STORAGE_KEY = 'bijoy_typing_stats_v1';

const INITIAL_STATS: UserStats = {
  completedLessons: [],
  totalPracticeTimeSeconds: 0,
  testsTaken: 0,
  bestWpm: 0,
  averageAccuracy: 100,
  history: [],
  struggledCharacters: {},
};

export function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('lessons');
  const [inputMode, setInputMode] = useState<'engine' | 'native'>('engine');
  const [stats, setStats] = useState<UserStats>(() => {
    try {
      const saved = localStorage.getItem(STATS_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          ...INITIAL_STATS,
          ...parsed,
          struggledCharacters: parsed.struggledCharacters || {},
        };
      }
    } catch {
      // Ignore
    }
    return INITIAL_STATS;
  });

  // Active Lesson Session State
  const [activeLesson, setActiveLesson] = useState<Lesson | null>(null);
  const [exerciseIndex, setExerciseIndex] = useState(0);

  // Trouble Drill Session State (focused on problem characters)
  const [troubleDrillText, setTroubleDrillText] = useState<{ title: string; text: string } | null>(null);

  // Sync stats to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STATS_STORAGE_KEY, JSON.stringify(stats));
    } catch {
      // Ignore
    }
  }, [stats]);

  // Record a completed test or exercise result
  const handleSaveResult = (result: TestResult, isLessonExercise: boolean = false) => {
    setStats(prev => {
      const newHistory = [result, ...prev.history];
      const newBestWpm = Math.max(prev.bestWpm, result.wpm);
      const totalTime = prev.totalPracticeTimeSeconds + result.durationSeconds;
      const totalAcc = newHistory.reduce((acc, curr) => acc + curr.accuracy, 0);
      const newAvgAcc = Math.round(totalAcc / newHistory.length);

      // Merge struggled characters from this test/exercise
      const updatedStruggled = { ...(prev.struggledCharacters || {}) };
      if (result.struggledChars) {
        Object.entries(result.struggledChars).forEach(([char, count]) => {
          const existing = updatedStruggled[char] || {
            char,
            errorCount: 0,
            totalAttempts: 0,
            lastStruggledDate: new Date().toLocaleDateString('bn-BD'),
          };
          updatedStruggled[char] = {
            ...existing,
            errorCount: existing.errorCount + count,
            totalAttempts: existing.totalAttempts + count,
            lastStruggledDate: new Date().toLocaleDateString('bn-BD'),
          };
        });
      }

      let newCompletedLessons = prev.completedLessons;
      if (isLessonExercise && activeLesson) {
        // If completed all steps of lesson, mark complete
        if (exerciseIndex + 1 >= activeLesson.exercises.length) {
          if (!newCompletedLessons.includes(activeLesson.id)) {
            newCompletedLessons = [...newCompletedLessons, activeLesson.id];
          }
        }
      }

      return {
        ...prev,
        bestWpm: newBestWpm,
        totalPracticeTimeSeconds: totalTime,
        testsTaken: prev.testsTaken + 1,
        averageAccuracy: newAvgAcc,
        completedLessons: newCompletedLessons,
        history: newHistory,
        struggledCharacters: updatedStruggled,
      };
    });
  };

  const handleClearStats = () => {
    if (window.confirm('আপনি কি সত্যিই আপনার সমস্ত টাইপিং স্কোর, দুর্বল বর্ণ ট্র্যাকার ও ইতিহাস মুছে ফেলতে চান?')) {
      setStats(INITIAL_STATS);
    }
  };

  // Lesson handlers
  const handleSelectLesson = (lesson: Lesson) => {
    setActiveLesson(lesson);
    setExerciseIndex(0);
  };

  const handleNextExercise = () => {
    if (!activeLesson) return;
    if (exerciseIndex + 1 < activeLesson.exercises.length) {
      setExerciseIndex(prev => prev + 1);
    } else {
      // Completed all 20 exercises for this lesson!
      setActiveLesson(null);
      setExerciseIndex(0);
    }
  };

  const handlePrevExercise = () => {
    if (exerciseIndex > 0) {
      setExerciseIndex(prev => prev - 1);
    }
  };

  // Launch focused practice for troubled characters
  const handlePracticeTroubleKeys = (troubleChars: string[]) => {
    if (troubleChars.length === 0) return;

    // Generate repetitive focused drills using the trouble characters
    const drillChunks: string[] = [];
    troubleChars.forEach(c => {
      drillChunks.push(`${c} ${c} ${c} ${c}`);
    });
    // Mixed pairs
    for (let i = 0; i < troubleChars.length - 1; i++) {
      drillChunks.push(`${troubleChars[i]}${troubleChars[i + 1]} ${troubleChars[i + 1]}${troubleChars[i]}`);
    }
    const drillText = drillChunks.join(' ');

    setTroubleDrillText({
      title: `দুর্বল বর্ণ স্পেশাল ড্রিল (${troubleChars.join(', ')})`,
      text: drillText,
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800">
      {/* Top Navigation */}
      <Header
        activeTab={activeTab}
        onSelectTab={tab => {
          setActiveTab(tab);
          setActiveLesson(null);
          setTroubleDrillText(null);
        }}
        inputMode={inputMode}
        onChangeInputMode={setInputMode}
      />

      {/* Main Content Area */}
      <main className="flex-1 pb-16">
        {/* TROUBLE DRILL OVERLAY VIEW (if active) */}
        {troubleDrillText ? (
          <div className="py-4">
            <div className="max-w-5xl mx-auto px-4 mb-3">
              <button
                onClick={() => setTroubleDrillText(null)}
                className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-white px-3 py-1.5 rounded-lg border border-slate-200 transition cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" /> পরিসংখ্যানে ফিরে যান
              </button>
            </div>

            <TypingArea
              title={troubleDrillText.title}
              targetText={troubleDrillText.text}
              instruction="আপনার দুর্বল বর্ণগুলো বারবার টাইপ করে নির্ভুলতা বাড়ান"
              onComplete={result => {
                handleSaveResult(result, false);
              }}
              inputMode={inputMode}
              onChangeInputMode={setInputMode}
            />
          </div>
        ) : (
          <>
            {/* TAB 1: LESSONS */}
            {activeTab === 'lessons' && (
              <>
                {activeLesson ? (
                  <div className="py-3">
                    {/* Back button & lesson title */}
                    <div className="max-w-5xl mx-auto px-4 mb-2 flex items-center justify-between">
                      <button
                        onClick={() => setActiveLesson(null)}
                        className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-white px-3 py-1.5 rounded-lg border border-slate-200 transition cursor-pointer"
                      >
                        <ArrowLeft className="w-4 h-4" /> পাঠ তালিকায় ফিরে যান
                      </button>

                      <div className="text-sm font-bold text-slate-700 bg-white px-3 py-1.5 rounded-lg border border-slate-200 font-bangla">
                        {activeLesson.banglaTitle}
                      </div>
                    </div>

                    <TypingArea
                      key={`${activeLesson.id}-${exerciseIndex}`}
                      title={`${activeLesson.banglaTitle}`}
                      targetText={activeLesson.exercises[exerciseIndex].text}
                      instruction={activeLesson.exercises[exerciseIndex].instruction}
                      stepNumber={exerciseIndex + 1}
                      totalSteps={activeLesson.exercises.length}
                      onPrevStep={handlePrevExercise}
                      onNextStep={handleNextExercise}
                      onSelectStep={idx => setExerciseIndex(idx)}
                      onComplete={result => handleSaveResult(result, true)}
                      onNext={handleNextExercise}
                      inputMode={inputMode}
                      onChangeInputMode={setInputMode}
                    />
                  </div>
                ) : (
                  <LessonList
                    lessons={LESSONS}
                    completedLessonIds={stats.completedLessons}
                    onSelectLesson={handleSelectLesson}
                  />
                )}
              </>
            )}

            {/* TAB 2: SPEED TEST */}
            {activeTab === 'speed-test' && (
              <SpeedTestView
                onSaveResult={result => handleSaveResult(result, false)}
                inputMode={inputMode}
                onChangeInputMode={setInputMode}
              />
            )}

            {/* TAB 3: CUSTOM PRACTICE */}
            {activeTab === 'custom' && (
              <CustomPracticeView
                onSaveResult={result => handleSaveResult(result, false)}
                inputMode={inputMode}
                onChangeInputMode={setInputMode}
              />
            )}

            {/* TAB 4: STATS & TROUBLE KEYS */}
            {activeTab === 'stats' && (
              <StatsDashboard
                stats={stats}
                onClearStats={handleClearStats}
                onPracticeTroubleKeys={handlePracticeTroubleKeys}
              />
            )}

            {/* TAB 5: GUIDE */}
            {activeTab === 'guide' && <GuideView />}
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-6 text-center text-xs text-slate-700">
        <div className="max-w-5xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div>
            © {new Date().getFullYear()} বিজয় টাইপিং - Typing.com Style Bangla Typing Platform
          </div>
          <div className="flex items-center gap-4 text-slate-700 font-medium">
            <span>বিজয় বায়ান্ন লেআউট</span>
            <span>•</span>
            <span>২০০+ নিবিড় অনুশীলনী ধাপ</span>
            <span>•</span>
            <span>দুর্বল বর্ণ ট্র্যাকার</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
