import { useEffect, useState } from "react";
import type { Dictionary, Locale } from "../data/content";
import type { Theme } from "../hooks/usePortfolio";
import { useActiveSection, useScrollProgress } from "../hooks/usePortfolio";
import { CloseIcon, MenuIcon, MoonIcon, SearchIcon, SunIcon } from "./Icons";

const SECTION_IDS = ["about", "experience", "skills", "projects", "contact"] as const;

type Props = {
  t: Dictionary;
  locale: Locale;
  theme: Theme;
  onToggleLocale: () => void;
  onToggleTheme: () => void;
  onOpenPalette: () => void;
};

export default function Navbar({
  t,
  locale,
  theme,
  onToggleLocale,
  onToggleTheme,
  onOpenPalette,
}: Props) {
  const [menuOpen, setMenuOpen] = useState(false);
  const { progress, scrolled } = useScrollProgress();
  const active = useActiveSection([...SECTION_IDS]);

  // Lock body scroll while the mobile sheet is open, and let Escape close it.
  useEffect(() => {
    if (!menuOpen) return;

    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  const go = (event: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    event.preventDefault();
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    // Keep the URL shareable without letting the browser jump the scroll.
    history.replaceState(null, "", `#${id}`);
  };

  return (
    <>
      <a
        href="#about"
        onClick={(event) => go(event, "about")}
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:text-white"
      >
        {t.a11y.skipToContent}
      </a>

      <header
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-500 ${
          scrolled
            ? "border-b border-line bg-bg/72 backdrop-blur-xl"
            : "border-b border-transparent bg-transparent"
        }`}
        style={{ height: "var(--nav-h)" }}
      >
        <nav
          aria-label={t.a11y.primaryNav}
          className="mx-auto flex h-full max-w-6xl items-center justify-between gap-4 px-5 sm:px-8"
        >
          <a
            href="#about"
            onClick={(event) => go(event, "about")}
            className="group flex items-center gap-2.5 font-mono text-sm tracking-tight"
          >
            <span className="relative flex h-7 w-7 items-center justify-center rounded-md bg-gradient-to-br from-accent to-cyan text-[11px] font-bold text-white shadow-[0_6px_18px_-8px_var(--c-glow)]">
              YM
            </span>
            <span className="hidden text-ink transition-colors group-hover:text-accent sm:inline">
              youssef<span className="text-mute">.magdy</span>
            </span>
          </a>

          {/* Desktop links — the active pill slides between items. */}
          <div className="hidden items-center gap-1 rounded-full border border-line bg-surface/60 p-1 backdrop-blur-md md:flex">
            {SECTION_IDS.map((id) => {
              const isActive = active === id;
              return (
                <a
                  key={id}
                  href={`#${id}`}
                  onClick={(event) => go(event, id)}
                  aria-current={isActive ? "true" : undefined}
                  className={`relative rounded-full px-3.5 py-1.5 text-[13px] font-medium transition-colors duration-300 ${
                    isActive ? "text-ink" : "text-dim hover:text-ink"
                  }`}
                >
                  {isActive && (
                    <span className="absolute inset-0 rounded-full border border-line-strong bg-accent-soft" />
                  )}
                  <span className="relative">{t.nav[id]}</span>
                </a>
              );
            })}
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onOpenPalette}
              aria-label={t.palette.trigger}
              className="hidden items-center gap-2 rounded-lg border border-line bg-surface py-1.5 pl-2.5 pr-2 text-dim transition-colors hover:border-line-strong hover:text-ink sm:flex"
            >
              <SearchIcon className="h-3.5 w-3.5" />
              <span className="text-[13px]">{t.palette.trigger}</span>
              <kbd className="rounded border border-line px-1.5 py-0.5 font-mono text-[10px] text-mute">
                ⌘K
              </kbd>
            </button>

            <button
              type="button"
              onClick={onToggleLocale}
              aria-label={t.a11y.toggleLanguage}
              className="icon-btn w-auto px-2.5 font-mono text-[11px] font-semibold tracking-widest"
            >
              {locale === "en" ? "DE" : "EN"}
            </button>

            <button
              type="button"
              onClick={onToggleTheme}
              aria-label={t.a11y.toggleTheme}
              className="icon-btn"
            >
              {theme === "dark" ? <SunIcon /> : <MoonIcon />}
            </button>

            <button
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              aria-label={t.a11y.toggleMenu}
              aria-expanded={menuOpen}
              className="icon-btn md:hidden"
            >
              {menuOpen ? <CloseIcon /> : <MenuIcon />}
            </button>
          </div>
        </nav>

        {/* Reading progress, pinned to the bar's bottom edge. */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-px origin-left bg-gradient-to-r from-accent via-cyan to-violet transition-opacity duration-300"
          style={{ transform: `scaleX(${progress})`, opacity: scrolled ? 1 : 0 }}
        />
      </header>

      {/* Mobile sheet */}
      <div
        className={`fixed inset-0 z-40 md:hidden ${
          menuOpen ? "pointer-events-auto" : "pointer-events-none"
        }`}
        aria-hidden={!menuOpen}
      >
        <div
          onClick={() => setMenuOpen(false)}
          className={`absolute inset-0 bg-bg/80 backdrop-blur-xl transition-opacity duration-500 ${
            menuOpen ? "opacity-100" : "opacity-0"
          }`}
        />
        <nav
          aria-label={t.a11y.primaryNav}
          className="relative flex h-full flex-col justify-center gap-1 px-8"
        >
          {SECTION_IDS.map((id, index) => (
            <a
              key={id}
              href={`#${id}`}
              tabIndex={menuOpen ? 0 : -1}
              onClick={(event) => go(event, id)}
              className={`flex items-baseline gap-4 border-b border-line py-4 text-2xl font-medium tracking-tight transition-all duration-500 ${
                menuOpen
                  ? "translate-y-0 opacity-100"
                  : "translate-y-4 opacity-0"
              } ${active === id ? "text-accent" : "text-ink"}`}
              style={{
                transitionDelay: menuOpen ? `${80 + index * 55}ms` : "0ms",
              }}
            >
              <span className="font-mono text-xs text-mute">
                0{index + 1}
              </span>
              {t.nav[id]}
            </a>
          ))}
        </nav>
      </div>
    </>
  );
}
