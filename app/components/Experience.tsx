import type { Dictionary } from "../data/content";
import Section from "./Section";
import { revealDelay } from "../lib/ui";

export default function Experience({ t }: { t: Dictionary }) {
  return (
    <Section
      id="experience"
      index="01"
      label={t.experience.label}
      title={t.experience.title}
    >
      <ol className="relative">
        {/* Spine — hidden on mobile where cards stack flush to the edge. */}
        <span
          aria-hidden="true"
          className="absolute left-[7px] top-2 hidden h-[calc(100%-1rem)] w-px bg-gradient-to-b from-accent/60 via-line-strong to-transparent sm:block"
        />

        {t.experience.experiences.map((item, index) => (
          <li
            key={`${item.company}-${item.period}`}
            data-reveal
            style={revealDelay(index * 110)}
            className="relative pb-8 last:pb-0 sm:pl-10"
          >
            {/* Node on the spine */}
            <span
              aria-hidden="true"
              className="absolute left-0 top-6 hidden h-[15px] w-[15px] items-center justify-center rounded-full border border-line-strong bg-bg sm:flex"
            >
              <span className="h-[5px] w-[5px] rounded-full bg-accent" />
            </span>

            <article className="panel spotlight group p-5 transition-[transform,border-color] duration-500 hover:-translate-y-0.5 hover:border-line-strong sm:p-6">
              <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
                <div className="min-w-0">
                  <h3 className="text-base font-semibold text-ink sm:text-lg">
                    {item.title}
                  </h3>
                  <p className="mt-0.5 text-sm font-medium text-accent">
                    {item.company}
                  </p>
                </div>
                <span className="chip shrink-0 self-start">{item.period}</span>
              </div>

              <p className="mt-3 text-sm leading-relaxed text-dim">
                {item.description}
              </p>
            </article>
          </li>
        ))}
      </ol>
    </Section>
  );
}
