'use client';

import { useEffect, useMemo, useState } from "react";

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
  interval = 6000,
}: TestimonialCarouselProps) {
  const [index, setIndex] = useState(0);
  const items = useMemo(() => testimonials.filter(Boolean), [testimonials]);

  useEffect(() => {
    if (items.length <= 1) return;

    const id = window.setInterval(() => {
      setIndex((prev) => (prev + 1) % items.length);
    }, interval);

    return () => window.clearInterval(id);
  }, [items.length, interval]);

  if (items.length === 0) {
    return null;
  }

  const active = items[index];

  return (
    <section className="relative overflow-hidden rounded-3xl border border-white/50 bg-white/80 p-10 md:p-14">
      <div className="absolute inset-y-0 right-0 hidden w-2/5 bg-gradient-to-l from-white/70 via-white/40 to-transparent md:block" />
      <div className="relative max-w-2xl">
        <span className="text-xs uppercase tracking-[0.4em] text-stone-600">
          Testimonials
        </span>
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
