/**
 * All copy for the leave-behind lives here, including diagram labels.
 * Edit this file to change what the page says; layout stays put.
 *
 * Sourced from three call transcripts: 11 August 2026 (Richard Green),
 * 13 August 2026 (demo: Swaran Unni, Sai Praveen, Ritesh Gupta), and
 * 14 August 2026 (Dhamu Sankaran, Dustin Ziegler, Andy Lofgreen).
 * No numbers, dates, or claims beyond what was said on those calls.
 * Cat-said and SpaceXAI-pitched are labeled as such in the copy.
 */

export type NextStep = {
  owner: string;
  what: string;
  when: string;
};

export type Beat = {
  /** Optional bolded lead-in, e.g. "Use the window." */
  lead?: string;
  text: string;
};

export const site = {
  title: "Caterpillar × SpaceXAI",
  description:
    "The pilot plan for Caterpillar and SpaceXAI: a 30-day trial across a product support agent framework and MineStar modernization, with owners, gates, and dates.",
  wordmark: { left: "Caterpillar", right: "SpaceXAI" },
  navLabel: "Private · August 2026",
};

export const nav = [
  { id: "plan", label: "The plan" },
  { id: "pilot", label: "The pilot" },
  { id: "support", label: "Support" },
  { id: "stack", label: "The stack" },
  { id: "minestar", label: "MineStar" },
  { id: "actions", label: "Actions" },
] as const;

export const hero = {
  kicker: "The pilot plan · August 2026",
  title: "Support first. Then MineStar.",
  standfirst:
    "Caterpillar named the use cases and the order. SpaceXAI funds a 30-day trial across both, every model, every participant, no cost to Caterpillar. Paper, infrastructure, and the Cat Cloud question move in parallel so nothing waits twice. The trial ends with a verdict and a number: does this hold up on real work, and what does it cost to run.",
  meta: "Compiled from the working sessions of 11, 13, and 14 August 2026.",
  art: {
    src: "/hero-truck.jpg",
    width: 1536,
    height: 1024,
    alt: "Watercolor painting of a mining haul truck",
  },
};

/** Glance path diagram: the plan as a line. */
export const planPath = {
  caption: "The path",
  stops: [
    {
      state: "now" as "now" | "gate" | "later",
      label: "Now",
      sub: "Paper with legal, infrastructure in parallel",
    },
    {
      state: "gate" as "now" | "gate" | "later",
      label: "Signature",
      sub: "Trial agreement, terms, success criteria",
    },
    {
      state: "later" as "now" | "gate" | "later",
      label: "30-day trial",
      sub: "SpaceXAI-funded, all models, everyone in",
    },
    {
      state: "later" as "now" | "gate" | "later",
      label: "The verdict",
      sub: "Viability, plus a real spend baseline",
    },
  ],
};

