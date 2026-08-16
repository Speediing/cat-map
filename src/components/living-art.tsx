"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

type LivingArtProps = {
  src: string;
  width: number;
  height: number;
  alt: string;
  priority?: boolean;
  sizes: string;
  className?: string;
  /** Truck drifts low and slow; rocket lifts a touch more. */
  mood?: "truck" | "rocket";
};

/**
 * Watercolor stills with a light WebGL wash and a slow drift.
 * Prefers-reduced-motion shows the plain image.
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

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduce.matches) return;

    const gl = canvas.getContext("webgl", {
      alpha: true,
      antialias: false,
      premultipliedAlpha: true,
      powerPreference: "low-power",
    });
    if (!gl) return;

    const vs = gl.createShader(gl.VERTEX_SHADER);
    const fs = gl.createShader(gl.FRAGMENT_SHADER);
    if (!vs || !fs) return;

    gl.shaderSource(
      vs,
      `
      attribute vec2 aPos;
      varying vec2 vUv;
      void main() {
        vUv = aPos * 0.5 + 0.5;
        gl_Position = vec4(aPos, 0.0, 1.0);
      }
    `,
    );
    gl.shaderSource(
      fs,
      `
      precision mediump float;
      varying vec2 vUv;
      uniform float uTime;
      uniform float uMood;
      void main() {
        vec2 uv = vUv;
        float t = uTime * 0.07;
        // Soft diagonal light sweep, print-room quiet.
        float sweep = sin((uv.x * 1.2 - uv.y * 0.85) * 3.14159 + t) * 0.5 + 0.5;
        sweep = smoothstep(0.25, 0.85, sweep);
        // Faint paper grain from cheap hash.
        float grain = fract(sin(dot(uv * 480.0 + t * 12.0, vec2(12.9898, 78.233))) * 43758.5453);
        float warm = 0.018 + sweep * (uMood > 0.5 ? 0.045 : 0.032);
        vec3 tint = mix(vec3(1.0, 0.97, 0.9), vec3(1.0, 0.99, 0.94), sweep);
        float a = warm + grain * 0.025;
        gl_FragColor = vec4(tint, a);
      }
    `,
    );
    gl.compileShader(vs);
    gl.compileShader(fs);
    if (!gl.getShaderParameter(vs, gl.COMPILE_STATUS) || !gl.getShaderParameter(fs, gl.COMPILE_STATUS)) {
      return;
    }

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return;
    gl.useProgram(program);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(program, "aPos");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    const uTime = gl.getUniformLocation(program, "uTime");
    const uMood = gl.getUniformLocation(program, "uMood");
    gl.uniform1f(uMood, mood === "rocket" ? 1 : 0);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

    let raf = 0;
    let start = 0;
    let visible = true;

    const resize = () => {
      const rect = wrap.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      const w = Math.max(1, Math.floor(rect.width * dpr));
      const h = Math.max(1, Math.floor(rect.height * dpr));
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
        gl.viewport(0, 0, w, h);
      }
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
      },
      { rootMargin: "80px" },
    );
    io.observe(wrap);

    const onReduce = () => {
      cancelAnimationFrame(raf);
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
    };
    reduce.addEventListener("change", onReduce);

    const frame = (now: number) => {
      raf = requestAnimationFrame(frame);
      if (!visible) return;
      if (!start) start = now;
      resize();
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.uniform1f(uTime, (now - start) / 1000);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    };
    raf = requestAnimationFrame(frame);
    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      reduce.removeEventListener("change", onReduce);
      io.disconnect();
      gl.deleteProgram(program);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
      gl.deleteBuffer(buf);
    };
  }, [mood]);

  return (
    <div
      ref={wrapRef}
      className={`living-art living-art--${mood} relative overflow-hidden ${className}`}
    >
      <Image
        src={src}
        width={width}
        height={height}
        alt={alt}
        priority={priority}
        sizes={sizes}
        className="living-art__img h-auto w-full select-none mix-blend-multiply"
      />
      <canvas
        ref={canvasRef}
        aria-hidden
        className="living-art__gl pointer-events-none absolute inset-0 h-full w-full mix-blend-soft-light"
      />
    </div>
  );
}
