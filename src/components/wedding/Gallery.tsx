import { useEffect, useState } from "react";
import type { Lang } from "@/data/translations";
import { translations } from "@/data/translations";
import { OrnamentDivider } from "./Ornaments";

interface GalleryProps {
  lang: Lang;
  images: { src: string; alt: string; orientation: "portrait" | "landscape" }[];
}

export function Gallery({ lang, images }: GalleryProps) {
  const t = translations[lang];
  const fontClass = lang === "gu" ? "font-gujarati" : "font-display";
  const [open, setOpen] = useState<number | null>(null);

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
      if (e.key === "ArrowRight") setOpen((o) => (o === null ? null : (o + 1) % images.length));
      if (e.key === "ArrowLeft")
        setOpen((o) => (o === null ? null : (o - 1 + images.length) % images.length));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, images.length]);

  return (
    <section className="relative warm-radial px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <OrnamentDivider className="mb-6" />
          <h2 className={`text-gold-gradient mb-3 text-4xl font-light sm:text-6xl ${fontClass}`}>
            {t.galleryTitle}
          </h2>
          <p className={`text-sm italic text-muted-foreground sm:text-base ${fontClass}`}>
            {t.gallerySubtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setOpen(i)}
              className="group relative overflow-hidden rounded-sm border border-gold/20 shadow-[0_8px_32px_rgba(0,0,0,0.4)] transition-all hover:border-gold/60"
              style={{ aspectRatio: img.orientation === "portrait" ? "3 / 4" : "4 / 3" }}
            >
              <img
                src={img.src}
                alt={img.alt}
                loading="lazy"
                className="h-full w-full object-cover transition-all duration-700 group-hover:scale-105"
                style={{ filter: "sepia(0.25) saturate(1.05)" }}
              />
              <div
                className="absolute inset-0 bg-deep/30 opacity-100 transition-opacity duration-500 group-hover:opacity-0"
                style={{
                  background:
                    "linear-gradient(180deg, transparent 50%, oklch(0.18 0.025 40 / 0.7) 100%)",
                }}
              />
            </button>
          ))}
        </div>
      </div>

      {open !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-deep/95 p-4 backdrop-blur-md animate-in fade-in"
          onClick={() => setOpen(null)}
        >
          <button
            onClick={(e) => {
              e.stopPropagation();
              setOpen((o) => (o === null ? null : (o - 1 + images.length) % images.length));
            }}
            className="absolute left-4 z-10 rounded-full border border-gold/40 bg-deep/60 px-4 py-2 text-gold-light backdrop-blur hover:border-gold sm:left-8"
            aria-label="Previous"
          >
            ‹
          </button>
          <img
            src={images[open].src}
            alt={images[open].alt}
            className="max-h-[85vh] max-w-[90vw] rounded-sm object-contain shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
          <button
            onClick={(e) => {
              e.stopPropagation();
              setOpen((o) => (o === null ? null : (o + 1) % images.length));
            }}
            className="absolute right-4 z-10 rounded-full border border-gold/40 bg-deep/60 px-4 py-2 text-gold-light backdrop-blur hover:border-gold sm:right-8"
            aria-label="Next"
          >
            ›
          </button>
          <button
            onClick={() => setOpen(null)}
            className="absolute right-4 top-4 rounded-full border border-gold/40 bg-deep/60 px-3 py-1 text-xs text-gold-light backdrop-blur hover:border-gold sm:right-8 sm:top-8"
          >
            ✕
          </button>
        </div>
      )}
    </section>
  );
}
