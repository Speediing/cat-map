import Image from "next/image";
import { SiteNav } from "@/components/site-nav";
import { GateSplit, MinestarLoop, PlanPath, SupportFlow } from "@/components/diagrams";
import {
  footer,
  glance,
  hero,
  minestar,
  pilot,
  support,
  type Beat as BeatText,
  type NextStep,
} from "@/content/plan";

function Kicker({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[12px] font-medium uppercase tracking-[0.08em] text-orange">
      {children}
    </p>
  );
}

function Hero() {
  return (
    <section id="top" className="mx-auto max-w-6xl px-6 pt-10 pb-10 sm:px-10 sm:pt-14">
      <div className="grid items-center gap-4 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-12">
        <div>
          <Kicker>{hero.kicker}</Kicker>
          <h1 className="mt-4 max-w-[14ch] text-[2.6rem] leading-[1.04] font-medium tracking-[-0.035em] sm:text-[3.3rem]">
            {hero.title}
          </h1>
          <p className="mt-6 max-w-[40rem] text-[16px] leading-[1.62] text-ink-muted sm:text-[16.5px]">
            {hero.standfirst}
          </p>
          <p className="mt-5 font-mono text-[11.5px] text-ink-faint">{hero.meta}</p>
        </div>
        <div className="lg:-my-4">
          <Image
            src={hero.art.src}
            width={hero.art.width}
            height={hero.art.height}
            alt={hero.art.alt}
            priority
            sizes="(min-width: 1024px) 45vw, 100vw"
            className="h-auto w-full select-none mix-blend-multiply"
          />
        </div>
      </div>
    </section>
  );
}

