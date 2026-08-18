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
  title: "Caterpillar × SpaceXAI · Mutual action plan",
  description:
    "The mutual action plan for Caterpillar and SpaceXAI: a 30-day trial, support first then MineStar, with a compact POC calendar and decision criteria.",
  wordmark: { left: "Caterpillar", right: "SpaceXAI" },
  navLabel: "Private · August 2026",
};

export const nav = [
  { id: "plan", label: "At a glance" },
  { id: "pilot", label: "The pilot" },
  { id: "support", label: "Support" },
  { id: "stack", label: "Voice + Bot" },
  { id: "minestar", label: "MineStar" },
  { id: "actions", label: "POC" },
  { id: "stories", label: "Stories" },
  { id: "gartner", label: "Gartner" },
] as const;

export const hero = {
  kicker: "Mutual action plan · August 2026",
  title: "Proactive support. MineStar 2.0 on time.",
  standfirst:
    "Support first. Then MineStar. One page both teams work from: Caterpillar named that order, and SpaceXAI funds the 30-day trial across both, every model, every participant, no cost to Caterpillar. Paper, infrastructure, and the Cat Cloud question move in parallel so nothing waits twice. The trial ends with a verdict and a number: does this hold up on real work, and what does it cost to run.",
  meta: "Compiled from the working sessions of 11, 13, and 14 August 2026.",
  cta: { label: "See the POC", href: "#actions" },
  art: {
    src: "/spacex-cat-rocket.jpg",
    width: 1536,
    height: 1024,
    alt: "Watercolor of a white rocket on a yellow launch pad beside a yellow haul truck in the dust",
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
      tag: "Caterpillar's original plan" as string | null,
      title: "MineStar modernization",
      body: "Caterpillar's plan today: a 20-year monolith, two to two and a half million lines, moving to microservices. Richard's team has been on it with in-house agents 400 people use since last October. The ask of SpaceXAI: faster, at lower cost.",
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

export const partnership = {
  kicker: "Partnership details",
  title: "How the trial is set up.",
  body: [
    "SpaceXAI funds the 30-day trial: all models, all participants, no cost to Caterpillar. Pricing for anything after that stays on the paper Joe is moving; this page does not invent a number.",
    "Named field side for Caterpillar: Jason Wiker, Brian Fox, and Joe Masello. Post-sales support that comes with the commercial agreement is the same bench: a named field engineer, onboarding, and help through the trial and after, not a separate paid add-on invented here.",
  ],
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
      text: "Caterpillar builds it; SpaceXAI is the harness under it, in lockstep. Matt Mansfield and Richard are drafting the people-process-tools plan, Ritesh and Swaran sit down with Matt, the support director, Tuesday or Wednesday, and Swaran is writing the prioritized problem list, small pieces first.",
    },
  ] satisfies Beat[],
  /** The Voice + Bot block, anchored inside this section. Same problem, two intakes. */
  stackAnchor: "stack",
  stackLabel: "Two intakes, one problem",
  stackBeats: [
    {
      lead: "Grok Bot, the ticket side.",
      text: "Swaran's atoms and molecules need an operator, and Caterpillar has seen the one we would use. Grok Bot was demoed on 13 August and it landed: Ritesh called it exactly what he had in mind for support, Sai's words were \"nothing less than a magic,\" Swaran asked for access before the call ended, and Dustin's four-walls question got the same answer as Cursor, data does not leave. The product: named, persistent Bots with their own cloud computer, routines, and memory, watching the Salesforce queue instead of waiting for prompts. In beta.",
    },
    {
      lead: "Grok Voice, the call-in side.",
      text: "Tickets are one intake; the other is a human on the line. If Caterpillar ever wants an agent there, this is what we would put on it: Voice Agent Builder, no-code phone agents with telephony and tools built in, sub-second speech to speech, more than 25 languages. The wiring, a site line with MineStar context that closes simple issues and hands Matt's team a brief, is SpaceXAI-pitched, not something Caterpillar asked for. The whole record on these calls is Joe's line, maybe next time we can show some of the voice agents. We demo it the day someone wants that line.",
    },
    {
      lead: "When it becomes code.",
      text: "A Bot that traces a recurring issue to software hands it to a Cloud Agent and gets back a pull request for an engineer to judge. Run the grade rollback through this as a scenario, not a case study: telemetry watched overnight, the 7% combination flagged from data already gathered, a fix drafted by morning. That is the proposed wiring and the ceiling to aim at, pitched, not promised.",
    },
  ] satisfies Beat[],
  alsoNamed: {
    text: "Also named on the calls, not yet lanes: Swaran's wider ship-to-customer stream (sales, first-time implementation, ongoing operations), change management for landing agents inside teams, vector search or a vector database over the support data, and migrating the existing Python automations and Copilot agents. Swaran keeps the bigger list; support starts first.",
  } satisfies Beat,
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
      owner: "Matt Mansfield or Ritesh Gupta",
      what: "Bring SpaceXAI into the plan when it reaches tools.",
      when: "Late Aug / early Sep",
    },
    {
      owner: "SpaceXAI",
      what: "Demo voice agents only if Caterpillar asks for a site line.",
      when: "Only if asked",
    },
  ] satisfies NextStep[],
  note: "MineStar modernization follows as priority two. The Voice and Bot stack above reports to this pilot, not a third lane." as string | null,
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
  kicker: "Priority two · Caterpillar's original plan",
  title: "MineStar modernization",
  lede: "Caterpillar's plan today for the site management system behind autonomous mining machines, rebuilt in place before MineStar 2.0 ships.",
  problem: [
    "MineStar orchestrates autonomous machines against a digital twin of the mine. It is twenty years of tightly coupled code, two to two and a half million lines by Sai's count, much of it written by the engineers who needed it rather than software developers. Richard's words: a Jenga stack. Look at it funny and the whole thing breaks.",
    "The deadline is fixed and Richard walked it backward: MineStar 2.0 general release at the end of 2027, field follow with partner customers around March or April, a long robotics validation cycle in between. That leaves less than eighteen months end to end, most of the modernization and feature work in the next six. And Caterpillar's original plan is already running: a family of agents his team built, in use by more than 400 people, decomposing the monolith toward microservices since last October. The question for SpaceXAI is narrow: beat that path on speed and cost.",
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
  kicker: "Proof of concept",
  title: "A short path to a real verdict",
  lede: "The 30-day POC starts after signature, moves onto Caterpillar's real work, and ends with evidence for the build-versus-buy decision.",
};

