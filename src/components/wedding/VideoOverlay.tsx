import { useEffect, useRef } from "react";
import type { Lang } from "@/data/translations";
import { translations } from "@/data/translations";
import { useVideoSrc } from "@/hooks/useVideoSrc";

interface VideoOverlayProps {
  lang: Lang;
  onEnded: () => void;
}

export function VideoOverlay({ lang, onEnded }: VideoOverlayProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const triggeredRef = useRef(false);

  const t = translations[lang];
  const videoSrc = useVideoSrc();

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !videoSrc) return;

    triggeredRef.current = false;

    video.currentTime = 0;
    video.muted = true;
    video.loop = false; // IMPORTANT: prevent replay

    const playVideo = async () => {
      try {
        await video.play();
      } catch {
        /* ignore autoplay issues */
      }
    };

    const handleTimeUpdate = () => {
      if (triggeredRef.current) return;

      /* trigger bloom ~0.8s before video ends */
      if (video.duration && video.currentTime >= video.duration - 0.8) {
        triggeredRef.current = true;
        video.pause(); // stop instantly
        onEnded(); // show bloom immediately
      }
    };

    video.addEventListener("timeupdate", handleTimeUpdate);

    void playVideo();

    return () => {
      video.removeEventListener("timeupdate", handleTimeUpdate);
    };
  }, [videoSrc, onEnded]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-deep animate-in fade-in duration-500">
      {videoSrc && (
        <video
          key={videoSrc}
          ref={videoRef}
          src={videoSrc}
          playsInline
          muted
          controls={false}
          className="h-full w-full object-cover"
        />
      )}

      <button
        onClick={onEnded}
        className="absolute right-4 top-4 rounded-sm border border-gold/40 bg-black/40 px-4 py-2 font-ornament text-xs tracking-[0.25em] text-gold-light backdrop-blur-md transition hover:border-gold hover:bg-black/60 sm:right-6 sm:top-6"
      >
        {t.skip}
      </button>
    </div>
  );
}