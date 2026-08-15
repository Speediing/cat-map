import { NextRequest, NextResponse } from "next/server";
import { loadState, saveState } from "@/lib/plan-store";
import type {
  ActionSide,
  ActionStat,
  GanttKind,
  GanttRow,
  PlanAction,
  PlanState,
} from "@/lib/plan-types";

/**
 * Live plan state. The proxy requires a valid session for every /api route,
 * so both verbs are private to the working group. Writes are whole-document,
 * last write wins.
 */

export const dynamic = "force-dynamic";

const STATS: ActionStat[] = ["not_started", "in_progress", "done"];
const SIDES: ActionSide[] = ["Caterpillar", "SpaceXAI"];
const KINDS: GanttKind[] = ["gate", "infra", "support", "minestar", "trial"];
const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;

function str(value: unknown, max: number): string | null {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  if (trimmed.length === 0 || trimmed.length > max) return null;
  return trimmed;
}

function sanitize(input: unknown): Omit<PlanState, "updatedAt"> | null {
  if (typeof input !== "object" || input === null) return null;
  const raw = input as Record<string, unknown>;

  const rawGantt = raw.gantt as Record<string, unknown> | undefined;
  const rawRows = Array.isArray(rawGantt?.rows) ? (rawGantt.rows as unknown[]) : null;
  const rawActions = Array.isArray(raw.actions) ? (raw.actions as unknown[]) : null;
  if (!rawGantt || !rawRows || !rawActions) return null;
  if (rawRows.length > 24 || rawActions.length > 48) return null;

  const target = str(rawGantt.target, 240);
  if (!target) return null;

  const rows: GanttRow[] = [];
  for (const entry of rawRows) {
    const row = entry as Record<string, unknown>;
    const id = str(row.id, 64);
    const name = str(row.name, 160);
    const owner = str(row.owner, 120);
    const start = str(row.start, 10);
    const end = str(row.end, 10);
    const kind = row.kind as GanttKind;
    if (!id || !name || !owner || !start || !end) return null;
    if (!ISO_DATE.test(start) || !ISO_DATE.test(end)) return null;
    if (!KINDS.includes(kind)) return null;
    rows.push({ id, name, owner, start, end, kind });
  }

  const actions: PlanAction[] = [];
  for (const entry of rawActions) {
    const action = entry as Record<string, unknown>;
    const id = str(action.id, 64);
    const act = str(action.act, 300);
    const owner = str(action.owner, 120);
    const when = str(action.when, 120);
    const side = action.side as ActionSide;
    const stat = action.stat as ActionStat;
    if (!id || !act || !owner || !when) return null;
    if (!SIDES.includes(side) || !STATS.includes(stat)) return null;
    actions.push({ id, act, side, owner, when, stat });
  }

  return { gantt: { target, rows }, actions };
}

export async function GET() {
  const { state, storage } = await loadState();
  return NextResponse.json({ ...state, storage });
}

export async function PUT(request: NextRequest) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
  const doc = sanitize(body);
  if (!doc) {
    return NextResponse.json({ error: "Invalid plan document" }, { status: 400 });
  }
  const { state, storage } = await saveState(doc);
  return NextResponse.json({ ...state, storage });
}
