import { pocCalendar, pocSuccessCriteria } from "@/content/plan";

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
      <ol className="grid md:grid-cols-2">
        {pocCalendar.weeks.map((item) => (
          <li
            key={item.week}
            className="border-t border-hairline p-5 first:border-t-0 md:[&:nth-child(2)]:border-t-0 md:[&:nth-child(even)]:border-l"
          >
            <span className="font-mono text-[10.5px] uppercase tracking-[0.08em] text-orange">
              {item.week}
            </span>
            <h3 className="mt-2 text-[15px] font-medium text-ink">{item.title}</h3>
            <p className="mt-2 text-[13px] leading-[1.6] text-ink-muted">{item.text}</p>
          </li>
        ))}
      </ol>
    </figure>
  );
}

export function PlanBoard() {
  return (
    <div className="space-y-3">
      <PocCalendar />

      <figure className="overflow-hidden rounded-xl border border-hairline bg-paper/80">
        <figcaption className="flex flex-wrap items-baseline justify-between gap-2 border-b border-hairline px-5 py-4 text-[11px] uppercase tracking-[0.09em] text-ink-faint">
          <span>{pocSuccessCriteria.caption}</span>
          <span className="font-mono text-[10px] normal-case tracking-normal">
            Requirement · How you can tell
          </span>
        </figcaption>
        <ul className="grid sm:grid-cols-2">
          {pocSuccessCriteria.items.map((item) => (
            <li
              key={item.requirement}
              className="grid gap-1.5 border-t border-hairline p-5 first:border-t-0 sm:grid-cols-[9rem_minmax(0,1fr)] sm:gap-4 sm:[&:nth-child(2)]:border-t-0 sm:[&:nth-child(even)]:border-l"
            >
              <h3 className="text-[13px] font-medium text-ink">{item.requirement}</h3>
              <p className="text-[13px] leading-[1.6] text-ink-muted">{item.evidence}</p>
            </li>
          ))}
        </ul>
      </figure>
    </div>
  );
}
