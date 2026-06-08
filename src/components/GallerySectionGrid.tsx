"use client";

import { useEffect, useLayoutEffect, useRef, useCallback } from "react";
import type { ReactNode } from "react";
import { GalleryImage } from "@/components/GalleryImage";
import type { GallerySection } from "@/types/gallery";

/**
 * IntersectionObserver-driven fade-in wrapper.
 * Replaces the old unconditional animate-fade-up that fired for all 89 images
 * at mount — causing blank/invisible images and massive initial paint cost.
 */
function FadeInWrapper({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // If IntersectionObserver isn't supported, just show immediately
    if (typeof IntersectionObserver === "undefined") {
      el.classList.add("is-visible");
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "400px 0px", threshold: 0.01 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const classes = ["gallery-fade-in"];
  if (className) classes.push(className);

  return (
    <div ref={ref} className={classes.join(" ")}>
      {children}
    </div>
  );
}

type Props = {
  sections: GallerySection[];
};

const DEFAULT_AUTO_ROW_HEIGHT = 8;

/**
 * Container-level masonry controller.
 *
 * Replaces the previous per-item approach (one ResizeObserver + one rAF per
 * tile, mutating layout after paint) which caused visible reflow/"glitch" as
 * tiles snapped to size. Here a single ResizeObserver watches the grid, and on
 * each change we do ONE batched read phase (collect every tile width) followed
 * by ONE batched write phase (apply every span) to avoid layout thrashing.
 * The first pass runs in useLayoutEffect so spans are set before the browser
 * paints — no flash of mis-sized tiles. Each tile also reserves its space via
 * aspect-ratio on the <img>, so there is zero layout shift before JS runs.
 */
function MasonryGrid({ children }: { children: ReactNode }) {
  const gridRef = useRef<HTMLDivElement | null>(null);
  const rafRef = useRef<number>(0);

  const applyLayout = useCallback(() => {
    const grid = gridRef.current;
    if (!grid) return;

    const computed = window.getComputedStyle(grid);
    const gap =
      Number.parseFloat(computed.getPropertyValue("row-gap")) ||
      Number.parseFloat(computed.getPropertyValue("gap")) ||
      0;
    const autoRowHeight =
      Number.parseFloat(computed.getPropertyValue("grid-auto-rows")) ||
      DEFAULT_AUTO_ROW_HEIGHT;
    if (autoRowHeight <= 0) return;

    const items = Array.from(grid.children) as HTMLElement[];

    // READ phase: gather every measurement first (no writes interleaved).
    const measurements = items.map((item) => {
      const aspectRatio = Number.parseFloat(item.dataset.aspectRatio ?? "");
      const width = item.getBoundingClientRect().width;
      return { item, aspectRatio, width };
    });

    // WRITE phase: apply all spans/heights together.
    for (const { item, aspectRatio, width } of measurements) {
      if (!Number.isFinite(aspectRatio) || aspectRatio <= 0 || width === 0) {
        item.style.removeProperty("grid-row-end");
        item.style.removeProperty("height");
        continue;
      }
      const targetHeight = width * aspectRatio;
      const rowSpan = Math.max(
        1,
        Math.ceil((targetHeight + gap) / (autoRowHeight + gap)),
      );
      item.style.gridRowEnd = `span ${rowSpan}`;
      item.style.height = `${targetHeight}px`;
    }
  }, []);

  const scheduledLayout = useCallback(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(applyLayout);
  }, [applyLayout]);

  // Run before paint so tiles are never shown at the wrong size.
  useLayoutEffect(() => {
    applyLayout();
  }, [applyLayout]);

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;

    if (typeof ResizeObserver === "function") {
      const observer = new ResizeObserver(scheduledLayout);
      observer.observe(grid);
      return () => {
        if (rafRef.current) cancelAnimationFrame(rafRef.current);
        observer.disconnect();
      };
    }

    window.addEventListener("resize", scheduledLayout);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", scheduledLayout);
    };
  }, [scheduledLayout]);

  return (
    <div ref={gridRef} className="masonry-grid">
      {children}
    </div>
  );
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
  const classes = ["masonry-item"];
  if (className && className.trim().length > 0) {
    classes.push(className);
  }

  return (
    <div className={classes.join(" ")} data-aspect-ratio={aspectRatio}>
      {children}
    </div>
  );
}