export const glance = {
  id: "plan",
  kicker: "At a glance",
  clocks: [
    {
      value: "30 days",
      label: "The trial",
      body: "SpaceXAI-funded. All models, all participants, no cost to Caterpillar. The output is a viability verdict and a real token-spend baseline.",
    },
    {
      value: "A couple of weeks",
      label: "The gate",
      body: "A trial evaluation agreement with terms and success criteria, beyond the signed NDA. Cat policy allows no click-through, so nothing downloads before signature.",
    },
    {
      value: "Open",
      label: "Cat Cloud vs SaaS",
      body: "Sai's rule: LLMs and agent APIs stay inside the Cat firewall, vendors deploy into Cat Cloud. SpaceXAI is mostly SaaS. An architecture deep dive with Cat IT settles it.",
    },
  ],
  lanes: [
    {
      label: "Priority 1",
      tag: "Starts first" as string | null,
      title: "Product support",
      body: "Ritesh's frame: do not hire another thousand engineers as MineStar's time to market speeds up. Agents start the moment a ticket hits Salesforce, atoms first, then molecules.",
      owner: "Swaran Unni + Ritesh Gupta",
      clock: "Director session Tue or Wed",
    },
    {
      label: "Priority 2",
      tag: null as string | null,
      title: "MineStar modernization",
      body: "A 20-year monolith, two to two and a half million lines, moving to microservices. Richard's team is on it with in-house agents 400 people use. The ask: faster, at lower cost.",
      owner: "Richard Green's team",
      clock: "Deep dive in September · GA end of 2027",
    },
  ],
  gate: {
    held: {
      title: "Holds until signature",
      items: [
        "Downloads and installs on Caterpillar machines",
        "SSO go-live and Cat-email sign-ins",
        "The 30-day clock itself. It starts at signature, not before.",
      ],
    },
    moving: {
      title: "Moving now, in parallel",
      items: [
        { what: "Trial paper plus sourcing-director check on Cat policy", owner: "Joe Masello" },
        { what: "Architecture and security deep dive with Cat IT", owner: "Sai Praveen" },
        { what: "Infrastructure readiness call with Brian Rossi", owner: "Dustin + Dhamu" },
        { what: "Prioritized support problem list, small pieces first", owner: "Swaran Unni" },
        { what: "SpaceXAI access and credits for Swaran and Sai", owner: "Jason Wiker" },
        { what: "September MineStar roadmap deep dive", owner: "Ritesh Gupta" },
        { what: "How-it-works and funding writeup for Richard", owner: "Joe Masello" },
      ],
    },
  },
};

/** Pilot split diagram: what the signature gates vs what moves now. */
export const gateSplit = {
  caption: "The gate, drawn",
  before: {
    title: "Moving now, in parallel",
    items: [
      "Trial paper and sourcing check",
      "Rossi infrastructure call",
      "Cat IT architecture deep dive",
      "Support problem list",
      "Access for Swaran and Sai",
    ],
  },
  gateLabel: "Signature",
  after: {
    title: "After signature",
    items: [
      "Downloads and installs",
      "SSO go-live and sign-ins",
      "The 30-day clock starts",
    ],
  },
};

