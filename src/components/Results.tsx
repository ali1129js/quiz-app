import { useEffect, useRef } from "react";
import { missed, score } from "../quiz";
import type { Deck, Question } from "../types";

interface Props {
  deck: Deck;
  questions: Question[];
  answers: (number | null)[];
  best: { score: number; total: number } | undefined;
  isNewBest: boolean;
  onRestart: () => void;
  onChooseDeck: () => void;
}

export function Results({ deck, questions, answers, best, isNewBest, onRestart, onChooseDeck }: Props) {
  const headingRef = useRef<HTMLHeadingElement>(null);
  useEffect(() => headingRef.current?.focus(), []);

  const total = questions.length;
  const s = score(questions, answers);
  const pct = Math.round((s / total) * 100);
  const wrong = missed(questions, answers);

  return (
    <section className="card card-3d results" aria-labelledby="results-title">
      <h2 id="results-title" tabIndex={-1} ref={headingRef}>
        {deck.title}: you scored {s} / {total}
      </h2>
      <p className="big-score" aria-hidden="true">
        {pct}%
      </p>
      {isNewBest ? (
        <p className="badge">🏆 New personal best!</p>
      ) : (
        best && (
          <p className="muted">
            Your best: {best.score}/{best.total}
          </p>
        )
      )}

      {wrong.length === 0 ? (
        <p>Perfect run, no missed questions. 🎉</p>
      ) : (
        <>
          <h3>Review missed questions ({wrong.length})</h3>
          <ol className="review">
            {wrong.map(({ question, answer }) => (
              <li key={question.id} className="review-card card-3d" tabIndex={0}>
                <p className="review-prompt">{question.prompt}</p>
                {question.code && (
                  <pre className="code">
                    <code>{question.code}</code>
                  </pre>
                )}
                <p className="review-wrong">Your answer: {answer === null ? "—" : question.options[answer]}</p>
                <p className="review-right">Correct: {question.options[question.answerIndex]}</p>
                <p className="explanation">{question.explanation}</p>
                <a className="source" href={question.source} target="_blank" rel="noreferrer">
                  Further reading<span className="visually-hidden"> (opens in a new tab)</span>
                </a>
              </li>
            ))}
          </ol>
        </>
      )}

      <div className="actions">
        <button type="button" className="btn primary" onClick={onRestart}>
          Restart deck
        </button>
        <button type="button" className="btn" onClick={onChooseDeck}>
          Choose another deck
        </button>
      </div>
    </section>
  );
}
