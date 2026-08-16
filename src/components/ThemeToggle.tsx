"use client";

type Theme = "light" | "dark";

function readTheme(): Theme {
  const current = document.documentElement.getAttribute("data-theme");
  if (current === "dark" || current === "light") return current;
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
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
  return (
    <button
      type="button"
      className="theme-toggle"
      aria-label="toggle color theme"
      title="toggle color theme"
      onClick={() => {
        applyTheme(readTheme() === "dark" ? "light" : "dark");
      }}
    >
      <span className="icon-moon">
        <MoonIcon />
      </span>
      <span className="icon-sun">
        <SunIcon />
      </span>
    </button>
  );
}

const MoonIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path
      d="M21 14.3A8.4 8.4 0 0 1 9.7 3 7.6 7.6 0 1 0 21 14.3Z"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
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
