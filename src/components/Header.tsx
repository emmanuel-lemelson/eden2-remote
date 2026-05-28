'use client';

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const navItems = [
  { name: "Home", href: "/" },
  { name: "Gallery", href: "/gallery" },
  { name: "Reviews", href: "/reviews" },
  { name: "Reserve Now", href: "/contact" },
  { name: "News", href: "/news" },
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
    <header className="sticky top-0 z-50 border-b border-[#d2c4a3]/60 bg-gradient-to-b from-[#fdfbf7] via-[#f8f3ea] to-[#f2e8da]">
      <div className="lux-container flex h-16 items-center md:h-20">
        
        {/* Mobile: Left Hamburger Menu Button (hidden on desktop) */}
        <div className="flex flex-1 items-center justify-start md:hidden">
          <button
            type="button"
            aria-label="Open navigation menu"
            onClick={() => setIsMenuOpen((prev) => !prev)}
            className="flex h-12 w-12 items-center justify-center text-stone-800 transition duration-200 hover:text-stone-950 active:scale-95"
          >
            <span className="sr-only">Toggle menu</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="h-[25px] w-[25px]"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 7h16M4 12h16M4 17h16" />
            </svg>
          </button>
        </div>

        {/* Center: Logo (Centered on mobile, left-aligned on desktop) */}
        <div className="flex flex-none items-center justify-center md:flex-1 md:justify-start">
          <Link
            href="/"
            className="inline-flex items-center"
            aria-label="Eden Estate Home"
          >
            <Image
              src="/The Lemelson Estate (1).png"
              alt="Eden Estate wordmark"
              className="h-20 w-auto md:h-28 object-contain"
              loading="lazy"
              width={340}
              height={136}
            />
          </Link>
        </div>

        {/* Right / Main Desktop Navigation */}
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

        {/* Mobile: Right Spacer (hidden on desktop, balances the flex-1 column so logo is perfectly centered) */}
        <div className="flex flex-1 items-center justify-end md:hidden">
          {/* Empty spacer for visual layout symmetry */}
        </div>
      </div>

      {/* Mobile Slider Menu (Full height side drawer, slides in from left covering 50% of the screen) */}
      <div 
        className={`fixed inset-0 z-50 md:hidden transition-opacity duration-300 ${
          isMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Backdrop glass blur */}
        <div
          className="absolute inset-0 bg-black/40 backdrop-blur-sm"
          onClick={() => setIsMenuOpen(false)}
        />
        
        {/* Drawer panel */}
        <nav 
          className={`absolute inset-y-0 left-0 z-50 w-[50vw] min-w-[280px] border-r border-[#d2c4a3]/40 bg-gradient-to-b from-[#fdfbf7]/98 via-[#f8f3ea]/98 to-[#f2e8da]/95 p-6 shadow-[10px_0_60px_-20px_rgba(30,30,40,0.25)] transition-transform duration-300 transform ${
            isMenuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between border-b border-stone-200/60 pb-4">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-stone-900">Menu</span>
            <button
              type="button"
              aria-label="Close menu"
              onClick={() => setIsMenuOpen(false)}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-stone-200 bg-white text-stone-600 shadow-sm transition duration-200 hover:text-stone-900 hover:border-stone-400"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                className="h-4 w-4"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 6l12 12M6 18L18 6" />
              </svg>
            </button>
          </div>
          
          <div className="mt-8 space-y-4">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={`mobile-${item.name}`}
                  href={item.href}
                  className={`flex items-center justify-between rounded-xl border px-4 py-3.5 text-xs font-bold uppercase tracking-[0.25em] transition duration-200 shadow-sm ${
                    isActive
                      ? "border-[#c2a060]/60 bg-white text-[#8f7845] shadow-md"
                      : "border-stone-200/80 bg-white text-stone-900 hover:border-[#c2a060]/40 hover:bg-stone-50 hover:text-black hover:shadow-md"
                  }`}
                >
                  {item.name}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    className="h-3.5 w-3.5"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </Link>
              );
            })}
          </div>
        </nav>
      </div>
    </header>
  );
}
