"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type LivingArtProps = {
  src: string;
  width: number;
  height: number;
  alt: string;
  priority?: boolean;
  sizes: string;
  className?: string;
  /** truck: rolls across the frame. rocket: blasts off. */
  mood?: "truck" | "rocket";
};

type Subject = {
  /** Ellipse center / radii in 0–1 image UV (y grows downward, canvas space). */
  cx: number;
  cy: number;
  rx: number;
  ry: number;
};

const TRUCK: Subject = { cx: 0.5, cy: 0.52, rx: 0.4, ry: 0.36 };
const ROCKET: Subject = { cx: 0.295, cy: 0.44, rx: 0.17, ry: 0.42 };

function easeInOut(x: number) {
  return x * x * (3 - 2 * x);
}

function cycle(t: number, dur: number) {
  return (t % dur) / dur;
}

/**
 * Truck rolls left. Rocket launches up.
 * Canvas 2D clips the subject out of the watercolor plate and slides it;
 * the hole is patched from sky/ground strips so the move reads clearly.
 */
export function LivingArt({
  src,
  width,
  height,
  alt,
  priority,
  sizes,
  className = "",
  mood = "truck",
}: LivingArtProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mode, setMode] = useState<"pending" | "canvas" | "css" | "still">(() => {
    if (typeof window === "undefined") return "pending";
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ? "still"
      : "pending";
  });

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduce.matches) return;

    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) {
      setMode("css");
      return;
    }

    let raf = 0;
    let start = 0;
    let visible = true;
    let alive = true;
    let ready = false;
    const img = new window.Image();
    img.decoding = "async";

    const subject = mood === "rocket" ? ROCKET : TRUCK;

    const resize = () => {
      const rect = wrap.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = Math.max(1, Math.floor(rect.width * dpr));
      const h = Math.max(1, Math.floor(rect.height * dpr));
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
      }
      return { w, h };
    };

    const patchHole = (w: number, h: number) => {
      const cx = subject.cx * w;
      const cy = subject.cy * h;
      const rx = subject.rx * w * 1.08;
      const ry = subject.ry * h * 1.08;
      ctx.save();
      ctx.beginPath();
      ctx.ellipse(cx, cy, rx, ry, 0, 0, Math.PI * 2);
      ctx.clip();
      // Sky strip into the upper hole, ground into the lower.
      ctx.drawImage(img, 0, 0, img.naturalWidth, img.naturalHeight * 0.22, 0, 0, w, h * 0.55);
      ctx.drawImage(
        img,
        0,
        img.naturalHeight * 0.72,
        img.naturalWidth,
        img.naturalHeight * 0.28,
        0,
        h * 0.42,
        w,
        h * 0.58,
      );
      // Soft edge: fade the patch so it feels painted, not cut.
      const grad = ctx.createRadialGradient(cx, cy, rx * 0.35, cx, cy, rx);
      grad.addColorStop(0, "rgba(246,244,239,0)");
      grad.addColorStop(1, "rgba(246,244,239,0.18)");
      ctx.fillStyle = grad;
      ctx.fillRect(cx - rx, cy - ry, rx * 2, ry * 2);
      ctx.restore();
    };

    const drawDust = (
      w: number,
      h: number,
      ox: number,
      oy: number,
      strength: number,
      kind: "truck" | "rocket",
    ) => {
      if (strength <= 0.02) return;
      const cx = subject.cx * w + ox;
      const cy = subject.cy * h + oy;
      ctx.save();
      ctx.globalAlpha = Math.min(0.55, strength * 0.65);
      if (kind === "truck") {
        const gx = cx + subject.rx * w * 0.55;
        const gy = cy + subject.ry * h * 0.45;
        const g = ctx.createRadialGradient(gx, gy, 4, gx, gy, subject.rx * w * 0.55);
        g.addColorStop(0, "rgba(170,145,105,0.55)");
        g.addColorStop(1, "rgba(170,145,105,0)");
        ctx.fillStyle = g;
        ctx.fillRect(gx - subject.rx * w, gy - subject.ry * h, subject.rx * w * 2, subject.ry * h * 2);
      } else {
        const gx = cx;
        const gy = cy + subject.ry * h * 0.75;
        const g = ctx.createRadialGradient(gx, gy, 2, gx, gy, subject.rx * w * (1.2 + strength));
        g.addColorStop(0, "rgba(210,200,185,0.7)");
        g.addColorStop(0.45, "rgba(180,165,140,0.35)");
        g.addColorStop(1, "rgba(180,165,140,0)");
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.ellipse(gx, gy, subject.rx * w * (0.9 + strength * 0.8), subject.ry * h * (0.35 + strength * 0.5), 0, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
    };

    const drawSubject = (w: number, h: number, ox: number, oy: number, rot: number) => {
      const cx = subject.cx * w;
      const cy = subject.cy * h;
      const rx = subject.rx * w;
      const ry = subject.ry * h;
      // Pivot near the base so a rocket tilt reads as a launch lean.
      const pivotX = cx;
      const pivotY = cy + ry * 0.85;
      ctx.save();
      ctx.translate(ox, oy);
      ctx.translate(pivotX, pivotY);
      ctx.rotate(rot);
      ctx.translate(-pivotX, -pivotY);
      ctx.beginPath();
      ctx.ellipse(cx, cy, rx, ry, 0, 0, Math.PI * 2);
      ctx.clip();
      ctx.drawImage(img, 0, 0, w, h);
      ctx.restore();
    };

    const frame = (now: number) => {
      if (!alive) return;
      raf = requestAnimationFrame(frame);
      if (!visible || !ready) return;
      if (!start) start = now;
      const { w, h } = resize();
      const t = (now - start) / 1000;

      ctx.setTransform(1, 0, 0, 1, 0, 0);
      // Opaque cream plate so white/gray rocket paint stays visible when it lifts
      // into the pale sky (mix-blend-multiply would wipe it out).
      ctx.fillStyle = "#f6f4ef";
      ctx.fillRect(0, 0, w, h);
      ctx.drawImage(img, 0, 0, w, h);
      patchHole(w, h);

      if (mood === "truck") {
        const c = cycle(t, 5.2);
        const go = easeInOut(Math.min(1, c / 0.5));
        const hold = c > 0.5 && c < 0.78 ? 1 : 0;
        const reset = c > 0.82 ? easeInOut((c - 0.82) / 0.18) : 0;
        const travel = (go * 0.9 + hold * 0.1) * (1 - reset);
        // Roll left: ~18% of frame in the first ~2.5s.
        const ox = -travel * w * 0.2;
        const oy = Math.sin(t * 18) * travel * h * 0.008;
        drawDust(w, h, ox * 0.4, 0, travel, "truck");
        drawSubject(w, h, ox, oy, 0);
        if (reset > 0) {
          ctx.save();
          ctx.globalAlpha = reset;
          ctx.drawImage(img, 0, 0, w, h);
          ctx.restore();
        }
      } else {
        const c = cycle(t, 5.8);
        const launch = easeInOut(Math.min(1, Math.max(0, c / 0.45)));
        const reset = c > 0.84 ? easeInOut((c - 0.84) / 0.16) : 0;
        const liftAmt = (c < 0.84 ? Math.max(launch, c > 0.45 ? 1 : launch) : 1) * (1 - reset);
        // Blast off: clear rise in the first ~2s, hold near the top, then reset.
        const oy = -liftAmt * h * 0.32;
        const ox = liftAmt * w * 0.015;
        const rot = -liftAmt * 0.05;
        drawDust(w, h, 0, oy * 0.2, liftAmt, "rocket");
        drawSubject(w, h, ox, oy, rot);
        if (reset > 0) {
          ctx.save();
          ctx.globalAlpha = reset;
          ctx.drawImage(img, 0, 0, w, h);
          ctx.restore();
        }
      }
    };

    img.onload = () => {
      if (!alive) return;
      ready = true;
      setMode("canvas");
      start = 0;
      raf = requestAnimationFrame(frame);
    };
    img.onerror = () => {
      if (!alive) return;
      setMode("css");
    };
    img.src = src;

    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
      },
      { rootMargin: "140px" },
    );
    io.observe(wrap);

    const onReduce = () => {
      if (reduce.matches) {
        cancelAnimationFrame(raf);
        setMode("still");
      }
    };
    reduce.addEventListener("change", onReduce);

    const cssTimer = window.setTimeout(() => {
      if (alive && !ready) setMode("css");
    }, 400);

    window.addEventListener("resize", resize);

    return () => {
      alive = false;
      cancelAnimationFrame(raf);
      window.clearTimeout(cssTimer);
      window.removeEventListener("resize", resize);
      reduce.removeEventListener("change", onReduce);
      io.disconnect();
    };
  }, [mood, src]);

  const showCss = mode === "css" || mode === "pending";
  const showCanvas = mode === "canvas";

  return (
    <div
      ref={wrapRef}
      className={`living-art living-art--${mood} living-art--${mode} relative overflow-hidden ${className}`}
      style={{ aspectRatio: `${width} / ${height}` }}
    >
      <Image
        src={src}
        width={width}
        height={height}
        alt={alt}
        priority={priority}
        sizes={sizes}
        className={`living-art__img absolute inset-0 h-full w-full select-none object-cover mix-blend-multiply transition-opacity duration-300 ${
          showCanvas ? "opacity-0" : "opacity-100"
        } ${showCss ? "living-art__img--animate" : ""}`}
      />
      <canvas
        ref={canvasRef}
        aria-hidden
        className={`living-art__gl pointer-events-none absolute inset-0 h-full w-full transition-opacity duration-300 ${
          showCanvas ? "opacity-100" : "opacity-0"
        }`}
      />
    </div>
  );
}
