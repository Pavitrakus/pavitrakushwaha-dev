import type { MetadataRoute } from "next";
import { notes } from "@/lib/notes";
import { work } from "@/lib/work";
import { listPublishedEssays } from "@/lib/essays";

const projectSlugs = [
  "vivacity",
  "bucket",
  "whocodedmore",
  "orca",
  "orbis-2045",
  "byteforge",
  "d2ar",
  "lumenseed",
  "clusterorch-gym",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = "https://pavitrakushwaha.dev";
  const current = new Date();
  const essays = await listPublishedEssays();

  return [
    {
      url: base,
      lastModified: current,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${base}/work`,
      lastModified: current,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    ...work.map((item) => ({
      url: `${base}/work/${item.slug}`,
      lastModified: current,
      changeFrequency: "monthly" as const,
      priority: 0.75,
    })),
    {
      url: `${base}/projects`,
      lastModified: current,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    ...projectSlugs.map((slug) => ({
      url: `${base}/projects/${slug}`,
      lastModified: current,
      changeFrequency: "monthly" as const,
      priority: slug === "vivacity" ? 0.85 : 0.75,
    })),
    {
      url: `${base}/blog`,
      lastModified: current,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${base}/blog/notes`,
      lastModified: current,
      changeFrequency: "weekly",
      priority: 0.75,
    },
    ...notes.map((note) => ({
      url: `${base}/blog/notes/${note.slug}`,
      lastModified: new Date(note.date),
      changeFrequency: "monthly" as const,
      priority: 0.65,
    })),
    {
      url: `${base}/visits`,
      lastModified: current,
      changeFrequency: "daily",
      priority: 0.6,
    },
    {
      url: `${base}/blog/how-it-started`,
      lastModified: new Date("2026-09-06"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${base}/blog/bangalore-trip`,
      lastModified: new Date("2026-09-06"),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${base}/blog/fishy-mesh`,
      lastModified: current,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    ...essays.map((essay) => ({
      url: `${base}/blog/${essay.slug}`,
      lastModified: new Date(essay.updatedAt),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
