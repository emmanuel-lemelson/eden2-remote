"use client";

import { useMemo, useState } from "react";
import { PerfectReviewsBadge } from "@/components/TestimonialCarousel";
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
            {r.reviewer}{r.location ? ` · ${r.location}` : ""}
          </p>
        </div>
        {r.rating ? <StarRating rating={r.rating} /> : null}
      </div>

      <p className="mt-3 whitespace-pre-line leading-6 text-[0.95rem] text-stone-700">
        <span className="text-[1.05rem] font-medium text-stone-600">“</span>
        {displayText}
        <span className="text-[1.05rem] font-medium text-stone-600">”</span>
      </p>

      <div className="mt-auto flex items-center justify-between gap-3 pt-4">
        <div className="text-[0.72rem] text-stone-500">
          <span>{r.dateText}</span>
          {r.nights ? <span> · {r.nights} night{r.nights === 1 ? "" : "s"}</span> : null}
          {r.stayedWith ? <span> · {r.stayedWith}</span> : null}
          {r.tripType ? <span> · {r.tripType}</span> : null}
          {r.tripNotes ? <span> · {r.tripNotes}</span> : null}
        </div>
        {long && (
          <button
            type="button"
            onClick={() => setExpanded((s) => !s)}
            className="rounded-full border border-white/70 bg-white/80 px-3 py-1 text-[0.75rem] font-semibold text-stone-700 transition hover:-translate-y-[1px] hover:border-[#c2a060]/60 hover:bg-white hover:text-stone-900"
            aria-expanded={expanded}
          >
            {expanded ? "Read less" : "Read more"}
          </button>
        )}
      </div>

      <div className="mt-4 flex items-center gap-2 text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-stone-500">
        <span className="inline-flex items-center rounded-full bg-[#f2e8da] px-2 py-0.5 text-[0.68rem] font-semibold text-stone-700">
          {r.platform}
        </span>
      </div>
    </article>
  );
}

export default function ReviewsClient({ normalized }: { normalized: NormalizedPayload }) {
  const [platform, setPlatform] = useState<string>("All");
  // Removed unused summaryOpen state

  const items = useMemo(() => {
    const all = normalized.items;
    if (platform === "All") return all;
    return all.filter((i) => i.platform === platform);
  }, [normalized.items, platform]);

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

  const countsByPlatform = useMemo(() => {
    const map = new Map<string, number>();
    for (const p of normalized.platforms) map.set(p, 0);
    for (const it of normalized.items) map.set(it.platform, (map.get(it.platform) ?? 0) + 1);
    return map;
  }, [normalized.items, normalized.platforms]);

  return (
    <div className="space-y-6">
      {perfectRating ? (
        <div className="flex justify-center">
          <PerfectReviewsBadge
            reviewCount={perfectRating.count}
            countLabel={perfectRating.count === 1 ? "review" : "reviews"}
          />
        </div>
      ) : null}

      {/* Summary hidden for now - retained for potential future use */}
      {/* <section className="rounded-3xl border border-[#d2c4a3]/60 bg-gradient-to-b from-[#fdfbf7]/95 via-[#f8f3ea]/90 to-[#f2e8da]/85 p-4 shadow-[0_25px_60px_-20px_rgba(30,30,40,0.35)]">
        ...
      </section> */}

      {/* Filter */}
      <section className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <label htmlFor="platform" className="text-xs font-semibold uppercase tracking-[0.28em] text-stone-600">
            Filter
          </label>
          <select
            id="platform"
            className="rounded-full border border-white/70 bg-white/90 px-3 py-2 text-sm text-stone-800 shadow-sm focus:border-[#c2a060]/60 focus:outline-none"
            value={platform}
            onChange={(e) => setPlatform(e.target.value)}
          >
            <option value="All">All Platforms</option>
            {normalized.platforms.map((p) => (
              <option key={p} value={p}>
                {p} ({countsByPlatform.get(p) ?? 0})
              </option>
            ))}
          </select>
        </div>
        <div className="text-[0.75rem] text-stone-500">Newest first</div>
      </section>

      {/* Reviews grid */}
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {items.map((r) => (
          <ReviewCard key={r.id} r={r} />
        ))}
      </section>
    </div>
  );
}
