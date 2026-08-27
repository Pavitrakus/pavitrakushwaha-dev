import type { Metadata } from "next";
import Link from "next/link";
import { PostChrome } from "@/components/PostChrome";
import { SiteFooter } from "@/components/SiteFooter";


export const metadata: Metadata = {
  title: "ORBIS 2045 | Pavitra Kushwaha",
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
        a purpose-built hardware device that runs a local large language model and controls your phone, all without any cloud dependency.
      </p>

      <PostChrome />

      <div className="post-body">
        <p>ORBIS 2045 is a standalone hardware appliance that runs a local LLM and controls your phone, entirely offline. No cloud dependency, no API subscriptions, no data leaving your desk. It sits on your desk as a physical statement that intelligence doesn&apos;t need a data center.</p>

        <h2 style={{ fontSize: "1.1em", fontWeight: 600, marginTop: "1.5em", marginBottom: "0.6em" }}>The Stack</h2>

        <p><strong>Compute</strong><br />
        Raspberry Pi 5 (8GB) running a quantized 7B-parameter model via llama.cpp with GPU offload to the VideoCore VII. The 4-bit quantized model achieves ~12 tokens/second on the Pi 5. not fast enough for real-time conversation but perfectly adequate for task-level inference where latency tolerance is 2-5 seconds. The VideoCore VII offloads approximately 40% of matrix operations, reducing CPU-bound inference time by 35% compared to CPU-only.</p>

        <p><strong>Networking</strong><br />
        Mesh-network API for peer-to-peer inference routing. Multiple ORBIS units can form a self-healing mesh using Wi-Fi Direct and BLE neighbor discovery. When a device&apos;s local model is insufficient for a complex query, the request is routed to a peer with capacity, and the response is routed back. No external API keys required at any layer. the entire network is air-gapped from the public internet.</p>

        <p><strong>Mobile Control</strong><br />
        ADB over Wi-Fi with a custom accessibility service that maps natural language commands to UI automations. The phone connects to the ORBIS over the local network, and the device issues ADB commands just like ORCA&apos;s execution layer, but entirely locally. The accessibility service runs as a persistent foreground app that reports screen state back to ORBIS for context-aware automation.</p>

        <p><strong>Interface</strong><br />
        Neopixel LED strips embedded in the chassis pulse based on inference load. Blue means idle. Amber means chain-of-thought reasoning in progress. Red means heavy batch processing. The LEDs are driven by a small microcontroller (RP2040) that monitors the Pi&apos;s CPU/GPU utilization via I2C, ensuring the light patterns are responsive even when the main CPU is saturated.</p>

        <h2 style={{ fontSize: "1.1em", fontWeight: 600, marginTop: "1.5em", marginBottom: "0.6em" }}>Industrial Design</h2>

        <p>The chassis is 3D-printed with a matte black PETG finish and angled geometry that looks like it was pulled from a sci-fi prop department. The ventilation grilles are designed as parametric hexagonal lattices optimized for passive airflow. The front panel has a single amber LED strip that doubles as a status indicator and ambient light. It is a statement device. It sits on your desk and reminds you that intelligence doesn&apos;t need a data center.</p>

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
