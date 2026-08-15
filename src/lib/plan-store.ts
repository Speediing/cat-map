import { planSeed } from "@/content/plan";
import type { PlanState, PlanStorage } from "./plan-types";

/**
 * One JSON document, last write wins. Postgres when POSTGRES_URL is set,
 * Vercel KV when its env vars are set, otherwise an in-process store so
 * local development works with zero setup (does not survive a redeploy).
 */

const PG_TABLE_READY = { current: false };
const KV_KEY = "cat-map:plan-state";

function seedState(): PlanState {
  return {
    updatedAt: new Date().toISOString(),
    gantt: {
      target: planSeed.gantt.target,
      rows: planSeed.gantt.rows.map((row) => ({ ...row })),
    },
    actions: planSeed.actions.map((action) => ({ ...action })),
  };
}

function hasPostgres(): boolean {
  return Boolean(process.env.POSTGRES_URL);
}

function hasKv(): boolean {
  return Boolean(process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN);
}

async function ensurePgTable() {
  if (PG_TABLE_READY.current) return;
  const { sql } = await import("@vercel/postgres");
  await sql`
    CREATE TABLE IF NOT EXISTS plan_state (
      id integer PRIMARY KEY,
      doc jsonb NOT NULL,
      updated_at timestamptz NOT NULL DEFAULT now()
    )
  `;
  PG_TABLE_READY.current = true;
}

type MemoryGlobal = typeof globalThis & { __planState?: PlanState };

export async function loadState(): Promise<{ state: PlanState; storage: PlanStorage }> {
  if (hasPostgres()) {
    const { sql } = await import("@vercel/postgres");
    await ensurePgTable();
    const { rows } = await sql`SELECT doc, updated_at FROM plan_state WHERE id = 1`;
    if (rows.length > 0) {
      const doc = rows[0].doc as PlanState;
      return {
        state: { ...doc, updatedAt: new Date(rows[0].updated_at).toISOString() },
        storage: "postgres",
      };
    }
    const seeded = seedState();
    await sql`
      INSERT INTO plan_state (id, doc) VALUES (1, ${JSON.stringify(seeded)}::jsonb)
      ON CONFLICT (id) DO NOTHING
    `;
    return { state: seeded, storage: "postgres" };
  }

  if (hasKv()) {
    const { kv } = await import("@vercel/kv");
    const doc = await kv.get<PlanState>(KV_KEY);
    if (doc) return { state: doc, storage: "kv" };
    const seeded = seedState();
    await kv.set(KV_KEY, seeded);
    return { state: seeded, storage: "kv" };
  }

  const memory = globalThis as MemoryGlobal;
  if (!memory.__planState) memory.__planState = seedState();
  return { state: memory.__planState, storage: "memory" };
}

export async function saveState(
  doc: Omit<PlanState, "updatedAt">,
): Promise<{ state: PlanState; storage: PlanStorage }> {
  const next: PlanState = { ...doc, updatedAt: new Date().toISOString() };

  if (hasPostgres()) {
    const { sql } = await import("@vercel/postgres");
    await ensurePgTable();
    await sql`
      INSERT INTO plan_state (id, doc, updated_at)
      VALUES (1, ${JSON.stringify(next)}::jsonb, now())
      ON CONFLICT (id) DO UPDATE SET doc = EXCLUDED.doc, updated_at = now()
    `;
    return { state: next, storage: "postgres" };
  }

  if (hasKv()) {
    const { kv } = await import("@vercel/kv");
    await kv.set(KV_KEY, next);
    return { state: next, storage: "kv" };
  }

  (globalThis as MemoryGlobal).__planState = next;
  return { state: next, storage: "memory" };
}
