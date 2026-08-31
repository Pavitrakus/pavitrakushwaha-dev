import type { MetadataRoute } from "next";
import { work } from "@/lib/work";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://pavitrakushwaha.dev";

  const workPages = work.map((w) => ({
    url: `${base}/work/${w.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.75,
  }));

  return [
    {
      url: base,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${base}/work`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    ...workPages,
    {
      url: `${base}/projects`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${base}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${base}/visits`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.6,
    },
    {
      url: `${base}/blog/notes`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${base}/blog/notes/the-jacket-one`,
      lastModified: new Date("2026-08-28"),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${base}/blog/notes/forked-before-breakfast`,
      lastModified: new Date("2026-08-21"),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${base}/blog/bangalore-trip`,
      lastModified: new Date("2026-07-05"),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${base}/blog/fishy-mesh`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },

    // project pages
    {
      url: `${base}/projects/vivacity`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${base}/projects/bucket`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${base}/projects/whocodedmore`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${base}/projects/orca`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${base}/projects/orbis-2045`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${base}/projects/byteforge`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${base}/projects/d2ar`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${base}/projects/lumenseed`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${base}/projects/clusterorch-gym`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];
}
