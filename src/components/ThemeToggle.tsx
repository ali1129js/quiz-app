import { useEffect, useState } from "react";
import {
  THEME_LABELS,
  THEME_NAMES,
  applyTheme,
  loadThemePref,
  saveThemePref,
  type ThemeName,
} from "../theme";

export function ThemeToggle() {
  const [theme, setTheme] = useState<ThemeName>(() => loadThemePref());

  useEffect(() => {
    applyTheme(theme);
    saveThemePref(theme);
  }, [theme]);

  return (
    <div className="segmented wrap" role="group" aria-label="Theme">
      {THEME_NAMES.map((name) => (
        <button
          key={name}
          type="button"
          className="segment"
          aria-pressed={theme === name}
          onClick={() => setTheme(name)}
        >
          {THEME_LABELS[name]}
        </button>
      ))}
    </div>
  );
}
