import { describe, expect, it } from "vitest";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../App";
import { getDeck } from "../decks";

const lexical = getDeck("lexical-scope")!;
const basics = getDeck("basics")!;

describe("App", () => {
  it("lists all decks including Lexical Scope", () => {
    render(<App />);
    expect(screen.getByRole("button", { name: /JS Basics/ })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Scope & Compilation/ })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Lexical Scope/ })).toBeInTheDocument();
  });

  it("starts the chosen deck and shows explanation + highlight after a wrong answer", async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.click(screen.getByRole("button", { name: /Lexical Scope/ }));
    const q = lexical.questions[0]!;
    expect(screen.getByRole("heading", { name: new RegExp(q.prompt.replace(/[?]/g, "\\?")) })).toHaveFocus();
    expect(screen.getByText("Question 1 of 9")).toBeInTheDocument();

    const wrongIndex = q.answerIndex === 0 ? 1 : 0;
    const wrong = screen.getByRole("button", { name: new RegExp(q.options[wrongIndex]!) });
    await user.click(wrong);

    expect(wrong).toHaveClass("is-wrong");
    expect(screen.getByRole("button", { name: /correct answer/ })).toHaveClass("is-correct");
    expect(screen.getByRole("status")).toHaveTextContent(q.explanation);
    expect(screen.getByRole("button", { name: "Next question" })).toHaveFocus();
  });

  it("is fully keyboard operable and ends on a results screen with review + restart + best score", async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.click(screen.getByRole("button", { name: /JS Basics/ }));

    for (const [i, q] of basics.questions.entries()) {
      // answer first one wrong, rest right
      const pick = i === 0 ? (q.answerIndex + 1) % q.options.length : q.answerIndex;
      const opts = within(screen.getByRole("list")).getAllByRole("button");
      opts[pick]!.focus();
      await user.keyboard("{Enter}");
      await user.keyboard("{Enter}"); // Next / See results has focus
    }

    const total = basics.questions.length;
    expect(screen.getByRole("heading", { name: `JS Basics: you scored ${total - 1} / ${total}` })).toHaveFocus();
    expect(screen.getByText("Review missed questions (1)")).toBeInTheDocument();
    expect(screen.getByText(basics.questions[0]!.prompt)).toBeInTheDocument();
    expect(screen.getByText(/New personal best/)).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Restart deck" }));
    expect(screen.getByText(`Question 1 of ${total}`)).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: /back to deck selection/ }));
    expect(screen.getByRole("button", { name: /JS Basics/ })).toHaveTextContent(`Best: ${total - 1}/${total}`);
  });
});
