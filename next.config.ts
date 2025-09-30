import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /**
   * Tune Next/Image so we only generate the sizes we actually use.
   * This reduces on-demand image optimization work (and ISR reads on Vercel),
   * and cuts down total bytes transferred.
   */
  images: {
    // Disable on-demand optimizer to avoid image cache writes on Vercel free tier
    unoptimized: true,
    // Keep a single modern format to reduce variants when self-hosting static images
    formats: ["image/webp"],
    /**
     * Breakpoints aligned with our layout: single column on mobile,
     * two columns on md, three on lg.
     */
    deviceSizes: [640, 768, 1024, 1280, 1536],
    imageSizes: [320, 480, 640],
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "storage.googleapis.com" },
    ],
  },
  /**
   * Strengthen caching for static assets in /public, especially the gallery.
   */
  async headers() {
    return [
      {
        source: "/(.*)\\.(webp|avif|jpg|jpeg|png|svg|gif|ico|mp4)",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
    ];
  },
};

export default nextConfig;
