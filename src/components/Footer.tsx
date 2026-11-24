import Image from "next/image";
import Link from "next/link";

const footerColumns = [
  {
    heading: "Experience",
    label: "Experience navigation",
    links: [
      { name: "Stays", href: "/stays/" },
      { name: "Weddings", href: "/weddings/" },
      { name: "Retreats", href: "/retreats/" },
      { name: "Reserve Direct", href: "/contact/" },
    ],
  },
  {
    heading: "Estate",
    label: "Estate navigation",
    links: [
      { name: "Gallery", href: "/gallery/" },
      { name: "Reviews", href: "/reviews/" },
      { name: "News", href: "/news/" },
    ],
  },
  {
    heading: "Guides",
    label: "Seasonal and wedding guides",
    links: [
      { name: "Ski Season", href: "/guides/ski-season/" },
      { name: "Fall Foliage", href: "/guides/stowe-fall-foliage/" },
      { name: "Family Reunions", href: "/guides/stowe-family-reunions/" },
    ],
  },
];

const socialLinks = [
  {
    name: "Facebook",
    href: "https://www.facebook.com/p/Eden-The-Lemelson-Estate-100087154695200/",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="h-3.5 w-3.5">
        <path d="M13.5 21v-8.2h2.75l.41-3.2H13.5V7.55c0-.93.26-1.56 1.59-1.56h1.7V3.13A22.7 22.7 0 0 0 14.31 3c-2.45 0-4.13 1.5-4.13 4.24v2.36H7.4v3.2h2.78V21h3.32Z" />
      </svg>
    ),
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/the_lemelson_estate",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true" className="h-3.5 w-3.5">
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    name: "X (formerly Twitter)",
    href: "https://x.com/LemelsonEstate",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="h-3.5 w-3.5">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.45-6.231Zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77Z" />
      </svg>
    ),
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/company/eden-the-lemelson-estate/",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="h-3.5 w-3.5">
        <path d="M6.94 8.5H3.56V19.5H6.94V8.5ZM5.25 3.5a1.96 1.96 0 1 0 0 3.92 1.96 1.96 0 0 0 0-3.92ZM20.44 13.02c0-3.04-1.62-4.46-3.79-4.46-1.75 0-2.53.96-2.97 1.64V8.5H10.3c.04.96 0 11 0 11h3.38v-6.14c0-.33.02-.66.12-.89.26-.66.86-1.34 1.87-1.34 1.32 0 1.85 1.01 1.85 2.48V19.5h3.38v-6.48h-.46Z" />
      </svg>
    ),
  },
];

export function Footer() {
  return (
    <footer className="border-t border-[#d2c4a3]/50 bg-[#fdfbf7]/90">
      <div className="lux-container py-8 md:py-10">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-5">
            <Link
              href="/"
              aria-label="Eden Estate Home"
              className="inline-flex items-center"
            >
              <Image
                src="/The Lemelson Estate (1).png"
                alt="Eden Estate wordmark"
                width={500}
                height={500}
                loading="lazy"
                className="-my-6 h-32 w-auto object-contain md:-my-7 md:h-36"
              />
            </Link>
            <div className="mt-4 flex flex-wrap items-center gap-x-2.5 gap-y-1 text-sm text-stone-700 md:flex-col md:items-start md:gap-y-0.5">
              <span className="text-stone-700">Stowe, Vermont</span>
              <span aria-hidden="true" className="text-stone-400 md:hidden">
                ·
              </span>
              <a
                href="mailto:admin@lemelsoncapital.com"
                className="font-medium text-stone-800 transition hover:text-[#8f7845]"
              >
                admin@lemelsoncapital.com
              </a>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 sm:gap-8 md:col-span-7">
            {footerColumns.map((col) => (
              <nav key={col.heading} aria-label={col.label}>
                <p className="mb-2.5 text-xs font-semibold text-stone-900">
                  {col.heading}
                </p>
                <ul className="space-y-1.5 text-sm text-stone-700">
                  {col.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="transition hover:text-stone-950"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        <div className="mt-7 flex flex-col-reverse items-start justify-between gap-4 border-t border-[#d2c4a3]/40 pt-5 sm:flex-row sm:items-center">
          <p className="text-xs text-stone-600">© 2026 The Lemelson Group, LLC</p>
          <div className="flex items-center gap-2">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.name}
                className="flex h-8 w-8 items-center justify-center rounded-full border border-[#d2c4a3]/60 bg-white/80 text-stone-600 transition hover:border-[#8f7845] hover:text-stone-950"
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
