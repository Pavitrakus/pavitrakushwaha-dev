"use client";

import { useEffect, useState } from "react";

export default function V01Page() {
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    document.title = "v01 - 2025 | Pavitra Kushwaha";

    // noindex for archived page
    const meta = document.createElement("meta");
    meta.name = "robots";
    meta.content = "noindex";
    document.head.appendChild(meta);

    if (countdown <= 0) {
      window.location.href = "https://pavitrax.vercel.app";
      return;
    }
    const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    return () => clearTimeout(timer);
  }, [countdown]);

  return (
    <main
      style={{
        maxWidth: "580px",
        margin: "0 auto",
        padding: "20vh 28px",
        textAlign: "center",
      }}
    >
      <div style={{ fontSize: "3em", marginBottom: "0.5em" }}>📦</div>

      <h1
        style={{
          fontSize: "1.6em",
          fontWeight: 700,
          marginBottom: "0.5em",
          lineHeight: 1.3,
        }}
      >
        v01 - 2025
      </h1>

      <p
        style={{
          fontSize: "1.1em",
          color: "#555",
          lineHeight: 1.7,
          marginBottom: "1.5em",
        }}
      >
        an archived version of the site of 2025. things were different back
        then. this is how the older version of the website looked.
      </p>

      <p
        className="mono muted"
        style={{
          fontSize: "0.85em",
          marginBottom: "2em",
        }}
      >
        redirecting in {countdown} second{countdown !== 1 ? "s" : ""}
      </p>

      <a
        href="https://pavitrax.vercel.app"
        className="mono"
        style={{
          fontSize: "0.78em",
          color: "#888",
          textDecoration: "none",
          borderBottom: "1.5px solid #ddd",
          paddingBottom: "2px",
          transition: "color 0.15s, border-color 0.15s",
        }}
        onMouseEnter={(e) => {
          (e.target as HTMLElement).style.color = "#111";
          (e.target as HTMLElement).style.borderColor = "#111";
        }}
        onMouseLeave={(e) => {
          (e.target as HTMLElement).style.color = "#888";
          (e.target as HTMLElement).style.borderColor = "#ddd";
        }}
      >
        redirect now
      </a>
    </main>
  );
}