/**
 * The POC calendar uses relative weeks because the 30-day clock starts only
 * after signature. Every line comes from the Cat plan above.
 */
export const pocCalendar = {
  caption: "What the 30-day POC looks like",
  note: "Relative weeks only. The clock starts after the trial agreement is signed.",
  weeks: [
    {
      week: "Week 0",
      title: "Clear the gates",
      session: "Setup · Access, SSO, and installs",
      text: "Joe and Cat legal move the trial agreement while Sai, Cat IT, Dustin, Dhamu, and Brian Rossi settle architecture, security, infrastructure, and SSO. Jason, Brian Fox, and Joe prepare access, installs behind SSO, and the shared Slack channel. The week ends with the agreement and readiness gates cleared so the 30-day clock can start.",
    },
    {
      week: "Week 1",
      title: "Start real work",
      session:
        "Cursor 101 with Jason, Brian Fox, and Joe · Tab, inline edit, Agent and Plan mode, context, safe review",
      text: "Caterpillar's AI team and engineers start with Swaran's prioritized product support problems, small pieces first. Jason, Brian Fox, and Joe enable the builders, stay close in Slack, and begin the recurring cadence. The team leaves with the first support work moving on Caterpillar's code and tools.",
    },
    {
      week: "Week 2",
      title: "Deepen one path",
      session: "Cursor 201 · Cloud Agents, rules and skills, automations",
      text: "Caterpillar keeps building the support pieces with SpaceXAI alongside and compares the work with the tools already in use. If the support path holds and the trial reaches it, Richard's team and Ritesh can bring in a MineStar piece. The team leaves with evidence from real work and a clearer read on build versus buy.",
    },
    {
      week: "Weeks 3 and 4",
      title: "Prove and decide",
      session: "Cursor 301 · Caterpillar reverse demos on its real support work",
      text: "Caterpillar and the SpaceXAI field team review the work through the recurring cadence and judge it against the agreed evaluation metrics. They compare viability, ROI, and return on spend with the tools already in use. The final readout is a viability verdict and a real consumption baseline for the CFO and 2027 budget.",
    },
  ],
};

