import { NextRequest, NextResponse } from "next/server";
import {
  attachNotesSession,
  clearNotesLoginFails,
  notesConfigured,
  notesLoginAllowed,
  recordNotesLoginFail,
  signNotesSession,
  verifyNotesPassword,
} from "@/lib/notes-auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  if (!notesConfigured()) {
    return NextResponse.json({ error: "notes are not configured" }, { status: 503 });
  }

  const gate = await notesLoginAllowed(req);
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
  if (!verifyNotesPassword(password)) {
    await recordNotesLoginFail(req);
    return NextResponse.json({ error: "wrong password" }, { status: 401 });
  }

  await clearNotesLoginFails(req);
  const res = NextResponse.json({ ok: true });
  attachNotesSession(res, signNotesSession());
  return res;
}
