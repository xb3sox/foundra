import { AnimatePresence, motion } from "framer-motion";
import { Check } from "lucide-react";
import { useStore } from "../../lib/store";
import { Card } from "../ui/card";
import type { Problem } from "../../types";

export function RoomChecklist({ problem }: { problem: Problem }) {
  const { toggleChecklist, getRoom } = useStore();

  const room = getRoom(problem.id);
  const baseChecklistMap = Object.fromEntries(
    problem.checklist.map((c) => [c.id, c.done])
  );
  const checklist = problem.checklist.map((c) => ({
    ...c,
    done: room?.checklist[c.id] ?? c.done,
  }));
  const doneCount = checklist.filter((c) => c.done).length;

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between">
        <h2 className="text-[17px] font-semibold tracking-tight">
          To prove
        </h2>
        <span className="text-[13px] font-medium text-ink-muted tabular-nums">
          {doneCount}/{checklist.length}
        </span>
      </div>
      <div
        role="progressbar"
        aria-label="Progress to proof"
        aria-valuenow={doneCount}
        aria-valuemin={0}
        aria-valuemax={checklist.length}
        className="mt-2 h-1.5 overflow-hidden rounded-full bg-black/[0.06]"
      >
        <motion.div
          className="h-full rounded-full bg-accent"
          animate={{
            width: `${
              checklist.length > 0 ? (doneCount / checklist.length) * 100 : 0
            }%`,
          }}
          transition={{ type: "spring", stiffness: 200, damping: 26 }}
        />
      </div>
      <ul className="mt-4 space-y-1">
        {checklist.map((c) => (
          <li key={c.id}>
            <button
              type="button"
              role="checkbox"
              aria-checked={c.done}
              aria-label={c.label}
              onClick={() =>
                toggleChecklist(problem.id, c.id, baseChecklistMap)
              }
              className="flex w-full cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40 items-center gap-3 rounded-xl px-2 py-2.5 text-left transition-colors hover:bg-black/[0.025]"
            >
              <motion.span
                animate={{
                  backgroundColor: c.done ? "#0a8f5b" : "rgba(0,0,0,0)",
                  borderColor: c.done ? "#0a8f5b" : "#e7e3da",
                }}
                className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md border"
              >
                <AnimatePresence>
                  {c.done && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                    >
                      <Check
                        className="h-3.5 w-3.5 text-white"
                        strokeWidth={3}
                      />
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.span>
              <span
                className={`text-[14px] ${
                  c.done
                    ? "text-ink-muted line-through"
                    : "text-ink"
                }`}
              >
                {c.label}
              </span>
            </button>
          </li>
        ))}
      </ul>
    </Card>
  );
}
