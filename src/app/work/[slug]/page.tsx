import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PostChrome } from "@/components/PostChrome";
import { SiteFooter } from "@/components/SiteFooter";
import { Favicon, Logo, YC } from "@/components/Brand";
import { getWork, work, type WorkMark } from "@/lib/work";

type Props = { params: Promise<{ slug: string }> };

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
          ? {
              objectFit: "contain",
              width: "auto",
              height: "1.05em",
              verticalAlign: "-0.18em",
            }
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

export function generateStaticParams() {
  return work.map((w) => ({ slug: w.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const item = getWork(slug);
  if (!item) return { title: "work" };
  return {
    title: item.title,
    description: item.oneLiner,
    alternates: {
      canonical: `https://pavitrakushwaha.dev/work/${item.slug}`,
    },
  };
}

export default async function WorkItemPage({ params }: Props) {
  const { slug } = await params;
  const item = getWork(slug);
  if (!item) notFound();

  return (
    <main>
      <Link href="/work" className="back-link">
        ← work
      </Link>

      <span className="mono muted" style={{ display: "block", marginBottom: "0.6em" }}>
        {item.year} &middot; {item.tag}
      </span>

      <h1 className="post-title">
        {item.orgHref ? (
          <OrgLink href={item.orgHref}>
            <Mark mark={item.mark} />
            {item.also?.map((m, i) => (
              <Mark key={i} mark={m} />
            ))}
            {item.title}
          </OrgLink>
        ) : (
          <>
            <Mark mark={item.mark} />
            {item.also?.map((m, i) => (
              <Mark key={i} mark={m} />
            ))}
            {item.title}
          </>
        )}
      </h1>

      <p className="muted" style={{ fontSize: "0.9em", fontStyle: "italic", marginBottom: "1.4em" }}>
        {item.oneLiner}
      </p>

      <PostChrome />

      <div className="post-body">
        {item.body.map((p) => (
          <p key={p.slice(0, 40)}>{p}</p>
        ))}
        {item.moreHref && (
          <p style={{ marginTop: "1.4em" }}>
            <Link href={item.moreHref} className="mono read-more">
              {item.moreLabel || "more"} →
            </Link>
          </p>
        )}
      </div>

      <SiteFooter
        links={
          <>
            <Link href="/work">work</Link>
            <Link href="/projects">projects</Link>
          </>
        }
      />
    </main>
  );
}
