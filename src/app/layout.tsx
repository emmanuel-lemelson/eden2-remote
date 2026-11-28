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
      </body>
    </html>
  );
}
