import { Heart, Hammer, Compass } from "lucide-react";
import { initials } from "../../lib/initials";
import { Avatar, AvatarFallback } from "../ui/avatar";
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
      <div className="grid grid-cols-3 divide-x divide-line overflow-hidden rounded-2xl border border-line">
        <PeopleStat icon={Heart} count={counts.feel} label="Have this" />
        <PeopleStat icon={Hammer} count={counts.build} label="Can build" />
        <PeopleStat icon={Compass} count={counts.know} label="Know market" />
      </div>
      <ul className="mt-5 space-y-3.5">
        {problem.people.map((person) => (
          <li key={person.name} className="flex items-center gap-3">
            <Avatar className="h-9 w-9">
              <AvatarFallback>{initials(person.name)}</AvatarFallback>
            </Avatar>
            <div className="min-w-0">
              <p className="truncate text-[14px] font-semibold text-ink">
                {person.name}
              </p>
              <p className="truncate text-[13px] text-ink-soft">
                {person.role} · {person.detail}
              </p>
            </div>
          </li>
        ))}
      </ul>
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
    <div className="bg-surface p-4 text-center">
      <Icon className="mx-auto h-4 w-4 text-accent" />
      <p className="mt-2 text-2xl font-semibold tabular-nums">{count}</p>
      <p className="text-[12.5px] text-ink-soft">{label}</p>
    </div>
  );
}
