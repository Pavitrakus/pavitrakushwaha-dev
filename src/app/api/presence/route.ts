import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { formatPlace, getRedis, type Visit } from "@/lib/redis";
import {
  normalizePath,
  pageViewSeed,
  SITE_VIEW_SEED,
} from "@/lib/view-seeds";

export const runtime = "nodejs";

const COOKIE_SEEN = "pk_seen";
const COOKIE_SITE = "pk_site_view";
const HOUR = 60 * 60;

function pathViewCookie(path: string) {
  let h = 0;
  for (let i = 0; i < path.length; i++) h = (h * 31 + path.charCodeAt(i)) >>> 0;
  return `pk_view_${h.toString(36)}`;
}

function readGeo(req: NextRequest): Omit<Visit, "at"> {
  const city = req.headers.get("x-vercel-ip-city");
  const region =
    req.headers.get("x-vercel-ip-country-region") ||
    req.headers.get("x-vercel-ip-region");
  const country = req.headers.get("x-vercel-ip-country");
  return {
    city: city ? decodeURIComponent(city) : null,
    region: region ? decodeURIComponent(region) : null,
    country: country ? decodeURIComponent(country) : null,
  };
}

async function ensureCounters(
  redis: NonNullable<ReturnType<typeof getRedis>>,
  path: string,
) {
  const pageKey = `page:views:${path}`;
  const [siteExists, pageExists] = await Promise.all([
    redis.exists("site:views"),
    redis.exists(pageKey),
  ]);
  const ops: Promise<unknown>[] = [];
  if (!siteExists) ops.push(redis.set("site:views", SITE_VIEW_SEED));
  if (!pageExists) ops.push(redis.set(pageKey, pageViewSeed(path)));
  if (ops.length) await Promise.all(ops);
}

export async function POST(req: NextRequest) {
  let body: { path?: string } = {};
  try {
    body = await req.json();
  } catch {
    body = {};
  }

  const path = normalizePath(body.path || "/");
  const jar = await cookies();
  const redis = getRedis();
  const geo = readGeo(req);
  const youPlace = formatPlace(geo);

  const seenAlready = jar.get(COOKIE_SEEN)?.value === "1";
  const siteViewed = jar.get(COOKIE_SITE)?.value === "1";
  const pageCookie = pathViewCookie(path);
  const pageViewed = jar.get(pageCookie)?.value === "1";

  let siteViews = SITE_VIEW_SEED;
  let pageViews = pageViewSeed(path);
  let lastVisit: Visit | null = null;
  let recordedVisit = false;
  const youAreHere = !seenAlready;

  if (redis) {
    try {
      await ensureCounters(redis, path);

      if (!siteViewed) {
        siteViews = Number(await redis.incr("site:views"));
      } else {
        siteViews = Number((await redis.get("site:views")) ?? SITE_VIEW_SEED);
      }

      if (!pageViewed) {
        pageViews = Number(await redis.incr(`page:views:${path}`));
      } else {
        pageViews = Number(
          (await redis.get(`page:views:${path}`)) ?? pageViewSeed(path),
        );
      }

      if (!seenAlready) {
        const visit: Visit = { ...geo, at: new Date().toISOString() };
        await redis.lpush("visits:recent", JSON.stringify(visit));
        await redis.ltrim("visits:recent", 0, 19);
        await redis.set("visit:last", visit);
        lastVisit = visit;
        recordedVisit = true;
      } else {
        lastVisit = (await redis.get<Visit>("visit:last")) ?? null;
      }
    } catch {
      /* fall through to seeds */
    }
  }

  const res = NextResponse.json({
    youAreHere,
    youPlace: youAreHere ? youPlace : null,
    lastVisit,
    lastPlace: lastVisit ? formatPlace(lastVisit) : null,
    siteViews,
    pageViews,
    recordedVisit,
  });

  const secure = process.env.NODE_ENV === "production";
  if (!seenAlready) {
    res.cookies.set(COOKIE_SEEN, "1", {
      httpOnly: true,
      sameSite: "lax",
      secure,
      maxAge: HOUR,
      path: "/",
    });
  }
  if (!siteViewed) {
    res.cookies.set(COOKIE_SITE, "1", {
      httpOnly: true,
      sameSite: "lax",
      secure,
      maxAge: HOUR,
      path: "/",
    });
  }
  if (!pageViewed) {
    res.cookies.set(pageCookie, "1", {
      httpOnly: true,
      sameSite: "lax",
      secure,
      maxAge: HOUR,
      path: "/",
    });
  }

  return res;
}

export async function GET(req: NextRequest) {
  const path = normalizePath(req.nextUrl.searchParams.get("path") || "/");
  const redis = getRedis();
  let siteViews = SITE_VIEW_SEED;
  let pageViews = pageViewSeed(path);
  let lastVisit: Visit | null = null;

  if (redis) {
    try {
      await ensureCounters(redis, path);
      siteViews = Number((await redis.get("site:views")) ?? SITE_VIEW_SEED);
      pageViews = Number(
        (await redis.get(`page:views:${path}`)) ?? pageViewSeed(path),
      );
      lastVisit = (await redis.get<Visit>("visit:last")) ?? null;
    } catch {
      /* seeds */
    }
  }

  return NextResponse.json({
    lastVisit,
    lastPlace: lastVisit ? formatPlace(lastVisit) : null,
    siteViews,
    pageViews,
  });
}
