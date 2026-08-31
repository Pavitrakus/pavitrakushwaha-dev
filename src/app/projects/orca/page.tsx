import type { Metadata } from "next";
import Link from "next/link";
import { PostChrome } from "@/components/PostChrome";
import { SiteFooter } from "@/components/SiteFooter";


export const metadata: Metadata = {
  title: "ORCA",
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
    site: "@pavikshw",
    creator: "@pavikshw",
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

      <PostChrome />

      <div className="post-body">
        <p>phones are full of tiny chores. unlock, find the app, wait, read whatever interface changed this week, tap through it, close. orca starts with the sentence you were going to say anyway and carries the task across the phone from there.</p>

        <p>send a normal message on whatsapp or telegram, like &ldquo;order a veg burger from the place down the street and book a cab to the office.&rdquo; orca turns that into two jobs, maps each one to phone actions, and reports progress in the same chat.</p>

        <h2 style={{ fontSize: "1.1em", fontWeight: 600, marginTop: "1.5em", marginBottom: "0.6em" }}>how it moves</h2>

        <p>the webhook normalizes messages from both chat platforms into one request shape. intent parsing extracts the task, entities, account context, and any approval boundary. a request with food and travel becomes a small graph with two branches and an explicit dependency wherever one result feeds the other.</p>

        <p>each graph node describes an app action and the screen state expected before it runs. the android executor uses adb and accessibility hooks to open apps, type, tap, swipe, and read enough of the current screen to know whether the action landed. retries belong to the node, so one ugly loading screen does not restart the whole task.</p>

        <p>the run carries checkpoints, screenshots, and a compact event log. if a device drops halfway through, the scheduler can pick up from the last clean node. actions that spend money or send something irreversible stop for confirmation in chat, then the graph continues with the receipt or booking id attached.</p>

        <p>the useful interface is the progress stream: opening swiggy, finding the item, waiting for approval, booking the cab, done. the phone can stay on the desk while the chat keeps enough context for you to interrupt or correct the run.</p>

        <p>whatsapp already carries half of daily life in india. orca makes that chat a control surface for the apps underneath it, which is much closer to how people ask for help in the first place.{" "}<Link href="/visits" className="easter-quiet" title="yes, including you">also i know which city you opened this from</Link>.</p>

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

      <SiteFooter
        links={<Link href="/projects">projects</Link>}
      />
    </main>
  );
}