export const pocSuccessCriteria = {
  caption: "What the trial has to prove",
  items: [
    {
      requirement: "Support closes faster",
      evidence:
        "On named product-support tickets Caterpillar already owns, time from pickup to a reviewer-accepted change beats the current Copilot and in-house path. Caterpillar picks the tickets and the clock at kickoff.",
    },
    {
      requirement: "Cost per change drops",
      evidence:
        "The same work costs less to a shipped change than the tools already in use, or produces more accepted output per dollar. That is the return-on-spend number Sai asked to put in the paper.",
    },
    {
      requirement: "Same people, more done",
      evidence:
        "The named builders clear more reviewed support work in the trial window than they did on the prior path, without adding headcount. MineStar stays out unless the support path holds.",
    },
    {
      requirement: "2027 can use it",
      evidence:
        "The readout leaves a real consumption baseline, not a placeholder, that finance can put in the 2027 plan. Richard's justify-your-existence discussion uses that number.",
    },
  ],
};

export const mapMustHaves = {
  caption: "What the plan has to hold",
  note: "Nine things the mutual plan needs before anyone calls the pilot passed.",
  items: [
    {
      requirement: "Shared objective",
      evidence:
        "The outcome Caterpillar is buying, in its words: is SpaceXAI faster and cheaper than the in-house agents more than 400 people already use, plus Copilot, on real product-support work. Richard's phrase is a justify-your-existence discussion. The 2027 plan needs a number, not an impression.",
    },
    {
      requirement: "Success criteria",
      evidence:
        "Pilot passed means the four outcomes above hold: support closes faster, cost per accepted change drops, the same people get more done, and finance can use a real 2027 consumption number. Richard and Jamie sign off. Sai asked for these criteria in the trial paper, not after the fact.",
    },
    {
      requirement: "Owners on both sides",
      evidence:
        "Caterpillar: Richard and Jamie on the decision, Sai on architecture and security, Dhamu and Dustin with Brian Rossi on infrastructure and SSO, Swaran and Ritesh on support, Matt Mansfield on the support plan. SpaceXAI: Joe Masello, Jason Wiker, and Brian Fox. Cat builds. SpaceXAI supplies the platform and stays in lockstep.",
    },
    {
      requirement: "Timeline",
      evidence:
        "Work the paper and readiness now. The 30-day clock starts at signature, not before. Week 0 clears gates. Weeks 1 to 4 run 101, 201, and 301 on live support work. MineStar stays a September deep dive and only enters the trial if support holds. The MSA runs behind the trial. It does not gate it.",
    },
    {
      requirement: "Pilot scope",
      evidence:
        "In: 30 days, named product-support work Caterpillar already owns, desktop plus whatever architecture Cat IT writes down, scored against Copilot and the in-house agents. Out: click-through installs, public downloads, assuming SaaS, and MineStar as the first lane. Cloud or self-hosted agents only if confirmed.",
    },
    {
      requirement: "Tech and security",
      evidence:
        "Sai's rule: model traffic stays on Caterpillar's network unless Cat IT writes an exception. The deep dive ends with a path in writing, SaaS, tunnel, or Cat Cloud. Brian Rossi owns infrastructure, guardrails, repo access, and SSO. Salesforce, internal databases, and Snowflake take the most time if the platform sits outside Cat Cloud.",
    },
    {
      requirement: "Legal and buy",
      evidence:
        "No click-through. A trial evaluation agreement has to be signed before anything installs. Legal is the bottleneck, a couple of weeks. The NDA is signed and folds into the MSA later. Joe is checking Cat policy with the sourcing director and whether existing Starlink paper can carry parts of the MSA. 2027 placeholders can go in before a deal is signed. The baseline makes them real.",
    },
    {
      requirement: "Decision trigger",
      evidence:
        "If the four outcomes hold, Richard or Jamie can take a viability verdict and a real consumption number into the 2027 plan. That readout is on the calendar before week 4, and they can give it without SpaceXAI in the room. If the outcomes do not hold, the trial ends as a hybrid stay or a hold, not a quiet drift into another workshop.",
    },
    {
      requirement: "Risks",
      evidence:
        "Legal can slip the clock. Architecture can stay open and kill the trial at readout. MineStar can pull the cohort off support too early. Copilot and the in-house agents already work, so the bar is a comparison, not a demo. Mitigation: paper and Rossi work in parallel, support stays lane one, and an open architecture question is a fail.",
    },
  ],
};

/**
 * Published Cursor / SpaceXAI proof appendix. Metrics and quotes only from
 * the named public posts. The For Caterpillar line on each tile is a mapping,
 * not a Caterpillar number.
 */
