import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ResponsivePhoto } from "@/components/ResponsivePhoto";
import { RevealBlock, ScalingHeroTitle } from "@/components/WeddingMotion";
import { WeddingSpacesTabs } from "@/components/WeddingSpacesTabs";

export const dynamic = "force-static";

const PRODUCTION_URL = "https://lemelsonestate.com";

export const metadata: Metadata = {
  title: "Stowe, Vermont Private Estate Wedding Venue | Eden: The Lemelson Estate",
  description:
    "Reserve an exclusive 28-acre mountain estate in Stowe, Vermont for your wedding weekend. Sleeps 20 overnight across 8 bedrooms, hosts tented receptions up to 300, with custom menus and no food & beverage minimums.",
  alternates: {
    canonical: `${PRODUCTION_URL}/weddings/`,
  },
  openGraph: {
    title: "Stowe, Vermont Private Estate Wedding Venue | Eden: The Lemelson Estate",
    description:
      "Exclusive 28-acre private estate wedding venue in Stowe, Vermont. Sleeps 20 overnight, hosts tented receptions up to 300, custom Vermont dining, and private mountain grounds.",
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
    title: "Stowe, Vermont Private Estate Wedding Venue | Eden: The Lemelson Estate",
    description:
      "Exclusive 28-acre private estate wedding venue in Stowe, VT. Sleeps 20 overnight, up to 300 tented, custom menus & zero F&B minimums.",
    images: [`${PRODUCTION_URL}/opengraph-image.png`],
  },
};

const weekendPanels = [
  {
    verb: "Arrive",
    caption:
      "On Friday afternoon, arrive along the tree-lined circular drive to 28 private acres, settle into eight bedrooms, and gather by the stone hearth for an evening welcome.",
    photo: "/gallery/Eden-Site%20Photos/1",
    alt: "Grand front entrance of Eden: The Lemelson Estate in Stowe, Vermont",
  },
  {
    verb: "Celebrate",
    caption:
      "Exchange vows overlooking the Worcester Mountain Range before a tented Upper Meadow reception for up to 300 guests and an evening celebration across the estate.",
    photo: "/gallery/enhanced/3",
    alt: "Aerial dusk view of Eden: The Lemelson Estate Upper Meadow and mountain backdrop",
  },
  {
    verb: "Linger",
    caption:
      "Spend Sunday morning together on the sunlit three-seasons porch before departure.",
    photo: "/gallery/enhanced/31",
    alt: "Three-seasons sunroom with wicker seating and lit stone fireplace at Eden",
  },
];

const estateFacts = [
  { label: "Grounds", value: "28 private acres" },
  { label: "Residence", value: "20 overnight guests" },
  { label: "Upper Meadow", value: "Up to 300 tented" },
  { label: "Location", value: "5 min to Stowe Mtn" },
];

const weddingStories = [
  {
    season: "Winter Great Room wedding · February",
    title: "Seanna C.",
    quote:
      "We had our ceremony in the great room with the fireplace roaring—a fiery love story. The steam shower and sauna were a wonderful way to relax in the chill of a late February snow storm... All the bedrooms were utilized for our families to stay in—no need for hiring Uber or transportation.",
    credit: "Verified Review · The Knot & Airbnb",
    photo: "/gallery/Eden-Site%20Photos/83",
    alt: "Bride and groom embracing outside Eden in Stowe snow during a winter wedding",
    imgClass: "h-full w-full object-cover object-[50%_20%]",
  },
  {
    season: "Intimate elopement · 14 guests",
    title: "Kayli’s winter elopement",
    quote:
      "We had our elopement at Eden this weekend with 14 of our closest family members and our two dogs. From the moment we drove up the driveway to check in we were in awe of how beautiful the property was. Everything was absolutely perfect!",
    credit: "Verified Review · Airbnb",
    photo: "/gallery/Eden-Site%20Photos/82",
    alt: "Winter bride outdoors in white gown and fur wrap against snowy Stowe trees",
    imgClass: "h-full w-full object-cover object-[50%_18%]",
  },
  {
    season: "Wedding party lodging & portraits",
    title: "John A. & Jeff A.",
    quote:
      "The venue itself was spacious and beautiful, with a stunning grand staircase, opulent rooms and gorgeous grounds providing the ideal backdrop for wedding photos.",
    credit: "Verified Reviews · Zola & The Knot",
    photo: "/gallery/Eden-Site%20Photos/14",
    alt: "Bride standing on the grand curving staircase inside Eden Estate holding her bouquet",
    imgClass: "h-full w-full object-cover object-[50%_18%]",
  },
];

