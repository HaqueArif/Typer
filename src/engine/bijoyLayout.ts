import type { Finger, KeyMapItem, KeystrokeSequence, BijoyKeystrokeStep } from '../types';

export const BIJOY_KEYBOARD_ROWS: KeyMapItem[][] = [
  // Row 0: Number Row
  [
    { code: 'Backquote', label: '`', normal: '`', shift: '~', finger: 'left-pinky', row: 0 },
    { code: 'Digit1', label: '1', normal: '১', shift: '!', finger: 'left-pinky', row: 0 },
    { code: 'Digit2', label: '2', normal: '২', shift: '@', finger: 'left-ring', row: 0 },
    { code: 'Digit3', label: '3', normal: '৩', shift: '#', finger: 'left-middle', row: 0 },
    { code: 'Digit4', label: '4', normal: '৪', shift: '৳', finger: 'left-index', row: 0 },
    { code: 'Digit5', label: '5', normal: '৫', shift: '%', finger: 'left-index', row: 0 },
    { code: 'Digit6', label: '6', normal: '৬', shift: 'ঁ', finger: 'right-index', row: 0 },
    { code: 'Digit7', label: '7', normal: '৭', shift: 'ঁ', finger: 'right-index', row: 0 },
    { code: 'Digit8', label: '8', normal: '৮', shift: '*', finger: 'right-middle', row: 0 },
    { code: 'Digit9', label: '9', normal: '৯', shift: '(', finger: 'right-ring', row: 0 },
    { code: 'Digit0', label: '0', normal: '০', shift: ')', finger: 'right-pinky', row: 0 },
    { code: 'Minus', label: '-', normal: '-', shift: '_', finger: 'right-pinky', row: 0 },
    { code: 'Equal', label: '=', normal: '=', shift: '+', finger: 'right-pinky', row: 0 },
    { code: 'Backspace', label: 'Back', normal: '', shift: '', finger: 'right-pinky', row: 0, width: 'flex-1' },
  ],
  // Row 1: Top Row (QWERTY)
  [
    { code: 'Tab', label: 'Tab', normal: '', shift: '', finger: 'left-pinky', row: 1, width: 'w-14' },
    { code: 'KeyQ', label: 'Q', normal: 'ঙ', shift: 'ং', finger: 'left-pinky', row: 1 },
    { code: 'KeyW', label: 'W', normal: 'য', shift: 'য়', finger: 'left-ring', row: 1 },
    { code: 'KeyE', label: 'E', normal: 'ড', shift: 'ঢ', finger: 'left-middle', row: 1 },
    { code: 'KeyR', label: 'R', normal: 'প', shift: 'ফ', finger: 'left-index', row: 1 },
    { code: 'KeyT', label: 'T', normal: 'ট', shift: 'ঠ', finger: 'left-index', row: 1 },
    { code: 'KeyY', label: 'Y', normal: 'চ', shift: 'ছ', finger: 'right-index', row: 1 },
    { code: 'KeyU', label: 'U', normal: 'জ', shift: 'ঝ', finger: 'right-index', row: 1 },
    { code: 'KeyI', label: 'I', normal: 'হ', shift: 'ঞ', finger: 'right-middle', row: 1 },
    { code: 'KeyO', label: 'O', normal: 'গ', shift: 'ঘ', finger: 'right-ring', row: 1 },
    { code: 'KeyP', label: 'P', normal: 'ড়', shift: 'ঢ়', finger: 'right-pinky', row: 1 },
    { code: 'BracketLeft', label: '[', normal: '[', shift: '{', finger: 'right-pinky', row: 1 },
    { code: 'BracketRight', label: ']', normal: ']', shift: '}', finger: 'right-pinky', row: 1 },
    { code: 'Backslash', label: '\\', normal: 'ৎ', shift: 'ঃ', finger: 'right-pinky', row: 1, width: 'w-14' },
  ],
  // Row 2: Home Row (ASDF)
  [
    { code: 'CapsLock', label: 'Caps', normal: '', shift: '', finger: 'left-pinky', row: 2, width: 'w-16' },
    { code: 'KeyA', label: 'A', normal: 'ৃ', shift: 'র্', finger: 'left-pinky', row: 2 },
    { code: 'KeyS', label: 'S', normal: 'ু', shift: 'ূ', finger: 'left-ring', row: 2 },
    { code: 'KeyD', label: 'D', normal: 'ি', shift: 'ী', finger: 'left-middle', row: 2 },
    { code: 'KeyF', label: 'F', normal: 'া', shift: 'অ', finger: 'left-index', row: 2 },
    { code: 'KeyG', label: 'G', normal: '্', shift: '।', finger: 'left-index', row: 2 },
    { code: 'KeyH', label: 'H', normal: 'ব', shift: 'ভ', finger: 'right-index', row: 2 },
    { code: 'KeyJ', label: 'J', normal: 'ক', shift: 'খ', finger: 'right-index', row: 2 },
    { code: 'KeyK', label: 'K', normal: 'ত', shift: 'থ', finger: 'right-middle', row: 2 },
    { code: 'KeyL', label: 'L', normal: 'দ', shift: 'ধ', finger: 'right-ring', row: 2 },
    { code: 'Semicolon', label: ';', normal: ';', shift: ':', finger: 'right-pinky', row: 2 },
    { code: 'Quote', label: "'", normal: "'", shift: '"', finger: 'right-pinky', row: 2 },
    { code: 'Enter', label: 'Enter', normal: '\n', shift: '\n', finger: 'right-pinky', row: 2, width: 'flex-1' },
  ],
  // Row 3: Bottom Row (ZXCV)
  [
    { code: 'ShiftLeft', label: 'Shift', normal: '', shift: '', finger: 'left-pinky', row: 3, width: 'w-20' },
    { code: 'KeyZ', label: 'Z', normal: '্র', shift: '্য', finger: 'left-pinky', row: 3 },
    { code: 'KeyX', label: 'X', normal: 'ও', shift: 'ৌ', finger: 'left-ring', row: 3 },
    { code: 'KeyC', label: 'C', normal: 'ে', shift: 'ৈ', finger: 'left-middle', row: 3 },
    { code: 'KeyV', label: 'V', normal: 'র', shift: 'ল', finger: 'left-index', row: 3 },
    { code: 'KeyB', label: 'B', normal: 'ন', shift: 'ণ', finger: 'left-index', row: 3 },
    { code: 'KeyN', label: 'N', normal: 'স', shift: 'ষ', finger: 'right-index', row: 3 },
    { code: 'KeyM', label: 'M', normal: 'ম', shift: 'শ', finger: 'right-index', row: 3 },
    { code: 'Comma', label: ',', normal: ',', shift: '<', finger: 'right-middle', row: 3 },
    { code: 'Period', label: '.', normal: '।', shift: '>', finger: 'right-ring', row: 3 },
    { code: 'Slash', label: '/', normal: '/', shift: '?', finger: 'right-pinky', row: 3 },
    { code: 'ShiftRight', label: 'Shift', normal: '', shift: '', finger: 'right-pinky', row: 3, width: 'flex-1' },
  ],
  // Row 4: Space Row
  [
    { code: 'Space', label: 'Space', normal: ' ', shift: ' ', finger: 'thumb', row: 4, width: 'w-96' },
  ]
];

