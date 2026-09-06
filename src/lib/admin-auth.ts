import { createHmac, scryptSync, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { getRedis } from "@/lib/redis";

export const ADMIN_COOKIE = "pk_admin";
const SESSION_DAYS = 14;
const FAIL_WINDOW_SEC = 15 * 60;
const FAIL_MAX = 8;

function password(): string {
  return process.env.ADMIN_PASSWORD || "";
}

function secret(): string {
  return process.env.ADMIN_SESSION_SECRET || "";
}

function asBuf(hex: Buffer, other: Buffer): boolean {
  if (hex.length !== other.length) {
    timingSafeEqual(other, other);
    return false;
  }
  return timingSafeEqual(hex, other);
}

export function adminConfigured(): boolean {
  return Boolean(password() && secret());
}

export function verifyPassword(input: string): boolean {
  const expected = password();
  const pepper = secret();
  if (!expected || !pepper || !input) return false;
  const a = scryptSync(input, pepper, 32);
  const b = scryptSync(expected, pepper, 32);
  return asBuf(a, b);
}

export function signSession(): string {
  const exp = Date.now() + SESSION_DAYS * 24 * 60 * 60 * 1000;
  const body = Buffer.from(JSON.stringify({ v: 1, exp })).toString("base64url");
  const sig = createHmac("sha256", secret()).update(body).digest("base64url");
  return `${body}.${sig}`;
}

export function sessionValid(token: string | undefined | null): boolean {
  if (!token || !secret()) return false;
  const dot = token.lastIndexOf(".");
  if (dot < 1) return false;
  const body = token.slice(0, dot);
  const sig = token.slice(dot + 1);
  const expect = createHmac("sha256", secret()).update(body).digest("base64url");
  const ok = asBuf(Buffer.from(sig), Buffer.from(expect));
  if (!ok) return false;
  try {
    const data = JSON.parse(Buffer.from(body, "base64url").toString("utf8")) as {
      v?: number;
      exp?: number;
    };
    return data.v === 1 && typeof data.exp === "number" && data.exp > Date.now();
  } catch {
    return false;
  }
}

export function clientIp(req: NextRequest): string {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]?.trim() || "unknown";
  return req.headers.get("x-real-ip") || req.headers.get("x-vercel-forwarded-for") || "unknown";
}

export async function loginAllowed(ip: string): Promise<{ ok: true } | { ok: false; wait: number }> {
  const redis = getRedis();
  if (!redis) return { ok: false, wait: FAIL_WINDOW_SEC };
  const key = `admin:fail:${ip}`;
  const n = Number((await redis.get(key)) ?? 0);
  if (n >= FAIL_MAX) {
    const ttl = await redis.ttl(key);
    return { ok: false, wait: Math.max(ttl, 1) };
  }
  return { ok: true };
}

export async function recordLoginFail(ip: string): Promise<void> {
  const redis = getRedis();
  if (!redis) return;
  const key = `admin:fail:${ip}`;
  const n = await redis.incr(key);
  if (n === 1) await redis.expire(key, FAIL_WINDOW_SEC);
}

export async function clearLoginFails(ip: string): Promise<void> {
  const redis = getRedis();
  if (!redis) return;
  await redis.del(`admin:fail:${ip}`);
}

export function attachSession(res: NextResponse, token: string): void {
  res.cookies.set(ADMIN_COOKIE, token, {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: SESSION_DAYS * 24 * 60 * 60,
  });
}

export function clearSession(res: NextResponse): void {
  res.cookies.set(ADMIN_COOKIE, "", {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 0,
  });
}

export async function hasAdminSession(): Promise<boolean> {
  const jar = await cookies();
  return sessionValid(jar.get(ADMIN_COOKIE)?.value);
}

export function requestHasAdminSession(req: NextRequest): boolean {
  return sessionValid(req.cookies.get(ADMIN_COOKIE)?.value);
}
