import { describe, expect, it } from "vitest";
import { loadBestScores, recordScore } from "../storage";

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
