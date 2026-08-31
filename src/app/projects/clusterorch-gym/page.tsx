import type { Metadata } from "next";
import Link from "next/link";
import { PostChrome } from "@/components/PostChrome";
import { SiteFooter } from "@/components/SiteFooter";


export const metadata: Metadata = {
  title: "ClusterOrch-Gym",
  description:
    "RL benchmark for training AI agents to diagnose and fix distributed GPU training failures. 15 failure modes, 3 cluster sizes (8/64/256 GPUs). Discrete-event simulator, PPO agents. State space includes GPU utilization, memory pressure, network latency, NCCL timing, checkpoint freshness.",
  keywords: [
    "ClusterOrch-Gym",
    "distributed training RL",
    "GPU cluster management",
    "NCCL failure recovery",
    "Pavitra Kushwaha ClusterOrch",
    "RL for distributed systems",
    "PPO distributed training",
    "GPU failure detection AI",
    "cluster orchestration RL",
    "deep learning infrastructure",
    "NCCL timeout recovery",
    "distributed GPU RL benchmark",
  ],
  openGraph: {
    type: "article",
    url: "https://pavitrakushwaha.dev/projects/clusterorch-gym",
    title: "ClusterOrch-Gym - RL for Distributed GPU Training | Pavitra Kushwaha",
    description:
      "RL benchmark for training AI agents to diagnose and fix distributed GPU training failures. 15 failure modes across 8/64/256 GPU clusters. PPO agents, discrete-event simulator.",
    siteName: "Pavitra Kushwaha",
  },
  twitter: {
    card: "summary_large_image",
    site: "@pavikshw",
    creator: "@pavikshw",
    title: "ClusterOrch-Gym | Pavitra Kushwaha",
    description:
      "RL benchmark for training AI agents to diagnose and fix distributed GPU training failures across 8/64/256 GPU clusters.",
  },
  alternates: { canonical: "https://pavitrakushwaha.dev/projects/clusterorch-gym" },
};

const articleJsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "ClusterOrch-Gym - A Reinforcement Learning Benchmark for Distributed GPU Training",
  description:
    "RL benchmark for training AI agents to diagnose and fix distributed GPU training failures. 15 failure modes across 8/64/256 GPU clusters. PPO agents, discrete-event simulator.",
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
    "@id": "https://pavitrakushwaha.dev/projects/clusterorch-gym",
  },
  keywords: "ClusterOrch-Gym, RL, distributed training, GPU, PPO, Pavitra Kushwaha",
  inLanguage: "en-IN",
};

export default function ClusterorchGymPage() {
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
        2024 &middot; Research / RL
      </span>

      <h1 style={{ fontSize: "1.8em", marginBottom: "0.8em", lineHeight: 1.3 }}>
        ClusterOrch-Gym
      </h1>

      <p className="muted" style={{ fontSize: "0.9em", fontStyle: "italic", marginBottom: "1.8em" }}>
        a reinforcement learning benchmark for training AI agents to diagnose and fix distributed GPU training failures.
      </p>

      <PostChrome />

      <div className="post-body">
        <p>distributed training fails sideways. one sick gpu slows a collective, a timeout trips on another node, the job retries, and by the time someone gets paged the first useful signal is buried under the cascade. clusterorch-gym gives an agent a repeatable place to learn that sequence.</p>

        <h2 style={{ fontSize: "1.1em", fontWeight: 600, marginTop: "1.5em", marginBottom: "0.6em" }}>the environment</h2>

        <p>the core is a discrete-event simulator that lines up nccl logs, kernel events, nvidia-smi samples, network counters, and checkpoint history on one clock. fault injectors can drop a link, poison a gradient, exhaust memory, slow a rank, or surface a gpu xid while the rest of the job keeps moving.</p>

        <p>an observation is a rolling window over device utilization, memory pressure, collective latency, link health, rank progress, and checkpoint age. the window matters because an isolated timeout says very little; the order in which several weak signals arrive is usually the diagnosis.</p>

        <p>actions include isolating a node, moving work to a spare, rolling back to a checkpoint, changing collective topology, restarting a rank, or waiting for another sample. every action has a cost in lost tokens, stale work, or healthy capacity, so an agent that panics at every spike learns an expensive lesson.</p>

        <p>the reward follows useful training time, recovery latency, checkpoint loss, and false interventions. the environment keeps diagnosis and recovery separate in the trace, which makes it possible to see whether a policy understood the fault or merely found a restart button that worked.</p>

        <h2 style={{ fontSize: "1.1em", fontWeight: 600, marginTop: "1.5em", marginBottom: "0.6em" }}>training</h2>

        <p>the reference agent uses ppo with a temporal policy over the telemetry window. the causal mask limits it to signals already available at that step, and parallel simulator instances let the same fault arrive with different timing, load, and checkpoint freshness.</p>

        <p>evaluation replays held-out scenarios across single-node and multi-node layouts. the score records recovered training time, interventions, and the amount of healthy work discarded along the way.</p>

        <h2 style={{ fontSize: "1.1em", fontWeight: 600, marginTop: "1.5em", marginBottom: "0.6em" }}>failure modes</h2>

        <p>The benchmark includes 15 distinct failure modes organized into 4 categories:</p>

        <p><strong>hardware:</strong> gpu xid errors, pcie link degradation, ecc pressure, and thermal throttling.</p>

        <p><strong>network:</strong> nccl watchdog timeouts, infiniband link flaps, incast congestion, and routing failures.</p>

        <p><strong>software:</strong> cuda out-of-memory, version mismatches, stuck collectives, and checkpoint i/o hangs.</p>

        <p><strong>silent:</strong> nan injection, stragglers, and corrupted state that keeps the job alive long enough to waste more compute.</p>

        <p style={{ marginTop: "1.5em" }}>
          <a
            href="https://github.com/Pavitrakus/clusterorch-gym"
            target="_blank"
            rel="noopener noreferrer"
            className="mono"
            style={{ fontSize: "0.82em" }}
          >
            github.com/Pavitrakus/clusterorch-gym ↗
          </a>
          {" · "}
          <Link href="/visits" className="easter-quiet" title="gpu tears">
            who else is here
          </Link>
        </p>
      </div>

      <SiteFooter
        links={<Link href="/projects">projects</Link>}
      />
    </main>
  );
}