export const pilot = {
  id: "pilot",
  kicker: "The pilot",
  title: "The 30-day trial.",
  lede: "Not a demo, not a workshop. Your code, the tools you already run, and the numbers your budget cycle needs.",
  problem: [
    "Caterpillar cannot take this on impressions. Richard's engineers already run an in-house family of agents that more than 400 people use, built since last October, plus Copilot-based agents and Microsoft 365 Copilot Studio on the support side. The live question is build versus buy: is SpaceXAI faster and cheaper than what is already working?",
    "Procurement sets the tempo. Cat policy allows no click-through agreements, so nothing downloads until a trial evaluation agreement is signed, and legal is the bottleneck, a couple of weeks. Sai wants terms and success criteria in that paper, not just the NDA. Budgets run on a calendar year, Caterpillar is already looking at 2027, and the trial has to produce numbers a CFO can plan with. Richard's phrase: a justify-your-existence discussion.",
    "And architecture is a live question, not a detail. Sai's rule today: every LLM and agent API stays inside the Caterpillar firewall, nothing goes out, and vendors deploy into Cat Cloud, Copilot included. SpaceXAI is mostly SaaS. That has to get settled, not assumed.",
  ],
  solution: [
    {
      lead: "Use the window.",
      text: "While the paper works through legal, everything else moves. Joe is on with Richard and the sourcing director about the pilot and Cat policy; per Joe, the approvals that matter are Richard's and Jamie's. Dhamu and Dustin are setting the infrastructure readiness call with Brian Rossi. The NDA is signed and folds into the MSA later; the MSA runs behind the trial without gating it, and Joe is checking whether existing Starlink paper can carry big parts of it.",
    },
    {
      lead: "Where it runs is still open.",
      text: "Sai's deep dive with Cat IT is the venue: architecture, components, security diagrams. Our side of the table: SpaceXAI is mostly SaaS with little to deploy, no Cat team is on the platform yet (the first are about to start), and the real decision is where agents execute, hosted by SpaceXAI with a tunnel back or inside Caterpillar infrastructure. Sai's IP guardrails make the tunnel the hard option, and Swaran flags that reaching Salesforce, internal databases, and Snowflake takes the most time if the platform sits outside Cat Cloud. Dhamu's frame is minimum effort to start: the Cursor desktop is close to zero (sign in with a Cat email, downloads gated behind SSO rather than the public internet), and cloud is the open security question. The plan does not assume the answer.",
    },
    {
      lead: "Cat builds, SpaceXAI supplies.",
      text: "Ritesh set the ownership rule and Swaran asked for it straight: SpaceXAI provides the platform and stays in lockstep; Caterpillar's AI team and engineers build the agents. The pilot is Caterpillar gaining the experience, not shipping the work off.",
    },
    {
      lead: "Compare in the open.",
      text: "A working session, not a one-or-two-day workshop, on Dhamu's terms: SpaceXAI against GitHub Copilot, Claude Code, and Codex, with benchmark material we bring and the evaluation metrics agreed up front, ROI and return on spend. We also want to see how your teams use their tools today, because some of what we would show, Grok Bot above all, does not map feature for feature.",
    },
    {
      lead: "Measure what matters.",
      text: "All token costs on us, across every model and participant, and these pilots typically run with thousands of people. The point of covering cost is seeing how teams work when money is not the constraint. The output is a viability verdict and a real consumption baseline, the number that turns a placeholder budget line into a plan.",
    },
    {
      lead: "Keep help close.",
      text: "Enablement up front, working sessions on your use cases during, and Jason, Brian, and Joe on call ad hoc throughout, with a shared Slack channel if that is easier. A recurring cadence starts next week.",
    },
  ] satisfies Beat[],
  constraintsLabel: "The trial runs under two constraints",
  constraints: [
    {
      title: "Build vs buy can be hybrid",
      body: "Richard asked whether SpaceXAI can integrate the agents his team built on Copilot; Swaran asked whether the Python automations and Copilot Studio agents can migrate over outright. The answer to both: mix and match, and migrate gradually, nothing thrown out overnight.",
    },
    {
      title: "Cost has to be governable",
      body: "After the pilot, licensing is a pool of funds in the enterprise agreement that teams draw from, with controls down to the individual: which models, how much per month. Caterpillar can put placeholders into 2027 planning before a deal is signed; the baseline makes them real.",
    },
  ],
  nextSteps: [
    {
      owner: "Joe Masello",
      what: "Send the trial paper with terms and success criteria; clear Cat policy with the sourcing director.",
      when: "Now",
    },
    {
      owner: "Sai Praveen",
      what: "Set the architecture and security deep dive with Cat IT and SpaceXAI.",
      when: "Now",
    },
    {
      owner: "Dustin Ziegler, Dhamu Sankaran",
      what: "Hold the infrastructure readiness call with Brian Rossi: network plus SSO.",
      when: "In parallel with legal",
    },
    {
      owner: "Jason Wiker",
      what: "Set up SpaceXAI access and credits for Swaran and Sai: the Cursor desktop and Grok Bot.",
      when: "Now",
    },
    {
      owner: "Jason Wiker",
      what: "Share benchmark and ROI material ahead of the working session.",
      when: "Before the session",
    },
    {
      owner: "Joe Masello",
      what: "Send Richard's how-it-works and funding writeup, and Swaran's support case studies.",
      when: "Now",
    },
    {
      owner: "Joe Masello",
      what: "Check existing Starlink paper as a base for the MSA.",
      when: "Now",
    },
  ] satisfies NextStep[],
};

/** Support flow diagram: the pipeline Caterpillar sketched. */
export const supportFlow = {
  caption: "Ticket flow, as Caterpillar sketched it",
  intake: {
    label: "Ticket logs in Salesforce",
    sub: "Every ticket, first stop",
  },
  agent: {
    label: "An agent kicks off the prep",
    chips: [
      "First-response draft",
      "Missing-info flag",
      "History pull",
      "Log-file analysis",
      "Dispatch routing",
      "Recurring-issue watch",
    ],
  },
  outcomes: [
    {
      label: "Support engineer",
      sub: "Starts prepped, not from scratch",
    },
    {
      label: "Engineering",
      sub: "Recurring issues, recommended",
    },
  ],
  ladderCaption: "Swaran's build order",
  ladder: ["Atoms", "Molecules", "Full support agent"],
};

