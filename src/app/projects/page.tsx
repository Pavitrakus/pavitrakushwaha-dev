import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter } from "@/components/SiteFooter";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Projects by Pavitra Kushwaha: Bucket, WhoCodedMore, ORCA, D2AR, ORBIS 2045, ClusterOrch-Gym, LumenSeed, and byteforge.",
  keywords: [
    "Pavitra Kushwaha projects",
    "Bucket application agent",
    "WhoCodedMore",
    "ORCA agentic AI",
    "D2AR Hindi NLP",
    "ORBIS 2045 hardware",
    "ClusterOrch-Gym",
    "LumenSeed medical AI",
    "byteforge community",
    "agentic android automation",
    "Hindi NLP benchmark",
    "Raspberry Pi LLM",
    "distributed GPU training RL",
  ],
  alternates: { canonical: "https://pavitrakushwaha.dev/projects" },
  openGraph: {
    type: "profile",
    url: "https://pavitrakushwaha.dev/projects",
    title: "Projects | Pavitra Kushwaha",
    description:
      "Side projects: Bucket, WhoCodedMore, ORCA, D2AR, ORBIS 2045, ClusterOrch-Gym, LumenSeed, byteforge.",
    siteName: "Pavitra Kushwaha",
  },
  twitter: {
    card: "summary_large_image",
    site: "@pavikshw",
    creator: "@pavikshw",
    title: "Projects | Pavitra Kushwaha",
    description:
      "Side projects: Bucket, WhoCodedMore, ORCA, D2AR, ORBIS 2045, ClusterOrch-Gym, LumenSeed, byteforge.",
  },
};

type Project = {
  year: string;
  slug: string;
  name: string;
  icon: string | null;
  favicon?: string;
  iconContain?: boolean;
  shortDesc: string;
  site: string | null;
  tag: string;
};

function siteLabel(url: string) {
  try {
    const parsed = new URL(url);
    const host = parsed.hostname.replace(/^www\./, "");
    const path = parsed.pathname.replace(/\/$/, "");
    return path && path !== "/" ? `${host}${path}` : host;
  } catch {
    return url;
  }
}

const projects: Project[] = [
  {
    year: "2026",
    slug: "bucket",
    name: "Bucket",
    icon: null,
    favicon: "brokebucket.com",
    shortDesc:
      "application agent that learns your story from claude, gpt, a resume, and connected apps, then drafts forms and waits for your review.",
    site: "https://www.brokebucket.com",
    tag: "AI / Product",
  },
  {
    year: "2026",
    slug: "whocodedmore",
    name: "WhoCodedMore",
    icon: "/whocodedmore-logo.png",
    iconContain: true,
    shortDesc:
      "who coded more? one command. real lines, tokens, and water. npx whocodedmore reads local agent logs, ranks you with friends. only totals leave your machine.",
    site: "https://whocodedmore.com",
    tag: "Tools / Leaderboard",
  },
  {
    year: "2025",
    slug: "orca",
    name: "ORCA",
    icon: "/orca-mascot.jpg",
    shortDesc:
      "agentic task automation on android. text what you need on whatsapp or telegram and the executor moves through the apps in the background.",
    site: "https://orca.cfd",
    tag: "AI / Agentic",
  },
  {
    year: "2025",
    slug: "orbis-2045",
    name: "ORBIS 2045",
    icon: "/orbis.jpeg",
    shortDesc:
      "desk appliance running a local LLM with adb-based phone control. pi, llama.cpp, the object sitting still.",
    site: null,
    tag: "Hardware / AI",
  },
  {
    year: "2025",
    slug: "byteforge",
    name: "byteforge.",
    icon: "/byteforge-logo.jpg",
    shortDesc:
      "north india's largest independent student tech community. 4,500+ members, an official Hack Club partner, and a room for builders in kanpur.",
    site: "https://byteforge.space",
    tag: "Community",
  },
  {
    year: "2024",
    slug: "d2ar",
    name: "D2AR",
    icon: null,
    shortDesc:
      "systematic benchmark comparing 8 language models (4 diffusion, 4 auto-regressive) on Hindi NLP tasks. published research, open-source evaluation framework.",
    site: "https://github.com/Pavitrakus/D2AR-diffusion-vs-ar-hindi-nlp",
    tag: "Research / NLP",
  },
  {
    year: "2024",
    slug: "lumenseed",
    name: "LumenSeed",
    icon: "/lumenseed.png",
    shortDesc:
      "medical report translator. turns clinical jargon into clear language anyone can read. won 1st at Techfest IIT Bombay SparkX.",
    site: "https://lumenseedai.web.app",
    tag: "Healthcare AI",
  },
  {
    year: "2024",
    slug: "clusterorch-gym",
    name: "ClusterOrch-Gym",
    icon: null,
    shortDesc:
      "RL benchmark for training AI agents to diagnose and fix distributed GPU training failures across massive compute clusters.",
    site: "https://github.com/Pavitrakus/clusterorch-gym",
    tag: "Research / RL",
  },
];

