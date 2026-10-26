import { memo } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Heart,
  Hammer,
  Radar,
  type LucideIcon,
} from "lucide-react";
import type { CommitmentType, Problem } from "../../types";
import { useRouter } from "../../lib/router";
import { useLiveCounts, useStore } from "../../lib/store";
import { SignalBadge } from "../ui/SignalBadge";

/**
 * Performance Optimization:
 * Wrap ProblemCard with React.memo to prevent unnecessary re-renders of cards
 * when parent state (such as filter inputs) updates or non-interactive state changes.
 */
export const ProblemCard = memo(function ProblemCard({
  problem,
  index,
  onCommit,
}: {
  problem: Problem;
  index: number;
  onCommit: (type: CommitmentType) => void;
}) {
  const { navigate } = useRouter();
  const { state } = useStore();
  const counts = useLiveCounts(problem);
  const taken = state.commitments[problem.id] ?? [];

  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08, duration: 0.4, ease: "easeOut" }}
      whileHover={{ y: -4 }}
      className="group flex h-full flex-col rounded-2xl border border-line bg-surface p-5 shadow-card transition-shadow hover:shadow-lift sm:p-6"
    >
      {/* META ROW - ONE LINE: industry + signal badge + signal count.
          The #1 cause of crowding was too many top-of-card chrome lines. */}
      <div className="flex flex-wrap items-center gap-x-2 gap-y-1.5 text-[12px]">
        <span className="min-w-0 truncate font-medium uppercase tracking-wide text-ink-muted">
          {problem.industry}
        </span>
        <SignalBadge signal={problem.signal} />
        <span className="ml-auto inline-flex items-center gap-1 text-ink-muted">
          <Radar className="h-3.5 w-3.5 text-accent" />
          {problem.pipeline.signalCount} signals
        </span>
      </div>

      {/* TITLE + PAIN - kept spacious; the primary read. */}
      <button
        onClick={() => navigate(`/problems/${problem.id}`)}
        className="mt-4 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40 text-left"
      >
        <h3 className="text-[18px] font-semibold leading-snug tracking-tight text-ink text-balance line-clamp-2 sm:text-[19px]">
          {problem.title}
        </h3>
      </button>
      <p className="mt-1.5 text-[14px] leading-relaxed text-ink-soft line-clamp-2">
        {problem.pain}
      </p>

      {/* COUNTS LINE - ONE ROW, tight.
          Per spec, cards show only: "12 have this problem · 4 can build this".
          "know this market" lives on the detail page. */}
      <div className="mt-4 flex flex-wrap items-center gap-x-1.5 gap-y-0.5 text-[12.5px] font-medium text-ink-muted tabular-nums">
        <span className="text-ink-soft">{counts.feel}</span> have this problem
        <span className="text-line">·</span>
        <span className="text-ink-soft">{counts.build}</span> can build this
      </div>

      {/* ACTION BAR - the Linear/Vercel pattern:
          - Primary action on the left (View)
          - Two short-label commitment chips (icon + "Have it" / "Can build")
          - Full commitment sentences revealed on hover/focus via aria-label + title
        Icon + short label keeps it compact on every breakpoint while
        remaining discoverable - icon-only would be silent on mobile. */}
      {/* `mt-auto` pins the action bar to the bottom of every card,
          so all three cards in a row line up perfectly regardless of how
          much text is above them. */}
      <div className="mt-auto flex items-center gap-2 border-t border-line/70 pt-4">
        <button
          onClick={() => navigate(`/problems/${problem.id}`)}
          aria-label="View problem"
          className="inline-flex cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40 items-center justify-center gap-1 whitespace-nowrap rounded-[10px] bg-ink px-3.5 py-2 text-[12.5px] font-medium text-white transition-colors hover:bg-black"
        >
          View
          <ArrowRight className="h-3.5 w-3.5" />
        </button>

        <div className="ml-auto flex items-center gap-1.5">
          <CommitChip
            icon={Heart}
            label="I have this problem"
            shortLabel="Have it"
            active={taken.includes("I have this problem")}
            onClick={() => onCommit("I have this problem")}
          />
          <CommitChip
            icon={Hammer}
            label="I can build this"
            shortLabel="Can build"
            active={taken.includes("I can build this")}
            onClick={() => onCommit("I can build this")}
          />
        </div>
      </div>
    </motion.article>
  );
});

function CommitChip({
  icon: Icon,
  label,
  shortLabel,
  active,
  onClick,
}: {
  icon: LucideIcon;
  label: string;
  shortLabel: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      aria-label={label}
      title={label}
      className={
        "group inline-flex cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40 items-center justify-center gap-1.5 rounded-[10px] border px-2.5 py-2 text-[12.5px] font-medium transition-colors " +
        (active
          ? "border-accent/40 bg-accent-soft text-accent-ink"
          : "border-line text-ink-soft hover:border-ink/30 hover:text-ink")
      }
    >
      <Icon className="h-3.5 w-3.5 shrink-0" />
      {/* Short visible label on every breakpoint - never silent.
          `title` reveals the full sentence on hover or focus. */}
      <span className="whitespace-nowrap">{shortLabel}</span>
    </button>
  );
}
