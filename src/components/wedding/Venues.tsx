import type { Lang } from "@/data/translations";
import { translations, venues } from "@/data/translations";
import { OrnamentDivider } from "./Ornaments";

interface VenuesProps {
  lang: Lang;
}

export function Venues({ lang }: VenuesProps) {
  const t = translations[lang];
  const fontClass = lang === "gu" ? "font-gujarati" : "font-display";

  return (
    <section className="relative bg-deep px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <OrnamentDivider className="mb-6" />
          <h2 className={`text-gold-gradient mb-3 text-4xl font-light sm:text-6xl ${fontClass}`}>
            {t.venuesTitle}
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {venues.map((v) => {
            const featured = v.featured;
            return (
              <article
                key={v.nameEn}
                className={`group relative flex flex-col overflow-hidden rounded-md border p-6 transition-all hover:-translate-y-1 ${
                  featured
                    ? "border-gold lg:col-span-1 lg:row-span-1"
                    : "border-gold/35"
                }`}
                style={{
                  background: featured
                    ? "linear-gradient(135deg, oklch(0.72 0.13 75 / 0.12), oklch(0.74 0.17 60 / 0.08))"
                    : "oklch(0.72 0.13 75 / 0.06)",
                  boxShadow: featured
                    ? "0 20px 60px -20px oklch(0.72 0.13 75 / 0.4)"
                    : undefined,
                }}
              >
                {featured && (
                  <span
                    className={`mb-3 inline-block w-fit rounded-full border border-gold bg-gold/15 px-3 py-1 font-ornament text-[10px] tracking-[0.25em] text-gold-light ${fontClass}`}
                  >
                    ✦ {t.mainVenueBadge} ✦
                  </span>
                )}
                <h3 className={`mb-2 text-2xl text-gold-light sm:text-3xl ${fontClass}`}>
                  {lang === "gu" ? v.nameGu : v.nameEn}
                </h3>
                <p
                  className={`mb-3 text-sm text-blush ${
                    lang === "gu" ? "font-gujarati" : ""
                  }`}
                >
                  📍 {lang === "gu" ? v.addressGu : v.addressEn}
                </p>
                <p
                  className={`mb-6 flex-1 text-xs italic text-muted-foreground sm:text-sm ${
                    lang === "gu" ? "font-gujarati" : ""
                  }`}
                >
                  {lang === "gu" ? v.eventsGu : v.eventsEn}
                </p>

                <div className="mb-4 aspect-video overflow-hidden rounded-sm border border-gold/20">
                  <iframe
                    title={v.nameEn}
                    src={`https://www.google.com/maps?q=${encodeURIComponent(v.mapsQuery)}&output=embed`}
                    className="h-full w-full"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    style={{ filter: "grayscale(0.4) sepia(0.15)" }}
                  />
                </div>

                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(v.mapsQuery)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center justify-center rounded-sm border border-gold/50 bg-gold/10 px-4 py-2 font-ornament text-[10px] tracking-[0.25em] text-gold-light transition hover:border-gold hover:bg-gold/20 sm:text-xs ${fontClass}`}
                >
                  {t.directionsBtn}
                </a>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
