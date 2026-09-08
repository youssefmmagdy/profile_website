import { SKILL_GROUPS } from "../data/content";
import type { Dictionary, Locale } from "../data/content";
import Section from "./Section";
import { revealDelay } from "../lib/ui";

export default function Skills({
  t,
  locale,
}: {
  t: Dictionary;
  locale: Locale;
}) {
  return (
    <Section
      id="skills"
      index="02"
      label={t.skills.label}
      title={t.skills.title}
      intro={t.skills.intro}
      tinted
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {SKILL_GROUPS.map((group, groupIndex) => (
          <article
            key={group.id}
            data-reveal
            style={revealDelay(groupIndex * 80)}
            className="panel spotlight group p-5 transition-[transform,border-color] duration-500 hover:-translate-y-1 hover:border-line-strong"
          >
            <div className="mb-4 flex items-center gap-2.5">
              <span
                aria-hidden="true"
                className="h-6 w-[3px] rounded-full bg-gradient-to-b from-accent to-cyan"
              />
              <h3 className="text-sm font-semibold tracking-tight text-ink">
                {group[locale]}
              </h3>
              <span className="ml-auto font-mono text-[11px] text-mute">
                {String(group.items.length).padStart(2, "0")}
              </span>
            </div>

            <ul className="flex flex-wrap gap-1.5">
              {group.items.map((item) => (
                <li key={item} className="chip">
                  {item}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </Section>
  );
}
