'use client';

import { useEffect, useMemo, useState } from "react";

export function PerfectReviewsBadge({
  reviewCount = 0,
  countLabel = "reviews",
}: {
  reviewCount?: number;
  countLabel?: string;
}) {
  return (
    <div className="flex items-center gap-6 rounded-2xl border border-stone-900/10 bg-stone-900/90 px-6 py-4 text-white shadow-[0_18px_36px_-24px_rgba(30,30,40,0.55)] backdrop-blur">
      <div className="flex flex-col items-center leading-none">
        <span className="text-3xl font-bold tracking-tight">{reviewCount}</span>
        <span className="mt-1 text-[0.7rem] font-semibold uppercase tracking-[0.3em] text-white/70">
          {countLabel}
        </span>
      </div>
      <span className="text-3xl font-semibold text-white/40" aria-hidden>
        |
      </span>
      <div className="flex flex-col items-center leading-none">
        <span className="text-3xl font-bold tracking-tight">100%</span>
        <span className="mt-1 flex items-center gap-1 text-amber-300" aria-hidden>
          {Array.from({ length: 5 }).map((_, starIndex) => (
            <svg key={`carousel-star-${starIndex}`} viewBox="0 0 24 24" className="h-[0.9rem] w-[0.9rem] fill-current">
              <path d="M12 2.25l2.35 6.36 6.9.22-5.38 4.26 1.89 6.66-5.76-3.67-5.76 3.67 1.89-6.66-5.38-4.26 6.9-.22L12 2.25z" />
            </svg>
          ))}
        </span>
      </div>
    </div>
  );
}

type Testimonial = {
  quote: string;
  name: string;
  detail: string;
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

  useEffect(() => {
    if (items.length <= 1) return;

    const id = window.setInterval(() => {
      setIndex((prev) => (prev + 1) % items.length);
    }, interval);

    return () => window.clearInterval(id);
  }, [items.length, interval, index]);

  if (items.length === 0) {
    return null;
  }

  const active = items[index];

  return (
    <section className="relative overflow-hidden rounded-3xl border border-white/50 bg-white/80 p-10 md:p-14">
      <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-2/5 bg-gradient-to-l from-white/70 via-white/40 to-transparent md:block" />
      <div className="relative max-w-2xl">
        <div className="flex flex-wrap items-center gap-4">
          <span className="text-xs uppercase tracking-[0.4em] text-stone-600">
            Testimonials
          </span>
          <PerfectReviewsBadge reviewCount={43} countLabel="REVIEWS" />
        </div>
        <blockquote className="mt-6 text-2xl font-medium leading-relaxed text-stone-800 md:text-3xl">
          “{active.quote}”
        </blockquote>
        <footer className="mt-8 flex items-center gap-4">
          <div className="h-px flex-1 bg-gradient-to-r from-[#c2a060]/60 to-transparent" />
          <div className="text-right text-sm uppercase tracking-[0.3em] text-stone-700">
            <div>{active.name}</div>
            <div className="text-xs text-stone-500">{active.detail}</div>
          </div>
        </footer>
      </div>
      {items.length > 1 ? (
        <div className="mt-8 flex gap-2">
          {items.map((_, itemIndex) => (
            <button
              key={`testimonial-${itemIndex}`}
              type="button"
              aria-label={`View testimonial ${itemIndex + 1}`}
              onClick={() => setIndex(itemIndex)}
              className={`h-2 flex-1 rounded-full transition ${
                index === itemIndex
                  ? "bg-gradient-to-r from-[#c2a060] to-[#8f7845]"
                  : "bg-stone-200/80 hover:bg-stone-300"
              }`}
            />
          ))}
        </div>
      ) : null}
    </section>
  );
}
