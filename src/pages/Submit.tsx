import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
  AlertCircle,
  FileText,
  Radar,
  UserRound,
  Check,
  MessageCircle,
  Table2,
  NotebookPen,
  Mail,
  AppWindow,
  Ban,
  Heart,
  Hammer,
  Compass,
} from "lucide-react";
import { useRouter } from "../lib/router";
import { Button } from "../components/ui/button";
import {
  ChipGroup,
  MultiChipGroup,
  TextArea,
  TextInput,
  type MultiChipOption,
} from "../components/forms/Fields";
import { SignalBadge } from "../components/ui/SignalBadge";
import { cn } from "../utils/cn";

interface FormState {
  problem: string;
  industry: string;
  who: string;
  today: string;
  useNow: string[];
  painful: string;
  proofType: string[];
  proof: string;
  link: string;
  role: string;
}

const empty: FormState = {
  problem: "",
  industry: "",
  who: "",
  today: "",
  useNow: [],
  painful: "",
  proofType: [],
  proof: "",
  link: "",
  role: "",
};

const INDUSTRIES = [
  "Interior Design",
  "Healthcare",
  "Freelancing",
  "Logistics",
  "Education",
  "Food & Beverage",
  "Real Estate",
  "Beauty & Wellness",
  "Other",
];

const TOOL_OPTIONS: MultiChipOption[] = [
  { label: "WhatsApp / chat", icon: MessageCircle },
  { label: "Spreadsheet", icon: Table2 },
  { label: "Email", icon: Mail },
  { label: "Paper / notebook", icon: NotebookPen },
  { label: "A dedicated tool", icon: AppWindow },
  { label: "Nothing yet", icon: Ban },
];

const PROOF_TYPES: MultiChipOption[] = [
  { label: "I live with it", icon: Heart },
  { label: "I saw it in my market", icon: Compass },
  { label: "Interviews", icon: MessageCircle },
  { label: "Forum threads", icon: Hammer },
  { label: "Reviews / job posts", icon: FileText },
];

const ROLES = [
  { value: "I have this problem", icon: Heart },
  { value: "I know this market", icon: Compass },
  { value: "I can build this", icon: Hammer },
];

type StepId = 0 | 1 | 2;

const STEPS = [
  { id: 0, title: "The problem", icon: FileText },
  { id: 1, title: "The proof", icon: Radar },
  { id: 2, title: "You", icon: UserRound },
] as const;

