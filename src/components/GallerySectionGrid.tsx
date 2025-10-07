"use client";

import { useEffect } from "react";
import { GalleryImage } from "@/components/GalleryImage";
import type { GallerySection } from "@/types/gallery";

type Props = {
  sections: GallerySection[];
};

const PREFETCH_START_INDEX = 12;

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

export function GallerySectionGrid({ sections }: Props) {
  useEffect(() => {
    const queue = sections
      .flatMap((section) => section.images)
      .slice(PREFETCH_START_INDEX);
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
  }, [sections]);

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
                    className="masonry-item group relative overflow-hidden rounded-3xl border border-white/60 bg-[rgba(248,243,234,0.85)] shadow-sm transition-shadow duration-300 hover:shadow-2xl"
                  >
                    <GalleryImage
                      src={image.src}
                      srcSet={image.srcset}
                      alt={altText}
                      width={image.width}
                      height={image.height}
                      sizes={image.sizes}
                      index={absoluteIndex}
                      className="pointer-events-none transition duration-300 ease-out group-hover:brightness-[1.05] group-hover:saturate-[1.05]"
                    />
                    <span className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-t from-black/20 via-transparent to-black/10 opacity-0 transition-opacity duration-300 group-hover:opacity-40" />
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
