import { Heart, Hammer, Compass } from "lucide-react";
import { getRoleIcon } from "../../lib/role-icons";
import type { Problem } from "../../types";

export function PeopleSection({
  problem,
  counts,
}: {
  problem: Problem;
  counts: { feel: number; build: number; know: number };
}) {
  return (
    <>
      <div className="grid gap-3 sm:grid-cols-3">
        <PeopleStat icon={Heart} count={counts.feel} label="Have this problem" />
        <PeopleStat icon={Hammer} count={counts.build} label="Can build this" />
        <PeopleStat icon={Compass} count={counts.know} label="Market Experts" />
      </div>
      <div className="mt-3 grid gap-3 sm:grid-cols-3">
        {problem.people.map((person) => {
          const Icon = getRoleIcon(person.role);
          return (
            <div
              key={person.name}
              className="rounded-2xl border border-line bg-surface p-4 shadow-card"
            >
              <div className="flex items-center gap-2">
                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-accent-soft text-accent-ink">
                  <Icon className="h-3.5 w-3.5" />
                </span>
                <span className="text-[14px] font-semibold">
                  {person.name}
                </span>
              </div>
              <p className="mt-2 text-[12px] font-medium text-ink-muted">
                {person.role}
              </p>
              <p className="text-[13px] text-ink-soft">{person.detail}</p>
            </div>
          );
        })}
      </div>
    </>
  );
}

function PeopleStat({
  icon: Icon,
  count,
  label,
}: {
  icon: typeof Heart;
  count: number;
  label: string;
}) {
  return (
    <div className="rounded-2xl border border-line bg-surface p-4 text-center shadow-card">
      <Icon className="mx-auto h-4 w-4 text-accent" />
      <p className="mt-2 text-2xl font-semibold tabular-nums">{count}</p>
      <p className="text-[12.5px] text-ink-soft">{label}</p>
    </div>
  );
}
