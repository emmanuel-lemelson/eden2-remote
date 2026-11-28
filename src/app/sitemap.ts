import type { MetadataRoute } from "next";

export const dynamic = "force-static";

const ROUTE_LAST_MODIFIED: Record<string, string> = {
  "/": "2026-11-28",
  "/stays/": "2026-11-28",
  "/weddings/": "2026-11-28",
  "/retreats/": "2026-11-28",
  "/guides/ski-season/": "2026-05-01",
  "/guides/stowe-fall-foliage/": "2026-05-01",
  "/guides/stowe-family-reunions/": "2026-05-01",
  "/gallery/": "2026-05-01",
  "/reviews/": "2026-05-01",
  "/contact/": "2026-05-01",
  "/news/": "2026-05-01",
  "/news/the-lemelson-estate-opens-doors-to-exclusive-corporate-events/": "2026-05-01",
};

export default function sitemap(): MetadataRoute.Sitemap {
  const base = new URL("https://lemelsonestate.com");
  const routes = Object.keys(ROUTE_LAST_MODIFIED);
  const highPriorityRoutes = new Set(["/stays/", "/weddings/", "/retreats/"]);
  const guideRoutes = new Set([
    "/guides/ski-season/",
    "/guides/stowe-fall-foliage/",
    "/guides/stowe-family-reunions/",
  ]);
  return routes.map((path) => ({
    url: new URL(path, base).toString(),
    lastModified: ROUTE_LAST_MODIFIED[path],
    changeFrequency: "weekly",
    priority: path === "/" ? 1 : highPriorityRoutes.has(path) ? 0.9 : guideRoutes.has(path) ? 0.85 : 0.8,
  }));
}
