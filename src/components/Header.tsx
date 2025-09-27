'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const navItems = [
  { name: "Home", href: "/" },
  { name: "Gallery", href: "/gallery" },
  { name: "Contact", href: "/contact" },
];

export function Header() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (isMenuOpen) {
      const original = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = original;
      };
    }
  }, [isMenuOpen]);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-50 border-b border-[#d2c4a3]/60 bg-gradient-to-b from-[#fdfbf7]/90 via-[#f8f3ea]/85 to-[#f2e8da]/80 backdrop-blur supports-[backdrop-filter]:bg-transparent">
      <div className="lux-container flex h-16 items-center md:h-20">
        <div className="flex flex-1 items-center justify-center md:justify-start">
          <Link
            href="/"
            className="inline-flex h-10 w-24 items-center justify-center rounded-full border border-transparent text-[0.65rem] font-semibold uppercase tracking-[0.45em] text-stone-600 transition hover:border-white/70 hover:bg-white/70 hover:text-stone-900 md:h-11 md:w-32"
            aria-label="Eden Estate Home"
          >
            <span className="sr-only">Eden Estate</span>
          </Link>
        </div>

        <nav className="hidden flex-none items-center gap-12 text-[0.8rem] font-semibold uppercase tracking-[0.32em] text-stone-600 md:flex">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`group relative inline-flex items-center pb-1 transition-colors duration-200 ${
                  isActive ? "text-stone-900" : "hover:text-stone-900"
                }`}
              >
                {item.name}
                <span
                  className={`pointer-events-none absolute inset-x-0 -bottom-[6px] h-[2px] origin-center rounded-full bg-gradient-to-r from-[#c2a060] to-[#8f7845] transition duration-300 ${
                    isActive
                      ? "opacity-100"
                      : "scale-x-0 opacity-0 group-hover:scale-x-100 group-hover:opacity-100"
                  }`}
                />
              </Link>
            );
          })}
        </nav>

        <div className="flex flex-1 items-center justify-end gap-4">
          <button
            type="button"
            aria-label="Open navigation menu"
            onClick={() => setIsMenuOpen((prev) => !prev)}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/60 bg-white/70 text-stone-700 shadow-sm transition duration-200 hover:-translate-y-[1px] hover:border-[#c2a060]/60 hover:text-stone-900 md:hidden"
          >
            <span className="sr-only">Toggle menu</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="h-[18px] w-[18px]"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 7h16M4 12h16M4 17h16" />
            </svg>
          </button>
        </div>
      </div>

      {isMenuOpen ? (
        <div className="md:hidden">
          <div
            className="fixed inset-0 z-40 bg-black/45 backdrop-blur"
            onClick={() => setIsMenuOpen(false)}
          />
          <nav className="fixed top-5 right-4 z-50 w-[85vw] max-w-xs origin-top-right rounded-3xl border border-white/70 bg-gradient-to-b from-white/98 via-white/95 to-white/92 p-6 shadow-[0_25px_60px_-20px_rgba(30,30,40,0.35)]">
            <div className="flex items-center justify-between">
              <span className="text-lg font-semibold uppercase tracking-[0.32em] text-stone-800">Menu</span>
              <button
                type="button"
                aria-label="Close menu"
                onClick={() => setIsMenuOpen(false)}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/70 bg-white/80 text-stone-500 shadow-sm transition duration-200 hover:-translate-y-[1px] hover:text-stone-800"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  className="h-4 w-4"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 6l12 12M6 18L18 6" />
                </svg>
              </button>
            </div>
            <div className="mt-6 space-y-3">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={`mobile-${item.name}`}
                    href={item.href}
                    className={`flex items-center justify-between rounded-2xl border px-4 py-3 text-xs font-semibold uppercase tracking-[0.3em] transition duration-200 ${
                      isActive
                        ? "border-[#c2a060]/50 bg-white text-stone-900 shadow-lg"
                        : "border-transparent bg-white/70 text-stone-600 hover:border-white/70 hover:bg-white hover:text-stone-900 hover:shadow-lg"
                    }`}
                  >
                    {item.name}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      className="h-4 w-4"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M13 6l6 6-6 6" />
                    </svg>
                  </Link>
                );
              })}
            </div>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
