"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

interface ScalingHeroTitleProps {
  children: ReactNode;
  className?: string;
}

/**
 * Editorial hero heading wrapper (kept static for calm, zero-jitter reading).
 */
export function ScalingHeroTitle({ children, className = "" }: ScalingHeroTitleProps) {
  return <h1 className={className}>{children}</h1>;
}

interface RevealBlockProps {
  children: ReactNode;
  delayMs?: number;
  className?: string;
}

/**
 * Subtle, mature scroll-triggered settle for headings, copy, and photography.
 * Content remains visible if IntersectionObserver or reduced-motion is active.
 */
export function RevealBlock({
  children,
  delayMs = 0,
  className = "",
}: RevealBlockProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof window === "undefined") return;

    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches || typeof IntersectionObserver === "undefined") {
      setRevealed(true);
      return;
    }

    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.98) {
      setRevealed(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setRevealed(true);
            observer.disconnect();
            break;
          }
        }
      },
      { threshold: 0.08, rootMargin: "0px 0px -24px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const cappedDelay = Math.min(Math.max(delayMs, 0), 60);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: revealed ? 1 : 0,
        transform: revealed ? "translate3d(0, 0, 0)" : "translate3d(0, 6px, 0)",
        transition: `opacity 420ms cubic-bezier(0.25, 0.1, 0.25, 1) ${cappedDelay}ms, transform 420ms cubic-bezier(0.25, 0.1, 0.25, 1) ${cappedDelay}ms`,
      }}
    >
      {children}
    </div>
  );
}
