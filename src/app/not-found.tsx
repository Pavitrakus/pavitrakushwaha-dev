import Link from "next/link";

export default function NotFound() {
  return (
    <main style={{ textAlign: "center", padding: "20vh 28px" }}>
      <h1 style={{ fontSize: "3em", marginBottom: "0.3em" }}>404</h1>
      <p style={{ color: "#666", marginBottom: "2em" }}>
        this page doesn&apos;t exist. yet.
      </p>
      <Link
        href="/"
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: "0.78em",
          color: "#888",
          textDecoration: "none",
          borderBottom: "1.5px solid #ddd",
          paddingBottom: "2px",
        }}
      >
        ← go home
      </Link>
    </main>
  );
}
