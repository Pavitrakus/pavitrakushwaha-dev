"use client";

import { useEffect, useState } from "react";

export type Theme = "void" | "dark" | "light";

const NEXT: Record<Theme, Theme> = {
  void: "dark",
  dark: "light",
  light: "void",
};

const LABEL: Record<Theme, string> = {
  void: "ultra dark",
  dark: "dark",
  light: "light",
};

function isTheme(value: string | null): value is Theme {
  return value === "void" || value === "dark" || value === "light";
}

function readTheme(): Theme {
  const current = document.documentElement.getAttribute("data-theme");
  return isTheme(current) ? current : "void";
}

function applyTheme(theme: Theme) {
  document.documentElement.setAttribute("data-theme", theme);
  try {
    localStorage.setItem("theme", theme);
  } catch {
    /* private mode */
  }
}

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("void");

  useEffect(() => {
    setTheme(readTheme());
  }, []);

  const label = LABEL[theme];

  return (
    <button
      type="button"
      className="theme-toggle"
      data-mode={theme}
      aria-label={`theme: ${label}. click for ${LABEL[NEXT[theme]]}`}
      title={`${label} · click to cycle ultra dark, dark, light`}
      onClick={() => {
        const next = NEXT[readTheme()];
        applyTheme(next);
        setTheme(next);
      }}
    >
      <span className="icon-moon icon-moon-void">
        <MoonIcon filled />
      </span>
      <span className="icon-moon icon-moon-dark">
        <MoonIcon filled={false} />
      </span>
      <span className="icon-sun">
        <SunIcon />
      </span>
    </button>
  );
}

const MoonIcon = ({ filled }: { filled: boolean }) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path
      d="M21 14.3A8.4 8.4 0 0 1 9.7 3 7.6 7.6 0 1 0 21 14.3Z"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill={filled ? "currentColor" : "none"}
    />
  </svg>
);

const SunIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <circle cx="12" cy="12" r="4.2" stroke="currentColor" strokeWidth="1.7" />
    <path
      d="M12 3v1.6M12 19.4V21M4.9 4.9l1.1 1.1M18 18l1.1 1.1M3 12h1.6M19.4 12H21M4.9 19.1 6 18M18 6l1.1-1.1"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
    />
  </svg>
);
