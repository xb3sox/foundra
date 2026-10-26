import { useState } from "react";
import { ArrowRight, DoorOpen } from "lucide-react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { FieldLabel, TextInput } from "../forms/Fields";
import { buildConfig } from "./commitment-config";
import { useStore } from "../../lib/store";
import { useRouter } from "../../lib/router";
import type { CommitmentType, Problem } from "../../types";

export function CommitmentModal({
  type,
  problem,
  open,
  onClose,
}: {
  type: CommitmentType | null;
  problem: Problem;
  open: boolean;
  onClose: () => void;
}) {
  const { addCommitment, setEmail, addActivity, state } = useStore();
  const { navigate } = useRouter();
  const [email, setEmailValue] = useState("");

  if (!type) return null;
  const config = buildConfig(type);
  const Icon = config.icon;

  const close = () => {
    onClose();
    setTimeout(() => setEmailValue(""), 250);
  };

  // One tap = the position is taken. Optional email gets saved with it.
  const register = () => {
    // Only log activity the first time this position is taken, so re-opening
    // an already-added position doesn't duplicate the room feed.
    const isNew = !(state.commitments[problem.id] ?? []).includes(type);
    addCommitment(problem.id, type);
    if (isNew) {
      const verb =
        type === "I have this problem"
          ? "added a problem signal"
          : type === "I can build this"
          ? "joined as a builder"
          : "added market context";
      addActivity(problem.id, `You ${verb}`);
    }
    const trimmed = email.trim();
    if (
      trimmed.length > 0 &&
      trimmed.length <= 254 &&
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)
    ) {
      setEmail(trimmed);
    }
  };

  const enterRoom = () => {
    register();
    navigate(`/rooms/${problem.id}`);
    close();
  };

  const saveOnly = () => {
    register();
    toast("Signal saved.", {
      description: "Your position is saved on this problem.",
    });
    close();
  };

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && close()}>
      <DialogContent className="bottom-0 top-auto block max-h-[92vh] w-full max-w-full translate-y-0 overflow-y-auto rounded-b-none rounded-t-3xl border border-line bg-surface p-6 text-base shadow-lift ring-0 sm:bottom-auto sm:top-1/2 sm:max-w-md sm:-translate-y-1/2 sm:rounded-3xl sm:p-7">
        <div className="mb-4 flex items-start gap-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent-soft text-accent-ink">
            <Icon className="h-5 w-5" />
          </span>
          <div>
            <DialogTitle className="text-[19px] font-semibold leading-snug tracking-tight text-ink">
              {config.title}
            </DialogTitle>
            <DialogDescription className="mt-0.5 text-[13px] text-ink-muted">
              {problem.title}
            </DialogDescription>
          </div>
        </div>

        <p className="text-[14px] leading-relaxed text-ink-soft">
          {config.blurb}
        </p>

        <div className="mt-5">
          <FieldLabel>Email (optional)</FieldLabel>
          <TextInput
            type="email"
            maxLength={254}
            placeholder="you@email.com"
            value={email}
            onChange={(e) => setEmailValue(e.target.value)}
          />
          <p className="mt-2 text-[12px] text-ink-muted">
            So we can save your spot in the room. You can skip it.
          </p>
        </div>

        <Button size="lg" className="mt-5 w-full" onClick={enterRoom}>
          <DoorOpen className="h-4 w-4" />
          Enter the Problem Room
          <ArrowRight className="h-4 w-4" />
        </Button>
        <button
          type="button"
          onClick={saveOnly}
          className="mt-3 w-full cursor-pointer rounded text-center text-[13px] font-medium text-ink-muted transition-colors hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40"
        >
          Just save my signal
        </button>
        <p className="mt-4 text-center text-[12px] text-ink-muted">
          Commitment beats likes. No public profile required.
        </p>
      </DialogContent>
    </Dialog>
  );
}
