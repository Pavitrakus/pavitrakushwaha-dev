import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "ClusterOrch-Gym | Pavitra Kushwaha",
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
    site: "@Pavitra_Kushwah",
    creator: "@Pavitra_Kushwah",
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

      <div className="post-body">
        <p>When you&apos;re training a model across hundreds of GPUs, things break in weird ways. Node failures, network partitions, NCCL timeout cascades, OOM conditions, silent gradient corruption. ClusterOrch-Gym is a reinforcement learning environment where agents learn to detect these failures and execute recovery policies &mdash; autonomously, at machine speed, without waiting for a human operator to page in.</p>

        <h2 style={{ fontSize: "1.1em", fontWeight: 600, marginTop: "1.5em", marginBottom: "0.6em" }}>The Environment</h2>

        <p><strong>Discrete-Event Simulator</strong><br />
        Models real cluster telemetry from actual distributed training runs. The simulator ingests raw NCCL logs, dmesg outputs, GPU metrics from nvidia-smi, and network telemetry from infiniband counters. Event timestamps are drawn from empirical distributions so the failure arrival patterns statistically match production clusters.</p>

        <p><strong>State Space</strong><br />
        GPU utilization per device, memory pressure (allocated vs. reserved vs. free), network latency between node pairs, NCCL collective timing (all-reduce, all-gather, reduce-scatter completion times), and checkpoint freshness (seconds since last successful checkpoint). The full observation vector is 847-dimensional for a 256-GPU cluster.</p>

        <p><strong>Action Space</strong><br />
        Checkpoint rollback to last known good state, topology reconfiguration (ring vs. tree vs. hierarchical all-reduce), power capping of thermal-throttled nodes, job migration to a reserved spare pool, and node isolation for suspected hardware faults. The action space is structured as a hierarchical policy: high-level actions select a recovery strategy, low-level actions parameterize it (e.g., which checkpoint to roll back to).</p>

        <p><strong>Reward Function</strong><br />
        Minimize training downtime while maximizing resource utilization. The reward is a weighted combination: negative time spent in degraded state, positive tokens/second processed, negative penalty for unnecessary preemption (false positives), and a sparsity bonus for correctly diagnosing intermittent faults on the first attempt. Weights are tuned via inverse reinforcement learning from operator logs.</p>

        <h2 style={{ fontSize: "1.1em", fontWeight: 600, marginTop: "1.5em", marginBottom: "0.6em" }}>Training</h2>

        <p>Agents are trained using PPO (Proximal Policy Optimization) with a Transformer-based policy network that processes the temporal structure of telemetry data. The policy network uses a causal attention mask so it can only condition on past observations, mirroring the real-time constraints of the deployment environment. Training runs on a separate GPU cluster (4x A100s) with 32 parallel environment instances, achieving ~2M environment steps per hour.</p>

        <p>Agents are evaluated on failure scenarios extracted from real-world distributed training logs across three cluster sizes: 8 GPUs (single-node), 64 GPUs (multi-node), and 256 GPUs (cluster scale).</p>

        <h2 style={{ fontSize: "1.1em", fontWeight: 600, marginTop: "1.5em", marginBottom: "0.6em" }}>Failure Modes</h2>

        <p>The benchmark includes 15 distinct failure modes organized into 4 categories:</p>

        <p><strong>Hardware</strong> &mdash; GPU XID errors, PCIe link degradation, ECC memory errors exceeding threshold, fan failure causing thermal throttling.</p>

        <p><strong>Network</strong> &mdash; NCCL watchdog timeout, infiniband link flap, TCP incast congestion, ARP table exhaustion on top-of-rack switches.</p>

        <p><strong>Software</strong> &mdash; CUDA out-of-memory, NCCL version mismatch across nodes, deadlocked all-reduce due to topology mismatch, checkpoint I/O hang on NFS.</p>

        <p><strong>Silent</strong> &mdash; Gradient corruption (NaN injection with no error signal), straggler node slowing collective ops without failing, silent data corruption from ECC-disabled memory.</p>

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
