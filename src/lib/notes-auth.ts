import { createHmac, scryptSync, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { getRedis } from "@/lib/redis";

export const NOTES_COOKIE = "pk_notes";
const SESSION_DAYS = 14;
const FAIL_WINDOW_SEC = 15 * 60;
const FAIL_MAX = 8;

function password(): string {
  return process.env.NOTES_PASSWORD || "";
}

function secret(): string {
  return process.env.NOTES_SESSION_SECRET || "";
}

function asBuf(a: Buffer, b: Buffer): boolean {
  if (a.length !== b.length) {
    timingSafeEqual(a, a);
    return false;
  }
  return timingSafeEqual(a, b);
}

export function notesConfigured(): boolean {
  return Boolean(password() && secret());
}

export function verifyNotesPassword(input: string): boolean {
  const expected = password();
  const pepper = secret();
  if (!expected || !pepper || !input) return false;
  const a = scryptSync(input, pepper, 32);
  const b = scryptSync(expected, pepper, 32);
  return asBuf(a, b);
}

export function signNotesSession(): string {
  const exp = Date.now() + SESSION_DAYS * 24 * 60 * 60 * 1000;
  const body = Buffer.from(JSON.stringify({ v: 1, exp })).toString("base64url");
  const sig = createHmac("sha256", secret()).update(body).digest("base64url");
  return `${body}.${sig}`;
}

function sessionValid(token: string | undefined | null): boolean {
  if (!token || !secret()) return false;
  const dot = token.lastIndexOf(".");
  if (dot < 1) return false;
  const body = token.slice(0, dot);
  const sig = token.slice(dot + 1);
  const expected = createHmac("sha256", secret()).update(body).digest("base64url");
  if (!asBuf(Buffer.from(sig), Buffer.from(expected))) return false;
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

function clientIp(req: NextRequest): string {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]?.trim() || "unknown";
  return req.headers.get("x-real-ip") || req.headers.get("x-vercel-forwarded-for") || "unknown";
}

export async function notesLoginAllowed(req: NextRequest): Promise<{ ok: true } | { ok: false; wait: number }> {
  const redis = getRedis();
  if (!redis) return { ok: true };
  const key = `notes:fail:${clientIp(req)}`;
  const n = Number((await redis.get(key)) ?? 0);
  if (n >= FAIL_MAX) {
    const ttl = await redis.ttl(key);
    return { ok: false, wait: Math.max(ttl, 1) };
  }
  return { ok: true };
}

export async function recordNotesLoginFail(req: NextRequest): Promise<void> {
  const redis = getRedis();
  if (!redis) return;
  const key = `notes:fail:${clientIp(req)}`;
  const n = await redis.incr(key);
  if (n === 1) await redis.expire(key, FAIL_WINDOW_SEC);
}

export async function clearNotesLoginFails(req: NextRequest): Promise<void> {
  const redis = getRedis();
  if (!redis) return;
  await redis.del(`notes:fail:${clientIp(req)}`);
}

export function attachNotesSession(res: NextResponse, token: string): void {
  res.cookies.set(NOTES_COOKIE, token, {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: SESSION_DAYS * 24 * 60 * 60,
  });
}

export function clearNotesSession(res: NextResponse): void {
  res.cookies.set(NOTES_COOKIE, "", {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 0,
  });
}

export async function hasNotesSession(): Promise<boolean> {
  const jar = await cookies();
  return sessionValid(jar.get(NOTES_COOKIE)?.value);
}