export function Submit() {
  const { navigate } = useRouter();
  const [form, setForm] = useState<FormState>(empty);
  const [step, setStep] = useState<StepId>(0);
  const [submitted, setSubmitted] = useState(false);
  const [showErrors, setShowErrors] = useState(false);

  const set = <K extends keyof FormState>(k: K, v: FormState[K]) =>
    setForm((f) => ({ ...f, [k]: v }));

  // Per-step required fields
  const stepErrors = useMemo(() => {
    const e: Record<string, string> = {};
    if (step === 0) {
      if (form.problem.trim().length < 12)
        e.problem = "Describe the problem in a full sentence (12+ characters).";
      if (!form.industry) e.industry = "Pick an industry.";
      if (!form.who.trim()) e.who = "Who exactly has this problem?";
      if (!form.painful.trim()) e.painful = "Tell us why it hurts.";
    }
    if (step === 1) {
      if (form.proofType.length === 0)
        e.proofType = "Pick at least one source of proof.";
      if (form.proof.trim().length < 10)
        e.proof = "A sentence on how you know it's real keeps Foundra honest.";
    }
    if (step === 2) {
      if (!form.role) e.role = "Tell us how you relate to this problem.";
    }
    return e;
  }, [form, step]);

  const stepValid = Object.keys(stepErrors).length === 0;

  const next = () => {
    if (!stepValid) {
      setShowErrors(true);
      return;
    }
    setShowErrors(false);
    if (step < 2) setStep((s) => (s + 1) as StepId);
    else {
      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const back = () => {
    setShowErrors(false);
    if (step > 0) setStep((s) => (s - 1) as StepId);
  };

  // Overall completeness for the live preview
  const completeness = useMemo(() => {
    const checks = [
      form.problem.trim().length >= 12,
      !!form.industry,
      !!form.who.trim(),
      !!form.today.trim(),
      form.useNow.length > 0,
      !!form.painful.trim(),
      form.proofType.length > 0,
      form.proof.trim().length >= 10,
      !!form.role,
    ];
    return Math.round(
      (checks.filter(Boolean).length / checks.length) * 100
    );
  }, [form]);

  /* ---------- Success ---------- */
  if (submitted) {
    return (
      <div className="mx-auto max-w-xl px-5 py-24 text-center sm:px-8">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-accent-soft text-accent-ink"
        >
          <CheckCircle2 className="h-8 w-8" />
        </motion.div>
        <h1 className="mt-6 text-[28px] font-semibold tracking-tight">
          Thanks. We'll review the problem.
        </h1>
        <p className="mt-3 text-[16px] leading-relaxed text-ink-soft">
          We read every submission, check it against existing problems, and
          gather more signals before publishing. Nothing goes live
          automatically — Foundra stays curated.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button onClick={() => navigate("/")}>
            Back to problems
            <ArrowRight className="h-4 w-4" />
          </Button>
          <Button
            variant="secondary"
            onClick={() => {
              setForm(empty);
              setStep(0);
              setSubmitted(false);
            }}
          >
            Submit another
          </Button>
        </div>
      </div>
    );
  }

  /* ---------- Form ---------- */
  return (
    <div className="mx-auto max-w-5xl px-5 py-10 sm:px-8">
      <button
        onClick={() => navigate("/")}
        className="inline-flex cursor-pointer items-center gap-1.5 text-[13px] font-medium text-ink-muted transition-colors hover:text-ink"
      >
        <ArrowLeft className="h-4 w-4" />
        Today's problems
      </button>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-6"
      >
        <h1 className="text-[32px] font-semibold tracking-tight">
          Submit a real problem
        </h1>
        <p className="mt-3 max-w-xl text-[16px] leading-relaxed text-ink-soft">
          Tell us about a painful workflow you have seen or experienced. We
          review every submission before publishing.
        </p>
        <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3 py-1.5 text-[12.5px] font-medium text-ink-soft">
          <ShieldCheck className="h-3.5 w-3.5 text-accent" />
          No random ideas. Every problem needs proof.
        </div>
      </motion.div>

      {/* Stepper */}
      <div className="mt-8 flex items-center gap-2">
        {STEPS.map((s, i) => {
          const Icon = s.icon;
          const active = step === s.id;
          const done = step > s.id;
          return (
            <div key={s.id} className="flex flex-1 items-center gap-2">
              <button
                type="button"
                onClick={() => done && setStep(s.id as StepId)}
                className={cn(
                  "flex items-center gap-2.5 rounded-xl px-1 py-1 text-left",
                  done && "cursor-pointer"
                )}
              >
                <span
                  className={cn(
                    "flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-colors",
                    active && "border-ink bg-ink text-white",
                    done && "border-accent bg-accent text-white",
                    !active && !done && "border-line bg-surface text-ink-muted"
                  )}
                >
                  {done ? (
                    <Check className="h-4 w-4" strokeWidth={3} />
                  ) : (
                    <Icon className="h-4 w-4" />
                  )}
                </span>
                <span className="hidden sm:block">
                  <span className="block text-[11px] font-medium uppercase tracking-wide text-ink-muted">
                    Step {i + 1}
                  </span>
                  <span
                    className={cn(
                      "block text-[13.5px] font-semibold",
                      active ? "text-ink" : "text-ink-soft"
                    )}
                  >
                    {s.title}
                  </span>
                </span>
              </button>
              {i < STEPS.length - 1 && (
                <span
                  className={cn(
                    "h-px flex-1 transition-colors",
                    step > s.id ? "bg-accent" : "bg-line"
                  )}
                />
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_300px]">
        {/* Form card */}
        <div className="rounded-3xl border border-line bg-surface p-6 shadow-card sm:p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -16 }}
              transition={{ duration: 0.22 }}
              className="space-y-6"
            >
              {step === 0 && (
                <>
                  <Field
                    label="What is the problem?"
                    hint="One clear sentence. Start with who, then what hurts."
                    error={showErrors ? stepErrors.problem : undefined}
                  >
                    <TextArea
                      autoFocus
                      rows={2}
                      maxLength={140}
                      placeholder="Designers lose hours chasing client feedback…"
                      value={form.problem}
                      onChange={(e) => set("problem", e.target.value)}
                    />
                    <CharCount value={form.problem} max={140} />
                  </Field>

                  <Field
                    label="Industry"
                    hint="Pick the closest one."
                    error={showErrors ? stepErrors.industry : undefined}
                  >
                    <ChipGroup
                      options={INDUSTRIES}
                      value={form.industry}
                      onChange={(v) => set("industry", v)}
                    />
                  </Field>

                  <Field
                    label="Who has it?"
                    hint="Be specific — a narrow user is a stronger signal."
                    error={showErrors ? stepErrors.who : undefined}
                  >
                    <TextInput
                      placeholder="Freelance interior designers and small studios…"
                      value={form.who}
                      onChange={(e) => set("who", e.target.value)}
                    />
                  </Field>

                  <Field
                    label="Why is it painful?"
                    hint="Time lost, money lost, or mistakes made."
                    error={showErrors ? stepErrors.painful : undefined}
                  >
                    <TextArea
                      rows={2}
                      placeholder="Notes scatter across chats and PDFs, so revisions take hours…"
                      value={form.painful}
                      onChange={(e) => set("painful", e.target.value)}
                    />
                  </Field>
                </>
              )}

              {step === 1 && (
                <>
                  <Field
                    label="What do they do today?"
                    hint="The current workaround. Optional but valuable."
                  >
                    <TextArea
                      autoFocus
                      rows={2}
                      placeholder="Screenshots, Drive folders, and manual WhatsApp follow-ups…"
                      value={form.today}
                      onChange={(e) => set("today", e.target.value)}
                    />
                  </Field>

                  <Field
                    label="What do they use now?"
                    hint="Tap all that apply."
                  >
                    <MultiChipGroup
                      options={TOOL_OPTIONS}
                      value={form.useNow}
                      onChange={(v) => set("useNow", v)}
                    />
                  </Field>

                  <Field
                    label="How do you know it's real?"
                    hint="Where does the proof come from? Tap all that apply."
                    error={showErrors ? stepErrors.proofType : undefined}
                  >
                    <MultiChipGroup
                      options={PROOF_TYPES}
                      value={form.proofType}
                      onChange={(v) => set("proofType", v)}
                      allowOther={false}
                    />
                  </Field>

                  <Field
                    label="Tell us more about the proof"
                    hint="A sentence keeps Foundra honest. No invented data."
                    error={showErrors ? stepErrors.proof : undefined}
                  >
                    <TextArea
                      rows={2}
                      placeholder="Interviewed 5 designers; 4 said feedback collection eats half a day…"
                      value={form.proof}
                      onChange={(e) => set("proof", e.target.value)}
                    />
                  </Field>

                  <Field
                    label="Proof link or source"
                    hint="Optional — a thread, review, or job post."
                  >
                    <TextInput
                      type="url"
                      inputMode="url"
                      placeholder="https://reddit.com/…"
                      value={form.link}
                      onChange={(e) => set("link", e.target.value)}
                    />
                  </Field>
                </>
              )}

              {step === 2 && (
                <Field
                  label="How do you relate to this problem?"
                  hint="This helps us route you to the right Problem Room."
                  error={showErrors ? stepErrors.role : undefined}
                >
                  <div className="grid gap-3 sm:grid-cols-3">
                    {ROLES.map((r) => {
                      const Icon = r.icon;
                      const active = form.role === r.value;
                      return (
                        <button
                          key={r.value}
                          type="button"
                          onClick={() => set("role", r.value)}
                          aria-pressed={active}
                          className={cn(
                            "flex cursor-pointer flex-col items-start gap-3 rounded-2xl border p-4 text-left transition-all",
                            active
                              ? "border-accent bg-accent-soft"
                              : "border-line bg-surface hover:border-ink/30"
                          )}
                        >
                          <span
                            className={cn(
                              "flex h-9 w-9 items-center justify-center rounded-xl",
                              active
                                ? "bg-accent text-white"
                                : "bg-black/[0.05] text-ink-soft"
                            )}
                          >
                            <Icon className="h-4.5 w-4.5" />
                          </span>
                          <span
                            className={cn(
                              "text-[13.5px] font-semibold leading-snug",
                              active ? "text-accent-ink" : "text-ink"
                            )}
                          >
                            {r.value}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </Field>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Footer nav */}
          <div className="mt-8 flex items-center justify-between gap-3 border-t border-line/70 pt-6">
            <Button
              variant="ghost"
              onClick={back}
              disabled={step === 0}
              className={step === 0 ? "invisible" : ""}
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>

            <div className="flex items-center gap-3">
              <span className="hidden text-[12.5px] text-ink-muted sm:block">
                Step {step + 1} of {STEPS.length}
              </span>
              <Button size="lg" onClick={next}>
                {step < 2 ? "Continue" : "Submit for review"}
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Live preview */}
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-2xl border border-line bg-surface p-5 shadow-card">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-medium uppercase tracking-wide text-ink-muted">
                Live preview
              </span>
              <span className="text-[11.5px] font-semibold tabular-nums text-ink-soft">
                {completeness}%
              </span>
            </div>
            <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-black/[0.06]">
              <motion.div
                className="h-full rounded-full bg-accent"
                animate={{ width: `${completeness}%` }}
                transition={{ type: "spring", stiffness: 200, damping: 26 }}
              />
            </div>

            <div className="mt-4 rounded-xl border border-line p-4">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-medium uppercase tracking-wide text-ink-muted">
                  {form.industry || "Industry"}
                </span>
                <SignalBadge signal="Needs more proof" />
              </div>
              <h3 className="mt-3 text-[15px] font-semibold leading-snug text-ink">
                {form.problem || "Your problem title will appear here."}
              </h3>
              {form.painful ? (
                <p className="mt-1.5 text-[13px] leading-relaxed text-ink-soft">
                  {form.painful}
                </p>
              ) : (
                <p className="mt-1.5 text-[13px] leading-relaxed text-ink-muted">
                  The one-line pain shows up here.
                </p>
              )}
              <p className="mt-3 inline-flex items-center gap-1.5 text-[11.5px] font-medium text-ink-muted">
                <Radar className="h-3.5 w-3.5 text-accent" />
                {form.proofType.length > 0
                  ? `${form.proofType.length} proof source${
                      form.proofType.length > 1 ? "s" : ""
                    } added`
                  : "Add proof to raise the signal"}
              </p>
            </div>

            <p className="mt-4 text-[12px] leading-relaxed text-ink-muted">
              Reviewed before publishing. We check for duplicates and gather
              more signals first.
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}

/* ---------- helpers ---------- */

function Field({
  label,
  hint,
  error,
  children,
}: {
  label: string;
  hint?: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-ink">{label}</label>
      {hint && !error && (
        <p className="mt-0.5 mb-2 text-[12.5px] text-ink-muted">{hint}</p>
      )}
      {error && (
        <p className="mt-0.5 mb-2 inline-flex items-center gap-1.5 text-[12.5px] font-medium text-[#b4341f]">
          <AlertCircle className="h-3.5 w-3.5" />
          {error}
        </p>
      )}
      {(!hint && !error) && <div className="mb-2" />}
      {children}
    </div>
  );
}

function CharCount({ value, max }: { value: string; max: number }) {
  const near = value.length > max * 0.85;
  return (
    <p
      className={cn(
        "mt-1.5 text-right text-[11.5px] tabular-nums",
        near ? "text-[#8a5e00]" : "text-ink-muted"
      )}
    >
      {value.length}/{max}
    </p>
  );
}