const weddingFaqs = [
  {
    question:
      "We're planning a 150-guest reception, with close family staying in the house. How does the 20-guest indoor rule work?",
    answer:
      "Up to 20 overnight guests sleep across 8 bedrooms and 8 bathrooms, and intimate gatherings of 20 or fewer can hold ceremonies inside the Great Room, formal dining room, and upper patio. For tented Upper Meadow receptions above 20 guests (up to 300), the celebration takes place outdoors and interior residence access stays reserved exclusively for overnight guests and the wedding party.",
  },
  {
    question: "What happens if it rains during a tented wedding, or if we want a winter ceremony?",
    answer:
      "Once guest counts exceed 20, celebrations take place outdoors, so larger spring, summer, and autumn weddings use tented outdoor setups on the grounds for weather coverage. Intimate winter celebrations of 20 guests or fewer take place indoors beside the Great Room stone fireplace.",
  },
  {
    question: "Can we bring outside wedding planners and caterers, or do we have to use a set menu?",
    answer:
      "Eden does not require preset banquet menus or food and beverage minimums. You may work with your wedding planner and outside catering, tent, and rental teams, or arrange custom menus and private chef services through our estate coordinator.",
  },
  {
    question: "Is St. Katherine Chapel on the grounds available for guest visits or ceremonies?",
    answer:
      "Adjacent on the grounds, St. Katherine Chapel is a consecrated Greek Orthodox chapel that celebrates Sunday Divine Liturgy at 10 a.m. EST from September through June. It remains closed outside liturgical hours, and we ask guests to treat the chapel grounds with reverence.",
  },
  {
    question: "What wedding stay lengths are available, and how do we tour Eden first?",
    answer:
      "Couples reserve Eden for Friday-to-Sunday wedding weekends, seven-night wedding weeks, intimate 20-guest ceremonies, weekday elopements, or private rehearsal dinners. Share your preferred dates and approximate guest count through our inquiry form to request our brochure and arrange a private tour.",
  },
];

