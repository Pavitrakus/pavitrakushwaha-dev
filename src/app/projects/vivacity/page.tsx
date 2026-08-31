import type { Metadata } from "next";
import Link from "next/link";
import { PostChrome } from "@/components/PostChrome";
import { SiteFooter } from "@/components/SiteFooter";
import { Favicon } from "@/components/Brand";
import { VivacitySim } from "@/components/VivacitySim";

export const metadata: Metadata = {
  title: "Vivacity",
  description:
    "Vivacity is a simulation runtime for AI agents. create, observe, act, simulate, fork, verify, commit. Pavitra Kushwaha is cofounder and CPO.",
  keywords: [
    "Vivacity",
    "simulation runtime",
    "AI agents",
    "world model router",
    "Pavitra Kushwaha",
    "tryvivacity",
    "fork verify commit",
  ],
  openGraph: {
    type: "article",
    url: "https://pavitrakushwaha.dev/projects/vivacity",
    title: "Vivacity | Pavitra Kushwaha",
    description:
      "simulation runtime for AI agents. create, observe, act, fork, verify, commit.",
    siteName: "Pavitra Kushwaha",
  },
  twitter: {
    card: "summary_large_image",
    site: "@pavikshw",
    creator: "@pavikshw",
    title: "Vivacity | Pavitra Kushwaha",
    description:
      "simulation runtime for AI agents. create, observe, act, fork, verify, commit.",
  },
  alternates: { canonical: "https://pavitrakushwaha.dev/projects/vivacity" },
};

const articleJsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Vivacity, simulation runtime for AI agents",
  author: {
    "@type": "Person",
    name: "Pavitra Kushwaha",
    url: "https://pavitrakushwaha.dev",
  },
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id": "https://pavitrakushwaha.dev/projects/vivacity",
  },
};

export default function VivacityPage() {
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
        2026 &middot; Runtime / Agents
      </span>

      <h1 style={{ fontSize: "1.8em", marginBottom: "0.8em", lineHeight: 1.3 }}>
        Vivacity
      </h1>

      <p className="muted" style={{ fontSize: "0.9em", fontStyle: "italic", marginBottom: "1.8em" }}>
        simulation runtime for ai agents. i&apos;m cofounder and cpo, working
        on product and pipelines
      </p>

      <PostChrome />

      <VivacitySim mode="full" />

      <div className="post-body">
        <p>
          an agent planning through a physical or simulated system needs a
          world that keeps existing between calls. vivacity compiles a spec
          into persistent state, accepts actions against that state, opens
          addressable branches, and runs checks before one branch becomes the
          live world. a rendered frame is one observation from that world
        </p>

        <p>
          i run product and pipelines with aditya on systems and tanish on
          research. our public surface is{" "}
          <a href="https://tryvivacity.com" target="_blank" rel="noopener noreferrer">
            <Favicon domain="tryvivacity.com" alt="Vivacity" />
            tryvivacity.com
          </a>
          .
        </p>

        <h2 style={{ fontSize: "1.1em", fontWeight: 600, marginTop: "1.5em", marginBottom: "0.6em" }}>
          the contract
        </h2>

        <p>
          world = create(spec). O_t = observe(view?). S_t+1 = act(A_t).
          trace = simulate(horizon). branch = fork(). report =
          verify(constraints). commit promotes a branch, rollback restores a
          checkpoint, render produces an observation, and route chooses the
          backend for the step
        </p>

        <p>
          observe can return arrays, telemetry, contact state, or a camera
          view. a visual branch might use{" "}
          <a href="https://deepmind.google" target="_blank" rel="noopener noreferrer">
            <Favicon domain="deepmind.google" alt="DeepMind" />
            Genie
          </a>
          ,{" "}
          <a href="https://www.nvidia.com/" target="_blank" rel="noopener noreferrer">
            <Favicon domain="nvidia.com" alt="NVIDIA" />
            Cosmos
          </a>
          , World Labs, or Decart when the scene carries more useful signal
          than a closed-form model. the result still lands in a domain schema
          with checks for conservation, clearance, units, or contact. failed
          branches stay isolated from the parent
        </p>

        <h2 style={{ fontSize: "1.1em", fontWeight: 600, marginTop: "1.5em", marginBottom: "0.6em" }}>
          the router
        </h2>

        <p>
          the agent sees one interface while the router sends each step to the
          engine suited to its domain. an orbit can stay in exact physics,
          contact can move to a robotics simulator, and chemistry can reach a
          solver with the right units:
        </p>

        <p>
          <strong>exact physics</strong> for orbits, rigid bodies, circuits,
          anything with a conserved quantity.
        </p>
        <p>
          <strong>scientific solvers</strong> that already exist. chemistry,
          fluids, materials, finite elements.
        </p>
        <p>
          <strong>robotics sims</strong>. contact, kinematics, sensors.{" "}
          <a href="https://developer.nvidia.com/isaac" target="_blank" rel="noopener noreferrer">
            <Favicon domain="nvidia.com" alt="NVIDIA" />
            Isaac
          </a>
          , MuJoCo, that whole shelf.
        </p>
        <p>
          <strong>world models</strong> when the scene is visual and the law is
          incomplete. genie, cosmos, world labs, decart.
        </p>
        <p>
          <strong>game engines</strong> for interactive geometry at interactive
          rates.
        </p>
        <p>
          <strong>private backends</strong>. plant models, warehouse twins,
          and proprietary solvers can stay inside the owner&apos;s network.
        </p>

        <h2 style={{ fontSize: "1.1em", fontWeight: 600, marginTop: "1.5em", marginBottom: "0.6em" }}>
          pipelines (my side)
        </h2>

        <p>
          my side begins where a clean verb meets an ugly production trace.
          a spec becomes a domain schema, the schema creates state, actions
          produce transitions, and every transition needs enough metadata to
          replay at 3am when energy drift shows up three branches later
        </p>

        <p>
          state and observation travel separately. the renderer reads the
          world through a view, while the world keeps the values used by the
          solver and verifier. that boundary lets an agent reason across text,
          arrays, and pixels without changing the underlying branch by looking
          at it
        </p>

        <p>
          the domain schemas and state primitives are prototypes today.
          broader routing, branching, and verification across arbitrary
          backends are still being built. design partners help us decide which
          adapter deserves to become real next
        </p>

        <h2 style={{ fontSize: "1.1em", fontWeight: 600, marginTop: "1.5em", marginBottom: "0.6em" }}>
          what the sim on this page is doing
        </h2>

        <p>
          this is a two-body world integrated with velocity verlet at μ = 1.
          play steps the horizon, observe stores S_t, and act applies a
          tangential Δv that changes eccentricity. fork clones the current
          state into five addressable futures. verify measures specific-energy
          drift from the snapshot, commit promotes the lowest-drift branch,
          and rollback restores the checkpoint
        </p>

        <p>
          play with it. then{" "}
          <a href="https://tryvivacity.com" target="_blank" rel="noopener noreferrer">
            book a demo
          </a>{" "}
          if your agent actually needs a world it can branch.
        </p>
      </div>

      <SiteFooter links={<Link href="/projects">projects</Link>} />
    </main>
  );
}
