import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const base = new URL("https://lemelsonestate.com");
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: new URL("/sitemap.xml", base).toString(),
    host: base.origin,
  };
}