// Flat key map by code
export const KEY_BY_CODE: Record<string, KeyMapItem> = {};
BIJOY_KEYBOARD_ROWS.forEach(row => {
  row.forEach(item => {
    KEY_BY_CODE[item.code] = item;
  });
});

// Human-readable names for keys
export const BANGLA_CHAR_NAMES: Record<string, string> = {
  'া': 'া-কার',
  'ি': 'ি-কার',
  'ী': 'ী-কার',
  'ু': 'ু-কার',
  'ূ': 'ূ-কার',
  'ৃ': 'ৃ-কার',
  'ে': 'ে-কার',
  'ৈ': 'ৈ-কার',
  'ো': 'ো-কার',
  'ৌ': 'ৌ-কার',
  '্': 'হসন্ত (্)',
  'ঁ': 'চন্দ্রবিন্দু (ঁ)',
  'ং': 'অনুস্বার (ং)',
  'ঃ': 'বিসর্গ (ঃ)',
  '্য': 'য-ফলা (্য)',
  '্র': 'র-ফলা (্র)',
  'র্': 'রেফ (র্)',
  '।': 'দাঁড়ি (।)',
  ' ': 'স্পেস',
};

// Flat lookup for Single Char to physical key
export const SINGLE_CHAR_MAP: Record<string, { code: string; label: string; shift: boolean; finger: Finger }> = {};
BIJOY_KEYBOARD_ROWS.forEach(row => {
  row.forEach(item => {
    if (item.normal) {
      SINGLE_CHAR_MAP[item.normal] = {
        code: item.code,
        label: item.label,
        shift: false,
        finger: item.finger,
      };
    }
    if (item.shift) {
      SINGLE_CHAR_MAP[item.shift] = {
        code: item.code,
        label: item.label,
        shift: true,
        finger: item.finger,
      };
    }
  });
});

