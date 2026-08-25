import { Redis } from "@upstash/redis";

let redis: Redis | null = null;

export function getRedis(): Redis | null {
  const url =
    process.env.UPSTASH_REDIS_REST_URL ||
    process.env.KV_REST_API_URL;
  const token =
    process.env.UPSTASH_REDIS_REST_TOKEN ||
    process.env.KV_REST_API_TOKEN;
  if (!url || !token) return null;
  if (!redis) redis = new Redis({ url, token });
  return redis;
}

export type Visit = {
  city: string | null;
  region: string | null;
  country: string | null;
  at: string;
};

export function formatPlace(v: Pick<Visit, "city" | "region" | "country">): string {
  const city = v.city?.trim() || null;
  const region = v.region?.trim() || null;
  const country = v.country?.trim() || null;
  if (city && region) return `${city.toLowerCase()}, ${region.toLowerCase()}`;
  if (city && country) return `${city.toLowerCase()}, ${country.toLowerCase()}`;
  if (city) return city.toLowerCase();
  if (region && country) return `${region.toLowerCase()}, ${country.toLowerCase()}`;
  if (country) return country.toLowerCase();
  return "somewhere on the internet";
}

export function relativeTime(iso: string): string {
  const then = new Date(iso).getTime();
  const diff = Math.max(0, Date.now() - then);
  const sec = Math.floor(diff / 1000);
  if (sec < 45) return "just now";
  const min = Math.floor(sec / 60);
  if (min < 60) return `${min}m ago`;
  const hr = Math.floor(min / 60);
  if (hr < 24) return `${hr}h ago`;
  const day = Math.floor(hr / 24);
  if (day === 1) return "yesterday";
  if (day < 14) return `${day}d ago`;
  return new Date(iso).toLocaleDateString("en-IN", {
    month: "short",
    day: "numeric",
  });
}
