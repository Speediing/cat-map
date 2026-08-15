import { Fragment } from "react";
import { gateSplit, minestarLoop, planPath, stackDiagram, supportFlow } from "@/content/plan";

/**
 * Drawn-with-divs diagrams in the editorial system: hairlines, paper panels,
 * ink nodes, sparse orange. Every label comes from the content module.
 * Panels scroll horizontally on small screens instead of squashing.
 */

function DiagramPanel({
  caption,
  minWidth,
  children,
}: {
  caption: string;
  /** When set, the drawing keeps this width and scrolls sideways on small screens. */
  minWidth?: string;
  children: React.ReactNode;
}) {
  return (
    <figure className="rounded-xl border border-hairline bg-paper/80 p-5">
      <figcaption className="text-[11px] uppercase tracking-[0.09em] text-ink-faint">
        {caption}
      </figcaption>
      {minWidth ? (
        <div className="nav-scroll -mx-1 overflow-x-auto px-1">
          <div className="mt-4" style={{ minWidth }}>
            {children}
          </div>
        </div>
      ) : (
        <div className="mt-4">{children}</div>
      )}
    </figure>
  );
}

function ArrowRight({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 8"
      aria-hidden
      className={`h-2 w-6 shrink-0 text-ink-faint ${className}`}
    >
      <path
        d="M0 4h20m0 0l-3.5-3M20 4l-3.5 3"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
      />
    </svg>
  );
}

function ArrowLeft({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 8"
      aria-hidden
      className={`h-2 w-6 shrink-0 text-ink-faint ${className}`}
    >
      <path
        d="M24 4H4m0 0l3.5-3M4 4l3.5 3"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
      />
    </svg>
  );
}

function Node({
  label,
  sub,
  className = "",
}: {
  label: string;
  sub?: string;
  className?: string;
}) {
  return (
    <div className={`rounded-lg border border-hairline bg-white/70 px-3.5 py-2.5 ${className}`}>
      <div className="text-[13px] leading-tight font-medium">{label}</div>
      {sub ? (
        <div className="mt-1 text-[11px] leading-snug text-ink-faint">{sub}</div>
      ) : null}
    </div>
  );
}

function PathDot({ state }: { state: "now" | "gate" | "later" }) {
  if (state === "now") {
    return <span className="block h-3 w-3 rounded-[3px] bg-orange" />;
  }
  if (state === "gate") {
    return <span className="block h-3 w-3 rounded-[3px] border-[1.5px] border-ink bg-canvas" />;
  }
  return <span className="block h-3 w-3 rounded-[3px] bg-ink/20" />;
}

export function PlanPath() {
  return (
    <DiagramPanel caption={planPath.caption} minWidth="42rem">
      <div className="relative">
        <div className="absolute top-[5px] right-8 left-1 h-[2px] bg-hairline-strong" />
        <div className="relative grid grid-cols-4 gap-6">
          {planPath.stops.map((stop) => (
            <div key={stop.label}>
              <PathDot state={stop.state} />
              <div className="mt-2.5 text-[13px] font-medium">{stop.label}</div>
              <div className="mt-1 max-w-[11.5rem] text-[11.5px] leading-snug text-ink-faint">
                {stop.sub}
              </div>
            </div>
          ))}
        </div>
      </div>
    </DiagramPanel>
  );
}

