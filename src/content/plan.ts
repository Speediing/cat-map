/**
 * All copy for the leave-behind lives here.
 * Edit this file to change what the page says; layout stays put.
 *
 * Sourced from the working sessions of 11 and 14 August 2026 and the
 * working group's notes. No numbers or dates beyond what was said.
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
      body: "Cursor-funded. All models, all participants, on real engineering work. It produces a viability verdict and a real token-spend baseline.",
    },
    {
      value: "A couple of weeks",
      label: "The gate",
      body: "A formal trial evaluation agreement, headed to Cat legal. Cat policy allows no click-through terms, so nothing downloads before signature.",
    },
    {
      value: "End of 2027",
      label: "The deadline",
      body: "MineStar 2.0 goes GA. Field follow with a partner customer lands March or April. Under eighteen months for modernization, features, and validation.",
    },
  ],
  lanes: [
    {
      label: "Use case 1",
      tag: null as string | null,
      title: "MineStar modernization",
      body: "Take the 20-year monolith apart into business functions, containerize, validate, reinsert. Cursor works as the factory; engineers approve every cutover.",
      owner: "Richard Green's team",
      clock: "Roadmap deep dive in September",
    },
    {
      label: "Use case 2",
      tag: "Preferred first",
      title: "Product support",
      body: "Reactive and manual today. Greenfield build of an agent framework for data gathering and predictive analytics, moving support from reactive to proactive.",
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
        "The 30-day clock itself. It starts on signature plus readiness, not before.",
      ],
    },
    moving: {
      title: "Moving now, in parallel",
      items: [
        { what: "Trial evaluation agreement paperwork to Cat legal", owner: "Joe Masello" },
        { what: "Infrastructure call with Brian Rossi, network and SSO", owner: "Dustin + Dhamu" },
        { what: "Benchmark and ROI material for the tool comparison", owner: "Jason Wiker" },
        { what: "Funding-model summary for Richard's CFO", owner: "Joe Masello" },
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
    "Caterpillar cannot take this on impressions. Teams already run GitHub Copilot and an internal agentic framework that has been paying off since October, so the live question is build vs buy: is Cursor faster and cheaper on real work?",
    "Procurement sets the tempo. Cat policy allows no click-through agreements, so nothing can be downloaded until a trial evaluation agreement is signed, and legal is the bottleneck, a couple of weeks. Meanwhile 2027 budgets are being planned now, on a calendar fiscal year. The trial has to produce numbers a CFO can plan with, not a feeling.",
  ],
  solution: [
    {
      lead: "Use the window.",
      text: "While the agreement works through legal, everything else gets ready. Dustin Ziegler and Dhamu Sankaran are setting up the infrastructure call with Brian Rossi to cover network and SSO; SSO itself typically takes under a day once it starts. The NDA is already signed (it can fold into the MSA later), and Joe Masello is checking whether existing Starlink paper shortens the MSA redlines, which otherwise run a few weeks.",
    },
    {
      lead: "Where it runs is still open.",
      text: "Desktop needs no infrastructure: download Cursor, sign in with a Cat email on the enterprise trial. Cloud agents can be Anysphere-managed, unlimited VMs at no extra cost, reaching your VPC over AWS PrivateLink, or self-hosted under Caterpillar infrastructure with more overhead. Which mix clears Caterpillar security is Dhamu's question to close, and the plan does not assume the answer.",
    },
    {
      lead: "Compare in the open.",
      text: "One working session, not a one-or-two-day workshop. Cursor next to GitHub Copilot, Claude Code, and Codex, with the benchmark and competitive material we bring, plus use cases, ROI, and token spend.",
    },
    {
      lead: "Measure what matters.",
      text: "All token costs on us, across every model and participant. The output is a viability verdict and a real consumption baseline, the number that turns a placeholder budget line into a plan.",
    },
    {
      lead: "Keep help close.",
      text: "Jason, Brian, and Joe stay on call through the trial, ad hoc, with a shared Slack channel if that is easier.",
    },
  ] satisfies Beat[],
  constraintsLabel: "The trial runs under two constraints",
  constraints: [
    {
      title: "Build vs buy can be hybrid",
      body: "Richard asked whether this replaces the internal agentic framework running since October, or the Copilot-based agents. It does not. Mix and match: Cursor sits underneath as the mature harness, adopted incrementally across the SDLC, nothing ripped out.",
    },
    {
      title: "Cost has to be governable",
      body: "After the pilot, licensing is a token pool: a fixed annual budget in the agreement that users draw from, with controls down to the individual, model access and monthly spend caps. Placeholders can go into 2027 planning before a deal is signed; the baseline makes them real.",
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
      what: "Share competitive benchmarking and ROI material ahead of the working session.",
      when: "Before the session",
    },
    {
      owner: "Joe Masello",
      what: "Check existing Starlink paper as a base for the MSA.",
      when: "Now",
    },
    {
      owner: "Joe Masello",
      what: "Send the capabilities and funding-model summary Richard can take to his CFO.",
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
    "MineStar is twenty years of tightly coupled code: onboard robotics and offboard site management in one monolith, much of it written by the engineers who needed it rather than software developers.",
    "The deadline is fixed. Field follow with a partner customer lands March or April 2027, MineStar 2.0 goes GA at the end of 2027, and that leaves under eighteen months for modernization, new features, and validation. An internal agentic framework has been decomposing the monolith since October with real productivity gains, and the team wants to start within weeks. The open question is not whether agents work here. It is whether Cursor is faster and cheaper than the path already in motion.",
  ],
  solution: [
    {
      text: "Our proposal: Cursor as the factory inside the modernization the team already runs. Parallel agents map the monolith, extract business functions, containerize them, write the validation, and open pull requests. Engineers review and approve every cutover, and validated services go back into MineStar.",
    },
    {
      text: "The internal framework and the Copilot-based agents keep working; Cursor takes the volume underneath as the harness. Adoption is incremental across the SDLC, sized against the 2.0 roadmap in the September deep dive, not a rewrite of the program.",
    },
  ] satisfies Beat[],
  nextSteps: [
    {
      owner: "Ritesh Gupta",
      what: "Set the roadmap deep dive with Richard's team.",
      when: "September",
    },
    {
      owner: "Ritesh Gupta",
      what: "Bring Cursor in the week after, scoped against that roadmap.",
      when: "September",
    },
  ] satisfies NextStep[],
  note: null as string | null,
};

export const support = {
  id: "support",
  kicker: "Use case 2",
  title: "Product support agent framework",
  lede: "Richard's preferred first pilot. Support is reactive and manual today; the goal is proactive, with agents doing the data gathering and predictive analytics.",
  problem: [
    "Support is fully reactive and fully manual. Engineers pull reports by hand and carry the context in their heads. When a 7% grade rollback showed up on 260-ton trucks, the answer was a manual audit of every mine site.",
    "Nothing watches the data and brings findings to an engineer. Building that is greenfield work across people, process, and tools, and it is the use case Richard Green wants to pilot first.",
  ],
  solution: [
    {
      text: "Greenfield on purpose: people, process, and tools get designed rather than retrofitted. Richard Green and Matt Mansfield, product support director, are building the plan now. The goal is set: take support from reactive to proactive, with agents doing the data gathering and the predictive analytics.",
    },
    {
      text: "The 30-day trial is the proving ground: it shows whether the tooling holds up on representative work, and the consumption baseline gives the funding model real numbers. The detailed build gets scoped in Matt's plan, not guessed at here.",
    },
  ] satisfies Beat[],
  nextSteps: [
    {
      owner: "Matt Mansfield or Ritesh Gupta",
      what: "Reach out to set up the product support plan session.",
      when: "Late Aug / early Sep",
    },
  ] satisfies NextStep[],
  note: "Both use cases likely land in the same window. Support may move first.",
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
