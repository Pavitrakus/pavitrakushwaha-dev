"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type EssayRow = {
  slug: string;
  title: string;
  dek: string;
  published: boolean;
  updatedAt: string;
  year: string;
};

export default function AdminHome() {
  const [ready, setReady] = useState(false);
  const [authed, setAuthed] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [essays, setEssays] = useState<EssayRow[]>([]);

  const load = async () => {
    const me = await fetch("/api/admin/me", { cache: "no-store" });
    if (!me.ok) {
      setAuthed(false);
      setReady(true);
      return;
    }
    const list = await fetch("/api/admin/essays", { cache: "no-store" });
    if (list.ok) {
      const data = await list.json();
      setEssays(data.essays || []);
    }
    setAuthed(true);
    setReady(true);
  };

  useEffect(() => {
    load();
  }, []);

  const login = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError("");
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data.error || "nope");
        return;
      }
      setPassword("");
      await load();
    } finally {
      setBusy(false);
    }
  };

  const logout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    setAuthed(false);
    setEssays([]);
  };

  const remove = async (slug: string) => {
    if (!confirm("delete this piece? it's gone.")) return;
    await fetch(`/api/admin/essays/${slug}`, { method: "DELETE" });
    await load();
  };

  if (!ready) {
    return (
      <main className="admin-shell">
        <p className="muted">loading…</p>
      </main>
    );
  }

  if (!authed) {
    return (
      <main className="admin-shell">
        <h1>Admin</h1>
        <p className="muted">write from the phone. publish when it&apos;s done.</p>
        <form className="admin-login" onSubmit={login}>
          <label className="admin-label" htmlFor="admin-pass">
            password
          </label>
          <input
            id="admin-pass"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoFocus
          />
          {error && <p className="admin-error">{error}</p>}
          <button type="submit" disabled={busy}>
            {busy ? "checking…" : "enter"}
          </button>
        </form>
      </main>
    );
  }

  return (
    <main className="admin-shell">
      <div className="admin-top">
        <h1>Writing desk</h1>
        <button type="button" className="admin-text-btn" onClick={logout}>
          lock
        </button>
      </div>
      <p className="muted">new essay, or pick one up again.</p>
      <Link href="/admin/write" className="admin-primary">
        new essay
      </Link>
      <ul className="admin-list">
        {essays.length === 0 && <li className="muted">nothing here yet.</li>}
        {essays.map((e) => (
          <li key={e.slug}>
            <div>
              <Link href={`/admin/write/${e.slug}`}>{e.title}</Link>
              <span className="entry-desc">
                {e.published ? "live" : "draft"} · {e.year}
              </span>
            </div>
            <div className="admin-row-actions">
              {e.published && (
                <a href={`/blog/${e.slug}`} target="_blank" rel="noopener noreferrer">
                  view
                </a>
              )}
              <button type="button" onClick={() => remove(e.slug)}>
                delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}
