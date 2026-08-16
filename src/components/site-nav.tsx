"use client";

import { useEffect, useState } from "react";
import { LogoLockup } from "@/components/logo-lockup";
import { nav, site } from "@/content/plan";

export function SiteNav() {
  const [active, setActive] = useState<string>(nav[0].id);

  useEffect(() => {
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const marker = window.scrollY + window.innerHeight * 0.28;
        let current: string = nav[0].id;
        for (const item of nav) {
          const el = document.getElementById(item.id);
          if (!el) continue;
          const top = el.getBoundingClientRect().top + window.scrollY;
          if (top <= marker) current = item.id;
        }
        setActive(current);
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <header className="sticky top-0 z-40 border-b border-hairline bg-canvas/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center gap-5 px-6 py-3 sm:px-10">
        <a href="#top" className="shrink-0" aria-label="Caterpillar × SpaceXAI">
          <LogoLockup size="compact" />
        </a>
        <nav className="nav-scroll flex min-w-0 flex-1 items-center justify-start gap-4 overflow-x-auto sm:justify-end sm:gap-6">
          {nav.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={`whitespace-nowrap text-[13px] transition-colors ${
                active === item.id
                  ? "font-medium text-ink"
                  : "text-ink-faint hover:text-ink-muted"
              }`}
            >
              {item.label}
            </a>
          ))}
        </nav>
        <span className="hidden shrink-0 font-mono text-[11px] text-ink-faint lg:block">
          {site.navLabel}
        </span>
      </div>
    </header>
  );
}