// Composite mappings for Independent Vowels (স্বরবর্ণ) and special forms
export const COMPOSITE_CHAR_MAP: Record<string, { key: string; shift: boolean; finger: Finger; name?: string }[]> = {
  // Swaraborno using 'g' (link key)
  'অ': [{ key: 'f', shift: true, finger: 'left-index', name: 'অ' }],
  'আ': [
    { key: 'g', shift: false, finger: 'left-index', name: 'হসন্ত (্)' },
    { key: 'f', shift: false, finger: 'left-index', name: 'া-কার' },
  ],
  'ই': [
    { key: 'g', shift: false, finger: 'left-index', name: 'হসন্ত (্)' },
    { key: 'd', shift: false, finger: 'left-middle', name: 'ি-কার' },
  ],
  'ঈ': [
    { key: 'g', shift: false, finger: 'left-index', name: 'হসন্ত (্)' },
    { key: 'd', shift: true, finger: 'left-middle', name: 'ী-কার' },
  ],
  'উ': [
    { key: 'g', shift: false, finger: 'left-index', name: 'হসন্ত (্)' },
    { key: 's', shift: false, finger: 'left-ring', name: 'ু-কার' },
  ],
  'ঊ': [
    { key: 'g', shift: false, finger: 'left-index', name: 'হসন্ত (্)' },
    { key: 's', shift: true, finger: 'left-ring', name: 'ূ-কার' },
  ],
  'ঋ': [
    { key: 'g', shift: false, finger: 'left-index', name: 'হসন্ত (্)' },
    { key: 'a', shift: false, finger: 'left-pinky', name: 'ৃ-কার' },
  ],
  'এ': [
    { key: 'g', shift: false, finger: 'left-index', name: 'হসন্ত (্)' },
    { key: 'c', shift: false, finger: 'left-middle', name: 'ে-কার' },
  ],
  'ঐ': [
    { key: 'g', shift: false, finger: 'left-index', name: 'হসন্ত (্)' },
    { key: 'c', shift: true, finger: 'left-middle', name: 'ৈ-কার' },
  ],
  'ও': [{ key: 'x', shift: false, finger: 'left-ring', name: 'ও' }],
  'ঔ': [
    { key: 'g', shift: false, finger: 'left-index', name: 'হসন্ত (্)' },
    { key: 'x', shift: true, finger: 'left-ring', name: 'ৌ' },
  ],
  'ো': [
    { key: 'c', shift: false, finger: 'left-middle', name: 'ে-কার' },
    { key: 'f', shift: false, finger: 'left-index', name: 'া-কার' },
  ],
  'ৌ': [
    { key: 'x', shift: true, finger: 'left-ring', name: 'ৌ' },
  ],
  '্য': [{ key: 'z', shift: true, finger: 'left-pinky', name: 'য-ফলা (্য)' }],
  '্র': [{ key: 'z', shift: false, finger: 'left-pinky', name: 'র-ফলা (্র)' }],
  'র্': [{ key: 'a', shift: true, finger: 'left-pinky', name: 'রেফ (র্)' }],
  // Decomposed nukta characters mapping to single Bijoy keys
  'ড\u09BC': [{ key: 'p', shift: false, finger: 'right-pinky', name: 'ড়' }],
  'ঢ\u09BC': [{ key: 'p', shift: true, finger: 'right-pinky', name: 'ঢ়' }],
  'য\u09BC': [{ key: 'w', shift: true, finger: 'left-ring', name: 'য়' }],
};

/**
 * Normalizes any Bengali decomposed nukta sequences into canonical precomposed characters
 */
export function canonicalizeBangla(text: string): string {
  if (!text) return '';
  return text
    .replace(/\u09A1\u09BC/g, '\u09DC') // ড + nukta -> ড় (Key P)
    .replace(/\u09A2\u09BC/g, '\u09DD') // ঢ + nukta -> ঢ় (Shift + Key P)
    .replace(/\u09AF\u09BC/g, '\u09DF'); // য + nukta -> য় (Shift + Key W)
}

/**
 * Returns single keystroke info for a single character
 */
function getSingleKeyStep(char: string) {
  // Handle space explicitly first
  if (char === ' ') {
    return {
      key: ' ',
      code: 'Space',
      shift: false,
      display: 'Space',
      finger: 'thumb' as Finger,
      charName: 'স্পেস',
    };
  }

  if (SINGLE_CHAR_MAP[char]) {
    const info = SINGLE_CHAR_MAP[char];
    return {
      key: info.label.toLowerCase(),
      code: info.code,
      shift: info.shift,
      display: info.shift ? `Shift + ${info.label}` : info.label,
      finger: info.finger,
      charName: BANGLA_CHAR_NAMES[char] || char,
    };
  }
  return {
    key: char.toLowerCase(),
    shift: false,
    display: char.toUpperCase(),
    finger: 'right-index' as Finger,
    charName: char,
  };
}