export function GateSplit() {
  return (
    <DiagramPanel caption={gateSplit.caption} minWidth="38rem">
      <div className="grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] gap-x-5">
        <div>
          <div className="text-[11px] uppercase tracking-[0.09em] text-ink-faint">
            {gateSplit.before.title}
          </div>
          <ul className="mt-3 space-y-2">
            {gateSplit.before.items.map((item) => (
              <li
                key={item}
                className="flex items-center justify-between gap-3 rounded-lg border border-hairline bg-white/70 px-3 py-2 text-[12.5px] text-ink-muted"
              >
                {item}
                <ArrowRight className="w-5" />
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-col items-center gap-2 pt-1">
          <div className="w-[2px] flex-1 bg-hairline-strong" />
          <div className="rounded-[4px] border border-ink/50 bg-canvas px-2 py-1 text-[10.5px] font-medium tracking-[0.08em] uppercase">
            {gateSplit.gateLabel}
          </div>
          <div className="w-[2px] flex-1 bg-hairline-strong" />
        </div>
        <div>
          <div className="text-[11px] uppercase tracking-[0.09em] text-ink-faint">
            {gateSplit.after.title}
          </div>
          <ul className="mt-3 space-y-2">
            {gateSplit.after.items.map((item) => (
              <li
                key={item}
                className="flex items-center gap-3 rounded-lg border border-dashed border-hairline-strong px-3 py-2 text-[12.5px] text-ink-muted"
              >
                <span aria-hidden className="h-1.5 w-1.5 shrink-0 rounded-[1px] bg-ink/40" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </DiagramPanel>
  );
}

export function SupportFlow() {
  return (
    <DiagramPanel caption={supportFlow.caption} minWidth="46rem">
      <div className="flex items-stretch gap-3">
        <Node
          label={supportFlow.intake.label}
          sub={supportFlow.intake.sub}
          className="w-[10.5rem] shrink-0 self-center"
        />
        <ArrowRight className="self-center" />
        <div className="flex-1 rounded-lg border border-hairline bg-white/70 p-3.5">
          <div className="text-[13px] font-medium">{supportFlow.agent.label}</div>
          <div className="mt-2.5 grid grid-cols-2 gap-1.5">
            {supportFlow.agent.chips.map((chip) => (
              <span
                key={chip}
                className="rounded-[5px] border border-hairline bg-panel/50 px-2 py-1 text-[11.5px] text-ink-muted"
              >
                {chip}
              </span>
            ))}
          </div>
        </div>
        <ArrowRight className="self-center" />
        <div className="flex w-[13rem] shrink-0 flex-col justify-center gap-2">
          {supportFlow.outcomes.map((outcome) => (
            <Node key={outcome.label} label={outcome.label} sub={outcome.sub} />
          ))}
        </div>
      </div>
      <div className="mt-4 flex items-center gap-2.5 border-t border-hairline pt-3.5">
        <span className="text-[11px] uppercase tracking-[0.09em] text-ink-faint">
          {supportFlow.ladderCaption}
        </span>
        {supportFlow.ladder.map((step, index) => (
          <Fragment key={step}>
            {index > 0 ? <ArrowRight className="w-5" /> : null}
            <span className="rounded-[5px] border border-hairline bg-panel/50 px-2 py-1 text-[11.5px] text-ink-muted">
              {step}
            </span>
          </Fragment>
        ))}
      </div>
    </DiagramPanel>
  );
}

export function SupportStack() {
  return (
    <DiagramPanel caption={stackDiagram.caption} minWidth="44rem">
      <div className="flex items-stretch gap-2.5">
        {stackDiagram.rungs.map((rung, index) => (
          <Fragment key={rung.name}>
            {index > 0 ? <ArrowRight className="w-5 self-center" /> : null}
            <div
              className={`flex-1 rounded-lg border bg-white/70 p-3.5 ${
                rung.status === "Demoed 13 Aug"
                  ? "border-hairline-strong"
                  : "border-dashed border-hairline-strong"
              }`}
            >
              <div className="flex items-baseline justify-between gap-3">
                <span className="font-mono text-[10px] uppercase tracking-[0.08em] text-ink-faint">
                  {rung.role}
                </span>
                <span
                  className={`font-mono text-[10px] uppercase tracking-[0.08em] ${
                    rung.status === "Demoed 13 Aug" ? "text-ink" : "text-ink-faint"
                  }`}
                >
                  {rung.status}
                </span>
              </div>
              <div className="mt-1.5 text-[13px] leading-tight font-medium">{rung.name}</div>
              <p className="mt-1 text-[11px] leading-snug text-ink-faint">{rung.sub}</p>
            </div>
          </Fragment>
        ))}
      </div>
      <div className="mt-4 flex flex-wrap items-center gap-2.5 border-t border-hairline pt-3.5">
        <span className="text-[11px] uppercase tracking-[0.09em] text-ink-faint">
          {stackDiagram.directionCaption}
        </span>
        {stackDiagram.direction.map((step, index) => (
          <Fragment key={step}>
            {index > 0 ? <ArrowRight className="w-5" /> : null}
            <span className="rounded-[5px] border border-hairline bg-panel/50 px-2 py-1 text-[11.5px] text-ink-muted">
              {step}
            </span>
          </Fragment>
        ))}
        <span className="ml-auto font-mono text-[10.5px] text-ink-faint">
          {stackDiagram.footnote}
        </span>
      </div>
    </DiagramPanel>
  );
}

export function MinestarLoop() {
  return (
    <DiagramPanel caption={minestarLoop.caption} minWidth="46rem">
      <div className="flex items-stretch gap-2.5">
        {minestarLoop.stages.map((stage, index) => (
          <Fragment key={stage.label}>
            {index > 0 ? <ArrowRight className="w-5 self-center" /> : null}
            <Node label={stage.label} sub={stage.sub} className="flex-1" />
          </Fragment>
        ))}
      </div>
      <div className="mt-3 flex items-center gap-3 pl-[22%]">
        <ArrowLeft />
        <div className="h-px flex-1 border-t border-dashed border-hairline-strong" />
        <span className="text-[11px] text-ink-faint">{minestarLoop.loopNote}</span>
        <div className="h-px flex-1 border-t border-dashed border-hairline-strong" />
      </div>
      <div className="mt-5 border-t border-hairline pt-4">
        <div className="text-[11px] uppercase tracking-[0.09em] text-ink-faint">
          {minestarLoop.timelineCaption}
        </div>
        <div className="relative mt-4">
          <div className="absolute top-[5px] right-8 left-1 h-[2px] bg-hairline-strong" />
          <div className="relative grid grid-cols-3 gap-6">
            {minestarLoop.timeline.map((stop, index) => (
              <div key={stop.label}>
                <span
                  className={`block h-3 w-3 rounded-[3px] ${index === 0 ? "bg-ink" : "bg-ink/20"}`}
                />
                <div className="mt-2.5 text-[13px] font-medium">{stop.label}</div>
                <div className="mt-1 max-w-[12rem] text-[11.5px] leading-snug text-ink-faint">
                  {stop.sub}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DiagramPanel>
  );
}
