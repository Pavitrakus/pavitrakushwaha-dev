import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PostChrome } from "@/components/PostChrome";
import { SiteFooter } from "@/components/SiteFooter";
import { getEssay, RESERVED_SLUGS } from "@/lib/essays";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const essay = await getEssay(slug);
  if (!essay || !essay.published) {
    return { title: "not found", robots: { index: false, follow: false } };
  }
  const url = `https://pavitrakushwaha.dev/blog/${essay.slug}`;
  const description = essay.dek || essay.title;
  return {
    title: essay.title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      url,
      title: `${essay.title} | Pavitra Kushwaha`,
      description,
      siteName: "Pavitra Kushwaha",
    },
    twitter: {
      card: "summary",
      site: "@pavikshw",
      creator: "@pavikshw",
      title: `${essay.title} | Pavitra Kushwaha`,
      description,
    },
  };
}

export default async function CmsEssayPage({ params }: Props) {
  const { slug } = await params;
  if (RESERVED_SLUGS.has(slug)) notFound();
  const essay = await getEssay(slug);
  if (!essay || !essay.published) notFound();

  const url = `https://pavitrakushwaha.dev/blog/${essay.slug}`;
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: essay.title,
    author: {
      "@type": "Person",
      name: "Pavitra Kushwaha",
      url: "https://pavitrakushwaha.dev",
    },
    datePublished: essay.createdAt,
    dateModified: essay.updatedAt,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <Link href="/blog" className="back-link">
        ← writing
      </Link>

      <span className="mono muted" style={{ display: "block", marginBottom: "0.6em" }}>
        {essay.year}
      </span>

      <h1 style={{ fontSize: "1.8em", marginBottom: "0.8em", lineHeight: 1.3 }}>
        {essay.title}
      </h1>

      {essay.dek ? (
        <p className="muted" style={{ fontSize: "0.9em", fontStyle: "italic", marginBottom: "1.8em" }}>
          {essay.dek}
        </p>
      ) : null}

      <PostChrome path={`/blog/${essay.slug}`} />

      <div className="essay-body" dangerouslySetInnerHTML={{ __html: essay.html }} />

      <SiteFooter
        links={
          <>
            <Link href="/blog">writing</Link>
            <Link href="/work">work</Link>
            <Link href="/projects">projects</Link>
          </>
        }
      />
    </main>
  );
}
