"use client";

import { useMemo, useState } from "react";
import { PerfectReviewsBadge, PlatformBadge } from "@/components/TestimonialCarousel";
import type { NormalizedReview } from "@/types/reviews";

type NormalizedPayload = {
  summary: { note?: string; text?: string; total?: number };
  platforms: string[];
  items: NormalizedReview[];
};

// Removed unused SparkleIcon

function StarIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M12 2.25l2.35 6.36 6.9.22-5.38 4.26 1.89 6.66-5.76-3.67-5.76 3.67 1.89-6.66-5.38-4.26 6.9-.22L12 2.25z" />
    </svg>
  );
}

function StarRating({ rating }: { rating: { scale: number; value: number; label?: string } }) {
  const normalized = Math.max(0, Math.min(5, (rating.value / rating.scale) * 5));
  const percent = (normalized / 5) * 100;

  return (
    <div className="flex items-center gap-2">
      <div className="relative flex shrink-0">
        <div className="flex text-[#d9d1c3]">
          {Array.from({ length: 5 }).map((_, index) => (
            <StarIcon key={`star-base-${index}`} className="h-4 w-4" />
          ))}
        </div>
        <div className="absolute inset-0 overflow-hidden text-[#c2a060]" style={{ width: `${percent}%` }}>
          <div className="flex">
            {Array.from({ length: 5 }).map((_, index) => (
              <StarIcon key={`star-fill-${index}`} className="h-4 w-4" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/** Lets the final card fill the row so the grid never ends on an empty slot. */
function lastCardSpan(count: number) {
  const classes: string[] = [];
  if (count % 2 === 1) classes.push("sm:col-span-2");
  if (count % 3 === 0) classes.push("xl:col-span-1");
  else if (count % 3 === 1) classes.push("xl:col-span-3");
  else classes.push("xl:col-span-2");
  return classes.join(" ");
}

function ReviewCard({ r, className = "" }: { r: NormalizedReview; className?: string }) {
  const [expanded, setExpanded] = useState(false);
  const long = (r.review?.length ?? 0) > 200;
  const displayText = expanded || !long ? r.review : r.review.slice(0, 200) + "…";

  return (
    <article className={`flex h-full flex-col rounded-2xl ${className} border border-white/70 bg-gradient-to-b from-white/95 to-white/85 p-5 text-sm text-stone-800 shadow-[0_20px_45px_-20px_rgba(30,30,40,0.35)]`}>
      <div className="flex items-center justify-between gap-3">
        <div>{r.rating ? <StarRating rating={r.rating} /> : null}</div>
        <div className="shrink-0">
          <PlatformBadge platform={r.platform} />
        </div>
      </div>

      {r.title ? (
        <h3 className="mt-2.5 ![font-family:var(--font-body)] text-[0.95rem] font-semibold leading-snug tracking-normal text-stone-900 text-balance">
          {r.title}
        </h3>
      ) : null}

      <p className="mt-2 whitespace-pre-line leading-6 text-[0.925rem] text-stone-700 text-pretty">
        <span className="text-[1.02rem] font-medium text-stone-600">“</span>
        {displayText}
        <span className="text-[1.02rem] font-medium text-stone-600">”</span>
      </p>
      {long && (
        <button
          type="button"
          onClick={() => setExpanded((s) => !s)}
          className="mt-1.5 inline-flex min-h-9 w-fit cursor-pointer items-center gap-1 text-sm font-semibold text-stone-900 underline decoration-stone-400 underline-offset-4 transition-colors hover:text-[#8f7845] hover:decoration-[#8f7845] focus:outline-none focus-visible:text-[#8f7845]"
          aria-expanded={expanded}
        >
          {expanded ? "Read less" : "Read more"}
        </button>
      )}

      <footer className="mt-auto border-t border-stone-200/70 pt-3.5">
        <p className="truncate text-xs text-stone-600">
          <span className="font-semibold text-stone-900">{r.reviewer}</span>
          {r.dateText ? ` · ${r.dateText}` : ""}
        </p>
      </footer>
    </article>
  );
}

export default function ReviewsClient({ normalized }: { normalized: NormalizedPayload }) {
  const items = normalized.items;

  const perfectRating = useMemo(() => {
    const rated = normalized.items.filter((review) => review.rating);
    if (rated.length === 0) return null;

    const allPerfect = rated.every((review) => {
      if (!review.rating) return false;
      const normalizedValue = (review.rating.value / review.rating.scale) * 5;
      return Math.abs(normalizedValue - 5) < 0.01;
    });

    if (!allPerfect) return null;

    return { count: rated.length };
  }, [normalized.items]);

  return (
    <div className="space-y-6">
      {/* Badge */}
      {perfectRating ? (
        <section className="flex justify-start">
          <PerfectReviewsBadge
            reviewCount={perfectRating.count}
            countLabel={perfectRating.count === 1 ? "review" : "reviews"}
          />
        </section>
      ) : null}

      {/* Summary hidden for now - retained for potential future use */}
      {/* <section className="rounded-3xl border border-[#d2c4a3]/60 bg-gradient-to-b from-[#fdfbf7]/95 via-[#f8f3ea]/90 to-[#f2e8da]/85 p-4 shadow-[0_25px_60px_-20px_rgba(30,30,40,0.35)]">
        ...
      </section> */}


      {/* Reviews grid */}
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {items.map((r, i) => (
          <ReviewCard key={r.id} r={r} className={i === items.length - 1 ? lastCardSpan(items.length) : ""} />
        ))}
      </section>
    </div>
  );
}
