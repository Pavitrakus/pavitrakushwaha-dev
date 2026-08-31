import type { Metadata } from "next";
import Link from "next/link";
import { PostChrome } from "@/components/PostChrome";
import { SiteFooter } from "@/components/SiteFooter";


export const metadata: Metadata = {
  title: "WhoCodedMore",
  description:
    "Who coded more? One command reads local coding-agent logs, counts lines, tokens, and water, then sends only aggregate totals to the leaderboard.",
  keywords: [
    "WhoCodedMore",
    "whocodedmore",
    "AI coding leaderboard",
    "token usage leaderboard",
    "npx whocodedmore",
    "Claude Code tokens",
    "Cursor Codex usage",
    "Pavitra Kushwaha WhoCodedMore",
    "lines of code leaderboard",
  ],
  openGraph: {
    type: "article",
    url: "https://pavitrakushwaha.dev/projects/whocodedmore",
    title: "WhoCodedMore - Who coded more? | Pavitra Kushwaha",
    description:
      "one command. real lines, tokens, and water. climb with friends while the board flexes in public. only totals leave your machine.",
    siteName: "Pavitra Kushwaha",
  },
  twitter: {
    card: "summary_large_image",
    site: "@pavikshw",
    creator: "@pavikshw",
    title: "WhoCodedMore | Pavitra Kushwaha",
    description:
      "Who coded more? npx whocodedmore. real lines, tokens, and water. only totals leave your machine.",
  },
  alternates: { canonical: "https://pavitrakushwaha.dev/projects/whocodedmore" },
};

const articleJsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "WhoCodedMore - Who coded more?",
  description:
    "one command. real lines, tokens, and water. climb with friends and watch the board flex in public.",
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
    "@id": "https://pavitrakushwaha.dev/projects/whocodedmore",
  },
  keywords: "WhoCodedMore, AI coding, tokens, leaderboard, Pavitra Kushwaha",
  inLanguage: "en-IN",
};

export default function WhoCodedMorePage() {
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
        2026 &middot; Tools / Leaderboard
      </span>

      <img
        src="/whocodedmore-logo.png"
        alt="WhoCodedMore: money burning in a glass of water"
        style={{
          display: "block",
          width: "5.4em",
          height: "auto",
          margin: "0 0 1em",
        }}
      />

      <h1 style={{ fontSize: "1.8em", marginBottom: "0.8em", lineHeight: 1.3 }}>
        WhoCodedMore
      </h1>

      <p className="muted" style={{ fontSize: "0.9em", fontStyle: "italic", marginBottom: "1.8em" }}>
        who coded more? one command. real lines, tokens, and water.
      </p>

      <PostChrome />

      <div className="post-body">
        <p>
          every AI coding team eventually asks the same stupid, un-ignorable
          question: who coded more? they mean the work that moved through the
          repository, across every agent and terminal. WhoCodedMore reads the
          local logs, counts lines alongside tokens, converts the burn into
          water, and gives the argument a public leaderboard
        </p>

        <p>
          the joke is the competition. the product is an honest meter. your
          Claude Code, Codex, Cursor, Gemini CLI, Copilot, OpenCode, Windsurf,
          Cline, and the rest of the stack each hide their own totals.
          WhoCodedMore is the screen that says: here is everything, across
          tools, in one number.
        </p>

        <h2 style={{ fontSize: "1.1em", fontWeight: 600, marginTop: "1.5em", marginBottom: "0.6em" }}>
          how it works
        </h2>

        <p>
          <strong>local scan</strong>
          <br />
          <span className="mono">npx whocodedmore@latest</span> reads usage
          logs already on the machine. Claude Code, Codex, Gemini CLI,
          OpenClaw, Cursor, Copilot, OpenCode, Windsurf, Cline, Aider, Amp,
          Continue, Goose, Kiro, Roo Code, Zed, Warp, Droid, Pi, Kimi CLI,
          Qwen CLI, Antigravity, Hermes, plus anything{" "}
          <span className="mono">ccusage</span> already tracks. zero flags
          naming tools; the scan discovers whichever logs exist
        </p>

        <p>
          <strong>lines and tokens</strong>
          <br />
          token boards are easy and a little fake. a cached prompt looks huge.
          WhoCodedMore counts real lines too, then tracks tokens, estimated
          spend, and water. the water number is the part that makes a
          leaderboard feel like a bill: glasses burned, drinking-days for one
          human, a live total that climbs when someone syncs more.
        </p>

        <p>
          <strong>sync</strong>
          <br />
          the machine sends aggregate totals. code, paths, prompts, and file
          names stay local. syncing adds those totals to the public board and
          updates the worldwide counters
        </p>

        <p>
          <strong>the board</strong>
          <br />
          public by default once you show up. a friends board if you want the
          argument in private. lines show what reached code, tokens show the
          model work around it, and water gives the compute bill a unit you can
          picture
        </p>

        <p>
          run it once. it counts, syncs, and you climb. re-run to refresh. or check who else is{" "}<Link href="/visits" className="easter-quiet" title="burn notice">burning time on this site</Link>.
        </p>

        <p style={{ marginTop: "1.5em" }}>
          <a
            href="https://whocodedmore.com"
            target="_blank"
            rel="noopener noreferrer"
            className="mono"
            style={{ fontSize: "0.82em" }}
          >
            whocodedmore.com ↗
          </a>
        </p>
      </div>

      <SiteFooter
        links={<Link href="/projects">projects</Link>}
      />
    </main>
  );
}
