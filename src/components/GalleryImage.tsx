"use client";

import { useCallback, useEffect, useState } from "react";

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

// Top 4 photos (immediately visible above the fold) get VIP bandwidth priority.
const VIP_IMAGE_COUNT = 4;
// First full section (Estate & Grounds, 17 photos) loads eagerly right behind the top 4.
const INITIAL_EAGER_COUNT = 17;
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
  const isVip = index < VIP_IMAGE_COUNT;
  const isInitialEager = index < INITIAL_EAGER_COUNT;
  const [eagerOverride, setEagerOverride] = useState(isInitialEager);
  const [isLoaded, setIsLoaded] = useState(false);

  // Cached images can finish loading before React attaches onLoad. The ref
  // callback checks `complete` on mount so they don't stay stuck at opacity 0.
  const imgRef = useCallback((node: HTMLImageElement | null) => {
    if (node?.complete) setIsLoaded(true);
  }, []);

  // Top-to-bottom background waterfall: once the initial above-the-fold batch
  // has a head start, promote remaining gallery images to eager in top-down waves
  // so they are already downloaded before the guest scrolls down.
  useEffect(() => {
    if (isInitialEager) return;

    const batchIndex = Math.floor((index - INITIAL_EAGER_COUNT) / 8);
    const delayMs = 300 + batchIndex * 180;
    let timerId: ReturnType<typeof setTimeout> | null = null;

    const scheduleWave = () => {
      timerId = setTimeout(() => {
        setEagerOverride(true);
      }, delayMs);
    };

    if (document.readyState === "complete") {
      scheduleWave();
    } else {
      window.addEventListener("load", scheduleWave, { once: true });
    }

    return () => {
      window.removeEventListener("load", scheduleWave);
      if (timerId !== null) clearTimeout(timerId);
    };
  }, [index, isInitialEager]);

  const classes = ["block h-auto w-full object-cover gallery-img"];
  if (isLoaded) classes.push("is-loaded");
  if (className && className.trim().length > 0) {
    classes.push(className);
  }

  const resolvedSizes = sizes ?? DEFAULT_SIZES;
  const shouldLoadEager = isInitialEager || eagerOverride;

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
        loading={shouldLoadEager ? "eager" : "lazy"}
        decoding="async"
        fetchPriority={isVip ? "high" : isInitialEager ? "auto" : "low"}
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