export const support = {
  id: "support",
  kicker: "Priority one",
  title: "Product support agent framework",
  lede: "Richard's first pilot, confirmed on the demo call. Support is reactive and manual today, and in Ritesh's words, Caterpillar does not want to hire another thousand engineers to support the product as MineStar speeds up.",
  problem: [
    "Support today runs on people pulling reports by hand and asking \"do you remember when this happened.\" Richard's example: a release met one site's combination of truck, drivetrain, and a 7% grade, and a fully loaded 260-ton truck rolled back because validation had covered a 5% grade, not 7%. The fix exists. Finding who else needs it means manually checking every mine site, and mine sites change shape constantly.",
    "The raw material is already in one place. Every ticket logs into Salesforce first, and Caterpillar holds about ten years of closed tickets, a process map, and a definition of what a good close looks like. What is missing is the layer that reads all of it: log files today are, in their words, gibberish that an engineer decodes by hand.",
  ],
  solution: [
    {
      text: "The pipeline above is Caterpillar's own sketch, in their order: when a ticket hits Salesforce an agent kicks off and does the prep, drafts the first response, flags missing information, pulls the history, analyzes the log file, routes the dispatch, and watches for recurring issues to hand engineering. Swaran's build model: atoms, then molecules, then a full support agent. His team runs Microsoft 365 Copilot and Copilot Studio today, with in-house micro-agents already working.",
    },
    {
      text: "Caterpillar builds it; SpaceXAI is the harness under it, in lockstep. Matt Mansfield and Richard are drafting the people-process-tools plan, Ritesh and Swaran sit down with Matt, the support director, Tuesday or Wednesday, and Swaran is writing the prioritized problem list, small pieces first. Ritesh's read on the agent-factory demo: exactly what he had in mind for support.",
    },
    {
      text: "Also named on the calls, not yet lanes: Swaran's wider ship-to-customer stream (sales, first-time implementation, ongoing operations), change management for landing agents inside teams, vector search or a vector database over the support data, and migrating the existing Python automations and Copilot agents. Swaran keeps the bigger list; support starts first.",
    },
  ] satisfies Beat[],
  nextSteps: [
    {
      owner: "Swaran Unni",
      what: "Prioritize the support problem list, small pieces first.",
      when: "Now",
    },
    {
      owner: "Ritesh Gupta",
      what: "Session with Matt Mansfield, the support director; WhatsApp Jason the next steps.",
      when: "Tue or Wed",
    },
    {
      owner: "Matt Mansfield or Ritesh Gupta",
      what: "Bring SpaceXAI into the plan when it reaches tools.",
      when: "Late Aug / early Sep",
    },
  ] satisfies NextStep[],
  note: "MineStar modernization follows as priority two." as string | null,
};

/**
 * Stack diagram: the three-rung row under the support pipeline.
 * Status chips carry the honesty: demoed vs pitched vs never asked for.
 */
export const stackDiagram = {
  caption: "The stack, drawn",
  rungs: [
    {
      name: "Grok Voice",
      role: "First line",
      sub: "Voice Agent Builder: no-code phone agents with telephony and tools built in.",
      status: "Pitched, not asked",
    },
    {
      name: "Grok Bot",
      role: "Always on",
      sub: "Persistent Bots with their own cloud computer, routines, and memory.",
      status: "Demoed 13 Aug",
    },
    {
      name: "Cursor Cloud Agents",
      role: "When it is code",
      sub: "Take the handoff when a finding becomes a fix. Engineers judge the pull request.",
      status: "Pitched",
    },
  ],
  directionCaption: "The direction Richard set",
  direction: ["Reactive", "Proactive", "Predictive"],
  footnote:
    "The products are real. The Caterpillar wiring on this rung row is proposed, not agreed.",
};

