import type { Deck, Question } from "./types";
import basics from "./data/basics.json";
import scope from "./data/scope.json";
import lexicalScope from "./data/lexical-scope.json";
import getStarted from "./data/get-started.json";
import scopeClosures from "./data/scope-closures.json";
import objectsClasses from "./data/objects-classes.json";
import typesGrammar from "./data/types-grammar.json";

function isQuestion(value: unknown): value is Question {
  if (typeof value !== "object" || value === null) return false;
  const q = value as Record<string, unknown>;
  return (
    typeof q.id === "string" &&
    typeof q.prompt === "string" &&
    (q.code === undefined || typeof q.code === "string") &&
    Array.isArray(q.options) &&
    q.options.length >= 2 &&
    q.options.every((o) => typeof o === "string" && o.length > 0) &&
    typeof q.answerIndex === "number" &&
    Number.isInteger(q.answerIndex) &&
    q.answerIndex >= 0 &&
    q.answerIndex < q.options.length &&
    typeof q.explanation === "string" &&
    typeof q.source === "string" &&
    /^https:\/\//.test(q.source)
  );
}

export function parseDeck(raw: unknown): Deck {
  if (typeof raw !== "object" || raw === null) throw new Error("Deck must be an object");
  const d = raw as Record<string, unknown>;
  if (typeof d.id !== "string" || typeof d.title !== "string" || typeof d.book !== "string" || typeof d.description !== "string") {
    throw new Error("Deck is missing id/title/description");
  }
  if (!Array.isArray(d.questions) || d.questions.length === 0) {
    throw new Error(`Deck ${d.id} has no questions`);
  }
  d.questions.forEach((q, i) => {
    if (!isQuestion(q)) throw new Error(`Deck ${String(d.id)}: invalid question at index ${i}`);
  });
  return d as unknown as Deck;
}

export const DECKS: readonly Deck[] = [
  getStarted,
  scopeClosures,
  objectsClasses,
  typesGrammar,
  basics,
  scope,
  lexicalScope,
].map(parseDeck);

/** Decks grouped by book, in display order. */
export function groupDecks(decks: readonly Deck[]): { book: string; decks: Deck[] }[] {
  const groups: { book: string; decks: Deck[] }[] = [];
  for (const deck of decks) {
    const g = groups.find((x) => x.book === deck.book);
    if (g) g.decks.push(deck);
    else groups.push({ book: deck.book, decks: [deck] });
  }
  return groups;
}

export function getDeck(id: string): Deck | undefined {
  return DECKS.find((d) => d.id === id);
}
