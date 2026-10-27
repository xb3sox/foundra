import { Heart, Hammer, Compass, DoorOpen, ArrowRight } from "lucide-react";
import type { CommitmentType, Problem } from "../types";
import { Button } from "./ui/button";
import { useStore } from "../lib/store";
import { useRouter } from "../lib/router";

export function CommitmentActions({
  problem,
  onCommit,
}: {
  problem: Problem;
  onCommit: (type: CommitmentType) => void;
}) {
  const { state } = useStore();
  const { navigate } = useRouter();
  const taken = state.commitments[problem.id] ?? [];
  const hasCommitted = taken.length > 0;

  const item = (type: CommitmentType, label: string, Icon: typeof Heart) => {
    const isTaken = taken.includes(type);
    // Already-taken positions jump straight to the room instead of re-opening
    // the commit modal (which would re-log the same activity).
    return (
      <Button
        type="button"
        variant={isTaken ? "subtle" : "secondary"}
        aria-pressed={isTaken}
        aria-label={isTaken ? `${label} (Added - go to Problem Room)` : label}
        onClick={() =>
          isTaken ? navigate(`/rooms/${problem.id}`) : onCommit(type)
        }
      >
        <Icon className="h-4 w-4" />
        {isTaken ? "Added" : label}
      </Button>
    );
  };

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-2.5">
        {item("I have this problem", "I have this problem", Heart)}
        {item("I can build this", "I can build this", Hammer)}
        {item("I know this market", "I know this market", Compass)}
      </div>
      {/* The room is earned by taking a position; the door only opens once
          you've committed (no bypass). */}
      {hasCommitted && (
        <button
          type="button"
          onClick={() => navigate(`/rooms/${problem.id}`)}
          className="inline-flex cursor-pointer items-center gap-1.5 rounded text-[13px] font-medium text-accent-ink transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40"
        >
          <DoorOpen className="h-4 w-4" />
          Enter the Problem Room
          <ArrowRight className="h-3.5 w-3.5" />
        </button>
      )}
    </div>
  );
}
