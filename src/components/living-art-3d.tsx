"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type {
  BufferGeometry,
  DirectionalLight,
  Group,
  Material,
  Mesh,
  PerspectiveCamera,
  Scene,
  Texture,
  WebGLRenderer,
} from "three";

type LivingArt3DProps = {
  src: string;
  width: number;
  height: number;
  alt: string;
  priority?: boolean;
  sizes: string;
  className?: string;
  /** rocket: launch lift in Y/Z. truck: forward rumble in X. */
  mood?: "truck" | "rocket";
};

function easeInOut(x: number) {
  return x * x * (3 - 2 * x);
}

/**
 * Watercolor jpg as a texture on a lit 3D plane (three.js).
 * Idle perspective + mood motion. Flat still Image when reduced-motion.
 */
export function LivingArt3D({
  src,
  width,
  height,
  alt,
  priority,
  sizes,
  className = "",
  mood = "rocket",
}: LivingArt3DProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mode, setMode] = useState<"pending" | "gl" | "still">(() => {
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

    let alive = true;
    let raf = 0;
    let renderer: WebGLRenderer | null = null;
    let texture: Texture | null = null;
    let geometry: BufferGeometry | null = null;
    let material: Material | null = null;
    let visible = true;
    let pointerX = 0;
    let pointerY = 0;
    let start = 0;
    let onResize: (() => void) | null = null;

    const stopLoop = () => {
      cancelAnimationFrame(raf);
      raf = 0;
    };

    const disposeGl = () => {
      stopLoop();
      if (onResize) {
        window.removeEventListener("resize", onResize);
        onResize = null;
      }
      geometry?.dispose();
      geometry = null;
      material?.dispose();
      material = null;
      texture?.dispose();
      texture = null;
      renderer?.dispose();
      renderer = null;
    };

    const haltToStill = () => {
      alive = false;
      disposeGl();
      setMode("still");
    };

    const onPointer = (e: PointerEvent) => {
      const rect = wrap.getBoundingClientRect();
      pointerX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      pointerY = ((e.clientY - rect.top) / rect.height) * 2 - 1;
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
      },
      { rootMargin: "120px" },
    );
    io.observe(wrap);

    const onReduce = () => {
      if (reduce.matches) haltToStill();
    };
    reduce.addEventListener("change", onReduce);
    wrap.addEventListener("pointermove", onPointer, { passive: true });

    void (async () => {
      try {
        const THREE = await import("three");
        if (!alive || reduce.matches) return;

        const scene: Scene = new THREE.Scene();
        const aspect = width / height;
        const camera: PerspectiveCamera = new THREE.PerspectiveCamera(36, aspect, 0.1, 20);
        camera.position.set(0, 0.02, 2.35);

        renderer = new THREE.WebGLRenderer({
          canvas,
          alpha: true,
          antialias: true,
          powerPreference: "default",
        });
        renderer.setClearColor(0x000000, 0);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
        renderer.outputColorSpace = THREE.SRGBColorSpace;

        const ambient = new THREE.AmbientLight(0xfff6e8, 0.72);
        scene.add(ambient);
        const key: DirectionalLight = new THREE.DirectionalLight(0xfff2dc, 1.15);
        key.position.set(1.6, 1.4, 2.2);
        scene.add(key);
        const fill = new THREE.DirectionalLight(0xdde6ff, 0.35);
        fill.position.set(-1.8, 0.2, 1.2);
        scene.add(fill);

        const loader = new THREE.TextureLoader();
        const loaded = await new Promise<Texture>((resolve, reject) => {
          loader.load(src, resolve, undefined, reject);
        });
        if (!alive || reduce.matches) {
          loaded.dispose();
          disposeGl();
          return;
        }
        texture = loaded;
        texture.colorSpace = THREE.SRGBColorSpace;
        texture.anisotropy = Math.min(8, renderer.capabilities.getMaxAnisotropy());

        const planeH = 1.28;
        geometry = new THREE.PlaneGeometry(aspect * planeH, planeH, 24, 16);
        const pos = geometry.attributes.position;
        for (let i = 0; i < pos.count; i++) {
          const x = pos.getX(i);
          const y = pos.getY(i);
          const curl = (x * x * 0.04 + y * y * 0.025) * (mood === "rocket" ? 1 : 0.7);
          pos.setZ(i, curl);
        }
        pos.needsUpdate = true;
        geometry.computeVertexNormals();

        material = new THREE.MeshStandardMaterial({
          map: texture,
          roughness: 0.88,
          metalness: 0.02,
          side: THREE.FrontSide,
        });

        const mesh: Mesh = new THREE.Mesh(geometry, material);
        const group: Group = new THREE.Group();
        group.add(mesh);
        scene.add(group);

        const restRotX = mood === "rocket" ? 0.11 : 0.1;
        const restRotY = mood === "rocket" ? -0.14 : 0.14;
        group.rotation.x = restRotX;
        group.rotation.y = restRotY;
        if (mood === "rocket") group.position.x = 0.06;

        onResize = () => {
          if (!renderer) return;
          const rect = wrap.getBoundingClientRect();
          const w = Math.max(1, Math.floor(rect.width));
          const h = Math.max(1, Math.floor(rect.height));
          renderer.setSize(w, h, false);
          camera.aspect = w / h;
          camera.updateProjectionMatrix();
        };
        onResize();
        window.addEventListener("resize", onResize);

        if (!alive || reduce.matches) {
          disposeGl();
          return;
        }

        setMode("gl");

        const frame = (now: number) => {
          if (!alive || reduce.matches) return;
          raf = requestAnimationFrame(frame);
          if (!visible || !renderer) return;
          if (!start) start = now;
          const t = (now - start) / 1000;

          const idleY = Math.sin(t * 0.55) * 0.05;
          const idleX = Math.sin(t * 0.4 + 0.8) * 0.03;
          const parY = pointerX * 0.18;
          const parX = -pointerY * 0.1;

          if (mood === "rocket") {
            const c = (t % 6.2) / 6.2;
            const launch = easeInOut(Math.min(1, c / 0.42));
            const hold = c > 0.42 && c < 0.78 ? 1 : 0;
            const reset = c > 0.84 ? easeInOut((c - 0.84) / 0.16) : 0;
            const amt = Math.max(launch, hold) * (1 - reset);

            group.position.y = amt * 0.32;
            group.position.z = amt * 0.2;
            group.rotation.x = restRotX - amt * 0.16 + idleX + parX;
            group.rotation.y = restRotY + idleY + parY;
            group.rotation.z = -amt * 0.05;
          } else {
            const c = (t % 5.4) / 5.4;
            const go = easeInOut(Math.min(1, c / 0.5));
            const hold = c > 0.5 && c < 0.78 ? 1 : 0;
            const reset = c > 0.84 ? easeInOut((c - 0.84) / 0.16) : 0;
            const amt = Math.max(go, hold) * (1 - reset);
            const rumble = amt * Math.sin(t * 22) * 0.012;

            group.position.x = -amt * 0.38;
            group.position.y = rumble;
            group.position.z = amt * 0.18;
            group.rotation.x = restRotX + idleX + parX + rumble * 2;
            group.rotation.y = restRotY + idleY + parY - amt * 0.08;
            group.rotation.z = rumble * 0.8;
          }

          key.position.x = 1.6 + Math.sin(t * 0.35) * 0.35;
          key.position.y = 1.4 + Math.cos(t * 0.28) * 0.2;

          renderer.render(scene, camera);
        };
        raf = requestAnimationFrame(frame);
      } catch {
        if (alive) {
          disposeGl();
          setMode("still");
        } else {
          disposeGl();
        }
      }
    })();

    return () => {
      alive = false;
      reduce.removeEventListener("change", onReduce);
      wrap.removeEventListener("pointermove", onPointer);
      io.disconnect();
      disposeGl();
    };
  }, [height, mood, src, width]);

  const showGl = mode === "gl";

  return (
    <div
      ref={wrapRef}
      className={`relative overflow-hidden ${className}`}
      style={{ aspectRatio: `${width} / ${height}` }}
    >
      <Image
        src={src}
        width={width}
        height={height}
        alt={alt}
        priority={priority}
        sizes={sizes}
        className={`absolute inset-0 h-full w-full select-none object-cover mix-blend-multiply transition-opacity duration-500 ${
          showGl ? "opacity-0" : "opacity-100"
        }`}
      />
      <canvas
        ref={canvasRef}
        aria-hidden
        className={`absolute inset-0 h-full w-full transition-opacity duration-500 ${
          showGl ? "opacity-100" : "opacity-0"
        }`}
      />
    </div>
  );
}
