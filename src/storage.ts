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
