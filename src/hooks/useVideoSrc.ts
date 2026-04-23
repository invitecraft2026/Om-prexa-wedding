import { useEffect, useState } from "react";

/**
 * Returns the correct video src after client mount.
 * Returns null during SSR / before mount so callers can wait.
 */
export function useVideoSrc(): string | null {
  const [src, setSrc] = useState<string | null>(null);

  useEffect(() => {
    // Runs only on client, after full hydration
    const isPhone = window.screen.width < 1280;
    setSrc(
      isPhone
        ? "/newvideo.mp4"                       // phone & tablet
        : "/laptopvideo.mp4"   // laptop & desktop
    );
  }, []);

  return src;
}