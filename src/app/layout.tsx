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
  metadataBase: new URL("https://eden-stowe.vercel.app"),
  openGraph: {
    title: "Eden Estate | Stowe, Vermont",
    description:
      "Discover Eden, an exclusive 28-acre, 8-bedroom retreat offering the finest in mountain luxury living.",
    url: "https://eden-stowe.vercel.app",
    siteName: "Eden",
    locale: "en_US",
    type: "website",
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
      </body>
    </html>
  );
}
