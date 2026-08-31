import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter } from "@/components/SiteFooter";
import { notes } from "@/lib/notes";

export const metadata: Metadata = {
  title: "notes",
  description:
    "short notes from pavitra. the days that actually happened, not the essays.",
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
        the long pieces take months. these show up when a week actually did
        something. a good day, a grant, a fork that verified. i&apos;ll add
        more when it happens.
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
