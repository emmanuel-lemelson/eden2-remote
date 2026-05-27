"use client";

import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import type { ReactNode } from "react";
import { GalleryImage } from "@/components/GalleryImage";
import type { GallerySection } from "@/types/gallery";

type Props = {
  sections: GallerySection[];
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

export function GallerySectionGrid({ sections }: Props) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

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

  // Lightbox Keyboard Navigation Event Listeners
  useEffect(() => {
    if (lightboxIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setLightboxIndex(null);
      } else if (e.key === "ArrowRight") {
        setLightboxIndex((prev) =>
          prev !== null && prev < normalizedImages.length - 1 ? prev + 1 : prev
        );
      } else if (e.key === "ArrowLeft") {
        setLightboxIndex((prev) =>
          prev !== null && prev > 0 ? prev - 1 : prev
        );
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxIndex, normalizedImages]);

  function renderPhotoNumberOverlay(src: string) {
    const match = src.match(/\/(\d+)\.(avif|webp)/);
    const photoNum = match ? match[1] : "";
    if (!photoNum) return null;
    return (
      <div className="absolute top-4 left-4 z-20 bg-stone-900/80 backdrop-blur-md text-white text-[10px] uppercase font-bold tracking-widest px-2.5 py-1.5 rounded-full border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none shadow-md">
        Photo #{photoNum}
      </div>
    );
  }

  // Dynamic layout renderer based on image counts to ensure visual balance
  function renderSectionPhotos(section: GallerySection, sectionStartIndex: number) {
    const images = section.images;
    const count = images.length;

    if (count === 1) {
      // 1 Photo: Centered Elegant Showcase (pure, minimal architectural presentation)
      const img = images[0];
      const absoluteIndex = sectionStartIndex;
      const altText = img.alt && img.alt !== "Eden Estate gallery image" ? img.alt : `${section.title} at Eden Estate`;
      const isPortrait = img.width < img.height;

      const aspectClass = isPortrait
        ? "relative aspect-[3/4] w-full overflow-hidden"
        : "relative aspect-[16/10] sm:aspect-[16/9] w-full overflow-hidden";

      return (
        <div className="w-full flex justify-center">
          <div
            onClick={() => setLightboxIndex(absoluteIndex)}
            className="group relative overflow-hidden rounded-3xl border border-white/60 bg-[rgba(248,243,234,0.85)] shadow-sm transition-all duration-300 cursor-pointer w-full"
            style={{ maxWidth: isPortrait ? "420px" : "1000px" }}
          >
            <div className={aspectClass}>
              <GalleryImage
                src={img.src}
                srcSet={img.srcset}
                alt={altText}
                width={img.width}
                height={img.height}
                sizes={isPortrait ? "(min-width: 768px) 33vw, 100vw" : "(min-width: 1024px) 70vw, 100vw"}
                index={absoluteIndex}
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>
            <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/15 z-10 pointer-events-none" />
            <span className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-t from-black/20 via-transparent to-black/5 opacity-30" />
            {renderPhotoNumberOverlay(img.src)}
          </div>
        </div>
      );
    }

    if (count === 2) {
      // 2 Photos: Balanced Diptych Presentation
      const img1 = images[0];
      const img2 = images[1];
      const abs1 = sectionStartIndex;
      const abs2 = sectionStartIndex + 1;
      const alt1 = img1.alt && img1.alt !== "Eden Estate gallery image" ? img1.alt : `${section.title} at Eden Estate`;
      const alt2 = img2.alt && img2.alt !== "Eden Estate gallery image" ? img2.alt : `${section.title} at Eden Estate`;

      const isPort1 = img1.width < img1.height;
      const isPort2 = img2.width < img2.height;

      if (isPort1 && isPort2) {
        // Both Portrait: Symmetric elegant narrow double columns
        return (
          <div className="grid grid-cols-2 gap-6 max-w-3xl mx-auto">
            {[
              { img: img1, abs: abs1, alt: alt1 },
              { img: img2, abs: abs2, alt: alt2 },
            ].map(({ img, abs, alt }) => (
              <div
                key={img.src}
                onClick={() => setLightboxIndex(abs)}
                className="group relative overflow-hidden rounded-3xl border border-white/60 bg-[rgba(248,243,234,0.85)] shadow-sm transition-all duration-300 cursor-pointer"
              >
                <div className="relative aspect-[3/4] w-full overflow-hidden">
                  <GalleryImage
                    src={img.src}
                    srcSet={img.srcset}
                    alt={alt}
                    width={img.width}
                    height={img.height}
                    sizes="(min-width: 768px) 33vw, 50vw"
                    index={abs}
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                </div>
                <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/15 z-10 pointer-events-none" />
                <span className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-t from-black/20 via-transparent to-black/5 opacity-30" />
                {renderPhotoNumberOverlay(img.src)}
              </div>
            ))}
          </div>
        );
      } else if (!isPort1 && !isPort2) {
        // Both Landscape: Symmetric wide columns matching heights
        return (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {[
              { img: img1, abs: abs1, alt: alt1 },
              { img: img2, abs: abs2, alt: alt2 },
            ].map(({ img, abs, alt }) => (
              <div
                key={img.src}
                onClick={() => setLightboxIndex(abs)}
                className="group relative overflow-hidden rounded-3xl border border-white/60 bg-[rgba(248,243,234,0.85)] shadow-sm transition-all duration-300 cursor-pointer"
              >
                <div className="relative aspect-[3/2] w-full overflow-hidden">
                  <GalleryImage
                    src={img.src}
                    srcSet={img.srcset}
                    alt={alt}
                    width={img.width}
                    height={img.height}
                    sizes="(min-width: 768px) 40vw, 100vw"
                    index={abs}
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                </div>
                <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/15 z-10 pointer-events-none" />
                <span className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-t from-black/20 via-transparent to-black/5 opacity-30" />
                {renderPhotoNumberOverlay(img.src)}
              </div>
            ))}
          </div>
        );
      } else {
        // Mixed (1 Landscape, 1 Portrait): Asymmetric alignment with identical boundary heights
        return (
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 max-w-5xl mx-auto">
            {/* Landscape photo (takes 3/5 width) */}
            <div
              onClick={() => setLightboxIndex(isPort1 ? abs2 : abs1)}
              className="md:col-span-3 group relative overflow-hidden rounded-3xl border border-white/60 bg-[rgba(248,243,234,0.85)] shadow-sm transition-all duration-300 cursor-pointer h-[320px] sm:h-[400px] md:h-[460px]"
            >
              <div className="relative h-full w-full overflow-hidden">
                <GalleryImage
                  src={isPort1 ? img2.src : img1.src}
                  srcSet={isPort1 ? img2.srcset : img1.srcset}
                  alt={isPort1 ? alt2 : alt1}
                  width={isPort1 ? img2.width : img1.width}
                  height={isPort1 ? img2.height : img1.height}
                  sizes="(min-width: 768px) 50vw, 100vw"
                  index={isPort1 ? abs2 : abs1}
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </div>
              <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/15 z-10 pointer-events-none" />
              <span className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-t from-black/20 via-transparent to-black/5 opacity-30" />
              {renderPhotoNumberOverlay(isPort1 ? img2.src : img1.src)}
            </div>
            {/* Portrait photo (takes 2/5 width) */}
            <div
              onClick={() => setLightboxIndex(isPort1 ? abs1 : abs2)}
              className="md:col-span-2 group relative overflow-hidden rounded-3xl border border-white/60 bg-[rgba(248,243,234,0.85)] shadow-sm transition-all duration-300 cursor-pointer h-[320px] sm:h-[400px] md:h-[460px]"
            >
              <div className="relative h-full w-full overflow-hidden">
                <GalleryImage
                  src={isPort1 ? img1.src : img2.src}
                  srcSet={isPort1 ? img1.srcset : img2.srcset}
                  alt={isPort1 ? alt1 : alt2}
                  width={isPort1 ? img1.width : img2.width}
                  height={isPort1 ? img1.height : img2.height}
                  sizes="(min-width: 768px) 35vw, 100vw"
                  index={isPort1 ? abs1 : abs2}
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </div>
              <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/15 z-10 pointer-events-none" />
              <span className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-t from-black/20 via-transparent to-black/5 opacity-30" />
              {renderPhotoNumberOverlay(isPort1 ? img1.src : img2.src)}
            </div>
          </div>
        );
      }
    }

    if (count === 3) {
      // 3 Photos: Curated Triptych Collage
      const isAllPortrait = images.every((img) => img.width < img.height);

      if (isAllPortrait) {
        // All Portrait: Highly elegant 3-column row
        return (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {images.map((img, idx) => {
              const absoluteIndex = sectionStartIndex + idx;
              return (
                <div
                  key={img.src}
                  onClick={() => setLightboxIndex(absoluteIndex)}
                  className="group relative overflow-hidden rounded-3xl border border-white/60 bg-[rgba(248,243,234,0.85)] shadow-sm transition-all duration-300 cursor-pointer"
                >
                  <div className="relative aspect-[3/4] w-full overflow-hidden">
                    <GalleryImage
                      src={img.src}
                      srcSet={img.srcset}
                      alt={img.alt && img.alt !== "Eden Estate gallery image" ? img.alt : `${section.title} at Eden Estate`}
                      width={img.width}
                      height={img.height}
                      sizes="(min-width: 768px) 30vw, 100vw"
                      index={absoluteIndex}
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                  </div>
                  <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/15 z-10 pointer-events-none" />
                  <span className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-t from-black/20 via-transparent to-black/5 opacity-30" />
                  {renderPhotoNumberOverlay(img.src)}
                </div>
              );
            })}
          </div>
        );
      } else {
        // Mixed: Height-matched Editorial Hero Collage (Left = large landscape featured, Right = vertical stack of 2)
        // Choose the landscape image with the largest width (best resolution/panoramic potential) for the large hero
        let featuredIdx = 0;
        let maxWidth = 0;
        images.forEach((img, idx) => {
          if (img.width >= img.height && img.width > maxWidth) {
            maxWidth = img.width;
            featuredIdx = idx;
          }
        });
        
        const featuredImage = images[featuredIdx];
        const featuredAbs = sectionStartIndex + featuredIdx;
        
        const remainingImages = images.filter((_, idx) => idx !== featuredIdx);
        // Correct index map for absolute navigation
        const remainingAbs: number[] = [];
        images.forEach((_, idx) => {
          if (idx !== featuredIdx) {
            remainingAbs.push(sectionStartIndex + idx);
          }
        });

        return (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 max-w-6xl mx-auto items-stretch">
            {/* Left featured large horizontal banner */}
            <div
              onClick={() => setLightboxIndex(featuredAbs)}
              className="md:col-span-8 group relative overflow-hidden rounded-3xl border border-white/60 bg-[rgba(248,243,234,0.85)] shadow-sm transition-all duration-300 cursor-pointer h-[320px] sm:h-[450px] md:h-[500px]"
            >
              <div className="relative h-full w-full overflow-hidden">
                <GalleryImage
                  src={featuredImage.src}
                  srcSet={featuredImage.srcset}
                  alt={featuredImage.alt && featuredImage.alt !== "Eden Estate gallery image" ? featuredImage.alt : `${section.title} at Eden Estate`}
                  width={featuredImage.width}
                  height={featuredImage.height}
                  sizes="(min-width: 1024px) 50vw, (min-width: 768px) 66vw, 100vw"
                  index={featuredAbs}
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </div>
              <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/15 z-10 pointer-events-none" />
              <span className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-t from-black/25 via-transparent to-black/5 opacity-35" />
              {renderPhotoNumberOverlay(featuredImage.src)}
            </div>

            {/* Right stacked dual column */}
            <div className="md:col-span-4 flex flex-col justify-between gap-6 md:h-[500px]">
              {remainingImages.map((img, idx) => {
                const absoluteIndex = remainingAbs[idx];
                return (
                  <div
                    key={img.src}
                    onClick={() => setLightboxIndex(absoluteIndex)}
                    className="flex-1 group relative overflow-hidden rounded-3xl border border-white/60 bg-[rgba(248,243,234,0.85)] shadow-sm transition-all duration-300 cursor-pointer h-[200px] md:h-[238px]"
                  >
                    <div className="relative h-full w-full overflow-hidden">
                      <GalleryImage
                        src={img.src}
                        srcSet={img.srcset}
                        alt={img.alt && img.alt !== "Eden Estate gallery image" ? img.alt : `${section.title} at Eden Estate`}
                        width={img.width}
                        height={img.height}
                        sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 100vw"
                        index={absoluteIndex}
                        className="absolute inset-0 h-full w-full object-cover"
                      />
                    </div>
                    <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/15 z-10 pointer-events-none" />
                    <span className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-t from-black/20 via-transparent to-black/5 opacity-30" />
                    {renderPhotoNumberOverlay(img.src)}
                  </div>
                );
              })}
            </div>
          </div>
        );
      }
    }

    if (count === 4) {
      // 4 Photos: Quad Editorial Collage (1 wide banner, 3 balanced grid columns below)
      // Choose the image with the largest width (highest resolution/panoramic potential) for the top wide hero banner
      let featuredIdxToUse = 0;
      let maxWidth = 0;
      images.forEach((img, idx) => {
        if (img.width > maxWidth) {
          maxWidth = img.width;
          featuredIdxToUse = idx;
        }
      });
      const featuredImage = images[featuredIdxToUse];
      const featuredAbs = sectionStartIndex + featuredIdxToUse;

      const remainingImages = images.filter((_, idx) => idx !== featuredIdxToUse);
      const remainingAbs: number[] = [];
      images.forEach((_, idx) => {
        if (idx !== featuredIdxToUse) {
          remainingAbs.push(sectionStartIndex + idx);
        }
      });

      return (
        <div className="space-y-6 max-w-6xl mx-auto">
          {/* Top wide horizontal collage hero */}
          <div
            onClick={() => setLightboxIndex(featuredAbs)}
            className="group relative overflow-hidden rounded-3xl border border-white/60 bg-[rgba(248,243,234,0.85)] shadow-sm transition-all duration-300 cursor-pointer"
          >
            <div className="relative aspect-[16/9] md:aspect-[16/8] w-full overflow-hidden">
              <GalleryImage
                src={featuredImage.src}
                srcSet={featuredImage.srcset}
                alt={featuredImage.alt && featuredImage.alt !== "Eden Estate gallery image" ? featuredImage.alt : `${section.title} at Eden Estate`}
                width={featuredImage.width}
                height={featuredImage.height}
                sizes="(min-width: 1024px) 70vw, 100vw"
                index={featuredAbs}
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>
            <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/15 z-10 pointer-events-none" />
            <span className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-t from-black/25 via-transparent to-black/5 opacity-35" />
            {renderPhotoNumberOverlay(featuredImage.src)}
          </div>

          {/* Bottom aligned triple grid row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {remainingImages.map((img, idx) => {
              const absoluteIndex = remainingAbs[idx];
              return (
                <div
                  key={img.src}
                  onClick={() => setLightboxIndex(absoluteIndex)}
                  className="group relative overflow-hidden rounded-3xl border border-white/60 bg-[rgba(248,243,234,0.85)] shadow-sm transition-all duration-300 cursor-pointer"
                >
                  <div className="relative aspect-[3/2] w-full overflow-hidden">
                    <GalleryImage
                      src={img.src}
                      srcSet={img.srcset}
                      alt={img.alt && img.alt !== "Eden Estate gallery image" ? img.alt : `${section.title} at Eden Estate`}
                      width={img.width}
                      height={img.height}
                      sizes="(min-width: 768px) 30vw, 100vw"
                      index={absoluteIndex}
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                  </div>
                  <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/15 z-10 pointer-events-none" />
                  <span className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-t from-black/20 via-transparent to-black/5 opacity-30" />
                  {renderPhotoNumberOverlay(img.src)}
                </div>
              );
            })}
          </div>
        </div>
      );
    }

    // 5+ Photos: Dynamic JS-Based Masonry Grid per section
    return (
      <div className="masonry-grid">
        {images.map((image, idx) => {
          const absoluteIndex = sectionStartIndex + idx;
          const altText =
            image.alt && image.alt !== "Eden Estate gallery image"
              ? image.alt
              : `${section.title} at Eden Estate`;

          return (
            <MasonryItem
              key={`${section.title}-${image.src}`}
              aspectRatio={image.height / image.width}
              className="group relative overflow-hidden rounded-3xl border border-white/60 bg-[rgba(248,243,234,0.85)] shadow-sm cursor-pointer animate-fade-up"
            >
              <div onClick={() => setLightboxIndex(absoluteIndex)} className="overflow-hidden">
                <GalleryImage
                  src={image.src}
                  srcSet={image.srcset}
                  alt={altText}
                  width={image.width}
                  height={image.height}
                  sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                  index={absoluteIndex}
                  className="pointer-events-none h-full"
                />
              </div>
              <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/15 z-10 pointer-events-none" />
              <span className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-t from-black/20 via-transparent to-black/10 opacity-30" />
              {renderPhotoNumberOverlay(image.src)}
            </MasonryItem>
          );
        })}
      </div>
    );
  }



  let runningImageIndex = 0;

  return (
    <div className="lux-container space-y-20 md:space-y-28">
      {sections.map((section) => {
        const sectionStartIndex = runningImageIndex;
        runningImageIndex += section.images.length;

        return (
          <article key={section.title} className="space-y-8 animate-fade-up">
            {/* Editorial Header info for Section */}
            <div className="border-b border-stone-200/80 pb-4 mb-6">
              <h3 className="text-2xl font-serif tracking-tight text-stone-900 font-medium">
                {section.title}
              </h3>
            </div>

            {/* Render conditional photos layout */}
            {renderSectionPhotos(section, sectionStartIndex)}
          </article>
        );
      })}

      {/* Global Interactive Lightbox Modal */}
      {lightboxIndex !== null && (() => {
        const currentImage = normalizedImages[lightboxIndex];
        const sectionImages = normalizedImages.filter(img => img.sectionTitle === currentImage.sectionTitle);
        const indexInSection = sectionImages.findIndex(img => img.image.src === currentImage.image.src);
        const totalInSection = sectionImages.length;

        return (
          <div className="fixed inset-0 z-50 flex flex-col items-center justify-between bg-black p-4 md:p-6 select-none backdrop-blur-md">
            {/* Top Navigation Bar */}
            <div className="w-full flex items-center justify-between z-50 py-2 px-4 bg-gradient-to-b from-black/60 to-transparent">
              <div className="text-left">
                <h4 className="text-[10px] md:text-xs font-bold tracking-[0.25em] text-[#c2a060] uppercase">
                  {currentImage.sectionTitle}
                </h4>
                <div className="mt-0.5 text-xs text-stone-400 font-medium">
                  {indexInSection + 1} of {totalInSection}
                </div>
              </div>
              <button
                onClick={() => setLightboxIndex(null)}
                className="flex h-10 w-10 md:h-12 md:w-12 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 active:scale-95 transition-all shadow-md cursor-pointer"
                aria-label="Close lightbox"
              >
                <svg className="h-5 w-5 md:h-6 md:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Immersive Image Display Container */}
            <div className="relative flex-1 w-full max-w-5xl my-4 flex items-center justify-center">
              {/* Prev button (floating left on larger viewports, or hidden on touch and placed below) */}
              <button
                disabled={lightboxIndex === 0}
                onClick={() => setLightboxIndex((prev) => (prev !== null ? prev - 1 : null))}
                className="absolute left-0 md:-left-16 z-50 flex h-12 w-12 md:h-14 md:w-14 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 disabled:opacity-20 disabled:pointer-events-none transition-all shadow-md cursor-pointer active:scale-95"
                aria-label="Previous image"
              >
                <svg className="h-6 w-6 md:h-7 md:w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              {/* Image Frame */}
              <div className="relative w-full h-full max-h-[68vh] md:max-h-[76vh] flex items-center justify-center overflow-hidden">
                <img
                  src={currentImage.image.src}
                  alt={currentImage.image.alt || "Gallery image"}
                  className="max-h-full max-w-full rounded-xl md:rounded-2xl object-contain shadow-2xl border border-white/10 select-none pointer-events-none"
                />
              </div>

              {/* Next button */}
              <button
                disabled={lightboxIndex === normalizedImages.length - 1}
                onClick={() => setLightboxIndex((prev) => (prev !== null ? prev + 1 : null))}
                className="absolute right-0 md:-right-16 z-50 flex h-12 w-12 md:h-14 md:w-14 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 disabled:opacity-20 disabled:pointer-events-none transition-all shadow-md cursor-pointer active:scale-95"
                aria-label="Next image"
              >
                <svg className="h-6 w-6 md:h-7 md:w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            {/* Bottom Caption & Total Progress bar */}
            <div className="w-full max-w-2xl text-center pb-2 px-4 z-40 bg-gradient-to-t from-black/60 to-transparent">
              <p className="text-sm md:text-base text-stone-200 font-serif italic max-w-xl mx-auto leading-relaxed">
                {currentImage.image.alt && currentImage.image.alt !== "Eden Estate gallery image"
                  ? currentImage.image.alt
                  : "Scenes from Eden Estate"}
              </p>
              <div className="mt-3 text-[10px] font-semibold text-stone-500 tracking-[0.2em] uppercase">
                Image {lightboxIndex + 1} of {normalizedImages.length} overall
              </div>
            </div>
          </div>
        );
      })()}
    </div>
  );
}
