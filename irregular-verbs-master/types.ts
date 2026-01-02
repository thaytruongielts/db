
export interface Verb {
  v1: string;
  v2: string;
  v3: string;
  meaning: string;
}

export interface UserAnswer {
  questionIndex: number;
  v1: string;
  v2: string;
  v3: string;
  isCorrect: boolean | null;
}

export enum AppState {
  HOME = 'HOME',
  SELECT_SECTION = 'SELECT_SECTION',
  QUIZ = 'QUIZ',
  RESULT = 'RESULT'
}

export interface Section {
  id: number;
  name: string;
  verbs: Verb[];
}
