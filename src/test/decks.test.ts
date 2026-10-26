import { describe, expect, it } from "vitest";
import { DECKS, groupDecks, parseDeck } from "../decks";

describe("decks", () => {
  it("ships the three ported decks", () => {
    expect(DECKS.map((d) => d.id)).toEqual([
      "get-started",
      "scope-closures",
      "objects-classes",
      "types-grammar",
      "basics",
      "scope",
      "lexical-scope",
    ]);
    expect(groupDecks(DECKS).map((g) => g.book)).toEqual(["You Don't Know JS Yet", "Classic decks"]);
  });

  it.each(DECKS.map((d) => [d.id, d] as const))("%s has valid, unique, explained questions", (_, deck) => {
    const ids = deck.questions.map((q) => q.id);
    expect(new Set(ids).size).toBe(ids.length);
    for (const q of deck.questions) {
      expect(q.prompt.trim()).not.toBe("");
      expect(q.explanation.length).toBeGreaterThan(20);
      expect(new Set(q.options).size).toBe(q.options.length);
      expect(q.options[q.answerIndex]).toBeDefined();
      expect(q.source).toMatch(/^https:\/\/github\.com\/getify\/You-Dont-Know-JS\/blob\/2nd-ed\/[a-z-]+\/ch\d\.md$/);
    }
  });

  it("rejects invalid decks", () => {
    expect(() => parseDeck({ id: "x", book: "B", title: "X", description: "", questions: [] })).toThrow();
    expect(() =>
      parseDeck({ id: "x", book: "B", title: "X", description: "", questions: [{ id: "1", prompt: "?", options: ["a", "b"], answerIndex: 5, explanation: "" }] }),
    ).toThrow();
  });
});