export const stack = {
  id: "stack",
  kicker: "Under priority one",
  title: "The stack under support",
  lede: "Three rungs under Richard's first pilot: Grok Voice as the proposed first line, Grok Bot always on, Cursor Cloud Agents when it is code. The products are real; the Caterpillar wiring stays labeled proposed. Grok Bot is the rung Caterpillar has seen and reacted to.",
  problem: [
    "Our read of the build: Swaran's atoms and molecules need an operator. Something has to keep the small agents alive, hand them tickets, watch their output, and escalate what matters, around the clock. A chat window does not do that, and most of support is general-purpose knowledge work that never touches an IDE.",
    "Caterpillar has seen the layer that does. Grok Bot was demoed on 13 August. Ritesh: \"what you're showing here is exactly what I had in mind when it comes to support.\" Sai's words: \"nothing less than a magic.\" Swaran asked for access before the call ended, and Dustin's question the next day was the right one, whether data leaves the four walls. Same answer as Cursor: it does not.",
  ],
  solution: [
    {
      lead: "Grok Bot, one layer up.",
      text: "Jason's framing from the demo: not a chat you go into, a factory of agents you run. Named, persistent Bots with their own cloud computer, routines, and memory; they keep context and logins, watch queues instead of waiting for prompts, and finish real work across tools. Under the support pilot they would operate Caterpillar's own sketch: intake, log reading, history pulls, dispatch. The product is in beta.",
    },
    {
      lead: "When a finding becomes a code fix.",
      text: "A Bot that traces a recurring issue to software hands it to a Cloud Agent and gets back a pull request for an engineer to judge. Run the grade rollback through this as a scenario, not a case study: telemetry watched overnight, the 7% combination flagged from data already gathered, a fix drafted by morning. That is the proposed wiring and the ceiling to aim at, pitched, not promised.",
    },
    {
      lead: "Voice, first line, only if asked.",
      text: "Voice Agent Builder is a real product: no-code phone agents with telephony and tools built in, sub-second speech to speech, more than 25 languages. The Caterpillar wiring is only proposed: a site line a tech can phone or radio into, answered with MineStar context, closing simple issues and handing Matt's team a full brief. The entire record on these calls is Joe's one line, maybe next time we can show some of the voice agents. Until someone at Caterpillar asks for that line, voice stays a pitch, not a plan.",
    },
  ] satisfies Beat[],
  nextSteps: [
    {
      owner: "Jason Wiker",
      what: "Grok Bot access, credits, and a short how-it-works for Swaran and Sai. Already on the live action list.",
      when: "Now",
    },
    {
      owner: "Jason Wiker",
      what: "Cover Grok Bot at the working session as a new capability, not a feature bake-off.",
      when: "At the session",
    },
    {
      owner: "SpaceXAI",
      what: "Demo voice agents only if Caterpillar asks for a site line.",
      when: "Only if asked",
    },
  ] satisfies NextStep[],
  note: "Not a third lane. Support stays priority one, MineStar priority two, and this stack reports to the first." as string | null,
};

/** MineStar factory diagram: the loop plus the clock. */
export const minestarLoop = {
  caption: "The factory loop, module by module",
  stages: [
    { label: "Monolith", sub: "2 to 2.5M lines" },
    { label: "Decompose", sub: "Into business functions" },
    { label: "Modernize", sub: "Module by module" },
    { label: "Validate", sub: "The gnarly part" },
    { label: "Reinsert", sub: "Back into MineStar" },
  ],
  loopNote: "Repeat per module",
  timelineCaption: "The clock",
  timeline: [
    { label: "Roadmap deep dive", sub: "September, SpaceXAI the week after" },
    { label: "Field follow", sub: "Partner customers, Mar or Apr 2027" },
    { label: "MineStar 2.0 GA", sub: "End of 2027" },
  ],
};

