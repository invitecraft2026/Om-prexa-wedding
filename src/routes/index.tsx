import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
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

import g1 from "@/assets/gallery-1.jpg";
import g2 from "@/assets/gallery-2.jpg";
import g3 from "@/assets/gallery-3.jpg";
import g4 from "@/assets/gallery-4.jpg";
import g5 from "@/assets/gallery-5.jpg";
import g6 from "@/assets/gallery-6.jpg";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Khushi & Dev — A Sacred Union | May 7–9, 2026" },
      {
        name: "description",
        content:
          "Join us for the wedding celebrations of Khushi & Dev — three sacred days of love, ritual and joy in Vadodara and Morbi, May 7–9, 2026.",
      },
      { property: "og:title", content: "Khushi & Dev — A Sacred Union" },
      {
        property: "og:description",
        content: "A three-day wedding celebration. May 7–9, 2026.",
      },
      { property: "og:image", content: g1 },
      { name: "twitter:image", content: g1 },
    ],
  }),
});

const galleryImages = [
  { src: g1, alt: "Bride and groom in candlelight", orientation: "portrait" as const },
  { src: g2, alt: "Mandap with sacred fire", orientation: "landscape" as const },
  { src: g3, alt: "Henna hands with marigold", orientation: "portrait" as const },
  { src: g4, alt: "Raas garba celebration", orientation: "landscape" as const },
  { src: g5, alt: "Haldi ceremony", orientation: "portrait" as const },
  { src: g6, alt: "Diyas and rose petals", orientation: "landscape" as const },
];

type Phase = "landing" | "playing" | "invitation";

function Index() {
  const [phase, setPhase] = useState<Phase>("landing");
  const [bloom, setBloom] = useState(false);
  const [lang, setLang] = useState<Lang>("en");

  useEffect(() => {
    const stored = typeof window !== "undefined" ? window.localStorage.getItem("wedding-lang") : null;
    if (stored === "en" || stored === "gu") setLang(stored);
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") window.localStorage.setItem("wedding-lang", lang);
  }, [lang]);

  const handleOpen = () => setPhase("playing");
  const handleEnded = () => {
    setBloom(true);
    window.setTimeout(() => {
      setPhase("invitation");
      window.setTimeout(() => setBloom(false), 1200);
    }, 600);
  };

  if (phase === "landing") {
    return <LandingScreen lang={lang} onOpen={handleOpen} />;
  }

  return (
    <>
      {phase === "playing" && <VideoOverlay lang={lang} onEnded={handleEnded} />}
      {bloom && (
        <div
          className="pointer-events-none fixed inset-0 z-[60] flex items-center justify-center"
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
      <div
        className="bg-deep text-foreground"
        style={{ animation: "fadeUp 1.2s cubic-bezier(0.16, 1, 0.3, 1)" }}
      >
        <NavBar lang={lang} setLang={setLang} />
        <main>
          <HeroSection lang={lang} />
          <ScratchCard lang={lang} />
          <Schedule lang={lang} />
          <Gallery lang={lang} images={galleryImages} />
          <Venues lang={lang} />
          <Footer lang={lang} />
        </main>
      </div>
    </>
  );
}
