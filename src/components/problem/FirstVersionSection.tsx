import { Lightbulb, Users, XOctagon, Megaphone, Tag } from "lucide-react";
import { Card } from "../ui/card";
import type { Problem } from "../../types";

export function FirstVersionSection({ fv }: { fv: Problem["firstVersion"] }) {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      <FvCard icon={Lightbulb} label="First feature" value={fv.firstFeature} wide />
      <FvCard icon={Users} label="Who it is for" value={fv.forWho} />
      <FvCard icon={XOctagon} label="What to avoid" value={fv.avoid} />
      <FvCard icon={Megaphone} label="How to find first users" value={fv.findUsers} />
      <FvCard icon={Tag} label="Pricing guess" value={fv.pricing} />
    </div>
  );
}

function FvCard({
  icon: Icon,
  label,
  value,
  wide,
}: {
  icon: typeof Lightbulb;
  label: string;
  value: string;
  wide?: boolean;
}) {
  return (
    <Card className={`h-full p-5 ${wide ? "sm:col-span-2" : ""}`}>
      <div className="flex items-center gap-2 text-[12.5px] font-medium text-ink-muted">
        <Icon className="h-4 w-4" />
        {label}
      </div>
      <p className="mt-2 text-[14px] leading-relaxed text-ink">{value}</p>
    </Card>
  );
}
