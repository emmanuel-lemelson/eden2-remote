"use client";

import { useEffect, useLayoutEffect, useMemo, useRef } from "react";
import type { ReactNode } from "react";
import { GalleryImage } from "@/components/GalleryImage";
import type { GallerySection } from "@/types/gallery";

type Props = {
  sections: GallerySection[];
  variant?: "grouped" | "masonry";
};

const PREFETCH_START_INDEX = 12;
const DEFAULT_AUTO_ROW_HEIGHT = 8;

function scheduleIdleWork(callback: () => void) {
  if (typeof window === "undefined") {
    return 0;
  }

  const idleCallback = (window as Window & {
    requestIdleCallback?: (cb: IdleRequestCallback, options?: IdleRequestOptions) => number;
  }).requestIdleCallback;

  if (typeof idleCallback === "function") {
    return idleCallback(() => callback());
  }

  return window.setTimeout(callback, 64);
}

function cancelIdleWork(handle: number) {
  if (typeof window === "undefined") {
    return;
  }

  const cancelCallback = (window as Window & {
    cancelIdleCallback?: (handle: number) => void;
  }).cancelIdleCallback;

  if (typeof cancelCallback === "function") {
    cancelCallback(handle);
  } else {
    window.clearTimeout(handle);
  }
}

function MasonryItem({
  className,
  children,
  aspectRatio,
}: {
  className?: string;
  children: ReactNode;
  aspectRatio: number;
}) {
  const elementRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    const element = elementRef.current;
    if (!element) {
      return;
    }

    const hasResizeObserver = typeof ResizeObserver === "function";

    const updateSpan = () => {
      const grid = element.parentElement;
      if (!grid) {
        return;
      }

      const computed = window.getComputedStyle(grid);
      const gap =
        Number.parseFloat(computed.getPropertyValue("row-gap")) ||
        Number.parseFloat(computed.getPropertyValue("gap")) ||
        0;
      const autoRowHeight =
        Number.parseFloat(computed.getPropertyValue("grid-auto-rows")) ||
        DEFAULT_AUTO_ROW_HEIGHT;
      if (autoRowHeight <= 0) {
        return;
      }

      if (!Number.isFinite(aspectRatio) || aspectRatio <= 0) {
        element.style.removeProperty("grid-row-end");
        element.style.removeProperty("height");
        return;
      }

      const width = element.getBoundingClientRect().width;
      if (width === 0) {
        return;
      }

      const targetHeight = width * aspectRatio;
      const rowSpan = Math.max(
        1,
        Math.ceil((targetHeight + gap) / (autoRowHeight + gap)),
      );

      element.style.gridRowEnd = `span ${rowSpan}`;
      element.style.height = `${targetHeight}px`;
    };

    updateSpan();

    if (hasResizeObserver) {
      const observer = new ResizeObserver(updateSpan);
      observer.observe(element);

      return () => {
        observer.disconnect();
      };
    }

    window.addEventListener("resize", updateSpan);

    return () => {
      window.removeEventListener("resize", updateSpan);
    };
  }, [aspectRatio]);

  const classes = ["masonry-item"];
  if (className && className.trim().length > 0) {
    classes.push(className);
  }

  return (
    <div ref={elementRef} className={classes.join(" ")}>
      {children}
    </div>
  );
}

export function GallerySectionGrid({ sections, variant = "grouped" }: Props) {
  const normalizedImages = useMemo(
    () =>
      sections.flatMap((section) =>
        section.images.map((image) => ({
          sectionTitle: section.title,
          image,
        })),
      ),
    [sections],
  );

  useEffect(() => {
    const queue = normalizedImages
      .slice(PREFETCH_START_INDEX)
      .map(({ image }) => image);
    if (queue.length === 0) {
      return;
    }

    let cancelled = false;
    let idleHandle: number | null = null;

    const processQueue = () => {
      if (cancelled) {
        return;
      }

      const nextImage = queue.shift();
      if (!nextImage) {
        return;
      }

      const preloader = new Image();
      if (nextImage.srcset) {
        preloader.srcset = nextImage.srcset;
        if (nextImage.sizes) {
          preloader.sizes = nextImage.sizes;
        }
      }
      preloader.decoding = "async";
      preloader.src = nextImage.src;

      const handleComplete = () => {
        preloader.onload = null;
        preloader.onerror = null;
        if (queue.length > 0) {
          idleHandle = scheduleIdleWork(processQueue);
        }
      };

      preloader.onload = handleComplete;
      preloader.onerror = handleComplete;
    };

    idleHandle = scheduleIdleWork(processQueue);

    return () => {
      cancelled = true;
      if (idleHandle !== null) {
        cancelIdleWork(idleHandle);
      }
    };
  }, [normalizedImages]);

  if (variant === "masonry") {
    return (
      <div className="lux-container">
        <div className="masonry-grid">
          {normalizedImages.map(({ sectionTitle, image }, index) => {
            const altText =
              image.alt && image.alt !== "Eden Estate gallery image"
                ? image.alt
                : `${sectionTitle} at Eden Estate`;

            return (
              <MasonryItem
                key={`${sectionTitle}-${image.src}`}
                className="relative overflow-hidden rounded-3xl border border-white/60 bg-[rgba(248,243,234,0.85)] shadow-sm"
                aspectRatio={image.height / image.width}
              >
                <GalleryImage
                  src={image.src}
                  srcSet={image.srcset}
                  alt={altText}
                  width={image.width}
                  height={image.height}
                  sizes={image.sizes}
                  index={index}
                  className="pointer-events-none h-full"
                />
                <span className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-t from-black/20 via-transparent to-black/10 opacity-30" />
              </MasonryItem>
            );
          })}
        </div>
      </div>
    );
  }

  let runningImageIndex = 0;

  return (
    <div className="lux-container space-y-12">
      {sections.map((section) => {
        const sectionStartIndex = runningImageIndex;
        runningImageIndex += section.images.length;

        return (
          <article key={section.title} className="space-y-4">
            <div className="md:w-2/3">
              <h3 className="text-xl font-semibold text-stone-900">
                {section.title}
              </h3>
            </div>

            <div className="masonry-container">
              {section.images.map((image, index) => {
                const absoluteIndex = sectionStartIndex + index;
                const altText =
                  image.alt && image.alt !== "Eden Estate gallery image"
                    ? image.alt
                    : `${section.title} at Eden Estate`;

                return (
                  <div
                    key={image.src}
                    className="masonry-item relative overflow-hidden rounded-3xl border border-white/60 bg-[rgba(248,243,234,0.85)] shadow-sm"
                  >
                    <GalleryImage
                      src={image.src}
                      srcSet={image.srcset}
                      alt={altText}
                      width={image.width}
                      height={image.height}
                      sizes={image.sizes}
                      index={absoluteIndex}
                      className="pointer-events-none"
                    />
                    <span className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-t from-black/20 via-transparent to-black/10 opacity-30" />
                  </div>
                );
              })}
            </div>
          </article>
        );
      })}
    </div>
  );
}