/**
 * Converts whole text into an array of authentic Bijoy Bayanno keystroke steps.
 * 
 * Typing order rules:
 * 1. Pre-kars (ি, ে, ৈ) are typed BEFORE the consonant (e.g. কি = D then J; কে = C then J; কৈ = Shift+C then J).
 * 2. Exception: In conjuncts (যুক্তবর্ণ), ি-কার is typed AFTER the conjunct (e.g. শক্তি = শ, ক, ্, ত, ি).
 * 3. Compound kars (ো, ৌ):
 *    - ো = ে (C) -> Consonant -> া (F)
 *    - ৌ = ে (C) -> Consonant -> ৌ (Shift+X)
 * 4. Post-kars & below-kars (া, ু, ী, ূ, ৃ) are typed AFTER the consonant.
 * 5. Reph (র্ = Shift+A) is typed BEFORE the consonant/conjunct.
 */
export function getBijoyKeystrokeSteps(rawText: string): BijoyKeystrokeStep[] {
  const normalized = canonicalizeBangla(rawText.normalize('NFC'));
  if (!normalized) return [];

  // Grapheme segmentation keeps each visual Bengali syllable intact
  let segments: { text: string; index: number }[] = [];
  if (typeof Intl !== 'undefined' && Intl.Segmenter) {
    const segmenter = new Intl.Segmenter('bn', { granularity: 'grapheme' });
    segments = Array.from(segmenter.segment(normalized)).map((s, idx) => ({
      text: s.segment,
      index: idx,
    }));
  } else {
    segments = Array.from(normalized).map((ch, idx) => ({
      text: ch,
      index: idx,
    }));
  }

  const allSteps: BijoyKeystrokeStep[] = [];

  segments.forEach((segObj, sIdx) => {
    const seg = segObj.text;

    function addStep(item: { key: string; code?: string; shift: boolean; display: string; finger: Finger; charName: string }) {
      allSteps.push({
        key: item.key.toLowerCase(),
        code: item.code,
        shift: item.shift,
        display: item.display,
        finger: item.finger,
        charName: item.charName,
        graphemeIndex: sIdx,
        segmentText: seg,
      });
    }

    // 1. Space or Whitespace
    if (seg === ' ' || !seg.trim()) {
      Array.from(seg).forEach(() => {
        addStep(getSingleKeyStep(' '));
      });
      return;
    }

    // 2. Exact Swaraborno match
    if (COMPOSITE_CHAR_MAP[seg]) {
      COMPOSITE_CHAR_MAP[seg].forEach(item => {
        addStep({
          key: item.key.toLowerCase(),
          shift: item.shift,
          display: item.shift ? `Shift + ${item.key.toUpperCase()}` : item.key.toUpperCase(),
          finger: item.finger,
          charName: item.name || BANGLA_CHAR_NAMES[item.key] || item.key,
        });
      });
      return;
    }

    // 3. Exact single character match (single consonant, digit, punctuation)
    if (SINGLE_CHAR_MAP[seg]) {
      addStep(getSingleKeyStep(seg));
      return;
    }

    // 4. Bengali Syllable breakdown
    let chars = Array.from(seg);

    // Check Reph at beginning (র + ্)
    let hasReph = false;
    if (chars.length >= 2 && chars[0] === 'র' && chars[1] === '\u09CD') {
      hasReph = true;
      chars = chars.slice(2);
    }

    // Trailing modifiers: chandrabindu (ঁ), anusvara (ং), visarga (ঃ)
    let trailingModifier: string | null = null;
    const lastChar = chars[chars.length - 1];
    if (['ঁ', 'ং', 'ঃ'].includes(lastChar)) {
      trailingModifier = chars.pop() || null;
    }

    // Check if remaining base is an independent vowel (e.g. আঁ -> আ + ঁ)
    const baseStr = chars.join('');
    if (COMPOSITE_CHAR_MAP[baseStr]) {
      if (hasReph) {
        addStep(getSingleKeyStep('র্'));
      }
      COMPOSITE_CHAR_MAP[baseStr].forEach(item => {
        addStep({
          key: item.key.toLowerCase(),
          shift: item.shift,
          display: item.shift ? `Shift + ${item.key.toUpperCase()}` : item.key.toUpperCase(),
          finger: item.finger,
          charName: item.name || BANGLA_CHAR_NAMES[item.key] || item.key,
        });
      });
      if (trailingModifier) {
        addStep(getSingleKeyStep(trailingModifier));
      }
      return;
    }

    // Extract vowel kar if present
    let kar: string | null = null;
    const lastAfterMod = chars[chars.length - 1];
    if (/[\u09BE-\u09CC]/.test(lastAfterMod)) {
      kar = chars.pop() || null;
    }

    // Substitute conjunct phonetics: ্ + য -> ্য, ্ + র -> ্র
    const processedChars: string[] = [];
    for (let i = 0; i < chars.length; i++) {
      if (chars[i] === '\u09CD' && chars[i + 1] === 'য') {
        processedChars.push('্য');
        i++;
      } else if (chars[i] === '\u09CD' && chars[i + 1] === 'র') {
        processedChars.push('্র');
        i++;
      } else {
        processedChars.push(chars[i]);
      }
    }

    const isConjunct =
      processedChars.includes('\u09CD') ||
      processedChars.includes('্য') ||
      processedChars.includes('্র');

    // Step a: Reph (Shift + A) is typed before the letter in Bijoy
    if (hasReph) {
      addStep(getSingleKeyStep('র্'));
    }

    // Step b: Pre-kars (ি, ে, ৈ)
    // Rule: ি, ে, ৈ are typed before the consonant.
    // Exception: in conjuncts (যুক্তবর্ণ), ি-কার is typed AFTER the conjunct.
    const isPreKar = kar === '\u09C7' || kar === '\u09C8' || (kar === '\u09BF' && !isConjunct);

    if (kar === '\u09CB' || kar === '\u09CC') {
      // ো or ৌ: first part is ে-কার (Key C) typed before consonant
      addStep(getSingleKeyStep('ে'));
    } else if (isPreKar && kar) {
      addStep(getSingleKeyStep(kar));
    }

    // Step c: Consonant(s) / Conjunct
    for (const c of processedChars) {
      addStep(getSingleKeyStep(c));
    }

    // Step d: If ি-কার was delayed because of conjunct, type it now!
    if (kar === '\u09BF' && isConjunct) {
      addStep(getSingleKeyStep('ি'));
    }

    // Step e: Post-kars & below-kars (া, ু, ী, ূ, ৃ) typed AFTER the consonant
    if (kar && ['া', 'ু', 'ী', 'ূ', 'ৃ'].includes(kar)) {
      addStep(getSingleKeyStep(kar));
    }

    // Step f: Second part of compound kars
    if (kar === '\u09CB') {
      // ো -> া-কার (Key F)
      addStep(getSingleKeyStep('া'));
    } else if (kar === '\u09CC') {
      // ৌ -> ৌ (Shift + X)
      addStep({
        key: 'x',
        code: 'KeyX',
        shift: true,
        display: 'Shift + X',
        finger: 'left-ring',
        charName: 'ৌ',
      });
    }

    // Step g: Trailing modifiers (ঁ, ং, ঃ)
    if (trailingModifier) {
      addStep(getSingleKeyStep(trailingModifier));
    }
  });

  return allSteps;
}

