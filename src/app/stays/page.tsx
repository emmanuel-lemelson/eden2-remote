import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { FaqSection, type FaqItem } from "@/components/FaqSection";
import { ResponsivePhoto } from "@/components/ResponsivePhoto";

export const dynamic = "force-static";

const PRODUCTION_URL = "https://lemelsonestate.com";

export const metadata: Metadata = {
  title: "Luxury Vacation Rental in Stowe, VT | 8-Bedroom Mountain Estate — Eden",
  description:
    "Book direct at Eden: an 11,400 sq ft, 8-bedroom pet-friendly luxury vacation rental in Stowe, Vermont. Sleeps 20, 5 min from Stowe Mountain Resort, with heated pool, 3 hot tubs, sauna, gym & concierge.",
  alternates: {
    canonical: `${PRODUCTION_URL}/stays/`,
  },
  openGraph: {
    title: "Luxury Vacation Rental in Stowe, VT | 8-Bedroom Mountain Estate — Eden",
    description:
      "Book direct at Eden: an 11,400 sq ft, 8-bedroom pet-friendly luxury vacation rental in Stowe, Vermont. Sleeps 20, 5 min from Stowe Mountain Resort, with heated pool, 3 hot tubs, sauna, gym & concierge.",
    url: `${PRODUCTION_URL}/stays/`,
    type: "website",
    images: [
      {
        url: `${PRODUCTION_URL}/opengraph-image.png`,
        width: 1200,
        height: 630,
        alt: "Eden: The Lemelson Estate luxury vacation rental in Stowe, Vermont",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@LemelsonEstate",
    title: "Luxury Vacation Rental in Stowe, VT | 8-Bedroom Mountain Estate — Eden",
    description:
      "8-bedroom, 11,400 sq ft pet-friendly luxury estate in Stowe, Vermont. Sleeps 20 guests, 5 min from Stowe Mountain Resort. Book direct with zero platform fees.",
    images: [`${PRODUCTION_URL}/opengraph-image.png`],
  },
};

const quickSpecs = [
  { label: "Accommodations", value: "8 Bedrooms · 8 Bathrooms" },
  { label: "Overnight Capacity", value: "Sleeps up to 20 Guests" },
  { label: "Estate Scale", value: "11,400 sq ft · 28 Acres" },
  { label: "Ski & Resort Access", value: "5 Min to Stowe Mtn Resort" },
  { label: "Pet Policy", value: "Pet-Friendly Stays Welcome" },
  { label: "Direct Booking", value: "Zero Airbnb / Vrbo Fees" },
];

const amenityPillars = [
  {
    title: "Private Wellness & Three Spa Areas",
    description:
      "Unwind after skiing or hiking across three distinct spa settings: a year-round 24-hour 10-person outdoor hot tub, a 2-person indoor spa, and a scenic mountain-view garden spa—paired with a private cedar sauna, steam shower, and seasonal heated outdoor swimming pool (May–September).",
  },
  {
    title: "Gourmet Chef's Kitchen & Outdoor Dining",
    description:
      "Built for celebratory group meals with a Sub-Zero refrigerator, Thermador stainless steel gas range, double ovens, Nespresso, Keurig, and drip coffee makers, wine glassware, stone patio dining, and a private outdoor gas BBQ grill—plus optional in-house private chef service.",
  },
  {
    title: "Multi-Gen Family & Reunion Ready",
    description:
      "Designed for multi-family vacations and milestone reunions with a dedicated indoor children's playroom, toys and books for ages 0–10+, standard crib, Pack 'n Play, baby bath, baby safety gates, fireplace guards, board games, kids' bikes, and seasonal pool toys.",
  },
  {
    title: "Fitness, Recreation & Entertainment",
    description:
      "Enjoy a private home gym (treadmill, elliptical, stationary bike, free weights, workout bench, yoga mats), private clay tennis court, twin spring-fed ponds (one stocked with trout), game room with pool table and foosball, 86-inch smart TV, Sonos sound system, grand piano, and wood-burning fireplaces.",
  },
  {
    title: "Executive Remote Work & Extended Stays",
    description:
      "Stay connected on workcations or extended 28+ day Stowe stays with high-speed fiber-optic Wi-Fi, wired Ethernet, and a dedicated private office featuring a monitor, ergonomic chair, laptop stand, and printer—plus keypad self check-in and luggage drop-off.",
  },
  {
    title: "Pet-Friendly & White-Glove Concierge",
    description:
      "Bring the whole family—pets are welcome at Eden. Our complimentary concierge team can pre-stock groceries, arrange in-home massages and private yoga, book Stowe lift tickets or airport transfers from Burlington (BTV), and coordinate private chefs.",
  },
];

const levelBreakdown = [
  {
    level: "First Floor",
    subtitle: "Grand Gathering & Main-Level Living",
    rooms: [
      "Soaring double-height Great Room with timber trusses, massive stone wood-burning fireplace, Chesterfield sofas, and grand piano",
      "Formal Dining Room, sunlit Breakfast Room, 3-Seasons Sunroom with fireplace, and dedicated Music Room",
      "Chef's Kitchen with Sub-Zero & Thermador appliances plus laundry room",
      "2nd Primary Suite with private bath + 3 additional main-level guest bedrooms (Blue, Yellow, and Pink bedrooms)",
    ],
  },
  {
    level: "Second Floor",
    subtitle: "Palatial Primary Wing & Private Apartment Suite",
    rooms: [
      "Primary Bedroom Suite with private balcony overlooking the mountains, Primary Lounge, dressing closets, and marble soaking tub en-suite",
      "Adjacent Nursery and private Executive Office & bathroom overlooking the grand stair landing",
      "Self-contained upper-level Apartment Suite with private entrance, apartment kitchen, living room, primary bedroom, twin bedroom, and full bath—ideal for grandparents, au pairs, or couples wanting extra privacy",
    ],
  },
  {
    level: "Lower Level",
    subtitle: "Private Spa Sanctuary & Recreation Wing",
    rooms: [
      "Dedicated indoor Spa Room, private dry cedar Sauna, steam shower, and changing area",
      "Expansive Game Room & Recreation Room with pool table, foosball, and lounge seating",
      "Private fitness center equipped with cardio machines, free weights, and workout bench",
    ],
  },
];

const nearbyDistances = [
  { place: "Topnotch Stable & Equestrian Center", distance: "2 min drive", detail: "Year-round horseback riding and winter sleigh rides" },
  { place: "Notchbrook Swimming Hole", distance: "3 min drive", detail: "Quiet local mountain swimming spot on Notchbrook Rd" },
  { place: "Wiessner Woods & Catamount Trail", distance: "5 min walk", detail: "Conserved forest trails for hiking, snowshoeing & cross-country skiing" },
  { place: "Stowe Mountain Resort & Mount Mansfield", distance: "5 min drive", detail: "World-class skiing, snowboarding, golf & Spruce Peak ice skating" },
  { place: "Bingham Falls", distance: "5 min drive", detail: "40-foot cascading waterfall, deep gorges & scenic forest trails" },
  { place: "Smugglers' Notch State Park", distance: "6 min drive", detail: "Scenic mountain pass, Long Trail access, Sterling Pond & hiking" },
  { place: "Stowe Recreation Path & Downtown Village", distance: "Minutes away", detail: "5.3-mile paved riverside greenway, dining, boutiques & breweries" },
];

const staysFaqs: FaqItem[] = [
  {
    question: "How many guests and bedrooms does Eden: The Lemelson Estate accommodate?",
    answer:
      "Eden accommodates up to 20 overnight guests across 8 bedrooms and 8 full bathrooms within 11,400 square feet of living space on 28 private acres in the Edson Hill Road area of Stowe, Vermont.",
  },
  {
    question: "Is Eden: The Lemelson Estate pet-friendly?",
    answer:
      "Yes. Eden is a pet-friendly luxury vacation rental in Stowe, VT, allowing guests to bring dogs and travel with the entire family. Please include pet details in your inquiry so our estate team can prepare for your arrival.",
  },
  {
    question: "How close is the estate to Stowe Mountain Resort and skiing?",
    answer:
      "Eden is approximately a 5-minute drive from Stowe Mountain Resort lifts on Mount Mansfield, the ice-skating rink at Spruce Peak, and downtown Stowe Village—and just a 5-minute walk from Wiessner Woods cross-country ski and snowshoe trails.",
  },
  {
    question: "Are the hot tubs, sauna, and heated pool available year-round?",
    answer:
      "The 10-person outdoor hot tub, 2-person indoor spa, mountain-view garden spa, private cedar sauna, and steam shower are available year-round. The heated outdoor swimming pool is open seasonally from May through September.",
  },
  {
    question: "Why book directly on lemelsonestate.com instead of Airbnb or Vrbo?",
    answer:
      "Booking directly through our estate team eliminates third-party platform service fees charged by Airbnb, Vrbo, and Expedia, guarantees the best available rate, and connects you directly with our Stowe concierge team from day one.",
  },
  {
    question: "What makes Eden ideal for multi-generational family reunions or fall foliage trips?",
    answer:
      "Eden pairs resort-grade amenities for adults—3 hot tubs, sauna, gym, clay tennis court, trout ponds, and panoramic fall foliage views—with a dedicated children's playroom, cribs, baby gear, and an upper-level private apartment suite for extra quiet.",
  },
  {
    question: "Can we arrange a private chef, grocery pre-stocking, or wellness services?",
    answer:
      "Yes. Complimentary concierge service is included with every stay. Our team regularly arranges private farm-to-table chef dinners, pre-arrival fridge stocking, in-home massages, private yoga sessions, and Stowe adventure itineraries.",
  },
];

export default function StaysPage() {
  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="bg-white pt-8 pb-12 md:pt-12 md:pb-16">
        <div className="lux-container space-y-8">
          <Breadcrumbs
            items={[
              { name: "Home", href: "/" },
              { name: "Stays", href: "/stays/" },
            ]}
          />
          <div className="mx-auto max-w-4xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.38em] text-[#8f7845]">
              Edson Hill Road Area · Stowe, Vermont
            </p>
            <h1 className="mt-3 text-3xl font-semibold leading-tight text-stone-900 text-balance sm:text-4xl md:text-5xl">
              Luxury 8-Bedroom Vacation Rental in Stowe, Vermont
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-stone-700 md:text-lg">
              Set on 28 secluded acres five minutes from Stowe Mountain Resort, Eden is an 11,400 sq ft private mountain estate sleeping up to 20 guests—with heated pool, three hot tubs, cedar sauna, private gym, clay tennis court, and pet-friendly hospitality.
            </p>

            <div className="mt-7 flex flex-col items-center gap-3">
              <div className="flex flex-wrap items-center justify-center gap-4">
                <Link
                  href="/contact/"
                  className="inline-flex items-center rounded-full bg-[#111111] px-8 py-3.5 text-[0.95rem] font-semibold !text-white transition duration-200 hover:bg-stone-800 active:scale-[0.98]"
                >
                  Book Direct &amp; Check Dates
                </Link>
                <Link
                  href="/gallery/"
                  className="inline-flex items-center rounded-full border border-stone-900 px-8 py-3.5 text-[0.95rem] font-semibold text-stone-900 transition duration-200 hover:bg-stone-50"
                >
                  Explore Full Gallery
                </Link>
              </div>
              <p className="text-xs font-medium tracking-[0.03em] text-stone-600 sm:text-[0.8125rem]">
                Zero third-party Airbnb or Vrbo fees • Best rate guaranteed • Pet-friendly • 62 five-star reviews
              </p>
            </div>
          </div>

          <div className="overflow-hidden rounded-3xl border border-stone-200 shadow-xl">
            <div className="aspect-[16/9] w-full">
              <ResponsivePhoto
                basePath="/gallery/enhanced/2"
                alt="Aerial sunset view of Eden: The Lemelson Estate 28-acre luxury vacation rental in Stowe, Vermont with pool and spring-fed pond"
                sizes="(min-width: 1280px) 1072px, 100vw"
                width={2400}
                height={1600}
                priority={true}
                className="h-full w-full object-cover"
              />
            </div>
          </div>

          <dl className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {quickSpecs.map((spec) => (
              <div
                key={spec.label}
                className="rounded-2xl border border-[#d2c4a3]/50 bg-[#fdfbf7] p-4 text-center"
              >
                <dt className="text-[0.65rem] font-bold uppercase tracking-[0.18em] text-stone-500">
                  {spec.label}
                </dt>
                <dd className="mt-1.5 text-sm font-semibold text-stone-900">
                  {spec.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Private Resort Amenities */}
      <section className="lux-section bg-gradient-to-br from-[var(--color-linen)] via-[var(--color-eggshell)] to-[var(--color-cream)]">
        <div className="lux-container space-y-10">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#8f7845]">
              Private Resort Amenities
            </p>
            <h2 className="mt-2 text-3xl font-semibold text-stone-900 sm:text-4xl">
              Five-star resort amenities, reserved exclusively for your group
            </h2>
            <p className="mt-3 text-base leading-relaxed text-stone-700">
              Whether you are planning a Stowe ski chalet week, a peak October foliage escape, or a multi-generational Vermont family reunion, every amenity on the 28-acre grounds is yours alone.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {amenityPillars.map((pillar) => (
              <div
                key={pillar.title}
                className="rounded-3xl border border-[#d2c4a3]/50 bg-white/85 p-6 shadow-[0_20px_45px_-30px_rgba(58,45,20,0.2)] sm:p-7"
              >
                <h3 className="text-xl font-semibold text-stone-900">{pillar.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-stone-700">{pillar.description}</p>
              </div>
            ))}
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="overflow-hidden rounded-2xl border border-white/80 shadow-md">
              <ResponsivePhoto
                basePath="/gallery/Eden-Site%20Photos/113"
                alt="Heated seasonal outdoor swimming pool and stone patio at Eden Estate in Stowe, VT"
                sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                width={2560}
                height={1920}
                className="aspect-[4/3] w-full object-cover"
              />
            </div>
            <div className="overflow-hidden rounded-2xl border border-white/80 shadow-md">
              <ResponsivePhoto
                basePath="/gallery/enhanced/90"
                alt="Year-round outdoor hot tub overlooking the spring-fed pond and Worcester Mountains"
                sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                width={2400}
                height={1600}
                className="aspect-[4/3] w-full object-cover"
              />
            </div>
            <div className="overflow-hidden rounded-2xl border border-white/80 shadow-md">
              <ResponsivePhoto
                basePath="/gallery/enhanced/70"
                alt="Private indoor dry cedar sauna inside the lower-level spa wing at Eden"
                sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                width={2400}
                height={1600}
                className="aspect-[4/3] w-full object-cover"
              />
            </div>
            <div className="overflow-hidden rounded-2xl border border-white/80 shadow-md">
              <ResponsivePhoto
                basePath="/gallery/Eden-Site%20Photos/98"
                alt="Great Room with soaring timber trusses, stone fireplace, Chesterfield sofas, and grand piano"
                sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                width={2560}
                height={1704}
                className="aspect-[4/3] w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Accommodations & Floor Breakdown */}
      <section className="lux-section bg-white">
        <div className="lux-container space-y-10">
          <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#8f7845]">
                11,400 Sq Ft Across Three Levels
              </p>
              <h2 className="mt-2 text-3xl font-semibold text-stone-900 sm:text-4xl">
                Eight bedrooms &amp; eight bathrooms designed for up to 20 guests
              </h2>
              <p className="mt-3 text-base leading-relaxed text-stone-700">
                Unlike cramped ski condos, Eden spreads generously across three expansive levels—including two primary suites and a private, self-contained upper-level apartment suite—so large groups gather effortlessly and still enjoy quiet personal space.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="overflow-hidden rounded-2xl border border-stone-200 shadow-md">
                <ResponsivePhoto
                  basePath="/gallery/Eden-Site%20Photos/102"
                  alt="Primary king bedroom suite with vaulted ceilings at Eden Estate in Stowe"
                  sizes="(min-width: 1024px) 25vw, 50vw"
                  width={2560}
                  height={1707}
                  className="aspect-[4/3] w-full object-cover"
                />
              </div>
              <div className="overflow-hidden rounded-2xl border border-stone-200 shadow-md">
                <ResponsivePhoto
                  basePath="/gallery/Eden-Site%20Photos/103"
                  alt="Primary marble bathroom en-suite with soaking tub under mountain-view arched window"
                  sizes="(min-width: 1024px) 25vw, 50vw"
                  width={2560}
                  height={1707}
                  className="aspect-[4/3] w-full object-cover"
                />
              </div>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {levelBreakdown.map((lvl) => (
              <div
                key={lvl.level}
                className="rounded-3xl border border-stone-200 bg-[#fdfbf7] p-6 sm:p-7"
              >
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#8f7845]">
                  {lvl.level}
                </p>
                <h3 className="mt-1 text-xl font-semibold text-stone-900">{lvl.subtitle}</h3>
                <ul className="mt-4 space-y-2.5 text-sm leading-relaxed text-stone-700">
                  {lvl.rooms.map((room) => (
                    <li key={room} className="flex gap-2.5">
                      <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#c2a060]" />
                      <span>{room}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Four-Season Location */}
      <section className="lux-section bg-gradient-to-br from-[var(--color-linen)] via-[var(--color-eggshell)] to-[var(--color-cream)]">
        <div className="lux-container grid gap-10 lg:grid-cols-5 lg:items-center">
          <div className="space-y-4 lg:col-span-2">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#8f7845]">
              Four-Season Stowe Setting
            </p>
            <h2 className="text-3xl font-semibold text-stone-900 sm:text-4xl">
              Minutes from Stowe Mountain Resort, surrounded by trails
            </h2>
            <p className="text-sm leading-relaxed text-stone-700 sm:text-base">
              Tucked in the sought-after Edson Hill Road area of Stowe, Eden pairs complete mountain privacy with effortless access to winter skiing on Mount Mansfield, peak October fall foliage, and summer swimming holes.
            </p>
            <div className="overflow-hidden rounded-2xl border border-white/80 shadow-md">
              <ResponsivePhoto
                basePath="/gallery/enhanced/86"
                alt="Eden Estate surrounded by vibrant orange and red Vermont autumn foliage in Stowe"
                sizes="(min-width: 1024px) 40vw, 100vw"
                width={1024}
                height={1024}
                className="aspect-[16/10] w-full object-cover"
              />
            </div>
            <div className="flex flex-wrap gap-2 pt-1">
              <Link
                href="/guides/stowe-ski-house/"
                className="rounded-full border border-[#c2a060]/60 bg-white px-4 py-1.5 text-xs font-semibold text-stone-800 transition hover:border-[#8f7845] hover:text-[#8f7845]"
              >
                Winter &amp; Ski Guide →
              </Link>
              <Link
                href="/guides/stowe-fall-foliage/"
                className="rounded-full border border-[#c2a060]/60 bg-white px-4 py-1.5 text-xs font-semibold text-stone-800 transition hover:border-[#8f7845] hover:text-[#8f7845]"
              >
                Fall Foliage Guide →
              </Link>
              <Link
                href="/guides/stowe-family-reunions/"
                className="rounded-full border border-[#c2a060]/60 bg-white px-4 py-1.5 text-xs font-semibold text-stone-800 transition hover:border-[#8f7845] hover:text-[#8f7845]"
              >
                Family Reunion Guide →
              </Link>
            </div>
          </div>

          <div className="overflow-hidden rounded-3xl border border-[#d2c4a3]/50 bg-white/90 shadow-sm lg:col-span-3">
            <div className="divide-y divide-stone-200/80">
              {nearbyDistances.map((item) => (
                <div
                  key={item.place}
                  className="flex flex-col justify-between gap-1 px-6 py-4 sm:flex-row sm:items-center sm:gap-4"
                >
                  <div>
                    <p className="font-semibold text-stone-900">{item.place}</p>
                    <p className="text-xs text-stone-600 sm:text-sm">{item.detail}</p>
                  </div>
                  <span className="inline-flex w-fit flex-shrink-0 rounded-full bg-[#f8f3ea] px-3.5 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-[#8f7845]">
                    {item.distance}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <FaqSection
        title="Stowe Vacation Rental FAQs"
        description="Everything guests ask before reserving Eden directly for ski weeks, foliage getaways, and family reunions."
        items={staysFaqs}
      />

      {/* Bottom CTA */}
      <section className="lux-section border-t border-stone-200/70 bg-[#fdfbf7]">
        <div className="lux-container max-w-4xl text-center">
          <h2 className="text-3xl font-semibold text-stone-900 sm:text-4xl">
            Reserve Your Stowe Mountain Stay Direct
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-base text-stone-700">
            Skip third-party booking fees and plan your stay directly with our Stowe estate team. Looking for a{" "}
            <Link href="/weddings/" className="font-semibold text-[#8f7845] underline underline-offset-4">
              private estate wedding
            </Link>{" "}
            or{" "}
            <Link href="/retreats/" className="font-semibold text-[#8f7845] underline underline-offset-4">
              corporate executive retreat
            </Link>
            ? Explore our dedicated event packages.
          </p>
          <div className="mt-7 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/contact/"
              className="inline-flex items-center rounded-full bg-[#111111] px-8 py-3.5 text-[0.95rem] font-semibold !text-white transition duration-200 hover:bg-stone-800"
            >
              Check Availability &amp; Rates
            </Link>
            <Link
              href="/reviews/"
              className="inline-flex items-center rounded-full border border-stone-900 px-8 py-3.5 text-[0.95rem] font-semibold text-stone-900 transition duration-200 hover:bg-stone-50"
            >
              Read 62 Five-Star Reviews
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
