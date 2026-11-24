"use client";

import { useMemo, useState } from "react";

function getPlatformUrl(platform: string): string {
  const norm = platform.toLowerCase().trim();
  if (norm.includes("airbnb")) {
    return "https://www.airbnb.com/rooms/42793723";
  }
  if (norm.includes("vrbo") || norm.includes("expedia")) {
    return "https://www.vrbo.com/1958794";
  }
  if (norm.includes("knot")) {
    return "https://www.theknot.com/marketplace/edenthe-lemelson-estate-stowe-vt-2087322";
  }
  if (norm.includes("weddingwire") || norm.includes("wedding wire")) {
    return "https://www.weddingwire.com/biz/eden-the-lemelson-estate/393d590ddd940149.html";
  }
  if (norm.includes("facebook")) {
    return "https://www.facebook.com/p/Eden-The-Lemelson-Estate-100087154695200/";
  }
  if (norm.includes("zola")) {
    return "https://www.zola.com/wedding-vendors/wedding-venues/eden-the-lemelson-estate";
  }
  return "#";
}

export function PlatformBadge({ platform, className = "" }: { platform: string; className?: string }) {
  const norm = platform.toLowerCase().trim();
  const url = getPlatformUrl(platform);
  const baseClass =
    "inline-flex items-center justify-center transition-opacity duration-200 hover:opacity-80 focus-visible:opacity-80";

  if (norm.includes("airbnb")) {
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className={`${baseClass} ${className}`}
        aria-label="View verified listing on Airbnb"
      >
        <span
          role="img"
          aria-label="Airbnb"
          className="inline-block h-5 w-[64px] bg-[#FF385C]"
          style={{
            WebkitMaskImage: "url('/Airbnb_Logo_0.svg')",
            maskImage: "url('/Airbnb_Logo_0.svg')",
            WebkitMaskRepeat: "no-repeat",
            maskRepeat: "no-repeat",
            WebkitMaskPosition: "center",
            maskPosition: "center",
            WebkitMaskSize: "contain",
            maskSize: "contain",
          }}
        />
      </a>
    );
  }
  if (norm.includes("vrbo") || norm.includes("expedia")) {
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className={`${baseClass} ${className}`}
        aria-label="View verified listing on Vrbo"
      >
        <img
          src="/Vrbo_idJM8XKT4-_1.svg"
          alt="Vrbo"
          className="h-5 w-auto object-contain"
        />
      </a>
    );
  }
  if (norm.includes("knot")) {
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className={`${baseClass} ${className}`}
        aria-label="View verified listing on The Knot"
      >
        <span
          role="img"
          aria-label="The Knot"
          className="inline-block h-5 w-[82px] bg-[#FF44CB]"
          style={{
            WebkitMaskImage: "url('/the-knot-wordmark.svg')",
            maskImage: "url('/the-knot-wordmark.svg')",
            WebkitMaskRepeat: "no-repeat",
            maskRepeat: "no-repeat",
            WebkitMaskPosition: "center",
            maskPosition: "center",
            WebkitMaskSize: "contain",
            maskSize: "contain",
          }}
        />
      </a>
    );
  }
  if (norm.includes("weddingwire") || norm.includes("wedding wire")) {
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className={`${baseClass} ${className}`}
        aria-label="View verified listing on WeddingWire"
      >
        <img
          src="/WeddingWire_idGDCwR69F_1.svg"
          alt="WeddingWire"
          className="h-5 w-auto object-contain"
        />
      </a>
    );
  }
  if (norm.includes("facebook")) {
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className={`${baseClass} ${className}`}
        aria-label="View verified page on Facebook"
      >
        <span className="inline-flex items-center gap-1.5 font-sans text-sm font-bold tracking-normal leading-none text-[#1877F2]">
          <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
          </svg>
          <span>Facebook</span>
        </span>
      </a>
    );
  }
  if (norm.includes("zola")) {
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className={`${baseClass} ${className}`}
        aria-label="View verified listing on Zola"
      >
        <img
          src="/id56oBQafI_1758992156050.png"
          alt="Zola"
          className="h-5 w-auto object-contain"
        />
      </a>
    );
  }
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={`${baseClass} text-stone-700 ${className}`}
      aria-label={`View verified listing on ${platform}`}
    >
      <span className="text-xs font-semibold tracking-normal">{platform}</span>
    </a>
  );
}

