import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PostChrome } from "@/components/PostChrome";
import { SiteFooter } from "@/components/SiteFooter";
import { getNote, notes } from "@/lib/notes";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return notes.map((n) => ({ slug: n.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const note = getNote(slug);
  if (!note) return { title: "note" };
  return {
    title: note.title,
    description: note.body[0],
    alternates: {
      canonical: `https://pavitrakushwaha.dev/blog/notes/${note.slug}`,
    },
  };
}

export default async function NotePage({ params }: Props) {
  const { slug } = await params;
  const note = getNote(slug);
  if (!note) notFound();

  return (
    <main>
      <Link href="/blog/notes" className="back-link">
        ← notes
      </Link>

      <span className="notes-date">{note.date}</span>
      <h1 className="post-title">{note.title}</h1>
      <PostChrome />

      <div className="note-body">
        {note.body.map((p) => (
          <p key={p.slice(0, 24)}>{p}</p>
        ))}
      </div>

      <SiteFooter
        links={
          <>
            <Link href="/blog/notes">notes</Link>
            <Link href="/blog">writing</Link>
          </>
        }
      />
    </main>
  );
}
