import { NextResponse } from "next/server";
import { formatPlace, getRedis, relativeTime, type Visit } from "@/lib/redis";
import { SITE_VIEW_SEED } from "@/lib/view-seeds";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const revalidate = 0;

function parseVisit(raw: unknown): Visit | null {
  if (!raw) return null;
  if (typeof raw === "string") {
    try {
      return JSON.parse(raw) as Visit;
    } catch {
      return null;
    }
  }
  if (typeof raw === "object") return raw as Visit;
  return null;
}

export async function GET() {
  const redis = getRedis();
  let siteViews = SITE_VIEW_SEED;
  let visits: Array<Visit & { place: string; ago: string }> = [];

  if (redis) {
    try {
      const siteExists = await redis.exists("site:views");
      if (!siteExists) await redis.set("site:views", SITE_VIEW_SEED);
      siteViews = Number((await redis.get("site:views")) ?? SITE_VIEW_SEED);
      const raw = await redis.lrange<unknown>("visits:recent", 0, 19);
      visits = (raw || [])
        .map(parseVisit)
        .filter((v): v is Visit => !!v && !!v.at)
        .map((v) => ({
          ...v,
          place: formatPlace(v),
          ago: relativeTime(v.at),
        }));
    } catch {
      /* empty */
    }
  }

  return NextResponse.json({ siteViews, visits });
}
