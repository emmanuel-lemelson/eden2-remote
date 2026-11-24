import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { FaqSection, type FaqItem } from "@/components/FaqSection";
import { ResponsivePhoto } from "@/components/ResponsivePhoto";

export const dynamic = "force-static";

const PRODUCTION_URL = "https://lemelsonestate.com";

export const metadata: Metadata = {
  title: "Stowe Family Reunion & Large Group Rental (Sleeps 20) — Eden Estate",
  description:
    "Gather up to 20 guests across 8 bedrooms and 28 private acres in Stowe, VT. See why a private buyout at Eden beats booking 8 suites at a Stowe resort—with kids' playroom, pool, tennis & pet-friendly stays.",
  alternates: {
    canonical: `${PRODUCTION_URL}/guides/stowe-family-reunions/`,
  },
  openGraph: {
    title: "Stowe Family Reunion & Large Group Rental (Sleeps 20) — Eden Estate",
    description:
      "Compare a private 8-bedroom estate buyout in Stowe vs. booking 8 hotel suites. Sleeps 20, heated pool, 3 hot tubs, clay tennis court, playroom & zero platform fees.",
    url: `${PRODUCTION_URL}/guides/stowe-family-reunions/`,
    type: "website",
    images: [
      {
        url: `${PRODUCTION_URL}/opengraph-image.png`,
        width: 1200,
        height: 630,
        alt: "Backyard heated pool, stone patio, and lawn at Eden: The Lemelson Estate in Stowe, Vermont",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@LemelsonEstate",
    title: "Stowe Family Reunion & Large Group Rental (Sleeps 20) — Eden Estate",
    description:
      "Gather 20 family members under one roof in Stowe, VT—with kids' playroom, private apartment suite, pool, 3 spas, tennis court & zero platform fees.",
    images: [`${PRODUCTION_URL}/opengraph-image.png`],
  },
};

const comparisonRows = [
  {
    category: "Privacy & Shared Living",
    eden: "100% exclusive 11,400 sq ft residence & 28 private acres—everyone together in one Great Room",
    resort: "Scattered hotel rooms along public corridors; crowded lobbies and shared hallways",
  },
  {
    category: "Pool, Hot Tubs & Sauna",
    eden: "Private heated pool (May–Sept), 3 private spas (10-person hot tub, indoor spa, garden spa), cedar sauna & steam shower",
    resort: "Shared resort pool hours with outside guests and limited spa slots",
  },
  {
    category: "Group Meals & Kitchens",
    eden: "Sub-Zero & Thermador chef's kitchen, formal dining table, outdoor BBQ & optional private in-house chef",
    resort: "Expensive restaurant checks and split tables for 16–20 people at every meal",
  },
  {
    category: "Multi-Gen & Kid Setup",
    eden: "Dedicated children's playroom, cribs/Pack 'n Play/baby gates, plus a quiet self-contained 2nd-floor apartment suite",
    resort: "Standard hotel bedrooms with no playroom; extra charges for cribs and adjoining suites",
  },
  {
    category: "Outdoor Recreation",
    eden: "Private clay tennis court, twin trout-stocked ponds, 5-min walk to Wiessner Woods trails",
    resort: "Pay-per-hour court rentals and crowded public recreation facilities",
  },
  {
    category: "Pets",
    eden: "Pet-friendly estate so family dogs join the reunion",
    resort: "Strict per-room pet limits, breed caps, or steep nightly pet fees",
  },
  {
    category: "Booking Fees",
    eden: "Direct booking on lemelsonestate.com with zero Airbnb/Vrbo service fees",
    resort: "Per-room nightly resort fees, parking charges, and banquet markups",
  },
];

const generationZones = [
  {
    title: "Toddlers & Young Kids",
    detail:
      "Indoor children's playroom stocked with books and toys for ages 0–10+, standard crib, Pack 'n Play, baby bath, baby safety gates, fireplace guards, kids' bikes, and seasonal pool toys.",
  },
  {
    title: "Teens & Cousins",
    detail:
      "Lower-level recreation wing with pool table, foosball, game console, 86-inch smart TV, Sonos sound, board games, clay tennis court, and trout-stocked ponds.",
  },
  {
    title: "Grandparents & Quiet Seekers",
    detail:
      "Both a first-floor 2nd Primary Suite (minimal stairs) and a private self-contained second-floor Apartment Suite with its own kitchen, living room, primary bedroom, and twin room.",
  },
  {
    title: "Parents & Milestone Hosts",
    detail:
      "Relax in three private spa zones, the cedar sauna, or the private fitness center while our concierge arranges pre-arrival groceries, private chef dinners, and Stowe excursions.",
  },
];

const reunionFaqs: FaqItem[] = [
  {
    question: "How many people can stay at Eden for a Stowe family reunion?",
    answer:
      "Eden comfortably sleeps up to 20 overnight guests across 8 bedrooms and 8 full bathrooms within 11,400 square feet, with sprawling common areas designed so everyone can dine and gather together.",
  },
  {
    question: "Is there a quiet space for grandparents or families with babies?",
    answer:
      "Yes. In addition to first-floor guest bedrooms and a main-level primary suite, the second floor includes a private, self-contained apartment suite with its own kitchen, living area, primary bedroom, and twin bedroom—plus a nursery near the main primary suite.",
  },
  {
    question: "What baby and children's gear is already at the house?",
    answer:
      "Eden stocks a dedicated children's playroom, books and toys for ages 0–10+, a standard crib, Pack 'n Play travel crib, baby bath, baby safety gates, fireplace guards, board games, and kids' bikes so families can pack light.",
  },
  {
    question: "Can we bring dogs to our family reunion?",
    answer:
      "Yes. Eden is pet-friendly for vacation stays, with 28 private acres and neighboring dog-friendly trails at Wiessner Woods just a 5-minute walk away.",
  },
  {
    question: "Can our concierge arrange a private chef or reunion activities?",
    answer:
      "Yes. Our complimentary concierge coordinates multi-course private chef dinners, barbecue cookouts, pre-stocked groceries, horseback rides at Topnotch (2 min away), and Stowe Mountain Resort outings.",
  },
];

export default function StoweFamilyReunionsPage() {
  return (
    <div className="bg-white">
      <section className="bg-white pt-8 pb-12 md:pt-12 md:pb-16">
        <div className="lux-container space-y-8">
          <Breadcrumbs
            items={[
              { name: "Home", href: "/" },
              { name: "Stays", href: "/stays/" },
              { name: "Family Reunions", href: "/guides/stowe-family-reunions/" },
            ]}
          />

          <div className="mx-auto max-w-4xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.38em] text-[#8f7845]">
              Multi-Gen &amp; Large Group Stays · Stowe, Vermont
            </p>
            <h1 className="mt-3 text-3xl font-semibold leading-tight text-stone-900 text-balance sm:text-4xl md:text-5xl">
              Stowe Family Reunion &amp; Large-Group Luxury Estate (Sleeps 20)
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-stone-700 md:text-lg">
              Bring three generations together under one roof on 28 secluded acres in Stowe. Enjoy 8 bedrooms, 8 bathrooms, a kids&apos; playroom, private apartment suite, heated pool, 3 hot tubs, clay tennis court, and pet-friendly stays.
            </p>
            <div className="mt-7 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/contact/"
                className="inline-flex items-center rounded-full bg-[#111111] px-8 py-3.5 text-[0.95rem] font-semibold !text-white transition duration-200 hover:bg-stone-800"
              >
                Plan Your Family Reunion
              </Link>
              <Link
                href="/stays/"
                className="inline-flex items-center rounded-full border border-stone-900 px-8 py-3.5 text-[0.95rem] font-semibold text-stone-900 transition duration-200 hover:bg-stone-50"
              >
                See Floor-by-Floor Layout
              </Link>
            </div>
          </div>

          <div className="overflow-hidden rounded-3xl border border-stone-200 shadow-xl">
            <div className="aspect-[16/9] w-full">
              <ResponsivePhoto
                basePath="/gallery/Eden-Site%20Photos/113"
                alt="Resort-style backyard stone patio, heated pool, and circular spa at Eden Estate in Stowe, VT"
                sizes="(min-width: 1280px) 1072px, 100vw"
                width={2560}
                height={1920}
                priority={true}
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="lux-section bg-gradient-to-br from-[var(--color-linen)] via-[var(--color-eggshell)] to-[var(--color-cream)]">
        <div className="lux-container max-w-5xl space-y-8">
          <div className="text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#8f7845]">
              Side-by-Side Comparison
            </p>
            <h2 className="mt-2 text-3xl font-semibold text-stone-900 sm:text-4xl">
              Private Estate Buyout at Eden vs. Booking 8 Suites at a Stowe Resort
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm text-stone-700 sm:text-base">
              Why multi-family vacations, milestone birthdays, and reunions get dramatically more space, privacy, and value with one private estate buyout.
            </p>
          </div>

          <div className="overflow-x-auto rounded-3xl border border-[#d2c4a3]/60 bg-white/95 shadow-[0_24px_60px_-36px_rgba(58,45,20,0.22)]">
            <table className="w-full min-w-[640px] text-left">
              <thead>
                <tr className="border-b border-[#d2c4a3]/50 bg-[#f8f3ea]">
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-[0.18em] text-stone-700">
                    Feature
                  </th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-[0.18em] text-[#8f7845]">
                    Eden: The Lemelson Estate (Private Buyout)
                  </th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-[0.18em] text-stone-600">
                    8 Separate Resort Suites in Stowe
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-200/80 text-sm">
                {comparisonRows.map((row) => (
                  <tr key={row.category} className="align-top">
                    <td className="px-6 py-4 font-semibold text-stone-900 whitespace-nowrap">
                      {row.category}
                    </td>
                    <td className="px-6 py-4 font-medium text-stone-900 bg-[#fdfbf7]">
                      {row.eden}
                    </td>
                    <td className="px-6 py-4 text-stone-600">
                      {row.resort}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Multi-Gen Zones */}
      <section className="lux-section bg-white">
        <div className="lux-container space-y-10">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#8f7845]">
              Every Age Covered
            </p>
            <h2 className="mt-2 text-3xl font-semibold text-stone-900 sm:text-4xl">
              Designed for every generation, from toddlers to grandparents
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {generationZones.map((zone) => (
              <div
                key={zone.title}
                className="rounded-3xl border border-stone-200 bg-[#fdfbf7] p-6"
              >
                <h3 className="text-xl font-semibold text-stone-900">{zone.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-stone-700">{zone.detail}</p>
              </div>
            ))}
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="overflow-hidden rounded-2xl border border-stone-200 shadow-md">
              <ResponsivePhoto
                basePath="/gallery/Eden-Site%20Photos/98"
                alt="Great Room gathering space with leather sofas and grand piano"
                sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                width={2560}
                height={1704}
                className="aspect-[4/3] w-full object-cover"
              />
            </div>
            <div className="overflow-hidden rounded-2xl border border-stone-200 shadow-md">
              <ResponsivePhoto
                basePath="/gallery/enhanced/28"
                alt="Formal dining table prepared for large family reunion dinners"
                sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                width={2400}
                height={1600}
                className="aspect-[4/3] w-full object-cover"
              />
            </div>
            <div className="overflow-hidden rounded-2xl border border-stone-200 shadow-md">
              <ResponsivePhoto
                basePath="/gallery/Eden-Site%20Photos/93"
                alt="Spacious lower-level family recreation and game room"
                sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                width={2560}
                height={1707}
                className="aspect-[4/3] w-full object-cover"
              />
            </div>
            <div className="overflow-hidden rounded-2xl border border-stone-200 shadow-md">
              <ResponsivePhoto
                basePath="/gallery/Eden-Site%20Photos/111"
                alt="Outdoor patio seating beside the private clay tennis court"
                sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                width={2560}
                height={1920}
                className="aspect-[4/3] w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <FaqSection
        title="Stowe Family Reunion FAQs"
        description="Common questions from reunion planners organizing multi-family stays in Stowe."
        items={reunionFaqs}
      />

      <section className="lux-section border-t border-stone-200/70 bg-[#fdfbf7]">
        <div className="lux-container max-w-4xl text-center">
          <h2 className="text-3xl font-semibold text-stone-900 sm:text-4xl">
            Bring the Whole Family to Eden
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-base text-stone-700">
            Book direct to save third-party platform fees and let our concierge tailor your family reunion itinerary.
          </p>
          <div className="mt-7 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/contact/"
              className="inline-flex items-center rounded-full bg-[#111111] px-8 py-3.5 text-[0.95rem] font-semibold !text-white transition hover:bg-stone-800"
            >
              Request Reunion Dates
            </Link>
            <Link
              href="/reviews/"
              className="inline-flex items-center rounded-full border border-stone-900 px-8 py-3.5 text-[0.95rem] font-semibold text-stone-900 transition hover:bg-stone-50"
            >
              Read 62 Five-Star Reviews
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
