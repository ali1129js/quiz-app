import { describe, expect, it } from "vitest";
import { initialState, missed, quizReducer, score, shuffle, shuffleQuestions, type QuizState } from "../quiz";
import type { Question } from "../types";

const qs: Question[] = [
  { id: "a", prompt: "A?", options: ["x", "y", "z"], answerIndex: 1, explanation: "y", source: "https://x" },
  { id: "b", prompt: "B?", options: ["p", "q"], answerIndex: 0, explanation: "p", source: "https://x" },
];

const started = (): QuizState => quizReducer(initialState, { type: "start", deckId: "d", questions: qs, shuffled: false });

describe("quizReducer", () => {
  it("starts a deck with empty answers", () => {
    const s = started();
    expect(s).toMatchObject({ status: "playing", deckId: "d", index: 0, answers: [null, null] });
  });

  it("records an answer once and ignores re-answers", () => {
    let s = quizReducer(started(), { type: "answer", optionIndex: 1 });
    s = quizReducer(s, { type: "answer", optionIndex: 0 });
    expect(s.status !== "idle" && s.answers).toEqual([1, null]);
  });

  it("ignores out-of-range answers", () => {
    const s = quizReducer(started(), { type: "answer", optionIndex: 9 });
    expect(s.status !== "idle" && s.answers).toEqual([null, null]);
  });

  it("cannot advance before answering", () => {
    const s0 = started();
    expect(quizReducer(s0, { type: "next" })).toBe(s0);
  });

  it("advances and finishes after the last question", () => {
    let s = started();
    s = quizReducer(s, { type: "answer", optionIndex: 1 });
    s = quizReducer(s, { type: "next" });
    expect(s.status !== "idle" && s.index).toBe(1);
    s = quizReducer(s, { type: "answer", optionIndex: 1 });
    s = quizReducer(s, { type: "next" });
    expect(s.status).toBe("finished");
  });

  it("restart resets progress but keeps the deck; quit returns to idle", () => {
    let s = quizReducer(started(), { type: "answer", optionIndex: 1 });
    s = quizReducer(s, { type: "restart", questions: qs });
    expect(s).toMatchObject({ status: "playing", deckId: "d", index: 0, answers: [null, null] });
    expect(quizReducer(s, { type: "quit" })).toEqual({ status: "idle" });
  });
});

describe("scoring", () => {
  it("counts correct answers and lists missed ones", () => {
    expect(score(qs, [1, 1])).toBe(1);
    expect(score(qs, [1, 0])).toBe(2);
    expect(missed(qs, [0, 0]).map((m) => m.question.id)).toEqual(["a"]);
    expect(missed(qs, [null, null])).toHaveLength(2);
  });
});

describe("shuffle", () => {
  it("is a permutation and does not mutate input", () => {
    const input = [1, 2, 3, 4, 5];
    const out = shuffle(input, () => 0.3);
    expect([...out].sort()).toEqual(input);
    expect(input).toEqual([1, 2, 3, 4, 5]);
  });

  it("keeps answerIndex pointing at the same option text", () => {
    let seed = 7;
    const rnd = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);
    for (const q of shuffleQuestions(qs, rnd)) {
      const orig = qs.find((o) => o.id === q.id)!;
      expect(q.options[q.answerIndex]).toBe(orig.options[orig.answerIndex]);
      expect([...q.options].sort()).toEqual([...orig.options].sort());
    }
  });
});
