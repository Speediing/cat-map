/**
 * All copy for the leave-behind lives here.
 * Edit this file to change what the page says; layout stays put.
 *
 * Sourced from the call transcripts of 11 August 2026 (Richard Green) and
 * 14 August 2026 (Dhamu Sankaran, Dustin Ziegler, Andy Lofgreen). A 13 August
 * demo session is in scope and folds in when its transcript lands.
 * No numbers, dates, or claims beyond what was said on those calls.
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
  title: "Caterpillar × Cursor",
  description:
    "The mutual action plan for the Caterpillar and Cursor pilot: a 30-day trial across MineStar modernization and a product support agent framework, with owners, gates, and dates.",
  wordmark: { left: "Caterpillar", right: "Cursor" },
  navLabel: "Private · August 2026",
};

export const nav = [
  { id: "plan", label: "The plan" },
  { id: "pilot", label: "The pilot" },
  { id: "minestar", label: "MineStar" },
  { id: "support", label: "Support" },
] as const;

export const hero = {
  kicker: "Mutual action plan · August 2026",
  title: "Thirty days to a verdict.",
  standfirst:
    "Caterpillar named two use cases: MineStar modernization, and an agent framework for product support. Cursor funds a 30-day trial across both, every model, every participant, no cost to Caterpillar. Legal and infrastructure run in parallel so neither waits on the other. The trial ends with a verdict and a number: does this hold up on real work, and what does it cost to run.",
  meta: "Compiled from the working sessions of 11 and 14 August 2026.",
};

export const glance = {
  id: "plan",
  kicker: "At a glance",
  clocks: [
    {
      value: "30 days",
      label: "The trial",
      body: "Cursor-funded. All models, all participants, no cost to Caterpillar. The output is a viability verdict and a real token-spend baseline.",
    },
    {
      value: "A couple of weeks",
      label: "The gate",
      body: "A formal trial evaluation agreement, Joe's paperwork through Cat legal. Cat policy allows no click-through terms, so nothing downloads before signature.",
    },
    {
      value: "End of 2027",
      label: "The deadline",
      body: "MineStar 2.0 goes GA, with field follow at partner customers in March or April. Richard's math: less than eighteen months end to end, most of the work in the next six.",
    },
  ],
  lanes: [
    {
      label: "Use case 1",
      tag: null as string | null,
      title: "MineStar modernization",
      body: "Richard's team is already decomposing the 20-year monolith with agents they built last October. His question for Cursor: can you go faster, at lower cost?",
      owner: "Richard Green's team",
      clock: "Roadmap deep dive in September",
    },
    {
      label: "Use case 2",
      tag: "Preferred first",
      title: "Product support",
      body: "Manual and reactive today. Richard wants a ground-level build: people, process, tools, and agents that gather data and predict issues instead of reacting to them.",
      owner: "Matt Mansfield, with Richard Green",
      clock: "Outreach late Aug / early Sep",
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
        { what: "Trial evaluation agreement paperwork to Cat legal", owner: "Joe Masello" },
        { what: "Infrastructure readiness call with Brian Rossi, network and SSO", owner: "Dustin + Dhamu" },
        { what: "Benchmark and ROI material for the tool comparison", owner: "Jason Wiker" },
        { what: "How-it-works and funding-model writeup for Richard", owner: "Joe Masello" },
        { what: "MSA track, checking existing Starlink paper as a base", owner: "Joe Masello" },
        { what: "September MineStar roadmap deep dive", owner: "Ritesh Gupta" },
      ],
    },
  },
};

export const pilot = {
  id: "pilot",
  kicker: "The pilot",
  title: "One trial, built to end in evidence.",
  lede: "Not a demo and not a workshop. One 30-day trial on your code, against the tools you already run, with the numbers your budget cycle needs.",
  problem: [
    "Caterpillar cannot take this on impressions. Richard's team already runs Copilot-based agents and an internal agentic framework they stood up last October, and it is producing real productivity gains. So the live question is his, build versus buy: is Cursor faster and cheaper than the path already working?",
    "Procurement sets the tempo. Cat policy allows no click-through agreements, so nothing can be downloaded until a trial evaluation agreement is signed, and legal is the bottleneck, a couple of weeks. Budgets run on a calendar year and Caterpillar is already looking at 2027, so the trial has to produce numbers a CFO can plan with. Richard's phrase for the moment: a justify-your-existence discussion.",
  ],
  solution: [
    {
      lead: "Use the window.",
      text: "While the agreement works through legal, everything else gets ready. Dhamu Sankaran is setting up the infrastructure readiness call with Brian Rossi, network and SSO, and Dustin Ziegler wants as much in parallel as possible, with Rossi's cyber review the one possible roadblock. SSO itself typically takes under a day. The NDA is already signed and folds into the MSA later; the MSA runs behind the trial without gating it, and Joe Masello is checking whether existing Starlink paper can carry big parts of it.",
    },
    {
      lead: "Where it runs is still open.",
      text: "Dhamu's frame for the evaluation: what is the minimum effort required to start? Desktop is close to zero, download Cursor and sign in with a Cat email on the enterprise trial, though Caterpillar would rather gate the download behind SSO than send people to the public internet. Cloud agents can be Anysphere-managed, unlimited VMs at no extra cost with AWS PrivateLink back to your VPC, or self-hosted under Caterpillar infrastructure. Desktop only versus both is Dhamu's security question, and the plan does not assume the answer.",
    },
    {
      lead: "Compare in the open.",
      text: "A working session, not a one-or-two-day workshop, on Dhamu's terms: Cursor against GitHub Copilot, Claude Code, and Codex, with benchmark material we bring and the evaluation metrics agreed up front, ROI and return on spend. We also want to see how your teams use their tools today, because some of what we would show does not map feature for feature.",
    },
    {
      lead: "Measure what matters.",
      text: "All token costs on us, across every model and participant, and these pilots typically run with thousands of people. The point of covering cost is seeing how teams work when money is not the constraint. The output is a viability verdict and a real consumption baseline, the number that turns a placeholder budget line into a plan.",
    },
    {
      lead: "Keep help close.",
      text: "Enablement up front, working sessions on your use cases during, and Jason, Brian, and Joe on call ad hoc throughout, with a shared Slack channel if that is easier.",
    },
  ] satisfies Beat[],
  constraintsLabel: "The trial runs under two constraints",
  constraints: [
    {
      title: "Build vs buy can be hybrid",
      body: "Richard asked whether Cursor can integrate the library of agents his team already built on Copilot. The answer: mix and match as much as you want. Nobody big-bangs this; Cursor picks off pieces of the SDLC incrementally, and nothing his team built gets thrown out.",
    },
    {
      title: "Cost has to be governable",
      body: "After the pilot, licensing is a pool of funds in the enterprise agreement that teams draw from, with controls down to the individual: which models, how much per month. Caterpillar can put placeholders into 2027 planning before a deal is signed; the baseline makes them real.",
    },
  ],
  nextSteps: [
    {
      owner: "Joe Masello",
      what: "Send the trial evaluation agreement paperwork. It gates every download and sign-in.",
      when: "Now",
    },
    {
      owner: "Dustin Ziegler, Dhamu Sankaran",
      what: "Hold the infrastructure readiness call with Brian Rossi: network plus SSO.",
      when: "In parallel with legal",
    },
    {
      owner: "Jason Wiker",
      what: "Share benchmark and ROI material ahead of the working session.",
      when: "Before the session",
    },
    {
      owner: "Joe Masello",
      what: "Check existing Starlink paper as a base for the MSA.",
      when: "Now",
    },
    {
      owner: "Joe Masello",
      what: "Write up how Cursor works and the funding model, for Richard's team and his CFO.",
      when: "Now",
    },
  ] satisfies NextStep[],
};

export const minestar = {
  id: "minestar",
  kicker: "Use case 1",
  title: "MineStar modernization",
  lede: "The site management system for autonomous mining machines, rebuilt in place before MineStar 2.0 ships.",
  problem: [
    "MineStar orchestrates autonomous machines on a mine site: a digital twin of the mine, the machines run against it, productivity measured from it. It is twenty years of tightly coupled code, built on and built on, much of it by the engineers who needed it rather than software developers. Richard's words: a Jenga stack. Look at it funny and the whole thing breaks.",
    "The deadline is fixed and Richard walked it backward: general release of MineStar 2.0 at the end of 2027, field follow with partner customers around March or April, a long robotics validation cycle before that. That leaves less than eighteen months end to end and puts most of the modernization and new feature work in the next six. His internal framework has been decomposing the monolith into business functions since last October, and he is going full tilt. The question he handed us is narrow: can Cursor beat the path already in motion on speed and cost?",
  ],
  solution: [
    {
      text: "Richard set the structure himself. In September his team does a deep dive on the technical roadmap, the full picture 15 to 18 months out. The week after, we go through it together: his team says what they plan to build, and where we think Cursor does it faster or cheaper, we say so and take that piece on. Ritesh Gupta, his lead, sets up both sessions.",
    },
    {
      text: "Our proposal for the how: run Cursor inside the loop his team already proved. Decompose into business functions, modernize each module, validate it, put it back, with agents working the queue in parallel and engineers approving everything that ships. Hybrid is the default, mix and match with the Copilot-based agents they already have, incremental across the SDLC, no big bang.",
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
      what: "Bring Cursor in the week after, scoped against that roadmap.",
      when: "September",
    },
  ] satisfies NextStep[],
  note: "Ritesh shares the urgency. The clock on 2.0 is already running." as string | null,
};

export const support = {
  id: "support",
  kicker: "Use case 2",
  title: "Product support agent framework",
  lede: "Richard's preferred first pilot. Support is reactive and manual today; he wants agents gathering the data and predicting the issue before it happens.",
  problem: [
    "Support today runs on people pulling reports by hand and asking \"do you remember when this happened.\" Richard's example: a release met one site's combination of truck, drivetrain, and a 7% grade, and a fully loaded 260-ton truck rolled back because validation had covered a 5% grade, not 7%. The fix exists. Finding who else needs it means manually checking every mine site, and mine sites change shape constantly, so a site without that grade today can have it after the next road change.",
    "Nothing watches the data and brings findings to an engineer. Building that is ground-level work across people, process, and tools, starting from scratch. On modernization Richard is asking whether we are faster. Here he is asking for help building it, and it is the use case he wants to pilot first.",
  ],
  solution: [
    {
      text: "Richard and Matt Mansfield, his product support director, are drafting the plan now: people, process, technology, in that order. When it reaches the tools, Matt or Ritesh brings us in, probably late August or early September. We come in at ground level and help shape it rather than quote against it.",
    },
    {
      text: "The direction he described: a knowledge base with agents on top for responsive support, then a framework of agents that gathers site data and runs analytics to predict issues instead of reacting to them. The next 7% grade question gets answered from data already gathered, not a manual sweep of every site.",
    },
  ] satisfies Beat[],
  nextSteps: [
    {
      owner: "Matt Mansfield or Ritesh Gupta",
      what: "Reach out to set up the product support plan session.",
      when: "Late Aug / early Sep",
    },
  ] satisfies NextStep[],
  note: "Both use cases likely land in the same window. Support may move first." as string | null,
};

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
    label: "Cursor",
    people: ["Jason Wiker", "Brian Fox", "Joe Masello"],
  },
  line: "Private. Prepared for the Caterpillar working group. Sourced from the working sessions of 11 and 14 August 2026.",
};

export const login = {
  kicker: "Private leave-behind",
  title: "Enter the password to continue.",
  placeholder: "Password",
  button: "Continue",
  error: "That password did not match. Try again.",
};
