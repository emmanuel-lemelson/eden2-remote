"use client";

import type { CSSProperties } from "react";
import { useEffect, useMemo, useRef, useState } from "react";

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
  const baseClass = "inline-flex items-center justify-center rounded-full transition-all duration-200 hover:scale-105 hover:shadow-md cursor-pointer active:scale-95";
  
  if (norm.includes("airbnb")) {
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className={`${baseClass} bg-[#FF385C] px-3 py-1.5 shadow-[0_4px_12px_-4px_rgba(255,56,92,0.35)] border border-[#FF385C]/20 ${className}`}
        aria-label="View verified listing on Airbnb"
      >
        <img
          src="/Airbnb_Logo_0.svg"
          alt="Airbnb"
          className="h-4 w-auto object-contain"
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
        className={`${baseClass} bg-white px-3 py-1.5 shadow-[0_4px_12px_-4px_rgba(0,0,0,0.06)] border border-stone-200 ${className}`}
        aria-label="View verified listing on Vrbo"
      >
        <img
          src="/Vrbo_idJM8XKT4-_1.svg"
          alt="Vrbo"
          className="h-4.5 w-auto object-contain"
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
        className={`${baseClass} bg-[#FF44CB] px-2.5 py-1 shadow-[0_4px_12px_-4px_rgba(255,68,203,0.35)] border border-[#FF44CB]/20 ${className}`}
        aria-label="View verified listing on The Knot"
      >
        <img
          src="/idzSo3ACCf_logos.jpeg"
          alt="The Knot"
          className="h-4 w-4 rounded-sm object-cover"
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
        className={`${baseClass} bg-white px-3 py-1.5 shadow-[0_4px_12px_-4px_rgba(0,0,0,0.06)] border border-stone-200 ${className}`}
        aria-label="View verified listing on WeddingWire"
      >
        <img
          src="/WeddingWire_idGDCwR69F_1.svg"
          alt="WeddingWire"
          className="h-4.5 w-auto object-contain"
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
        className={`${baseClass} bg-[#1877F2] px-3 py-1.5 shadow-[0_4px_12px_-4px_rgba(24,119,242,0.35)] border border-[#1877F2]/20 ${className}`}
        aria-label="View verified page on Facebook"
      >
        <span className="inline-flex items-center gap-1 font-sans text-[0.78rem] font-bold text-white tracking-normal leading-none">
          <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current text-white">
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
        className={`${baseClass} bg-white px-3 py-1.5 shadow-[0_4px_12px_-4px_rgba(0,0,0,0.06)] border border-stone-200 ${className}`}
        aria-label="View verified listing on Zola"
      >
        <img
          src="/id56oBQafI_1758992156050.png"
          alt="Zola"
          className="h-4.5 w-auto object-contain"
        />
      </a>
    );
  }
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={`${baseClass} bg-white px-3 py-1.5 shadow-sm border border-stone-200 ${className}`}
      aria-label={`View verified listing on ${platform}`}
    >
      <span className="text-[0.78rem] font-semibold text-stone-600 uppercase tracking-wider">{platform}</span>
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
        <span className="text-2xl font-black tracking-tight text-black">{reviewCount}</span>
        <span className="mt-1.5 text-[0.62rem] font-extrabold uppercase tracking-[0.2em] text-black">
          {countLabel}
        </span>
      </div>
      <span className="text-xl font-normal text-stone-400" aria-hidden>
        |
      </span>
      <div className="flex flex-col items-center leading-none">
        <span className="text-2xl font-black tracking-tight text-black">5-Star</span>
        <span className="mt-1.5 flex items-center gap-0.5 text-[var(--color-gold)]" aria-hidden>
          {Array.from({ length: 5 }).map((_, starIndex) => (
            <svg key={`carousel-star-${starIndex}`} viewBox="0 0 24 24" className="h-[0.75rem] w-[0.75rem] fill-current">
              <path d="M12 2.25l2.35 6.36 6.9.22-5.38 4.26 1.89 6.66-5.76-3.67-5.76 3.67 1.89-6.66-5.38-4.26 6.9-.22L12 2.25z" />
            </svg>
          ))}
        </span>
      </div>
    </div>
  );
}

