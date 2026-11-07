export type Finger =
  | 'left-pinky'
  | 'left-ring'
  | 'left-middle'
  | 'left-index'
  | 'thumb'
  | 'right-index'
  | 'right-middle'
  | 'right-ring'
  | 'right-pinky';

export interface KeyMapItem {
  code: string;           // Physical key code, e.g. 'KeyJ'
  label: string;          // English display label, e.g. 'J'
  normal: string;         // Bangla output without shift, e.g. 'ক'
  shift: string;          // Bangla output with shift, e.g. 'খ'
  finger: Finger;         // Recommended finger
  row: number;            // 0: numbers, 1: QWERTY, 2: ASDF, 3: ZXCV, 4: Space
  width?: string;         // Optional CSS width class for special keys
}

export interface KeystrokeSequence {
  char: string;           // Target Bangla character or grapheme cluster
  keys: {
    key: string;          // Key letter to press, e.g. 'j'
    shift: boolean;       // Whether Shift is required
    display: string;      // Visual hint, e.g. 'J' or 'Shift + J'
    finger: Finger;
  }[];
}

export interface BijoyKeystrokeStep {
  key: string;            // Key letter to press, e.g. 'd', 'j', ' '
  code?: string;          // Key code, e.g. 'KeyD'
  shift: boolean;         // Whether Shift is required
  display: string;        // Visual hint, e.g. 'D', 'Shift + D', 'Space'
  finger: Finger;         // Recommended finger
  charName: string;       // Human-readable Bangla label, e.g. 'ি-কার', 'ক', 'স্পেস'
  graphemeIndex: number;  // Visual segment index in the text
  segmentText: string;    // Full visual segment text, e.g. 'কি'
}

export type LessonDifficulty = 'beginner' | 'intermediate' | 'advanced';

export interface Exercise {
  id: string;
  text: string;
  instruction?: string;
}

export interface Lesson {
  id: string;
  title: string;
  banglaTitle: string;
  description: string;
  difficulty: LessonDifficulty;
  category: 'home-row' | 'top-row' | 'bottom-row' | 'vowels' | 'conjuncts' | 'words' | 'sentences';
  keysIntroduced: string[];
  exercises: Exercise[];
}

export interface TestResult {
  id: string;
  date: string;
  wpm: number;
  cpm: number;
  accuracy: number;
  durationSeconds: number;
  totalKeystrokes: number;
  errorsCount: number;
  lessonOrTestTitle: string;
  struggledChars?: Record<string, number>; // character -> error count in this session
}

export interface StruggledCharStat {
  char: string;
  errorCount: number;
  totalAttempts: number;
  lastStruggledDate: string;
}

export interface UserStats {
  completedLessons: string[]; // array of lesson IDs
  totalPracticeTimeSeconds: number;
  testsTaken: number;
  bestWpm: number;
  averageAccuracy: number;
  history: TestResult[];
  struggledCharacters: Record<string, StruggledCharStat>;
}
