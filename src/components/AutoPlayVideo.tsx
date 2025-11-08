'use client';

import { useEffect, useRef, useState } from 'react';

type AutoPlayVideoProps = {
  src: string;
  poster?: string;
  className?: string;
};

/**
 * Defers attaching the video `src` (and thus network download) until
 * the element enters the viewport. Autoplays while visible; pauses
 * when scrolled away. Keeps data usage minimal for non-viewing users.
 */
export function AutoPlayVideo({ src, poster, className }: AutoPlayVideoProps) {
  const ref = useRef<HTMLVideoElement | null>(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    // Only observe once; if visible, we load & play.
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          setShouldLoad(true);
        }
      },
      { rootMargin: '200px 0px' }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (shouldLoad) {
      // Attach source directly to <video> for Safari reliability,
      // ensure properties that allow autoplay are set BEFORE load.
      if (node.src !== src) {
        // Important for iOS Safari: attributes + properties must be set prior to load()
        node.muted = true;
        node.setAttribute('muted', '');
        node.playsInline = true;
        node.setAttribute('playsinline', '');
        node.setAttribute('webkit-playsinline', '');
        node.src = src;
        node.load();
      }

      // Try to play immediately; also play on canplay(canplaythrough) as a fallback.
      const play = async () => {
        try {
          await node.play();
        } catch {
          // If play is blocked, try again when enough data has loaded.
          const onCanPlay = async () => {
            try {
              await node.play();
            } catch {
              // Give up silently; Safari power-saving or settings may still block.
            } finally {
              node.removeEventListener('canplay', onCanPlay);
              node.removeEventListener('canplaythrough', onCanPlay);
            }
          };
          node.addEventListener('canplay', onCanPlay, { once: true });
          node.addEventListener('canplaythrough', onCanPlay, { once: true });
        }
      };
      play();
    } else {
      node.pause();
    }
  }, [shouldLoad, src]);

  return (
    <video
      ref={ref}
      className={className}
      muted
      loop
      playsInline
      autoPlay
      // Do not fetch any data until visible.
      preload="metadata"
      poster={poster}
      // Attach the source only when allowed to load.
    >
      {/* Intentionally avoid nested <source> for Safari; src set programmatically */}
      Your browser does not support the video tag.
    </video>
  );
}

