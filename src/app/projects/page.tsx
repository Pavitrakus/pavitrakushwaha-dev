import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Projects — Pavitra Kushwaha",
  description:
    "Things Pavitra Kushwaha has built — ORCA, D2AR, Execron 1.0 BuildFest, ORBIS 2045, ClusterOrch-Gym, LumenSeed, byteforge., and more.",
  alternates: { canonical: "https://pavitrakushwaha.dev/projects" },
};

const projects = [
  {
    year: "2026",
    name: "ORCA",
    icon: "/orca-mascot.jpg",
    desc: "agentic AI that controls Android via WhatsApp and Telegram. basically the phone assistant from a sci-fi movie, built for right now.",
    link: null,
    tag: "AI / Agentic",
  },
  {
    year: "2026",
    name: "Execron 1.0 BuildFest",
    icon: null,
    desc: "a 290+ participant hackathon at IIT Kanpur. one of the biggest the city had seen. i organized, ran, and somehow survived it.",
    link: null,
    tag: "Event",
  },
  {
    year: "2025",
    name: "ORBIS 2045",
    icon: null,
    desc: "Raspberry Pi + locally-running LLM + ADB phone control, assembled into a device that doesn't look like it belongs in 2025. because it doesn't.",
    link: null,
    tag: "Hardware / AI",
  },
  {
    year: "2025",
    name: "byteforge.",
    icon: null,
    desc: "one of north India's largest indie tech communities. 4,500+ members building in public. started it because i wanted the room to exist — and it didn't.",
    link: "https://byteforge.space",
    external: true,
    tag: "Community",
  },
  {
    year: "2025",
    name: "PaXus",
    icon: null,
    desc: "a multi-venture technology company across AI, software, digital commerce, and intelligent systems. the parent of most things i build.",
    link: null,
    tag: "Company",
  },
  {
    year: "2024",
    name: "D2AR",
    icon: null,
    desc: "a benchmark comparing 8 diffusion vs. auto-regressive language models on Hindi NLP tasks. published research. the kind of thing that takes months and gets read by twelve people who really care.",
    link: "https://github.com/Pavitrakus/D2AR-diffusion-vs-ar-hindi-nlp/blob/master/README.md",
    external: true,
    tag: "Research / NLP",
  },
  {
    year: "2024",
    name: "LumenSeed",
    icon: "/lumenseed.png",
    desc: "GenAI healthcare platform built to make medicine more accessible. won 1st prize at Sprakx Startup Pitching, IIT Bombay.",
    link: null,
    tag: "Healthcare AI",
  },
  {
    year: "2024",
    name: "ClusterOrch-Gym",
    icon: null,
    desc: "RL benchmark in Python for AI agents diagnosing distributed GPU failures across massive compute clusters. niche? yes. necessary? absolutely.",
    link: null,
    tag: "Research / RL",
  },
];

export default function ProjectsPage() {
  return (
    <main>
      <Link href="/" className="back-link">
        ← pavitra
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
              {/* inline icon */}
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

              <span className="entry-desc">{p.desc}</span>
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
        <Link href="/">← home</Link>
        <Link href="/v01">v01 2025</Link>
      </footer>
    </main>
  );
}
