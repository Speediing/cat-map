/** Shared shape for the live action plan, mirroring the old site's API. */

export type ActionStat = "not_started" | "in_progress" | "done";
export type ActionSide = "Caterpillar" | "SpaceXAI";
export type GanttKind = "gate" | "infra" | "support" | "minestar" | "trial";

export type PlanAction = {
  id: string;
  act: string;
  side: ActionSide;
  owner: string;
  when: string;
  stat: ActionStat;
};

export type GanttRow = {
  id: string;
  name: string;
  owner: string;
  /** ISO date, yyyy-mm-dd */
  start: string;
  /** ISO date, yyyy-mm-dd, inclusive */
  end: string;
  kind: GanttKind;
};

export type PlanState = {
  updatedAt: string;
  gantt: {
    target: string;
    rows: GanttRow[];
  };
  actions: PlanAction[];
};

export type PlanStorage = "postgres" | "kv" | "memory";
