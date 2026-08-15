"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { actionsSection } from "@/content/plan";
import type {
  ActionStat,
  GanttKind,
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
  gate: "bg-orange/75",
  trial: "bg-ink/75",
  support: "bg-ink/45",
  minestar: "bg-ink/30",
  infra: "bg-ink/20",
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

  const times = doc.gantt.rows
    .flatMap((row) => [parseDate(row.start), parseDate(row.end)])
    .filter((time): time is number => time !== null);
  const axisStart = startOfWeek(Math.min(...times, today));
  const axisEnd = startOfWeek(Math.max(...times, today)) + 7 * DAY_MS;
  const span = axisEnd - axisStart;
  const pct = (time: number) => ((time - axisStart) / span) * 100;
  const ticks: number[] = [];
  for (let tick = axisStart; tick <= axisEnd; tick += 7 * DAY_MS) ticks.push(tick);
  const todayPct = pct(today);

  const syncLabel =
    sync === "saving"
      ? `${actionsSection.savingLabel}…`
      : sync === "error"
        ? actionsSection.errorLabel
        : `${actionsSection.savedLabel} · ${updatedFormat.format(new Date(doc.updatedAt))}`;

  return (
    <div className="space-y-3">
      <figure className="rounded-xl border border-hairline bg-paper/80 p-5">
        <figcaption className="flex flex-wrap items-baseline justify-between gap-2">
          <span className="text-[11px] uppercase tracking-[0.09em] text-ink-faint">
            {actionsSection.actionsCaption}
          </span>
          <span
            className={`font-mono text-[11px] ${sync === "error" ? "text-orange" : "text-ink-faint"}`}
          >
            {syncLabel}
          </span>
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

      <figure className="rounded-xl border border-hairline bg-paper/80 p-5">
        <figcaption className="flex flex-wrap items-baseline justify-between gap-2">
          <span className="text-[11px] uppercase tracking-[0.09em] text-ink-faint">
            {actionsSection.ganttCaption}
          </span>
          <span className="text-[11px] font-medium uppercase tracking-[0.09em] text-orange">
            {actionsSection.ganttBadge}
          </span>
        </figcaption>
        <p className="mt-2 max-w-[44rem] text-[12.5px] leading-[1.5] text-ink-faint">
          {doc.gantt.target}
        </p>
        <div className="nav-scroll -mx-1 overflow-x-auto px-1">
          <div className="mt-4" style={{ minWidth: "58rem" }}>
            <div className="grid grid-cols-[14rem_minmax(0,1fr)_16.5rem] items-center gap-4">
              <div />
              <div className="relative h-5">
                {ticks.map((tick) => (
                  <span
                    key={tick}
                    className="absolute top-0 -translate-x-1/2 font-mono text-[10px] whitespace-nowrap text-ink-faint"
                    style={{ left: `${pct(tick)}%` }}
                  >
                    {tickFormat.format(new Date(tick))}
                  </span>
                ))}
              </div>
              <div />
            </div>
            {doc.gantt.rows.map((row) => {
              const startTime = parseDate(row.start);
              const endTime = parseDate(row.end);
              const hasSpan = startTime !== null && endTime !== null && endTime >= startTime;
              const left = hasSpan ? pct(startTime as number) : 0;
              const width = hasSpan
                ? Math.max(pct((endTime as number) + DAY_MS) - left, 1.25)
                : 0;
              return (
                <div
                  key={row.id}
                  className="grid grid-cols-[14rem_minmax(0,1fr)_16.5rem] items-center gap-4 border-t border-hairline py-2.5"
                >
                  <div>
                    <div className="text-[12.5px] leading-tight font-medium">{row.name}</div>
                    <div className="mt-0.5 font-mono text-[10.5px] text-ink-faint">
                      {row.owner}
                    </div>
                  </div>
                  <div className="relative h-6">
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
                      className="absolute top-0 bottom-0 w-px bg-ink/50"
                      style={{ left: `${todayPct}%` }}
                    />
                    {hasSpan ? (
                      <span
                        className={`absolute top-1/2 h-2.5 -translate-y-1/2 rounded-[3px] ${BAR_STYLES[row.kind]}`}
                        style={{ left: `${left}%`, width: `${width}%` }}
                      />
                    ) : null}
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="date"
                      value={row.start}
                      onChange={(event) => setRow(row.id, { start: event.target.value })}
                      aria-label={`${row.name} start`}
                      className="rounded-md border border-hairline bg-white/70 px-2 py-1 font-mono text-[10.5px] text-ink-muted focus:border-hairline-strong focus:outline-none"
                    />
                    <input
                      type="date"
                      value={row.end}
                      onChange={(event) => setRow(row.id, { end: event.target.value })}
                      aria-label={`${row.name} end`}
                      className="rounded-md border border-hairline bg-white/70 px-2 py-1 font-mono text-[10.5px] text-ink-muted focus:border-hairline-strong focus:outline-none"
                    />
                  </div>
                </div>
              );
            })}
            <div className="flex items-center gap-2 border-t border-hairline pt-2.5">
              <span aria-hidden className="h-3 w-px bg-ink/50" />
              <span className="font-mono text-[10.5px] text-ink-faint">
                {actionsSection.todayLabel}
              </span>
            </div>
          </div>
        </div>
        {doc.storage === "memory" ? (
          <p className="mt-3 font-mono text-[11px] text-ink-faint">
            {actionsSection.memoryLabel}
          </p>
        ) : null}
      </figure>
    </div>
  );
}
