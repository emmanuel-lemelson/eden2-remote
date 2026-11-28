import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-heading",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

const PRODUCTION_URL = "https://lemelsonestate.com";
const CANONICAL_HOME = `${PRODUCTION_URL}/`;

export const metadata: Metadata = {
  title: "Eden: The Lemelson Estate | Luxury Vacation Rental & Wedding Venue in Stowe, VT",
  description:
    "Book direct at Eden: The Lemelson Estate—an 11,400 sq ft, 8-bedroom pet-friendly luxury vacation rental, private estate wedding venue, and corporate retreat on 28 acres in Stowe, Vermont. Sleeps 20 overnight; hosts tented weddings up to 300.",
  metadataBase: new URL(PRODUCTION_URL),
  openGraph: {
    title: "Eden: The Lemelson Estate | Luxury Vacation Rental & Wedding Venue in Stowe, VT",
    description:
      "Book direct at Eden: The Lemelson Estate—an 11,400 sq ft, 8-bedroom pet-friendly luxury vacation rental, private estate wedding venue, and corporate retreat on 28 acres in Stowe, Vermont. Sleeps 20 overnight; hosts tented weddings up to 300.",
    url: CANONICAL_HOME,
    siteName: "Eden: The Lemelson Estate",
    locale: "en_US",
    type: "website",
    images: [
      {
        // Use the generated Open Graph image route for broad platform compatibility
        url: `${PRODUCTION_URL}/opengraph-image.png`,
        width: 1200,
        height: 630,
        alt: "Eden: The Lemelson Estate aerial view in Stowe, Vermont",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@LemelsonEstate",
    title: "Eden: The Lemelson Estate | Luxury Vacation Rental & Wedding Venue in Stowe, VT",
    description:
      "Book direct at Eden: The Lemelson Estate—an 11,400 sq ft, 8-bedroom pet-friendly luxury vacation rental, private estate wedding venue, and corporate retreat on 28 acres in Stowe, Vermont. Sleeps 20 overnight; hosts tented weddings up to 300.",
    // Point to the PNG OG image for maximum compatibility (X/LinkedIn)
    images: [`${PRODUCTION_URL}/opengraph-image.png`],
  },
  alternates: {
    canonical: CANONICAL_HOME,
  },
  icons: {
    icon: [
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon.ico" },
    ],
    shortcut: "/favicon-32x32.png",
    apple: "/apple-touch-icon.png",
    other: [
      { rel: "icon", url: "/favicon-192x192.png", sizes: "192x192", type: "image/png" },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body
        className={`${playfair.variable} ${inter.variable} bg-stone-100 text-stone-900 antialiased`}
        suppressHydrationWarning={true}
      >
        <div className="flex min-h-screen flex-col">
          <Header />
          <main className="flex-1 space-y-0">
            <div className="animate-fade-up fade-delay-1">{children}</div>
          </main>
          <Footer />
        </div>
        {/* JSON-LD structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              '@id': `${PRODUCTION_URL}/#organization`,
              name: 'Eden: The Lemelson Estate',
              url: CANONICAL_HOME,
              logo: `${PRODUCTION_URL}/The%20Lemelson%20Estate%20(1).png`,
              sameAs: [
                'https://www.airbnb.com/rooms/42793723',
                'https://www.vrbo.com/1958794',
                'https://www.expedia.com/Stowe-Hotels-Private-Luxury-Estate.h51018966.Hotel-Information',
                'https://www.theknot.com/marketplace/edenthe-lemelson-estate-stowe-vt-2087322',
                'https://www.zola.com/wedding-vendors/wedding-venues/eden-the-lemelson-estate',
                'https://www.weddingwire.com/biz/eden-the-lemelson-estate/393d590ddd940149.html',
                'https://www.instagram.com/the_lemelson_estate',
                'https://x.com/LemelsonEstate',
                'https://www.linkedin.com/company/eden-the-lemelson-estate/',
                'https://www.facebook.com/p/Eden-The-Lemelson-Estate-100087154695200/',
              ],
              contactPoint: [{
                '@type': 'ContactPoint',
                email: 'admin@lemelsoncapital.com',
                contactType: 'customer service',
                areaServed: 'US',
                availableLanguage: ['English'],
              }],
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': ['VacationRental', 'LodgingBusiness'],
              '@id': `${PRODUCTION_URL}/#vacation-rental`,
              name: 'Eden: The Lemelson Estate',
              identifier: 'eden-the-lemelson-estate-stowe-vt',
              url: CANONICAL_HOME,
              image: [
                `${PRODUCTION_URL}/gallery/enhanced/2@1200w.webp`,
                `${PRODUCTION_URL}/gallery/Eden-Site%20Photos/98@1200w.webp`,
                `${PRODUCTION_URL}/gallery/Eden-Site%20Photos/113@1200w.webp`,
                `${PRODUCTION_URL}/gallery/enhanced/90@1200w.webp`,
              ],
              description:
                '11,400 sq ft, 8-bedroom, 8-bathroom pet-friendly luxury vacation rental estate on 28 private acres in the Edson Hill Road area of Stowe, Vermont, 5 minutes from Stowe Mountain Resort, sleeping up to 20 guests.',
              address: {
                '@type': 'PostalAddress',
                addressLocality: 'Stowe',
                addressRegion: 'VT',
                postalCode: '05672',
                addressCountry: 'US',
              },
              petsAllowed: true,
              numberOfRooms: 8,
              occupancy: {
                '@type': 'QuantitativeValue',
                maxValue: 20,
              },
              floorSize: {
                '@type': 'QuantitativeValue',
                value: 11400,
                unitCode: 'FTK',
              },
              aggregateRating: {
                '@type': 'AggregateRating',
                ratingValue: '5.0',
                bestRating: '5',
                worstRating: '1',
                reviewCount: 62,
              },
              amenityFeature: [
                { '@type': 'LocationFeatureSpecification', name: 'Heated outdoor swimming pool', value: true },
                { '@type': 'LocationFeatureSpecification', name: 'Two large outdoor hot tubs', value: true },
                { '@type': 'LocationFeatureSpecification', name: 'Indoor spa', value: true },
                { '@type': 'LocationFeatureSpecification', name: 'Private cedar sauna', value: true },
                { '@type': 'LocationFeatureSpecification', name: 'Steam shower', value: true },
                { '@type': 'LocationFeatureSpecification', name: 'Clay tennis court', value: true },
                { '@type': 'LocationFeatureSpecification', name: 'Private fitness center and gym', value: true },
                { '@type': 'LocationFeatureSpecification', name: 'Game room and pool table', value: true },
                { '@type': 'LocationFeatureSpecification', name: "Dedicated children's playroom and baby gear", value: true },
                { '@type': 'LocationFeatureSpecification', name: "Chef's kitchen with Sub-Zero and Thermador appliances", value: true },
                { '@type': 'LocationFeatureSpecification', name: 'Grand piano and Sonos audio', value: true },
                { '@type': 'LocationFeatureSpecification', name: 'High-speed fiber-optic Wi-Fi and executive office', value: true },
                { '@type': 'LocationFeatureSpecification', name: 'Wood-burning fireplaces', value: true },
                { '@type': 'LocationFeatureSpecification', name: 'Twin spring-fed trout ponds', value: true },
                { '@type': 'LocationFeatureSpecification', name: 'Pet-friendly accommodations', value: true },
                { '@type': 'LocationFeatureSpecification', name: 'Free on-site parking', value: true },
                { '@type': 'LocationFeatureSpecification', name: 'Concierge and private chef services', value: true },
              ],
              sameAs: [
                'https://www.airbnb.com/rooms/42793723',
                'https://www.vrbo.com/1958794',
                'https://www.expedia.com/Stowe-Hotels-Private-Luxury-Estate.h51018966.Hotel-Information',
              ],
              mainEntityOfPage: CANONICAL_HOME,
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'EventVenue',
              '@id': `${PRODUCTION_URL}/#event-venue`,
              name: 'Eden: The Lemelson Estate — Stowe Wedding & Retreat Venue',
              url: `${PRODUCTION_URL}/weddings/`,
              image: [
                `${PRODUCTION_URL}/gallery/enhanced/2@1200w.webp`,
                `${PRODUCTION_URL}/gallery/Eden-Site%20Photos/98@1200w.webp`,
              ],
              description:
                'Exclusive 28-acre luxury private estate wedding and executive retreat venue in Stowe, Vermont with on-site accommodations for 20 overnight guests and outdoor tented reception capacity up to 300 guests.',
              maximumAttendeeCapacity: 300,
              address: {
                '@type': 'PostalAddress',
                addressLocality: 'Stowe',
                addressRegion: 'VT',
                postalCode: '05672',
                addressCountry: 'US',
              },
              sameAs: [
                'https://www.theknot.com/marketplace/edenthe-lemelson-estate-stowe-vt-2087322',
                'https://www.zola.com/wedding-vendors/wedding-venues/eden-the-lemelson-estate',
                'https://www.weddingwire.com/biz/eden-the-lemelson-estate/393d590ddd940149.html',
              ],
            }),
          }}
        />
      </body>
    </html>
  );
}
