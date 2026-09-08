import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { PROFILE } from "../data/content";
import type { Dictionary, Locale } from "../data/content";
import type { Theme } from "../hooks/usePortfolio";
import {
  ArrowUpRightIcon,
  CornerDownLeftIcon,
  DocumentIcon,
  EmailIcon,
  GitHubIcon,
  LinkedInIcon,
  MoonIcon,
  SearchIcon,
  SunIcon,
  YouTubeIcon,
} from "./Icons";

const SECTION_IDS = [
  "about",
  "experience",
  "skills",
  "projects",
  "contact",
] as const;

type Command = {
  id: string;
  label: string;
  group: string;
  icon: ReactNode;
  hint?: string;
  run: () => void;
};

type Props = {
  t: Dictionary;
  locale: Locale;
  theme: Theme;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onToggleLocale: () => void;
  onToggleTheme: () => void;
};

/**
 * ⌘K / Ctrl+K palette: jump to a section, flip theme or language, or open an
 * external profile. Fully keyboard driven; focus returns to the trigger on
 * close.
 */
export default function CommandPalette({
  t,
  locale,
  theme,
  open,
  onOpenChange,
  onToggleLocale,
  onToggleTheme,
}: Props) {
  const [query, setQuery] = useState("");
  const [cursor, setCursor] = useState(0);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const listRef = useRef<HTMLDivElement | null>(null);
  const restoreFocusRef = useRef<HTMLElement | null>(null);

  const commands = useMemo<Command[]>(() => {
    const close = () => onOpenChange(false);

    const navigation: Command[] = SECTION_IDS.map((id, index) => ({
      id: `nav-${id}`,
      label: t.nav[id],
      group: t.palette.navigation,
      icon: (
        <span className="font-mono text-[0.625rem] text-mute">
          0{index + 1}
        </span>
      ),
      run: () => {
        close();
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      },
    }));

    const actions: Command[] = [
      {
        id: "theme",
        label: t.palette.toggleTheme,
        group: t.palette.actions,
        hint: theme === "dark" ? "Light" : "Dark",
        icon:
          theme === "dark" ? (
            <SunIcon className="size-4" />
          ) : (
            <MoonIcon className="size-4" />
          ),
        run: () => {
          onToggleTheme();
          close();
        },
      },
      {
        id: "language",
        label: t.palette.toggleLanguage,
        group: t.palette.actions,
        hint: locale === "en" ? "DE" : "EN",
        icon: (
          <span className="font-mono text-[0.625rem] text-mute">
            {locale === "en" ? "DE" : "EN"}
          </span>
        ),
        run: () => {
          onToggleLocale();
          close();
        },
      },
      {
        id: "resume",
        label: t.palette.openResume,
        group: t.palette.actions,
        icon: <DocumentIcon className="size-4" />,
        run: () => {
          window.open(PROFILE.resume[locale], "_blank", "noopener");
          close();
        },
      },
      {
        id: "email",
        label: t.palette.sendEmail,
        group: t.palette.actions,
        hint: PROFILE.email,
        icon: <EmailIcon className="size-4" />,
        run: () => {
          window.location.href = `mailto:${PROFILE.email}`;
          close();
        },
      },
    ];

    const links: Command[] = [
      {
        id: "github",
        label: "GitHub",
        group: t.palette.links,
        icon: <GitHubIcon className="size-4" />,
        run: () => {
          window.open(PROFILE.github, "_blank", "noopener");
          close();
        },
      },
      {
        id: "linkedin",
        label: "LinkedIn",
        group: t.palette.links,
        icon: <LinkedInIcon className="size-4" />,
        run: () => {
          window.open(PROFILE.linkedin, "_blank", "noopener");
          close();
        },
      },
      {
        id: "youtube",
        label: "YouTube",
        group: t.palette.links,
        icon: <YouTubeIcon className="size-4" />,
        run: () => {
          window.open(PROFILE.youtube, "_blank", "noopener");
          close();
        },
      },
    ];

    return [...navigation, ...actions, ...links];
  }, [t, theme, locale, onToggleTheme, onToggleLocale, onOpenChange]);

  const results = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) return commands;
    return commands.filter((command) =>
      `${command.label} ${command.group} ${command.hint ?? ""}`
        .toLowerCase()
        .includes(needle)
    );
  }, [commands, query]);

  // Global open shortcut.
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key.toLowerCase() === "k" && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        restoreFocusRef.current = document.activeElement as HTMLElement;
        onOpenChange(true);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onOpenChange]);

  useEffect(() => {
    if (open) {
      setQuery("");
      setCursor(0);
      const id = requestAnimationFrame(() => inputRef.current?.focus());
      const previous = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        cancelAnimationFrame(id);
        document.body.style.overflow = previous;
      };
    }
    restoreFocusRef.current?.focus?.();
  }, [open]);

  useEffect(() => {
    setCursor(0);
  }, [query]);

  // Keep the highlighted row in view as the cursor moves.
  useEffect(() => {
    listRef.current
      ?.querySelector<HTMLElement>(`[data-index="${cursor}"]`)
      ?.scrollIntoView({ block: "nearest" });
  }, [cursor]);

  if (!open) return null;

  const onKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Escape") {
      event.preventDefault();
      onOpenChange(false);
      return;
    }
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setCursor((c) => (results.length ? (c + 1) % results.length : 0));
      return;
    }
    if (event.key === "ArrowUp") {
      event.preventDefault();
      setCursor((c) =>
        results.length ? (c - 1 + results.length) % results.length : 0
      );
      return;
    }
    if (event.key === "Enter") {
      event.preventDefault();
      results[cursor]?.run();
    }
  };

  let lastGroup = "";

  return (
    <div
      className="fixed inset-0 z-[90] flex items-start justify-center px-4 pt-[12vh]"
      role="dialog"
      aria-modal="true"
      aria-label={t.palette.trigger}
      onKeyDown={onKeyDown}
    >
      <div
        className="animate-rise-in absolute inset-0 bg-bg/70 backdrop-blur-md"
        onClick={() => onOpenChange(false)}
      />

      <div className="animate-rise-in relative w-full max-w-lg overflow-hidden rounded-2xl border border-line-strong bg-raise shadow-2xl shadow-black/40">
        <div className="flex items-center gap-3 border-b border-line px-4">
          <SearchIcon className="size-4 shrink-0 text-mute" />
          <input
            ref={inputRef}
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={t.palette.placeholder}
            aria-label={t.palette.placeholder}
            className="w-full bg-transparent py-4 text-sm text-ink outline-none placeholder:text-mute"
          />
          <kbd className="hidden shrink-0 rounded border border-line px-1.5 py-0.5 font-mono text-[0.625rem] text-mute sm:block">
            ESC
          </kbd>
        </div>

        <div ref={listRef} className="max-h-[52vh] overflow-y-auto p-2">
          {results.length === 0 && (
            <p className="px-3 py-8 text-center text-sm text-mute">
              {t.palette.empty}
            </p>
          )}

          {results.map((command, index) => {
            const showGroup = command.group !== lastGroup;
            lastGroup = command.group;

            return (
              <div key={command.id}>
                {showGroup && (
                  <p className="eyebrow px-3 pb-1.5 pt-3">{command.group}</p>
                )}
                <button
                  type="button"
                  data-index={index}
                  onMouseEnter={() => setCursor(index)}
                  onClick={command.run}
                  className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition-colors duration-150 ${
                    index === cursor
                      ? "bg-accent-soft text-ink"
                      : "text-dim hover:text-ink"
                  }`}
                >
                  <span className="grid size-5 shrink-0 place-items-center">
                    {command.icon}
                  </span>
                  <span className="flex-1 truncate">{command.label}</span>
                  {command.hint && (
                    <span className="shrink-0 truncate font-mono text-[0.625rem] text-mute">
                      {command.hint}
                    </span>
                  )}
                  {index === cursor && (
                    <ArrowUpRightIcon className="size-3.5 shrink-0 text-accent" />
                  )}
                </button>
              </div>
            );
          })}
        </div>

        <div className="flex items-center gap-4 border-t border-line px-4 py-2.5 text-[0.6875rem] text-mute">
          <span className="flex items-center gap-1.5">
            <CornerDownLeftIcon className="size-3" />
            {t.palette.hintSelect}
          </span>
          <span className="flex items-center gap-1.5">
            <span className="font-mono">↑↓</span>
            {t.palette.hintNavigate}
          </span>
          <span className="ml-auto flex items-center gap-1.5">
            <span className="font-mono">esc</span>
            {t.palette.hintClose}
          </span>
        </div>
      </div>
    </div>
  );
}
