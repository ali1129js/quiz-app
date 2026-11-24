import { z } from "zod";
const KEY = "quiz-app:best-scores:v1";

export type BestScores = Record<string, { score: number; total: number }>;

export function loadBestScores(storage: Storage | undefined = globalThis.localStorage): BestScores {
  try {
    const raw = storage?.getItem(KEY);
    if (!raw) return {};
    const parsed: unknown = JSON.parse(raw);
    return typeof parsed === "object" && parsed !== null ? (parsed as BestScores) : {};
  } catch {
    return {};
  }
}

/** Saves the score if it beats the stored best (by percentage). Returns true if it is a new best. */
export function recordScore(
  deckId: string,
  score: number,
  total: number,
  storage: Storage | undefined = globalThis.localStorage,
): boolean {
  const all = loadBestScores(storage);
  const prev = all[deckId];
  if (prev && prev.total > 0 && prev.score / prev.total >= score / total) return false;
  all[deckId] = { score, total };
  try {
    storage?.setItem(KEY, JSON.stringify(all));
  } catch {
    // storage full or disabled: ignore
  }
  return true;
}


export const IN_PROGRESS_KEY = "quiz-app:in-progress:v1";

const questionSchema = z.object({
  id: z.string().min(1),
  prompt: z.string().min(1),
  code: z.string().optional(),
  options: z.array(z.string().min(1)).min(2),
  answerIndex: z.number().int().min(0),
  explanation: z.string(),
  source: z.string().url(),
}).refine((q) => q.answerIndex < q.options.length, "answerIndex out of range");

export const inProgressSchema = z
  .object({
    deckId: z.string().min(1),
    shuffled: z.boolean(),
    questions: z.array(questionSchema).min(1),
    index: z.number().int().min(0),
    answers: z.array(z.union([z.number().int(), z.null()])),
  })
  .refine((run) => run.answers.length === run.questions.length, "answers length")
  .refine((run) => run.index < run.questions.length, "index out of range")
  .refine((run) => run.answers.every((answer, i) => {
    if (answer === null) return true;
    const q = run.questions[i];
    return q !== undefined && answer >= 0 && answer < q.options.length;
  }), "answer out of range");

export type InProgressRun = z.infer<typeof inProgressSchema>;

export function loadInProgress(storage: Storage | undefined = globalThis.localStorage): InProgressRun | null {
  try {
    const raw = storage?.getItem(IN_PROGRESS_KEY);
    if (!raw) return null;
    const parsed = inProgressSchema.safeParse(JSON.parse(raw));
    return parsed.success ? parsed.data : null;
  } catch {
    return null;
  }
}

export function saveInProgress(run: InProgressRun, storage: Storage | undefined = globalThis.localStorage): void {
  const parsed = inProgressSchema.safeParse(run);
  if (!parsed.success) return;
  try {
    storage?.setItem(IN_PROGRESS_KEY, JSON.stringify(parsed.data));
  } catch {
    // storage full or disabled: ignore
  }
}

export function clearInProgress(storage: Storage | undefined = globalThis.localStorage): void {
  try {
    storage?.removeItem(IN_PROGRESS_KEY);
  } catch {
    // ignore
  }
}