export function PerfectReviewsBadge({
  reviewCount = 0,
  countLabel = "reviews",
}: {
  reviewCount?: number;
  countLabel?: string;
}) {
  return (
    <div className="flex items-center gap-4 rounded-xl border border-stone-200 bg-white/90 px-5 py-3 text-stone-950 shadow-[0_12px_32px_-12px_rgba(58,45,20,0.12)] backdrop-blur-sm">
      <div className="flex flex-col items-center leading-none">
        <span className="text-2xl font-semibold tracking-tight text-stone-900">{reviewCount}</span>
        <span className="mt-1.5 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-stone-700">
          {countLabel}
        </span>
      </div>
      <span className="text-xl font-normal text-stone-400" aria-hidden>
        |
      </span>
      <div className="flex flex-col items-center leading-none">
        <span className="text-2xl font-semibold tracking-tight text-stone-900">5-Star</span>
        <span className="mt-1.5 flex items-center gap-0.5 text-[var(--color-gold)]" aria-hidden>
          {Array.from({ length: 5 }).map((_, starIndex) => (
            <svg key={`carousel-star-${starIndex}`} viewBox="0 0 24 24" className="h-4 w-4 fill-current">
              <path d="M12 2.25l2.35 6.36 6.9.22-5.38 4.26 1.89 6.66-5.76-3.67-5.76 3.67 1.89-6.66-5.38-4.26 6.9-.22L12 2.25z" />
            </svg>
          ))}
        </span>
      </div>
    </div>
  );
}

export type Testimonial = {
  title?: string;
  quote: string;
  name: string;
  detail?: string;
  month?: string;
  year?: string;
  platform?: string;
};

type TestimonialCarouselProps = {
  testimonials: Testimonial[];
};

export function TestimonialCarousel({
  testimonials,
}: TestimonialCarouselProps) {
  const [page, setPage] = useState(0);
  const items = useMemo(() => testimonials.filter(Boolean), [testimonials]);

  if (items.length === 0) {
    return null;
  }

  const pageSize = 3;
  const totalPages = Math.max(1, Math.ceil(items.length / pageSize));
  const safePage = page % totalPages;
  const start = safePage * pageSize;
  const visibleItems = Array.from({ length: Math.min(pageSize, items.length) }, (_, offset) => {
    return items[(start + offset) % items.length];
  });

  const handlePrev = () => {
    setPage((prev) => (prev - 1 + totalPages) % totalPages);
  };

  const handleNext = () => {
    setPage((prev) => (prev + 1) % totalPages);
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-5">
        {visibleItems.map((item, idx) => {
          const dateLabel = item.month && item.year ? `${item.month} ${item.year}` : item.detail;
          return (
            <article
              key={`${item.name}-${start + idx}`}
              className="flex h-full flex-col rounded-2xl border border-white/70 bg-gradient-to-b from-white/95 to-white/85 p-5 text-sm text-stone-800 shadow-[0_20px_45px_-20px_rgba(30,30,40,0.35)]"
            >
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-0.5 text-[#b59a62]" aria-label="5 out of 5 stars">
                  {Array.from({ length: 5 }).map((_, starIdx) => (
                    <svg key={starIdx} viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden="true">
                      <path d="M12 2.25l2.35 6.36 6.9.22-5.38 4.26 1.89 6.66-5.76-3.67-5.76 3.67 1.89-6.66-5.38-4.26 6.9-.22L12 2.25z" />
                    </svg>
                  ))}
                </div>
                {item.platform ? (
                  <div className="shrink-0">
                    <PlatformBadge platform={item.platform} />
                  </div>
                ) : null}
              </div>

              {item.title ? (
                <h3 className="mt-2.5 ![font-family:var(--font-body)] text-[0.95rem] font-semibold leading-snug tracking-normal text-stone-900 text-balance">
                  {item.title}
                </h3>
              ) : null}

              <blockquote className="mt-2 leading-6 text-[0.925rem] text-stone-700 text-pretty">
                <span className="text-[1.02rem] font-medium text-stone-600">“</span>
                {item.quote}
                <span className="text-[1.02rem] font-medium text-stone-600">”</span>
              </blockquote>

              <footer className="mt-auto border-t border-stone-200/70 pt-3.5">
                <p className="truncate text-xs text-stone-600">
                  <span className="font-semibold text-stone-900">{item.name}</span>
                  {dateLabel ? ` · ${dateLabel}` : ""}
                </p>
              </footer>
            </article>
          );
        })}
      </div>

      {totalPages > 1 ? (
        <div className="flex items-center justify-center gap-4">
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Previous reviews"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-stone-300/80 bg-white/90 text-stone-800 transition hover:border-stone-500 hover:bg-white"
          >
            <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.75" className="h-4 w-4" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12.5 5l-5 5 5 5" />
            </svg>
          </button>

          <div className="flex items-center gap-2">
            {Array.from({ length: totalPages }).map((_, idx) => {
              const isActive = idx === safePage;
              return (
                <button
                  key={`review-page-${idx}`}
                  type="button"
                  onClick={() => setPage(idx)}
                  aria-label={`Show review group ${idx + 1}`}
                  className={`h-2 rounded-full transition-all duration-200 ${
                    isActive ? "w-6 bg-stone-900" : "w-2 bg-stone-400/60 hover:bg-stone-600"
                  }`}
                />
              );
            })}
          </div>

          <button
            type="button"
            onClick={handleNext}
            aria-label="Next reviews"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-stone-300/80 bg-white/90 text-stone-800 transition hover:border-stone-500 hover:bg-white"
          >
            <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.75" className="h-4 w-4" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 5l5 5-5 5" />
            </svg>
          </button>
        </div>
      ) : null}
    </div>
  );
}