export const stories = {
  id: "stories",
  kicker: "Customer stories",
  title: "How peers evaluated Cursor and what they shipped.",
  lede: "Verified from published stories on cursor.com/blog and brex.com. Metrics are from those posts only. The Caterpillar line on each tile is the mapping, not a Cat number.",
  forCatLabel: "For Caterpillar",
  art: {
    src: "/hero-truck.jpg",
    width: 1536,
    height: 1024,
    alt: "Watercolor painting of a mining haul truck",
  },
  items: [
    {
      company: "NVIDIA",
      logo: "/logos/stories/nvidia.svg",
      title: "30-year interconnected codebases. 30,000 developers daily.",
      forCat:
        "Cat already partners with NVIDIA. Same shape as MineStar: decades of interconnected product-line code that no one person can hold in their head.",
      bullets: [
        "Large, interconnected product-line codebases that evolve quickly.",
        "30,000 developers using Cursor daily.",
        "3x committed code, with bug rates flat.",
        "SDLC beyond generation: review, test, and debug.",
      ],
      quote:
        "Each of NVIDIA's product lines has a complex codebase that is evolving quickly. It's very hard for developers to stay on top of these changes and understand the entirety of the codebase. This is where Cursor really shines.",
      attribution: "Wei Luo, VP of Engineering, NVIDIA",
      href: "https://cursor.com/blog/nvidia",
      linkLabel: "Read the story",
    },
    {
      company: "Coinbase",
      logo: "/logos/stories/coinbase.svg",
      title:
        "Idea to production down 90%. 1 to 2 engineers shipping what used to take a full team.",
      forCat:
        "The MineStar and support value case: get a change from idea to production without parking a full feature team on it.",
      bullets: [
        "2,400+ developers on Cursor.",
        "Idea to production: 20 days to 1.8 days. Long-term target is 4 hours.",
        "Idea to first PR: 8 days to under 30 minutes.",
        "55% more PRs merged per engineer. 75% of PRs created by agents.",
        "Feature work that needed a full team now done by 1 to 2 engineers.",
      ],
      quote:
        "The product has become a mission control for agents rather than just a raw IDE.",
      attribution: "Chintan Turakhia, Senior Director of Engineering, Coinbase",
      href: "https://cursor.com/blog/coinbase",
      linkLabel: "Read the story",
    },
    {
      company: "Faire",
      logo: "/logos/stories/faire.svg",
      title: "Self-healing PRs. 2,000 automations a week. Double the PR throughput.",
      forCat:
        "Support and MineStar CI is the tax. A failed build gets triaged and patched by an agent instead of waiting on a human to read the logs.",
      bullets: [
        "When CI fails, a cloud agent triages the logs, diagnoses the issue, and pushes a fix.",
        "More than 2,000 autonomous agent runs per week across 25+ automations.",
        "Doubled weekly PR throughput.",
        "An 18-month migration is now one engineer directing a fleet of cloud agents.",
      ],
      quote:
        "Cursor's cloud offering is a lot better than running local agents with worktrees or 10 remote environments you're shelling into. It's a streamlined UX for managing multiple concurrent agents.",
      attribution: "Luke Bjerring, Principal Engineer, Faire",
      href: "https://cursor.com/blog/faire",
      linkLabel: "Read the story",
    },
    {
      company: "Brex",
      logo: "/logos/stories/brex.svg",
      title: "Micronaut migration: 50 services in a quarter, then 180 in a month.",
      forCat:
        "Cat's version is platform and framework upgrades across many services, without pausing a quarter of product work to do it by hand.",
      bullets: [
        "Manual pass: 3 engineers, one quarter, 50 services from Micronaut 3 to 4.",
        "With self-hosted Cursor cloud agents: 1 engineer completed 180 services in 1 month.",
        "32x per-capita acceleration. About 90% lower cost per service.",
      ],
      quote:
        "This allowed a single engineer to migrate 180 microservices in just one month.",
      attribution: "Brex engineering, Agent automations for big migrations",
      href: "https://www.brex.com/journal/agent-automations-for-big-migrations",
      linkLabel: "Read the story",
    },
    {
      company: "Cursor",
      logo: "/logos/stories/cursor.svg",
      title: "Every internal PR goes through Bugbot. Cloud agents review and autofix.",
      forCat:
        "What running this on ourselves looks like: every PR reviewed, agents propose the fix, humans still merge. The bar Cat can hold us to.",
      bullets: [
        "Bugbot runs on all internal Cursor code.",
        "Autofix spawns a cloud agent to diagnose findings and propose a patch.",
        "Over 35% of Bugbot Autofix changes are merged into the base PR.",
        "More than 40% of internal PRs now come from cloud agents.",
      ],
      quote: "We also run Bugbot on all internal code at Cursor.",
      attribution: "Cursor, Building a better Bugbot",
      href: "https://cursor.com/blog/bugbot-autofix",
      linkLabel: "Read the Bugbot Autofix post",
    },
    {
      company: "National Australia Bank",
      logo: "/logos/stories/nab.svg",
      title: "Evaluated GitHub Copilot and Amazon Q. Standardized on Cursor.",
      forCat:
        "Closest analog to Cat evaluating Copilot. Legacy plus modernization, then standardize on one agent that knows the codebase.",
      bullets: [
        "Legacy monolith and mainframe modernization, 3x faster than expected.",
        "6,000 developers in the first cohort, expanding to 10,000.",
        "BizCalc Silverlight monolith: pre-dev in 1 week vs 2 months; full migration expected 2 months vs 6.",
        "Assembly mainframe 3x faster. Greenfield payment app 3 weeks vs 4 months.",
      ],
      quote:
        "Using plugin-based coding assistants is like trying to bolt AI onto your workflow from the outside. With Cursor, the agent understands our codebase and works the way NAB works.",
      attribution: "Chris De Lorenzo, Principal Engineer",
      href: "https://cursor.com/blog/nab",
      linkLabel: "Read the story",
    },
    {
      company: "Box",
      logo: "/logos/stories/box.svg",
      title: "Enterprise security, privacy, and governance first.",
      forCat:
        "Brian Rossi's gate. Security, privacy, and governance have to clear before MineStar or support code is in scope.",
      bullets: [
        "Cursor stood out in a serious enterprise vendor review for data privacy and security controls.",
        "85% daily adoption.",
        "30-50% roadmap throughput.",
        "Migrations 80-90% faster.",
      ],
      quote:
        "We vet developer tools very seriously. Cursor stood out from other vendors for its data privacy and security controls.",
      attribution: "Swaroop Butala, Senior Director of Engineering",
      href: "https://cursor.com/blog/box",
      linkLabel: "Read the story",
    },
  ],
  video: {
    company: "Video · Cursor",
    logo: "/logos/stories/cursor.svg",
    title: "How Intuit, DoorDash, and Atlassian are adopting AI coding.",
    forCat:
      "How three large product orgs actually adopted agents. Useful for how Cat would roll this past a pilot team.",
    lede: "Jordan Topoleski with Chris (Intuit), Ryan (DoorDash), and Tarun (Atlassian).",
    embedSrc: "https://www.youtube-nocookie.com/embed/aF-rolD9W7I",
    href: "https://www.youtube.com/watch?v=aF-rolD9W7I",
    linkLabel: "Watch on YouTube",
  },
};

