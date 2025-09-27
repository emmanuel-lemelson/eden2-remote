'use client';

import { useEffect, useState } from "react";

type Highlight = {
  title: string;
  subtitle: string;
  summary: string;
  description: string;
  image: string;
};

type HighlightsGridProps = {
  items: Highlight[];
};

export function HighlightsGrid({ items }: HighlightsGridProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  useEffect(() => {
    if (activeIndex === null) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActiveIndex(null);
      }
    };

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [activeIndex]);

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {items.map((item, index) => (
        <button
          key={item.title}
          type="button"
          onClick={() => setActiveIndex(index)}
          className="group flex flex-col rounded-3xl border border-white/50 bg-white/70 p-6 text-left transition hover:-translate-y-1 hover:bg-white hover:shadow-xl"
        >
          <span className="text-xs uppercase tracking-[0.4em] text-stone-500">
            {item.subtitle}
          </span>
          <span className="mt-4 text-xl font-semibold text-stone-900">
            {item.title}
          </span>
          <p className="mt-3 text-sm text-stone-700">{item.summary}</p>
          <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-stone-800">
            Explore
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="h-4 w-4 transition group-hover:translate-x-1"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </span>
        </button>
      ))}

      {activeIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-6 py-10 backdrop-blur"
          onClick={() => setActiveIndex(null)}
        >
          <div
            className="relative w-full max-w-3xl overflow-hidden rounded-3xl border border-white/20 bg-white/95 shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              aria-label="Close details"
              className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border border-stone-200 bg-white/80 text-stone-500 transition hover:text-stone-800"
              onClick={() => setActiveIndex(null)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                className="h-4 w-4"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 6l12 12M6 18L18 6" />
              </svg>
            </button>

            <div className="grid gap-0 md:grid-cols-[1.2fr_1fr]">
              <div className="p-8 md:p-10">
                <p className="text-xs uppercase tracking-[0.4em] text-stone-500">
                  {items[activeIndex].subtitle}
                </p>
                <h3 className="mt-4 text-3xl font-semibold text-stone-900">
                  {items[activeIndex].title}
                </h3>
                <p className="mt-6 text-base text-stone-700">
                  {items[activeIndex].description}
                </p>
              </div>
              <div className="relative h-64 md:h-full">
                <img
                  src={items[activeIndex].image}
                  alt={items[activeIndex].title}
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