export function GallerySectionGrid({ sections }: Props) {
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
            className="group relative overflow-hidden rounded-3xl border border-white/60 bg-[rgba(248,243,234,0.85)] shadow-sm transition-all duration-300 w-full"
            style={{ maxWidth: isPortrait ? "420px" : "1000px" }}
          >
            <div className={aspectClass}>
              <GalleryImage
                src={img.src}
                srcSet={img.srcset}
                avifSrcSet={img.avifSrcset}
                alt={altText}
                width={img.width}
                height={img.height}
                sizes={isPortrait ? "(min-width: 768px) 33vw, 100vw" : "(min-width: 1024px) 70vw, 100vw"}
                index={absoluteIndex}
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>
            <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/5 z-10 pointer-events-none" />
            <span className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-t from-black/20 via-transparent to-black/5 opacity-30" />
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
                className="group relative overflow-hidden rounded-3xl border border-white/60 bg-[rgba(248,243,234,0.85)] shadow-sm transition-all duration-300"
              >
                <div className="relative aspect-[3/4] w-full overflow-hidden">
                  <GalleryImage
                    src={img.src}
                    srcSet={img.srcset}
                    avifSrcSet={img.avifSrcset}
                    alt={alt}
                    width={img.width}
                    height={img.height}
                    sizes="(min-width: 768px) 33vw, 50vw"
                    index={abs}
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                </div>
                <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/5 z-10 pointer-events-none" />
                <span className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-t from-black/20 via-transparent to-black/5 opacity-30" />
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
                className="group relative overflow-hidden rounded-3xl border border-white/60 bg-[rgba(248,243,234,0.85)] shadow-sm transition-all duration-300"
              >
                <div className="relative aspect-[3/2] w-full overflow-hidden">
                  <GalleryImage
                    src={img.src}
                    srcSet={img.srcset}
                    avifSrcSet={img.avifSrcset}
                    alt={alt}
                    width={img.width}
                    height={img.height}
                    sizes="(min-width: 768px) 40vw, 100vw"
                    index={abs}
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                </div>
                <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/5 z-10 pointer-events-none" />
                <span className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-t from-black/20 via-transparent to-black/5 opacity-30" />
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
              className="md:col-span-3 group relative overflow-hidden rounded-3xl border border-white/60 bg-[rgba(248,243,234,0.85)] shadow-sm transition-all duration-300 h-[320px] sm:h-[400px] md:h-[460px]"
            >
              <div className="relative h-full w-full overflow-hidden">
                <GalleryImage
                  src={isPort1 ? img2.src : img1.src}
                  srcSet={isPort1 ? img2.srcset : img1.srcset}
                  avifSrcSet={isPort1 ? img2.avifSrcset : img1.avifSrcset}
                  alt={isPort1 ? alt2 : alt1}
                  width={isPort1 ? img2.width : img1.width}
                  height={isPort1 ? img2.height : img1.height}
                  sizes="(min-width: 768px) 50vw, 100vw"
                  index={isPort1 ? abs2 : abs1}
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </div>
              <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/5 z-10 pointer-events-none" />
              <span className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-t from-black/20 via-transparent to-black/5 opacity-30" />
            </div>
            {/* Portrait photo (takes 2/5 width) */}
            <div
              className="md:col-span-2 group relative overflow-hidden rounded-3xl border border-white/60 bg-[rgba(248,243,234,0.85)] shadow-sm transition-all duration-300 h-[320px] sm:h-[400px] md:h-[460px]"
            >
              <div className="relative h-full w-full overflow-hidden">
                <GalleryImage
                  src={isPort1 ? img1.src : img2.src}
                  srcSet={isPort1 ? img1.srcset : img2.srcset}
                  avifSrcSet={isPort1 ? img1.avifSrcset : img2.avifSrcset}
                  alt={isPort1 ? alt1 : alt2}
                  width={isPort1 ? img1.width : img2.width}
                  height={isPort1 ? img1.height : img2.height}
                  sizes="(min-width: 768px) 35vw, 100vw"
                  index={isPort1 ? abs1 : abs2}
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </div>
              <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/5 z-10 pointer-events-none" />
              <span className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-t from-black/20 via-transparent to-black/5 opacity-30" />
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
                  className="group relative overflow-hidden rounded-3xl border border-white/60 bg-[rgba(248,243,234,0.85)] shadow-sm transition-all duration-300"
                >
                  <div className="relative aspect-[3/4] w-full overflow-hidden">
                    <GalleryImage
                      src={img.src}
                      srcSet={img.srcset}
                      avifSrcSet={img.avifSrcset}
                      alt={img.alt && img.alt !== "Eden Estate gallery image" ? img.alt : `${section.title} at Eden Estate`}
                      width={img.width}
                      height={img.height}
                      sizes="(min-width: 768px) 30vw, 100vw"
                      index={absoluteIndex}
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                  </div>
                  <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/5 z-10 pointer-events-none" />
                  <span className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-t from-black/20 via-transparent to-black/5 opacity-30" />
                </div>
              );
            })}
          </div>
        );
      } else {
        // Mixed: Height-matched Editorial Hero Collage (Left = large landscape featured, Right = vertical stack of 2)
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
              className="md:col-span-8 group relative overflow-hidden rounded-3xl border border-white/60 bg-[rgba(248,243,234,0.85)] shadow-sm transition-all duration-300 h-[320px] sm:h-[450px] md:h-[500px]"
            >
              <div className="relative h-full w-full overflow-hidden">
                <GalleryImage
                  src={featuredImage.src}
                  srcSet={featuredImage.srcset}
                  avifSrcSet={featuredImage.avifSrcset}
                  alt={featuredImage.alt && featuredImage.alt !== "Eden Estate gallery image" ? featuredImage.alt : `${section.title} at Eden Estate`}
                  width={featuredImage.width}
                  height={featuredImage.height}
                  sizes="(min-width: 1024px) 50vw, (min-width: 768px) 66vw, 100vw"
                  index={featuredAbs}
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </div>
              <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/5 z-10 pointer-events-none" />
              <span className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-t from-black/25 via-transparent to-black/5 opacity-35" />
            </div>

            {/* Right stacked dual column */}
            <div className="md:col-span-4 flex flex-col justify-between gap-6 md:h-[500px]">
              {remainingImages.map((img, idx) => {
                const absoluteIndex = remainingAbs[idx];
                return (
                  <div
                    key={img.src}
                    className="flex-1 group relative overflow-hidden rounded-3xl border border-white/60 bg-[rgba(248,243,234,0.85)] shadow-sm transition-all duration-300 h-[200px] md:h-[238px]"
                  >
                    <div className="relative h-full w-full overflow-hidden">
                      <GalleryImage
                        src={img.src}
                        srcSet={img.srcset}
                        avifSrcSet={img.avifSrcset}
                        alt={img.alt && img.alt !== "Eden Estate gallery image" ? img.alt : `${section.title} at Eden Estate`}
                        width={img.width}
                        height={img.height}
                        sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 100vw"
                        index={absoluteIndex}
                        className="absolute inset-0 h-full w-full object-cover"
                      />
                    </div>
                    <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/5 z-10 pointer-events-none" />
                    <span className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-t from-black/20 via-transparent to-black/5 opacity-30" />
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
            className="group relative overflow-hidden rounded-3xl border border-white/60 bg-[rgba(248,243,234,0.85)] shadow-sm transition-all duration-300"
          >
            <div className="relative aspect-[16/9] md:aspect-[16/8] w-full overflow-hidden">
              <GalleryImage
                src={featuredImage.src}
                srcSet={featuredImage.srcset}
                avifSrcSet={featuredImage.avifSrcset}
                alt={featuredImage.alt && featuredImage.alt !== "Eden Estate gallery image" ? featuredImage.alt : `${section.title} at Eden Estate`}
                width={featuredImage.width}
                height={featuredImage.height}
                sizes="(min-width: 1024px) 70vw, 100vw"
                index={featuredAbs}
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>
            <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/5 z-10 pointer-events-none" />
            <span className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-t from-black/25 via-transparent to-black/5 opacity-35" />
          </div>

          {/* Bottom aligned triple grid row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {remainingImages.map((img, idx) => {
              const absoluteIndex = remainingAbs[idx];
              return (
                <div
                  key={img.src}
                  className="group relative overflow-hidden rounded-3xl border border-white/60 bg-[rgba(248,243,234,0.85)] shadow-sm transition-all duration-300"
                >
                  <div className="relative aspect-[3/2] w-full overflow-hidden">
                    <GalleryImage
                      src={img.src}
                      srcSet={img.srcset}
                      avifSrcSet={img.avifSrcset}
                      alt={img.alt && img.alt !== "Eden Estate gallery image" ? img.alt : `${section.title} at Eden Estate`}
                      width={img.width}
                      height={img.height}
                      sizes="(min-width: 768px) 30vw, 100vw"
                      index={absoluteIndex}
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                  </div>
                  <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/5 z-10 pointer-events-none" />
                  <span className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-t from-black/20 via-transparent to-black/5 opacity-30" />
                </div>
              );
            })}
          </div>
        </div>
      );
    }

    // 5+ Photos: Dynamic JS-Based Masonry Grid per section
    return (
      <MasonryGrid>
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
              className="group relative overflow-hidden rounded-3xl border border-white/60 bg-[rgba(248,243,234,0.85)] shadow-sm"
            >
              <div className="overflow-hidden">
                <GalleryImage
                  src={image.src}
                  srcSet={image.srcset}
                  avifSrcSet={image.avifSrcset}
                  alt={altText}
                  width={image.width}
                  height={image.height}
                  sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                  index={absoluteIndex}
                  className="pointer-events-none h-full"
                />
              </div>
              <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/5 z-10 pointer-events-none" />
              <span className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-t from-black/20 via-transparent to-black/10 opacity-30" />
            </MasonryItem>
          );
        })}
      </MasonryGrid>
    );
  }

  let runningImageIndex = 0;

  return (
    <div className="lux-container space-y-20 md:space-y-28">
      {sections.map((section) => {
        const sectionStartIndex = runningImageIndex;
        runningImageIndex += section.images.length;

        return (
          <article key={section.title} className="space-y-8">
            {/* Editorial Header info for Section */}
            <div className="border-b border-stone-200/80 pb-4 mb-6">
              <h3 className="text-2xl font-serif tracking-tight text-stone-900 font-medium">
                {section.title}
              </h3>
            </div>

            {/* Render conditional photos layout */}
            <FadeInWrapper>
              {renderSectionPhotos(section, sectionStartIndex)}
            </FadeInWrapper>
          </article>
        );
      })}
    </div>
  );
}
