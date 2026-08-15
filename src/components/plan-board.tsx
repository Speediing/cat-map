"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { actionsSection, livePlanPhases } from "@/content/plan";
import type {
  ActionStat,
  GanttKind,
  GanttRow,
  PlanState,
  PlanStorage,
} from "@/lib/plan-types";

/**
 * The live mutual action plan. Reads and writes /api/state (gated by the
 * session cookie), applies edits optimistically, and saves the whole
 * document a moment after the last change. Last write wins.
 */

type Doc = PlanState & { storage: PlanStorage };
type SyncState = "idle" | "saving" | "saved" | "error";

const STATUS_OPTIONS: { key: ActionStat; label: string }[] = [
  { key: "not_started", label: "Not started" },
  { key: "in_progress", label: "In progress" },
  { key: "done", label: "Done" },
];

const DAY_MS = 24 * 60 * 60 * 1000;

const BAR_STYLES: Record<GanttKind, string> = {
  gate: "bg-[#7a3e22] text-white",
  trial: "bg-ink text-canvas",
  support: "bg-[#5a4a28] text-white",
  minestar: "bg-[#2c3d24] text-white",
  infra: "bg-ink/55 text-canvas",
};

function parseDate(value: string): number | null {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return null;
  const time = Date.parse(`${value}T00:00:00Z`);
  return Number.isNaN(time) ? null : time;
}

function startOfWeek(time: number): number {
  const date = new Date(time);
  const day = (date.getUTCDay() + 6) % 7;
  return Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate() - day);
}

function toIsoDate(time: number): string {
  const date = new Date(time);
  const y = date.getUTCFullYear();
  const m = String(date.getUTCMonth() + 1).padStart(2, "0");
  const d = String(date.getUTCDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

const tickFormat = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "short",
  timeZone: "UTC",
});

const updatedFormat = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "short",
  hour: "2-digit",
  minute: "2-digit",
});

function PhasePath() {
  const { phase1, gate, phase2 } = livePlanPhases;
  return (
    <figure className="rounded-xl border border-hairline bg-paper/80 p-5">
      <figcaption className="flex flex-wrap items-baseline justify-between gap-2">
        <span className="text-[11px] uppercase tracking-[0.09em] text-ink-faint">
          {actionsSection.pathCaption}
        </span>
        <span className="rounded-full border border-hairline bg-panel/70 px-2.5 py-0.5 text-[11px] font-medium text-ink-muted">
          {gate.label}
        </span>
      </figcaption>
      <p className="mt-2 text-[12.5px] leading-[1.5] text-ink-faint">
        {actionsSection.pathNote}
      </p>
      <div className="mt-4 grid gap-3 lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] lg:items-stretch">
        <PhaseCard phase={phase1} />
        <div className="flex flex-row items-center gap-2 py-1 lg:flex-col lg:justify-center lg:gap-2 lg:px-1">
          <div className="hidden h-px flex-1 bg-hairline-strong lg:block lg:h-auto lg:w-[2px]" />
          <div className="rounded-[4px] border border-ink/50 bg-canvas px-2 py-1 text-center text-[10.5px] font-medium tracking-[0.08em] uppercase">
            {gate.label}
          </div>
          <ul className="flex flex-wrap gap-1.5 lg:flex-col lg:items-center">
            {gate.items.map((item) => (
              <li
                key={item}
                className="rounded-[5px] border border-dashed border-hairline-strong px-2 py-1 font-mono text-[10px] text-ink-faint"
              >
                {item}
              </li>
            ))}
          </ul>
          <div className="hidden h-px flex-1 bg-hairline-strong lg:block lg:h-auto lg:w-[2px]" />
        </div>
        <PhaseCard phase={phase2} />
      </div>
    </figure>
  );
}

function PhaseCard({
  phase,
}: {
  phase: (typeof livePlanPhases)["phase1"] | (typeof livePlanPhases)["phase2"];
}) {
  return (
    <article className="rounded-xl border border-hairline bg-white/70 p-4 sm:p-5">
      <p className="text-[11px] font-medium uppercase tracking-[0.09em] text-orange">
        {phase.kicker}
      </p>
      <h3 className="mt-1.5 text-[1.15rem] font-medium tracking-[-0.02em]">{phase.title}</h3>
      <p className="mt-1.5 text-[13px] leading-[1.5] text-ink-muted">{phase.when}</p>
      <ul className="mt-3.5 space-y-2">
        {phase.tracks.map((track) => (
          <li
            key={`${track.who}-${track.what}`}
            className="rounded-lg border border-hairline bg-panel/50 px-3 py-2.5"
          >
            <span className="block font-mono text-[10.5px] uppercase tracking-[0.06em] text-ink-faint">
              {track.who}
            </span>
            <span className="mt-0.5 block text-[13.5px] leading-[1.45] text-ink">
              {track.what}
            </span>
          </li>
        ))}
      </ul>
    </article>
  );
}

