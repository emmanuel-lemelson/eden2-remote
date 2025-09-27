import Image from "next/image";
import Link from "next/link";
import { HighlightsGrid } from "@/components/HighlightsGrid";
import { SectionHeading } from "@/components/SectionHeading";
import { TestimonialCarousel } from "@/components/TestimonialCarousel";

const quickFacts = [
  { label: "Bedrooms", value: "8" },
  { label: "Bathrooms", value: "8" },
  { label: "Interior", value: "11,400 sq ft" },
  { label: "Property", value: "28 acres" },
  { label: "Amenities", value: "Pool, spa, tennis" },
  { label: "Style", value: "Luxury mountain estate" },
];

const highlights = [
  {
    title: "Skyline Great Room",
    subtitle: "Gather",
    summary: "Floor-to-ceiling glass framing Mansfield sunsets.",
    description:
      "Vaulted ceilings, sculptural stone fireplace, and bespoke furnishings curated to host intimate conversations or grand celebrations beneath the mountains.",
    image:
      "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Thermal Sanctuary Spa",
    subtitle: "Restore",
    summary: "Private hydrotherapy suite with cedar sauna and cold plunge.",
    description:
      "Step into Eden’s thermal circuit featuring aromatherapy steam, contrast plunge pools, and a fireside relaxation lounge overlooking the forest canopy.",
    image:
      "https://images.unsplash.com/photo-1523419409543-0c1df022bdd1?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Chef’s Atelier",
    subtitle: "Dine",
    summary: "Dual-island kitchen designed for private culinary teams.",
    description:
      "Fully appointed with La Cornue range, marble prep stations, concealed butler’s pantry, and sommelier-level wine storage for curated pairings.",
    image:
      "https://images.unsplash.com/photo-1505691723518-36a5ac3be353?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Juniper Cinema",
    subtitle: "Unwind",
    summary: "14-seat Dolby Atmos theater with mohair lounges.",
    description:
      "Acoustically tuned walls, starlit ceiling installation, and curated film library for evenings that feel like a private premiere.",
    image:
      "https://images.unsplash.com/photo-1517602302552-471fe67acf66?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Courts & Trails",
    subtitle: "Explore",
    summary: "Tennis, pickleball, and private woodland hiking network.",
    description:
      "Morning matches on the sunlit Har-Tru court, followed by meandering forest trails dotted with sculptural installations and meditation alcoves.",
    image:
      "https://images.unsplash.com/photo-1498146831523-fbe41acdc5ad?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Summit Terrace",
    subtitle: "Celebrate",
    summary: "Heated limestone terrace for al fresco entertaining year-round.",
    description:
      "Panoramic views, retractable canopies, and an artisan-crafted bar create an elevated backdrop for soirées beneath the stars.",
    image:
      "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1200&q=80",
  },
];

const testimonials = [
  {
    quote:
      "Every sunrise felt choreographed. The attention to detail is beyond anything we have experienced in a private retreat.",
    name: "Alexandra M.",
    detail: "Luxury Travel Curator",
  },
  {
    quote:
      "Our executive retreat was effortless. The Eden team orchestrated everything—private chefs, heli-skiing, and après evenings by the fire.",
    name: "Jonathan R.",
    detail: "Founder, Lattice Partners",
  },
  {
    quote:
      "The spa wing rivaled five-star resorts. We left restored, inspired, and already planning our next visit.",
    name: "Priya S.",
    detail: "Wellness Entrepreneur",
  },
];

