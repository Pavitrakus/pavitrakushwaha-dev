import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "WhoCodedMore | Pavitra Kushwaha",
  description:
    "Who coded more? One command. Real lines, tokens, and water. npx whocodedmore reads local coding-agent logs, ranks you with friends, and never leaves your machine with anything but totals.",
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
    site: "@Pavitra_Kushwah",
    creator: "@Pavitra_Kushwah",
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

      <h1 style={{ fontSize: "1.8em", marginBottom: "0.8em", lineHeight: 1.3 }}>
        WhoCodedMore
      </h1>

      <p className="muted" style={{ fontSize: "0.9em", fontStyle: "italic", marginBottom: "1.8em" }}>
        who coded more? one command. real lines, tokens, and water.
      </p>

      <div className="post-body">
        <p>
          every AI coding team eventually asks the same stupid, un-ignorable
          question: who coded more? not who billed more, not who has the
          loudest twitter. who actually moved. WhoCodedMore is the public
          answer. one command reads the usage logs your agents already keep,
          counts real lines alongside tokens, converts the burn into water,
          and puts you on a board that flexes in public with your friends.
        </p>

        <p>
          the joke is the competition. the product is a honest meter. your
          Claude Code, Codex, Cursor, Gemini CLI, Copilot, OpenCode, Windsurf,
          Cline, and the rest of the stack each hide their own totals.
          WhoCodedMore is the screen that says: here is everything, across
          tools, in one number.
        </p>

        <h2 style={{ fontSize: "1.1em", fontWeight: 600, marginTop: "1.5em", marginBottom: "0.6em" }}>
          How it works
        </h2>

        <p>
          <strong>1. Local scan</strong>
          <br />
          <span className="mono">npx whocodedmore@latest</span> reads usage
          logs already on the machine. Claude Code, Codex, Gemini CLI,
          OpenClaw, Cursor, Copilot, OpenCode, Windsurf, Cline, Aider, Amp,
          Continue, Goose, Kiro, Roo Code, Zed, Warp, Droid, Pi, Kimi CLI,
          Qwen CLI, Antigravity, Hermes, plus anything{" "}
          <span className="mono">ccusage</span> already tracks. you do not
          pass flags naming tools. whatever you have logs for gets picked up.
        </p>

        <p>
          <strong>2. Lines, not just tokens</strong>
          <br />
          token boards are easy and a little fake. a cached prompt looks huge.
          WhoCodedMore counts real lines too, then tracks tokens, estimated
          spend, and water. the water number is the part that makes a
          leaderboard feel like a bill: glasses burned, drinking-days for one
          human, a live total that climbs when someone syncs more.
        </p>

        <p>
          <strong>3. Sync what is allowed to leave</strong>
          <br />
          only aggregates leave the machine. totals, never your code, never
          paths, never file names. that is the whole privacy model. you can
          stay local if you want. when you do sync, you land on the public
          board and can climb with friends while the worldwide counters move.
        </p>

        <p>
          <strong>4. The board</strong>
          <br />
          public by default once you show up. a friends board if you want the
          argument in private. the interesting metric is not who paid OpenAI
          the most. it is who actually coded, in the era where that question
          has three units: lines, tokens, and the water those tokens cost.
        </p>

        <p>
          run it once. it counts, syncs, and you climb. re-run to refresh.
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

      <footer>
        <span>&copy; {new Date().getFullYear()} pavitra kushwaha</span>
        <Link href="/">home</Link>
        <Link href="/projects">projects</Link>
      </footer>
    </main>
  );
}
