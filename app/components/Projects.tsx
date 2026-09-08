import { useMemo, useState } from "react";
import { PROJECTS } from "../data/content";
import type { Dictionary, Project, ProjectCategory } from "../data/content";
import { useReveal, useSpotlight } from "../hooks/usePortfolio";
import {
  DownloadIcon,
  GitHubIcon,
  PlayIcon,
  SearchIcon,
  SparkIcon,
} from "./Icons";
import Section from "./Section";
import { revealDelay } from "../lib/ui";

type Filter = "all" | ProjectCategory;

const FILTERS: Filter[] = ["all", "ai", "web", "cloud", "systems"];
const PREVIEW_COUNT = 6;
/** Tools beyond this are collapsed into a "+N" chip to keep cards even. */
const TOOL_LIMIT = 6;

function ProjectCard({
  project,
  t,
  index,
}: {
  project: Project;
  t: Dictionary;
  index: number;
}) {
  const ref = useSpotlight<HTMLElement>();
  const primary = project.github ?? project.video;
  const extraTools = project.tools.length - TOOL_LIMIT;

  return (
    <article
      ref={ref}
      data-reveal
      style={revealDelay(Math.min(index, 8) * 60)}
      className="panel spotlight group relative flex flex-col p-5 transition-[transform,border-color] duration-500 hover:-translate-y-1 hover:border-line-strong sm:p-6"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          {project.featured && (
            <span className="mb-2 inline-flex items-center gap-1.5 rounded-full border border-accent/30 bg-accent-soft px-2 py-0.5 font-mono text-[10px] uppercase tracking-widest text-accent">
              <SparkIcon className="h-3 w-3" />
              {t.projects.featured}
            </span>
          )}
          <h3 className="text-[15px] font-semibold leading-snug text-ink transition-colors group-hover:text-accent sm:text-base">
            {primary ? (
              <a href={primary} target="_blank" rel="noopener noreferrer">
                {/* Stretched hit-area so the whole card is clickable. */}
                <span className="absolute inset-0 rounded-[inherit]" />
                {project.title}
              </a>
            ) : (
              project.title
            )}
          </h3>
        </div>

        <div className="relative z-10 flex shrink-0 items-center gap-1">
          {project.download && (
            <a
              href={project.download}
              target="_blank"
              rel="noopener noreferrer"
              download
              aria-label={`${t.projects.download} — ${project.title}`}
              title={t.projects.download}
              className="icon-btn h-8 w-8"
            >
              <DownloadIcon className="h-4 w-4" />
            </a>
          )}
          {project.video && (
            <a
              href={project.video}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${t.projects.watchDemo} — ${project.title}`}
              title={t.projects.watchDemo}
              className="icon-btn h-8 w-8"
            >
              <PlayIcon className="h-4 w-4" />
            </a>
          )}
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${t.projects.viewSource} — ${project.title}`}
              title={t.projects.viewSource}
              className="icon-btn h-8 w-8"
            >
              <GitHubIcon className="h-4 w-4" />
            </a>
          )}
        </div>
      </div>

      <p className="mt-3 line-clamp-5 flex-1 text-[13.5px] leading-relaxed text-dim">
        {project.description}
      </p>

      <ul className="mt-4 flex flex-wrap gap-1.5">
        {project.tools.slice(0, TOOL_LIMIT).map((tool) => (
          <li key={tool} className="chip">
            {tool}
          </li>
        ))}
        {extraTools > 0 && (
          <li className="chip text-mute" title={project.tools.slice(TOOL_LIMIT).join(", ")}>
            +{extraTools}
          </li>
        )}
      </ul>

    </article>
  );
}

export default function Projects({ t }: { t: Dictionary }) {
  const [filter, setFilter] = useState<Filter>("all");
  const [query, setQuery] = useState("");
  const [expanded, setExpanded] = useState(false);

  const matches = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return PROJECTS.filter((project) => {
      if (filter !== "all" && project.category !== filter) return false;
      if (!needle) return true;
      return (
        project.title.toLowerCase().includes(needle) ||
        project.description.toLowerCase().includes(needle) ||
        project.tools.some((tool) => tool.toLowerCase().includes(needle))
      );
    });
  }, [filter, query]);

  const searching = query.trim().length > 0;
  const showAll = expanded || searching;
  const visible = showAll ? matches : matches.slice(0, PREVIEW_COUNT);

  // Re-arm the reveal observer whenever the visible set changes.
  useReveal([filter, query, expanded, visible.length]);

  const counts = useMemo(() => {
    const map = new Map<Filter, number>([["all", PROJECTS.length]]);
    PROJECTS.forEach((project) => {
      map.set(project.category, (map.get(project.category) ?? 0) + 1);
    });
    return map;
  }, []);

  return (
    <Section
      id="projects"
      index="03"
      label={t.projects.label}
      title={t.projects.title}
      intro={t.projects.intro}
    >
      {/* Controls */}
      <div
        data-reveal
        className="mb-8 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between"
      >
        <div className="flex flex-wrap gap-1.5">
          {FILTERS.map((key) => {
            const isActive = filter === key;
            return (
              <button
                key={key}
                type="button"
                onClick={() => {
                  setFilter(key);
                  setExpanded(false);
                }}
                aria-pressed={isActive}
                className={`flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-[13px] font-medium transition-all duration-300 ${
                  isActive
                    ? "border-accent/40 bg-accent-soft text-accent"
                    : "border-line bg-surface text-dim hover:border-line-strong hover:text-ink"
                }`}
              >
                {t.projects.filters[key]}
                <span className="font-mono text-[10px] opacity-60">
                  {counts.get(key) ?? 0}
                </span>
              </button>
            );
          })}
        </div>

        <label className="relative flex items-center lg:w-64">
          <span className="pointer-events-none absolute left-3 text-mute">
            <SearchIcon />
          </span>
          <span className="sr-only">{t.projects.title}</span>
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="PyTorch, RAG, Kubernetes…"
            className="w-full rounded-full border border-line bg-surface py-2 pl-9 pr-3 text-[13px] text-ink outline-none transition-colors placeholder:text-mute focus:border-accent/50"
          />
        </label>
      </div>

      {visible.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {visible.map((project, index) => (
            <ProjectCard
              key={project.title}
              project={project}
              t={t}
              index={index}
            />
          ))}
        </div>
      ) : (
        <p className="panel p-8 text-center text-sm text-dim">
          {t.projects.count(0, PROJECTS.length)}
        </p>
      )}

      <div className="mt-10 flex flex-col items-center gap-3">
        <p className="font-mono text-[11px] tracking-wide text-mute">
          {t.projects.count(visible.length, matches.length)}
        </p>
        {!searching && matches.length > PREVIEW_COUNT && (
          <button
            type="button"
            onClick={() => setExpanded((open) => !open)}
            className="btn btn-ghost"
          >
            {expanded ? t.projects.showLess : t.projects.showAll}
          </button>
        )}
      </div>
    </Section>
  );
}
