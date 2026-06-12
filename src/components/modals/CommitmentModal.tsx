import { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Heart,
  Hammer,
  Compass,
  MessageCircle,
  Table2,
  Mail,
  NotebookPen,
  FileText,
  FolderOpen,
  AppWindow,
  Ban,
} from "lucide-react";
import { Modal } from "../ui/Modal";
import { Button } from "../ui/Button";
import {
  ChipGroup,
  MultiChipGroup,
  FieldLabel,
  TextArea,
  TextInput,
  type MultiChipOption,
} from "../forms/Fields";
import type { CommitmentType, Problem } from "../../types";

// Smart presets for "What do you use today?" — the real workarounds people
// combine, so they can tap instead of type. Multi-select by design.
const TOOL_OPTIONS: MultiChipOption[] = [
  { label: "WhatsApp / chat", icon: MessageCircle },
  { label: "Spreadsheet", icon: Table2 },
  { label: "Email", icon: Mail },
  { label: "Paper / notebook", icon: NotebookPen },
  { label: "PDFs / screenshots", icon: FileText },
  { label: "Cloud drive", icon: FolderOpen },
  { label: "A dedicated tool", icon: AppWindow },
  { label: "Nothing yet", icon: Ban },
];
import { useStore } from "../../lib/store";
import { useToast } from "../ui/Toast";

interface Config {
  title: string;
  cta: string;
  icon: typeof Heart;
  questions: {
    q: string;
    kind: "text" | "chips" | "tools";
    hint?: string;
    options?: string[];
    toolOptions?: MultiChipOption[];
    placeholder?: string;
  }[];
  success: { title: string; body: string };
}

function buildConfig(type: CommitmentType, problem: Problem): Config {
  if (type === "I have this problem") {
    return {
      title: "Tell us about this problem.",
      cta: "Add my signal",
      icon: Heart,
      questions: [
        {
          q: "How often does this happen?",
          kind: "chips",
          options: ["Daily", "Weekly", "Monthly", "Rarely"],
        },
        {
          q: "What do you use today?",
          kind: "tools",
          hint: "Tap all that apply — most people combine a few.",
          toolOptions: TOOL_OPTIONS,
        },
        {
          q: "Would you pay for a better solution?",
          kind: "chips",
          options: ["Yes, definitely", "Maybe", "Not sure", "No"],
        },
      ],
      success: {
        title: "Signal added.",
        body: `You now have this problem on Foundra. ${problem.counts.build} people can build this.`,
      },
    };
  }
  if (type === "I can build this") {
    return {
      title: "Join as a builder.",
      cta: "Join as builder",
      icon: Hammer,
      questions: [
        {
          q: "What can you build?",
          kind: "chips",
          options: ["SaaS", "Automation", "Marketplace", "Mobile app", "Other"],
        },
        {
          q: "How much time can you give?",
          kind: "chips",
          options: ["Weekend", "Evenings", "Full-time"],
        },
        {
          q: "What do you need next?",
          kind: "chips",
          options: [
            "Customer interviews",
            "Cofounder",
            "First Brief",
            "Market Expert",
          ],
        },
      ],
      success: {
        title: "Builder interest saved.",
        body: `${problem.counts.feel} people have this problem.`,
      },
    };
  }
  return {
    title: "Add market context.",
    cta: "Add expertise",
    icon: Compass,
    questions: [
      {
        q: "Is this problem real?",
        kind: "text",
        placeholder: "What you've seen in this market…",
      },
      {
        q: "Who would pay?",
        kind: "text",
        placeholder: "The buyer who needs this most…",
      },
      {
        q: "What should builders avoid?",
        kind: "text",
        placeholder: "The trap to skip in a first solution…",
      },
    ],
    success: {
      title: "Market context added.",
      body: "Your context will help builders avoid the wrong first solution.",
    },
  };
}

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
  const { toast } = useToast();
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
    toast(config.success.title, config.success.body);
    setStep("email");
  };

  const onSubmitEmail = () => {
    if (email.trim()) setEmail(email.trim());
    toast("You're in the room.", "We'll keep your signal saved.");
    close();
  };

  return (
    <Modal open={open} onClose={close}>
      {step === "questions" ? (
        <div>
          <div className="mb-5 flex items-start gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent-soft text-accent-ink">
              <Icon className="h-5 w-5" />
            </span>
            <div>
              <h2 className="text-[19px] font-semibold tracking-tight">
                {config.title}
              </h2>
              <p className="mt-0.5 text-[13px] text-ink-muted">
                {problem.title}
              </p>
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
          <h2 className="mt-3 text-[19px] font-semibold tracking-tight">
            Save your signal and join the room.
          </h2>
          <p className="mt-1.5 text-sm text-ink-soft">
            Add your email so we can keep your signal and let you into the
            Problem Room. Optional — you can skip.
          </p>
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
            className="mt-3 w-full cursor-pointer text-center text-[13px] font-medium text-ink-muted transition-colors hover:text-ink"
          >
            Skip for now
          </button>
        </motion.div>
      )}
    </Modal>
  );
}
