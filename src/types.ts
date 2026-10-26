export interface Question {
  id: string;
  prompt: string;
  code?: string;
  options: string[];
  answerIndex: number;
  explanation: string;
  /** "Further reading" link (chapter of You Don't Know JS Yet). */
  source: string;
}

export interface Deck {
  id: string;
  /** Group shown in the deck picker. */
  book: string;
  title: string;
  description: string;
  questions: Question[];
}
