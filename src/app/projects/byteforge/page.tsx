import type { Metadata } from "next";
import Link from "next/link";
import { PostChrome } from "@/components/PostChrome";
import { SiteFooter } from "@/components/SiteFooter";


export const metadata: Metadata = {
  title: "byteforge. | Pavitra Kushwaha",
  description:
    "north india's largest independent student tech community. 4,500+ members. official Hack Club partner. Started from a small Discord server in Kanpur. Hosted Execron 1.0 BuildFest at IIT Kanpur with 290+ developers.",
  keywords: [
    "byteforge",
    "Pavitra Kushwaha byteforge",
    "student tech community India",
    "north India tech community",
    "Hack Club partner India",
    "Execron BuildFest",
    "IIT Kanpur hackathon",
    "Kanpur tech community",
    "student builders India",
    "Discord tech community",
    "4,500 members tech community",
  ],
  openGraph: {
    type: "article",
    url: "https://pavitrakushwaha.dev/projects/byteforge",
    title: "byteforge. - North India's Largest Student Tech Community | Pavitra Kushwaha",
    description:
      "north india's largest independent student tech community. 4,500+ members. official Hack Club partner. Hosted Execron 1.0 BuildFest at IIT Kanpur with 290+ developers.",
    siteName: "Pavitra Kushwaha",
  },
  twitter: {
    card: "summary_large_image",
    site: "@Pavitra_Kushwah",
    creator: "@Pavitra_Kushwah",
    title: "byteforge. | Pavitra Kushwaha",
    description:
      "north india's largest independent student tech community. 4,500+ members. Hack Club partner. Execron 1.0 at IIT Kanpur.",
  },
  alternates: { canonical: "https://pavitrakushwaha.dev/projects/byteforge" },
};

const articleJsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "byteforge. - North India's Largest Student Tech Community",
  description:
    "north india's largest independent student tech community. 4,500+ members. official Hack Club partner. Hosted Execron 1.0 BuildFest at IIT Kanpur with 290+ developers.",
  author: {
    "@type": "Person",
    name: "Pavitra Kushwaha",
    url: "https://pavitrakushwaha.dev",
  },
  publisher: {
    "@type": "Person",
    name: "Pavitra Kushwaha",
    url: "https://pavitrakushwaha.dev",
  },
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id": "https://pavitrakushwaha.dev/projects/byteforge",
  },
  keywords: "byteforge, student community, Hack Club, Execron, IIT Kanpur, Pavitra Kushwaha",
  inLanguage: "en-IN",
};

export default function ByteforgePage() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <Link href="/projects" className="back-link">
        ← projects
      </Link>

      <span className="mono muted" style={{ display: "block", marginBottom: "0.6em" }}>
        2025 &middot; Community
      </span>

      <h1 style={{ fontSize: "1.8em", marginBottom: "0.8em", lineHeight: 1.3 }}>
        byteforge.
      </h1>

      <p className="muted" style={{ fontSize: "0.9em", fontStyle: "italic", marginBottom: "1.8em" }}>
        north india&apos;s largest independent student tech community. 4,500+ members. official Hack Club partner.
      </p>

      <PostChrome />

      <div className="post-body">
        <p>Kanpur is a huge industrial city, but when it comes to tech and building software, it felt like a complete desert. If you&apos;re a kid here who wants to code projects or build startups, there was no community. Everyone is focused on studying for entrance exams or getting traditional credentials, which is fine, but it gets lonely when you just want to stay up all night building random tools.</p>

        <p>I got tired of waiting for some school or college to build a coding scene, so I decided to build it myself.</p>

        <h2 style={{ fontSize: "1.1em", fontWeight: 600, marginTop: "1.5em", marginBottom: "0.6em" }}>The Beginning</h2>

        <p>byteforge started as a small Discord server for student builders. A few friends who wanted to share what they were working on, get feedback, and collaborate on projects. No budget, no sponsors, no experience running a community &mdash; just a shared server and a bunch of kids who wanted to build cool things.</p>

        <p>It grew incredibly fast. What started as a handful of students turned into a regional movement. byteforge is now north India&apos;s largest independent student tech community with over 4,500 members across Discord, WhatsApp, and in-person events. We are an official Hack Club partner, which connects us to a global network of student-run coding clubs.</p>

        <h2 style={{ fontSize: "1.1em", fontWeight: 600, marginTop: "1.5em", marginBottom: "0.6em" }}>Execron 1.0 BuildFest</h2>

        <p>The flagship event was Execron 1.0 BuildFest, hosted at <strong>IIT Kanpur</strong>. It brought in 290+ developers for a 24-hour hackathon &mdash; one of the biggest the city had seen. I organized, ran, and somehow survived it. There was no budget, no prior event management experience, just relentless grinding and a lot of calls at 2am. Developers came from Kanpur, Lucknow, Allahabad, and even Delhi. Teams built everything from Web3 applications to AI-powered agri-tech tools for local farmers.</p>

        <p>Execron proved that you don&apos;t need to live in Silicon Valley or Bangalore to have a vibrant dev culture. You just need a place where builders feel welcome to share their creations. also a place to{" "}<Link href="/visits" className="easter-quiet" title="kanpur sees you">see who showed up weirdly late at night</Link>.</p>

        <h2 style={{ fontSize: "1.1em", fontWeight: 600, marginTop: "1.5em", marginBottom: "0.6em" }}>What byteforge Does</h2>

        <ul style={{ marginTop: "0.5em" }}>
          <li>Weekly project showcases and code reviews in themed channels</li>
          <li>Monthly workshops on web dev, AI/ML, systems programming, and open source contribution</li>
          <li>Hackathons and buildathons with real-world problem statements from local industries</li>
          <li>Mentorship matching between experienced developers and beginners</li>
          <li>Collaborative open source projects where members build portfolio-worthy work together</li>
          <li>Speaker sessions with founders, engineers, and researchers from across India</li>
        </ul>

        <p style={{ marginTop: "1.5em" }}>
          <a
            href="https://byteforge.space"
            target="_blank"
            rel="noopener noreferrer"
            className="mono"
            style={{ fontSize: "0.82em" }}
          >
            byteforge.space ↗
          </a>
        </p>
      </div>

      <SiteFooter
        links={<Link href="/projects">projects</Link>}
      />
    </main>
  );
}
