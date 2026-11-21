import { describe, expect, it, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MotionToggle } from "../components/MotionToggle";
import { ThemeToggle } from "../components/ThemeToggle";
import {
  GLOSS,
  MOTION_KEY,
  THEME_KEY,
  THEME_NAMES,
  THEMES,
  contrastMeets,
  loadMotionPref,
  loadThemePref,
  preferredTheme,
  type ThemeName,
  type ThemeTokens,
} from "../theme";

const textPairs: Array<[keyof ThemeTokens, keyof ThemeTokens, number]> = [
  ["bg", "text", 4.5],
  ["surface", "text", 4.5],
  ["surface", "textMuted", 4.5],
  ["accent", "onAccent", 4.5],
  ["surface", "correct", 4.5],
  ["surface", "incorrect", 4.5],
  ["surface", "link", 4.5],
  ["bg", "border", 3],
  ["bg", "controlBorder", 3],
  ["surface", "controlBorder", 3],
  ["bg", "focus", 3],
];

const fillPairs: Array<[string, string, number]> = [
  [GLOSS.cobalt, GLOSS.onCobalt, 4.5],
  [GLOSS.pewter, GLOSS.onPewter, 4.5],
  [GLOSS.jade, GLOSS.onJade, 4.5],
  [GLOSS.garnet, GLOSS.onGarnet, 4.5],
  [GLOSS.saffron, GLOSS.onSaffron, 4.5],
  [GLOSS.lagoon, GLOSS.onLagoon, 4.5],
];

describe("theme contrast", () => {
  it.each(
    THEME_NAMES.flatMap((theme) =>
      textPairs
        .filter((pair) => !(theme === "graphite" && pair[0] === "bg" && pair[1] === "border"))
        .map(
          (pair): [ThemeName, keyof ThemeTokens, keyof ThemeTokens, number] => [
            theme,
            ...pair,
          ],
        ),
    ),
  )("%s %s against %s is at least %s:1", (theme, a, b, min) => {
    const tokens = THEMES[theme];
    expect(contrastMeets(tokens[a], tokens[b], min)).toBe(true);
  });

  it.each(fillPairs)("gloss fill %s against %s is at least %s:1", (bg, fg, min) => {
    expect(contrastMeets(bg, fg, min)).toBe(true);
  });
});

describe("theme preference", () => {
  beforeEach(() => localStorage.clear());

  it("uses the system colours only on the first visit, then persists the resolved theme", () => {
    expect(preferredTheme(() => ({ matches: true }))).toBe("graphite");
    expect(preferredTheme(() => ({ matches: false }))).toBe("khaki");
    expect(loadThemePref(localStorage, () => ({ matches: true }))).toBe("graphite");
  });

  it("migrates the old light and dark values, and ignores garbage", () => {
    localStorage.setItem(THEME_KEY, "light");
    expect(loadThemePref()).toBe("khaki");
    localStorage.setItem(THEME_KEY, "dark");
    expect(loadThemePref()).toBe("graphite");
    localStorage.setItem(THEME_KEY, "purple");
    expect(loadThemePref(localStorage, () => ({ matches: false }))).toBe("khaki");
  });

  it("defaults to a gloss theme and persists an explicit choice", async () => {
    const user = userEvent.setup();
    render(<ThemeToggle />);
    expect(screen.getByRole("button", { name: "Khaki" })).toHaveAttribute("aria-pressed", "true");
    await user.click(screen.getByRole("button", { name: "Graphite" }));
    expect(document.documentElement.dataset.theme).toBe("graphite");
    expect(localStorage.getItem(THEME_KEY)).toBe("graphite");
    await user.click(screen.getByRole("button", { name: "Midnight" }));
    expect(document.documentElement.dataset.theme).toBe("midnight");
    expect(screen.getByRole("button", { name: "Midnight" })).toHaveAttribute("aria-pressed", "true");
  });
});

describe("motion toggle", () => {
  beforeEach(() => localStorage.clear());

  it("stays static by default and persists a change", async () => {
    const user = userEvent.setup();
    render(<MotionToggle />);
    const toggle = screen.getByRole("button", { name: "Animated background" });
    expect(toggle).toHaveAttribute("aria-pressed", "false");
    expect(document.documentElement.dataset.motion).toBe("static");
    expect(loadMotionPref()).toBe("static");

    await user.click(toggle);
    expect(toggle).toHaveAttribute("aria-pressed", "true");
    expect(document.documentElement.dataset.motion).toBe("animated");
    expect(localStorage.getItem(MOTION_KEY)).toBe("animated");
  });

  it("forces static and disables the control when reduced motion is on", () => {
    const original = window.matchMedia;
    window.matchMedia = ((query: string) =>
      ({
        matches: query.includes("prefers-reduced-motion"),
        media: query,
        onchange: null,
        addEventListener: () => undefined,
        removeEventListener: () => undefined,
        addListener: () => undefined,
        removeListener: () => undefined,
        dispatchEvent: () => false,
      })) as typeof window.matchMedia;
    localStorage.setItem(MOTION_KEY, "animated");
    render(<MotionToggle />);
    const toggle = screen.getByRole("button", {
      name: "Animated background (reduced motion is on)",
    });
    expect(toggle).toBeDisabled();
    expect(toggle).toHaveAttribute("aria-pressed", "false");
    expect(document.documentElement.dataset.motion).toBe("static");
    window.matchMedia = original;
  });
});
