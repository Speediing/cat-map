import Image from "next/image";

type LogoLockupProps = {
  /** Hero is larger; nav/footer stay compact for the sticky bar. */
  size?: "hero" | "compact";
  className?: string;
};

function Mark({
  src,
  width,
  height,
  alt,
}: {
  src: string;
  width: number;
  height: number;
  alt: string;
}) {
  return (
    <Image
      src={src}
      width={width}
      height={height}
      alt={alt}
      className="select-none"
      style={{ height, width: "auto" }}
      unoptimized
    />
  );
}

function Times({ className }: { className: string }) {
  return (
    <span aria-hidden className={`font-medium leading-none text-ink-faint ${className}`}>
      ×
    </span>
  );
}

/**
 * Responsive lockup:
 * - Hero mobile: CAT short mark + scaled SpaceXAI wordmark (one clean line at 390px)
 * - Hero sm+: full CATERPILLAR wordmark + SpaceXAI wordmark
 * - Compact mobile (nav): CAT mark + SpaceXAI icon so the sticky bar stays slim
 * - Compact sm+: CAT mark + compact SpaceXAI wordmark
 */
export function LogoLockup({ size = "compact", className = "" }: LogoLockupProps) {
  if (size === "hero") {
    return (
      <>
        <span className={`inline-flex items-center gap-2.5 sm:hidden ${className}`}>
          <Mark src="/logos/cat-mark.svg" width={46} height={28} alt="Caterpillar" />
          <Times className="text-[13px]" />
          <Mark src="/logos/spacexai.svg" width={156} height={19} alt="SpaceXAI" />
        </span>
        <span className={`hidden items-center gap-3 sm:inline-flex ${className}`}>
          <Mark src="/logos/cat.svg" width={179} height={32} alt="Caterpillar" />
          <Times className="text-[15px]" />
          <Mark src="/logos/spacexai.svg" width={213} height={26} alt="SpaceXAI" />
        </span>
      </>
    );
  }

  return (
    <>
      <span className={`inline-flex items-center gap-1.5 sm:hidden ${className}`}>
        <Mark src="/logos/cat-mark.svg" width={30} height={18} alt="Caterpillar" />
        <Times className="text-[11px]" />
        <Mark src="/logos/spacexai-icon.svg" width={42} height={16} alt="SpaceXAI" />
      </span>
      <span className={`hidden items-center gap-2 sm:inline-flex ${className}`}>
        <Mark src="/logos/cat-mark.svg" width={33} height={20} alt="Caterpillar" />
        <Times className="text-[12px]" />
        <Mark src="/logos/spacexai.svg" width={140} height={17} alt="SpaceXAI" />
      </span>
    </>
  );
}
