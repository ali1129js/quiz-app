import { describe, expect, it, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ThemeToggle } from "../components/ThemeToggle";
import { THEME_KEY, loadThemePref } from "../theme";

describe("theme toggle", () => {
  beforeEach(() => localStorage.clear());

  it("defaults to system and persists explicit choice", async () => {
    render(<ThemeToggle />);
    expect(screen.getByRole("button", { name: "System theme" })).toHaveAttribute("aria-pressed", "true");
    await userEvent.click(screen.getByRole("button", { name: "Light theme" }));
    expect(document.documentElement.dataset.theme).toBe("light");
    expect(localStorage.getItem(THEME_KEY)).toBe("light");
    await userEvent.click(screen.getByRole("button", { name: "Dark theme" }));
    expect(document.documentElement.dataset.theme).toBe("dark");
    expect(screen.getByRole("button", { name: "Dark theme" })).toHaveAttribute("aria-pressed", "true");
    await userEvent.click(screen.getByRole("button", { name: "System theme" }));
    expect(localStorage.getItem(THEME_KEY)).toBeNull();
  });

  it("ignores garbage values", () => {
    localStorage.setItem(THEME_KEY, "purple");
    expect(loadThemePref()).toBe("system");
  });
});
