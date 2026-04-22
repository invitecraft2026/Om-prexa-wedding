import { useRef } from "react";
import type { Lang } from "@/data/translations";
import { translations } from "@/data/translations";
import { FloatingPetals } from "./FloatingPetals";
import { OrnamentDivider } from "./Ornaments";

interface LandingScreenProps {
  lang: Lang;
  onEnded: () => void;
}

export function LandingScreen({ lang, onEnded }: LandingScreenProps) {
  const t = translations[lang];
  const fontClass = lang === "gu" ? "font-gujarati" : "font-display";
  const videoRef = useRef<HTMLVideoElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const handleTap = async () => {
    const v = videoRef.current;
    const overlay = overlayRef.current;
    const content = contentRef.current;
    if (!v || !overlay || !content) return;

    overlay.style.transition = "opacity 0.8s ease";
    overlay.style.opacity = "0";
    overlay.style.pointerEvents = "none";

    content.style.transition = "opacity 0.8s ease";
    content.style.opacity = "0";
    content.style.pointerEvents = "none";

    // Always muted — no audio on the video
    try { await v.play(); } catch { /* ignore */ }
  };

  return (
    <div className="relative h-screen w-full overflow-hidden bg-deep">
      <video
        ref={videoRef}
        playsInline
        muted           // ← video is always muted
        preload="auto"
        onEnded={onEnded}
        className="absolute inset-0 h-full w-full object-cover"
      >
        <source src="/newvideo.mp4" type="video/mp4" />
      </video>

      <div
        ref={overlayRef}
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, oklch(0.18 0.025 40 / 0.55) 0%, oklch(0.18 0.025 40 / 0.35) 40%, oklch(0.18 0.025 40 / 0.7) 100%)",
        }}
      />

      <FloatingPetals count={20} />

      <div
        ref={contentRef}
        className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center"
      >
        <OrnamentDivider className="mb-8 opacity-90" />
        <p className={`mb-4 text-sm italic tracking-[0.3em] text-gold-light/90 sm:text-base ${fontClass}`}>
          {t.invite}
        </p>
        <h1
          className={`mb-6 text-gold-gradient text-5xl font-light tracking-wide sm:text-7xl md:text-8xl ${fontClass}`}
          style={{ lineHeight: 1.1 }}
        >
          {t.aSacredUnion}
        </h1>
        <p className="mb-12 font-ornament text-sm tracking-[0.4em] text-gold-light/85 sm:text-base">
          {t.dateRange}
        </p>
        <button
          onClick={handleTap}
          className="animate-pulse-gold rounded-sm border border-gold/70 px-10 py-3.5 font-ornament text-xs tracking-[0.3em] text-gold-light backdrop-blur-md transition-all hover:scale-[1.03] hover:border-gold hover:bg-white/10 sm:text-sm"
          style={{ background: "oklch(1 0 0 / 0.08)" }}
        >
          {t.tapButton}
        </button>
        <OrnamentDivider className="mt-12 opacity-70" />
      </div>
    </div>
  );
}