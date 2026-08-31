import type { Metadata } from "next";
import Link from "next/link";
import { PostChrome } from "@/components/PostChrome";
import { SiteFooter } from "@/components/SiteFooter";


export const metadata: Metadata = {
  title: "byteforge.",
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
    site: "@pavikshw",
    creator: "@pavikshw",
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
        <p>kanpur has factories, coaching centers, and a lot of teenagers building alone after class. i wanted one room where a half-working project was enough reason to show up.</p>

        <p>byteforge started as that room on discord. a few friends dropped screenshots, asked stupid questions, reviewed each other&apos;s code, and invited the next person.</p>

        <h2 style={{ fontSize: "1.1em", fontWeight: 600, marginTop: "1.5em", marginBottom: "0.6em" }}>from discord to a city</h2>

        <p>the server grew into more than 4,500 members across discord, whatsapp, and in-person events. byteforge became an official hack club partner and started running workshops, project reviews, open-source sessions, mentor calls, and the occasional event big enough to eat the entire calendar.</p>

        <p>the useful bit is still small. someone posts a broken build on a tuesday night and another student from the same city knows why it broke.</p>

        <h2 style={{ fontSize: "1.1em", fontWeight: 600, marginTop: "1.5em", marginBottom: "0.6em" }}>execron 1.0</h2>

        <p>execron was the loud version of byteforge: a workshop and 24-hour build sprint for school students at <strong>iit kanpur</strong> during techkriti &apos;26. more than 290 builders came through. my team and i raised and distributed $75k in prizes and credits plus $2k in cash.</p>

        <p>the sponsor deck, mentor grid, power plan, judging, food, rooms, and the calls at 2am were raised and run by us. teams came from kanpur, lucknow, allahabad, and delhi, then spent the night shipping whatever they had been waiting to build. somehow we all survived. also useful: a place to{" "}<Link href="/visits" className="easter-quiet" title="kanpur sees you">see who showed up weirdly late at night</Link>.</p>

        <h2 style={{ fontSize: "1.1em", fontWeight: 600, marginTop: "1.5em", marginBottom: "0.6em" }}>what stays after the event</h2>

        <p>weekly project rooms, code reviews, workshops across web, ai, systems, and open source, plus mentors who remember what it felt like to ask the first question. events bring people in. the community is what gives them somewhere to return.</p>

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
