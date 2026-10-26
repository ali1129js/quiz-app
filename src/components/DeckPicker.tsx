import { useId, useState } from "react";
import type { Deck } from "../types";
import type { BestScores } from "../storage";
import { groupDecks } from "../decks";

interface Props {
  decks: readonly Deck[];
  best: BestScores;
  onStart: (deckId: string, shuffled: boolean) => void;
}

export function DeckPicker({ decks, best, onStart }: Props) {
  const [shuffled, setShuffled] = useState(false);
  const shuffleId = useId();

  return (
    <section className="picker" aria-labelledby="picker-title">
      <h2 id="picker-title">Choose a deck</h2>
      <p className="muted">Test your understanding of core JavaScript concepts. Every answer comes with an explanation.</p>

      <label className="toggle" htmlFor={shuffleId}>
        <input id={shuffleId} type="checkbox" checked={shuffled} onChange={(e) => setShuffled(e.target.checked)} />
        Shuffle questions and answers
      </label>

      {groupDecks(decks).map((group) => (
        <section key={group.book} className="deck-group" aria-label={group.book}>
          <h3 className="group-title">{group.book}</h3>
          <ul className="deck-list">
            {group.decks.map((deck) => {
              const b = best[deck.id];
              return (
                <li key={deck.id}>
                  <button type="button" className="deck-card card-3d" onClick={() => onStart(deck.id, shuffled)}>
                    <span className="deck-title">{deck.title}</span>
                    <span className="deck-desc">{deck.description}</span>
                    <span className="deck-meta">
                      {deck.questions.length} questions
                      {b ? ` · Best: ${b.score}/${b.total}` : ""}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </section>
      ))}
      <p className="muted small">
        Topics follow Kyle Simpson&apos;s{" "}
        <a href="https://github.com/getify/You-Dont-Know-JS/tree/2nd-ed">You Don&apos;t Know JS Yet</a> (2nd ed.). Questions
        and explanations are original; each links to the matching chapter for further reading.
      </p>
    </section>
  );
}
