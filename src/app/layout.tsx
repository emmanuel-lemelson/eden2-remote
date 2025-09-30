import type { Metadata } from "next";
import { Playfair_Display, Manrope } from "next/font/google";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-heading",
  subsets: ["latin"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Eden | Stowe, Vermont Estate",
  description:
    "Eden is an 11,400 sq ft luxury rental estate in Stowe, Vermont with eight bedrooms, private spa amenities, and expansive mountain views.",
  metadataBase: new URL("https://lemelsonestate.com"),
  openGraph: {
    title: "Eden Estate | Stowe, Vermont",
    description:
      "Discover Eden, an exclusive 28-acre, 8-bedroom retreat offering the finest in mountain luxury living.",
    url: "https://lemelsonestate.com",
    siteName: "Eden",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://lemelsonestate.com/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "Eden — The Lemelson Estate",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@LemelsonEstate",
    title: "Eden Estate | Stowe, Vermont",
    description:
      "Discover Eden, an exclusive 28-acre, 8-bedroom retreat offering the finest in mountain luxury living.",
  },
  alternates: {
    canonical: "https://lemelsonestate.com",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${playfair.variable} ${manrope.variable} bg-stone-100 text-stone-900 antialiased`}
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
              name: 'Eden — The Lemelson Estate',
              url: 'https://eden-stowe.vercel.app',
              logo: 'https://eden-stowe.vercel.app/The%20Lemelson%20Estate%20(1).png',
              sameAs: [
                'https://www.airbnb.com/rooms/42793723',
                'https://www.vrbo.com/1958794',
                'https://www.instagram.com/the_lemelson_estate',
                'https://x.com/LemelsonEstate',
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
              '@type': 'LodgingBusiness',
              name: 'Eden — The Lemelson Estate',
              url: 'https://eden-stowe.vercel.app',
              image: 'https://eden-stowe.vercel.app/gallery/office/outdoor%20shots/70-020-estate-pool-mountain-backdrop.webp',
              description: 'Luxury 8-bedroom estate in Stowe, Vermont with spa amenities and mountain views.',
              address: {
                '@type': 'PostalAddress',
                addressLocality: 'Stowe',
                addressRegion: 'VT',
                addressCountry: 'US',
              },
              amenityFeature: [
                { '@type': 'LocationFeatureSpecification', name: 'Pool', value: true },
                { '@type': 'LocationFeatureSpecification', name: 'Hot tub', value: true },
                { '@type': 'LocationFeatureSpecification', name: 'Tennis court', value: true },
                { '@type': 'LocationFeatureSpecification', name: 'Game room', value: true },
              ],
              sameAs: [
                'https://www.airbnb.com/rooms/42793723',
                'https://www.vrbo.com/1958794',
              ],
            }),
          }}
        />
      </body>
    </html>
  );
}
