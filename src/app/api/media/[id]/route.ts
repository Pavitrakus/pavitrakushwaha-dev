import { NextRequest, NextResponse } from "next/server";
import { getMedia } from "@/lib/essays";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Ctx = { params: Promise<{ id: string }> };

export async function GET(_req: NextRequest, ctx: Ctx) {
  const { id } = await ctx.params;
  if (!/^[a-f0-9]{16,64}$/i.test(id)) {
    return new NextResponse("no", { status: 404 });
  }
  const media = await getMedia(id);
  if (!media) return new NextResponse("no", { status: 404 });
  const buf = Buffer.from(media.bytes, "base64");
  return new NextResponse(buf, {
    headers: {
      "Content-Type": media.mime,
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}
