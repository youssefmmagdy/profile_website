import { MARQUEE_TECH, PROFILE, PROJECTS, ROLES } from "../data/content";
import type { Dictionary, Locale } from "../data/content";
import type { Theme } from "../hooks/usePortfolio";
import { useCountUp, useTypewriter } from "../hooks/usePortfolio";
import {
  ArrowDownIcon,
  ArrowUpRightIcon,
  DocumentIcon,
  GitHubIcon,
  LinkedInIcon,
  YouTubeIcon,
} from "./Icons";
import NeuralField from "./NeuralField";

type Props = {
  t: Dictionary;
  locale: Locale;
  theme: Theme;
};

function Stat({
  value,
  suffix,
  label,
  numeric = true,
}: {
  value: number | string;
  suffix?: string;
  label: string;
  numeric?: boolean;
}) {
  const { ref, display } = useCountUp(numeric ? Number(value) : 0);

  return (
    <div className="flex flex-col gap-1">
      <span className="font-mono text-2xl font-semibold tracking-tight text-ink sm:text-[28px]">
        {numeric ? <span ref={ref}>{display}</span> : value}
        {suffix && <span className="text-accent">{suffix}</span>}
      </span>
      <span className="text-[11px] uppercase tracking-[0.14em] text-mute">
        {label}
      </span>
    </div>
  );
}

