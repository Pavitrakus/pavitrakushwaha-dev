import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "ORCA | Pavitra Kushwaha",
  description:
    "zero-step agentic task automation on android. text what you need on whatsapp or telegram and it happens in the background. no app downloads, no UI learning. architecture uses LLM intent parsing, DAG of UI gestures, headless android device cluster via ADB, and SCXML state machines.",
  keywords: [
    "ORCA agentic AI",
    "zero-step automation",
    "android task automation",
    "whatsapp agent",
    "telegram bot",
    "ADB automation",
    "Pavitra Kushwaha ORCA",
    "headless android automation",
    "SCXML state machine",
    "Qwen quantized LLM",
  ],
  openGraph: {
    type: "article",
    url: "https://pavitrakushwaha.dev/projects/orca",
    title: "ORCA - Zero-Step Agentic Android Automation | Pavitra Kushwaha",
    description:
      "zero-step agentic task automation on android. you text what you need on whatsapp or telegram and it happens in the background. no app downloads, no UI learning.",
    siteName: "Pavitra Kushwaha",
  },
  twitter: {
    card: "summary_large_image",
    site: "@Pavitra_Kushwah",
    creator: "@Pavitra_Kushwah",
    title: "ORCA | Pavitra Kushwaha",
    description:
      "zero-step agentic task automation on android via whatsapp/telegram. LLM intent parsing, DAG of UI gestures, headless device cluster.",
  },
  alternates: { canonical: "https://pavitrakushwaha.dev/projects/orca" },
};

const articleJsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "ORCA - Zero-Step Agentic Android Automation",
  description:
    "zero-step agentic task automation on android. text what you need on whatsapp or telegram and it happens in the background. no app downloads, no UI learning.",
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
    "@id": "https://pavitrakushwaha.dev/projects/orca",
  },
  keywords: "ORCA, agentic AI, android automation, LLM, ADB, zero-step, Pavitra Kushwaha",
  inLanguage: "en-IN",
};

export default function OrcaPage() {
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
        2025 &middot; AI / Agentic
      </span>

      <h1 style={{ fontSize: "1.8em", marginBottom: "0.8em", lineHeight: 1.3 }}>
        ORCA
      </h1>

      <p className="muted" style={{ fontSize: "0.9em", fontStyle: "italic", marginBottom: "1.8em" }}>
        zero-step agentic task automation on android. you text what you need and it happens in the background.
      </p>

      <div className="post-body">
        <p>the problem with apps is that there are way too many of them, and every single one is just another chore between wanting something done and actually having it happen. you unlock your phone, search for the app, wait for it to load, parse whatever interface they designed this week, click five buttons, and close it. orca is our attempt at killing that entire chain.</p>

        <p>you don&apos;t download an app. you don&apos;t learn a ui. you just send a normal text on whatsapp or telegram, like &ldquo;order a veg burger from the place down the street and book a cab to the office,&rdquo; and it happens in the background.</p>

        <h2 style={{ fontSize: "1.1em", fontWeight: 600, marginTop: "1.5em", marginBottom: "0.6em" }}>Architecture</h2>

        <p><strong>1. Message Ingestion</strong><br />
        WhatsApp/Telegram webhook receives the user text. The system normalizes incoming messages across both platforms into a uniform internal schema so downstream stages don&apos;t care about the source.</p>

        <p><strong>2. Intent Parsing</strong><br />
        A quantized Qwen variant extracts structured intent and entities from the raw text. For &ldquo;order a veg burger from the place down the street and book a cab to the office,&rdquo; the model produces two parallel intents: <em>food_order</em> with entities {'{cuisine: veg, item: burger}'} and <em>cab_booking</em> with destination: office. The model runs locally on a quantized 4-bit configuration so inference latency stays under 800ms.</p>

        <p><strong>3. DAG Construction</strong><br />
        Each intent maps to a directed acyclic graph of low-level UI gestures. A single intent decomposes into a sequence of taps, scrolls, text inputs, and swipe vectors with precise x/y coordinate mappings. The DAG executor handles dependency resolution: if &ldquo;open Swiggy&rdquo; and &ldquo;search for burger&rdquo; are parallelizable steps, they run concurrently on separate emulator instances.</p>

        <p><strong>4. Execution</strong><br />
        A headless Android device cluster runs each gesture sequence sequentially via ADB (Android Debug Bridge) and custom accessibility service scripts. The cluster maintains a pool of 8-16 emulator instances with pre-configured app states so cold starts are minimized. Each gesture command is wrapped in a retry loop with exponential backoff.</p>

        <p><strong>5. State Management</strong><br />
        SCXML state machines handle retry logic, failure rollback, and device health monitoring. If an emulator crashes mid-execution, the state machine snapshots the current DAG position and reassigns it to a healthy instance. The state machine transitions are logged to a central event store for debugging and analytics.</p>

        <p><strong>6. Confirmation</strong><br />
        Execution status streams back through the chat interface in real-time. The user sees &ldquo;opening swiggy...&rdquo; &rarr; &ldquo;searching for veg burger...&rdquo; &rarr; &ldquo;placing order...&rdquo; &rarr; &ldquo;done! your order is confirmed.&rdquo; Each step shows a timestamp and, where applicable, a screenshot of the completed action.</p>

        <h2 style={{ fontSize: "1.1em", fontWeight: 600, marginTop: "1.5em", marginBottom: "0.6em" }}>Why This Matters</h2>

        <p>In India, ~500 million mobile users are genuinely not going to download one more app for one specific task. They already know how to use WhatsApp. ORCA meets them exactly where they are. The interface is text. The execution is invisible. The phone becomes a service endpoint, not an app launcher.</p>

        <p style={{ marginTop: "1.5em" }}>
          <a
            href="https://orca.cfd"
            target="_blank"
            rel="noopener noreferrer"
            className="mono"
            style={{ fontSize: "0.82em" }}
          >
            orca.cfd ↗
          </a>
        </p>
      </div>

      <footer>
        <span>&copy; {new Date().getFullYear()} pavitra kushwaha</span>
        <Link href="/">home</Link>
        <Link href="/projects">projects</Link>
      </footer>
    </main>
  );
}
