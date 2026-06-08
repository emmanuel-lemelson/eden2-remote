"use client";

import { useCallback, useState } from "react";

type Props = {
  src: string;
  alt: string;
  width: number;
  height: number;
  index?: number;
  sizes?: string;
  srcSet?: string;
  avifSrcSet?: string;
  className?: string;
};

const PRIORITY_IMAGE_COUNT = 12;
const DEFAULT_SIZES = "(min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw";

export function GalleryImage({
  src,
  alt,
  width,
  height,
  sizes,
  srcSet,
  avifSrcSet,
  index = 0,
  className,
}: Props) {
  const isPriority = index < PRIORITY_IMAGE_COUNT;
  const [isLoaded, setIsLoaded] = useState(false);

  // Cached images can finish loading before React attaches onLoad. The ref
  // callback checks `complete` on mount so they don't stay stuck at opacity 0.
  const imgRef = useCallback((node: HTMLImageElement | null) => {
    if (node?.complete) setIsLoaded(true);
  }, []);
  const classes = ["block h-auto w-full object-cover gallery-img"];
  if (isLoaded) classes.push("is-loaded");
  if (className && className.trim().length > 0) {
    classes.push(className);
  }

  const resolvedSizes = sizes ?? DEFAULT_SIZES;

  return (
    <picture>
      {avifSrcSet ? (
        <source type="image/avif" srcSet={avifSrcSet} sizes={resolvedSizes} />
      ) : null}
      {srcSet ? (
        <source type="image/webp" srcSet={srcSet} sizes={resolvedSizes} />
      ) : null}
      <img
        ref={imgRef}
        src={src}
        sizes={resolvedSizes}
        alt={alt}
        loading={isPriority ? "eager" : "lazy"}
        decoding="async"
        fetchPriority={isPriority ? "high" : "auto"}
        width={width}
        height={height}
        onLoad={() => setIsLoaded(true)}
        className={classes.join(" ")}
        style={{
          aspectRatio: `${width} / ${height}`,
          backgroundColor: "var(--color-eggshell)",
        }}
      />
    </picture>
  );
}
