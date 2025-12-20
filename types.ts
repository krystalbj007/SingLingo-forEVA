export interface LyricLine {
  time: number; // Seconds
  text: string;
  translation?: string; // Optional Chinese translation
  analysis?: LinguisticAnalysis; // AI analysis result
}

export interface LinguisticAnalysis {
  links: LinkData[];     // Connecting words
  stress: StressData[];  // Stressed syllables/letters
  elisions: ElisionData[]; // Silent/swallowed letters
  explanation?: string; // AI Coach tip
}

export interface LinkData {
  fromWordIndex: number;
  toWordIndex: number;
  type: 'consonant-vowel' | 'consonant-consonant' | 'vowel-vowel' | 'vowel-consonant';
}

export interface StressData {
  wordIndex: number;
  charIndex: number; // Index of the vowel being stressed
}

export interface ElisionData {
  wordIndex: number;
  charIndex: number; // Index of the letter being swallowed
}

export interface PlayerState {
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  playbackRate: number;
  loopActive: boolean;
  loopStart: number | null;
  loopEnd: number | null;
}

export interface SavedSong {
  id: string; // timestamp based ID
  name: string;
  audioBlob: Blob; // The raw audio file
  lyrics: LyricLine[]; // The full parsed lyrics with AI analysis
  createdAt: number;
}