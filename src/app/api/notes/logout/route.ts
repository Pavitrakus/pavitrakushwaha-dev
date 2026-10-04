import { NextResponse } from "next/server";
import { clearNotesSession } from "@/lib/notes-auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST() {
  const res = NextResponse.json({ ok: true });
  clearNotesSession(res);
  return res;
}
