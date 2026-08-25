"use client";

import { useEffect } from "react";
import { usePresence } from "./PresenceProvider";

export function YouAreHere() {
  const { youAreHere, youPlace, dismissYou } = usePresence();

  useEffect(() => {
    if (!youAreHere) return;
    const t = setTimeout(dismissYou, 12000);
    return () => clearTimeout(t);
  }, [youAreHere, dismissYou]);

  if (!youAreHere || !youPlace) return null;

  return (
    <div className="you-are-here" role="status">
      <button type="button" className="you-are-here-close" onClick={dismissYou} aria-label="dismiss">
        ×
      </button>
      <p>
        wait. are you in <strong>{youPlace}</strong>?
      </p>
      <p className="muted mono you-are-here-sub">
        how the fuck — never mind.{" "}
        <a href="/visits">see who else showed up →</a>
      </p>
    </div>
  );
}
