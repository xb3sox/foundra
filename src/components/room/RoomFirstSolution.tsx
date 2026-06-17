import { Lightbulb, Users, Sparkles, XOctagon, Megaphone, Tag } from "lucide-react";
import { Card } from "../ui/card";
import type { Problem } from "../../types";

/** Read-only "first solution to test" - the same firstVersion data the
    problem page shows, surfaced in the room as what the team is building.
    No generation step: the plan is already here. */
export function RoomFirstSolution({ problem }: { problem: Problem }) {
  const fv = problem.firstVersion;
  return (
    <Card className="p-6">
      <h2 className="text-[17px] font-semibold tracking-tight">
        First solution to test
      </h2>
      <p className="mt-1 text-[13.5px] text-ink-soft">
        The smallest thing worth building to learn if this is real.
      </p>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <Tile icon={Sparkles} label="First feature" value={fv.firstFeature} wide />
        <Tile icon={Users} label="Who it is for" value={fv.forWho} />
        <Tile icon={Lightbulb} label="Problem to solve" value={problem.pain} />
        <Tile icon={XOctagon} label="What to avoid" value={fv.avoid} />
        <Tile icon={Megaphone} label="How to find first users" value={fv.findUsers} />
        <Tile icon={Tag} label="Pricing guess" value={fv.pricing} wide />
      </div>
    </Card>
  );
}

function Tile({
  icon: Icon,
  label,
  value,
  wide,
}: {
  icon: typeof Users;
  label: string;
  value: string;
  wide?: boolean;
}) {
  return (
    <div
      className={`rounded-xl border border-line bg-bg/40 p-4 ${
        wide ? "sm:col-span-2" : ""
      }`}
    >
      <div className="flex items-center gap-2 text-[12px] font-medium text-ink-muted">
        <Icon className="h-3.5 w-3.5" />
        {label}
      </div>
      <p className="mt-1.5 text-[13.5px] leading-relaxed text-ink">{value}</p>
    </div>
  );
}
