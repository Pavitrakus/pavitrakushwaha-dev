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
        simulation runtime for AI agents. i&apos;m cofounder and cpo. the
        pixels are an observation.
      </p>

      <PostChrome />

      <VivacitySim mode="full" />

      <div className="post-body">
        <p>
          an agent that plans in the real world needs a place that stays true
          while it thinks. vivacity is that place. you compile a spec into a
          live world, you read state, you apply an action, you step a horizon,
          you open branches, you run numerical checks, you promote the one
          that passed. rendering is optional and it is never the source of
          truth.
        </p>

        <p>
          i run product and the pipelines with aditya (systems) and tanish
          (research). the public surface is{" "}
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
          verify(constraints). then commit or rollback. render is a camera,
          route picks the engine that is allowed to be wrong for that step.
        </p>

        <p>
          observe returns state, or a view of it. a plausible frame from{" "}
          <a href="https://deepmind.google" target="_blank" rel="noopener noreferrer">
            <Favicon domain="deepmind.google" alt="DeepMind" />
            Genie
          </a>
          ,{" "}
          <a href="https://www.nvidia.com/" target="_blank" rel="noopener noreferrer">
            <Favicon domain="nvidia.com" alt="NVIDIA" />
            Cosmos
          </a>
          , World Labs, Decart is useful when the law is unknown. it still
          has to land in a schema the rest of the stack can check. conservation,
          clearance, units, contact. if verify fails the branch is dead and
          the parent is untouched.
        </p>

        <h2 style={{ fontSize: "1.1em", fontWeight: 600, marginTop: "1.5em", marginBottom: "0.6em" }}>
          the router
        </h2>

        <p>
          one interface, the right backend for the step. a navigation agent
          waiting on a video model is a tax. a materials agent treating a game
          engine like chemistry is a lie. the runtime stays still and the work
          moves:
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
          fog. genie, cosmos, world labs, decart.
        </p>
        <p>
          <strong>game engines</strong> for interactive geometry at interactive
          rates.
        </p>
        <p>
          <strong>private backends</strong>. the plant model, the warehouse,
          the solver you will never put on the internet.
        </p>

        <h2 style={{ fontSize: "1.1em", fontWeight: 600, marginTop: "1.5em", marginBottom: "0.6em" }}>
          pipelines (my side)
        </h2>

        <p>
          a verb is cheap. a verb that survives production is a pipeline.
          spec in, domain schema, live world, traces out, traces that a
          downstream agent can read without hallucinating units. i care about
          the path from act() to a log you can replay at 3am when the fork
          that looked pretty failed verify by 0.4 on energy.
        </p>

        <p>
          we keep state and observation in different rooms on purpose. if you
          let the renderer write the world, the agent starts planning against
          a clip. labs that have burned a week on that already know the smell.
        </p>

        <h2 style={{ fontSize: "1.1em", fontWeight: 600, marginTop: "1.5em", marginBottom: "0.6em" }}>
          what the sim on this page is doing
        </h2>

        <p>
          toy two-body, velocity verlet, μ = 1. play steps the horizon.
          observe stores S_t. act kicks a tangential Δv so eccentricity
          moves. fork clones the orbit into addressable ghosts (max 5).
          verify checks energy against the last snapshot. rollback restores
          the parent and kills the ghosts. a postcard of the contract. the
          real router has more teeth.
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
