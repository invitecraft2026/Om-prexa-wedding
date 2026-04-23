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
      {
        property: "og:title",
        content: "Om & Prexa — Mangal Milan",
      },
      {
        property: "og:description",
        content: "A three-day wedding celebration. May 7–9, 2026.",
      },
      {
        property: "og:image",
        content: g6,
      },
      {
        name: "twitter:image",
        content: g6,
      },
    ],
  }),
});

const galleryImages = [
  {
    src: g1,
    alt: "Bride and groom in candlelight",
    orientation: "portrait" as const,
  },
  {
    src: g2,
    alt: "Mandap with sacred fire",
    orientation: "portrait" as const,
  },
  {
    src: g3,
    alt: "Henna hands with marigold",
    orientation: "portrait" as const,
  },
  {
    src: g4,
    alt: "Bride and groom in candlelight",
    orientation: "portrait" as const,
  },
  {
    src: g5,
    alt: "Bride and groom in candlelight",
    orientation: "portrait" as const,
  },
  {
    src: g6,
    alt: "Bride and groom in candlelight",
    orientation: "portrait" as const,
  },
  
];

type Phase = "landing" | "playing" | "open";

function Index() {
  const [phase, setPhase] = useState<Phase>("landing");
  const [bloom, setBloom] = useState(false);
  const [lang, setLang] = useState<Lang>("en");

  useEffect(() => {
    if (typeof window === "undefined") return;

    const stored = window.localStorage.getItem("wedding-lang");

    if (stored === "en" || stored === "gu") {
      setLang(stored as Lang);
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    window.localStorage.setItem("wedding-lang", lang);
  }, [lang]);

  /* User taps landing button */
  const handleTap = () => {
    setPhase("playing");
  };

  /* Video ends → instantly remove video + show bloom */
  const handleVideoEnded = () => {
    /* remove video immediately */
    setPhase("open");

    /* show bloom immediately */
    setBloom(true);

    /* remove bloom after animation */
    window.setTimeout(() => {
      setBloom(false);
    }, 1200);
  };

  return (
    <>
      {/* Landing Screen */}
      {phase === "landing" && (
        <LandingScreen
          lang={lang}
          onTap={handleTap}
        />
      )}

      {/* Fullscreen Intro Video */}
      {phase === "playing" && (
        <VideoOverlay
          lang={lang}
          onEnded={handleVideoEnded}
        />
      )}

      {/* Gold Bloom Transition */}
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
              animation:
                "bloom 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards",
            }}
          />
        </div>
      )}

      {/* Main Invitation */}
      {phase === "open" && (
        <div
          className="bg-deep text-foreground"
          style={{
            animation:
              "fadeUp 1.2s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          <NavBar
            lang={lang}
            setLang={setLang}
          />

          <main>
            <HeroSection lang={lang} />
            <ScratchCard lang={lang} />
            <Schedule lang={lang} />
            <Gallery
              lang={lang}
              images={galleryImages}
            />
            <Venues lang={lang} />
            <Footer lang={lang} />
          </main>
        </div>
      )}
    </>
  );
}