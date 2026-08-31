"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { SiteFooter } from "@/components/SiteFooter";
import { usePresence } from "@/components/PresenceProvider";

type VisitRow = {
  city: string | null;
  region: string | null;
  country: string | null;
  at: string;
  place: string;
  ago: string;
};

export default function VisitsPage() {
  const { ready } = usePresence();
  const [visits, setVisits] = useState<VisitRow[]>([]);
  const [siteViews, setSiteViews] = useState<number | null>(null);
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    if (!ready) return;
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("/api/visits", { cache: "no-store" });
        if (!res.ok) throw new Error("visits");
        const data = await res.json();
        if (cancelled) return;
        setVisits(data.visits || []);
        setSiteViews(data.siteViews ?? null);
      } catch {
        if (!cancelled) setFailed(true);
      } finally {
        if (!cancelled) setLoaded(true);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [ready]);

  return (
    <main>
      <Link href="/" className="back-link">
        ← pavitra
      </Link>

      <h1>Visitor trail</h1>

      <p>
        recent humans who opened this site and got clocked. city-level only.
        if you&apos;re on this list: hi freak. if you&apos;re not, refresh once
        and commit the crime. hwahwhahwa
      </p>

      {siteViews != null && (
        <p className="mono muted" style={{ marginBottom: "1.6em" }}>
          {siteViews.toLocaleString("en-US")} total views
        </p>
      )}

      {!loaded ? (
        <p className="muted mono">loading the stalker log…</p>
      ) : failed ? (
        <p className="muted">
          the trail hiccuped. refresh once. if it stays empty, redis is
          having a moment.
        </p>
      ) : visits.length === 0 ? (
        <p className="muted">
          nobody interesting yet. or redis is still waking up. either way,
          you&apos;re early.
        </p>
      ) : (
        <ul className="entry-list" style={{ marginTop: "0.5em" }}>
          {visits.map((v, i) => (
            <li key={`${v.at}-${i}`}>
              <span className="entry-year">{v.ago}</span>
              <span className="entry-name">
                <strong style={{ fontWeight: 600 }}>{v.place}</strong>
                {v.country && (
                  <span className="entry-desc">
                    {v.country}
                    {v.region ? ` · ${v.region}` : ""}
                  </span>
                )}
              </span>
            </li>
          ))}
        </ul>
      )}

      <div className="visits-privacy">
        <h2 style={{ fontSize: "1em", fontWeight: 600, marginBottom: "0.6em" }}>
          privacy (lol)
        </h2>
        <p>
          yes u thought right. i fucking hacked ur device, stole ur location,
          and rifled through ur camera roll like a freak.
        </p>
        <p>
          just kidding you dumbass. it&apos;s ur ip. we peek, then yeet that shit.
          never stored. never logged. ur pics stay on ur phone (allegedly).
          only the city/region/country string survives. everything else can go
          fuck itself.
        </p>
        <p>
          (no but for real i stole the nasty shit from ur gallery. ur ass is on
          the map now. dw. hwahwhahwa) 😘
        </p>
        <p className="muted" style={{ fontSize: "0.88em", marginTop: "1em" }}>
          one browser = one slot for 1h.
        </p>
      </div>

      <SiteFooter
        links={
          <>
            <Link href="/blog">writing</Link>
            <Link href="/projects">projects</Link>
          </>
        }
      />
    </main>
  );
}
