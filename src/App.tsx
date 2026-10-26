import { useReducer, useState } from "react";
import { DECKS, getDeck } from "./decks";
import { initialState, quizReducer, score, shuffleQuestions } from "./quiz";
import { loadBestScores, recordScore, type BestScores } from "./storage";
import type { Deck } from "./types";
import { DeckPicker } from "./components/DeckPicker";
import { QuestionCard } from "./components/QuestionCard";
import { ProgressBar } from "./components/ProgressBar";
import { Results } from "./components/Results";
import { ThemeToggle } from "./components/ThemeToggle";

function prepare(deck: Deck, shuffled: boolean) {
  return shuffled ? shuffleQuestions(deck.questions) : deck.questions;
}

export default function App() {
  const [state, dispatch] = useReducer(quizReducer, initialState);
  const [best, setBest] = useState<BestScores>(() => loadBestScores());
  const [newBest, setNewBest] = useState(false);

  const start = (deckId: string, shuffled: boolean) => {
    const deck = getDeck(deckId);
    if (!deck) return;
    setNewBest(false);
    dispatch({ type: "start", deckId, shuffled, questions: prepare(deck, shuffled) });
  };

  const next = () => {
    if (state.status !== "playing") return;
    if (state.index === state.questions.length - 1 && state.answers[state.index] !== null) {
      const isBest = recordScore(state.deckId, score(state.questions, state.answers), state.questions.length);
      setNewBest(isBest);
      setBest(loadBestScores());
    }
    dispatch({ type: "next" });
  };

  const deck = state.status === "idle" ? undefined : getDeck(state.deckId);
  const current = state.status === "playing" ? state.questions[state.index] : undefined;

  return (
    <div className="app">
      <header className="app-header">
        <h1>
          <button type="button" className="brand" onClick={() => dispatch({ type: "quit" })} aria-label="JS Quiz – back to deck selection">
            <span aria-hidden="true">{"{ }"}</span> JS Quiz
          </button>
        </h1>
        <div className="header-right">
          {deck && <p className="deck-label">{deck.title}</p>}
          <ThemeToggle />
        </div>
      </header>

      <main>
        {state.status === "idle" && <DeckPicker decks={DECKS} best={best} onStart={start} />}

        {state.status === "playing" && (
          <>
            <ProgressBar
              current={state.index + 1}
              total={state.questions.length}
              score={score(state.questions, state.answers)}
            />
            {current && (
              <QuestionCard
                key={current.id}
                question={current}
                number={state.index + 1}
                selected={state.answers[state.index] ?? null}
                isLast={state.index === state.questions.length - 1}
                onAnswer={(optionIndex) => dispatch({ type: "answer", optionIndex })}
                onNext={next}
              />
            )}
          </>
        )}

        {state.status === "finished" && deck && (
          <Results
            deck={deck}
            questions={state.questions}
            answers={state.answers}
            best={best[deck.id]}
            isNewBest={newBest}
            onRestart={() => {
              setNewBest(false);
              dispatch({ type: "restart", questions: prepare(deck, state.shuffled) });
            }}
            onChooseDeck={() => dispatch({ type: "quit" })}
          />
        )}
      </main>

      <footer className="app-footer">
        <a href="https://github.com/ali1129js/quiz-app">Source on GitHub</a>
      </footer>
    </div>
  );
}
