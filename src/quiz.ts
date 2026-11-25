import type { Deck, Question } from "./types";

export type Random = () => number;

export function shuffle<T>(items: readonly T[], random: Random = Math.random): T[] {
  const out = [...items];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [out[i], out[j]] = [out[j] as T, out[i] as T];
  }
  return out;
}

/** Shuffle question order and each question's options, remapping answerIndex. */
export function shuffleQuestions(questions: readonly Question[], random: Random = Math.random): Question[] {
  return shuffle(questions, random).map((q) => {
    const order = shuffle(
      q.options.map((_, i) => i),
      random,
    );
    return {
      ...q,
      options: order.map((i) => q.options[i] as string),
      answerIndex: order.indexOf(q.answerIndex),
    };
  });
}

export type QuizState =
  | { status: "idle" }
  | {
      status: "playing" | "finished";
      deckId: string;
      shuffled: boolean;
      /** True when this run is only previously missed question ids, not the full deck. */
      practice: boolean;
      questions: Question[];
      index: number;
      /** Selected option index per question, null = not answered yet. */
      answers: (number | null)[];
    };

export type QuizAction =
  | { type: "start"; deckId: string; questions: Question[]; shuffled: boolean; practice?: boolean }
  | { type: "answer"; optionIndex: number }
  | { type: "next" }
  | { type: "restart"; questions: Question[] }
  | {
      type: "resume";
      deckId: string;
      shuffled: boolean;
      questions: Question[];
      index: number;
      answers: (number | null)[];
      practice?: boolean;
    }
  | { type: "quit" };

export const initialState: QuizState = { status: "idle" };

export function quizReducer(state: QuizState, action: QuizAction): QuizState {
  switch (action.type) {
    case "start":
      if (action.questions.length === 0) return state;
      return {
        status: "playing",
        deckId: action.deckId,
        shuffled: action.shuffled,
        practice: action.practice === true,
        questions: action.questions,
        index: 0,
        answers: action.questions.map(() => null),
      };
    case "answer": {
      if (state.status !== "playing") return state;
      const q = state.questions[state.index];
      if (!q || state.answers[state.index] !== null) return state;
      if (action.optionIndex < 0 || action.optionIndex >= q.options.length) return state;
      const answers = [...state.answers];
      answers[state.index] = action.optionIndex;
      return { ...state, answers };
    }
    case "next": {
      if (state.status !== "playing" || state.answers[state.index] === null) return state;
      const index = state.index + 1;
      return index >= state.questions.length ? { ...state, status: "finished" } : { ...state, index };
    }
    case "restart":
      if (state.status === "idle" || action.questions.length === 0) return state;
      return {
        ...state,
        status: "playing",
        questions: action.questions,
        index: 0,
        answers: action.questions.map(() => null),
      };
    case "resume":
      if (
        action.questions.length === 0 ||
        action.answers.length !== action.questions.length ||
        action.index < 0 ||
        action.index >= action.questions.length
      ) {
        return state;
      }
      return {
        status: "playing",
        deckId: action.deckId,
        shuffled: action.shuffled,
        practice: action.practice === true,
        questions: action.questions,
        index: action.index,
        answers: action.answers,
      };
    case "quit":
      return initialState;
  }
}

export function isCorrect(question: Question, answer: number | null): boolean {
  return answer !== null && answer === question.answerIndex;
}

export function score(questions: readonly Question[], answers: readonly (number | null)[]): number {
  return questions.reduce((n, q, i) => n + (isCorrect(q, answers[i] ?? null) ? 1 : 0), 0);
}

export function missed(questions: readonly Question[], answers: readonly (number | null)[]) {
  return questions
    .map((question, i) => ({ question, answer: answers[i] ?? null }))
    .filter(({ question, answer }) => !isCorrect(question, answer));
}

/** Keep requested ids that still exist in the deck, in the given order, dropping stale ones. */
export function questionsByIds(deck: Deck, ids: readonly string[]): Question[] {
  const byId = new Map(deck.questions.map((q) => [q.id, q]));
  const out: Question[] = [];
  const seen = new Set<string>();
  for (const id of ids) {
    const q = byId.get(id);
    if (q && !seen.has(id)) {
      out.push(q);
      seen.add(id);
    }
  }
  return out;
}

