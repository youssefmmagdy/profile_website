import { useEffect, useRef } from "react";

/**
 * A two-part pointer: a precise dot that tracks exactly, and a ring that
 * eases behind it and swells over interactive targets. Desktop only — it never
 * mounts for touch/coarse pointers or when reduced motion is requested, and the
 * native cursor is left visible in those cases.
 */
export function Cursor() {
  const dotRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduce) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    document.documentElement.classList.add("has-custom-cursor");

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;
    let scale = 1;
    let targetScale = 1;
    let visible = false;
    let raf = 0;

    const render = () => {
      // Critically-damped-ish follow: fast enough to feel attached, slow
      // enough to read as a separate object.
      ringX += (mouseX - ringX) * 0.16;
      ringY += (mouseY - ringY) * 0.16;
      scale += (targetScale - scale) * 0.14;

      dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
      ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%) scale(${scale})`;

      raf = requestAnimationFrame(render);
    };

    const onMove = (event: PointerEvent) => {
      mouseX = event.clientX;
      mouseY = event.clientY;

      if (!visible) {
        visible = true;
        dot.style.opacity = "1";
        ring.style.opacity = "1";
      }

      const target = event.target as Element | null;
      const interactive = target?.closest(
        "a, button, [role='button'], input, textarea, select, [data-cursor]",
      );
      targetScale = interactive ? 2.1 : 1;
      ring.dataset.active = interactive ? "true" : "false";
    };

    const onLeave = () => {
      visible = false;
      dot.style.opacity = "0";
      ring.style.opacity = "0";
    };

    const onDown = () => (targetScale = 0.82);
    const onUp = () => (targetScale = 1);

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);
    raf = requestAnimationFrame(render);

    return () => {
      document.documentElement.classList.remove("has-custom-cursor");
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[100] hidden size-1.5 rounded-full bg-accent opacity-0 transition-opacity duration-300 md:block"
      />
      <div
        ref={ringRef}
        aria-hidden="true"
        data-active="false"
        className="pointer-events-none fixed left-0 top-0 z-[100] hidden size-8 rounded-full border border-line-strong opacity-0 transition-[opacity,background-color,border-color] duration-300 data-[active=true]:border-accent data-[active=true]:bg-accent/10 md:block"
      />
    </>
  );
}
