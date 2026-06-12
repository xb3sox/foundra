export interface FormState {
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

export type StepId = 0 | 1 | 2;

export const EMPTY_FORM: FormState = {
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

export const MIN_PROBLEM_LENGTH = 12;
export const MIN_PROOF_LENGTH = 10;

/** Per-step required-field validation for the Submit flow. */
export function validateStep(
  form: FormState,
  step: StepId
): Record<string, string> {
  const errors: Record<string, string> = {};
  if (step === 0) {
    if (form.problem.trim().length < MIN_PROBLEM_LENGTH)
      errors.problem = `Describe the problem in a full sentence (${MIN_PROBLEM_LENGTH}+ characters).`;
    if (!form.industry) errors.industry = "Pick an industry.";
    if (!form.who.trim()) errors.who = "Who exactly has this problem?";
    if (!form.painful.trim()) errors.painful = "Tell us why it hurts.";
  }
  if (step === 1) {
    if (form.proofType.length === 0)
      errors.proofType = "Pick at least one source of proof.";
    if (form.proof.trim().length < MIN_PROOF_LENGTH)
      errors.proof = "A sentence on how you know it's real keeps Foundra honest.";
  }
  if (step === 2) {
    if (!form.role) errors.role = "Tell us how you relate to this problem.";
  }
  return errors;
}

const DRAFT_KEY = "foundra-submit-draft-v1";

interface Draft {
  form: FormState;
  step: StepId;
}

/** Restore an in-progress submission, tolerating corrupt or partial JSON. */
export function loadDraft(): Draft | null {
  try {
    const raw = localStorage.getItem(DRAFT_KEY);
    if (!raw) return null;
    const parsed: unknown = JSON.parse(raw);
    if (typeof parsed !== "object" || parsed === null) return null;
    const candidate = parsed as Partial<Draft>;
    if (typeof candidate.form !== "object" || candidate.form === null)
      return null;
    const step: StepId =
      candidate.step === 1 || candidate.step === 2 ? candidate.step : 0;
    return { form: { ...EMPTY_FORM, ...candidate.form }, step };
  } catch {
    return null;
  }
}

export function saveDraft(draft: Draft): void {
  try {
    localStorage.setItem(DRAFT_KEY, JSON.stringify(draft));
  } catch {
    // Storage may be full or blocked (private mode) — drafts are best-effort.
  }
}

export function clearDraft(): void {
  try {
    localStorage.removeItem(DRAFT_KEY);
  } catch {
    // Ignore — nothing actionable if storage is unavailable.
  }
}
