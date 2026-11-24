"use client";

import { useEffect, useMemo, useRef, useSyncExternalStore } from "react";
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

/** Gap between tiles expressed as a fraction of one column's width (≈16–20px). */
const GAP_RATIO = 0.05;
const LG_QUERY = "(min-width: 1024px)";

/** 2 columns below lg (phone + tablet), 3 from lg. Server/hydration render uses 3. */
function useColumnCount(): number {
  return useSyncExternalStore(
    (onChange) => {
      const mql = window.matchMedia(LG_QUERY);
      mql.addEventListener("change", onChange);
      return () => mql.removeEventListener("change", onChange);
    },
    () => (window.matchMedia(LG_QUERY).matches ? 3 : 2),
    () => 3,
  );
}

type ColumnLayout = { items: number[]; scale: number }[];

/** Height of a column in column-width units, before any scaling. */
function columnHeight(ratios: number[], items: number[]) {
  return items.reduce((sum, i) => sum + ratios[i], 0) + GAP_RATIO * Math.max(0, items.length - 1);
}

/** How much each column's tiles must scale so every column ends on the same line. */
function scoreColumns(ratios: number[], cols: number[][]) {
  const heights = cols.map((c) => columnHeight(ratios, c));
  const target = heights.reduce((a, b) => a + b, 0) / cols.length;
  const scales = cols.map((c) => {
    const content = c.reduce((sum, i) => sum + ratios[i], 0);
    return content > 0 ? (target - GAP_RATIO * Math.max(0, c.length - 1)) / content : Infinity;
  });
  return { worst: Math.max(...scales.map((x) => Math.abs(x - 1))), scales };
}

/**
 * Splits photos into `count` columns whose heights match as closely as possible,
 * so each section ends on one clean line instead of ragged masonry holes.
 * Greedy shortest-column fill, then move/swap refinement. Within a column the
 * curated order is kept. Deterministic, so server and client agree.
 */
function balanceColumns(ratios: number[], count: number): ColumnLayout {
  let cols: number[][] = Array.from({ length: count }, () => []);
  const heights = new Array(count).fill(0);
  ratios.forEach((r, i) => {
    const k = heights.indexOf(Math.min(...heights));
    cols[k].push(i);
    heights[k] += r + GAP_RATIO;
  });

  let best = scoreColumns(ratios, cols).worst;
  for (let pass = 0; pass < 50; pass++) {
    let improved = false;
    for (let a = 0; a < count && !improved; a++) {
      for (let b = 0; b < count && !improved; b++) {
        if (a === b) continue;
        for (const i of cols[a]) {
          if (cols[a].length > 1) {
            const moved = cols.map((c) => [...c]);
            moved[a] = moved[a].filter((x) => x !== i);
            moved[b].push(i);
            const score = scoreColumns(ratios, moved).worst;
            if (score < best - 1e-9) {
              cols = moved;
              best = score;
              improved = true;
              break;
            }
          }
          for (const j of cols[b]) {
            const swapped = cols.map((c) => [...c]);
            swapped[a] = swapped[a].map((x) => (x === i ? j : x));
            swapped[b] = swapped[b].map((x) => (x === j ? i : x));
            const score = scoreColumns(ratios, swapped).worst;
            if (score < best - 1e-9) {
              cols = swapped;
              best = score;
              improved = true;
              break;
            }
          }
          if (improved) break;
        }
      }
    }
    if (!improved) break;
  }

  const sorted = cols.map((c) => [...c].sort((x, y) => x - y));
  const { scales } = scoreColumns(ratios, sorted);
  return sorted.map((items, k) => ({ items, scale: scales[k] }));
}

/**
 * Balanced editorial masonry: photos are split into equal-height columns and
 * each tile gets a reserved aspect-ratio (no layout shift). Tiles in a column
 * share any leftover pixels via flex-grow, so all columns end flush.
 */
function BalancedMasonry({
  section,
  sectionStartIndex,
}: {
  section: GallerySection;
  sectionStartIndex: number;
}) {
  const columnCount = useColumnCount();
  const ratios = useMemo(
    () => section.images.map((img) => img.height / img.width),
    [section.images],
  );
  const layout = useMemo(() => balanceColumns(ratios, columnCount), [ratios, columnCount]);

  return (
    <div className="flex items-stretch gap-2 sm:gap-4 md:gap-5">
      {layout.map((column, colIdx) => (
        <div key={colIdx} className="flex min-w-0 flex-1 flex-col gap-2 sm:gap-4 md:gap-5">
          {column.items.map((i) => {
            const image = section.images[i];
            const absoluteIndex = sectionStartIndex + i;
            const altText =
              image.alt && image.alt !== "Eden Estate gallery image"
                ? image.alt
                : `${section.title} at Eden Estate`;
            const tileRatio = ratios[i] * column.scale;

            return (
              <div
                key={`${section.title}-${image.src}`}
                className="group relative overflow-hidden rounded-xl bg-[rgba(248,243,234,0.85)] sm:rounded-2xl"
                style={{ aspectRatio: `1 / ${tileRatio}`, flexGrow: tileRatio }}
              >
                <GalleryImage
                  src={image.src}
                  srcSet={image.srcset}
                  avifSrcSet={image.avifSrcset}
                  alt={altText}
                  width={image.width}
                  height={image.height}
                  sizes="(min-width: 1024px) 360px, 50vw"
                  index={absoluteIndex}
                  className="pointer-events-none absolute inset-0 !h-full"
                />
                <div className="pointer-events-none absolute inset-0 z-10 bg-black/0 transition-colors duration-300 group-hover:bg-black/5" />
              </div>
            );
          })}
        </div>
      ))}
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

    // 5+ Photos: balanced equal-height columns
    return <BalancedMasonry section={section} sectionStartIndex={sectionStartIndex} />;
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
