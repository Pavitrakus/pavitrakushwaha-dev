import { NextRequest, NextResponse } from "next/server";
import {
  adminConfigured,
  attachSession,
  clearLoginFails,
  clientIp,
  loginAllowed,
  recordLoginFail,
  signSession,
  verifyPassword,
} from "@/lib/admin-auth";
import { getRedis } from "@/lib/redis";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  if (!adminConfigured() || !getRedis()) {
    return NextResponse.json({ error: "admin is not configured" }, { status: 503 });
  }

  const ip = clientIp(req);
  const gate = await loginAllowed(ip);
  if (!gate.ok) {
    return NextResponse.json(
      { error: "too many tries. wait a bit." },
      { status: 429, headers: { "Retry-After": String(gate.wait) } },
    );
  }

  let body: { password?: string } = {};
  try {
    body = await req.json();
  } catch {
    body = {};
  }

  const password = typeof body.password === "string" ? body.password : "";
  if (!verifyPassword(password)) {
    await recordLoginFail(ip);
    return NextResponse.json({ error: "nope" }, { status: 401 });
  }

  await clearLoginFails(ip);
  const res = NextResponse.json({ ok: true });
  attachSession(res, signSession());
  return res;
}
