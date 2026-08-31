import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter } from "@/components/SiteFooter";
import { Favicon, Logo, YC } from "@/components/Brand";
import { work, type WorkMark } from "@/lib/work";

export const metadata: Metadata = {
  title: "work",
  description:
    "everything pavitra has been up to: vivacity, iitk, nvidia cardiac, openai codex, inflection, execron, and the rest.",
  alternates: { canonical: "https://pavitrakushwaha.dev/work" },
};

function Mark({ mark }: { mark: WorkMark }) {
  if (mark.kind === "yc") return <YC />;
  if (mark.kind === "favicon") {
    return <Favicon domain={mark.domain} alt={mark.alt} />;
  }
  return (
    <Logo
      src={mark.src}
      alt={mark.alt}
      rounded={!mark.contain}
      className={mark.src.endsWith(".svg") ? "invert-on-dark" : undefined}
      style={
        mark.contain
          ? { objectFit: "contain", width: "auto", height: "1em" }
          : undefined
      }
    />
  );
}

export default function WorkPage() {
  return (
    <main>
      <Link href="/" className="back-link">
        ← pavitra
      </Link>

      <h1>what i&apos;ve been up to.</h1>

      <p>
        the short list lives on the home page. this is the whole ledger. click
        anything. the technical version is underneath.
      </p>

      <ul className="entry-list" style={{ marginTop: "2em" }}>
        {work.map((w) => (
          <li key={w.slug}>
            <span className="entry-year">{w.year}</span>
            <span className="entry-name">
              <Mark mark={w.mark} />
              <Link href={`/work/${w.slug}`}>{w.title}</Link>
              {w.tag && (
                <span className="muted mono entry-tag">{w.tag}</span>
              )}
              <span className="entry-desc">{w.oneLiner}</span>
              <span className="entry-links">
                <Link href={`/work/${w.slug}`} className="mono read-more">
                  read more →
                </Link>
              </span>
            </span>
          </li>
        ))}
      </ul>

      <SiteFooter
        links={
          <>
            <Link href="/projects">projects</Link>
            <Link href="/blog">writing</Link>
          </>
        }
      />
    </main>
  );
}
