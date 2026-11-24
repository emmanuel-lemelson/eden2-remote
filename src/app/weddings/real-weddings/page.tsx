import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { FaqSection, type FaqItem } from "@/components/FaqSection";
import { ResponsivePhoto } from "@/components/ResponsivePhoto";

export const dynamic = "force-static";

const PRODUCTION_URL = "https://lemelsonestate.com";

export const metadata: Metadata = {
  title: "Real Weddings at Eden | Stowe, Vermont Private Estate Wedding Stories",
  description:
    "Explore real weddings and intimate elopements hosted at Eden: The Lemelson Estate in Stowe, VT—from cozy winter Great Room ceremonies to multi-day wedding party estate buyouts.",
  alternates: {
    canonical: `${PRODUCTION_URL}/weddings/real-weddings/`,
  },
  openGraph: {
    title: "Real Weddings at Eden | Stowe, Vermont Private Estate Wedding Stories",
    description:
      "Real wedding stories from couples and families who celebrated at Eden: The Lemelson Estate in Stowe, Vermont.",
    url: `${PRODUCTION_URL}/weddings/real-weddings/`,
    type: "website",
    images: [
      {
        url: `${PRODUCTION_URL}/opengraph-image.png`,
        width: 1200,
        height: 630,
        alt: "Great Room stone fireplace wedding setting at Eden: The Lemelson Estate in Stowe, Vermont",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@LemelsonEstate",
    title: "Real Weddings at Eden | Stowe, Vermont Private Estate Wedding Stories",
    description:
      "See how couples celebrate winter Great Room ceremonies, pet-friendly mountain elopements, and multi-day wedding weekends at Eden in Stowe, VT.",
    images: [`${PRODUCTION_URL}/opengraph-image.png`],
  },
};

const realWeddingFaqs: FaqItem[] = [
  {
    question: "Can we host an indoor winter wedding ceremony at Eden?",
    answer:
      "Yes. For intimate winter weddings of 20 guests or fewer, couples love exchanging vows in front of the Great Room's roaring stone fireplace—while immediate family stays on-site with heated radiant floors, private sauna, steam shower, and stocked wood-burning hearths.",
  },
  {
    question: "Does Eden host intimate elopements and small family weddings?",
    answer:
      "Yes. Couples can reserve our 2-Nights Intimate Wedding package (20 guests or fewer) starting at $12,950 off-peak or $14,950 peak—and pets are welcome when coordinating intimate wedding stays.",
  },
  {
    question: "How does multi-day wedding party lodging work for larger tented weddings?",
    answer:
      "Up to 20 overnight guests—typically the couple, immediate family, and wedding party—stay inside the 8-bedroom estate for the weekend, while up to 100 to 300 guests celebrate outdoors in the Upper Meadow. There is no need to shuttle your closest wedding party between hotels.",
  },
  {
    question: "Where can we view 2026 pricing and download the wedding brochure?",
    answer:
      "Full 2026 package pricing (from Rehearsal Dinner-Only and Mon–Thurs Ceremony-Only up to 7-Night Wedding Weeks) and the downloadable 2026 PDF brochure are published directly on our Stowe Weddings page.",
  },
];

export default function RealWeddingsPage() {
  return (
    <div className="bg-white">
      <section className="bg-white pt-8 pb-12 md:pt-12 md:pb-16">
        <div className="lux-container space-y-8">
          <Breadcrumbs
            items={[
              { name: "Home", href: "/" },
              { name: "Weddings", href: "/weddings/" },
              { name: "Real Weddings", href: "/weddings/real-weddings/" },
            ]}
          />

          <div className="mx-auto max-w-4xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.38em] text-[#8f7845]">
              Verified Celebrations · Stowe, Vermont
            </p>
            <h1 className="mt-3 text-3xl font-semibold leading-tight text-stone-900 text-balance sm:text-4xl md:text-5xl">
              Real Weddings &amp; Celebrations at Eden in Stowe, Vermont
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-stone-700 md:text-lg">
              From fireside February snowstorm ceremonies in the Great Room to intimate 14-guest mountain elopements and full autumn wedding-party buyouts, see how real couples experience a private estate weekend at Eden.
            </p>
            <div className="mt-7 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/weddings/#pricing"
                className="inline-flex items-center rounded-full bg-[#111111] px-8 py-3.5 text-[0.95rem] font-semibold !text-white transition hover:bg-stone-800"
              >
                View 2026 Wedding Pricing
              </Link>
              <Link
                href="/contact/"
                className="inline-flex items-center rounded-full border border-stone-900 px-8 py-3.5 text-[0.95rem] font-semibold text-stone-900 transition hover:bg-stone-50"
              >
                Schedule a Private Estate Tour
              </Link>
            </div>
          </div>

          <div className="overflow-hidden rounded-3xl border border-stone-200 shadow-xl">
            <div className="aspect-[16/9] w-full">
              <ResponsivePhoto
                basePath="/gallery/Eden-Site%20Photos/100"
                alt="Roaring stone fireplace in the Great Room at Eden: The Lemelson Estate—setting for intimate winter wedding ceremonies"
                sizes="(min-width: 1280px) 1072px, 100vw"
                width={2560}
                height={1707}
                priority={true}
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Story 1 */}
      <section className="lux-section bg-gradient-to-br from-[var(--color-linen)] via-[var(--color-eggshell)] to-[var(--color-cream)]">
        <div className="lux-container space-y-8">
          <div className="grid gap-8 lg:grid-cols-5 lg:items-center">
            <div className="space-y-4 lg:col-span-3">
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#8f7845]">
                Winter Great Room Wedding · February
              </p>
              <h2 className="text-3xl font-semibold text-stone-900 sm:text-4xl">
                Seanna C. — A Fireside Snowstorm Celebration Under One Roof
              </h2>
              <p className="text-base leading-relaxed text-stone-700">
                Planned in roughly six weeks with responsive coordination from Eden&apos;s staff, Seanna and her immediate family turned a late-February Vermont snowstorm into an unforgettable winter wedding weekend—without a single guest needing rideshares or hotel shuttles.
              </p>
              <ul className="space-y-2 text-sm leading-relaxed text-stone-700 sm:text-base">
                <li>• <strong>Getting Ready:</strong> Bridal party prepped in the primary bedroom suite while groomsmen played pool and foosball in the lower-level game room.</li>
                <li>• <strong>Ceremony &amp; Warmth:</strong> Exchanged vows inside the Great Room before a roaring stocked stone fireplace with heated radiant floors beneath.</li>
                <li>• <strong>Custom Culinary &amp; Spa:</strong> Private chef family-style dinner tailored to dietary needs, custom signature cocktails from a private bartender, plus steam shower, cedar sauna, and hot tub relaxation.</li>
              </ul>
              <blockquote className="rounded-2xl border-l-4 border-[#c2a060] bg-white/90 p-5 text-sm italic leading-relaxed text-stone-700">
                &ldquo;We had our ceremony in the great room with the fireplace roaring—a fiery love story. The steam shower and sauna were a wonderful way to relax in the chill of a late February snow storm... All the bedrooms were utilized for our families to stay in—no need for hiring Uber or transportation. Would suggest Eden for your wedding, small or big.&rdquo;
                <footer className="mt-2 not-italic text-xs font-semibold uppercase tracking-[0.16em] text-[#8f7845]">
                  — Seanna C. · Verified Review (The Knot &amp; Airbnb)
                </footer>
              </blockquote>
            </div>

            <div className="grid gap-4 lg:col-span-2">
              <div className="overflow-hidden rounded-2xl border border-white/80 shadow-md">
                <ResponsivePhoto
                  basePath="/gallery/enhanced/68"
                  alt="Snowy winter estate setting at Eden in Stowe, Vermont"
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  width={2400}
                  height={1600}
                  className="aspect-[16/10] w-full object-cover"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="overflow-hidden rounded-2xl border border-white/80 shadow-md">
                  <ResponsivePhoto
                    basePath="/gallery/Eden-Site%20Photos/98"
                    alt="Great Room panoramic interior for intimate winter wedding ceremonies"
                    sizes="(min-width: 1024px) 20vw, 50vw"
                    width={2560}
                    height={1704}
                    className="aspect-[4/3] w-full object-cover"
                  />
                </div>
                <div className="overflow-hidden rounded-2xl border border-white/80 shadow-md">
                  <ResponsivePhoto
                    basePath="/gallery/enhanced/70"
                    alt="Private cedar sauna for wedding weekend relaxation"
                    sizes="(min-width: 1024px) 20vw, 50vw"
                    width={2400}
                    height={1600}
                    className="aspect-[4/3] w-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Story 2 */}
      <section className="lux-section bg-white">
        <div className="lux-container grid gap-8 lg:grid-cols-5 lg:items-center">
          <div className="grid grid-cols-2 gap-4 lg:col-span-2">
            <div className="overflow-hidden rounded-2xl border border-stone-200 shadow-md">
              <ResponsivePhoto
                basePath="/gallery/enhanced/78"
                alt="Illuminated winter twilight facade at Eden: The Lemelson Estate"
                sizes="(min-width: 1024px) 20vw, 50vw"
                width={2400}
                height={1600}
                className="aspect-[4/3] w-full object-cover"
              />
            </div>
            <div className="overflow-hidden rounded-2xl border border-stone-200 shadow-md">
              <ResponsivePhoto
                basePath="/gallery/Eden-Site%20Photos/102"
                alt="Vaulted primary king suite for wedding couples at Eden"
                sizes="(min-width: 1024px) 20vw, 50vw"
                width={2560}
                height={1707}
                className="aspect-[4/3] w-full object-cover"
              />
            </div>
          </div>

          <div className="space-y-4 lg:col-span-3">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#8f7845]">
              Intimate Mountain Elopement · February 2026
            </p>
            <h2 className="text-3xl font-semibold text-stone-900 sm:text-4xl">
              Kayli — 14 Family Members, Two Dogs &amp; A Secluded Winter Elopement
            </h2>
            <p className="text-base leading-relaxed text-stone-700">
              For couples dreaming of an intimate Stowe elopement without leaving family—or dogs—behind, Kayli&apos;s celebration brought 14 closest relatives and two dogs together for a relaxed weekend surrounded by 28 private acres.
            </p>
            <blockquote className="rounded-2xl border-l-4 border-[#c2a060] bg-[#fdfbf7] p-5 text-sm italic leading-relaxed text-stone-700">
              &ldquo;We had our elopement at Eden this weekend with 14 of our closest family members and our two dogs. From the moment we drove up the driveway to check in we were in awe of how beautiful the property was. Everything was absolutely perfect! We are so grateful that we were able to have our small intimate wedding here.&rdquo;
              <footer className="mt-2 not-italic text-xs font-semibold uppercase tracking-[0.16em] text-[#8f7845]">
                — Kayli · Verified Review, February 2026 (Airbnb)
              </footer>
            </blockquote>
          </div>
        </div>
      </section>

      {/* Story 3 */}
      <section className="lux-section bg-gradient-to-br from-[var(--color-linen)] via-[var(--color-eggshell)] to-[var(--color-cream)]">
        <div className="lux-container space-y-8">
          <div className="grid gap-8 lg:grid-cols-5 lg:items-center">
            <div className="space-y-4 lg:col-span-3">
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#8f7845]">
                Wedding Party Lodging &amp; Photography · Autumn &amp; Spring
              </p>
              <h2 className="text-3xl font-semibold text-stone-900 sm:text-4xl">
                John A. &amp; Jeff A. — Wedding Party Estate Buyouts &amp; Portrait Grounds
              </h2>
              <p className="text-base leading-relaxed text-stone-700">
                Families hosting weddings in Stowe repeatedly choose Eden for wedding-party accommodations and portrait photography—taking advantage of the grand curving staircase, opulent living spaces, spring-fed pond, and secluded mountain lawns.
              </p>
              <div className="grid gap-4 md:grid-cols-2">
                <blockquote className="rounded-2xl border border-[#d2c4a3]/60 bg-white/90 p-5 text-sm italic leading-relaxed text-stone-700">
                  &ldquo;My daughter and her wedding party recently stayed at Eden – The Lemelson Estate, in Stowe, Vermont. The property boasts a secluded setting with beautiful views and yet is close to all Stowe has to offer.&rdquo;
                  <footer className="mt-3 not-italic text-xs font-semibold uppercase tracking-[0.15em] text-[#8f7845]">
                    — John A. · The Knot (Sep 2024)
                  </footer>
                </blockquote>
                <blockquote className="rounded-2xl border border-[#d2c4a3]/60 bg-white/90 p-5 text-sm italic leading-relaxed text-stone-700">
                  &ldquo;The venue itself was spacious and beautiful, with a stunning grand staircase, opulent rooms and gorgeous grounds providing the ideal backdrop for wedding photos.&rdquo;
                  <footer className="mt-3 not-italic text-xs font-semibold uppercase tracking-[0.15em] text-[#8f7845]">
                    — Jeff A. · Zola (Apr 2025)
                  </footer>
                </blockquote>
              </div>
            </div>

            <div className="grid gap-4 lg:col-span-2">
              <div className="overflow-hidden rounded-2xl border border-white/80 shadow-md">
                <ResponsivePhoto
                  basePath="/gallery/enhanced/2"
                  alt="Sunset aerial view of Eden Estate's grounds and pond for wedding portraits"
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  width={2400}
                  height={1600}
                  className="aspect-[16/10] w-full object-cover"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="overflow-hidden rounded-2xl border border-white/80 shadow-md">
                  <ResponsivePhoto
                    basePath="/gallery/enhanced/86"
                    alt="Autumn foliage wedding backdrop at Eden in Stowe, Vermont"
                    sizes="(min-width: 1024px) 20vw, 50vw"
                    width={1024}
                    height={1024}
                    className="aspect-[4/3] w-full object-cover"
                  />
                </div>
                <div className="overflow-hidden rounded-2xl border border-white/80 shadow-md">
                  <ResponsivePhoto
                    basePath="/gallery/Eden-Site%20Photos/108"
                    alt="Spring-fed pond portrait location at Eden Estate"
                    sizes="(min-width: 1024px) 20vw, 50vw"
                    width={2560}
                    height={1920}
                    className="aspect-[4/3] w-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <FaqSection
        title="Real Weddings at Eden FAQs"
        description="Answers inspired by real celebrations hosted at The Lemelson Estate."
        items={realWeddingFaqs}
      />

      <section className="lux-section border-t border-stone-200/70 bg-[#fdfbf7]">
        <div className="lux-container max-w-4xl text-center">
          <h2 className="text-3xl font-semibold text-stone-900 sm:text-4xl">
            Start Planning Your Stowe Estate Wedding
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-base text-stone-700">
            Explore transparent 2026 packages, download the full wedding brochure, or request a private estate tour with Tiffany M.
          </p>
          <div className="mt-7 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/weddings/#pricing"
              className="inline-flex items-center rounded-full bg-[#111111] px-8 py-3.5 text-[0.95rem] font-semibold !text-white transition hover:bg-stone-800"
            >
              See 2026 Wedding Pricing
            </Link>
            <Link
              href="/contact/"
              className="inline-flex items-center rounded-full border border-stone-900 px-8 py-3.5 text-[0.95rem] font-semibold text-stone-900 transition hover:bg-stone-50"
            >
              Inquire About Dates
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
