interface ResponsivePhotoProps {
  basePath: string;
  alt: string;
  sizes: string;
  width?: number;
  height?: number;
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
  priority = false,
  className = "h-full w-full object-cover",
}: ResponsivePhotoProps) {
  return (
    <picture>
      <source
        type="image/avif"
        srcSet={`${basePath}@400w.avif 400w, ${basePath}@800w.avif 800w, ${basePath}@1200w.avif 1200w`}
        sizes={sizes}
      />
      <source
        type="image/webp"
        srcSet={`${basePath}@400w.webp 400w, ${basePath}@800w.webp 800w, ${basePath}@1200w.webp 1200w`}
        sizes={sizes}
      />
      <img
        src={`${basePath}@1200w.webp`}
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
