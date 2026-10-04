import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { NotesAccessForm } from "@/components/NotesAccessForm";
import { NotesLockButton } from "@/components/NotesLockButton";
import { PostChrome } from "@/components/PostChrome";
import { SiteFooter } from "@/components/SiteFooter";
import { hasNotesSession, notesConfigured } from "@/lib/notes-auth";
import { getNote } from "@/lib/notes";

type Props = { params: Promise<{ slug: string }> };

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const configured = notesConfigured();
  if (!configured || !(await hasNotesSession())) {
    return { title: "notes" };
  }
  const { slug } = await params;
  const note = getNote(slug);
  if (!note) return { title: "note" };
  return {
    title: note.title,
    authors: [{ name: note.author }],
    description: note.body[0],
    alternates: {
      canonical: `https://pavitrakushwaha.dev/blog/notes/${note.slug}`,
    },
  };
}

export default async function NotePage({ params }: Props) {
  const configured = notesConfigured();
  const authed = configured && (await hasNotesSession());

  if (!authed) {
    return (
      <main>
        <Link href="/blog/notes" className="back-link">
          ← notes
        </Link>
        <h1>Private notes</h1>
        {!configured ? (
          <p className="muted">notes access is not configured yet.</p>
        ) : (
          <>
            <p className="muted">enter password to continue.</p>
            <NotesAccessForm />
          </>
        )}
      </main>
    );
  }

  const { slug } = await params;
  const note = getNote(slug);
  if (!note) notFound();

  return (
    <main>
      <div className="admin-top" style={{ marginBottom: "1.2em" }}>
        <Link href="/blog/notes" className="back-link" style={{ marginBottom: 0 }}>
          ← notes
        </Link>
        <NotesLockButton />
      </div>

      <span className="notes-date">{note.date}</span>
      <h1 className="post-title">{note.title}</h1>
      <p className="muted" style={{ fontSize: "0.88em" }}>by my instinct · {note.author}</p>
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
