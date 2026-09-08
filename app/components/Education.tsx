import { PROFILE } from "../data/content";
import type { Dictionary, Locale } from "../data/content";
import { useSpotlight } from "../hooks/usePortfolio";
import { ArrowUpRightIcon, DocumentIcon } from "./Icons";
import Section from "./Section";
import { revealDelay } from "../lib/ui";

function Score({
  label,
  value,
  grade,
  accent,
}: {
  label: string;
  value: string;
  grade: string;
  accent: "accent" | "cyan";
}) {
  return (
    <div className="flex-1 rounded-xl border border-line bg-surface p-4 text-center sm:min-w-[8.5rem]">
      <p className="text-[10px] uppercase tracking-[0.14em] text-mute">
        {label}
      </p>
      <p
        className={`mt-2 font-mono text-3xl font-semibold ${
          accent === "accent" ? "text-accent" : "text-cyan"
        }`}
      >
        {value}
      </p>
      <p className="mt-1 text-xs font-medium text-dim">{grade}</p>
    </div>
  );
}

export default function Education({
  t,
  locale,
}: {
  t: Dictionary;
  locale: Locale;
}) {
  const cardRef = useSpotlight<HTMLDivElement>();

  return (
    <Section
      index="04"
      label={t.education.label}
      title={t.education.title}
      tinted
    >
      <div className="grid gap-4 lg:grid-cols-[1.4fr_1fr]">
        <div
          ref={cardRef}
          data-reveal
          className="panel spotlight flex flex-col justify-between gap-6 p-6 sm:p-8"
        >
          <div>
            <span className="chip">{t.education.graduation}</span>
            <h3 className="mt-4 text-xl font-semibold tracking-tight text-ink sm:text-2xl">
              {t.education.university}
            </h3>
            <p className="mt-2 max-w-md text-sm leading-relaxed text-dim">
              {t.education.faculty}
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Score
              label={t.education.germanGpa}
              value={locale === "de" ? "1,6" : "1.6"}
              grade={t.education.grade}
              accent="accent"
            />
            <Score
              label={t.education.usGpa}
              value={locale === "de" ? "3,7" : "3.7"}
              grade={t.education.usGrade}
              accent="cyan"
            />
          </div>
        </div>

        {/* Résumé preview — the PDF's first page, faded into the card. */}
        <a
          href={PROFILE.resume[locale]}
          target="_blank"
          rel="noopener noreferrer"
          data-reveal
          style={revealDelay(120)}
          className="panel spotlight group flex flex-col overflow-hidden transition-[transform,border-color] duration-500 hover:-translate-y-1 hover:border-line-strong"
        >
          <div className="relative h-56 overflow-hidden">
            <img
              src="/image.png"
              alt=""
              aria-hidden="true"
              loading="lazy"
              className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.04]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-raise via-raise/25 to-transparent" />
          </div>

          <div className="flex items-center justify-between gap-3 border-t border-line p-5">
            <div className="min-w-0">
              <p className="eyebrow">{t.education.resumeLabel}</p>
              <p className="mt-1 truncate text-sm font-semibold text-ink">
                {PROFILE.name}
              </p>
            </div>
            <span className="btn btn-primary shrink-0 px-4 py-2 text-[13px]">
              <DocumentIcon className="h-4 w-4" />
              {t.education.resumeCta}
              <ArrowUpRightIcon className="h-3.5 w-3.5" />
            </span>
          </div>
        </a>
      </div>
    </Section>
  );
}
