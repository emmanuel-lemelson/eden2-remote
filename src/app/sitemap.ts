import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = new URL("https://lemelsonestate.com");
  const now = new Date().toISOString();
  const routes = ["/", "/gallery", "/reviews", "/contact"]; 
  return routes.map((path) => ({
    url: new URL(path, base).toString(),
    lastModified: now,
    changeFrequency: "weekly",
    priority: path === "/" ? 1 : 0.8,
  }));
}


