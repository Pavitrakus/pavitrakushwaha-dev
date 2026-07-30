"use client";

import { useState } from "react";
import Link from "next/link";

const posts = [
  {
    year: "2026",
    slug: "bangalore-trip",
    title: "Bangalore Trip",
    desc: "two weeks in bangalore, or, how i ended up sleeping on a petrol pump and still called it productive. 15 jun - 5 jul 2026.",
  },
  {
    year: "2026",
    slug: "helios-stress-test",
    title: "Helios Stress Test Research",
    desc: "session stability benchmark under static and rotating prompt conditions. the kind of research that sounds boring until you realize what it's actually testing.",
    link: "/heliosstresstest.html",
  },
  {
    year: "2025",
    slug: "fishy-mesh",
    title: "Fishy Mesh",
    desc: "something i was thinking about. still cooking.",
  },
];

export default function BlogPage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      window.location.href = `mailto:pavitra@paxus.in?subject=Notify me when you write&body=hey pavitra, ping me when you drop something new. my email: ${email}`;
      setSent(true);
    }
  };

  return (
    <main>
      <Link href="/" className="back-link">
        ← pavitra
      </Link>

      <h1>writing.</h1>

      <p>
        i write when something is bothering me enough that talking about it
        isn&apos;t enough. it&apos;s sporadic. it&apos;s honest. drop your
        email below and i&apos;ll ping you when something new goes up.
      </p>

      <ul className="entry-list" style={{ marginTop: "2em" }}>
        {posts.map((p) => (
          <li key={p.slug}>
            <span className="entry-year">{p.year}</span>
            <span className="entry-name">
              <Link href={p.link ? p.link : `/blog/${p.slug}`}>{p.title}</Link>
              <span className="entry-desc">{p.desc}</span>
            </span>
          </li>
        ))}
      </ul>

      <div style={{ marginTop: "2.5em" }}>
        <p style={{ marginBottom: "0.6em" }}>
          get notified when i write something new:
        </p>
        {sent ? (
          <p className="muted" style={{ fontSize: "0.82em" }}>
            you&apos;re on the list. i&apos;ll reach out when something&apos;s ready :)
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="notify-form">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your email"
              required
            />
            <button type="submit">notify me</button>
          </form>
        )}
      </div>

      <footer>
        <span>© {new Date().getFullYear()} pavitra kushwaha</span>
        <Link href="/">← home</Link>
        <a
          href="https://pavitrakushwaha.dev/v01"
          target="_blank"
          rel="noopener noreferrer"
        >
          v01 — 2025 ↗
        </a>
      </footer>
    </main>
  );
}
