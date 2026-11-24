import { HIGH_RES_PHOTOS } from "@/data/high-res-photos";

interface ResponsivePhotoProps {
  basePath: string;
  alt: string;
  sizes: string;
  width?: number;
  height?: number;
  maxWidth?: 800 | 1200;
  priority?: boolean;
  className?: string;
}

/**
 * Renders a responsive AVIF/WebP <picture> element using pre-generated gallery variants.
 */
export function ResponsivePhoto({
  basePath,
  alt,
  sizes,
  width = 1200,
  height = 800,
  maxWidth = 1200,
  priority = false,
  className = "h-full w-full object-cover",
}: ResponsivePhotoProps) {
  const widths: number[] = maxWidth === 800 ? [400, 800] : [400, 800, 1200];
  if (maxWidth !== 800 && HIGH_RES_PHOTOS.has(decodeURI(basePath))) {
    widths.push(1600, 2000);
  }
  const buildSrcSet = (ext: "avif" | "webp") =>
    widths.map((w) => `${basePath}@${w}w.${ext} ${w}w`).join(", ");
  const avifSrcSet = buildSrcSet("avif");
  const webpSrcSet = buildSrcSet("webp");
  const fallbackSrc = `${basePath}@${maxWidth}w.webp`;

  return (
    <picture>
      <source type="image/avif" srcSet={avifSrcSet} sizes={sizes} />
      <source type="image/webp" srcSet={webpSrcSet} sizes={sizes} />
      <img
        src={fallbackSrc}
        alt={alt}
        width={width}
        height={height}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : "auto"}
        decoding="async"
        className={className}
      />
    </picture>
  );
}