export default function Home() {
  const heroVideoUrl =
    process.env.NEXT_PUBLIC_HOME_VIDEO_URL ||
    "/Eden_%20A%20Journey%20Over%20The%20Lemelson%20Estate.mp4";

  return (
    <>
      <section className="bg-white">
        <div className="lux-container flex flex-col items-center gap-5 pb-8 pt-0 text-center text-stone-900 md:gap-7 md:pb-10 md:pt-2">
          <div className="flex flex-col items-center gap-3 md:gap-5">
            <Image
              src="/The Lemelson Estate (1).png"
              alt="The Lemelson Estate wordmark"
              width={680}
              height={680}
              className="h-48 w-auto -mt-10 -mb-6 md:h-72 md:-mt-12 md:-mb-8"
              priority
            />
            <h1 className="text-3xl font-semibold leading-tight sm:text-[2.35rem] md:text-5xl">The Lemelson Estate Welcomes You</h1>
            <p className="text-xs uppercase tracking-[0.5em] text-stone-600 sm:text-sm md:text-base">Bespoke Luxury in Stowe, Vermont</p>
          </div>

          <div className="w-full">
            <div className="relative overflow-hidden rounded-3xl border border-stone-200 shadow-xl">
              <div className="aspect-[16/9] w-full">
                {heroVideoUrl ? (
                  <video
                    className="h-full w-full origin-center transform object-cover scale-110"
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="auto"
                    poster="https://images.unsplash.com/photo-1523419409543-0c1df022bdd1?auto=format&fit=crop&w=1600&q=80"
                  >
                    <source src={heroVideoUrl} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                ) : (
                  <div
                    className="relative flex h-full w-full flex-col items-center justify-center gap-4 bg-cover bg-center"
                    style={{
                      backgroundImage:
                        "url('https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1600&q=80')",
                    }}
                  >
                    <div className="absolute inset-0 bg-black/45" />
                    <div className="relative z-10 flex flex-col items-center gap-3 px-6 text-white">
                      <span className="text-xs uppercase tracking-[0.4em] text-white/70">
                        Eden Estate
                      </span>
                      <p className="text-3xl font-semibold md:text-4xl">A Journey Above The Lemelson Estate</p>
                      <p className="max-w-xl text-sm text-white/80 md:text-base">
                        Upload your cinematic tour by updating the `heroVideoUrl` with a Vercel Blob link. The video will play here automatically once available.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-br from-[var(--color-linen)] via-[var(--color-eggshell)] to-[var(--color-cream)]">
        <div className="lux-container flex flex-col items-center gap-6 py-10 text-center text-stone-900 md:gap-8 md:py-14">
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-stone-800 sm:text-base md:text-lg">
            Where to Find Us
          </p>
          <div className="grid w-full max-w-4xl grid-cols-2 justify-items-center gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 sm:gap-5">
            <Link
              href="https://www.airbnb.com/rooms/42793723?guests=1&adults=1&s=67&unique_share_id=ba8163d3-af1e-4825-ba7d-15abbe902ec4"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full items-center justify-center rounded-full bg-[#FF385C] px-5 py-3 shadow-lg shadow-black/10 transition-colors transition-transform duration-200 hover:-translate-y-0.5 hover:bg-[#FF4C6E] hover:shadow-xl sm:px-6"
              aria-label="View Eden on Airbnb"
            >
              <img
                src="/Airbnb_Logo_0.svg"
                alt="Airbnb"
                className="h-5"
                width={60}
                height={20}
                style={{ transform: "scale(1.15)", transformOrigin: "center" }}
                loading="lazy"
              />
            </Link>
            <Link
              href="https://www.vrbo.com/1958794?referrerId=HOT.HIS.Share.Landed.Copy_Link"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full items-center justify-center rounded-full bg-white px-5 py-3 shadow-lg shadow-black/10 transition-colors transition-transform duration-200 hover:-translate-y-0.5 hover:bg-stone-100 hover:shadow-xl sm:px-6"
              aria-label="View Eden on Vrbo"
            >
              <img
                src="/Vrbo_idJM8XKT4-_1.svg"
                alt="Vrbo"
                className="h-5"
                width={60}
                height={20}
                style={{ transform: "scale(1.15)", transformOrigin: "center" }}
                loading="lazy"
              />
            </Link>
            <Link
              href="https://www.expedia.com/Stowe-Hotels-Private-Luxury-Estate.h51018966.Hotel-Information?referrerId=HOT.HIS.Share.Landed.Copy_Link"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full items-center justify-center rounded-full bg-[#141D38] px-5 py-3 shadow-lg shadow-black/10 transition-colors transition-transform duration-200 hover:-translate-y-0.5 hover:bg-[#1D2A52] hover:shadow-xl sm:px-6"
              aria-label="View Eden on Expedia"
            >
              <img
                src="/Expedia_Logo_1.png"
                alt="Expedia"
                className="h-5 w-auto"
                width={70}
                height={24}
                loading="lazy"
              />
            </Link>
            <Link
              href="https://www.theknot.com/marketplace/edenthe-lemelson-estate-stowe-vt-2087322"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full items-center justify-center rounded-full bg-[#FF44CB] px-5 py-3 shadow-lg shadow-black/10 transition-colors transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-xl sm:px-6"
              aria-label="View Eden on The Knot"
            >
              <img
                src="/idzSo3ACCf_logos.jpeg"
                alt="The Knot"
                className="h-5 w-5 rounded-md object-cover"
                width={40}
                height={40}
                style={{ transform: "scale(1.5)", transformOrigin: "center" }}
                loading="lazy"
              />
            </Link>
            <Link
              href="https://www.zola.com/wedding-vendors/wedding-venues/eden-the-lemelson-estate"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full items-center justify-center rounded-full border border-white bg-white px-5 py-3 shadow-lg shadow-black/10 transition-colors transition-transform duration-200 hover:-translate-y-0.5 hover:border-white/80 hover:shadow-xl sm:px-6"
              aria-label="View Eden on Zola"
            >
              <img
                src="/id56oBQafI_1758992156050.png"
                alt="Zola"
                className="h-6 w-auto"
                width={88}
                height={24}
                loading="lazy"
              />
            </Link>
            <Link
              href="https://www.weddingwire.com/biz/eden-the-lemelson-estate/393d590ddd940149.html"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full items-center justify-center rounded-full border border-white bg-white px-5 py-3 shadow-lg shadow-black/10 transition-colors transition-transform duration-200 hover:-translate-y-0.5 hover:bg-[#F3FBFB] hover:shadow-xl justify-self-center sm:justify-self-auto sm:px-6"
              aria-label="View Eden on WeddingWire"
            >
              <img
                src="/WeddingWire_idGDCwR69F_1.svg"
                alt="WeddingWire"
                className="h-5 w-auto"
                width={90}
                height={24}
                style={{ transform: "scale(1.35)", transformOrigin: "center" }}
                loading="lazy"
              />
            </Link>
          </div>
        </div>
      </section>

      <section className="lux-section bg-white animate-fade-up fade-delay-1">
        <div className="lux-container !px-4 sm:!px-6">
          <div className="relative grid gap-6 overflow-hidden rounded-[2.75rem] border border-[color:rgba(217,209,195,0.6)] bg-gradient-to-br from-[var(--color-linen)] via-[var(--color-eggshell)] to-[color:rgba(210,196,163,0.2)] px-3 py-7 shadow-[0_32px_68px_-42px_rgba(58,45,20,0.55)] sm:px-10 sm:py-10 md:grid-cols-3 md:p-14">
            <div
              className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-[color:rgba(210,196,163,0.25)]"
              aria-hidden
            />

            <div className="relative md:col-span-1">
              <p className="text-xs uppercase tracking-[0.55em] text-[var(--color-gold)] sm:text-sm">
                Welcome to Eden
              </p>
              <h2 className="mt-3 text-3xl font-semibold text-[var(--color-charcoal)] sm:mt-4 sm:text-[2.5rem]">
                Estate at a glance
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-stone-700 sm:mt-4 sm:text-base">
                Escape to one of Stowe’s most exclusive estates. With 11,400 square
                feet of living space, Eden offers room for up to 20 guests to gather in
                comfort and style.
              </p>
            </div>

            <dl className="relative grid grid-cols-2 gap-3 sm:gap-4 md:col-span-2 md:grid-cols-2">
              {quickFacts.map((fact) => (
                <div
                  key={fact.label}
                  className="group relative overflow-hidden rounded-2xl border border-white/80 bg-white/85 p-4 shadow-[0_24px_44px_-32px_rgba(58,45,20,0.55)] backdrop-blur transition duration-300 hover:-translate-y-1 hover:shadow-[0_32px_64px_-36px_rgba(58,45,20,0.6)] sm:p-6"
                >
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/60 via-transparent to-[color:rgba(232,218,192,0.6)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  <dt className="relative text-[0.7rem] uppercase tracking-[0.35em] text-[var(--color-gold)] font-semibold drop-shadow-[0_1px_0_rgba(255,255,255,0.75)]">
                    {fact.label}
                  </dt>
                  <dd className="relative mt-2 text-lg font-semibold text-[var(--color-charcoal)] sm:mt-3 sm:text-2xl">
                    {fact.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <section className="lux-section bg-white/80 animate-fade-up fade-delay-2">
        <div className="lux-container">
          <SectionHeading
            eyebrow="Experience"
            title="Signature moments tailored to your stay"
            description="Every space within Eden has been intentionally composed to balance serenity, indulgence, and connection."
          />
          <div className="mt-12">
            <HighlightsGrid items={highlights} />
          </div>
        </div>
      </section>

      <section className="lux-section bg-white animate-fade-up fade-delay-3">
        <div className="lux-container grid gap-10 md:grid-cols-[3fr_2fr] md:items-center">
          <div>
            <SectionHeading
              eyebrow="Concierge at Your Service"
              title="Tailored experiences for every stay"
              description="From private-chef dinners to in-home yoga and spa treatments, our concierge helps curate your perfect mountain stay."
            />
            <div className="mt-8 space-y-4 text-sm text-stone-700">
              <p>
                Reserve bespoke amenities before arrival. Our team is available to
                coordinate daily housekeeping, grocery stocking, curated excursions,
                and more.
              </p>
              <p>
                Whether you crave a wine-paired dinner, guided hike, or private après
                lounge, Eden’s concierge ensures every stay feels effortless.
              </p>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-3xl border border-white/60 bg-white/80">
            <div className="absolute inset-0 bg-gradient-to-br from-black/10 via-transparent to-black/20" />
            <img
              src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80"
              alt="Aerial view of Stowe, Vermont"
              className="h-full w-full object-cover"
              loading="lazy"
            />
            <div className="relative p-6 text-white">
              <p className="text-xs uppercase tracking-[0.4em] text-white/80">
                Perfect Location
              </p>
              <h3 className="mt-3 text-2xl font-semibold">Minutes from it all</h3>
              <p className="mt-2 text-sm text-white/80">
                Set on 28 private acres with trails, spring-fed ponds, and views of the
                Green Mountains — yet only minutes from Stowe’s slopes, dining, and
                shops.
              </p>
              <Link
                href="https://maps.app.goo.gl/2PV9c5L5z1L"
                target="_blank"
                className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/20 px-5 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-white transition hover:bg-white/30"
              >
                View Map
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="lux-section bg-white/80 animate-fade-up">
        <div className="lux-container">
          <TestimonialCarousel testimonials={testimonials} />
        </div>
      </section>

      <section className="lux-section bg-white animate-fade-up fade-delay-2">
        <div className="lux-container overflow-hidden rounded-3xl border border-white/60 bg-white/80 p-10 text-center md:p-16">
          <p className="text-xs uppercase tracking-[0.4em] text-stone-500">
            Plan Your Stay
          </p>
          <h2 className="mt-4 text-4xl font-semibold text-stone-900 md:text-5xl">
            Reserve Eden for your next gathering.
          </h2>
          <p className="mt-4 text-base text-stone-700 md:text-lg">
            We craft bespoke itineraries for executive retreats, milestone
            celebrations, and restorative wellness escapes.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center rounded-full border border-stone-300 bg-white px-8 py-3 text-xs font-semibold uppercase tracking-[0.4em] text-stone-800 transition hover:border-stone-400 hover:bg-white/80"
            >
              Start a Conversation
            </Link>
            <Link
              href="/gallery"
              className="inline-flex items-center gap-2 text-sm font-medium text-stone-700 transition hover:text-stone-900"
            >
              Explore the Residence
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                className="h-4 w-4"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
