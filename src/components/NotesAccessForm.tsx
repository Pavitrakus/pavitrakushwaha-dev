"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export function NotesAccessForm() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setBusy(true);
    setError("");
    try {
      const res = await fetch("/api/notes/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data.error || "unable to unlock");
        return;
      }
      setPassword("");
      router.refresh();
    } finally {
      setBusy(false);
    }
  };

  return (
    <form className="admin-login" onSubmit={submit}>
      <label className="admin-label" htmlFor="notes-pass">
        password
      </label>
      <input
        id="notes-pass"
        type="password"
        autoComplete="current-password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        autoFocus
      />
      {error && <p className="admin-error">{error}</p>}
      <button type="submit" disabled={busy}>
        {busy ? "checking…" : "unlock"}
      </button>
    </form>
  );
}
