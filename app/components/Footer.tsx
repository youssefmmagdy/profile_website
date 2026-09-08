import { PROFILE } from "../data/content";
import type { Dictionary } from "../data/content";
import { ArrowUpIcon } from "./Icons";

export default function Footer({ t }: { t: Dictionary }) {
  const toTop = () =>
    window.scrollTo({
      top: 0,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "auto"
        : "smooth",
    });

  return (
    <footer className="border-t border-line py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-5 px-5 sm:flex-row sm:px-8">
        <div className="text-center sm:text-left">
          <p className="text-sm text-dim">
            © {new Date().getFullYear()} {PROFILE.name}. {t.footer.rights}
          </p>
          <p className="mt-1 font-mono text-[11px] text-mute">
            {t.footer.built}
          </p>
        </div>

        <button
          type="button"
          onClick={toTop}
          className="group flex items-center gap-2 rounded-full border border-line bg-surface px-4 py-2 text-[13px] text-dim transition-all duration-300 hover:border-line-strong hover:text-ink"
        >
          {t.a11y.backToTop}
          <ArrowUpIcon className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5" />
        </button>
      </div>
    </footer>
  );
}
