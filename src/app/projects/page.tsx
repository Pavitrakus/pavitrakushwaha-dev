import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Projects | Pavitra Kushwaha",
  description:
    "Things Pavitra Kushwaha has built: ORCA zero-step agentic AI, D2AR Hindi NLP benchmark, ORBIS 2045 hardware AI appliance, ClusterOrch-Gym RL for distributed GPU training, LumenSeed medical report translator, byteforge tech community, and more.",
  keywords: [
    "Pavitra Kushwaha projects",
    "ORCA agentic AI",
    "D2AR Hindi NLP",
    "ORBIS 2045 hardware",
    "ClusterOrch-Gym",
    "LumenSeed medical AI",
    "byteforge community",
    "PaXus",
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
      "Things Pavitra Kushwaha has built: ORCA, D2AR, ORBIS 2045, ClusterOrch-Gym, LumenSeed, byteforge, and more.",
    siteName: "Pavitra Kushwaha",
  },
  twitter: {
    card: "summary_large_image",
    site: "@Pavitra_Kushwah",
    creator: "@Pavitra_Kushwah",
    title: "Projects | Pavitra Kushwaha",
    description:
      "Things Pavitra Kushwaha has built: ORCA, D2AR, ORBIS 2045, ClusterOrch-Gym, LumenSeed, byteforge.",
  },
};

const projects = [
  {
    year: "2025",
    slug: "orca",
    name: "ORCA",
    icon: "/orca-mascot.jpg",
    shortDesc:
      "zero-step agentic task automation on android. you text what you need on whatsapp or telegram and it happens in the background. no app downloads, no UI learning.",
    link: null,
    tag: "AI / Agentic",
  },
  {
    year: "2025",
    slug: "orbis-2045",
    name: "ORBIS 2045",
    icon: "/orbis.jpeg",
    shortDesc:
      "standalone hardware device running a locally-hosted LLM with ADB-based mobile control. designed to look like it belongs in 2045, not 2025.",
    link: null,
    tag: "Hardware / AI",
  },
  {
    year: "2025",
    slug: "byteforge",
    name: "byteforge.",
    icon: "/byteforge-logo.jpg",
    shortDesc:
      "north india's largest independent student tech community. 4,500+ members. official Hack Club partner. started because i wanted the room to exist and it didn't.",
    link: "https://byteforge.space",
    external: true,
    tag: "Community",
  },
  {
    year: "2025",
    slug: null,
    name: "PaXus",
    icon: null,
    shortDesc:
      "a multi-venture technology company across AI, software, digital commerce, and intelligent systems. the parent of most things i build.",
    link: null,
    tag: "Company",
  },
  {
    year: "2024",
    slug: "d2ar",
    name: "D2AR",
    icon: null,
    shortDesc:
      "systematic benchmark comparing 8 language models (4 diffusion, 4 auto-regressive) on Hindi NLP tasks. published research, open-source evaluation framework.",
    link: "https://github.com/Pavitrakus/D2AR-diffusion-vs-ar-hindi-nlp",
    external: true,
    tag: "Research / NLP",
  },
  {
    year: "2024",
    slug: "lumenseed",
    name: "LumenSeed",
    icon: "/lumenseed.png",
    shortDesc:
      "medical report translator. turns clinical jargon into clear language anyone can read. won 1st at Techfest IIT Bombay SparkX.",
    link: null,
    tag: "Healthcare AI",
  },
  {
    year: "2024",
    slug: "clusterorch-gym",
    name: "ClusterOrch-Gym",
    icon: null,
    shortDesc:
      "RL benchmark for training AI agents to diagnose and fix distributed GPU training failures across massive compute clusters.",
    link: "https://github.com/Pavitrakus/clusterorch-gym",
    external: true,
    tag: "Research / RL",
  },
];

export default function ProjectsPage() {
  return (
    <main>
      <Link href="/" className="back-link">
        pavitra
      </Link>

      <h1>things i&apos;ve built.</h1>

      <p>
        not everything here has a link and not everything with a link is
        finished. some are research, some are companies, some are somewhere in
        between. the ones that matter most are usually the ones that took the
        longest to name.
      </p>

      <ul className="entry-list" style={{ marginTop: "2em" }}>
        {projects.map((p, i) => (
          <li key={i}>
            <span className="entry-year">{p.year}</span>
            <span className="entry-name">
              {p.icon ? (
                <img
                  src={p.icon}
                  alt={p.name}
                  style={{
                    width: "1em",
                    height: "1em",
                    borderRadius: "3px",
                    objectFit: "cover",
                    verticalAlign: "-0.12em",
                    marginRight: "0.25em",
                    display: "inline",
                  }}
                />
              ) : null}

              {p.link ? (
                <a
                  href={p.link}
                  {...(p.external
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                >
                  {p.name}
                </a>
              ) : (
                <strong style={{ fontWeight: 600 }}>{p.name}</strong>
              )}

              {p.tag && (
                <span
                  className="muted mono"
                  style={{
                    marginLeft: "0.6em",
                    fontSize: "0.68em",
                    background: "#f5f5f5",
                    padding: "0.1em 0.5em",
                    borderRadius: "3px",
                    border: "1px solid #eee",
                    verticalAlign: "0.05em",
                  }}
                >
                  {p.tag}
                </span>
              )}

              <span className="entry-desc">{p.shortDesc}</span>

              {p.slug && (
                <span style={{ display: "block", marginTop: "0.3em" }}>
                  <Link
                    href={`/projects/${p.slug}`}
                    className="mono"
                    style={{
                      fontSize: "0.72em",
                      color: "#888",
                      textDecoration: "none",
                      borderBottom: "1.5px solid #ddd",
                      paddingBottom: "1px",
                      transition: "color 0.15s, border-color 0.15s",
                    }}
                  >
                    read more →
                  </Link>
                </span>
              )}
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
        . some of it shouldn&apos;t be public but is anyway.
      </p>

      <footer>
        <span>2026 pavitra kushwaha</span>
        <Link href="/">home</Link>
        <Link href="/v01">v01 2025</Link>
      </footer>
    </main>
  );
}
