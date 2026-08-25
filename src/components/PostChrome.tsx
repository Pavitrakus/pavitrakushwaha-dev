"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { usePresence } from "./PresenceProvider";

type Props = {
  path?: string;
};

export function PostChrome({ path }: Props) {
  const pathname = usePathname();
  const resolved = path || pathname || "/";
  const { pageViews } = usePresence();
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [note, setNote] = useState("");

  const viewsLabel =
    pageViews != null ? `${pageViews.toLocaleString("en-US")} views` : "views";

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const who = name.trim() || "someone";
    const body = [
      "hey pavitra —",
      `hi i'm ${who}.`,
      "i fucking liked this enough that i wanted to say something.",
      "",
      note.trim() || "(no extra note, just vibes)",
      "",
      "add this comment on website pls 😘",
      "",
      "— sent from pavitrakushwaha.dev",
    ].join("\n");

    const mailto = `mailto:pavitra@paxus.in?subject=${encodeURIComponent(
      `note on ${resolved}`,
    )}&body=${encodeURIComponent(body)}`;
    window.location.href = mailto;
    setOpen(false);
  };

  return (
    <div className="post-chrome">
      <div className="post-meta-row">
        <span className="mono muted">{viewsLabel}</span>
        <span className="post-meta-sep muted">·</span>
        <button
          type="button"
          className="leave-note-btn"
          onClick={() => setOpen((v) => !v)}
        >
          leave a note →
        </button>
      </div>

      {open && (
        <form className="leave-note-form" onSubmit={submit}>
          <p className="muted" style={{ fontSize: "0.88em", marginBottom: "0.7em" }}>
            no fake comment section. this opens your mail app and yells at me
            directly. as it should.
          </p>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="your name"
            required
          />
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="say the thing"
            rows={3}
            required
          />
          <button type="submit">send the note ↗</button>
        </form>
      )}
    </div>
  );
}
