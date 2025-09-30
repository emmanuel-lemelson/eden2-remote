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
      // Attach <source> and play.
      const play = async () => {
        try {
          await node.play();
        } catch {
          // Autoplay can be blocked; ignore.
        }
      };
      play();
    } else {
      node.pause();
    }
  }, [shouldLoad]);

  return (
    <video
      ref={ref}
      className={className}
      muted
      loop
      playsInline
      // Do not fetch any data until visible.
      preload="none"
      poster={poster}
      // Attach the source only when allowed to load.
    >
      {shouldLoad ? <source src={src} type="video/mp4" /> : null}
      Your browser does not support the video tag.
    </video>
  );
}

