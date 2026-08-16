import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Bucket | Pavitra Kushwaha",
  description:
    "Bucket is an application agent that already knows your story from Claude, GPT, and your apps. It drafts every field and only starts filling when you clearly ask. Never auto-submits. For YC, grants, visas, scholarships, and the forms founders still fill by hand.",
  keywords: [
    "Bucket",
    "brokebucket",
    "application agent",
    "AI form filler",
    "YC application AI",
    "grant applications AI",
    "Pavitra Kushwaha Bucket",
    "Claude ChatGPT memory",
    "intent-gated fill engine",
  ],
  openGraph: {
    type: "article",
    url: "https://pavitrakushwaha.dev/projects/bucket",
    title: "Bucket - Say it once. We apply. | Pavitra Kushwaha",
    description:
      "application agent that already knows your story from Claude, GPT, and your apps. drafts every field. never submits without you.",
    siteName: "Pavitra Kushwaha",
  },
  twitter: {
    card: "summary_large_image",
    site: "@Pavitra_Kushwah",
    creator: "@Pavitra_Kushwah",
    title: "Bucket | Pavitra Kushwaha",
    description:
      "Say it once. We apply. Memory from Claude, GPT, and your apps. Drafts every field. You confirm.",
  },
  alternates: { canonical: "https://pavitrakushwaha.dev/projects/bucket" },
};

const articleJsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Bucket - Say it once. We apply.",
  description:
    "application agent that already knows your story from Claude, GPT, and your apps. drafts every field and only starts filling when you clearly ask.",
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
    "@id": "https://pavitrakushwaha.dev/projects/bucket",
  },
  keywords: "Bucket, application agent, AI forms, YC, grants, Pavitra Kushwaha",
  inLanguage: "en-IN",
};

export default function BucketPage() {
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
        2026 &middot; AI / Product
      </span>

      <h1 style={{ fontSize: "1.8em", marginBottom: "0.8em", lineHeight: 1.3 }}>
        Bucket
      </h1>

      <p className="muted" style={{ fontSize: "0.9em", fontStyle: "italic", marginBottom: "1.8em" }}>
        say it once. we apply. an application agent that already knows your story.
      </p>

      <div className="post-body">
        <p>
          every founder, student, and operator still loses hours to the same
          form. YC. grants. visas. scholarships. partner portals. the questions
          are slightly different each time. your story is not. Bucket is the
          agent that already has that story, from your Claude threads, ChatGPT
          chats, resume, and connected apps, and writes each field in your
          voice instead of pasting the same paragraph everywhere.
        </p>

        <p>
          it is not autofill. autofill dumps stored strings. Bucket retrieves
          the right chunks of your memory, reads what that specific program
          actually rewards, and drafts a fresh answer. talking to it is free
          and stays chat. clear language like &ldquo;fill this&rdquo; or
          &ldquo;apply to this URL&rdquo; is the only thing that wakes the fill
          engine. we never auto-submit.
        </p>

        <h2 style={{ fontSize: "1.1em", fontWeight: 600, marginTop: "1.5em", marginBottom: "0.6em" }}>
          How it works
        </h2>

        <p>
          <strong>1. Know you</strong>
          <br />
          Import past Claude and ChatGPT threads, a resume, and whatever else
          you already wrote about yourself. Connect Gmail, GitHub, Slack,
          LinkedIn. Bucket chunks and embeds this into living memory, not
          another profile quiz. founder bios, metrics, education, and the
          sentences you already shipped once all become recallable later.
        </p>

        <p>
          <strong>2. Understand the ask</strong>
          <br />
          Before writing, it reads the form the way a good editor would: tone,
          specificity, length, and the bar for a strong answer on{" "}
          <em>that</em> program. a YC application and a student visa packet do
          not want the same paragraph, even when both ask who you are.
        </p>

        <p>
          <strong>3. Retrieve, then write</strong>
          <br />
          Each field is answered from retrieved memory: onboarding, resume,
          imported chats, connected apps, and anything you teach it in product.
          answers are rewritten for that question. if memory is thin, the
          review screen flags confidence so you know where to push.
        </p>

        <p>
          <strong>4. Intent gating</strong>
          <br />
          casual questions never open a browser job. the fill engine waits for
          clear apply language. this is the difference between a chatbot that
          accidentally starts a YC app and an OS that stays quiet until you
          mean it.
        </p>

        <p>
          <strong>5. You confirm</strong>
          <br />
          every field is editable. credentials for live portal fill are
          encrypted with AES-256-GCM and only decrypted server-side for a job
          you start. drafts and review work now. the Playwright worker for live
          portal fill with a vaulted login is the next control-plane split:
          same memory, separate browser runtime. we never submit without you
          looking.
        </p>

        <h2 style={{ fontSize: "1.1em", fontWeight: 600, marginTop: "1.5em", marginBottom: "0.6em" }}>
          Who it is for
        </h2>

        <p>
          founders filing accelerator apps, grants, and investor intros.
          students on scholarships, fellowships, visa packets. operators on
          procurement and partner forms. the high-stakes paperwork people skip
          because rewriting their life for the twelfth time is how good
          opportunities die.
        </p>

        <p>
          chat, discovery, and fills burn real API cost, not a fake form quota.
          $1 is 1,000 credits. every account starts with 5,000. after 90 days
          of inactivity we purge personal memory, credentials, chats, and
          applications so stale secrets do not linger.
        </p>

        <p style={{ marginTop: "1.5em" }}>
          <a
            href="https://www.brokebucket.com"
            target="_blank"
            rel="noopener noreferrer"
            className="mono"
            style={{ fontSize: "0.82em" }}
          >
            brokebucket.com ↗
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
