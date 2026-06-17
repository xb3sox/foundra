import { motion } from "framer-motion";
import { ArrowLeft, CalendarCheck, Plus } from "lucide-react";
import { toast } from "sonner";
import { getProblem } from "../data/problems";
import { useRouter } from "../lib/router";
import { useLiveCounts, useStore } from "../lib/store";
import { SignalBadge } from "../components/ui/SignalBadge";
import { SignalEvidence } from "../components/SignalEvidence";
import { RoomTriggers } from "../components/room/RoomTriggers";
import { RoomChecklist } from "../components/room/RoomChecklist";
import { RoomFirstSolution } from "../components/room/RoomFirstSolution";
import { RoomPeople } from "../components/room/RoomPeople";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { positionLabel } from "../components/modals/commitment-config";
import type { RoomStatus } from "../types";

const statusStyle: Record<RoomStatus, string> = {
  Proving: "bg-[#fbf2dd] text-[#8a5e00]",
  Building: "bg-accent-soft text-accent-ink",
  Paused: "bg-black/[0.05] text-ink-soft",
};

export function Room({ id }: { id: string }) {
  const problem = getProblem(id);
  const { navigate } = useRouter();
  const { getRoom, state, addActivity } = useStore();
  const counts = useLiveCounts(problem);

  if (!problem) {
    return (
      <div className="mx-auto max-w-3xl px-5 py-24 text-center">
        <h1 className="text-2xl font-semibold">Room not found</h1>
        <button
          type="button"
          onClick={() => navigate("/")}
          className="mt-4 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40 font-medium text-accent-ink"
        >
          Back to problems
        </button>
      </div>
    );
  }

  const room = getRoom(problem.id);
  const activity = [...(room?.activity ?? []), ...problem.activity];

  const taken = state.commitments[problem.id] ?? [];
  const positions = taken.map(positionLabel);
  const positionsText =
    positions.length <= 1
      ? positions[0]
      : `${positions.slice(0, -1).join(", ")} and ${positions[positions.length - 1]}`;
  const allMet = counts.feel >= 5 && counts.build >= 2 && counts.know >= 1;

  const bookInterview = () => {
    addActivity(problem.id, "You booked a first interview");
    toast("First interview booked.", {
      description: "Talk to one real person who has this problem this week.",
    });
  };

  return (
    <div className="mx-auto max-w-6xl px-5 py-10 sm:px-8">
      <button
        type="button"
        onClick={() => navigate(`/problems/${problem.id}`)}
        className="inline-flex cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40 items-center gap-1.5 text-[13px] font-medium text-ink-muted transition-colors hover:text-ink"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to this problem
      </button>

      {/* Room header */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-5 rounded-3xl border border-line bg-surface p-6 shadow-card sm:p-8"
      >
        <div className="flex flex-wrap items-center gap-2.5">
          <span className="text-[12px] font-medium uppercase tracking-wide text-ink-muted">
            Problem Room
          </span>
          <Badge className={`border-transparent ${statusStyle[problem.roomStatus]}`}>
            {problem.roomStatus}
          </Badge>
        </div>
        <h1 className="mt-3 text-[26px] font-semibold leading-tight tracking-tight text-balance sm:text-[32px]">
          {problem.title}
        </h1>
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <SignalBadge signal={problem.signal} score={problem.score} />
          <span className="text-[13px] font-medium text-ink-muted tabular-nums">
            <span className="text-ink-soft">{counts.feel}</span> have this ·{" "}
            <span className="text-ink-soft">{counts.build}</span> can build ·{" "}
            <span className="text-ink-soft">{counts.know}</span> know this market
          </span>
        </div>
        <div className="mt-4">
          <SignalEvidence pipeline={problem.pipeline} variant="compact" />
        </div>

        {/* Why you're here + the single next step */}
        <div className="mt-5 flex flex-col gap-3 border-t border-line/70 pt-5 sm:flex-row sm:items-center">
          <p className="text-[14px] text-ink-soft">
            {positionsText ? (
              <>
                You're here as{" "}
                <span className="font-semibold text-ink">{positionsText}</span>.
              </>
            ) : (
              "You're exploring this room. Take a position to step in fully."
            )}
          </p>
          <div className="sm:ml-auto">
            {allMet ? (
              <Button onClick={bookInterview}>
                <CalendarCheck className="h-4 w-4" />
                Book a first interview
              </Button>
            ) : (
              <Button onClick={() => navigate(`/problems/${problem.id}`)}>
                <Plus className="h-4 w-4" />
                Add your signal
              </Button>
            )}
          </div>
        </div>
      </motion.div>

      <h2 className="mt-8 text-[13px] font-medium uppercase tracking-wide text-ink-muted">
        What this problem needs to move
      </h2>
      <RoomTriggers counts={counts} />

      <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_320px]">
        {/* Main column */}
        <div className="space-y-6">
          <RoomChecklist problem={problem} />

          <RoomFirstSolution problem={problem} />
        </div>

        {/* Side column */}
        <aside className="space-y-6">
          <RoomPeople problem={problem} />

          {/* Activity log */}
          <Card className="p-5">
            <h2 className="text-[15px] font-semibold tracking-tight">
              Recent activity
            </h2>
            <ul className="mt-4 space-y-3.5">
              {activity.map((a) => (
                <li key={a.id} className="flex gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                  <div>
                    <p className="text-[13px] leading-snug text-ink">
                      {a.text}
                    </p>
                    <p className="text-[11.5px] text-ink-muted">{a.time}</p>
                  </div>
                </li>
              ))}
            </ul>
          </Card>
        </aside>
      </div>
    </div>
  );
}
