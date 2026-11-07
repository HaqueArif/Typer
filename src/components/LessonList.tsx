import React from 'react';
import type { Lesson, LessonDifficulty } from '../types';
import { CheckCircle2, Play, Sparkles } from 'lucide-react';

interface LessonListProps {
  lessons: Lesson[];
  completedLessonIds: string[];
  onSelectLesson: (lesson: Lesson) => void;
}

export const LessonList: React.FC<LessonListProps> = ({
  lessons,
  completedLessonIds,
  onSelectLesson,
}) => {
  const getDifficultyBadge = (diff: LessonDifficulty) => {
    switch (diff) {
      case 'beginner':
        return <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">প্রাথমিক</span>;
      case 'intermediate':
        return <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-800">মাধ্যমিক</span>;
      case 'advanced':
        return <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-purple-100 text-purple-800">উচ্চতর</span>;
    }
  };

  const completedCount = completedLessonIds.length;
  const progressPercent = Math.round((completedCount / lessons.length) * 100);

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      {/* Hero Banner (Typing.com style) */}
      <div className="bg-linear-to-r from-emerald-600 via-teal-600 to-indigo-700 rounded-3xl p-6 sm:p-8 text-white shadow-xl mb-8 relative overflow-hidden">
        <div className="max-w-2xl relative z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-emerald-100 text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5" /> বিজয় বায়ান্ন টাচ টাইপিং কোর্স
          </div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight leading-tight font-bangla">
            সহজেই শিখুন দ্রুত বাংলা টাইপিং
          </h1>
          <p className="mt-2 text-emerald-100 text-sm sm:text-base leading-relaxed font-bangla">
            কোনো সফটওয়্যার ইনস্টল করা ছাড়াই ব্রাউজারে টাইপিং ডট কমের মতো হাতে-কলমে হোম রো থেকে শুরু করে যুক্তবর্ণ টাইপ করা শিখুন।
          </p>

          {/* Progress Bar */}
          <div className="mt-6 bg-black/20 p-4 rounded-2xl border border-white/10 backdrop-blur-xs">
            <div className="flex justify-between items-center text-xs font-semibold mb-1.5">
              <span>আপনার অগ্রগতি (Course Progress)</span>
              <span>{completedCount} / {lessons.length} সম্পন্ন ({progressPercent}%)</span>
            </div>
            <div className="w-full bg-white/20 rounded-full h-2.5 overflow-hidden">
              <div
                className="bg-emerald-400 h-2.5 rounded-full transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        </div>

        {/* Decorative background shape */}
        <div className="absolute -right-12 -bottom-12 w-64 h-64 rounded-full bg-white/10 blur-2xl pointer-events-none" />
      </div>

      {/* Lesson Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {lessons.map((lesson, index) => {
          const isCompleted = completedLessonIds.includes(lesson.id);

          return (
            <div
              key={lesson.id}
              onClick={() => onSelectLesson(lesson)}
              className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs hover:shadow-md hover:border-emerald-300 transition group cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="w-7 h-7 rounded-lg bg-slate-100 text-slate-700 font-bold text-xs flex items-center justify-center">
                      {index + 1}
                    </span>
                    {getDifficultyBadge(lesson.difficulty)}
                  </div>

                  {isCompleted ? (
                    <span className="flex items-center gap-1 text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                      <CheckCircle2 className="w-3.5 h-3.5" /> সম্পন্ন
                    </span>
                  ) : (
                    <span className="text-xs text-slate-700 font-medium">
                      {lesson.exercises.length} টি ধাপ
                    </span>
                  )}
                </div>

                <h3 className="text-xl font-bold text-slate-800 group-hover:text-emerald-600 transition font-bangla">
                  {lesson.banglaTitle}
                </h3>
                <p className="text-sm text-slate-600 mt-1 line-clamp-2 font-bangla leading-relaxed">
                  {lesson.description}
                </p>

                {/* Keys Introduced Tags */}
                <div className="mt-3 flex flex-wrap gap-1.5 items-center">
                  <span className="text-xs text-slate-500 mr-1 self-center font-bangla">বর্ণ:</span>
                  {lesson.keysIntroduced.map((k, ki) => {
                    const cleanLabel = (
                      k === 'া' ? 'া-কার' :
                      k === 'ি' ? 'ি-কার' :
                      k === 'ু' ? 'ু-কার' :
                      k === 'ী' ? 'ী-কার' :
                      k === 'ূ' ? 'ূ-কার' :
                      k === 'ে' ? 'ে-কার' :
                      k === 'ৈ' ? 'ৈ-কার' :
                      k === 'ৃ' ? 'ৃ-কার' :
                      k === '্' ? 'হসন্ত (্)' :
                      k === 'ঁ' ? 'চন্দ্রবিন্দু (ঁ)' :
                      k
                    );
                    return (
                      <span
                        key={ki}
                        className="inline-block px-2.5 py-0.5 bg-slate-100 text-slate-800 font-bold rounded-md text-sm border border-slate-200 font-bangla"
                      >
                        {cleanLabel}
                      </span>
                    );
                  })}
                </div>
              </div>

              {/* Start Lesson Button */}
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-sm text-slate-600 font-medium font-bangla">
                  {lesson.exercises[0]?.text.slice(0, 18)}...
                </span>

                <button
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-emerald-50 text-emerald-700 group-hover:bg-emerald-600 group-hover:text-white transition shadow-xs cursor-pointer"
                >
                  <Play className="w-3 h-3 fill-current" />
                  {isCompleted ? 'পুনরায় করুন' : 'শুরু করুন'}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
