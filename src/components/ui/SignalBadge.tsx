import type { SignalLabel } from "../../types";
import { cn } from "../../utils/cn";

const styles: Record<SignalLabel, { dot: string; text: string; bg: string }> = {
  "Strong signal": {
    dot: "bg-accent",
    text: "text-accent-ink",
    bg: "bg-accent-soft",
  },
  Promising: {
    dot: "bg-[#2f6df0]",
    text: "text-[#1b4fc2]",
    bg: "bg-[#eaf0ff]",
  },
  "Needs more proof": {
    dot: "bg-[#c98a00]",
    text: "text-[#8a5e00]",
    bg: "bg-[#fbf2dd]",
  },
  "Weak signal": {
    dot: "bg-ink-muted",
    text: "text-ink-soft",
    bg: "bg-black/[0.05]",
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
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[12px] font-medium",
        s.bg,
        s.text,
        className
      )}
    >
      <span className={cn("h-1.5 w-1.5 rounded-full", s.dot)} />
      {signal}
      {score != null && (
        <span className="font-semibold tabular-nums">· {score}/100</span>
      )}
    </span>
  );
}
