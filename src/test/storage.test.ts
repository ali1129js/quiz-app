import { describe, expect, it } from "vitest";
import { getDeck } from "../decks";
import { clearInProgress, IN_PROGRESS_KEY, loadBestScores, loadInProgress, recordScore, saveInProgress } from "../storage";

describe("best scores", () => {
  it("stores the best score per deck and only overwrites on improvement", () => {
    expect(loadBestScores()).toEqual({});
    expect(recordScore("basics", 3, 6)).toBe(true);
    expect(recordScore("basics", 2, 6)).toBe(false);
    expect(recordScore("scope", 1, 11)).toBe(true);
    expect(recordScore("basics", 5, 6)).toBe(true);
    expect(loadBestScores()).toEqual({ basics: { score: 5, total: 6 }, scope: { score: 1, total: 11 } });
  });

  it("survives corrupt storage", () => {
    localStorage.setItem("quiz-app:best-scores:v1", "{not json");
    expect(loadBestScores()).toEqual({});
  });
});


describe("in-progress run", () => {
  const deck = getDeck("basics")!;
  const run = {
    deckId: deck.id,
    shuffled: false,
    questions: deck.questions,
    index: 1,
    answers: deck.questions.map((_, i) => (i === 0 ? 0 : null)),
  };

  it("round-trips a Zod-checked run and rejects corrupt or finished data", () => {
    expect(loadInProgress()).toBeNull();
    saveInProgress(run);
    expect(loadInProgress()).toEqual(run);

    localStorage.setItem(IN_PROGRESS_KEY, "{not json");
    expect(loadInProgress()).toBeNull();

    localStorage.setItem(IN_PROGRESS_KEY, JSON.stringify({ ...run, index: run.questions.length }));
    expect(loadInProgress()).toBeNull();

    localStorage.setItem(IN_PROGRESS_KEY, JSON.stringify({ ...run, answers: run.answers.slice(1) }));
    expect(loadInProgress()).toBeNull();

    saveInProgress(run);
    clearInProgress();
    expect(loadInProgress()).toBeNull();
  });
});