export const minestar = {
  id: "minestar",
  kicker: "Priority two",
  title: "MineStar modernization",
  lede: "The site management system for autonomous mining machines, rebuilt in place before MineStar 2.0 ships.",
  problem: [
    "MineStar orchestrates autonomous machines against a digital twin of the mine. It is twenty years of tightly coupled code, two to two and a half million lines by Sai's count, much of it written by the engineers who needed it rather than software developers. Richard's words: a Jenga stack. Look at it funny and the whole thing breaks.",
    "The deadline is fixed and Richard walked it backward: MineStar 2.0 general release at the end of 2027, field follow with partner customers around March or April, a long robotics validation cycle in between. That leaves less than eighteen months end to end, most of the modernization and feature work in the next six. And the in-house path is real: a family of agents his team built, in use by more than 400 people, decomposing the monolith toward microservices since last October. The question for SpaceXAI is narrow: beat that path on speed and cost.",
  ],
  solution: [
    {
      text: "Richard set the structure himself. In September his team does the roadmap deep dive, the full picture 15 to 18 months out. The week after, SpaceXAI sits down against that baseline: his team says what they plan to build, and where we think we do it faster or cheaper, we say so and take that piece on. Ritesh sets up both sessions.",
    },
    {
      text: "Our proposal for the how: run SpaceXAI inside the loop the team already proved. Decompose into business functions, modernize module by module, validate, put it back, with agents working the queue in parallel and engineers approving everything that ships. Mix and match with the agents already in use, incremental, no big bang.",
    },
  ] satisfies Beat[],
  nextSteps: [
    {
      owner: "Ritesh Gupta",
      what: "Set the September roadmap deep dive with Richard's team.",
      when: "September",
    },
    {
      owner: "Ritesh Gupta",
      what: "Bring SpaceXAI in the week after, scoped against that roadmap.",
      when: "September",
    },
  ] satisfies NextStep[],
  note: "Priority two, per Ritesh: fine if the pilot gets to it, fine if it does not. Richard's internal team runs full tilt either way." as string | null,
};

export const actionsSection = {
  id: "actions",
  kicker: "The working plan",
  title: "Who does what, by when",
  lede: "Live for the working group: every move with a status, an owner, and timing, plus a calendar of working dates. Edits save on change and survive refresh. Dates are working dates, not commitments, until the agreement signs.",
  savedLabel: "Saved",
  savingLabel: "Saving",
  errorLabel: "Save failed, edit again to retry",
  memoryLabel: "Temporary storage. Set POSTGRES_URL for the shared database.",
  actionsCaption: "The action list",
  ganttCaption: "Working dates",
  ganttBadge: "Not yet agreed",
  todayLabel: "Today",
};

/**
 * Seed for the live plan. Only moves and windows named on the three calls.
 * The gantt is working placement, labeled as such on the page; nothing here
 * is an agreed date. Once a database is connected this seed only applies to
 * the first load.
 */