export default function ProjectsPage() {
  return (
    <main>
      <Link href="/" className="back-link">
        pavitra
      </Link>

      <h1>
        Things I&apos;ve built
      </h1>

      <p>
        side projects, research prototypes, and a community that got much
        bigger than its first discord server. the company is{" "}
        <a href="https://tryvivacity.com" target="_blank" rel="noopener noreferrer">
          vivacity
        </a>
        , and it lives on the homepage, not in this list. most of the code
        lives on my{" "}
        <a
          href="https://github.com/Pavitrakus"
          target="_blank"
          rel="noopener noreferrer"
        >
          github
        </a>
        . some have real users and a few are here because i still like them.{" "}
        <Link href="/visits" className="easter-quiet" title="don't ask how i know who visited">
          stalkers welcome
        </Link>
        .
      </p>

      <ul className="entry-list" style={{ marginTop: "2em" }}>
        {projects.map((p, i) => (
          <li key={i}>
            <span className="entry-year">{p.year}</span>
            <span className="entry-name">
              {p.icon ? (
                <img
                  src={p.icon}
                  alt=""
                  aria-hidden="true"
                  style={{
                    width: "1em",
                    height: "1em",
                    borderRadius: p.iconContain ? "0" : "3px",
                    objectFit: p.iconContain ? "contain" : "cover",
                    verticalAlign: "-0.12em",
                    marginRight: "0.25em",
                    display: "inline",
                  }}
                />
              ) : p.favicon ? (
                <img
                  src={`https://www.google.com/s2/favicons?sz=32&domain=${p.favicon}`}
                  alt=""
                  aria-hidden="true"
                  style={{
                    width: "1em",
                    height: "1em",
                    borderRadius: "3px",
                    objectFit: "contain",
                    verticalAlign: "-0.12em",
                    marginRight: "0.25em",
                    display: "inline",
                  }}
                />
              ) : null}

              <Link href={`/projects/${p.slug}`}>{p.name}</Link>

              {p.tag && (
                <span className="muted mono entry-tag">{p.tag}</span>
              )}

              <span className="entry-desc">{p.shortDesc}</span>

              <span className="entry-links">
                {p.site && (
                  <a
                    href={p.site}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mono read-more"
                  >
                    {siteLabel(p.site)} ↗
                  </a>
                )}
                <Link
                  href={`/projects/${p.slug}`}
                  className="mono read-more"
                >
                  read more →
                </Link>
              </span>
            </span>
          </li>
        ))}
      </ul>

      <p>
        most of my code is on{" "}
        <a
          href="https://github.com/Pavitrakus"
          target="_blank"
          rel="noopener noreferrer"
        >
          github
        </a>
        . the stranger repositories are usually the fun ones.
      </p>

      <SiteFooter
        links={<Link href="/blog">writing</Link>}
      />
    </main>
  );
}