export function PlanBoard() {
  const router = useRouter();
  const [doc, setDoc] = useState<Doc | null>(null);
  const [failedToLoad, setFailedToLoad] = useState(false);
  const [sync, setSync] = useState<SyncState>("idle");
  const [today] = useState(() => Date.now());
  const saveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/state")
      .then(async (response) => {
        if (response.status === 401) {
          router.push("/login");
          return;
        }
        if (!response.ok) throw new Error("load failed");
        const data = (await response.json()) as Doc;
        if (!cancelled) setDoc(data);
      })
      .catch(() => {
        if (!cancelled) setFailedToLoad(true);
      });
    return () => {
      cancelled = true;
    };
  }, [router]);

  const scheduleSave = useCallback((next: Doc) => {
    setSync("saving");
    if (saveTimer.current) clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(async () => {
      try {
        const response = await fetch("/api/state", {
          method: "PUT",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ gantt: next.gantt, actions: next.actions }),
        });
        if (response.status === 401) {
          router.push("/login");
          return;
        }
        if (!response.ok) throw new Error("save failed");
        const saved = (await response.json()) as Doc;
        setDoc((current) =>
          current
            ? { ...current, updatedAt: saved.updatedAt, storage: saved.storage }
            : current,
        );
        setSync("saved");
      } catch {
        setSync("error");
      }
    }, 600);
  }, [router]);

  const apply = useCallback(
    (next: Doc) => {
      setDoc(next);
      scheduleSave(next);
    },
    [scheduleSave],
  );

  if (failedToLoad) {
    return (
      <div className="rounded-xl border border-hairline bg-paper/80 p-5 text-[13.5px] text-ink-muted">
        The live plan did not load. Refresh to try again.
      </div>
    );
  }

  if (!doc) {
    return (
      <div className="rounded-xl border border-hairline bg-paper/80 p-5 text-[13px] text-ink-faint">
        Loading the live plan…
      </div>
    );
  }

  const setAction = (id: string, patch: Partial<Doc["actions"][number]>) => {
    apply({
      ...doc,
      actions: doc.actions.map((action) =>
        action.id === id ? { ...action, ...patch } : action,
      ),
    });
  };

  const setRow = (id: string, patch: Partial<Doc["gantt"]["rows"][number]>) => {
    apply({
      ...doc,
      gantt: {
        ...doc.gantt,
        rows: doc.gantt.rows.map((row) => (row.id === id ? { ...row, ...patch } : row)),
      },
    });
  };

  const setTarget = (target: string) => {
    apply({
      ...doc,
      gantt: { ...doc.gantt, target },
    });
  };

  const addStep = () => {
    const last = doc.gantt.rows[doc.gantt.rows.length - 1];
    const start = last?.end ?? toIsoDate(startOfWeek(today));
    const endTime = (parseDate(start) ?? today) + 6 * DAY_MS;
    const row: GanttRow = {
      id: `g-${Date.now().toString(36)}`,
      name: "New step",
      owner: "Owner",
      start,
      end: toIsoDate(endTime),
      kind: "infra",
    };
    apply({
      ...doc,
      gantt: { ...doc.gantt, rows: [...doc.gantt.rows, row] },
    });
  };

  const times = doc.gantt.rows
    .flatMap((row) => [parseDate(row.start), parseDate(row.end)])
    .filter((time): time is number => time !== null);
  const axisStart = startOfWeek(Math.min(...times, today));
  let axisEnd = startOfWeek(Math.max(...times, today)) + 7 * DAY_MS;
  const minWeeks = 6;
  while ((axisEnd - axisStart) / (7 * DAY_MS) < minWeeks) {
    axisEnd += 7 * DAY_MS;
  }
  const span = axisEnd - axisStart;
  const pct = (time: number) => ((time - axisStart) / span) * 100;
  const ticks: number[] = [];
  for (let tick = axisStart; tick < axisEnd; tick += 7 * DAY_MS) ticks.push(tick);
  const todayPct = Math.min(Math.max(pct(today), 0), 100);

  const syncLabel =
    sync === "saving"
      ? `${actionsSection.savingLabel}…`
      : sync === "error"
        ? actionsSection.errorLabel
        : `${actionsSection.savedLabel} · ${updatedFormat.format(new Date(doc.updatedAt))}`;

  return (
    <div className="space-y-3">
      <PhasePath />

      <figure className="overflow-hidden rounded-xl border border-hairline bg-paper/80">
        <div className="flex flex-wrap items-end justify-between gap-3 border-b border-hairline px-5 pt-5 pb-4">
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <span className="text-[11px] uppercase tracking-[0.09em] text-ink-faint">
                {actionsSection.ganttCaption}
              </span>
              <span className="text-[11px] font-medium uppercase tracking-[0.09em] text-orange">
                {actionsSection.ganttBadge}
              </span>
            </div>
            <input
              value={doc.gantt.target}
              onChange={(event) => setTarget(event.target.value)}
              aria-label="Working target note"
              className="mt-2 w-full max-w-[44rem] border-b border-transparent bg-transparent text-[13px] leading-[1.5] text-ink-muted focus:border-hairline-strong focus:outline-none"
            />
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <span
              className={`font-mono text-[11px] ${sync === "error" ? "text-orange" : "text-ink-faint"}`}
            >
              {syncLabel}
            </span>
            <button
              type="button"
              onClick={addStep}
              className="rounded-md border border-hairline bg-white/70 px-3 py-1.5 text-[12.5px] font-medium text-ink transition-colors hover:border-hairline-strong"
            >
              {actionsSection.addStepLabel}
            </button>
          </div>
        </div>

        <div className="nav-scroll overflow-x-auto">
          <div style={{ minWidth: `${Math.max(44, ticks.length * 5.5)}rem` }}>
            <div className="grid grid-cols-[minmax(11rem,15rem)_minmax(0,1fr)] border-b border-hairline bg-panel/70">
              <div className="border-r border-hairline px-4 py-3 text-[11px] font-medium uppercase tracking-[0.08em] text-ink-faint">
                {actionsSection.stepLabel}
              </div>
              <div
                className="relative grid"
                style={{ gridTemplateColumns: `repeat(${ticks.length}, minmax(0, 1fr))` }}
              >
                {ticks.map((tick) => (
                  <div
                    key={tick}
                    className="border-l border-hairline px-1 py-3 text-center font-mono text-[10.5px] text-ink-faint first:border-l-0"
                  >
                    {tickFormat.format(new Date(tick))}
                  </div>
                ))}
                <span
                  aria-hidden
                  className="pointer-events-none absolute top-0 bottom-0 z-10 w-px bg-orange"
                  style={{ left: `${todayPct}%` }}
                />
              </div>
            </div>

            {doc.gantt.rows.map((row) => {
              const startTime = parseDate(row.start);
              const endTime = parseDate(row.end);
              const hasSpan = startTime !== null && endTime !== null && endTime >= startTime;
              const left = hasSpan ? pct(startTime as number) : 0;
              const width = hasSpan
                ? Math.max(pct((endTime as number) + DAY_MS) - left, 2.5)
                : 0;
              return (
                <div
                  key={row.id}
                  className="grid grid-cols-[minmax(11rem,15rem)_minmax(0,1fr)] border-t border-hairline first:border-t-0"
                >
                  <div className="border-r border-hairline px-4 py-3">
                    <input
                      value={row.name}
                      onChange={(event) => setRow(row.id, { name: event.target.value })}
                      aria-label={`${row.name} name`}
                      className="w-full border-b border-transparent bg-transparent text-[13px] leading-tight font-medium text-ink focus:border-hairline-strong focus:outline-none"
                    />
                    <input
                      value={row.owner}
                      onChange={(event) => setRow(row.id, { owner: event.target.value })}
                      aria-label={`${row.name} owner`}
                      className="mt-1 w-full border-b border-transparent bg-transparent font-mono text-[11px] text-ink-faint focus:border-hairline-strong focus:outline-none"
                    />
                    <div className="mt-2 flex flex-wrap items-center gap-1.5">
                      <input
                        type="date"
                        value={row.start}
                        onChange={(event) => setRow(row.id, { start: event.target.value })}
                        aria-label={`${row.name} start`}
                        className="rounded-md border border-hairline bg-white/70 px-1.5 py-0.5 font-mono text-[10px] text-ink-muted focus:border-hairline-strong focus:outline-none"
                      />
                      <input
                        type="date"
                        value={row.end}
                        onChange={(event) => setRow(row.id, { end: event.target.value })}
                        aria-label={`${row.name} end`}
                        className="rounded-md border border-hairline bg-white/70 px-1.5 py-0.5 font-mono text-[10px] text-ink-muted focus:border-hairline-strong focus:outline-none"
                      />
                    </div>
                  </div>
                  <div className="relative min-h-[3.25rem]">
                    {ticks.map((tick) => (
                      <span
                        key={tick}
                        aria-hidden
                        className="absolute top-0 bottom-0 w-px bg-hairline"
                        style={{ left: `${pct(tick)}%` }}
                      />
                    ))}
                    <span
                      aria-hidden
                      className="absolute top-0 bottom-0 z-10 w-px bg-orange/80"
                      style={{ left: `${todayPct}%` }}
                    />
                    {hasSpan ? (
                      <span
                        className={`absolute top-1/2 z-[1] flex h-6 -translate-y-1/2 items-center overflow-hidden rounded-md px-2 text-[11px] font-medium whitespace-nowrap ${BAR_STYLES[row.kind]}`}
                        style={{ left: `${left}%`, width: `${width}%` }}
                        title={`${row.name} · ${row.start} to ${row.end}`}
                      >
                        {row.name}
                      </span>
                    ) : null}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex items-center gap-2 border-t border-hairline px-5 py-3">
          <span aria-hidden className="h-3 w-px bg-orange" />
          <span className="font-mono text-[10.5px] text-ink-faint">
            {actionsSection.todayLabel}
          </span>
          {doc.storage === "memory" ? (
            <span className="ml-auto font-mono text-[11px] text-ink-faint">
              {actionsSection.memoryLabel}
            </span>
          ) : null}
        </div>
      </figure>

      <figure className="rounded-xl border border-hairline bg-paper/80 p-5">
        <figcaption className="text-[11px] uppercase tracking-[0.09em] text-ink-faint">
          {actionsSection.actionsCaption}
        </figcaption>
        <div className="nav-scroll -mx-1 overflow-x-auto px-1">
          <ul className="mt-4" style={{ minWidth: "54rem" }}>
            {doc.actions.map((action) => (
              <li
                key={action.id}
                className="grid grid-cols-[13rem_minmax(0,1fr)_6rem_11rem_9.5rem] items-center gap-4 border-b border-hairline py-2.5 first:pt-0 last:border-0"
              >
                <div className="flex overflow-hidden rounded-md border border-hairline">
                  {STATUS_OPTIONS.map((option) => (
                    <button
                      key={option.key}
                      type="button"
                      onClick={() => setAction(action.id, { stat: option.key })}
                      className={`flex-1 px-1.5 py-1 text-[10.5px] whitespace-nowrap transition-colors ${
                        action.stat === option.key
                          ? option.key === "done"
                            ? "bg-ink text-canvas"
                            : option.key === "in_progress"
                              ? "bg-orange/90 text-canvas"
                              : "bg-panel text-ink"
                          : "text-ink-faint hover:text-ink"
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
                <div
                  className={`text-[13.5px] leading-[1.45] ${
                    action.stat === "done" ? "text-ink-faint line-through" : "text-ink"
                  }`}
                >
                  {action.act}
                </div>
                <button
                  type="button"
                  onClick={() =>
                    setAction(action.id, {
                      side: action.side === "Caterpillar" ? "SpaceXAI" : "Caterpillar",
                    })
                  }
                  title="Switch side"
                  className="rounded-[5px] border border-hairline bg-panel/50 px-2 py-1 font-mono text-[10.5px] text-ink-muted transition-colors hover:border-hairline-strong"
                >
                  {action.side}
                </button>
                <input
                  value={action.owner}
                  onChange={(event) => setAction(action.id, { owner: event.target.value })}
                  aria-label="Owner"
                  className="w-full border-b border-transparent bg-transparent font-mono text-[11.5px] text-ink-muted focus:border-hairline-strong focus:outline-none"
                />
                <input
                  value={action.when}
                  onChange={(event) => setAction(action.id, { when: event.target.value })}
                  aria-label="When"
                  className="w-full border-b border-transparent bg-transparent font-mono text-[11.5px] text-ink-faint focus:border-hairline-strong focus:outline-none"
                />
              </li>
            ))}
          </ul>
        </div>
      </figure>
    </div>
  );
}
