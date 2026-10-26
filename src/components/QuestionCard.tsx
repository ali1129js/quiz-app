import { useEffect, useRef } from "react";
import type { Question } from "../types";

interface Props {
  question: Question;
  number: number;
  selected: number | null;
  isLast: boolean;
  onAnswer: (optionIndex: number) => void;
  onNext: () => void;
}

const LETTERS = "ABCDEFGH";

export function QuestionCard({ question, number, selected, isLast, onAnswer, onNext }: Props) {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);
  const answered = selected !== null;
  const correct = answered && selected === question.answerIndex;

  useEffect(() => {
    headingRef.current?.focus();
  }, []);

  useEffect(() => {
    if (answered) nextRef.current?.focus();
  }, [answered]);

  return (
    <article className="card" aria-labelledby={`q-${question.id}`}>
      <h2 id={`q-${question.id}`} className="prompt" tabIndex={-1} ref={headingRef}>
        <span className="visually-hidden">Question {number}: </span>
        {question.prompt}
      </h2>
      {question.code && (
        <pre className="code" aria-label="Code sample">
          <code>{question.code}</code>
        </pre>
      )}

      <ul className="options" role="list">
        {question.options.map((option, i) => {
          const isAnswer = i === question.answerIndex;
          const isSelected = i === selected;
          let state = "";
          if (answered && isAnswer) state = "is-correct";
          else if (answered && isSelected) state = "is-wrong";
          return (
            <li key={option}>
              <button
                type="button"
                className={`option ${state}`}
                onClick={() => onAnswer(i)}
                disabled={answered}
                aria-pressed={isSelected}
              >
                <span className="letter" aria-hidden="true">
                  {LETTERS[i]}
                </span>
                <span className="option-text">{option}</span>
                {answered && isAnswer && <span className="visually-hidden"> (correct answer)</span>}
                {answered && isSelected && !isAnswer && <span className="visually-hidden"> (your answer)</span>}
              </button>
            </li>
          );
        })}
      </ul>

      <div role="status" aria-live="polite">
        {answered && (
          <div className={`feedback ${correct ? "feedback-correct" : "feedback-wrong"}`}>
            <p className="feedback-title">
              {correct ? "✓ Correct!" : `✗ Not quite. The answer is ${LETTERS[question.answerIndex]}: ${question.options[question.answerIndex]}`}
            </p>
            <p className="explanation">{question.explanation}</p>
            <p className="source">
              <a href={question.source} target="_blank" rel="noreferrer">
                Further reading: You Don&apos;t Know JS Yet<span className="visually-hidden"> (opens in a new tab)</span>
              </a>
            </p>
          </div>
        )}
      </div>

      {answered && (
        <div className="actions">
          <button type="button" className="btn primary" onClick={onNext} ref={nextRef}>
            {isLast ? "See results" : "Next question"}
          </button>
        </div>
      )}
    </article>
  );
}
