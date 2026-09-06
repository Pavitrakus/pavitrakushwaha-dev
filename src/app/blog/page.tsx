import Link from "next/link";
import { SiteFooter } from "@/components/SiteFooter";
import { NotifyForm } from "@/components/NotifyForm";
import { notes } from "@/lib/notes";
import { listPublishedEssays } from "@/lib/essays";

export const dynamic = "force-dynamic";

type PostRow = {
  year: string;
  slug: string;
  title: string;
  desc: string;
  link?: string;
};

const posts: PostRow[] = [
  {
    year: "2026",
    slug: "how-it-started",
    title: "how it all started",
    desc: "kanpur, a first computer, orca, leaving the jee track, bangalore, and how that hunger became vivacity.",
  },
  {
    year: "2026",
    slug: "bangalore-trip",
    title: "my month in bangalore",
    desc: "two hackathons, a walk-in at prolearn, two days outside a petrol pump, and the people. 15 jun - 5 jul 2026.",
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

export default async function BlogPage() {
  const live = await listPublishedEssays();
  const taken = new Set(posts.map((p) => p.slug));
  const extras = live
    .filter((e) => !taken.has(e.slug))
    .sort((a, b) => (a.updatedAt < b.updatedAt ? 1 : -1))
    .map((e): PostRow => ({
      year: e.year,
      slug: e.slug,
      title: e.title,
      desc: e.dek,
    }));

  const feed = [...extras, ...posts];

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
        {feed.map((p) => (
          <li key={p.slug}>
            <span className="entry-year">{p.year}</span>
            <span className="entry-name">
              <Link href={p.link || `/blog/${p.slug}`}>{p.title}</Link>
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
        <NotifyForm />
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
