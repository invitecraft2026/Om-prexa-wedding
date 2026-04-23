import { useRef } from "react";
import type { Lang } from "@/data/translations";
import { translations } from "@/data/translations";
import { FloatingPetals } from "./FloatingPetals";
import { OrnamentDivider } from "./Ornaments";
import { useVideoSrc } from "@/hooks/useVideoSrc";

interface LandingScreenProps {
  lang: Lang;
  onTap: () => void;
}

export function LandingScreen({ lang, onTap }: LandingScreenProps) {
  const t = translations[lang];
  const fontClass = lang === "gu" ? "font-gujarati" : "font-display";
  const videoRef = useRef<HTMLVideoElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // null until client is fully mounted — avoids SSR mismatch
  const bgSrc = useVideoSrc();

  const handleLoadedMetadata = () => {
    const v = videoRef.current;
    if (!v) return;
    v.currentTime = 0.1; // seek past frame 0 for a clean thumbnail
  };

  const handleTap = () => {
    const overlay = overlayRef.current;
    const content = contentRef.current;
    if (overlay) {
      overlay.style.transition = "opacity 0.5s ease";
      overlay.style.opacity = "0";
    }
    if (content) {
      content.style.transition = "opacity 0.5s ease";
      content.style.opacity = "0";
    }
    window.setTimeout(onTap, 400);
  };

  return (
    <div className="relative h-screen w-full overflow-hidden bg-deep">
      {/* Only render video once src is known — prevents wrong video flash */}
      {bgSrc && (
        <video
          key={bgSrc}
          ref={videoRef}
          src={bgSrc}
          playsInline
          muted
          preload="auto"
          onLoadedMetadata={handleLoadedMetadata}
          className="absolute inset-0 h-full w-full object-cover"
        />
      )}

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