export const gartner = {
  id: "gartner",
  kicker: "Analyst",
  title:
    "Cursor is a Leader in the 2026 Gartner Magic Quadrant for Enterprise AI Coding Agents.",
  lede: "Furthest on Completeness of Vision. Report date 20 May 2026. Authors: Philip Walsh, Nitish Tyagi, Keith Holloway, Matt Brasier, Neha Agarwal.",
  links: [
    {
      label: "Read the complimentary Gartner report",
      href: "https://cursor.com/lp/2026-gartner-mq",
    },
    {
      label: "Read the Cursor announcement",
      href: "https://cursor.com/blog/cursor-leads-gartner-mq-2026",
    },
  ],
  disclaimer:
    "Gartner, Magic Quadrant for Enterprise AI Coding Agents, Philip Walsh, Nitish Tyagi, Keith Holloway, Matt Brasier, Neha Agarwal, 20 May 2026. Gartner does not endorse any vendor, product or service depicted in its research publications, and does not advise technology users to select only those vendors with the highest ratings or other designation. Gartner research publications consist of the opinions of Gartner's research organization and should not be construed as statements of fact. Gartner disclaims all warranties, expressed or implied, with respect to this research, including any warranties of merchantability or fitness for a particular purpose. GARTNER is a registered trademark and service mark of Gartner, Inc. and/or its affiliates in the U.S. and internationally, and MAGIC QUADRANT is a registered trademark of Gartner, Inc. and/or its affiliates and are used herein with permission. All rights reserved.",
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
  line: "Private, for the working group on both sides. Sourced from the working sessions of 11, 13, and 14 August 2026.",
};

export const login = {
  kicker: "Private leave-behind",
  title: "Enter the password to continue.",
  placeholder: "Password",
  button: "Continue",
  error: "That password did not match. Try again.",
};
