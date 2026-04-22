import { useEffect, useRef } from "react";
import type { Lang } from "@/data/translations";
import { translations } from "@/data/translations";

interface VideoOverlayProps {
  lang: Lang;
  onEnded: () => void;
}

export function VideoOverlay({ lang, onEnded }: VideoOverlayProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const t = translations[lang];

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.currentTime = 0;
    const tryPlay = async () => {
      try {
        v.muted = false;
        await v.play();
      } catch {
        v.muted = true;
        try {
          await v.play();
        } catch {
          /* ignore */
        }
      }
    };
    void tryPlay();
    const fallback = window.setTimeout(onEnded, 60_000);
    return () => window.clearTimeout(fallback);
  }, [onEnded]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-deep animate-in fade-in duration-500">
      <video
        ref={videoRef}
        playsInline
        controls={false}
        onEnded={onEnded}
        className="h-full w-full object-cover"
      >
        <source src="/bride_and_groom.mp4" type="video/mp4" />
      </video>
      <button
        onClick={onEnded}
        className="absolute right-4 top-4 rounded-sm border border-gold/40 bg-black/40 px-4 py-2 font-ornament text-xs tracking-[0.25em] text-gold-light backdrop-blur-md transition hover:border-gold hover:bg-black/60 sm:right-6 sm:top-6"
      >
        {t.skip}
      </button>
    </div>
  );
}
