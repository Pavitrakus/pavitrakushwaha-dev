"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { SiteFooter } from "@/components/SiteFooter";

type VisitRow = {
  city: string | null;
  region: string | null;
  country: string | null;
  at: string;
  place: string;
  ago: string;
};

export default function VisitsPage() {
  const [visits, setVisits] = useState<VisitRow[]>([]);
  const [siteViews, setSiteViews] = useState<number | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/visits");
        if (res.ok) {
          const data = await res.json();
          setVisits(data.visits || []);
          setSiteViews(data.siteViews ?? null);
        }
      } finally {
        setLoaded(true);
      }
    })();
  }, []);

  return (
    <main>
      <Link href="/" className="back-link">
        ← pavitra
      </Link>

      <h1>visitor trail.</h1>

      <p>
        recent humans who opened this site. city-level only. if you&apos;re on
        this list — hi. if you&apos;re not — refresh once and commit the crime.
      </p>

      {siteViews != null && (
        <p className="mono muted" style={{ marginBottom: "1.6em" }}>
          {siteViews.toLocaleString("en-US")} total views
        </p>
      )}

      {!loaded ? (
        <p className="muted mono">loading the stalker log…</p>
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
          yes u thought right. i hacked ur device and got ur location.
        </p>
        <p>
          just kidding — it&apos;s ur ip, then we hide it. never stored. only
          the city/region/country string survives.
        </p>
        <p>
          (no i really hacked it and took the fyn shit from ur gallery. dw.
          hwahwhahwha) 😘
        </p>
        <p className="muted" style={{ fontSize: "0.88em", marginTop: "1em" }}>
          one browser = one slot for 24h. refresh warriors, go touch grass.
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
