"use client";

import { useState } from "react";
import Link from "next/link";
import { SiteFooter } from "@/components/SiteFooter";
import { notes } from "@/lib/notes";

const posts = [
  {
    year: "2026",
    slug: "how-it-started",
    title: "how it all started",
    desc: "kanpur, a first computer, orca, quitting the jee track, bangalore, and how that hunger became vivacity.",
  },
  {
    year: "2026",
    slug: "bangalore-trip",
    title: "my month in bangalore (met the best people)",
    desc: "a month in bangalore: two hackathons, a walk-in at prolearn, two days broke at a petrol pump, and the best people. 15 jun - 5 jul 2026.",
  },
  {
    year: "2026",
    slug: "helios-stress-test",
    title: "helios stress test",
    desc: "terra follow-up. twenty-minute helios sessions under static and rotating prompts, with the drift written down.",
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

      <h1>Writing</h1>

      <p>
        i write when something keeps rattling around after the conversation
        ends. the long pieces live here. drop your email below and i&apos;ll
        ping you when one goes up, or just{" "}
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

      <h2>Notes</h2>
      <p className="muted" style={{ fontSize: "0.92em" }}>
        shorter things from days i want to remember. a grant landing, a fork
        finally behaving, or whatever made the week weird.{" "}
        <Link href="/notes">all notes →</Link>
      </p>
      <ul className="entry-list">
        {notes.slice(0, 3).map((note) => (
          <li key={note.slug}>
            <span className="entry-year">{note.date.slice(5)}</span>
            <span className="entry-name">
              <Link href={`/blog/notes/${note.slug}`}>{note.title}</Link>
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
            <Link href="/notes">notes</Link>
            <Link href="/work">work</Link>
            <Link href="/projects">projects</Link>
          </>
        }
      />
    </main>
  );
}
