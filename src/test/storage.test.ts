import { describe, expect, it } from "vitest";
import { getDeck } from "../decks";
import { clearInProgress, IN_PROGRESS_KEY, loadAllMissed, loadBestScores, loadInProgress, loadMissedIds, MISSED_KEY, recordRunMisses, recordScore, saveInProgress } from "../storage";

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
    practice: false,
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

describe("missed-question store", () => {
  it("starts empty and ignores corrupt data", () => {
    expect(loadMissedIds("basics")).toEqual([]);
    localStorage.setItem(MISSED_KEY, "{not json");
    expect(loadAllMissed()).toEqual({});
    localStorage.setItem(MISSED_KEY, JSON.stringify({ byDeck: "nope" }));
    expect(loadMissedIds("basics")).toEqual([]);
  });

  it("keeps missed ids until they are answered right, and persists per deck", () => {
    expect(recordRunMisses("basics", ["a", "b"], ["c"])).toEqual(["a", "b"]);
    expect(recordRunMisses("scope", ["x"], [])).toEqual(["x"]);
    expect(loadMissedIds("basics")).toEqual(["a", "b"]);
    expect(loadAllMissed()).toEqual({ basics: ["a", "b"], scope: ["x"] });

    // mixed review: b is now right, c is newly missed, a stays
    expect(recordRunMisses("basics", ["c"], ["b"])).toEqual(["a", "c"]);
    expect(loadMissedIds("scope")).toEqual(["x"]);

    expect(recordRunMisses("basics", [], ["a", "c"])).toEqual([]);
    expect(loadMissedIds("basics")).toEqual([]);
    expect(loadAllMissed()).toEqual({ scope: ["x"] });
  });
});
