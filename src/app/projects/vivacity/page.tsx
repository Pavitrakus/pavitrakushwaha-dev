import type { Metadata } from "next";
import Link from "next/link";
import { PostChrome } from "@/components/PostChrome";
import { SiteFooter } from "@/components/SiteFooter";
import { Favicon } from "@/components/Brand";
import { VivacitySim } from "@/components/VivacitySim";

export const metadata: Metadata = {
  title: "Vivacity",
  description:
    "Simulation infrastructure for agents that need to reason about what happens next. Pavitra Kushwaha is cofounder of Vivacity.",
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
      "simulation infrastructure for agents that need to reason about what happens next.",
    siteName: "Pavitra Kushwaha",
  },
  twitter: {
    card: "summary_large_image",
    site: "@pavikshw",
    creator: "@pavikshw",
    title: "Vivacity | Pavitra Kushwaha",
    description:
      "simulation infrastructure for agents that need to reason about what happens next.",
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
        simulation infrastructure for agents that need to reason about
        what happens next. the workbench below is an example of the loop.
        not a product api.
      </p>

      <PostChrome />

      <VivacitySim mode="full" />

      <div className="post-body">
        <p>
          a world an agent can act on. i&apos;m building vivacity with aditya
          bhatia and tanish. we work on the execution layer between an agent
          and the environments it needs to reason about.
        </p>

        <p>
          the runtime gives an agent a persistent world: inspect its state,
          apply an action, simulate forward, fork alternatives, verify
          constraints, and commit a branch. different domains can use
          different simulators behind that interface.
        </p>

        <p>
          my focus is product, pipelines, and the path from an action to a
          replayable trace. the public surface is{" "}
          <a href="https://tryvivacity.com" target="_blank" rel="noopener noreferrer">
            <Favicon domain="tryvivacity.com" alt="Vivacity" />tryvivacity.com
          </a>
          . the orbit above is an independent browser example of the same
          verbs. no production api connection.
        </p>

        <h2>the execution loop</h2>

        <p>
          a branch starts from a parent state. actions produce a trajectory.
          checks decide which outcomes can be committed.
        </p>

        <p>
          world = create(spec). state = world.observe(). branch =
          world.fork(). branch.act(action). trace =
          branch.simulate(horizon). report = branch.verify(constraints). if
          the report passes, world.commit(branch). rollback restores a
          checkpoint. render is one observation, not the world itself.
        </p>

        <p>
          that is the conceptual interface from vivacity&apos;s public
          runtime contract. this page is not claiming a live backend behind
          the canvas.
        </p>

        <h2>state, observations, and rendering</h2>

        <p>
          a world state needs enough information to continue execution. in
          the orbital example that is position and velocity under a fixed
          gravitational model. an observation reads some view of that
          state. the diagram is one such view.
        </p>

        <p>
          keeping those concerns separate lets an agent inspect quantities
          directly. a planning loop can compare energy or clearance without
          rendering a frame. rendering becomes useful when a person, or a
          vision model, needs to see the result.
        </p>

        <h2>routing an execution</h2>

        <p>
          vivacity&apos;s public architecture puts a router behind the
          runtime contract. backend families include exact physics,
          scientific solvers, robotics simulators, learned world models,
          game engines, and private domain backends. the agent sees one
          interface. the router sends each step to the engine suited to its
          domain.
        </p>

        <p>
          <strong>physics and scientific solvers.</strong> domains with
          explicit laws, numerical methods, and quantities that can be
          checked.
        </p>
        <p>
          <strong>robotics and interactive environments.</strong> contact,
          kinematics, sensors, geometry, and actions inside an environment.
        </p>
        <p>
          <strong>learned world models.</strong> predicted observations and
          transitions, with model uncertainty carried into the decision.
          those backends are a category, not a list of logos. some of
          those companies will be competitors. some might be clients.
          hwahwhahwa
        </p>
        <p>
          <strong>game engines</strong> for interactive geometry at
          interactive rates.
        </p>
        <p>
          <strong>private backends.</strong> plant models, warehouse twins,
          and proprietary solvers can stay inside the owner&apos;s network.
        </p>

        <p>
          the design question is which execution semantics a branch needs:
          what state the backend accepts, what an action means, and what
          guarantees accompany its output.
        </p>

        <h2>verification belongs in the loop</h2>

        <p>
          checks depend on the domain. this orbit uses negative specific
          energy, periapsis above 1 R, and energy drift below 1e-3. a
          warehouse would use clearance and units. a circuit would use
          conservation at a node. a fork keeps the parent available while an
          alternative is evaluated. a failed branch can be discarded or
          revised. a passing branch can become the new state. the
          consequence of each decision stays inspectable.
        </p>

        <h2>model, units, and what this page is</h2>

        <p>
          experiment 001 integrates newtonian two-body motion in 3d with
          velocity verlet. μ and the central radius R are both 1. the parent
          starts circular at 1.8 R, inclined, with speed √(μ/r). each
          branch is simulated for 20 dimensionless time units at Δt = 0.0125.
          integration stops if the body meets the surface. there is no
          drag, no third body, no production backend. act scales velocity by
          +10%. fork opens three futures: two exact impulses at ±12%, and
          one noisy learned backend. verify reports energy and periapsis.
          commit promotes the selected branch only if the checks pass. the
          learned fork is meant to fail. rollback restores the stored
          parent. reset returns the circular orbit.
        </p>

        <p>
          apply an impulse, inspect the trajectory, and compare
          counterfactuals. then{" "}
          <a href="https://tryvivacity.com" target="_blank" rel="noopener noreferrer">
            talk to the team
          </a>{" "}
          if your agent actually needs a world it can branch.
        </p>
      </div>

      <SiteFooter links={<Link href="/projects">projects</Link>} />
    </main>
  );
}
