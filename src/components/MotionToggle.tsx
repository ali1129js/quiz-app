import { useEffect, useState } from "react";
import {
  applyMotion,
  loadMotionPref,
  prefersReducedMotion,
  saveMotionPref,
  type MotionName,
} from "../theme";

function MotionIcon({ pressed }: { pressed: boolean }) {
  if (pressed) {
    return (
      <svg viewBox="0 0 20 20" width="20" height="20" aria-hidden="true">
        <rect x="4.5" y="4" width="4" height="12" rx="1.2" fill="currentColor" />
        <rect x="11.5" y="4" width="4" height="12" rx="1.2" fill="currentColor" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 20 20" width="20" height="20" aria-hidden="true">
      <path d="M6 4.2v11.6L16.2 10 6 4.2z" fill="currentColor" />
    </svg>
  );
}

export function MotionToggle() {
  const [motion, setMotion] = useState<MotionName>(() => loadMotionPref());
  const [reducedMotion, setReducedMotion] = useState(() => prefersReducedMotion());

  useEffect(() => {
    if (typeof window.matchMedia !== "function") return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setReducedMotion(mq.matches);
    onChange();
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    applyMotion(motion, document.documentElement, reducedMotion);
    saveMotionPref(motion);
  }, [motion, reducedMotion]);

  const pressed = !reducedMotion && motion === "animated";
  const label = reducedMotion
    ? "Animated background (reduced motion is on)"
    : "Animated background";

  return (
    <button
      type="button"
      className="motion-toggle"
      aria-label={label}
      aria-pressed={pressed}
      disabled={reducedMotion}
      onClick={() => setMotion(pressed ? "static" : "animated")}
    >
      <MotionIcon pressed={pressed} />
    </button>
  );
}
