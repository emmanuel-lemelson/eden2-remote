'use client';

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const navItems = [
  { name: "Home", href: "/" },
  { name: "Gallery", href: "/gallery" },
  { name: "Reviews", href: "/reviews" },
  { name: "Reserve Now", href: "/contact" },
];

const experienceLinks = [
  {
    title: "Luxury Stays",
    subtitle: "Private Stowe mountain getaways",
    href: "/stays/",
  },
  {
    title: "Weddings",
    subtitle: "Tented receptions up to 300",
    href: "/weddings/",
  },
  {
    title: "Executive Retreats",
    subtitle: "Discreet leadership offsites",
    href: "/retreats/",
  },
];

const experienceGuides = [
  { name: "Ski Season", href: "/guides/ski-season/" },
  { name: "Fall Foliage", href: "/guides/stowe-fall-foliage/" },
  { name: "Family Reunions", href: "/guides/stowe-family-reunions/" },
];

export function Header() {
  const pathname = usePathname();
  const normalizedPath = pathname?.replace(/\/$/, "") || "/";
  const isExperiencesActive =
    normalizedPath.startsWith("/stays") ||
    normalizedPath.startsWith("/weddings") ||
    normalizedPath.startsWith("/retreats") ||
    normalizedPath.startsWith("/guides");

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isExperiencesOpen, setIsExperiencesOpen] = useState(false);
  const [isMobileExperiencesOpen, setIsMobileExperiencesOpen] = useState(isExperiencesActive);
  const experiencesRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const isHoverPreviewRef = useRef(false);

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
    setIsExperiencesOpen(false);
    isHoverPreviewRef.current = false;
    setIsMobileExperiencesOpen(isExperiencesActive);
  }, [pathname, isExperiencesActive]);

  useEffect(() => {
    if (!isExperiencesOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        isHoverPreviewRef.current = false;
        setIsExperiencesOpen(false);
        triggerRef.current?.focus();
      }
    };
    const handleClickOutside = (e: MouseEvent) => {
      if (experiencesRef.current && !experiencesRef.current.contains(e.target as Node)) {
        isHoverPreviewRef.current = false;
        setIsExperiencesOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isExperiencesOpen]);

  return (
    <header
      className="sticky top-0 z-50 border-b border-[#d2c4a3]/60 bg-gradient-to-b from-[#fdfbf7] via-[#f8f3ea] to-[#f2e8da]"
    >
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
              priority
              width={340}
              height={136}
            />
          </Link>
        </div>

        {/* Right / Main Desktop Navigation */}
        <nav
          aria-label="Primary"
          className="hidden flex-none items-center gap-6 lg:gap-8 xl:gap-9 text-[0.9375rem] font-medium tracking-tight text-stone-900 md:flex"
        >
          <Link
            href="/"
            aria-current={normalizedPath === "/" ? "page" : undefined}
            onMouseEnter={() => {
              isHoverPreviewRef.current = false;
              setIsExperiencesOpen(false);
            }}
            className={`group relative inline-flex items-center whitespace-nowrap pb-1 transition-colors duration-200 ${
              normalizedPath === "/" ? "text-[#8f7845]" : "hover:text-[#8f7845]"
            }`}
          >
            Home
            <span
              className={`pointer-events-none absolute inset-x-0 -bottom-[6px] h-[2px] origin-center rounded-full bg-gradient-to-r from-[#c2a060] to-[#8f7845] transition duration-300 ${
                normalizedPath === "/"
                  ? "opacity-100"
                  : "scale-x-0 opacity-0 group-hover:scale-x-100 group-hover:opacity-100"
              }`}
            />
          </Link>

          <div
            ref={experiencesRef}
            className="relative flex items-center"
            onPointerEnter={(e) => {
              if (
                typeof window !== "undefined" &&
                window.matchMedia("(hover: hover)").matches &&
                e.pointerType !== "touch" &&
                !isExperiencesOpen
              ) {
                isHoverPreviewRef.current = true;
                setIsExperiencesOpen(true);
              }
            }}
            onPointerLeave={() => {
              if (isHoverPreviewRef.current) {
                isHoverPreviewRef.current = false;
                setIsExperiencesOpen(false);
              }
            }}
            onBlur={(e) => {
              if (
                e.relatedTarget &&
                experiencesRef.current &&
                !experiencesRef.current.contains(e.relatedTarget as Node)
              ) {
                isHoverPreviewRef.current = false;
                setIsExperiencesOpen(false);
              }
            }}
          >
            <button
              ref={triggerRef}
              type="button"
              aria-expanded={isExperiencesOpen}
              aria-controls="experiences-dropdown"
              onClick={() => {
                if (isExperiencesOpen && isHoverPreviewRef.current) {
                  isHoverPreviewRef.current = false;
                  return;
                }
                isHoverPreviewRef.current = false;
                setIsExperiencesOpen((prev) => !prev);
              }}
              className={`group relative inline-flex cursor-pointer items-center gap-1.5 whitespace-nowrap pb-1 transition-colors duration-200 ${
                isExperiencesActive || isExperiencesOpen
                  ? "text-[#8f7845]"
                  : "hover:text-[#8f7845]"
              }`}
            >
              Experiences
              <svg
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.75"
                aria-hidden="true"
                className={`h-3 w-3 transition-transform duration-200 ${
                  isExperiencesOpen ? "rotate-180" : ""
                }`}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6l4 4 4-4" />
              </svg>
              <span
                className={`pointer-events-none absolute inset-x-0 -bottom-[6px] h-[2px] origin-center rounded-full bg-gradient-to-r from-[#c2a060] to-[#8f7845] transition duration-300 ${
                  isExperiencesActive || isExperiencesOpen
                    ? "opacity-100"
                    : "scale-x-0 opacity-0 group-hover:scale-x-100 group-hover:opacity-100"
                }`}
              />
            </button>

            {/* Compact Floating Experiences Popover */}
            <div
              id="experiences-dropdown"
              hidden={!isExperiencesOpen}
              className={`absolute left-1/2 top-full z-50 -translate-x-1/2 pt-3 transition duration-150 ease-out motion-reduce:transition-none ${
                isExperiencesOpen
                  ? "pointer-events-auto translate-y-0 opacity-100"
                  : "pointer-events-none -translate-y-1 opacity-0"
              }`}
            >
              <div className="w-[420px] max-w-[calc(100vw-2rem)] rounded-2xl bg-[#fdfbf7]/95 p-4 normal-case tracking-normal ring-1 ring-[#1f1b17]/[0.08] shadow-[0_4px_12px_-2px_rgba(31,27,23,0.06),0_20px_44px_-12px_rgba(31,27,23,0.16)] backdrop-blur-xl">
                <div className="grid grid-cols-[1.45fr_1fr] gap-5">
                  <div>
                    <p className="mb-2 text-[11px] font-medium text-[#8c8275]">
                      Experiences
                    </p>
                    <ul className="space-y-0.5">
                      {experienceLinks.map((item) => {
                        const normalizedHref = item.href.replace(/\/$/, "") || "/";
                        const isItemActive = normalizedPath === normalizedHref;
                        return (
                          <li key={item.href}>
                            <Link
                              href={item.href}
                              aria-current={isItemActive ? "page" : undefined}
                              onClick={() => {
                                isHoverPreviewRef.current = false;
                                setIsExperiencesOpen(false);
                              }}
                              className={`group -mx-2 flex flex-col rounded-lg px-2.5 py-2 transition-colors duration-150 ${
                                isItemActive
                                  ? "bg-[#1f1b17]/[0.05]"
                                  : "hover:bg-[#1f1b17]/[0.04]"
                              }`}
                            >
                              <span className="flex items-center gap-2 text-[14px] font-medium leading-snug tracking-[-0.01em] text-[#1f1b17]">
                                <span>{item.title}</span>
                                {isItemActive ? (
                                  <span
                                    aria-hidden="true"
                                    className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#8f7845]"
                                  />
                                ) : null}
                              </span>
                              <span className="mt-0.5 text-[12px] font-normal leading-snug text-[#78716c]">
                                {item.subtitle}
                              </span>
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  </div>

                  <div className="border-l border-[#1f1b17]/[0.07] pl-5">
                    <p className="mb-2 text-[11px] font-medium text-[#8c8275]">
                      Seasonal guides
                    </p>
                    <ul className="space-y-0.5">
                      {experienceGuides.map((guide) => {
                        const normalizedHref = guide.href.replace(/\/$/, "") || "/";
                        const isGuideActive = normalizedPath === normalizedHref;
                        return (
                          <li key={guide.href}>
                            <Link
                              href={guide.href}
                              aria-current={isGuideActive ? "page" : undefined}
                              onClick={() => {
                                isHoverPreviewRef.current = false;
                                setIsExperiencesOpen(false);
                              }}
                              className={`group -mx-2 flex items-center gap-2 rounded-lg px-2.5 py-1.5 text-[13.5px] font-medium tracking-[-0.01em] transition-colors duration-150 ${
                                isGuideActive
                                  ? "bg-[#1f1b17]/[0.05] text-[#1f1b17]"
                                  : "text-[#44403c] hover:bg-[#1f1b17]/[0.04] hover:text-[#1f1b17]"
                              }`}
                            >
                              <span>{guide.name}</span>
                              {isGuideActive ? (
                                <span
                                  aria-hidden="true"
                                  className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#8f7845]"
                                />
                              ) : null}
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {navItems.slice(1).map((item) => {
            const isActive = normalizedPath === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                aria-current={isActive ? "page" : undefined}
                onMouseEnter={() => {
                  isHoverPreviewRef.current = false;
                  setIsExperiencesOpen(false);
                }}
                className={`group relative inline-flex items-center whitespace-nowrap pb-1 transition-colors duration-200 ${
                  isActive ? "text-[#8f7845]" : "hover:text-[#8f7845]"
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
          <div className="flex items-center justify-end">
            <button
              type="button"
              aria-label="Close menu"
              onClick={() => setIsMenuOpen(false)}
              className="-mr-2 flex h-10 w-10 cursor-pointer items-center justify-center text-stone-800 transition duration-200 hover:text-stone-950 active:scale-95"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.75"
                className="h-5 w-5"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 6l12 12M6 18L18 6" />
              </svg>
            </button>
          </div>
          
          <div className="mt-2 flex flex-col gap-1 overflow-y-auto pb-8">
            <Link
              href="/"
              className="py-2 text-2xl font-semibold tracking-tight leading-snug"
            >
              <span
                className={`transition-colors duration-200 ${
                  normalizedPath === "/"
                    ? "text-[#8f7845]"
                    : "text-stone-900 hover:text-[#8f7845]"
                }`}
              >
                Home
              </span>
            </Link>

            <div>
              <button
                type="button"
                aria-expanded={isMobileExperiencesOpen}
                onClick={() => setIsMobileExperiencesOpen((prev) => !prev)}
                className="inline-flex cursor-pointer items-center gap-2 py-2 text-left text-2xl font-semibold tracking-tight leading-snug"
              >
                <span
                  className={`transition-colors duration-200 ${
                    isExperiencesActive ? "text-[#8f7845]" : "text-stone-900"
                  }`}
                >
                  Experiences
                </span>
                <svg
                  viewBox="0 0 16 16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  aria-hidden="true"
                  className={`h-4 w-4 text-stone-600 transition-transform duration-200 ${
                    isMobileExperiencesOpen ? "rotate-180" : ""
                  }`}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6l4 4 4-4" />
                </svg>
              </button>

              {isMobileExperiencesOpen ? (
                <div className="mb-2 mt-1 flex flex-col gap-0.5 border-l-2 border-[#d2c4a3]/70 pl-4">
                  {[...experienceLinks.map((e) => ({ name: e.title, href: e.href })), ...experienceGuides].map((sub) => {
                    const normalizedSubHref = sub.href.replace(/\/$/, "") || "/";
                    const isSubActive = normalizedPath === normalizedSubHref;
                    return (
                      <Link
                        key={`mobile-sub-${sub.href}`}
                        href={sub.href}
                        className="py-1.5 text-lg font-medium tracking-tight"
                      >
                        <span
                          className={`transition-colors duration-200 ${
                            isSubActive
                              ? "text-[#8f7845]"
                              : "text-stone-700 hover:text-[#8f7845]"
                          }`}
                        >
                          {sub.name}
                        </span>
                      </Link>
                    );
                  })}
                </div>
              ) : null}
            </div>

            {navItems.slice(1).map((item) => {
              const isActive = normalizedPath === item.href;
              return (
                <Link
                  key={`mobile-${item.name}`}
                  href={item.href}
                  className="py-2 text-2xl font-semibold tracking-tight leading-snug"
                >
                  <span
                    className={`transition-colors duration-200 ${
                      isActive
                        ? "text-[#8f7845]"
                        : "text-stone-900 hover:text-[#8f7845]"
                    }`}
                  >
                    {item.name}
                  </span>
                </Link>
              );
            })}
          </div>
        </nav>
      </div>
    </header>
  );
}
