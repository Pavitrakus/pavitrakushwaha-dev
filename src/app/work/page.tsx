import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { SiteFooter } from "@/components/SiteFooter";
import { Favicon, Logo, YC } from "@/components/Brand";
import { work, type WorkMark } from "@/lib/work";

export const metadata: Metadata = {
  title: "work",
  description:
    "everything pavitra has been up to: vivacity, iitk, nvidia with cédric augonnet, openai codex oss, inflection, execron, and the rest.",
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
      className={[
        mark.src.endsWith(".svg") ? "invert-on-dark" : undefined,
        mark.contain ? "wordmark" : undefined,
      ]
        .filter(Boolean)
        .join(" ")}
      style={
        mark.contain
          ? { objectFit: "contain", width: "auto", height: "0.95em" }
          : undefined
      }
    />
  );
}

function OrgLink({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  if (href.startsWith("/")) {
    return <Link href={href}>{children}</Link>;
  }
  return (
    <a href={href} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  );
}

export default function WorkPage() {
  return (
    <main>
      <Link href="/" className="back-link">
        ← pavitra
      </Link>

      <h1>What I&apos;ve been up to</h1>

      <p>
        the home page gets the short version. this is the full record, with
        enough room to explain what i actually touched and why it mattered
      </p>

      <ul className="entry-list" style={{ marginTop: "2em" }}>
        {work.map((w) => (
          <li key={w.slug}>
            <span className="entry-year">{w.year}</span>
            <span className="entry-name">
              {w.orgHref ? (
                <OrgLink href={w.orgHref}>
                  <Mark mark={w.mark} />
                </OrgLink>
              ) : (
                <Mark mark={w.mark} />
              )}
              {w.also?.map((m, i) => (
                <Mark key={i} mark={m} />
              ))}
              <Link href={`/work/${w.slug}`}>{w.title}</Link>
              {w.tag && (
                <span className="muted mono entry-tag">{w.tag}</span>
              )}
              <span className="entry-desc">{w.oneLiner}</span>
              <span className="entry-links">
                <Link href={`/work/${w.slug}`} className="mono read-more">
                  read more →
                </Link>
                {w.orgHref && (
                  <OrgLink href={w.orgHref}>
                    <span className="mono read-more">site →</span>
                  </OrgLink>
                )}
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
