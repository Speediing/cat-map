"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { actionsSection, pocCalendar } from "@/content/plan";
import type {
  ActionStat,
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

const updatedFormat = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "short",
  hour: "2-digit",
  minute: "2-digit",
});

function PocCalendar() {
  return (
    <figure className="overflow-hidden rounded-xl border border-hairline bg-paper/80">
      <figcaption className="border-b border-hairline px-5 py-4">
        <p className="text-[11px] uppercase tracking-[0.09em] text-ink-faint">
          {pocCalendar.caption}
        </p>
        <p className="mt-1.5 text-[12.5px] leading-[1.5] text-ink-muted">
          {pocCalendar.note}
        </p>
      </figcaption>
      <ol className="grid sm:grid-cols-2 lg:grid-cols-4">
        {pocCalendar.weeks.map((item, index) => (
          <li
            key={item.week}
            className="border-t border-hairline p-4 first:border-t-0 sm:[&:nth-child(2)]:border-t-0 lg:border-t-0 lg:border-l lg:first:border-l-0"
          >
            <div className="flex items-baseline justify-between gap-3">
              <span className="font-mono text-[10.5px] uppercase tracking-[0.08em] text-orange">
                {item.week}
              </span>
              <span className="font-mono text-[10px] text-ink-faint">
                {String(index + 1).padStart(2, "0")}
              </span>
            </div>
            <h3 className="mt-2 text-[14px] font-medium text-ink">{item.title}</h3>
            <p className="mt-1.5 text-[12.5px] leading-[1.5] text-ink-muted">{item.text}</p>
          </li>
        ))}
      </ol>
    </figure>
  );
}

export function PlanBoard() {
  const router = useRouter();
  const [doc, setDoc] = useState<Doc | null>(null);
  const [failedToLoad, setFailedToLoad] = useState(false);
  const [sync, setSync] = useState<SyncState>("idle");
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

  const syncLabel =
    sync === "saving"
      ? `${actionsSection.savingLabel}…`
      : sync === "error"
        ? actionsSection.errorLabel
        : `${actionsSection.savedLabel} · ${updatedFormat.format(new Date(doc.updatedAt))}`;

  return (
    <div className="space-y-3">
      <PocCalendar />

      <figure className="rounded-xl border border-hairline bg-paper/80 p-5">
        <figcaption className="flex items-center justify-between gap-4 text-[11px] uppercase tracking-[0.09em] text-ink-faint">
          <span>{actionsSection.actionsCaption}</span>
          <span
            className={`font-mono normal-case tracking-normal ${sync === "error" ? "text-orange" : "text-ink-faint"}`}
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
    </div>
  );
}
