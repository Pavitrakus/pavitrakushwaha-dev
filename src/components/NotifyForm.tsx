"use client";

import { useState } from "react";

export function NotifyForm() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      window.location.href = `mailto:pavitra@paxus.in?subject=Notify me when you write&body=hey pavitra, ping me when you drop something new. my email: ${email}`;
      setSent(true);
    }
  };

  if (sent) {
    return (
      <p className="muted" style={{ fontSize: "0.82em" }}>
        you&apos;re on the list. i&apos;ll reach out when something&apos;s ready :)
      </p>
    );
  }

  return (
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
  );
}
