import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/v01", "/admin", "/admin/", "/api/admin", "/blog/notes", "/blog/notes/"],
      },
    ],
    sitemap: "https://pavitrakushwaha.dev/sitemap.xml",
  };
}
