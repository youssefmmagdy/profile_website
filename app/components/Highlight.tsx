import { useEffect, useState } from "react";
import { PROFILE } from "../data/content";
import type { Dictionary } from "../data/content";
import { useSpotlight } from "../hooks/usePortfolio";
import { ArrowUpRightIcon, PlayIcon, YouTubeIcon } from "./Icons";
import Section from "./Section";

type OEmbed = {
  title: string;
  author_name: string;
  thumbnail_url: string;
};

export default function Highlight({ t }: { t: Dictionary }) {
  const [data, setData] = useState<OEmbed | null>(null);
  const [loading, setLoading] = useState(true);
  const cardRef = useSpotlight<HTMLDivElement>();

  useEffect(() => {
    const controller = new AbortController();

    // oEmbed needs no API key and is stable for public YouTube URLs.
    const endpoint = `https://www.youtube.com/oembed?url=${encodeURIComponent(
      PROFILE.transformersPlaylist
    )}&format=json`;

    fetch(endpoint, { signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error(String(response.status));
        return response.json() as Promise<OEmbed>;
      })
      .then(setData)
      .catch(() => {
        // Fall back to the hand-written copy below; nothing to surface.
      })
      .finally(() => setLoading(false));

    return () => controller.abort();
  }, []);

  return (
    <Section index="05" label={t.youtube.label} title={t.youtube.title}>
      <div
        ref={cardRef}
        data-reveal
        className="panel spotlight overflow-hidden"
      >
        <div className="grid gap-0 md:grid-cols-[minmax(0,22rem)_1fr]">
          <a
            href={PROFILE.transformersPlaylist}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative block aspect-video overflow-hidden bg-raise md:aspect-auto md:h-full"
            aria-label={t.youtube.cta}
          >
            {data?.thumbnail_url ? (
              <img
                src={data.thumbnail_url}
                alt=""
                aria-hidden="true"
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            ) : (
              <div
                className={`h-full w-full ${loading ? "animate-pulse" : ""}`}
                style={{
                  background:
                    "linear-gradient(135deg, var(--c-accent-soft), transparent 70%)",
                }}
              />
            )}

            <span className="absolute inset-0 bg-gradient-to-t from-black/55 to-transparent md:bg-gradient-to-r" />

            <span className="absolute inset-0 flex items-center justify-center">
              <span className="flex h-14 w-14 items-center justify-center rounded-full border border-white/25 bg-black/45 text-white backdrop-blur-md transition-transform duration-500 group-hover:scale-110">
                <PlayIcon className="h-6 w-6" />
              </span>
            </span>
          </a>

          <div className="p-6 sm:p-8">
            <span className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3 py-1 text-[11px] text-dim">
              <YouTubeIcon className="h-3.5 w-3.5 text-red-500" />
              {loading
                ? t.youtube.loading
                : (data?.author_name ?? t.youtube.fallbackAuthor)}
            </span>

            <h3 className="mt-4 text-lg font-semibold leading-snug text-ink sm:text-xl">
              {data?.title ?? t.youtube.cardTitle}
            </h3>

            <p className="mt-3 max-w-lg text-sm leading-relaxed text-dim">
              {t.youtube.description}
            </p>

            <a
              href={PROFILE.transformersPlaylist}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary mt-6"
            >
              {t.youtube.cta}
              <ArrowUpRightIcon />
            </a>
          </div>
        </div>
      </div>
    </Section>
  );
}
