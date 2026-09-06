import { NextRequest, NextResponse } from "next/server";
import { hasAdminSession } from "@/lib/admin-auth";
import { deleteEssay, getEssay, saveEssay } from "@/lib/essays";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Ctx = { params: Promise<{ slug: string }> };

export async function GET(_req: NextRequest, ctx: Ctx) {
  if (!(await hasAdminSession())) {
    return NextResponse.json({ error: "nope" }, { status: 401 });
  }
  const { slug } = await ctx.params;
  const essay = await getEssay(slug);
  if (!essay) return NextResponse.json({ error: "missing" }, { status: 404 });
  return NextResponse.json({ essay });
}

export async function PUT(req: NextRequest, ctx: Ctx) {
  if (!(await hasAdminSession())) {
    return NextResponse.json({ error: "nope" }, { status: 401 });
  }
  const { slug } = await ctx.params;
  let body: { title?: string; dek?: string; html?: string; published?: boolean } = {};
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "bad body" }, { status: 400 });
  }
  try {
    const essay = await saveEssay({
      slug,
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

export async function DELETE(_req: NextRequest, ctx: Ctx) {
  if (!(await hasAdminSession())) {
    return NextResponse.json({ error: "nope" }, { status: 401 });
  }
  const { slug } = await ctx.params;
  await deleteEssay(slug);
  return NextResponse.json({ ok: true });
}
