import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Projects, Pavitra Kushwaha",
  description:
    "Things Pavitra Kushwaha has built: ORCA, D2AR, ORBIS 2045, ClusterOrch-Gym, LumenSeed, byteforge., and more.",
  alternates: { canonical: "https://pavitrakushwaha.dev/projects" },
};

const projects = [
  {
    year: "2025",
    name: "ORCA",
    icon: "/orca-mascot.jpg",
    shortDesc:
      "zero-step agentic task automation on android. you text what you need on whatsapp or telegram and it happens in the background. no app downloads, no UI learning.",
    fullDesc: `the problem with apps is that there are way too many of them, and every single one is just another chore between wanting something done and actually having it happen. you unlock your phone, search for the app, wait for it to load, parse whatever interface they designed this week, click five buttons, and close it. orca is our attempt at killing that entire chain.

you don't download an app. you don't learn a ui. you just send a normal text on whatsapp or telegram, like "order a veg burger from the place down the street and book a cab to the office," and it happens in the background.

the architecture:
  1. message ingestion: whatsapp/telegram webhook receives the user text
  2. intent parsing: LLM (quantized Qwen variant) extracts structured intent + entities
  3. DAG construction: intent maps to a directed acyclic graph of low-level UI gestures (taps, scrolls, text inputs, swipe vectors with x/y coordinate mappings)
  4. execution: headless android device cluster runs each gesture sequentially via ADB (android debug bridge) + custom accessibility service scripts
  5. state management: SCXML state machines handle retry logic, failure rollback, and device health monitoring
  6. confirmation: execution status streams back through the chat interface in real-time

in india, ~500 million mobile users are genuinely not going to download one more app for one specific task. they already know how to use whatsapp. orca meets them exactly where they are.`,
    link: null,
    tag: "AI / Agentic",
  },
  {
    year: "2025",
    name: "ORBIS 2045",
    icon: "/orbis.jpeg",
    shortDesc:
      "standalone hardware device running a locally-hosted LLM with ADB-based mobile control. designed to look like it belongs in 2045, not 2025.",
    fullDesc: `a purpose-built hardware device that runs a local large language model and controls your phone, all without any cloud dependency.

the stack:
  - compute: raspberry pi 5 (8GB) running a quantized 7B-parameter model via llama.cpp with GPU offload to the VideoCore VII
  - networking: mesh-network API for peer-to-peer inference routing, no external API keys required
  - mobile control: ADB over Wi-Fi with a custom accessibility service that maps natural language commands to UI automations
  - interface: neopixel LED strips embedded in the chassis pulse based on inference load (blue = idle, amber = chain-of-thought, red = heavy batch processing)

the chassis is 3D-printed with a matte black finish and angled geometry that looks like it was pulled from a sci-fi prop department. it's a statement device. it sits on your desk and reminds you that intelligence doesn't need a data center.`,
    link: null,
    tag: "Hardware / AI",
  },
  {
    year: "2025",
    name: "byteforge.",
    icon: "/byteforge-logo.jpg",
    shortDesc:
      "north india's largest independent student tech community. 4,500+ members. official Hack Club partner. started because i wanted the room to exist and it didn't.",
    fullDesc: `kanpur is a huge industrial city, but when it comes to tech and building software, it felt like a complete desert. if you're a kid here who wants to code projects or build startups, there was no community. everyone is focused on studying for entrance exams or getting traditional credentials, which is fine, but it gets lonely when you just want to stay up all night building random tools.

i got tired of waiting for some school or college to build a coding scene, so i decided to build it myself.

we started byteforge as a small discord server for student builders. it grew incredibly fast. we are now north india's largest independent student tech community with over 4,500 members. we are an official Hack Club partner, we coordinate events across high schools, and we host major hackathons, like Execron 1.0 BuildFest at IIT Kanpur which brought in 290+ developers. one of the biggest hackathons the city had seen. i organized, ran, and somehow survived it.

we didn't have any budget, sponsors, or experience when we started. we just had a shared discord server and a bunch of kids who wanted to build cool things. byteforge proved to me that you don't need to live in silicon valley or bangalore to have a vibrant dev culture. you just need a place where builders feel welcome to share their creations.`,
    link: "https://byteforge.space",
    external: true,
    tag: "Community",
  },
  {
    year: "2025",
    name: "PaXus",
    icon: null,
    shortDesc:
      "a multi-venture technology company across AI, software, digital commerce, and intelligent systems. the parent of most things i build.",
    fullDesc: null,
    link: null,
    tag: "Company",
  },
  {
    year: "2024",
    name: "D2AR",
    icon: null,
    shortDesc:
      "systematic benchmark comparing 8 language models (4 diffusion, 4 auto-regressive) on Hindi NLP tasks. published research, open-source evaluation framework.",
    fullDesc: `the most comprehensive benchmark of diffusion language models for Hindi to date.

the evaluation pipeline:
  1. data preprocessing: transliteration normalization, tokenization, train/test split (80/20 stratified)
  2. zero-shot prompting: all 8 models evaluated on identical prompts across 4 Hindi NLP tasks (sentiment analysis, named entity recognition, question answering, text summarization)
  3. metric computation: BLEU, ROUGE-L, BERTScore (multilingual), perplexity
  4. statistical significance: paired t-tests + bootstrap confidence intervals
  5. qualitative error analysis: error taxonomy by task type and model architecture

models benchmarked: GPT-NeoX, OPT, BLOOM (auto-regressive) vs. Diffusion-LM, MDLM, SEDD, PLM-Discrete (diffusion-based).

key finding: diffusion models showed competitive performance on generation tasks but lagged significantly on structured NLP tasks. the architectural reason: diffusion models lack the causal attention scaffolding that auto-regressive models use for sequential reasoning, which becomes critical for morphologically rich languages like Hindi where word order and inflection carry semantic weight.`,
    link: "https://github.com/Pavitrakus/D2AR-diffusion-vs-ar-hindi-nlp",
    external: true,
    tag: "Research / NLP",
  },
  {
    year: "2024",
    name: "LumenSeed",
    icon: "/lumenseed.png",
    shortDesc:
      "medical report translator. turns clinical jargon into clear language anyone can read. won 1st at Techfest IIT Bombay SparkX.",
    fullDesc: `whenever you get a medical report back from a lab, it is written entirely in dense jargon meant for doctors. if you try to search for the terms online, you usually end up reading extreme diagnosis threads and panicking. most patients have no idea what their own health data means, which is a massive communication gap.

we built lumenseed to translate medical reports into clear, friendly language that anyone can read. it doesn't give medical advice. it just explains what the terms mean, what the normal ranges are, and what questions you should actually ask your doctor during your next visit.

the architecture:
  1. pdf ingestion: OCR fallback for scanned reports, text extraction for digital PDFs
  2. chunking: semantic boundary detection splits the report into logical sections
  3. entity linking: extracted terms are mapped to UMLS (unified medical language system) ontologies
  4. retrieval: LangChain RAG pipeline pulls reference definitions from verified medical dictionaries stored in a Weaviate vector database
  5. generation: fine-tuned LLM writes the summary with a strict tone classifier enforcing human, calming output (not robotic or alarmist)
  6. confidence scoring: each explanation gets a reliability score so patients know how trustworthy the information is

medical data is incredibly sensitive, so we designed the system to run on local-first principles wherever possible, stripping out PII (personally identifiable information) before any text gets processed by the inference layer.`,
    link: null,
    tag: "Healthcare AI",
  },
  {
    year: "2024",
    name: "ClusterOrch-Gym",
    icon: null,
    shortDesc:
      "RL benchmark for training AI agents to diagnose and fix distributed GPU training failures across massive compute clusters.",
    fullDesc: `when you're training a model across hundreds of GPUs, things break in weird ways. node failures, network partitions, NCCL timeout cascades, OOM conditions, silent gradient corruption. clusterorch-gym is a reinforcement learning environment where agents learn to detect these failures and execute recovery policies.

the environment:
  - discrete-event simulator modeling real cluster telemetry from actual training runs
  - state space: GPU utilization, memory pressure, network latency, NCCL collective timing, checkpoint freshness
  - action space: checkpoint rollback, topology reconfiguration, power capping, job migration, node isolation
  - reward function: minimize training downtime while maximizing resource utilization

agents are trained using PPO (proximal policy optimization) and evaluated on failure scenarios extracted from real-world distributed training logs. the benchmark includes 15 failure modes across 3 cluster sizes (8, 64, 256 GPUs).`,
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

              {p.fullDesc && (
                <details className="project-details">
                  <summary>read more</summary>
                  <div className="detail-body">{p.fullDesc}</div>
                </details>
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
        <Link href="/">← home</Link>
        <Link href="/v01">v01 2025</Link>
      </footer>
    </main>
  );
}
