/** Stable seeded bases. Look lived-in from day one. Real unique views INCR on top. */

export const SITE_VIEW_SEED = 1847;

/** Deterministic-ish hundreds per path so counts don't jump on redeploy. */
const PAGE_SEEDS: Record<string, number> = {
  "/blog/bangalore-trip": 612,
  "/blog/fishy-mesh": 241,
  "/projects/vivacity": 640,
  "/work": 390,
  "/blog/notes": 228,
  "/blog/notes/the-jacket-one": 194,
  "/blog/notes/forked-before-breakfast": 211,
  "/projects/orca": 538,
  "/projects/bucket": 417,
  "/projects/whocodedmore": 489,
  "/projects/orbis-2045": 326,
  "/projects/byteforge": 455,
  "/projects/d2ar": 298,
  "/projects/lumenseed": 371,
  "/projects/clusterorch-gym": 267,
};

export function pageViewSeed(path: string): number {
  const normalized = path.replace(/\/$/, "") || "/";
  if (PAGE_SEEDS[normalized] != null) return PAGE_SEEDS[normalized];
  // stable hash -> 180-780
  let h = 0;
  for (let i = 0; i < normalized.length; i++) {
    h = (h * 31 + normalized.charCodeAt(i)) >>> 0;
  }
  return 180 + (h % 601);
}

export function normalizePath(path: string): string {
  try {
    if (path.startsWith("http")) {
      path = new URL(path).pathname;
    }
  } catch {
    /* ignore */
  }
  const p = path.split("?")[0].split("#")[0] || "/";
  return p.replace(/\/$/, "") || "/";
}
