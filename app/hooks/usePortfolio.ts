import { useCallback, useEffect, useRef, useState } from "react";
import type { Locale } from "../data/content";

export type Theme = "dark" | "light";

const THEME_KEY = "ym-theme";
const LOCALE_KEY = "ym-locale";

export function prefersReducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * Theme state. The initial value is applied to <html> by the blocking script
 * in root.tsx, so we read it back from the DOM instead of guessing — that keeps
 * SSR markup and the first client render in agreement.
 */
export function useTheme() {
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    const current = document.documentElement.dataset.theme;
    if (current === "light" || current === "dark") setTheme(current);
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => {
      const next: Theme = prev === "dark" ? "light" : "dark";
      document.documentElement.dataset.theme = next;
      try {
        localStorage.setItem(THEME_KEY, next);
      } catch {
        // Private browsing / blocked storage — the theme still applies for this visit.
      }
      return next;
    });
  }, []);

  return { theme, toggleTheme };
}

/** Locale state, persisted so a returning visitor keeps their language. */
export function useLocale() {
  const [locale, setLocale] = useState<Locale>("en");

  useEffect(() => {
    try {
      const saved = localStorage.getItem(LOCALE_KEY);
      if (saved === "en" || saved === "de") setLocale(saved);
    } catch {
      // Ignore — English is a fine default.
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  const toggleLocale = useCallback(() => {
    setLocale((prev) => {
      const next: Locale = prev === "en" ? "de" : "en";
      try {
        localStorage.setItem(LOCALE_KEY, next);
      } catch {
        // Ignore.
      }
      return next;
    });
  }, []);

  return { locale, toggleLocale };
}

/**
 * Adds `.is-in` to every `[data-reveal]` element once it enters the viewport.
 * Re-runs when `deps` change so nodes added by filtering or "show more" are
 * picked up. Elements are unobserved after revealing — this never runs twice
 * for the same node.
 */
export function useReveal(deps: unknown[] = []) {
  useEffect(() => {
    const nodes = Array.from(
      document.querySelectorAll<HTMLElement>("[data-reveal]:not(.is-in)")
    );
    if (nodes.length === 0) return;

    if (prefersReducedMotion() || !("IntersectionObserver" in window)) {
      nodes.forEach((node) => node.classList.add("is-in"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-in");
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.1 }
    );

    nodes.forEach((node) => observer.observe(node));

    // Safety net: content must never stay invisible because observer callbacks
    // were throttled or never delivered (background tabs, some embedded
    // webviews). This sweep reveals anything on screen the observer missed, and
    // detaches itself as soon as every node has been shown.
    let pending = nodes;
    let frame = 0;

    const sweep = () => {
      frame = 0;
      pending = pending.filter((node) => {
        if (node.classList.contains("is-in")) return false;
        const rect = node.getBoundingClientRect();
        if (rect.top >= window.innerHeight || rect.bottom <= 0) return true;
        node.classList.add("is-in");
        observer.unobserve(node);
        return false;
      });
      if (pending.length === 0) detach();
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(sweep);
    };

    const detach = () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };

    const failsafe = setTimeout(sweep, 1200);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      clearTimeout(failsafe);
      if (frame) cancelAnimationFrame(frame);
      detach();
      observer.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}

/** Which section is currently under the nav bar, for the nav's active pill. */
export function useActiveSection(ids: string[]) {
  const [active, setActive] = useState(ids[0] ?? "");

  useEffect(() => {
    if (!("IntersectionObserver" in window)) return;

    const visible = new Map<string, number>();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) visible.set(entry.target.id, entry.intersectionRatio);
          else visible.delete(entry.target.id);
        });

        // Pick the section occupying the most of the detection band.
        let best = "";
        let bestRatio = 0;
        visible.forEach((ratio, id) => {
          if (ratio > bestRatio) {
            bestRatio = ratio;
            best = id;
          }
        });
        if (best) setActive(best);
      },
      { rootMargin: "-20% 0px -60% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] }
    );

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [ids.join(",")]);

  return active;
}

/** Page scroll progress in the range 0–1, updated on a rAF. */
export function useScrollProgress() {
  const [progress, setProgress] = useState(0);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const y = window.scrollY;
      setProgress(max > 0 ? Math.min(1, Math.max(0, y / max)) : 0);
      setScrolled(y > 12);
    };

    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return { progress, scrolled };
}

/**
 * Typewriter cycling through `words`. Pure string state — no DOM measurement,
 * so it stays cheap and SSR-safe (server renders the first word in full).
 */
export function useTypewriter(words: string[], enabled = true) {
  const [text, setText] = useState(words[0] ?? "");
  const [done, setDone] = useState(true);
  const indexRef = useRef(0);
  const deletingRef = useRef(false);

  useEffect(() => {
    if (!enabled || words.length < 2 || prefersReducedMotion()) return;

    setDone(false);
    let timer: ReturnType<typeof setTimeout>;
    // Drive the animation from a local variable rather than from inside a
    // state updater, so scheduling stays a pure side effect of the tick.
    let shown = words[0] ?? "";
    indexRef.current = 0;
    deletingRef.current = false;

    const tick = () => {
      const word = words[indexRef.current % words.length];
      const deleting = deletingRef.current;

      shown = deleting
        ? word.slice(0, Math.max(0, shown.length - 1))
        : word.slice(0, shown.length + 1);
      setText(shown);

      let wait: number;
      if (!deleting && shown === word) {
        deletingRef.current = true;
        wait = 2100;
      } else if (deleting && shown === "") {
        deletingRef.current = false;
        indexRef.current += 1;
        wait = 320;
      } else {
        wait = deleting ? 34 : 62;
      }

      timer = setTimeout(tick, wait);
    };

    timer = setTimeout(tick, 1400);
    return () => clearTimeout(timer);
  }, [words.join("|"), enabled]);

  return { text, done };
}

/** Counts up to `value` when the returned ref first scrolls into view. */
export function useCountUp(value: number, duration = 1400) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (prefersReducedMotion() || !("IntersectionObserver" in window)) {
      setDisplay(value);
      return;
    }

    let frame = 0;
    let start = 0;
    setDisplay(0);

    const step = (now: number) => {
      if (!start) start = now;
      const t = Math.min(1, (now - start) / duration);
      // easeOutExpo
      const eased = t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
      setDisplay(Math.round(eased * value));
      if (t < 1) frame = requestAnimationFrame(step);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0]?.isIntersecting) return;
        observer.disconnect();
        frame = requestAnimationFrame(step);
      },
      { threshold: 0.4 }
    );

    observer.observe(node);
    return () => {
      observer.disconnect();
      if (frame) cancelAnimationFrame(frame);
    };
  }, [value, duration]);

  return { ref, display };
}

/**
 * Feeds pointer position into `--mx`/`--my` on the element so the CSS
 * `.spotlight` gradient can track the cursor. Writes are rAF-batched.
 */
export function useSpotlight<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node || prefersReducedMotion()) return;
    if (!window.matchMedia("(hover: hover)").matches) return;

    let frame = 0;
    let x = 0;
    let y = 0;

    const apply = () => {
      frame = 0;
      node.style.setProperty("--mx", `${x}px`);
      node.style.setProperty("--my", `${y}px`);
    };

    const onMove = (event: PointerEvent) => {
      const rect = node.getBoundingClientRect();
      x = event.clientX - rect.left;
      y = event.clientY - rect.top;
      if (!frame) frame = requestAnimationFrame(apply);
    };

    node.addEventListener("pointermove", onMove);
    return () => {
      node.removeEventListener("pointermove", onMove);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return ref;
}
