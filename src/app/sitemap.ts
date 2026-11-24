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
    "/guides/ski-season/",
    "/guides/stowe-fall-foliage/",
    "/guides/stowe-family-reunions/",
    "/gallery/",
    "/reviews/",
    "/contact/",
    "/news/",
    "/news/the-lemelson-estate-opens-doors-to-exclusive-corporate-events/",
  ];
  const highPriorityRoutes = new Set(["/stays/", "/weddings/", "/retreats/"]);
  const guideRoutes = new Set([
    "/guides/ski-season/",
    "/guides/stowe-fall-foliage/",
    "/guides/stowe-family-reunions/",
  ]);
  return routes.map((path) => ({
    url: new URL(path, base).toString(),
    lastModified: now,
    changeFrequency: "weekly",
    priority: path === "/" ? 1 : highPriorityRoutes.has(path) ? 0.9 : guideRoutes.has(path) ? 0.85 : 0.8,
  }));
}