export const planSeed = {
  gantt: {
    target:
      "Working read: signature inside August, trial verdict by the end of September. Not yet agreed.",
    rows: [
      {
        id: "g-agreement",
        name: "Trial evaluation agreement",
        owner: "Joe + Cat legal",
        start: "2026-08-15",
        end: "2026-08-29",
        kind: "gate",
      },
      {
        id: "g-infra",
        name: "Infra + SSO readiness (Rossi)",
        owner: "Dustin + Dhamu",
        start: "2026-08-18",
        end: "2026-08-29",
        kind: "infra",
      },
      {
        id: "g-architecture",
        name: "Cat IT architecture deep dive",
        owner: "Sai Praveen",
        start: "2026-08-18",
        end: "2026-09-04",
        kind: "infra",
      },
      {
        id: "g-support-plan",
        name: "Support plan: director session, problem list",
        owner: "Ritesh + Swaran + Matt",
        start: "2026-08-18",
        end: "2026-09-04",
        kind: "support",
      },
      {
        id: "g-trial",
        name: "30-day trial (starts at signature)",
        owner: "Everyone in the pilot",
        start: "2026-09-01",
        end: "2026-09-30",
        kind: "trial",
      },
      {
        id: "g-roadmap",
        name: "MineStar roadmap deep dive",
        owner: "Richard's team + Ritesh",
        start: "2026-09-07",
        end: "2026-09-11",
        kind: "minestar",
      },
      {
        id: "g-sx-session",
        name: "SpaceXAI session on the roadmap",
        owner: "Ritesh + SpaceXAI",
        start: "2026-09-14",
        end: "2026-09-18",
        kind: "minestar",
      },
    ],
  },
  actions: [
    {
      id: "a-agreement",
      act: "Trial evaluation agreement through Cat legal. Gates every download and sign-in.",
      side: "SpaceXAI",
      owner: "Joe, Dustin, Cat legal",
      when: "A couple of weeks",
      stat: "in_progress",
    },
    {
      id: "a-terms",
      act: "Trial terms and success criteria in the paper, per Sai.",
      side: "SpaceXAI",
      owner: "Joe, with Sai's criteria",
      when: "With the agreement",
      stat: "not_started",
    },
    {
      id: "a-sourcing",
      act: "Sourcing-director check on Cat policy.",
      side: "SpaceXAI",
      owner: "Joe Masello",
      when: "Now",
      stat: "in_progress",
    },
    {
      id: "a-blessing",
      act: "Richard and Jamie's blessing for the pilot.",
      side: "Caterpillar",
      owner: "Richard Green + Jamie, via Joe",
      when: "Now",
      stat: "not_started",
    },
    {
      id: "a-architecture",
      act: "Architecture and security deep dive with Cat IT.",
      side: "Caterpillar",
      owner: "Sai Praveen",
      when: "Being scheduled",
      stat: "not_started",
    },
    {
      id: "a-infra",
      act: "Infrastructure and SSO readiness with Brian Rossi.",
      side: "Caterpillar",
      owner: "Dustin + Dhamu",
      when: "In parallel with legal",
      stat: "in_progress",
    },
    {
      id: "a-problems",
      act: "Prioritized support problem list, small pieces first.",
      side: "Caterpillar",
      owner: "Swaran Unni",
      when: "Now",
      stat: "in_progress",
    },
    {
      id: "a-access",
      act: "SpaceXAI and Grok Bot access and credits for Swaran and Sai.",
      side: "SpaceXAI",
      owner: "Jason Wiker",
      when: "Now",
      stat: "in_progress",
    },
    {
      id: "a-director",
      act: "Support director session with Matt Mansfield.",
      side: "Caterpillar",
      owner: "Ritesh Gupta",
      when: "Tue or Wed",
      stat: "not_started",
    },
    {
      id: "a-roadmap",
      act: "September MineStar roadmap deep dive, then SpaceXAI the week after.",
      side: "Caterpillar",
      owner: "Ritesh Gupta",
      when: "September",
      stat: "not_started",
    },
    {
      id: "a-writeup",
      act: "How-it-works and funding writeup for Richard's team and CFO.",
      side: "SpaceXAI",
      owner: "Joe Masello",
      when: "Now",
      stat: "in_progress",
    },
    {
      id: "a-trial",
      act: "Run the 30-day trial.",
      side: "SpaceXAI",
      owner: "Everyone in the pilot",
      when: "After signature",
      stat: "not_started",
    },
    {
      id: "a-tokens",
      act: "Cover all token costs, all models, all participants.",
      side: "SpaceXAI",
      owner: "SpaceXAI",
      when: "Through the trial",
      stat: "not_started",
    },
  ],
} as const;

export const footer = {
  workingGroupLabel: "The working group",
  caterpillar: {
    label: "Caterpillar",
    people: [
      "Richard Green",
      "Dhamu Sankaran",
      "Dustin Ziegler",
      "Brian Rossi",
      "Matt Mansfield",
      "Ritesh Gupta",
      "Swaran Unni",
      "Sai Praveen Gundlapalli",
      "Phill Jones",
    ],
  },
  cursor: {
    label: "SpaceXAI",
    people: ["Jason Wiker", "Brian Fox", "Joe Masello"],
  },
  line: "Private. Prepared for the Caterpillar working group. Sourced from the working sessions of 11, 13, and 14 August 2026.",
};

export const login = {
  kicker: "Private leave-behind",
  title: "Enter the password to continue.",
  placeholder: "Password",
  button: "Continue",
  error: "That password did not match. Try again.",
};
