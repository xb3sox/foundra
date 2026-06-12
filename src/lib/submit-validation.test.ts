import { describe, expect, test } from "vitest";
import {
  EMPTY_FORM,
  clearDraft,
  loadDraft,
  saveDraft,
  validateStep,
  type FormState,
} from "./submit-validation";

const validForm: FormState = {
  ...EMPTY_FORM,
  problem: "Designers lose hours chasing client feedback everywhere.",
  industry: "Interior Design",
  who: "Freelance interior designers",
  painful: "Revisions slip through and clients get angry.",
  proofType: ["I live with it"],
  proof: "I deal with this on every single project.",
  role: "I have this problem",
};

describe("validateStep", () => {
  test("flags all required fields on an empty step 0", () => {
    const errors = validateStep(EMPTY_FORM, 0);
    expect(Object.keys(errors).sort()).toEqual([
      "industry",
      "painful",
      "problem",
      "who",
    ]);
  });

  test("rejects a too-short problem description", () => {
    const errors = validateStep({ ...validForm, problem: "Too short" }, 0);
    expect(errors.problem).toBeDefined();
  });

  test("passes a complete step 0", () => {
    expect(validateStep(validForm, 0)).toEqual({});
  });

  test("step 1 requires proof type and a real proof sentence", () => {
    const errors = validateStep(EMPTY_FORM, 1);
    expect(Object.keys(errors).sort()).toEqual(["proof", "proofType"]);
    expect(validateStep(validForm, 1)).toEqual({});
  });

  test("step 2 requires a role", () => {
    expect(validateStep(EMPTY_FORM, 2).role).toBeDefined();
    expect(validateStep(validForm, 2)).toEqual({});
  });

  test("steps are isolated — step 0 ignores later-step fields", () => {
    const onlyStep0Valid: FormState = {
      ...EMPTY_FORM,
      problem: validForm.problem,
      industry: validForm.industry,
      who: validForm.who,
      painful: validForm.painful,
    };
    expect(validateStep(onlyStep0Valid, 0)).toEqual({});
  });
});

describe("draft persistence", () => {
  test("round-trips a draft through localStorage", () => {
    saveDraft({ form: validForm, step: 1 });
    expect(loadDraft()).toEqual({ form: validForm, step: 1 });
  });

  test("returns null when no draft exists", () => {
    expect(loadDraft()).toBeNull();
  });

  test("tolerates corrupt JSON", () => {
    localStorage.setItem("foundra-submit-draft-v1", "{not json");
    expect(loadDraft()).toBeNull();
  });

  test("merges partial drafts onto the empty form and clamps bad steps", () => {
    localStorage.setItem(
      "foundra-submit-draft-v1",
      JSON.stringify({ form: { problem: "A saved sentence" }, step: 99 })
    );
    const draft = loadDraft();
    expect(draft?.form.problem).toBe("A saved sentence");
    expect(draft?.form.useNow).toEqual([]);
    expect(draft?.step).toBe(0);
  });

  test("clearDraft removes the saved draft", () => {
    saveDraft({ form: validForm, step: 2 });
    clearDraft();
    expect(loadDraft()).toBeNull();
  });
});
