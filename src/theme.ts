export const THEME_NAMES = ["khaki", "graphite", "midnight"] as const;
export type ThemeName = (typeof THEME_NAMES)[number];

export const MOTION_NAMES = ["static", "animated"] as const;
export type MotionName = (typeof MOTION_NAMES)[number];

export const THEME_KEY = "quiz-app:theme:v1";
export const MOTION_KEY = "quiz-app:motion:v1";

export const THEME_LABELS: Readonly<Record<ThemeName, string>> = {
  khaki: "Khaki",
  graphite: "Graphite",
  midnight: "Midnight",
};

export const COLOR_SCHEME: Readonly<Record<ThemeName, "light" | "dark">> = {
  khaki: "light",
  graphite: "dark",
  midnight: "dark",
};

export const GLOSS = {
  cobalt: "#2F6BFF",
  onCobalt: "#FFFFFF",
  pewter: "#7A8394",
  onPewter: "#111111",
  jade: "#00B386",
  onJade: "#111111",
  garnet: "#D42D47",
  onGarnet: "#FFFFFF",
  saffron: "#FFB000",
  onSaffron: "#111111",
  lagoon: "#00C2D1",
  onLagoon: "#111111",
} as const;

export interface ThemeTokens {
  bg: string;
  surface: string;
  text: string;
  textMuted: string;
  border: string;
  controlBorder: string;
  accent: string;
  onAccent: string;
  focus: string;
  link: string;
  correct: string;
  incorrect: string;
}

export const THEMES: Readonly<Record<ThemeName, ThemeTokens>> = {
  khaki: {
    bg: "#D8CDAE",
    surface: "#EBE4D0",
    text: "#2A2418",
    textMuted: "#554C3E",
    border: "#6F6550",
    controlBorder: "#6F6550",
    accent: GLOSS.cobalt,
    onAccent: GLOSS.onCobalt,
    focus: "#214BB3",
    link: "#214BB3",
    correct: "#00624A",
    incorrect: "#9F2235",
  },
  graphite: {
    bg: "#1E2329",
    surface: "#2A313A",
    text: "#E8ECF1",
    textMuted: "#A7B0BC",
    border: "#3A4350",
    controlBorder: "#707A8A",
    accent: GLOSS.cobalt,
    onAccent: GLOSS.onCobalt,
    focus: "#8DAEFF",
    link: "#8DAEFF",
    correct: "#26BE98",
    incorrect: "#E9929F",
  },
  midnight: {
    bg: "#1B1428",
    surface: "#2A2238",
    text: "#EDE7F6",
    textMuted: "#C9C2D6",
    border: "#7A7288",
    controlBorder: "#7A7288",
    accent: GLOSS.cobalt,
    onAccent: GLOSS.onCobalt,
    focus: "#789FFF",
    link: "#789FFF",
    correct: "#26BE98",
    incorrect: "#E78C9A",
  },
};

const LEGACY_THEMES: Readonly<Record<string, ThemeName>> = {
  light: "khaki",
  dark: "graphite",
};

export function preferredTheme(
  match: (query: string) => { matches: boolean } = (query) => window.matchMedia(query),
): ThemeName {
  return match("(prefers-color-scheme: dark)").matches ? "graphite" : "khaki";
}

export function loadThemePref(
  storage: Storage | undefined = globalThis.localStorage,
  match?: (query: string) => { matches: boolean },
): ThemeName {
  try {
    const v = storage?.getItem(THEME_KEY);
    if (v && (THEME_NAMES as readonly string[]).includes(v)) return v as ThemeName;
    const migrated = v ? LEGACY_THEMES[v] : undefined;
    if (migrated) return migrated;
  } catch {
    /* ignore */
  }
  return preferredTheme(match);
}

export function saveThemePref(
  theme: ThemeName,
  storage: Storage | undefined = globalThis.localStorage,
): void {
  try {
    storage?.setItem(THEME_KEY, theme);
  } catch {
    /* ignore */
  }
}

export function applyTheme(theme: ThemeName, root: HTMLElement = document.documentElement): void {
  root.dataset.theme = theme;
  root.style.colorScheme = COLOR_SCHEME[theme];
}

export function loadMotionPref(storage: Storage | undefined = globalThis.localStorage): MotionName {
  try {
    return storage?.getItem(MOTION_KEY) === "animated" ? "animated" : "static";
  } catch {
    return "static";
  }
}

export function saveMotionPref(
  motion: MotionName,
  storage: Storage | undefined = globalThis.localStorage,
): void {
  try {
    storage?.setItem(MOTION_KEY, motion);
  } catch {
    /* ignore */
  }
}

export function prefersReducedMotion(
  match: (query: string) => { matches: boolean } = (query) => window.matchMedia(query),
): boolean {
  return match("(prefers-reduced-motion: reduce)").matches;
}

export function effectiveMotion(stored: MotionName, reduced: boolean): MotionName {
  return reduced ? "static" : stored;
}

export function applyMotion(
  name: MotionName,
  root: HTMLElement = document.documentElement,
  reduced: boolean = prefersReducedMotion(),
): void {
  root.dataset.motion = effectiveMotion(name, reduced);
}

function channel(value: number): number {
  const c = value / 255;
  return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
}

export function luminance(hex: string): number {
  const [r = 0, g = 0, b = 0] = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16));
  return 0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b);
}

export function contrastRatio(a: string, b: string): number {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x) as [number, number];
  return (hi + 0.05) / (lo + 0.05);
}

export function contrastMeets(a: string, b: string, min: number): boolean {
  return Number(contrastRatio(a, b).toFixed(2)) >= min;
}
