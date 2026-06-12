import type { SignalLabel } from "../../types";
import { cn } from "../../utils/cn";
import { Badge } from "./badge";

const styles: Record<SignalLabel, { dot: string; chip: string }> = {
  "Strong signal": {
    dot: "bg-accent",
    chip: "bg-accent-soft text-accent-ink",
  },
  Promising: {
    dot: "bg-[#2f6df0]",
    chip: "bg-[#eaf0ff] text-[#1b4fc2]",
  },
  "Needs more proof": {
    dot: "bg-[#c98a00]",
    chip: "bg-[#fbf2dd] text-[#8a5e00]",
  },
  "Weak signal": {
    dot: "bg-ink-muted",
    chip: "bg-black/[0.05] text-ink-soft",
  },
};

export function SignalBadge({
  signal,
  score,
  className,
}: {
  signal: SignalLabel;
  score?: number;
  className?: string;
}) {
  const s = styles[signal];
  return (
    <Badge
      variant="secondary"
      className={cn(
        "h-auto gap-1.5 rounded-full px-2.5 py-1 text-[12px] font-medium",
        s.chip,
        className
      )}
    >
      <span className={cn("h-1.5 w-1.5 rounded-full", s.dot)} />
      {signal}
      {score != null && (
        <span className="font-semibold tabular-nums">· {score}/100</span>
      )}
    </Badge>
  );
}
