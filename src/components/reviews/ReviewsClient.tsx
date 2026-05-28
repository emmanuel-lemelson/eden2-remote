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
    <div className="flex flex-col items-end">
      <div className="relative flex">
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
      <span className="mt-1 text-[0.7rem] font-semibold text-stone-600">
        {rating.value}/{rating.scale}
        {rating.label ? ` · ${rating.label}` : ""}
      </span>
    </div>
  );
}

function ReviewCard({ r }: { r: NormalizedReview }) {
  const [expanded, setExpanded] = useState(false);
  const long = (r.review?.length ?? 0) > 200;
  const displayText = expanded || !long ? r.review : r.review.slice(0, 200) + "…";

  return (
    <article className="flex h-full flex-col rounded-2xl border border-white/70 bg-gradient-to-b from-white/95 to-white/85 p-4 text-sm text-stone-800 shadow-[0_20px_45px_-20px_rgba(30,30,40,0.35)]">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-base font-semibold text-stone-900">{r.title}</h3>
          <p className="mt-0.5 text-[0.75rem] uppercase tracking-[0.18em] text-stone-500">
            {r.reviewer}{r.dateText ? ` · ${r.dateText}` : ""}
          </p>
        </div>
        {r.rating ? <StarRating rating={r.rating} /> : null}
      </div>

      <p className="mt-3 whitespace-pre-line leading-6 text-[0.95rem] text-stone-700">
        <span className="text-[1.05rem] font-medium text-stone-600">“</span>
        {displayText}
        {long && (
          <button
            type="button"
            onClick={() => setExpanded((s) => !s)}
            className="ml-1.5 inline-flex items-center font-bold text-[#c2a060] hover:text-[#a08145] transition-colors focus:outline-none focus:underline cursor-pointer"
            aria-expanded={expanded}
          >
            {expanded ? "Read Less" : "Read More"}
          </button>
        )}
        <span className="text-[1.05rem] font-medium text-stone-600">”</span>
      </p>

      <div className="mt-auto flex items-center justify-start gap-4 pt-4">
        <PlatformBadge platform={r.platform} />
      </div>
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
        {items.map((r) => (
          <ReviewCard key={r.id} r={r} />
        ))}
      </section>
    </div>
  );
}
