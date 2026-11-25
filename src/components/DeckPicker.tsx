import { useId, useState } from "react";
import type { Deck } from "../types";
import type { BestScores, MissedByDeck } from "../storage";
import { groupDecks } from "../decks";

export interface ResumeOffer {
  deckTitle: string;
  index: number;
  total: number;
}

interface Props {
  decks: readonly Deck[];
  best: BestScores;
  missedByDeck?: MissedByDeck;
  resume?: ResumeOffer | null;
  onResume?: () => void;
  onStart: (deckId: string, shuffled: boolean) => void;
  onPracticeMissed?: (deckId: string, shuffled: boolean) => void;
}

export function DeckPicker({ decks, best, missedByDeck = {}, resume, onResume, onStart, onPracticeMissed }: Props) {
  const [shuffled, setShuffled] = useState(false);
  const shuffleId = useId();

  return (
    <section className="picker" aria-labelledby="picker-title">
      <h2 id="picker-title">Choose a deck</h2>
      <p className="muted">Test your understanding of core JavaScript concepts. Every answer comes with an explanation.</p>

      {resume && onResume ? (
        <div className="resume" role="region" aria-label="Unfinished quiz">
          <p>
            You have an unfinished quiz: {resume.deckTitle} (question {resume.index + 1} of {resume.total}).
          </p>
          <button type="button" className="btn primary" onClick={onResume}>
            Resume
          </button>
        </div>
      ) : null}

      <label className="toggle" htmlFor={shuffleId}>
        <input id={shuffleId} type="checkbox" checked={shuffled} onChange={(e) => setShuffled(e.target.checked)} />
        Shuffle questions and answers
      </label>

      <div className="deck-groups">
      {groupDecks(decks).map((group) => (
        <section key={group.book} className="deck-group" aria-label={group.book}>
          <h3 className="group-title">{group.book}</h3>
          <ul className="deck-list">
            {group.decks.map((deck) => {
              const b = best[deck.id];
              const missedCount = missedByDeck[deck.id]?.length ?? 0;
              return (
                <li key={deck.id} className="deck-item">
                  <button type="button" className="deck-card card-3d" onClick={() => onStart(deck.id, shuffled)}>
                    <span className="deck-title">{deck.title}</span>
                    <span className="deck-desc">{deck.description}</span>
                    <span className="deck-meta">
                      {deck.questions.length} questions
                      {b ? ` · Best: ${b.score}/${b.total}` : ""}
                    </span>
                  </button>
                  {missedCount > 0 && onPracticeMissed ? (
                    <button type="button" className="btn practice-missed" onClick={() => onPracticeMissed(deck.id, shuffled)}>
                      Practice missed ({missedCount})
                    </button>
                  ) : null}
                </li>
              );
            })}
          </ul>
        </section>
      ))}
      </div>
      <p className="muted small">
        Topics follow Kyle Simpson&apos;s{" "}
        <a href="https://github.com/getify/You-Dont-Know-JS/tree/2nd-ed">You Don&apos;t Know JS Yet</a> (2nd ed.). Questions
        and explanations are original; each links to the matching chapter for further reading.
      </p>
    </section>
  );
}
