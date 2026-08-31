import type { Metadata } from "next";
import Link from "next/link";
import { PostChrome } from "@/components/PostChrome";
import { SiteFooter } from "@/components/SiteFooter";


export const metadata: Metadata = {
  title: "ORBIS 2045",
  description:
    "standalone hardware device running a locally-hosted LLM with ADB-based mobile control. Raspberry Pi 5, quantized 7B model via llama.cpp, VideoCore VII GPU offload, mesh-network API, neopixel indicators. Designed to look like it belongs in 2045.",
  keywords: [
    "ORBIS 2045",
    "hardware AI device",
    "Raspberry Pi 5 LLM",
    "local LLM hardware",
    "Pavitra Kushwaha ORBIS",
    "llama.cpp Raspberry Pi",
    "edge AI hardware",
    "ADB mobile control hardware",
    "mesh-network AI",
    "neopixel LLM indicator",
    "3D printed AI device",
    "offline LLM appliance",
  ],
  openGraph: {
    type: "article",
    url: "https://pavitrakushwaha.dev/projects/orbis-2045",
    title: "ORBIS 2045 - Hardware AI Appliance | Pavitra Kushwaha",
    description:
      "standalone hardware device running a locally-hosted LLM with ADB-based mobile control. Pi 5, quantized 7B model, mesh-network API, neopixel indicators.",
    siteName: "Pavitra Kushwaha",
  },
  twitter: {
    card: "summary_large_image",
    site: "@pavikshw",
    creator: "@pavikshw",
    title: "ORBIS 2045 | Pavitra Kushwaha",
    description:
      "standalone hardware device running a locally-hosted 7B LLM with ADB mobile control. Pi 5, llama.cpp, mesh-network, 3D-printed chassis.",
  },
  alternates: { canonical: "https://pavitrakushwaha.dev/projects/orbis-2045" },
};

const articleJsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "ORBIS 2045 - A Hardware Appliance for Local LLM Inference",
  description:
    "standalone hardware device running a locally-hosted LLM with ADB-based mobile control. Raspberry Pi 5, quantized 7B model via llama.cpp, mesh-network API.",
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
    "@id": "https://pavitrakushwaha.dev/projects/orbis-2045",
  },
  keywords: "ORBIS 2045, hardware AI, Raspberry Pi, edge inference, Pavitra Kushwaha",
  inLanguage: "en-IN",
};

export default function Orbis2045Page() {
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
        2025 &middot; Hardware / AI
      </span>

      <h1 style={{ fontSize: "1.8em", marginBottom: "0.8em", lineHeight: 1.3 }}>
        ORBIS 2045
      </h1>

      <p className="muted" style={{ fontSize: "0.9em", fontStyle: "italic", marginBottom: "1.8em" }}>
        a local language model, phone control, and a desk object built to feel
        like it arrived early from 2045
      </p>

      <PostChrome />

      <div className="post-body">
        <p>orbis 2045 is a small hardware prototype that runs a quantized language model on the desk and turns its plan into phone actions over the local network. i wanted the model, the control path, and the object itself in the same room.</p>

        <h2 style={{ fontSize: "1.1em", fontWeight: 600, marginTop: "1.5em", marginBottom: "0.6em" }}>the stack</h2>

        <p><strong>compute:</strong> a raspberry pi 5 with 8gb of memory runs a 4-bit 7b model through llama.cpp. the prompt stays short and the model returns a structured action plan, which matters more here than writing a beautiful paragraph. model and runtime can be swapped without changing the phone protocol.</p>

        <p><strong>control:</strong> the phone pairs over the local network. adb and an accessibility service expose screen state and a small set of actions: open, tap, type, swipe, back, and confirm. each action reports the resulting screen before the next node runs.</p>

        <p><strong>orchestration:</strong> the planner emits a graph with expected state, retries, and confirmation gates. the executor can stop on a screen it does not recognize and return that observation to the model. logs and screenshots stay beside the run so the weird tap from six steps ago can be found later.</p>

        <p><strong>interface:</strong> an rp2040 drives the chassis lights separately from inference. idle, listening, planning, acting, and waiting for approval each have a distinct pattern, so you can tell what the box is doing without opening a dashboard.</p>

        <h2 style={{ fontSize: "1.1em", fontWeight: 600, marginTop: "1.5em", marginBottom: "0.6em" }}>the object</h2>

        <p>the chassis is printed in matte black petg with angled faces, a hexagonal vent field, and one amber light line across the front. airflow follows the pi and fan placement instead of decorating the shell after it was printed. it looks slightly ridiculous beside a normal router, which is exactly why i kept it.</p>

        <p>Dimensions: 180mm x 120mm x 80mm. Weight: ~420g with the Pi and cooling fan. Power: 5V/3A via USB-C, consumes ~12W at peak inference load. if you&apos;re reading this from a data center city,{" "}
          <Link href="/visits" className="easter-quiet" title="2045 called">
            the trail already knows
          </Link>
          .</p>
      </div>

      <SiteFooter
        links={<Link href="/projects">projects</Link>}
      />
    </main>
  );
}
