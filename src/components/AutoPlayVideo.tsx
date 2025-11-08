'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

type AutoPlayVideoProps = {
  src: string;
  poster?: string;
  className?: string;
};

/**
 * Defers attaching the video `src` (and thus network download) until
 * the element enters the viewport. Autoplays while visible; pauses
 * when scrolled away. Keeps data usage minimal for non-viewing users.
 * Falls back to poster image if video fails to load or play.
 */
export function AutoPlayVideo({ src, poster, className }: AutoPlayVideoProps) {
  const ref = useRef<HTMLVideoElement | null>(null);
  const [shouldLoad, setShouldLoad] = useState(false);
  const [videoFailed, setVideoFailed] = useState(false);

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

    // Handle video errors
    const handleError = () => {
      setVideoFailed(true);
    };

    // Handle video load failures
    const handleLoadStart = () => {
      // Reset failed state when attempting to load
      setVideoFailed(false);
    };

    node.addEventListener('error', handleError);
    node.addEventListener('loadstart', handleLoadStart);

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
              // If still can't play after loading, fall back to poster image
              setVideoFailed(true);
            } finally {
              node.removeEventListener('canplay', onCanPlay);
              node.removeEventListener('canplaythrough', onCanPlay);
            }
          };
          node.addEventListener('canplay', onCanPlay, { once: true });
          node.addEventListener('canplaythrough', onCanPlay, { once: true });
          
          // Set a timeout to fall back to image if video doesn't start loading within reasonable time
          const timeout = setTimeout(() => {
            // Only fall back if video hasn't started loading (readyState 0 = HAVE_NOTHING)
            // If it's loading (readyState > 0), give it more time
            if (node.readyState === 0 && node.networkState === 3) {
              // Network error - video failed to load
              setVideoFailed(true);
            } else if (node.readyState === 0) {
              // Still no data after 8 seconds - likely a loading issue
              setVideoFailed(true);
            }
          }, 8000);
          
          // Clear timeout if video starts loading successfully
          const onLoadedData = () => {
            clearTimeout(timeout);
          };
          const onProgress = () => {
            clearTimeout(timeout);
          };
          
          node.addEventListener('loadeddata', onLoadedData, { once: true });
          node.addEventListener('progress', onProgress, { once: true });
        }
      };
      play();
    } else {
      node.pause();
    }

    return () => {
      node.removeEventListener('error', handleError);
      node.removeEventListener('loadstart', handleLoadStart);
    };
  }, [shouldLoad, src]);

  // If video failed and poster is provided, show fallback image
  if (videoFailed && poster) {
    return (
      <div className={className} style={{ position: 'relative', width: '100%', height: '100%' }}>
        <Image
          src={poster}
          alt="Eden Estate"
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />
      </div>
    );
  }

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

