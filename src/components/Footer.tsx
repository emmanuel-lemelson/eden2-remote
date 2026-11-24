import Image from "next/image";
import Link from "next/link";

const footerLinks = [
  { name: "Stays", href: "/stays/" },
  { name: "Weddings", href: "/weddings/" },
  { name: "Retreats", href: "/retreats/" },
  { name: "Gallery", href: "/gallery/" },
  { name: "Reviews", href: "/reviews/" },
  { name: "News", href: "/news/" },
  { name: "Reserve Direct", href: "/contact/" },
];

export function Footer() {
  return (
    <footer className="border-t border-white/30 bg-white/70">
      <div className="lux-container flex flex-col gap-4 py-4 md:flex-row md:items-center md:justify-between md:gap-5 md:py-2">
        <div className="flex flex-col items-center text-center md:items-start md:text-left">
          <Image
            src="/The Lemelson Estate (1).png"
            alt="Eden Estate wordmark"
            className="h-36 w-auto md:h-44 object-contain"
            loading="lazy"
            width={680}
            height={272}
          />
        </div>

        <nav aria-label="Footer navigation" className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-stone-600">
          {footerLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="transition hover:text-stone-950"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        <div className="flex flex-col gap-1.5 text-center text-sm text-stone-700 md:text-right">
          <div className="mx-auto h-px w-12 rounded-full bg-gradient-to-r from-transparent via-[rgba(58,45,20,0.25)] to-transparent md:hidden" />
          <div className="space-y-0.5">
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-stone-500">
              Edson Hill Road Area · Stowe, Vermont
            </p>
            <div className="flex flex-col gap-1">
              <a
                href="mailto:admin@lemelsoncapital.com"
                className="break-all font-bold text-stone-700 transition hover:text-stone-900"
              >
                admin@lemelsoncapital.com
              </a>
            </div>
          </div>
          <div className="flex items-center justify-center gap-2 md:justify-end">
            <a
              href="https://www.facebook.com/p/Eden-The-Lemelson-Estate-100087154695200/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-[#1877F2] text-white transition hover:bg-[#2a86ff]"
              aria-label="Facebook"
            >
              <Image src="/Symbol.png" alt="Facebook" className="h-4 w-4" width={16} height={16} />
            </a>
            <a
              href="https://www.instagram.com/the_lemelson_estate"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-stone-800 shadow-sm transition hover:bg-stone-100"
              aria-label="Instagram"
            >
              <Image src="/Instagram_Symbol_1.png" alt="Instagram" className="h-4 w-4" width={16} height={16} />
            </a>
            <a
              href="https://x.com/LemelsonEstate"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-black text-white transition hover:bg-black/90"
              aria-label="X (formerly Twitter)"
            >
              <Image src="/X_idVRwaKp9b_1.png" alt="X" className="h-4 w-4" width={16} height={16} />
            </a>
            <a
              href="https://www.linkedin.com/company/eden-the-lemelson-estate/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-stone-800 shadow-sm transition hover:bg-stone-100"
              aria-label="LinkedIn"
            >
              <Image src="/linked-in.svg" alt="LinkedIn" className="h-4 w-4" width={16} height={16} />
            </a>
          </div>
          <p className="text-xs text-stone-500 text-center pb-4 md:pb-0 md:text-right">© 2026 The Lemelson Group, LLC</p>
        </div>
      </div>
    </footer>
  );
}
