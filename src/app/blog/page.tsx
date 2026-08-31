"use client";

import { useState } from "react";
import Link from "next/link";
import { SiteFooter } from "@/components/SiteFooter";
import { notes } from "@/lib/notes";

const posts = [
  {
    year: "2026",
    slug: "bangalore-trip",
    title: "my month in bangalore (met the best people)",
    desc: "a month in bangalore: two hackathons, a walk-in at prolearn, two days broke at a petrol pump, and the best people. 15 jun - 5 jul 2026.",
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
        isn&apos;t enough. the long ones live here. the days that actually
        happened live in{" "}
        <Link href="/blog/notes">notes</Link>
        . drop your email and i&apos;ll ping you when something new goes up,
        or just{" "}
        <Link href="/visits" className="easter-quiet" title="the gallery joke lives here">
          lurk louder
        </Link>
        .
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

      <h2 style={{ fontSize: "1em", fontWeight: 600, marginTop: "2.2em" }}>
        notes
      </h2>
      <p className="muted" style={{ fontSize: "0.92em" }}>
        shorter. a good day, a grant, a fork that verified.{" "}
        <Link href="/blog/notes">all notes →</Link>
      </p>
      <ul className="entry-list">
        {notes.map((n) => (
          <li key={n.slug}>
            <span className="entry-year">{n.date.slice(5)}</span>
            <span className="entry-name">
              <Link href={`/blog/notes/${n.slug}`}>{n.title}</Link>
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

      <SiteFooter
        links={
          <>
            <Link href="/blog/notes">notes</Link>
            <Link href="/work">work</Link>
            <Link href="/projects">projects</Link>
          </>
        }
      />
    </main>
  );
}
