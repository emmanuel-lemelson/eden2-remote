import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { FaqSection, type FaqItem } from "@/components/FaqSection";
import { ResponsivePhoto } from "@/components/ResponsivePhoto";

export const dynamic = "force-static";

const PRODUCTION_URL = "https://lemelsonestate.com";

export const metadata: Metadata = {
  title: "Stowe, Vermont Private Estate Wedding Venue | 2026 Pricing — Eden",
  description:
    "Plan an exclusive 28-acre mountain estate wedding in Stowe, VT at Eden: The Lemelson Estate. Sleeps 20 overnight, tented receptions up to 300, no food & beverage minimums, custom chef dining & transparent 2026 pricing.",
  alternates: {
    canonical: `${PRODUCTION_URL}/weddings/`,
  },
  openGraph: {
    title: "Stowe, Vermont Private Estate Wedding Venue | 2026 Pricing — Eden",
    description:
      "Plan an exclusive 28-acre mountain estate wedding in Stowe, VT at Eden: The Lemelson Estate. Sleeps 20 overnight, tented receptions up to 300, no food & beverage minimums, custom chef dining & transparent 2026 pricing.",
    url: `${PRODUCTION_URL}/weddings/`,
    type: "website",
    images: [
      {
        url: `${PRODUCTION_URL}/opengraph-image.png`,
        width: 1200,
        height: 630,
        alt: "Eden: The Lemelson Estate private wedding venue in Stowe, Vermont",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@LemelsonEstate",
    title: "Stowe, Vermont Private Estate Wedding Venue | 2026 Pricing — Eden",
    description:
      "Exclusive 28-acre private estate wedding venue in Stowe, VT. Sleeps 20 overnight, up to 300 tented, no F&B minimums, transparent 2026 pricing.",
    images: [`${PRODUCTION_URL}/opengraph-image.png`],
  },
};

const includedFeatures = [
  "Exclusive use of the 28-acre estate grounds Friday–Sunday (or for a full 7-night wedding week)",
  "Exclusive interior access to the 11,400 sq ft residence for your wedding party and overnight guests (up to 20 guests)*",
  "Multiple scenic outdoor ceremony sites with arbor locations and views of the Worcester Mountain Range",
  "Cocktail hour in the Upper Meadow and outdoor tented meadow receptions for up to 300 guests (with separate back-driveway vendor access)*",
  "Upper patio, formal dining room, and Great Room with stone fireplace available for intimate indoor weddings of 20 guests or fewer",
  "After-party spaces on the stone upper patio or in the Upper Meadow",
  "Event planning manager support, white-glove concierge, and private Wiessner Woods walking, ski, and snowshoe trails",
];

const pricingRows = [
  {
    packageName: "1-Night (Rehearsal Dinner Only)",
    detail: "Up to 25 guests; select interior touring & full grounds access",
    offPeak: "$7,950",
    peak: "$9,950",
  },
  {
    packageName: "Ceremony-Only (Mon–Thurs)",
    detail: "Intimate weekday ceremony; +$500–$1,500 day-of ceremony fee",
    offPeak: "$7,950",
    peak: "$9,950",
  },
  {
    packageName: "1-Night + Rehearsal Dinner**",
    detail: "Overnight buyout + rehearsal dinner celebration",
    offPeak: "$9,950",
    peak: "$11,950",
  },
  {
    packageName: "2-Nights Intimate Wedding",
    detail: "20 guests or fewer across the entire estate",
    offPeak: "$12,950",
    peak: "$14,950",
  },
  {
    packageName: "2-Nights Wedding Weekend**",
    detail: "Includes 20 overnight guests + up to 100 outdoor event guests",
    offPeak: "Starting at $24,950",
    peak: "Starting at $29,950",
  },
  {
    packageName: "7-Nights Wedding Week**",
    detail: "Full week buyout with 20 overnight guests + up to 100 event guests",
    offPeak: "Starting at $34,950",
    peak: "Starting at $39,950",
  },
];

const weddingFaqs: FaqItem[] = [
  {
    question: "How much does a wedding at Eden: The Lemelson Estate cost in 2026?",
    answer:
      "2026 packages start at $7,950 off-peak / $9,950 peak for a Rehearsal Dinner Only or Mon–Thurs Ceremony-Only, $12,950 off-peak / $14,950 peak for a 2-night intimate wedding (20 guests or fewer), $24,950 off-peak / $29,950 peak for a 2-night wedding weekend (up to 100 outdoor guests and 20 overnight), and $34,950 off-peak / $39,950 peak for a 7-night wedding week. Multi-day wedding events do not include the $4,950 administration and event fee, cleaning/linen expenses, catering, alcohol, or third-party rentals.",
  },
  {
    question: "How many wedding guests can Eden host indoors, outdoors, and overnight?",
    answer:
      "Eden sleeps up to 20 overnight guests across 8 bedrooms and 8 bathrooms. Intimate indoor weddings of 20 guests or fewer can host ceremonies and dinners inside the Great Room, formal dining room, and upper patio. Outdoor tented receptions in the Upper Meadow accommodate up to 300 guests (custom pricing applies above 100 guests; when more than 20 guests are present, interior access is reserved exclusively for the wedding party and overnight guests).",
  },
  {
    question: "Are there food and beverage minimums or preset wedding menus?",
    answer:
      "No. Eden never requires preset menu packages or food and beverage minimums. Every couple receives a private culinary consultation with our in-house chef to craft a custom farm-to-table menu—passed hors d'oeuvres, plated dinners, family-style, or buffet—estimated at $110–$120 per person before tax.",
  },
  {
    question: "When is Off-Peak vs. Peak Season at Eden in Stowe?",
    answer:
      "Off-Peak season runs from Mid-April to Mid-May and Mid-October to Mid-November. During cooler off-peak months, Ceremony-Only bookings are typically held indoors inside the estate. Peak season covers late spring, summer, prime fall foliage, and winter ski months.",
  },
  {
    question: "What amenities are included for the wedding party during a weekend buyout?",
    answer:
      "Your wedding party enjoys exclusive access to all 11,400 sq ft and 28 acres, including the bridal primary suite, private lower-level spa (cedar sauna, steam shower, 3 hot tubs), groomsmen game room with pool and foosball, heated seasonal pool (May–Sept), clay tennis court, gym, and stocked wood-burning fireplaces.",
  },
  {
    question: "Can we tour the estate in person before booking our wedding?",
    answer:
      "Yes. Private estate tours can be scheduled through our inquiry form or by emailing admin@lemelsoncapital.com. A non-refundable $150 tour fee applies and is credited in full toward your wedding booking if you reserve the estate.",
  },
  {
    question: "Does Eden offer day-of or month-of wedding coordination?",
    answer:
      "Yes. Couples can add Month-of Event Management and Day-of Coordination—including one lead planner, contract clarity, timeline management, personal tours, and full event-day setup and cleanup—for $1,500–$2,500.",
  },
  {
    question: "What activities are nearby for out-of-town Stowe wedding guests?",
    answer:
      "Located in the Edson Hill Road area of Stowe, Eden is 2 minutes from Topnotch Stables, a 5-minute walk to Wiessner Woods trails, 5 minutes from Stowe Mountain Resort, Bingham Falls, and downtown Stowe restaurants, and 6 minutes from Smugglers' Notch State Park.",
  },
];

export default function WeddingsPage() {
  const videoSchemas = [
    {
      "@context": "https://schema.org",
      "@type": "VideoObject",
      name: "Eden: A Journey Over The Lemelson Estate — Aerial & Bingham Falls Tour",
      description:
        "Aerial video tour of Eden: The Lemelson Estate in Stowe, Vermont, including surrounding mountain views and nearby Bingham Falls.",
      thumbnailUrl: ["https://lemelsonestate.com/gallery/enhanced/2@1200w.webp"],
      contentUrl: "https://youtu.be/P8oBq86qhW0",
      embedUrl: "https://www.youtube.com/embed/P8oBq86qhW0",
      uploadDate: "2025-01-01",
    },
    {
      "@context": "https://schema.org",
      "@type": "VideoObject",
      name: "Eden: The Lemelson Estate — Interior & Grounds Wedding Tour",
      description:
        "Interior and grounds walkthrough of Eden: The Lemelson Estate's Great Room, bridal suite, dining spaces, and mountain grounds in Stowe, Vermont.",
      thumbnailUrl: ["https://lemelsonestate.com/gallery/Eden-Site%20Photos/98@1200w.webp"],
      contentUrl: "https://youtu.be/xm_uA64KCkE",
      embedUrl: "https://www.youtube.com/embed/xm_uA64KCkE",
      uploadDate: "2025-01-01",
    },
  ];

  return (
    <div className="bg-white text-stone-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(videoSchemas) }}
      />

      {/* Editorial Hero */}
      <section className="pt-8 pb-16 md:pt-12 md:pb-24">
        <div className="lux-container space-y-10">
          <Breadcrumbs
            items={[
              { name: "Home", href: "/" },
              { name: "Weddings", href: "/weddings/" },
            ]}
          />

          <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <p className="text-[0.7rem] font-medium uppercase tracking-[0.34em] text-[#8f7845]">
                Edson Hill Road Area · Stowe, Vermont · Est. 2016
              </p>
              <h1 className="mt-4 text-4xl font-normal leading-[1.12] tracking-tight text-stone-900 sm:text-5xl">
                Private Mountain Estate Wedding Venue in Stowe, Vermont
              </h1>
            </div>
            <div className="space-y-5 lg:col-span-5">
              <p className="text-base leading-7 text-stone-600">
                Reserve an entire 28-acre private Vermont estate for your wedding weekend. Celebrate with Worcester Mountain views, overnight lodging for 20, tented meadow receptions up to 300, and zero food and beverage minimums.
              </p>
              <div className="flex flex-wrap items-center gap-6">
                <Link
                  href="/contact/"
                  className="inline-flex items-center bg-stone-950 px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.22em] !text-white transition hover:bg-stone-800"
                >
                  Schedule a Private Tour
                </Link>
                <a
                  href="/Eden-Wedding-Brochure-2026.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border-b border-stone-900 pb-1 text-xs font-semibold uppercase tracking-[0.2em] text-stone-900 transition hover:border-[#8f7845] hover:text-[#8f7845]"
                >
                  2026 Brochure (PDF)
                </a>
              </div>
            </div>
          </div>

          <div className="overflow-hidden bg-stone-100">
            <div className="aspect-[16/9] w-full">
              <ResponsivePhoto
                basePath="/gallery/enhanced/2"
                alt="Aerial view of Eden: The Lemelson Estate grounds, spring-fed pond, and meadow wedding site in Stowe, Vermont"
                sizes="(min-width: 1280px) 1072px, 100vw"
                width={2400}
                height={1600}
                priority={true}
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* What's Included — Asymmetric Magazine Spread */}
      <section className="bg-[#f8f5f0] py-20 md:py-28">
        <div className="lux-container grid gap-12 lg:grid-cols-12 lg:items-center">
          <div className="space-y-6 lg:col-span-6">
            <p className="text-[0.7rem] font-medium uppercase tracking-[0.34em] text-[#8f7845]">
              Exclusive Estate Buyout
            </p>
            <h2 className="text-3xl font-normal tracking-tight text-stone-900 sm:text-4xl">
              What is included in an Eden wedding weekend
            </h2>
            <p className="text-sm leading-7 text-stone-600 sm:text-base">
              We host only a limited number of weddings each year so the entire 28-acre estate belongs exclusively to you—from welcome drinks and rehearsal dinner to ceremony, Upper Meadow tented reception, and farewell brunch.
            </p>
            <ul className="divide-y divide-stone-300/70 border-y border-stone-300/70 text-sm leading-7 text-stone-800">
              {includedFeatures.map((item) => (
                <li key={item} className="py-3.5">
                  {item}
                </li>
              ))}
            </ul>
            <p className="text-xs italic leading-6 text-stone-500">
              *When more than 20 wedding guests are present, interior access to the residence is reserved exclusively for the wedding party and overnight guests staying at the estate.
            </p>
          </div>

          <div className="grid gap-4 lg:col-span-6">
            <ResponsivePhoto
              basePath="/gallery/Eden-Site%20Photos/100"
              alt="Great Room stone fireplace at Eden Estate for intimate winter and indoor wedding ceremonies"
              sizes="(min-width: 1024px) 48vw, 100vw"
              width={2560}
              height={1707}
              className="aspect-[16/10] w-full object-cover"
            />
            <ResponsivePhoto
              basePath="/gallery/enhanced/87"
              alt="Twilight view of the rear stone patio and illuminated windows at Eden: The Lemelson Estate"
              sizes="(min-width: 1024px) 48vw, 100vw"
              width={2400}
              height={1600}
              className="aspect-[16/10] w-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* 2026 Wedding Pricing Table — Clean Architectural Ledger */}
      <section className="bg-white py-20 md:py-28" id="pricing">
        <div className="lux-container max-w-5xl space-y-12">
          <div className="grid gap-6 md:grid-cols-12 md:items-end">
            <div className="md:col-span-7">
              <p className="text-[0.7rem] font-medium uppercase tracking-[0.34em] text-[#8f7845]">
                Transparent 2026 Rates
              </p>
              <h2 className="mt-3 text-3xl font-normal tracking-tight text-stone-900 sm:text-4xl">
                2026 Wedding Packages &amp; Pricing
              </h2>
            </div>
            <p className="text-sm leading-7 text-stone-600 md:col-span-5">
              Off-Peak runs Mid-April to Mid-May and Mid-October to Mid-November. Peak Season covers late spring, summer, prime fall foliage, and winter.
            </p>
          </div>

          <div className="overflow-x-auto border-y border-stone-900/15">
            <table className="w-full min-w-[600px] text-left">
              <thead>
                <tr className="border-b border-stone-200 text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-stone-500">
                  <th className="py-4 pr-6">Package</th>
                  <th className="px-6 py-4">Off-Peak</th>
                  <th className="py-4 pl-6 text-right">Peak Season</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-200 text-sm sm:text-base">
                {pricingRows.map((row) => (
                  <tr key={row.packageName}>
                    <td className="py-5 pr-6">
                      <p className="font-serif text-lg text-stone-900">{row.packageName}</p>
                      <p className="mt-1 text-xs text-stone-500 sm:text-sm">{row.detail}</p>
                    </td>
                    <td className="px-6 py-5 font-medium tabular-nums text-stone-800 whitespace-nowrap">
                      {row.offPeak}
                    </td>
                    <td className="py-5 pl-6 text-right font-medium tabular-nums text-[#8f7845] whitespace-nowrap">
                      {row.peak}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="grid gap-10 pt-2 md:grid-cols-2">
            <div className="space-y-3 text-sm leading-7 text-stone-600">
              <h3 className="text-lg font-normal text-stone-900">Package Notes &amp; Details</h3>
              <p>
                <strong className="font-medium text-stone-900">Rehearsal Dinner-Only:</strong> Includes up to 25 guests (additional fees may apply for larger groups), select interior touring, and full outdoor grounds access.
              </p>
              <p>
                <strong className="font-medium text-stone-900">Ceremony-Only (Mon–Thurs):</strong> Off-peak ceremonies are typically held indoors due to cooler temperatures. Includes a one-time day-of ceremony management fee of $500–$1,500.
              </p>
              <p>
                <strong className="font-medium text-stone-900">**Multi-Day Event Reservations:</strong> Includes up to 20 overnight guests and up to 100 guests for a one-day outdoor event. Totals exclude a $4,950 administration and event fee (waived for rehearsal-dinner-only), cleaning and linen expenses (varies), dining, alcohol, and third-party tent/rental services. Inquire for weddings of 100 to 300 guests.
              </p>
            </div>

            <div className="space-y-4 border-l border-stone-200 pl-0 md:pl-10 text-sm leading-7 text-stone-600">
              <h3 className="text-lg font-normal text-stone-900">
                Optional Planning &amp; Private Tours
              </h3>
              <p>
                <strong className="font-medium text-stone-900">Month-of &amp; Day-of Coordinator ($1,500–$2,500):</strong> One dedicated lead planner guiding planning logistics, contract clarity, personal walkthroughs, and full event-day setup and cleanup.
              </p>
              <p>
                <strong className="font-medium text-stone-900">Private Estate Tours ($150):</strong> Walk the Upper Meadow, ceremony sites, and residence in person. The non-refundable $150 tour fee is credited 100% toward your wedding booking.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Bespoke Dining — Editorial Feature */}
      <section className="bg-[#f8f5f0] py-20 md:py-28">
        <div className="lux-container max-w-4xl">
          <div className="border-y border-stone-300/80 py-12 md:py-16">
            <p className="text-[0.7rem] font-medium uppercase tracking-[0.34em] text-[#8f7845]">
              Bespoke Wedding Dining
            </p>
            <h2 className="mt-3 text-3xl font-normal tracking-tight text-stone-900 sm:text-4xl">
              No preset menus. No food &amp; beverage minimums.
            </h2>
            <p className="mt-5 text-base leading-8 text-stone-600">
              Unlike traditional Vermont resorts that lock couples into rigid banquet tiers and steep food-and-beverage minimums, Eden works with you to craft a personal culinary experience. Every couple is scheduled for a private consultation with our in-house chef to design passed hors d&apos;oeuvres, plated dinners, family-style feasts, or buffet presentations—thoughtfully tailored for all dietary preferences and guest counts up to 300.
            </p>
            <p className="mt-6 font-serif text-xl text-stone-900">
              In-House Chef Dining Estimate: <span className="text-[#8f7845]">$110–$120 per person</span>{" "}
              <span className="font-sans text-xs text-stone-500">(before tax; varies by market availability)</span>
            </p>
          </div>
        </div>
      </section>

      {/* Accommodations, Team, Chapel & Stories */}
      <section className="bg-white py-20 md:py-28">
        <div className="lux-container space-y-20">
          <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
            <div className="space-y-4 lg:col-span-5">
              <p className="text-[0.7rem] font-medium uppercase tracking-[0.34em] text-[#8f7845]">
                Bridal Accommodations &amp; Spa
              </p>
              <h2 className="text-3xl font-normal tracking-tight text-stone-900 sm:text-4xl">
                A private luxury home for your wedding party
              </h2>
              <p className="text-sm leading-7 text-stone-600 sm:text-base">
                Keep your closest family and wedding party together under one roof in 11,400 square feet across 8 bedrooms and 8 bathrooms. Relax before &ldquo;I Do&rdquo; in the private spa—complete with cedar sauna, steam shower, and three hot tubs—while groomsmen enjoy the game room&apos;s pool and foosball tables, or head out to the heated pool and clay tennis court.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4 lg:col-span-7">
              <ResponsivePhoto
                basePath="/gallery/Eden-Site%20Photos/102"
                alt="Bridal primary bedroom suite at Eden: The Lemelson Estate"
                sizes="(min-width: 1024px) 30vw, 50vw"
                width={2560}
                height={1707}
                className="aspect-[4/3] w-full object-cover"
              />
              <ResponsivePhoto
                basePath="/gallery/enhanced/70"
                alt="Private cedar sauna in the bridal spa retreat at Eden"
                sizes="(min-width: 1024px) 30vw, 50vw"
                width={2400}
                height={1600}
                className="aspect-[4/3] w-full object-cover"
              />
            </div>
          </div>

          <div className="grid gap-12 border-t border-stone-200 pt-14 md:grid-cols-2">
            <div className="space-y-3">
              <p className="text-[0.68rem] font-medium uppercase tracking-[0.28em] text-[#8f7845]">
                Dedicated Estate Concierge &amp; Events
              </p>
              <h3 className="text-2xl font-normal text-stone-900">Meet Tiffany M.</h3>
              <p className="text-sm leading-7 text-stone-600 sm:text-base">
                With over 15 years of experience serving high-net-worth families and four years with The Lemelson Group, Tiffany brings meticulous estate management, distinctive concierge care, and calm coordination to every moment of your wedding weekend—from your first tour through farewell brunch.
              </p>
            </div>

            <div className="space-y-3">
              <p className="text-[0.68rem] font-medium uppercase tracking-[0.28em] text-[#8f7845]">
                Adjacent on the Estate Grounds
              </p>
              <h3 className="text-2xl font-normal text-stone-900">St. Katherine Orthodox Chapel</h3>
              <p className="text-sm leading-7 text-stone-600 sm:text-base">
                St. Katherine Orthodox Chapel, dedicated to St. Katherine of Alexandria, is a consecrated Greek Orthodox chapel adjacent to Eden and part of The Lemelson Estate. Divine Liturgy is celebrated on Sundays at 10:00 a.m. EST from early September through June. The chapel is closed outside the liturgical schedule, and reverence and proper attire are required when visiting.
              </p>
            </div>
          </div>

          {/* Editorial Quotes & Video Links */}
          <div className="space-y-10 border-t border-stone-200 pt-14">
            <div className="grid gap-10 md:grid-cols-2">
              <blockquote className="space-y-4 border-l border-[#c2a060] pl-6">
                <p className="font-serif text-lg italic leading-relaxed text-stone-800">
                  &ldquo;We had our ceremony in the great room with the fireplace roaring—a fiery love story. The main bedroom was a wonderful bridal suite... The steam shower and sauna were a wonderful way to relax in the chill of a late February snowstorm. Would suggest Eden for your wedding, small or big.&rdquo;
                </p>
                <footer className="text-[0.68rem] font-medium uppercase tracking-[0.22em] text-stone-500">
                  Seanna C. · Winter Great Room Wedding
                </footer>
              </blockquote>

              <blockquote className="space-y-4 border-l border-[#c2a060] pl-6">
                <p className="font-serif text-lg italic leading-relaxed text-stone-800">
                  &ldquo;My daughter and her wedding party recently stayed at Eden – The Lemelson Estate, in Stowe, Vermont. The property boasts a secluded setting with beautiful views and yet is close to all Stowe has to offer. The estate is immaculate and luxurious, with every amenity one would expect.&rdquo;
                </p>
                <footer className="text-[0.68rem] font-medium uppercase tracking-[0.22em] text-stone-500">
                  John A. · Wedding Party Stay, September 2024
                </footer>
              </blockquote>
            </div>

            <div className="flex flex-wrap items-center gap-x-8 gap-y-3 pt-2 text-xs font-semibold uppercase tracking-[0.2em]">
              <Link
                href="/weddings/real-weddings/"
                className="border-b border-stone-900 pb-1 text-stone-900 transition hover:border-[#8f7845] hover:text-[#8f7845]"
              >
                Read Real Wedding Stories
              </Link>
              <a
                href="https://youtu.be/P8oBq86qhW0"
                target="_blank"
                rel="noopener noreferrer"
                className="border-b border-stone-300 pb-1 text-stone-600 transition hover:border-stone-900 hover:text-stone-900"
              >
                Aerial &amp; Bingham Falls Tour (YouTube)
              </a>
              <a
                href="https://youtu.be/xm_uA64KCkE"
                target="_blank"
                rel="noopener noreferrer"
                className="border-b border-stone-300 pb-1 text-stone-600 transition hover:border-stone-900 hover:text-stone-900"
              >
                Interior Estate Tour (YouTube)
              </a>
            </div>
          </div>
        </div>
      </section>

      <FaqSection
        title="Stowe Estate Wedding FAQs"
        description="Answers to the most common questions couples and wedding planners ask about hosting a wedding at Eden."
        items={weddingFaqs}
      />

      {/* Closing CTA */}
      <section className="border-t border-stone-200 bg-[#f8f5f0] py-20 md:py-24">
        <div className="lux-container max-w-3xl text-center">
          <p className="text-[0.7rem] font-medium uppercase tracking-[0.34em] text-[#8f7845]">
            Inquiries &amp; Private Tours
          </p>
          <h2 className="mt-3 text-3xl font-normal tracking-tight text-stone-900 sm:text-4xl">
            Let&apos;s Plan Your Eden Wedding
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-stone-600 sm:text-base">
            Inquire to check 2026–2027 date availability, schedule a private estate tour, or coordinate a custom multi-day wedding buyout with Tiffany and our concierge team.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-6">
            <Link
              href="/contact/"
              className="inline-flex items-center bg-stone-950 px-8 py-3.5 text-xs font-semibold uppercase tracking-[0.22em] !text-white transition hover:bg-stone-800"
            >
              Inquire About Dates
            </Link>
            <a
              href="/Eden-Wedding-Brochure-2026.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="border-b border-stone-900 pb-1 text-xs font-semibold uppercase tracking-[0.2em] text-stone-900 transition hover:border-[#8f7845] hover:text-[#8f7845]"
            >
              Download 2026 Brochure (PDF)
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
