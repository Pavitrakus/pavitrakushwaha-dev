import { randomBytes } from "crypto";
import { NextRequest, NextResponse } from "next/server";
import { hasAdminSession } from "@/lib/admin-auth";
import { saveMedia } from "@/lib/essays";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const ALLOWED = new Set(["image/jpeg", "image/png", "image/webp", "image/gif"]);

export async function POST(req: NextRequest) {
  if (!(await hasAdminSession())) {
    return NextResponse.json({ error: "nope" }, { status: 401 });
  }

  let body: { mime?: string; data?: string } = {};
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "bad body" }, { status: 400 });
  }

  const mime = String(body.mime || "");
  const data = String(body.data || "").replace(/\s/g, "");
  if (!ALLOWED.has(mime) || !/^[a-z0-9+/=]+$/i.test(data)) {
    return NextResponse.json({ error: "that file is not an image" }, { status: 400 });
  }
  if (data.length > 1_800_000) {
    return NextResponse.json({ error: "too heavy. pick a smaller photo." }, { status: 400 });
  }

  const id = randomBytes(16).toString("hex");
  try {
    await saveMedia(id, mime, data);
  } catch (err) {
    const message = err instanceof Error ? err.message : "upload failed";
    return NextResponse.json({ error: message }, { status: 400 });
  }
  return NextResponse.json({ src: `/api/media/${id}` });
}
