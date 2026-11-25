# Learning notes

Short explanations of the ideas this project actually uses, and why they matter. Each one points at a file.

## The quiz is a pure reducer

Every change to a run (start, answer, next, restart, quit) goes through `quizReducer` in `src/quiz.ts`. The function takes the current state and an action and returns a new state. It does not read `localStorage`, the clock, or the DOM, which is why the same answers always produce the same score and why the tests can drive a whole run without rendering. Shuffle is a separate, seeded-capable function; the reducer only stores the already-shuffled question list.

See `src/quiz.ts` and `src/test/quiz.test.ts`.

## Decks are validated at startup

A typo in a JSON deck (a missing option, a broken `answerIndex`, a non-https source link) would otherwise fail only when a learner reached that question. `parseDeck` in `src/decks.ts` checks every question when the module loads, and the test suite runs the same check on all eight decks. Invalid data throws immediately, so a bad question cannot ship.

See `src/decks.ts` and `src/test/decks.test.ts`.

## Best scores live in localStorage

Each finished run can replace the stored best for that deck, but only when the percentage is strictly better. `recordScore` in `src/storage.ts` reads a versioned key, ignores unreadable JSON, and writes `{ score, total }`. The picker then shows "Best: 10/12" without needing a server.

See `src/storage.ts`.
