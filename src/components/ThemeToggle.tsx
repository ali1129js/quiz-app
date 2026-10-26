import { useEffect, useState } from "react";
import { applyTheme, loadThemePref, saveThemePref, type ThemePref } from "../theme";

const OPTIONS: { value: ThemePref; label: string; icon: string }[] = [
  { value: "system", label: "System theme", icon: "🖥" },
  { value: "light", label: "Light theme", icon: "☀" },
  { value: "dark", label: "Dark theme", icon: "☾" },
];

export function ThemeToggle() {
  const [pref, setPref] = useState<ThemePref>(() => loadThemePref());

  useEffect(() => {
    applyTheme(pref);
    saveThemePref(pref);
    if (pref !== "system" || typeof matchMedia !== "function") return;
    const mq = matchMedia("(prefers-color-scheme: light)");
    const onChange = () => applyTheme("system");
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [pref]);

  return (
    <div className="theme-toggle" role="group" aria-label="Color theme">
      {OPTIONS.map((o) => (
        <button
          key={o.value}
          type="button"
          className="theme-btn"
          aria-pressed={pref === o.value}
          aria-label={o.label}
          title={o.label}
          onClick={() => setPref(o.value)}
        >
          <span aria-hidden="true">{o.icon}</span>
        </button>
      ))}
    </div>
  );
}