export default function Hero({ t, locale, theme }: Props) {
  const { text: role } = useTypewriter(ROLES);

  return (
    <section
      id="about"
      className="bg-noise relative overflow-hidden pt-[calc(var(--nav-h)+2.5rem)] sm:pt-[calc(var(--nav-h)+4rem)]"
    >
      {/* Ambience layers */}
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <div className="bg-grid absolute inset-0" />
        <NeuralField theme={theme} />
        <div
          className="aurora animate-float-slow -left-24 top-[-12%] h-[38rem] w-[38rem]"
          style={{ background: "var(--c-accent)", opacity: 0.16 }}
        />
        <div
          className="aurora animate-float-slow -right-32 top-[18%] h-[32rem] w-[32rem]"
          style={{
            background: "var(--c-violet)",
            opacity: 0.13,
            animationDelay: "-6s",
          }}
        />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-bg" />
      </div>

      <div className="mx-auto max-w-6xl px-5 pb-16 sm:px-8 sm:pb-20">
        <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
          {/* ---------- Copy ---------- */}
          <div className="min-w-0">
            <div
              className="animate-rise-in inline-flex items-center gap-2.5 rounded-full border border-line bg-surface px-3.5 py-1.5 backdrop-blur-md"
              style={{ animationDelay: "60ms" }}
            >
              <span className="live-dot h-1.5 w-1.5 rounded-full bg-emerald-400 text-emerald-400" />
              <span className="font-mono text-[11px] tracking-wide text-dim">
                {t.hero.status}
              </span>
            </div>

            <p
              className="animate-rise-in eyebrow mt-7"
              style={{ animationDelay: "140ms" }}
            >
              {t.hero.intro}
            </p>

            <h1
              className="animate-rise-in gradient-text mt-2 text-[clamp(2.6rem,7.5vw,4.75rem)] font-semibold leading-[1.02]"
              style={{ animationDelay: "200ms" }}
            >
              {PROFILE.name}
            </h1>

            {/* Fixed min-height stops the typewriter from reflowing the page. */}
            <p
              className="animate-rise-in mt-4 flex min-h-[2rem] items-center font-mono text-[15px] text-dim sm:text-base"
              style={{ animationDelay: "260ms" }}
            >
              <span className="mr-2 text-accent">&gt;</span>
              <span className="accent-text font-medium">{role}</span>
              <span
                aria-hidden="true"
                className="animate-caret ml-0.5 inline-block h-[1.1em] w-[2px] translate-y-[0.15em] bg-accent"
              />
            </p>

            <p
              className="animate-rise-in mt-6 max-w-xl text-[15px] leading-relaxed text-dim sm:text-base"
              style={{ animationDelay: "320ms" }}
            >
              {t.hero.description}
            </p>

            <div
              className="animate-rise-in mt-8 flex flex-wrap items-center gap-3"
              style={{ animationDelay: "380ms" }}
            >
              <a href="#projects" className="btn btn-primary">
                {t.hero.viewProjects}
                <ArrowUpRightIcon />
              </a>
              <a href="#contact" className="btn btn-ghost">
                {t.hero.getInTouch}
              </a>
              <a
                href={PROFILE.resume[locale]}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-ghost"
              >
                <DocumentIcon className="h-4 w-4" />
                {t.hero.resume}
              </a>
            </div>

            <div
              className="animate-rise-in mt-8 flex items-center gap-2"
              style={{ animationDelay: "440ms" }}
            >
              <a
                href={PROFILE.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="icon-btn"
              >
                <GitHubIcon />
              </a>
              <a
                href={PROFILE.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="icon-btn"
              >
                <LinkedInIcon />
              </a>
              <a
                href={PROFILE.youtube}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="icon-btn"
              >
                <YouTubeIcon />
              </a>
            </div>
          </div>

          {/* ---------- Portrait + code panel ---------- */}
          <div
            className="animate-rise-in relative mx-auto w-full min-w-0 max-w-sm lg:max-w-none"
            style={{ animationDelay: "300ms" }}
          >
            <div className="relative mx-auto w-fit">
              {/* Conic ring, masked to a thin outline. */}
              <div
                aria-hidden="true"
                className="animate-spin-ring absolute -inset-3 rounded-full opacity-80"
                style={{
                  background:
                    "conic-gradient(from 0deg, transparent 0deg, var(--c-accent) 70deg, var(--c-cyan) 140deg, transparent 210deg, transparent 360deg)",
                  maskImage:
                    "radial-gradient(circle, transparent 61%, #000 63%, #000 68%, transparent 70%)",
                  WebkitMaskImage:
                    "radial-gradient(circle, transparent 61%, #000 63%, #000 68%, transparent 70%)",
                }}
              />
              <div
                aria-hidden="true"
                className="absolute -inset-8 rounded-full blur-2xl"
                style={{ background: "var(--c-accent)", opacity: 0.18 }}
              />
              <div className="relative h-40 w-40 overflow-hidden rounded-full border border-line-strong sm:h-52 sm:w-52">
                <img
                  src="/soora.jpg"
                  alt={`${PROFILE.name} portrait`}
                  width={416}
                  height={416}
                  loading="eager"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>

            {/* A small, honest code panel — what this portfolio is actually about. */}
            <div className="panel mt-8 overflow-hidden p-0">
              <div className="flex items-center gap-2 border-b border-line px-4 py-2.5">
                <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
                <span className="h-2.5 w-2.5 rounded-full bg-amber-400/70" />
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/70" />
                <span className="ml-2 font-mono text-[11px] text-mute">
                  attention.py
                </span>
              </div>
              <pre className="overflow-x-auto px-4 py-4 font-mono text-[11.5px] leading-relaxed text-dim sm:text-xs">
                <code>
                  <span className="text-violet">class</span>{" "}
                  <span className="text-cyan">SelfAttention</span>(nn.Module):
                  {"\n"}
                  {"  "}
                  <span className="text-violet">def</span>{" "}
                  <span className="text-accent">forward</span>(self, x):{"\n"}
                  {"    "}q, k, v = self.qkv(x).chunk(<span className="text-cyan">3</span>, dim=-<span className="text-cyan">1</span>){"\n"}
                  {"    "}att = (q @ k.transpose(-<span className="text-cyan">2</span>, -<span className="text-cyan">1</span>)) * self.scale{"\n"}
                  {"    "}
                  <span className="text-violet">return</span> att.softmax(dim=-
                  <span className="text-cyan">1</span>) @ v
                </code>
              </pre>
            </div>
          </div>
        </div>

        {/* ---------- Stats ---------- */}
        <div
          className="animate-rise-in mt-14 grid grid-cols-2 gap-6 border-t border-line pt-8 sm:grid-cols-4 sm:gap-4"
          style={{ animationDelay: "520ms" }}
        >
          <Stat
            value={PROJECTS.length}
            suffix="+"
            label={t.stats.projects}
          />
          <Stat value={locale === "de" ? "1,6" : "1.6"} label={t.stats.gpa} numeric={false} />
          <Stat value={3} label={t.stats.roles} />
          <Stat value="2026" label={t.stats.graduation} numeric={false} />
        </div>
      </div>

      {/* ---------- Tech marquee ---------- */}
      <div className="marquee-mask relative overflow-hidden border-y border-line bg-surface/40 py-3.5">
        <div className="animate-marquee flex w-max gap-3">
          {[...MARQUEE_TECH, ...MARQUEE_TECH].map((tech, index) => (
            <span
              key={`${tech}-${index}`}
              aria-hidden={index >= MARQUEE_TECH.length}
              className="flex items-center gap-3 whitespace-nowrap font-mono text-xs text-mute"
            >
              {tech}
              <span className="text-accent/50">/</span>
            </span>
          ))}
        </div>
      </div>

      <a
        href="#experience"
        className="mx-auto mt-10 flex w-fit flex-col items-center gap-2 text-mute transition-colors hover:text-accent"
      >
        <span className="eyebrow">{t.hero.scroll}</span>
        <ArrowDownIcon className="h-4 w-4 animate-bounce" />
      </a>
    </section>
  );
}
