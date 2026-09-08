import { revealDelay } from "../lib/ui";

type Props = {
  id?: string;
  index: string;
  label: string;
  title: string;
  intro?: string;
  children: React.ReactNode;
  className?: string;
  /** Adds the subtle raised background used to separate alternating bands. */
  tinted?: boolean;
};

export default function Section({
  id,
  index,
  label,
  title,
  intro,
  children,
  className = "",
  tinted = false,
}: Props) {
  return (
    <section
      id={id}
      className={`relative scroll-mt-24 py-20 sm:py-28 ${
        tinted ? "border-y border-line bg-raise/40" : ""
      } ${className}`}
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <header className="mb-12 sm:mb-16">
          <div className="flex items-center gap-3" data-reveal>
            <span className="font-mono text-xs text-accent">{index}</span>
            <span className="eyebrow">{label}</span>
            <span className="h-px flex-1 bg-gradient-to-r from-line-strong to-transparent" />
          </div>

          <h2
            data-reveal="wipe"
            style={revealDelay(80)}
            className="mt-4 text-[clamp(1.75rem,4.2vw,2.6rem)] font-semibold leading-tight text-ink"
          >
            {title}
          </h2>

          {intro && (
            <p
              data-reveal
              style={revealDelay(160)}
              className="mt-3 max-w-2xl text-[15px] leading-relaxed text-dim"
            >
              {intro}
            </p>
          )}
        </header>

        {children}
      </div>
    </section>
  );
}