export default function WeddingsPage() {
  const videoSchemas = [
    {
      "@context": "https://schema.org",
      "@type": "VideoObject",
      name: "Eden: A Journey Over The Lemelson Estate, Aerial & Bingham Falls Tour",
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
      name: "Eden: The Lemelson Estate, Interior & Grounds Wedding Tour",
      description:
        "Interior and grounds walkthrough of Eden: The Lemelson Estate's Great Room, bridal suite, dining spaces, and mountain grounds in Stowe, Vermont.",
      thumbnailUrl: ["https://lemelsonestate.com/gallery/Eden-Site%20Photos/98@1200w.webp"],
      contentUrl: "https://youtu.be/xm_uA64KCkE",
      embedUrl: "https://www.youtube.com/embed/xm_uA64KCkE",
      uploadDate: "2025-01-01",
    },
  ];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: weddingFaqs.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <div className="bg-white text-[#1f1b17]">
      <Breadcrumbs
        items={[
          { name: "Home", href: "/" },
          { name: "Weddings", href: "/weddings/" },
        ]}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(videoSchemas) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Hero: Full-bleed estate aerial above title, subtext, and button directly underneath */}
      <section className="bg-white">
        <div className="relative h-[42svh] min-h-[260px] max-h-[500px] w-full overflow-hidden md:h-[48svh]">
          <ResponsivePhoto
            basePath="/gallery/enhanced/2"
            alt="Sunset aerial view of Eden: The Lemelson Estate's 28-acre Stowe wedding grounds, spring-fed pond, and Worcester Mountain backdrop"
            sizes="100vw"
            width={2400}
            height={1600}
            priority={true}
            className="h-full w-full object-cover object-center"
          />
        </div>

        <div className="lux-container py-7 md:py-9">
          <ScalingHeroTitle className="text-[clamp(2.5rem,7.8vw,6.25rem)] font-semibold leading-[0.94] tracking-[-0.03em] text-[#1f1b17]">
            Weddings at Eden
          </ScalingHeroTitle>

          <p className="mt-5 max-w-[54ch] text-[16px] leading-[1.6] text-[#1f1b17] md:text-[18px]">
            With 11,400 square feet of living space on 28 private acres in Stowe, Eden welcomes your family and wedding guests for a relaxed mountain weekend in total privacy.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-5">
            <Link
              href="/contact/"
              className="inline-flex w-fit shrink-0 items-center whitespace-nowrap rounded-full bg-[#111111] px-7 py-3.5 text-[15px] font-medium !text-white transition duration-200 hover:bg-stone-800 active:scale-[0.98]"
            >
              Inquire about weddings
            </Link>
            <Link
              href="#wedding-stories"
              className="whitespace-nowrap text-[15px] font-medium text-[#1f1b17] underline underline-offset-4 transition hover:text-[#6f5a2e]"
            >
              Read wedding stories →
            </Link>
          </div>
        </div>
      </section>

      {/* Section 1: Intro — Real wedding portrait beside editorial copy */}
      <section className="bg-[#f8f3ea] py-16 md:py-24 lg:py-28">
        <div className="lux-container">
          <div className="grid gap-10 md:grid-cols-12 md:items-center lg:gap-12">
            <RevealBlock className="space-y-5 md:col-span-6">
              <h2 className="text-3xl font-semibold leading-[1.12] text-[#1f1b17] md:text-4xl">
                Private estate weddings
              </h2>
              <p className="max-w-[46ch] text-[16px] leading-[1.6] text-[#1f1b17] md:text-[17px]">
                Set in the Edson Hill Road area of Stowe, Eden hosts only a select number of weddings each year. Up to 20 loved ones stay together inside the eight-bedroom residence while tented receptions on the Upper Meadow welcome up to 300 guests.
              </p>
              <div className="pt-1">
                <Link
                  href="/gallery/"
                  className="inline-flex items-center gap-2 text-[16px] font-semibold text-[#1f1b17] underline underline-offset-4 transition hover:text-[#6f5a2e]"
                >
                  <span>Explore the estate gallery</span>
                  <span aria-hidden="true">→</span>
                </Link>
              </div>
            </RevealBlock>

            <RevealBlock delayMs={60} className="md:col-span-6">
              <div className="overflow-hidden rounded-2xl">
                <div className="aspect-[4/3] w-full md:aspect-[4/5]">
                  <ResponsivePhoto
                    basePath="/gallery/Eden-Site%20Photos/83"
                    alt="Bride and groom embracing outside Eden: The Lemelson Estate in Stowe, Vermont"
                    sizes="(min-width: 768px) 48vw, 100vw"
                    width={1600}
                    height={1200}
                    maxWidth={800}
                    className="h-full w-full object-cover object-[50%_20%]"
                  />
                </div>
              </div>
            </RevealBlock>
          </div>
        </div>
      </section>

      {/* Section 2: Showcase — Interactive 4-tab estate spaces */}
      <section className="bg-white py-16 md:py-24 lg:py-28">
        <div className="lux-container space-y-8 md:space-y-10">
          <RevealBlock className="space-y-3">
            <h2 className="text-3xl font-semibold leading-[1.12] text-[#1f1b17] md:text-4xl">
              Spaces across the estate
            </h2>
            <p className="max-w-[54ch] text-[16px] leading-[1.6] text-[#44403c] md:text-[17px]">
              The residence, stone patios, and surrounding grounds are yours alone for the duration of your celebration.
            </p>
          </RevealBlock>

          <RevealBlock delayMs={50}>
            <WeddingSpacesTabs />
          </RevealBlock>
        </div>
      </section>

      {/* Section 3: Full-bleed weekend flow */}
      <section aria-labelledby="weekend-flow-heading">
        <h2 id="weekend-flow-heading" className="sr-only">
          The wedding weekend
        </h2>
        {weekendPanels.map((panel) => (
          <div
            key={panel.verb}
            className="relative min-h-[52svh] w-full overflow-hidden md:min-h-[62svh]"
          >
            <ResponsivePhoto
              basePath={panel.photo}
              alt={panel.alt}
              sizes="100vw"
              width={2560}
              height={1704}
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/45 via-black/25 to-black/55"
            />

            <div className="lux-container relative z-10 flex min-h-[52svh] flex-col justify-between py-8 md:min-h-[62svh] md:py-12">
              <div className="my-auto text-center">
                <RevealBlock>
                  <p className="[font-family:var(--font-heading),Georgia,serif] text-[clamp(3.25rem,10vw,7.5rem)] font-semibold leading-none tracking-[-0.02em] text-white">
                    {panel.verb}
                  </p>
                </RevealBlock>
              </div>

              <RevealBlock delayMs={50}>
                <p className="max-w-[46ch] rounded-xl bg-black/55 px-5 py-4 text-[16px] leading-[1.55] text-white text-pretty md:text-[17px]">
                  {panel.caption}
                </p>
              </RevealBlock>
            </div>
          </div>
        ))}
      </section>

      {/* Section 4: Culinary + Coordinator + St. Katherine Chapel */}
      <section className="bg-[#f8f3ea] py-16 md:py-24 lg:py-28">
        <div className="lux-container space-y-10 md:space-y-12">
          <RevealBlock className="space-y-4">
            <h2 className="text-3xl font-semibold leading-[1.12] text-[#1f1b17] md:text-4xl">
              Custom Vermont menus
            </h2>
            <p className="max-w-[54ch] text-[16px] leading-[1.6] text-[#1f1b17] md:text-[18px]">
              Custom menus and private chef services are available by arrangement, made with local Vermont ingredients and without preset banquet tiers or food and beverage minimums.
            </p>
          </RevealBlock>

          <div className="grid gap-8 lg:grid-cols-12 lg:items-stretch">
            <RevealBlock className="lg:col-span-8 lg:flex lg:flex-col">
              <div className="relative overflow-hidden rounded-2xl lg:min-h-[360px] lg:flex-1">
                <div className="aspect-[16/10] w-full lg:absolute lg:inset-0 lg:aspect-auto">
                  <ResponsivePhoto
                    basePath="/gallery/enhanced/28"
                    alt="Formal dining room prepared for a bespoke farm-to-table wedding dinner at Eden"
                    sizes="(min-width: 1024px) 66vw, 100vw"
                    width={2400}
                    height={1600}
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
              <div className="mt-4 rounded-2xl bg-white p-6">
                <p className="text-[16px] leading-[1.55] text-[#1f1b17]">
                  Passed hors d&apos;oeuvres, plated dinners, family-style suppers, and custom dietary accommodations made with local Vermont ingredients.
                </p>
              </div>
            </RevealBlock>

            <div className="space-y-6 lg:col-span-4">
              <RevealBlock delayMs={50}>
                <div className="grid gap-6 rounded-2xl bg-[#1f1b17] p-7 text-[#f8f3ea] md:grid-cols-2 lg:grid-cols-1 lg:gap-5">
                  <div className="space-y-2">
                    <h3 className="text-xl font-semibold text-white">
                      Estate hospitality &amp; planning
                    </h3>
                    <p className="text-[16px] leading-[1.55] text-[#e8dac0]">
                      Our Stowe team assists with private tours, venue logistics, and weekend hospitality.
                    </p>
                  </div>
                  <div className="space-y-2 lg:pt-1">
                    <h3 className="text-xl font-semibold text-white">
                      St. Katherine Chapel
                    </h3>
                    <p className="text-[16px] leading-[1.55] text-[#e8dac0]">
                      Adjacent on the grounds, our consecrated Greek Orthodox chapel celebrates Sunday Divine Liturgy at 10 a.m. EST (Sept to June). Closed outside liturgical hours; reverence requested.
                    </p>
                  </div>
                </div>
              </RevealBlock>

              <RevealBlock delayMs={60}>
                <dl className="grid grid-cols-2 gap-4 pt-1">
                  {estateFacts.map((fact) => (
                    <div key={fact.label} className="rounded-xl bg-white p-4">
                      <dt className="text-sm font-medium text-[#6f5a2e]">
                        {fact.label}
                      </dt>
                      <dd className="mt-1 text-[16px] font-semibold text-[#1f1b17] text-balance">
                        {fact.value}
                      </dd>
                    </div>
                  ))}
                </dl>
              </RevealBlock>

              <RevealBlock delayMs={60} className="flex flex-wrap gap-5 pt-1 text-[15px] font-medium text-[#1f1b17]">
                <a
                  href="https://youtu.be/P8oBq86qhW0"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 whitespace-nowrap underline underline-offset-4 transition hover:text-[#6f5a2e]"
                >
                  <span>Watch aerial film</span>
                  <span aria-hidden="true">→</span>
                </a>
                <a
                  href="https://youtu.be/xm_uA64KCkE"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 whitespace-nowrap underline underline-offset-4 transition hover:text-[#6f5a2e]"
                >
                  <span>Watch interior tour</span>
                  <span aria-hidden="true">→</span>
                </a>
              </RevealBlock>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4.5: Wedding stories merged directly into /weddings/ */}
      <section id="wedding-stories" className="bg-[#f8f3ea] py-14 md:py-20">
        <div className="lux-container space-y-10">
          <RevealBlock className="max-w-2xl space-y-3">
            <h2 className="text-3xl font-semibold leading-[1.12] text-[#1f1b17] md:text-4xl">
              Wedding stories
            </h2>
            <p className="text-base leading-7 text-stone-700">
              Words and moments from couples who held their ceremonies, elopements, and multi-day wedding weekends at Eden.
            </p>
          </RevealBlock>

          <div className="grid gap-6 md:grid-cols-3">
            {weddingStories.map((story, idx) => (
              <RevealBlock key={story.title} delayMs={idx * 50}>
                <article className="flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-[0_16px_40px_-28px_rgba(58,45,20,0.18)]">
                  <div className="relative aspect-[4/5] w-full overflow-hidden">
                    <ResponsivePhoto
                      basePath={story.photo}
                      alt={story.alt}
                      sizes="(min-width: 768px) 33vw, 100vw"
                      width={800}
                      height={1000}
                      maxWidth={800}
                      className={story.imgClass}
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <p className="text-xs font-medium text-[#8f7845]">{story.season}</p>
                    <h3 className="mt-1.5 ![font-family:var(--font-body)] text-lg font-semibold text-stone-900">
                      {story.title}
                    </h3>
                    <blockquote className="mt-3 text-sm leading-6 text-stone-700 text-pretty">
                      &ldquo;{story.quote}&rdquo;
                    </blockquote>
                    <p className="mt-auto pt-4 text-xs font-medium text-stone-600">
                      {story.credit}
                    </p>
                  </div>
                </article>
              </RevealBlock>
            ))}
          </div>
        </div>
      </section>

      {/* Section 5: FAQ beside sticky bridal staircase portrait */}
      <section className="bg-white py-16 md:py-24 lg:py-28">
        <div className="lux-container">
          <div className="grid gap-10 lg:grid-cols-12 lg:items-start lg:gap-12">
            <RevealBlock className="space-y-8 lg:col-span-7">
              <div className="space-y-4">
                <h2 className="text-3xl font-semibold leading-[1.12] text-[#1f1b17] md:text-4xl">
                  Common questions
                </h2>
                <ul className="space-y-1.5 text-[16px] leading-[1.6] text-[#44403c] md:text-[17px]">
                  {["Edson Hill Road area, Stowe, Vermont", "Weekend and seven-night private stays", "Private estate tours by appointment"].map((line) => (
                    <li key={line} className="flex items-baseline gap-3">
                      <span aria-hidden="true" className="h-px w-4 shrink-0 translate-y-[-0.3em] bg-[#b59a62]" />
                      {line}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-6 pt-1">
                {weddingFaqs.map((item) => (
                  <details key={item.question} className="group">
                    <summary className="flex cursor-pointer list-none items-start justify-between gap-4 text-left text-[17px] font-semibold leading-snug text-[#1f1b17] md:text-[18px] [&::-webkit-details-marker]:hidden">
                      <span className="text-pretty">{item.question}</span>
                      <span
                        aria-hidden="true"
                        className="mt-0.5 flex-shrink-0 text-xl font-normal text-[#6f5a2e] transition-transform duration-200 group-open:rotate-45"
                      >
                        +
                      </span>
                    </summary>
                    <p className="mt-2.5 max-w-[56ch] text-[16px] leading-[1.6] text-[#44403c]">
                      {item.answer}
                    </p>
                  </details>
                ))}
              </div>
            </RevealBlock>

            <RevealBlock delayMs={60} className="lg:col-span-5 lg:sticky lg:top-28">
              <div className="mx-auto max-w-md overflow-hidden rounded-2xl lg:max-w-none">
                <div className="aspect-[4/5] w-full lg:aspect-[3/4]">
                  <ResponsivePhoto
                    basePath="/gallery/Eden-Site%20Photos/14"
                    alt="Bride holding her bouquet on the grand curving staircase inside Eden"
                    sizes="(min-width: 1024px) 40vw, 100vw"
                    width={1200}
                    height={1600}
                    maxWidth={800}
                    className="h-full w-full object-cover object-[50%_18%]"
                  />
                </div>
              </div>
            </RevealBlock>
          </div>
        </div>
      </section>

      {/* Section 6: CTA — Twilight patio illuminated for evening celebrations */}
      <section className="grid bg-[#1f1b17] md:grid-cols-2">
        <div className="relative aspect-[16/10] w-full overflow-hidden md:aspect-auto md:min-h-[360px] lg:min-h-[460px]">
          <ResponsivePhoto
            basePath="/gallery/enhanced/87"
            alt="Twilight view of Eden: The Lemelson Estate illuminated rear terrace and grounds"
            sizes="(min-width: 768px) 50vw, 100vw"
            width={2400}
            height={1600}
            className="h-full w-full object-cover md:absolute md:inset-0"
          />
        </div>

        <RevealBlock className="flex flex-col items-start justify-center gap-6 bg-[#1f1b17] px-6 py-12 text-[#f8f3ea] sm:px-10 md:px-10 md:py-12 lg:py-20 lg:pl-16 lg:pr-[max(4rem,calc((100vw-72rem)/2+2.5rem))] xl:pl-20">
          <h2 className="text-3xl font-semibold leading-[1.1] text-white sm:text-4xl">
            Private brochure
          </h2>
          <p className="max-w-[42ch] text-[16px] leading-[1.6] text-[#e8dac0] md:text-[17px]">
            Our calendar accepts a limited number of private weddings each year. Reach out to check open dates, receive our wedding brochure, and arrange a private tour.
          </p>
          <div className="flex flex-wrap items-center gap-5 pt-1">
            <Link
              href="/contact/"
              className="inline-flex shrink-0 items-center whitespace-nowrap rounded-full bg-[#f8f3ea] px-8 py-3.5 text-[15px] font-semibold !text-[#1f1b17] transition duration-200 hover:bg-white active:scale-[0.98]"
            >
              Request private consultation
            </Link>
            <Link
              href="/reviews/"
              className="whitespace-nowrap text-[15px] font-medium text-[#f8f3ea] underline underline-offset-4 transition hover:text-white"
            >
              Read verified reviews →
            </Link>
          </div>
        </RevealBlock>
      </section>
    </div>
  );
}
