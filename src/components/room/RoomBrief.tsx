import { AnimatePresence, motion } from "framer-motion";
import {
  FileText,
  Sparkles,
  Lightbulb,
  Users,
  XOctagon,
  Megaphone,
  Tag,
} from "lucide-react";
import { toast } from "sonner";
import { useStore } from "../../lib/store";
import { Button } from "../ui/button";
import type { Problem } from "../../types";

export function RoomBrief({ problem }: { problem: Problem }) {
  const { addActivity, setBriefCreated, getRoom } = useStore();

  const briefCreated = getRoom(problem.id)?.briefCreated ?? false;
  const fv = problem.firstVersion;

  const handleCreateBrief = () => {
    setBriefCreated(problem.id);
    addActivity(problem.id, "First Brief generated");
    toast("Brief created.", {
      description: "A First Brief is ready in the room.",
    });
  };

  return (
    <div className="rounded-2xl border border-line bg-surface p-6 shadow-card">
      <div className="flex items-center justify-between">
        <h2 className="text-[17px] font-semibold tracking-tight">
          First Brief
        </h2>
        {!briefCreated && (
          <Button size="sm" onClick={handleCreateBrief}>
            <Sparkles className="h-3.5 w-3.5" />
            Create Brief
          </Button>
        )}
      </div>

      <AnimatePresence mode="wait">
        {briefCreated ? (
          <motion.div
            key="brief"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 grid gap-3 sm:grid-cols-2"
          >
            <BriefRow icon={Users} label="Who it is for" value={fv.forWho} />
            <BriefRow icon={Lightbulb} label="Problem to solve" value={problem.pain} />
            <BriefRow icon={Sparkles} label="First feature" value={fv.firstFeature} wide />
            <BriefRow icon={XOctagon} label="What to avoid" value={fv.avoid} />
            <BriefRow icon={Megaphone} label="How to find first users" value={fv.findUsers} />
            <BriefRow icon={Tag} label="Pricing guess" value={fv.pricing} wide />
          </motion.div>
        ) : (
          <motion.div
            key="empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="mt-4 rounded-xl border border-dashed border-line bg-bg/50 p-6 text-center"
          >
            <FileText className="mx-auto h-6 w-6 text-ink-muted" />
            <p className="mt-2 text-[14px] text-ink-soft">
              No brief yet. Create one to turn the signals into a clear
              first solution.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function BriefRow({
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
