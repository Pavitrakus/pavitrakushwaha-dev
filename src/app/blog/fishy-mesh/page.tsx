"use client";

import { useState } from "react";
import Link from "next/link";
import { PostChrome } from "@/components/PostChrome";
import { SiteFooter } from "@/components/SiteFooter";

export default function FishyMeshPage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      window.location.href = `mailto:pavitra@paxus.in?subject=Notify me when Fishy Mesh is ready&body=hey pavitra, let me know when fishy mesh is done. my email: ${email}`;
      setSent(true);
    }
  };

  return (
    <main>
      <Link href="/blog" className="back-link">
        ← writing
      </Link>

      <span
        className="mono muted"
        style={{ display: "block", marginBottom: "0.6em" }}
      >
        2025
      </span>

      <h1 style={{ fontSize: "1.8em", marginBottom: "0.8em", lineHeight: 1.3 }}>
        Fishy Mesh
      </h1>

      <p className="muted" style={{ fontSize: "0.9em", fontStyle: "italic" }}>
        was tired when i started writing this. will finish it soon. some things
        take longer to become a sentence than they do to become a thought.
      </p>

      <PostChrome path="/blog/fishy-mesh" />

      <p className="easter-aside muted">
        unfinished on purpose. or because i got distracted hacking your{" "}
        <Link href="/visits" title="gallery. allegedly.">location again</Link>.
        same difference.
      </p>

      <hr />

      <div
        style={{
          marginTop: "2em",
          paddingTop: "2em",
          borderTop: "1px solid #eee",
        }}
      >
        <p style={{ marginBottom: "0.5em" }}>
          get notified when it&apos;s done:
        </p>
        {sent ? (
          <p className="muted" style={{ fontSize: "0.82em" }}>
            on the list. will ping you :)
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="notify-form">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your email"
              required
            />
            <button type="submit">notify me</button>
          </form>
        )}
      </div>

      <SiteFooter
        links={<Link href="/blog">writing</Link>}
      />
    </main>
  );
}