function Glance() {
  return (
    <section id={glance.id} className="mx-auto max-w-6xl px-6 pb-16 sm:px-10 sm:pb-24">
      <Kicker>{glance.kicker}</Kicker>

      <div className="mt-5">
        <PlanPath />
      </div>

      <div className="mt-3 grid gap-3 md:grid-cols-3">
        {glance.clocks.map((clock) => (
          <div
            key={clock.label}
            className="rounded-xl border border-hairline bg-paper/80 p-5"
          >
            <div className="text-[1.55rem] font-medium tracking-[-0.02em]">
              {clock.value}
            </div>
            <div className="mt-1 text-[11px] uppercase tracking-[0.09em] text-ink-faint">
              {clock.label}
            </div>
            <p className="mt-3 text-[13.5px] leading-[1.58] text-ink-muted">
              {clock.body}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-3 grid gap-3 lg:grid-cols-2">
        {glance.lanes.map((lane) => (
          <div
            key={lane.label}
            className="flex flex-col rounded-xl border border-hairline bg-panel/45 p-5 sm:p-6"
          >
            <div className="flex items-baseline justify-between gap-3">
              <span className="font-mono text-[11px] uppercase tracking-[0.09em] text-ink-faint">
                {lane.label}
              </span>
              {lane.tag ? (
                <span className="text-[11px] font-medium uppercase tracking-[0.09em] text-orange">
                  {lane.tag}
                </span>
              ) : null}
            </div>
            <h3 className="mt-2.5 text-[1.3rem] font-medium tracking-[-0.02em]">
              {lane.title}
            </h3>
            <p className="mt-2 mb-4 text-[14px] leading-[1.6] text-ink-muted">{lane.body}</p>
            <div className="mt-auto flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 border-t border-hairline pt-3.5">
              <span className="text-[13px] text-ink">{lane.owner}</span>
              <span className="font-mono text-[11.5px] text-ink-faint">{lane.clock}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-3 grid rounded-xl border border-hairline bg-paper/80 sm:grid-cols-2">
        <div className="border-b border-hairline p-5 sm:border-r sm:border-b-0 sm:p-6">
          <h3 className="text-[11px] uppercase tracking-[0.09em] text-ink-faint">
            {glance.gate.held.title}
          </h3>
          <ul className="mt-4 space-y-3">
            {glance.gate.held.items.map((item) => (
              <li key={item} className="flex gap-3 text-[13.5px] leading-[1.55] text-ink-muted">
                <span
                  aria-hidden
                  className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-[1px] border border-hairline-strong"
                />
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="p-5 sm:p-6">
          <h3 className="text-[11px] uppercase tracking-[0.09em] text-ink-faint">
            {glance.gate.moving.title}
          </h3>
          <ul className="mt-4 space-y-3">
            {glance.gate.moving.items.map((item) => (
              <li
                key={item.what}
                className="flex items-baseline justify-between gap-4 text-[13.5px] leading-[1.55]"
              >
                <span className="text-ink-muted">{item.what}</span>
                <span className="shrink-0 font-mono text-[11.5px] text-ink-faint">
                  {item.owner}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function DrillSection({
  id,
  kicker,
  title,
  lede,
  children,
}: {
  id: string;
  kicker: string;
  title: string;
  lede: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="border-t border-hairline">
      <div className="mx-auto max-w-6xl px-6 py-14 sm:px-10 sm:py-20">
        <Kicker>{kicker}</Kicker>
        <h2 className="mt-3 max-w-[26ch] text-[1.8rem] leading-[1.08] font-medium tracking-[-0.03em] sm:text-[2.2rem]">
          {title}
        </h2>
        <p className="mt-4 max-w-[42rem] text-[15px] leading-[1.6] text-ink-muted sm:text-[15.5px]">
          {lede}
        </p>
        <div className="mt-10 sm:mt-12">{children}</div>
      </div>
    </section>
  );
}

function BeatRow({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="grid gap-4 border-t border-hairline py-8 sm:py-9 lg:grid-cols-[10rem_minmax(0,1fr)] lg:gap-12">
      <div className="pt-0.5 text-[12px] uppercase tracking-[0.09em] text-ink-faint">
        {label}
      </div>
      <div className="min-w-0">{children}</div>
    </div>
  );
}

function Paragraphs({ items }: { items: string[] }) {
  return (
    <div className="max-w-[44rem] space-y-4">
      {items.map((text) => (
        <p key={text.slice(0, 24)} className="text-[15px] leading-[1.65] text-ink-muted">
          {text}
        </p>
      ))}
    </div>
  );
}

function SolutionBeats({ beats }: { beats: BeatText[] }) {
  return (
    <div className="max-w-[44rem] space-y-4">
      {beats.map((beat) => (
        <p key={beat.text.slice(0, 24)} className="text-[15px] leading-[1.65]">
          {beat.lead ? <span className="font-medium text-ink">{beat.lead} </span> : null}
          <span className="text-ink-muted">{beat.text}</span>
        </p>
      ))}
    </div>
  );
}

function NextStepsList({ steps, note }: { steps: NextStep[]; note?: string | null }) {
  return (
    <div className="max-w-[48rem]">
      <ul>
        {steps.map((step) => (
          <li
            key={step.what}
            className="grid gap-1 border-b border-hairline py-3.5 first:pt-0 last:border-0 sm:grid-cols-[11.5rem_minmax(0,1fr)_10rem] sm:gap-6"
          >
            <div className="text-[13.5px] font-medium text-ink">{step.owner}</div>
            <div className="text-[14px] leading-[1.55] text-ink-muted">{step.what}</div>
            <div className="font-mono text-[11.5px] leading-[1.7] text-ink-faint sm:text-right">
              {step.when}
            </div>
          </li>
        ))}
      </ul>
      {note ? <p className="mt-5 text-[13px] text-ink-faint">{note}</p> : null}
    </div>
  );
}

function PilotSection() {
  return (
    <DrillSection id={pilot.id} kicker={pilot.kicker} title={pilot.title} lede={pilot.lede}>
      <BeatRow label="Problem">
        <Paragraphs items={pilot.problem} />
      </BeatRow>
      <BeatRow label="Solution">
        <SolutionBeats beats={[pilot.solution[0]]} />
        <div className="mt-6">
          <GateSplit />
        </div>
        <div className="mt-6">
          <SolutionBeats beats={pilot.solution.slice(1)} />
        </div>
        <div className="mt-9 max-w-[48rem]">
          <div className="text-[11px] uppercase tracking-[0.09em] text-ink-faint">
            {pilot.constraintsLabel}
          </div>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            {pilot.constraints.map((constraint) => (
              <div
                key={constraint.title}
                className="rounded-xl border border-hairline bg-panel/45 p-5"
              >
                <h4 className="text-[14.5px] font-medium">{constraint.title}</h4>
                <p className="mt-2 text-[13.5px] leading-[1.6] text-ink-muted">
                  {constraint.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </BeatRow>
      <BeatRow label="Next steps">
        <NextStepsList steps={pilot.nextSteps} />
      </BeatRow>
    </DrillSection>
  );
}

function UseCaseSection({
  data,
  diagram,
}: {
  data: {
    id: string;
    kicker: string;
    title: string;
    lede: string;
    problem: string[];
    solution: BeatText[];
    nextSteps: NextStep[];
    note: string | null;
  };
  diagram?: React.ReactNode;
}) {
  return (
    <DrillSection id={data.id} kicker={data.kicker} title={data.title} lede={data.lede}>
      <BeatRow label="Problem">
        <Paragraphs items={data.problem} />
      </BeatRow>
      <BeatRow label="Solution">
        {diagram ? <div className="mb-6">{diagram}</div> : null}
        <SolutionBeats beats={data.solution} />
      </BeatRow>
      <BeatRow label="Next steps">
        <NextStepsList steps={data.nextSteps} note={data.note} />
      </BeatRow>
    </DrillSection>
  );
}

function SiteFooter() {
  return (
    <footer className="border-t border-hairline">
      <div className="mx-auto max-w-6xl px-6 py-12 sm:px-10 sm:py-16">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)_minmax(0,0.7fr)]">
          <div>
            <div className="flex items-center gap-2.5">
              <span aria-hidden className="h-2 w-2 rounded-[2px] bg-cat-yellow" />
              <span className="text-[13.5px] font-medium tracking-[-0.01em]">
                Caterpillar <span className="text-ink-faint">×</span> Cursor
              </span>
            </div>
            <p className="mt-4 max-w-[26rem] text-[13px] leading-[1.6] text-ink-faint">
              {footer.line}
            </p>
          </div>
          <div>
            <h3 className="text-[11px] uppercase tracking-[0.09em] text-ink-faint">
              {footer.workingGroupLabel} · {footer.caterpillar.label}
            </h3>
            <ul className="mt-3 grid grid-cols-2 gap-x-6 gap-y-1.5">
              {footer.caterpillar.people.map((person) => (
                <li key={person} className="text-[13px] text-ink-muted">
                  {person}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-[11px] uppercase tracking-[0.09em] text-ink-faint">
              {footer.cursor.label}
            </h3>
            <ul className="mt-3 space-y-1.5">
              {footer.cursor.people.map((person) => (
                <li key={person} className="text-[13px] text-ink-muted">
                  {person}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default function Page() {
  return (
    <>
      <SiteNav />
      <main>
        <Hero />
        <Glance />
        <PilotSection />
        <UseCaseSection data={support} diagram={<SupportFlow />} />
        <UseCaseSection data={minestar} diagram={<MinestarLoop />} />
      </main>
      <SiteFooter />
    </>
  );
}
