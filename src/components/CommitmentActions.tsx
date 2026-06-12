import { Heart, Hammer, Compass, DoorOpen } from "lucide-react";
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

  const item = (type: CommitmentType, label: string, Icon: typeof Heart) => {
    const isTaken = taken.includes(type);
    return (
      <Button
        variant={isTaken ? "subtle" : "secondary"}
        onClick={() => onCommit(type)}
      >
        <Icon className="h-4 w-4" />
        {isTaken ? "Added" : label}
      </Button>
    );
  };

  return (
    <div className="flex flex-wrap gap-2.5">
      {item("I have this problem", "I have this problem", Heart)}
      {item("I can build this", "I can build this", Hammer)}
      {item("I know this market", "I know this market", Compass)}
      <Button onClick={() => navigate(`/rooms/${problem.id}`)}>
        <DoorOpen className="h-4 w-4" />
        Join Problem Room
      </Button>
    </div>
  );
}
