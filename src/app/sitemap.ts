import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = new URL("https://lemelsonestate.com");
  const now = new Date().toISOString();
  const routes = [
    "/",
    "/stays/",
    "/weddings/",
    "/retreats/",
    "/gallery/",
    "/reviews/",
    "/contact/",
    "/news/",
    "/news/the-lemelson-estate-opens-doors-to-exclusive-corporate-events/",
  ];
  const highPriorityRoutes = new Set(["/stays/", "/weddings/", "/retreats/"]);
  return routes.map((path) => ({
    url: new URL(path, base).toString(),
    lastModified: now,
    changeFrequency: "weekly",
    priority: path === "/" ? 1 : highPriorityRoutes.has(path) ? 0.9 : 0.8,
  }));
}