/**
 * Backward compatibility: Decomposes any Bangla character / glyph into sequence of Bijoy keystrokes
 */
export function getKeystrokesForChar(rawChar: string): KeystrokeSequence {
  const char = canonicalizeBangla(rawChar);
  if (COMPOSITE_CHAR_MAP[char]) {
    return {
      char,
      keys: COMPOSITE_CHAR_MAP[char].map(item => ({
        key: item.key.toLowerCase(),
        shift: item.shift,
        display: item.shift ? `Shift + ${item.key.toUpperCase()}` : item.key.toUpperCase(),
        finger: item.finger,
      })),
    };
  }

  const step = getSingleKeyStep(char);
  return {
    char,
    keys: [
      {
        key: step.key,
        shift: step.shift,
        display: step.display,
        finger: step.finger,
      },
    ],
  };
}

export const FINGER_NAMES_BN: Record<Finger, string> = {
  'left-pinky': 'বাম কনিষ্ঠা',
  'left-ring': 'বাম অনামিকা',
  'left-middle': 'বাম মধ্যমা',
  'left-index': 'বাম তর্জনী',
  'thumb': 'বৃদ্ধাঙ্গুলি (স্পেস)',
  'right-index': 'ডান তর্জনী',
  'right-middle': 'ডান মধ্যমা',
  'right-ring': 'ডান অনামিকা',
  'right-pinky': 'ডান কনিষ্ঠা',
};