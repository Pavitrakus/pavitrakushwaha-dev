import { NextRequest, NextResponse } from "next/server";
import { hasAdminSession } from "@/lib/admin-auth";
import { listEssays, saveEssay } from "@/lib/essays";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  if (!(await hasAdminSession())) {
    return NextResponse.json({ error: "nope" }, { status: 401 });
  }
  const essays = await listEssays();
  return NextResponse.json({ essays });
}

export async function POST(req: NextRequest) {
  if (!(await hasAdminSession())) {
    return NextResponse.json({ error: "nope" }, { status: 401 });
  }
  let body: {
    slug?: string;
    title?: string;
    dek?: string;
    html?: string;
    published?: boolean;
  } = {};
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "bad body" }, { status: 400 });
  }
  try {
    const essay = await saveEssay({
      slug: body.slug,
      title: String(body.title || ""),
      dek: String(body.dek || ""),
      html: String(body.html || ""),
      published: Boolean(body.published),
    });
    return NextResponse.json({ essay });
  } catch (err) {
    const message = err instanceof Error ? err.message : "could not save";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
