import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter } from "@/components/SiteFooter";
import { notes } from "@/lib/notes";

export const metadata: Metadata = {
  title: "notes",
  description:
    "short notes from Pavitra Kushwaha about good days, strange weeks, research, and things being built.",
  alternates: { canonical: "https://pavitrakushwaha.dev/blog/notes" },
};

export default function NotesPage() {
  return (
    <main>
      <Link href="/blog" className="back-link">
        ← writing
      </Link>

      <h1>notes.</h1>

      <p>
        some days deserve a few paragraphs before they blur into the next
        build. a good meeting, a grant landing, a fork finally behaving, a
        week that got weird. they show up here whenever they happen
      </p>

      <ul className="entry-list" style={{ marginTop: "2em" }}>
        {notes.map((n) => (
          <li key={n.slug}>
            <span className="entry-year">{n.date.slice(0, 4)}</span>
            <span className="entry-name">
              <Link href={`/blog/notes/${n.slug}`}>{n.title}</Link>
              <span className="entry-desc">{n.date}</span>
            </span>
          </li>
        ))}
      </ul>

      <SiteFooter
        links={
          <>
            <Link href="/blog">writing</Link>
            <Link href="/projects">projects</Link>
          </>
        }
      />
    </main>
  );
}
