import { useEffect, useRef } from "react";
import { prefersReducedMotion } from "../hooks/usePortfolio";
import type { Theme } from "../hooks/usePortfolio";

type Node = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  /** Phase offset so nodes do not pulse in lockstep. */
  phase: number;
};

const LINK_DISTANCE = 148;
const POINTER_RADIUS = 190;

/**
 * Ambient neural-network canvas behind the hero: drifting nodes with edges
 * drawn between near neighbours, plus a pointer-reactive highlight.
 *
 * Cheap by construction — the node count scales with viewport area and is
 * capped, the render loop pauses when the canvas scrolls out of view or the
 * tab is hidden, and it renders nothing at all under reduced-motion.
 */
export default function NeuralField({ theme }: { theme: Theme }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const themeRef = useRef(theme);
  themeRef.current = theme;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || prefersReducedMotion()) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let nodes: Node[] = [];
    let frame = 0;
    let running = true;
    const pointer = { x: -9999, y: -9999, active: false };

    const dpr = () => Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      const ratio = dpr();
      canvas.width = Math.floor(width * ratio);
      canvas.height = Math.floor(height * ratio);
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);

      const target = Math.round(
        Math.min(78, Math.max(26, (width * height) / 15500))
      );
      nodes = Array.from({ length: target }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.22,
        vy: (Math.random() - 0.5) * 0.22,
        r: 1 + Math.random() * 1.7,
        phase: Math.random() * Math.PI * 2,
      }));
    };

    const palette = () => {
      const light = themeRef.current === "light";
      return {
        node: light ? "47, 95, 224" : "150, 180, 255",
        edge: light ? "47, 95, 224" : "120, 160, 255",
        hot: light ? "8, 145, 178" : "34, 211, 238",
        nodeAlpha: light ? 0.5 : 0.72,
        edgeAlpha: light ? 0.2 : 0.3,
      };
    };

    const draw = (time: number) => {
      const colors = palette();
      ctx.clearRect(0, 0, width, height);

      for (const node of nodes) {
        node.x += node.vx;
        node.y += node.vy;

        // Wrap rather than bounce — avoids nodes piling up along the edges.
        if (node.x < -20) node.x = width + 20;
        if (node.x > width + 20) node.x = -20;
        if (node.y < -20) node.y = height + 20;
        if (node.y > height + 20) node.y = -20;
      }

      // Edges first so nodes sit on top of them.
      for (let i = 0; i < nodes.length; i += 1) {
        const a = nodes[i];
        for (let j = i + 1; j < nodes.length; j += 1) {
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const distance = Math.hypot(dx, dy);
          if (distance > LINK_DISTANCE) continue;

          const strength = 1 - distance / LINK_DISTANCE;
          const midX = (a.x + b.x) / 2;
          const midY = (a.y + b.y) / 2;
          const nearPointer =
            pointer.active &&
            Math.hypot(midX - pointer.x, midY - pointer.y) < POINTER_RADIUS;

          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.strokeStyle = nearPointer
            ? `rgba(${colors.hot}, ${strength * 0.55})`
            : `rgba(${colors.edge}, ${strength * colors.edgeAlpha})`;
          ctx.lineWidth = nearPointer ? 1.1 : 0.7;
          ctx.stroke();
        }
      }

      for (const node of nodes) {
        const pulse = 0.72 + Math.sin(time / 1100 + node.phase) * 0.28;
        const nearPointer =
          pointer.active &&
          Math.hypot(node.x - pointer.x, node.y - pointer.y) < POINTER_RADIUS;

        ctx.beginPath();
        ctx.arc(node.x, node.y, node.r * (nearPointer ? 1.7 : 1), 0, Math.PI * 2);
        ctx.fillStyle = nearPointer
          ? `rgba(${colors.hot}, ${Math.min(1, pulse + 0.2)})`
          : `rgba(${colors.node}, ${pulse * colors.nodeAlpha})`;
        ctx.fill();
      }
    };

    const loop = (time: number) => {
      if (!running) return;
      draw(time);
      frame = requestAnimationFrame(loop);
    };

    const start = () => {
      if (running) return;
      running = true;
      frame = requestAnimationFrame(loop);
    };

    const stop = () => {
      running = false;
      if (frame) cancelAnimationFrame(frame);
      frame = 0;
    };

    const onPointerMove = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = event.clientX - rect.left;
      pointer.y = event.clientY - rect.top;
      pointer.active = true;
    };

    const onPointerLeave = () => {
      pointer.active = false;
    };

    const onVisibility = () => (document.hidden ? stop() : start());

    resize();
    frame = requestAnimationFrame(loop);

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);

    // Stop burning frames once the hero has scrolled away.
    const visibility = new IntersectionObserver(
      (entries) => (entries[0]?.isIntersecting ? start() : stop()),
      { threshold: 0 }
    );
    visibility.observe(canvas);

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerleave", onPointerLeave);
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      stop();
      resizeObserver.disconnect();
      visibility.disconnect();
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerleave", onPointerLeave);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full opacity-70"
    />
  );
}
