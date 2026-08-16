import Image from "next/image";

type LogoLockupProps = {
  /** Hero is larger; nav/footer stay compact for the sticky bar. */
  size?: "hero" | "compact";
  className?: string;
};

const sizes = {
  hero: {
    cat: { src: "/logos/cat.svg", width: 179, height: 32, alt: "Caterpillar" },
    spacexai: {
      src: "/logos/spacexai.svg",
      width: 213,
      height: 26,
      alt: "SpaceXAI",
    },
    gap: "gap-3",
    times: "text-[15px]",
  },
  compact: {
    cat: { src: "/logos/cat-mark.svg", width: 33, height: 20, alt: "Caterpillar" },
    spacexai: {
      src: "/logos/spacexai.svg",
      width: 148,
      height: 18,
      alt: "SpaceXAI",
    },
    gap: "gap-2",
    times: "text-[12px]",
  },
} as const;

export function LogoLockup({ size = "compact", className = "" }: LogoLockupProps) {
  const s = sizes[size];
  return (
    <span className={`inline-flex items-center ${s.gap} ${className}`}>
      <Image
        src={s.cat.src}
        width={s.cat.width}
        height={s.cat.height}
        alt={s.cat.alt}
        className="select-none"
        style={{ height: s.cat.height, width: "auto" }}
        unoptimized
      />
      <span aria-hidden className={`${s.times} font-medium leading-none text-ink-faint`}>
        ×
      </span>
      <Image
        src={s.spacexai.src}
        width={s.spacexai.width}
        height={s.spacexai.height}
        alt={s.spacexai.alt}
        className="select-none"
        style={{ height: s.spacexai.height, width: "auto" }}
        unoptimized
      />
    </span>
  );
}
