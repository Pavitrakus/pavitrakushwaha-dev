import { getRedis } from "@/lib/redis";
import { sanitizeEssayHtml } from "@/lib/sanitize-html";

export type Essay = {
  slug: string;
  title: string;
  dek: string;
  html: string;
  published: boolean;
  createdAt: string;
  updatedAt: string;
  year: string;
};

export const RESERVED_SLUGS = new Set([
  "how-it-started",
  "bangalore-trip",
  "fishy-mesh",
  "notes",
  "helios-stress-test",
  "admin",
]);

const INDEX = "essays:index";

function key(slug: string) {
  return `essay:${slug}`;
}

export function slugify(title: string): string {
  const base = title
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);
  return base || `essay-${Date.now().toString(36)}`;
}

function parseEssay(raw: unknown): Essay | null {
  if (!raw || typeof raw !== "object") return null;
  const e = raw as Partial<Essay>;
  if (!e.slug || !e.title) return null;
  return {
    slug: String(e.slug),
    title: String(e.title),
    dek: String(e.dek || ""),
    html: String(e.html || ""),
    published: Boolean(e.published),
    createdAt: String(e.createdAt || new Date().toISOString()),
    updatedAt: String(e.updatedAt || new Date().toISOString()),
    year: String(e.year || new Date().getFullYear()),
  };
}

export async function listEssays(): Promise<Essay[]> {
  const redis = getRedis();
  if (!redis) return [];
  const slugs = (await redis.lrange<string>(INDEX, 0, 199)) || [];
  const rows = await Promise.all(slugs.map((s) => redis.get(key(s))));
  return rows.map(parseEssay).filter((e): e is Essay => !!e);
}

export async function listPublishedEssays(): Promise<Essay[]> {
  const all = await listEssays();
  return all.filter((e) => e.published);
}

export async function getEssay(slug: string): Promise<Essay | null> {
  const redis = getRedis();
  if (!redis) return null;
  return parseEssay(await redis.get(key(slug)));
}

export async function saveEssay(input: {
  slug?: string;
  title: string;
  dek: string;
  html: string;
  published: boolean;
}): Promise<Essay> {
  const redis = getRedis();
  if (!redis) throw new Error("storage is down");

  const title = input.title.trim().slice(0, 160);
  if (!title) throw new Error("needs a title");

  let slug = (input.slug || slugify(title)).toLowerCase();

  if (input.slug) {
    if (RESERVED_SLUGS.has(slug)) throw new Error("that slug is taken by an older piece");
  } else {
    let n = 2;
    const base = slug;
    while (RESERVED_SLUGS.has(slug) || (await getEssay(slug))) {
      slug = `${base}-${n++}`;
    }
  }

  const existing = await getEssay(slug);
  const now = new Date().toISOString();
  const essay: Essay = {
    slug,
    title,
    dek: input.dek.trim().slice(0, 280),
    html: sanitizeEssayHtml(input.html),
    published: input.published,
    createdAt: existing?.createdAt || now,
    updatedAt: now,
    year: existing?.year || String(new Date().getFullYear()),
  };

  await redis.set(key(slug), essay);
  const slugs = (await redis.lrange<string>(INDEX, 0, 199)) || [];
  if (!slugs.includes(slug)) {
    await redis.lpush(INDEX, slug);
  }
  return essay;
}

export async function deleteEssay(slug: string): Promise<void> {
  const redis = getRedis();
  if (!redis) throw new Error("storage is down");
  await redis.del(key(slug));
  await redis.lrem(INDEX, 0, slug);
}

export type MediaRow = {
  id: string;
  mime: string;
  bytes: string;
};

export async function saveMedia(id: string, mime: string, bytes: string): Promise<void> {
  const redis = getRedis();
  if (!redis) throw new Error("storage is down");
  if (bytes.length > 1_800_000) throw new Error("image too heavy");
  await redis.set(`media:${id}`, { id, mime, bytes });
}

export async function getMedia(id: string): Promise<MediaRow | null> {
  const redis = getRedis();
  if (!redis) return null;
  const raw = await redis.get<MediaRow>(`media:${id}`);
  if (!raw || typeof raw !== "object" || !raw.bytes) return null;
  return raw;
}
