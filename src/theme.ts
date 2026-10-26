export type ThemePref = "system" | "light" | "dark";
export const THEME_KEY = "quiz-app:theme:v1";

export function loadThemePref(storage: Storage | undefined = globalThis.localStorage): ThemePref {
  try {
    const v = storage?.getItem(THEME_KEY);
    return v === "light" || v === "dark" ? v : "system";
  } catch {
    return "system";
  }
}

export function saveThemePref(pref: ThemePref, storage: Storage | undefined = globalThis.localStorage): void {
  try {
    if (pref === "system") storage?.removeItem(THEME_KEY);
    else storage?.setItem(THEME_KEY, pref);
  } catch {
    // ignore
  }
}

export function systemPrefersDark(): boolean {
  return typeof matchMedia === "function" ? !matchMedia("(prefers-color-scheme: light)").matches : true;
}

export function resolveTheme(pref: ThemePref): "light" | "dark" {
  if (pref !== "system") return pref;
  return systemPrefersDark() ? "dark" : "light";
}

export function applyTheme(pref: ThemePref, root: HTMLElement = document.documentElement): void {
  root.dataset.theme = resolveTheme(pref);
  root.dataset.themePref = pref;
}
