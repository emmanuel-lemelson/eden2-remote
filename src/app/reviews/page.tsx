import ReviewsClient from "@/components/reviews/ReviewsClient";
import reviewsData from "@/../public/reviews.json";
import type { NormalizedReview, Rating } from "@/types/reviews";

interface PlatformReview {
  title?: string;
  reviewer?: string;
  date?: string;
  nights?: number;
  rating?: Rating | number | { scale?: number; value?: number; label?: string };
  review?: string;
  trip_notes?: string;
  location?: string;
  stayed_with?: string;
  trip_type?: string;
}

interface PlatformGroup {
  total?: number;
  note?: string;
  reviews?: PlatformReview[];
}

interface ReviewsFile {
  platforms?: Record<string, PlatformGroup>;
  totals?: { overall?: number } & Record<string, number | undefined>;
  ai_summary?: string | { note?: string; text?: string; total_reviews?: number };
}

const PLATFORM_LABELS: Record<string, string> = {
  VRBO_Expedia: "VRBO / Expedia",
  The_Knot: "The Knot",
  Wedding_Wire: "Wedding Wire",
};

function formatPlatformName(key: string) {
  return PLATFORM_LABELS[key] ?? key.replace(/_/g, " ");
}

function parseDateFlexible(input?: string): string {
  if (!input) return "1970-01-01";
  const s = input.trim();

  // Known patterns: "Jul 2025", "Feb 2025", "Sep 30, 2024", "Dec 2021"
  // Try Date.parse first
  const d1 = new Date(s);
  if (!isNaN(d1.getTime())) return d1.toISOString();

  // Handle "Mon YYYY"
  const m1 = s.match(/^(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s+(\d{4})$/);
  if (m1) {
    const monthMap: Record<string, number> = {
      Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5,
      Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11,
    };
    const month = monthMap[m1[1]];
    const year = parseInt(m1[2], 10);
    const d = new Date(Date.UTC(year, month, 1));
    return d.toISOString();
  }

  // Handle "Month YYYY" (full month name)
  const m2 = s.match(/^(January|February|March|April|May|June|July|August|September|October|November|December)\s+(\d{4})$/);
  if (m2) {
    const monthMapFull: Record<string, number> = {
      January: 0, February: 1, March: 2, April: 3, May: 4, June: 5,
      July: 6, August: 7, September: 8, October: 9, November: 10, December: 11,
    };
    const month = monthMapFull[m2[1]];
    const year = parseInt(m2[2], 10);
    const d = new Date(Date.UTC(year, month, 1));
    return d.toISOString();
  }

  // Fallback
  return "1970-01-01";
}

function extractDateInfo(raw?: string) {
  if (!raw) {
    return { dateText: "", nights: undefined as number | undefined, iso: "1970-01-01" };
  }

  const trimmed = raw.trim();
  const stayedMatch = trimmed.match(/Stayed\s+(\d+)\s+nights?\s+in\s+(.+)/i);

  if (stayedMatch) {
    const nights = Number(stayedMatch[1]);
    const datePortion = stayedMatch[2]?.trim() ?? "";
    return {
      dateText: datePortion,
      nights: Number.isFinite(nights) ? nights : undefined,
      iso: parseDateFlexible(datePortion),
    };
  }

  return {
    dateText: trimmed,
    nights: undefined,
    iso: parseDateFlexible(trimmed),
  };
}

function normalizeRating(raw: any | undefined): Rating | undefined {
  if (!raw) return undefined;
  if (typeof raw === "object") {
    const scale = typeof raw.scale === "number" ? raw.scale : (typeof raw.value === "number" && raw.value <= 5 ? 5 : 10);
    const value = typeof raw.value === "number" ? raw.value : (typeof raw === "number" ? raw : 0);
    const label = typeof raw.label === "string" ? raw.label : undefined;
    return { scale, value, label };
  }
  if (typeof raw === "number") {
    const val = raw;
    const scale = val <= 5 ? 5 : 10;
    return { scale, value: val };
  }
  return undefined;
}

function normalizeData(data: ReviewsFile) {
  const items: NormalizedReview[] = [];
  const platformOrder: string[] = [];

  const platforms = data.platforms ?? {};
  let counter = 0;

  for (const [platformKey, group] of Object.entries(platforms)) {
    const displayName = formatPlatformName(platformKey);
    if (!platformOrder.includes(displayName)) {
      platformOrder.push(displayName);
    }

    for (const review of group.reviews ?? []) {
      const { dateText, nights, iso } = extractDateInfo(review.date);
      items.push({
        id: `${platformKey}-${counter++}`,
        platform: displayName,
        title: review.title ?? "Guest Review",
        reviewer: review.reviewer ?? "Guest",
        dateText,
        dateISO: iso,
        nights: typeof review.nights === "number" ? review.nights : nights,
        rating: normalizeRating(review.rating),
        review: review.review ?? "",
        tripNotes: review.trip_notes,
        location: review.location,
        stayedWith: review.stayed_with,
        tripType: review.trip_type,
      });
    }
  }

  // Sort newest first by dateISO
  items.sort((a, b) => (a.dateISO < b.dateISO ? 1 : a.dateISO > b.dateISO ? -1 : 0));

  const summaryText =
    typeof data.ai_summary === "string"
      ? data.ai_summary
      : (data.ai_summary?.text ?? "");

  const summaryNote =
    (typeof data.ai_summary === "object" && data.ai_summary ? data.ai_summary.note : undefined) ??
    "AI-generated summary";

  const summaryTotal =
    (typeof data.ai_summary === "object" && data.ai_summary?.total_reviews) ??
    data.totals?.overall ??
    items.length;

  return {
    summary: {
      note: summaryNote,
      text: summaryText,
      total: summaryTotal,
    },
    platforms: platformOrder,
    items,
  } as const;
}

export default async function ReviewsPage() {
  const normalized = normalizeData(reviewsData as ReviewsFile);
  return (
    <div className="lux-section">
      <div className="lux-container">
        <ReviewsClient normalized={normalized} />
      </div>
    </div>
  );
}
