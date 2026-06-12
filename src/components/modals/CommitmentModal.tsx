import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "../ui/dialog";
import { Button } from "../ui/button";
import {
  ChipGroup,
  MultiChipGroup,
  FieldLabel,
  TextArea,
  TextInput,
} from "../forms/Fields";
import { buildConfig } from "./commitment-config";
import { useStore } from "../../lib/store";
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
  const { addCommitment, setEmail, addActivity } = useStore();
  const [answers, setAnswers] = useState<Record<number, string | string[]>>({});
  const [step, setStep] = useState<"questions" | "email">("questions");
  const [email, setEmailValue] = useState("");

  if (!type) return null;
  const config = buildConfig(type, problem);
  const Icon = config.icon;

  const reset = () => {
    setAnswers({});
    setStep("questions");
    setEmailValue("");
  };

  const close = () => {
    onClose();
    setTimeout(reset, 250);
  };

  const onSubmitQuestions = () => {
    addCommitment(problem.id, type);
    const verb =
      type === "I have this problem"
        ? "added a problem signal"
        : type === "I can build this"
        ? "joined as a builder"
        : "added market context";
    addActivity(problem.id, `You ${verb}`);
    toast(config.success.title, { description: config.success.body });
    setStep("email");
  };

  const onSubmitEmail = () => {
    if (email.trim()) setEmail(email.trim());
    toast("You're in the room.", {
      description: "We'll keep your signal saved.",
    });
    close();
  };

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && close()}>
      <DialogContent className="bottom-0 top-auto block max-h-[92vh] w-full max-w-full translate-y-0 overflow-y-auto rounded-b-none rounded-t-3xl border border-line bg-surface p-6 text-base shadow-lift ring-0 sm:bottom-auto sm:top-1/2 sm:max-w-md sm:-translate-y-1/2 sm:rounded-3xl sm:p-7">
        {step === "questions" ? (
        <div>
          <div className="mb-5 flex items-start gap-3">
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

          <div className="space-y-5">
            {config.questions.map((question, i) => (
              <div key={i}>
                <FieldLabel index={i + 1}>{question.q}</FieldLabel>
                {question.hint && (
                  <p className="-mt-1 mb-2.5 text-[12.5px] text-ink-muted">
                    {question.hint}
                  </p>
                )}
                {question.kind === "chips" ? (
                  <ChipGroup
                    options={question.options ?? []}
                    value={(answers[i] as string) ?? ""}
                    onChange={(v) => setAnswers((a) => ({ ...a, [i]: v }))}
                  />
                ) : question.kind === "tools" ? (
                  <MultiChipGroup
                    options={question.toolOptions ?? []}
                    value={(answers[i] as string[]) ?? []}
                    onChange={(v) => setAnswers((a) => ({ ...a, [i]: v }))}
                  />
                ) : (
                  <TextArea
                    rows={2}
                    placeholder={question.placeholder}
                    value={(answers[i] as string) ?? ""}
                    onChange={(e) =>
                      setAnswers((a) => ({ ...a, [i]: e.target.value }))
                    }
                  />
                )}
              </div>
            ))}
          </div>

          <Button
            size="lg"
            className="mt-6 w-full"
            onClick={onSubmitQuestions}
          >
            {config.cta}
            <ArrowRight className="h-4 w-4" />
          </Button>
          <p className="mt-3 text-center text-[12px] text-ink-muted">
            Commitment beats likes. No public profile required.
          </p>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <div className="mb-1 flex h-10 w-10 items-center justify-center rounded-xl bg-accent-soft text-accent-ink">
            <Icon className="h-5 w-5" />
          </div>
          <DialogTitle className="mt-3 text-[19px] font-semibold leading-snug tracking-tight text-ink">
            Save your signal and join the room.
          </DialogTitle>
          <DialogDescription className="mt-1.5 text-sm text-ink-soft">
            Add your email so we can keep your signal and let you into the
            Problem Room. Optional — you can skip.
          </DialogDescription>
          <div className="mt-5">
            <FieldLabel>Email</FieldLabel>
            <TextInput
              type="email"
              placeholder="you@email.com"
              value={email}
              onChange={(e) => setEmailValue(e.target.value)}
            />
          </div>
          <Button size="lg" className="mt-5 w-full" onClick={onSubmitEmail}>
            Save and continue
            <ArrowRight className="h-4 w-4" />
          </Button>
          <button
            onClick={close}
            className="mt-3 w-full cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40 text-center text-[13px] font-medium text-ink-muted transition-colors hover:text-ink"
          >
            Skip for now
          </button>
        </motion.div>
        )}
      </DialogContent>
    </Dialog>
  );
}
