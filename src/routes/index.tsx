import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import type { Lang } from "@/data/translations";

import { LandingScreen } from "@/components/wedding/LandingScreen";
import { VideoOverlay } from "@/components/wedding/VideoOverlay";
import { NavBar } from "@/components/wedding/NavBar";
import { HeroSection } from "@/components/wedding/HeroSection";
import { ScratchCard } from "@/components/wedding/ScratchCard";
import { Schedule } from "@/components/wedding/Schedule";
import { Gallery } from "@/components/wedding/Gallery";
import { Venues } from "@/components/wedding/Venues";
import { Footer } from "@/components/wedding/Footer";

import g1 from "/image1.jpg";
import g2 from "/image2.jpg";
import g3 from "/image3.jpg";
import g4 from "/image4.jpg";
import g5 from "/image5.jpg";
import g6 from "/image6.jpg";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Om & Prexa — A Sacred Union | May 7–9, 2026" },
      {
        name: "description",
        content:
          "Join us for the wedding celebrations of Om & Prexa — three sacred days of love, ritual and joy in Vadodara and Morbi, May 7–9, 2026.",
      },
      { property: "og:title", content: "Om & Prexa — Mangal Milan" },
      { property: "og:description", content: "A three-day wedding celebration. May 7–9, 2026." },
      { property: "og:image", content: g5 },
      { name: "twitter:image", content: g5 },
    ],
  }),
});

const galleryImages = [
  // { src: g1, alt: "Bride and groom in candlelight", orientation: "portrait" as const },
  // { src: g2, alt: "Mandap with sacred fire", orientation: "portrait" as const },
  // { src: g3, alt: "Henna hands with marigold", orientation: "portrait" as const },
  { src: g4, alt: "Bride and groom portrait", orientation: "portrait" as const },
  { src: g5, alt: "Wedding couple portrait", orientation: "portrait" as const },
  { src: g6, alt: "Bride and groom special moment", orientation: "portrait" as const },
];

type Phase = "landing" | "playing" | "open";

function Index() {
  const [phase, setPhase] = useState<Phase>("landing");
  const [bloom, setBloom] = useState(false);
  const [lang, setLang] = useState<Lang>("en");
  const audioRef = useRef<HTMLAudioElement | null>(null);

  /* Load saved language */
  useEffect(() => {
    if (typeof window === "undefined") return;
    const stored = window.localStorage.getItem("wedding-lang");
    if (stored === "en" || stored === "gu") setLang(stored as Lang);
  }, []);

  /* Save selected language */
  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem("wedding-lang", lang);
  }, [lang]);

  /* User taps landing button — start music immediately on gesture */
  const handleTap = () => {
    if (audioRef.current) {
      audioRef.current.volume = 0.2;
      audioRef.current.play().catch(() => {});
    }
    setPhase("playing");
  };

  /* Video ends → show bloom + open invitation */
  const handleVideoEnded = () => {
    setPhase("open");
    setBloom(true);
    window.setTimeout(() => setBloom(false), 1200);
  };

  return (
    <>
      {/* Single audio element, always mounted */}
      <audio ref={audioRef} src="newsong.mpeg" loop preload="auto" style={{ display: "none" }} />

      {phase === "landing" && (
        <LandingScreen lang={lang} onTap={handleTap} />
      )}

      {phase === "playing" && (
        <VideoOverlay lang={lang} onEnded={handleVideoEnded} />
      )}

      {bloom && (
        <div
          className="pointer-events-none fixed inset-0 z-[999] flex items-center justify-center"
          aria-hidden
        >
          <span
            className="block h-32 w-32 rounded-full"
            style={{
              background:
                "radial-gradient(circle, oklch(0.85 0.1 85 / 0.95), oklch(0.72 0.13 75 / 0.7) 40%, transparent 70%)",
              animation: "bloom 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards",
            }}
          />
        </div>
      )}

      {phase === "open" && (
        <div
          className="bg-deep text-foreground"
          style={{ animation: "fadeUp 1.2s cubic-bezier(0.16, 1, 0.3, 1)" }}
        >
          <NavBar lang={lang} setLang={setLang} audioRef={audioRef} />
          <main>
            <HeroSection lang={lang} />
            <ScratchCard lang={lang} />
            <Schedule lang={lang} />
            <Gallery lang={lang} images={galleryImages} />
            <Venues lang={lang} />
            <Footer lang={lang} />
          </main>
        </div>
      )}
    </>
  );
}