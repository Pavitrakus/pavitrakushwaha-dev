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
    year: "2025",
    name: "ORCA",
    icon: "/orca-mascot.jpg",
    desc: `zero-step agentic task automation on android. the problem with apps is that there are way too many of them, and every single one is just another chore between wanting something done and actually having it happen. you unlock your phone, search for the app, wait for it to load, parse whatever interface they designed this week, click five buttons, and close it. orca is our attempt at killing that entire chain.

you don't download an app. you don't learn a ui. you just send a normal text on whatsapp or telegram — "order a veg burger from the place down the street and book a cab to the office" — and it happens in the background.

the architecture: a server-side runner hooks into android devices using ADB (android debug bridge) and custom accessibility service scripts. the message arrives, we parse intent through an LLM (currently running a quantized Qwen variant for low-latency inference), translate it into a deterministic DAG of low-level UI gestures — taps, scrolls, text inputs, swipe vectors with coordinate mappings. each gesture gets executed on a headless android device cluster managed through SCXML state machines with retry logic and failure rollback. we stream execution confirmations back through the chat interface in real-time.

in india, ~500 million mobile users are genuinely not going to download one more app for one specific task. they already know how to use whatsapp. orca meets them exactly where they are.`,
    link: null,
    tag: "AI / Agentic",
  },
  {
    year: "2025",
    name: "ORBIS 2045",
    icon: "/orbis.jpeg",
    desc: `a standalone hardware device running a locally-hosted LLM with ADB-based mobile control — designed to look like it belongs in 2045, not 2025.

the stack: raspberry pi 5 (8GB) running a quantized 7B-parameter model via llama.cpp with GPU offload to the VideoCore VII. the device exposes a mesh-network API that lets you route inference requests through a peer-to-peer topology — no cloud dependency, no external API keys. mobile control is handled through ADB over Wi-Fi with a custom accessibility service that maps natural language commands to UI automations.

the chassis is 3D-printed with embedded neopixel strips that pulse in different patterns depending on inference load — blue during idle, amber during chain-of-thought, red during heavy batch processing. it's a statement device. it's meant to sit on your desk and remind you that intelligence doesn't need a data center.`,
    link: null,
    tag: "Hardware / AI",
  },
  {
    year: "2025",
    name: "byteforge.",
    icon: "/byteforge-logo.jpg",
    desc: `north india's largest independent student tech community — 4,500+ members, official Hack Club partner, coordinating events across high schools and hosting major hackathons.

kanpur is a huge industrial city, but when it comes to tech and building software, it felt like a complete desert. if you're a kid here who wants to code projects or build startups, there was no community. everyone is focused on studying for entrance exams or getting traditional credentials — which is fine, but it gets lonely when you just want to stay up all night building random tools. i got tired of waiting for some school or college to build a coding scene, so i decided to build it myself.

we started byteforge as a small discord server for student builders. it grew incredibly fast. we are now north india's largest independent student tech community with over 4,500 members. we are an official Hack Club partner, we coordinate events across high schools, and we host major hackathons — like our Execron 1.0 BuildFest at IIT Kanpur which brought in 290+ developers. one of the biggest hackathons the city had seen. i organized, ran, and somehow survived it.

we didn't have any budget, sponsors, or experience when we started. we just had a shared discord server and a bunch of kids who wanted to build cool things. byteforge proved to me that you don't need to live in silicon valley or bangalore to have a vibrant dev culture. you just need a place where builders feel welcome to share their creations.`,
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
    name: "D2AR — Diffusion vs. Auto-Regressive Hindi NLP",
    icon: null,
    desc: `a systematic benchmark comparing 8 state-of-the-art language models — 4 diffusion-based and 4 auto-regressive — across 4 Hindi NLP tasks through a 5-step evaluation pipeline. this is the most comprehensive benchmark of diffusion language models for Hindi to date.

the pipeline: data preprocessing and transliteration normalization → zero-shot prompting across all 8 models → metric computation (BLEU, ROUGE-L, BERTScore, perplexity) → statistical significance testing → qualitative error analysis. we published the research and the full evaluation framework is open-source.

key finding: diffusion models showed competitive performance on generation tasks but lagged on structured NLP tasks. the paper discusses architectural reasons — diffusion models lack the causal attention scaffolding that auto-regressive models use for sequential reasoning, which becomes critical for morphologically rich languages like Hindi.`,
    link: "https://github.com/Pavitrakus/D2AR-diffusion-vs-ar-hindi-nlp",
    external: true,
    tag: "Research / NLP",
  },
  {
    year: "2024",
    name: "LumenSeed",
    icon: "/lumenseed.png",
    desc: `medical report translator that turns dense clinical jargon into clear, human-readable language. won 1st prize at SparkX Startup Pitching, Techfest IIT Bombay.

whenever you get a medical report back from a lab, it is written entirely in dense jargon meant for doctors. if you try to search for the terms online, you usually end up reading extreme diagnosis threads and panicking. most patients have no idea what their own health data means — which is a massive communication gap. we built lumenseed to translate medical reports into clear, friendly language that anyone can read. it doesn't give medical advice — it just explains what the terms mean, what the normal ranges are, and what questions you should actually ask your doctor during your next visit.

the architecture: we used LangChain to set up a retrieval-augmented generation (RAG) pipeline. when a patient uploads a PDF report, we extract the text, chunk it by semantic boundaries, and pull reference definitions from verified medical dictionaries stored in a Weaviate vector database. we then use a fine-tuned LLM to write the summary, enforcing a strict tone classifier so the output sounds human and calming, not robotic or alarmist.

medical data is incredibly sensitive, so we designed the system to run on local-first principles wherever possible, stripping out PII before any text gets processed by the inference layer. the stack includes OCR fallback for scanned reports, entity linking to UMLS medical ontologies, and confidence scoring for each explanation so patients know how reliable the information is.`,
    link: null,
    tag: "Healthcare AI",
  },
  {
    year: "2024",
    name: "ClusterOrch-Gym",
    icon: null,
    desc: "RL benchmark for training AI agents to diagnose and remediate distributed GPU training failures across massive compute clusters. agents learn to detect node failures, network partitions, NCCL timeout cascades, and OOM conditions — then execute recovery policies (checkpoint rollback, topology reconfiguration, power capping). built on a discrete-event simulator that models real cluster telemetry from actual training runs.",
    link: "https://github.com/Pavitrakus/clusterorch-gym",
    external: true,
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