export type Testimonial = {
  quote: string;
  name: string;
  detail: string;
  platform?: string;
};

type TestimonialCarouselProps = {
  testimonials: Testimonial[];
  interval?: number;
};

export function TestimonialCarousel({
  testimonials,
  interval = 8000,
}: TestimonialCarouselProps) {
  const [index, setIndex] = useState(0);
  const items = useMemo(() => testimonials.filter(Boolean), [testimonials]);
  const containerRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const isElementVisible = entry.intersectionRatio >= 0.75;
        const viewportHeight = entry.rootBounds ? entry.rootBounds.height : window.innerHeight;
        const isViewportFilled = viewportHeight > 0 && (entry.intersectionRect.height / viewportHeight >= 0.75);
        setInView(entry.isIntersecting && (isElementVisible || isViewportFilled));
      },
      {
        threshold: [0, 0.25, 0.5, 0.75, 1.0],
      }
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
    };
  }, []);



  if (items.length === 0) {
    return null;
  }

  const active = items[index];

  return (
    <section ref={containerRef} className="relative rounded-3xl border border-stone-200/50 bg-white/70 px-6 py-8 shadow-[0_24px_50px_-32px_rgba(58,45,20,0.1)] backdrop-blur-md sm:p-12 md:p-14">
      {/* Subtle background light glow */}
      <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-1/3 bg-gradient-to-l from-white/40 via-transparent to-transparent md:block" />
      
      <div className="relative w-full">
        {/* Keyed container triggers entry animation on index shift */}
        <div key={index} className="testimonial-fade">
          <blockquote className="text-lg font-serif font-light leading-relaxed text-stone-850 sm:text-xl md:text-2xl lg:text-3xl min-h-[9.5rem] sm:min-h-[8.5rem] md:min-h-[9rem] lg:min-h-[10rem] xl:min-h-[8rem]">
            “{active.quote}”
          </blockquote>
          <footer className="mt-6">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-3">
                <span className="text-sm font-semibold uppercase tracking-[0.15em] text-stone-850">
                  {active.name}
                </span>
                {active.platform ? (
                  <PlatformBadge platform={active.platform} />
                ) : null}
              </div>
              <div className="text-xs tracking-wider text-stone-500">
                {active.detail}
              </div>
            </div>
          </footer>
        </div>
      </div>

      {items.length > 1 ? (
        <div className="mt-10 flex gap-4 border-t border-stone-200/40 pt-6">
          {items.map((_, itemIndex) => {
            const isActive = index === itemIndex;
            const isPast = itemIndex < index;
            return (
              <button
                key={`testimonial-${itemIndex}`}
                type="button"
                aria-label={`View testimonial ${itemIndex + 1}`}
                onClick={() => setIndex(itemIndex)}
                className="group relative flex-1 py-3 focus:outline-none"
              >
                {/* Invisible large touch target box for perfect accessibility */}
                <div className="absolute inset-x-0 top-0 bottom-0 min-h-[44px]" />
                
                {/* Background track (inactive bar) */}
                <div className="relative h-2 rounded-full bg-stone-200/60 overflow-hidden w-full transition group-hover:bg-stone-300/80">
                  {/* Inner loading/filled bar */}
                  {isActive ? (
                    <div
                      onAnimationEnd={() => {
                        setIndex((prev) => (prev + 1) % items.length);
                      }}
                      style={{
                        "--testimonial-interval": `${interval}ms`,
                        animationPlayState: inView ? "running" : "paused"
                      } as CSSProperties}
                      className="absolute inset-y-0 left-0 h-full w-full rounded-full bg-gradient-to-r from-[#c2a060] to-[#8f7845] testimonial-active-bar"
                    />
                  ) : isPast ? (
                    <div className="absolute inset-y-0 left-0 h-full w-full rounded-full bg-gradient-to-r from-[#c2a060] to-[#8f7845]" />
                  ) : null}
                </div>
              </button>
            );
          })}
        </div>
      ) : null}
    </section>
  );
}
