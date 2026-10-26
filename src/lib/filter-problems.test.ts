import { describe, expect, test } from "vitest";
import { problems } from "../data/problems";
import {
  EMPTY_FILTER,
  filterProblems,
  industriesFrom,
  isFilterActive,
  signalsFrom,
  type BoardFilter,
} from "./filter-problems";

const filter = (overrides: Partial<BoardFilter>): BoardFilter => ({
  ...EMPTY_FILTER,
  ...overrides,
});

describe("filterProblems", () => {
  test("empty filter returns all problems", () => {
    expect(filterProblems(problems, EMPTY_FILTER)).toHaveLength(
      problems.length
    );
  });

  test("query matches title, case-insensitively", () => {
    const results = filterProblems(problems, filter({ query: "INVOICE" }));
    expect(results.length).toBeGreaterThan(0);
    expect(
      results.every((p) =>
        `${p.title} ${p.pain} ${p.industry}`.toLowerCase().includes("invoice")
      )
    ).toBe(true);
  });

  test("query matches industry text", () => {
    const results = filterProblems(problems, filter({ query: "healthcare" }));
    expect(results.some((p) => p.industry === "Healthcare")).toBe(true);
  });

  test("query matches across field boundaries", () => {
    const firstProblem = problems[0];
    const titleWords = firstProblem.title.split(" ");
    const painWords = firstProblem.pain.split(" ");
    const boundaryQuery = `${titleWords[titleWords.length - 1]} ${painWords[0]}`;
    const results = filterProblems(problems, filter({ query: boundaryQuery }));
    expect(results.some((p) => p.id === firstProblem.id)).toBe(true);
  });

  test("query is whitespace-trimmed", () => {
    expect(filterProblems(problems, filter({ query: "   " }))).toHaveLength(
      problems.length
    );
  });

  test("industry filter narrows to that industry", () => {
    const results = filterProblems(
      problems,
      filter({ industries: ["Fitness"] })
    );
    expect(results.length).toBeGreaterThan(0);
    expect(results.every((p) => p.industry === "Fitness")).toBe(true);
  });

  test("signal filter ORs multiple values", () => {
    const results = filterProblems(
      problems,
      filter({ signals: ["Strong signal", "Promising"] })
    );
    expect(results.length).toBeGreaterThan(0);
    expect(
      results.every(
        (p) => p.signal === "Strong signal" || p.signal === "Promising"
      )
    ).toBe(true);
  });

  test("dimensions AND together", () => {
    const results = filterProblems(
      problems,
      filter({ industries: ["Fitness"], signals: ["Strong signal"] })
    );
    // gym-churn is Promising, so Fitness + Strong signal has no overlap
    expect(results).toHaveLength(0);
  });

  test("no match returns empty array", () => {
    expect(
      filterProblems(problems, filter({ query: "zzz-no-such-problem" }))
    ).toHaveLength(0);
  });
});

describe("industriesFrom / signalsFrom", () => {
  test("industries are unique and cover every problem", () => {
    const industries = industriesFrom(problems);
    expect(new Set(industries).size).toBe(industries.length);
    expect(industries).toContain("Healthcare");
    for (const p of problems) {
      expect(industries).toContain(p.industry);
    }
  });

  test("signals are unique and cover every problem", () => {
    const signals = signalsFrom(problems);
    expect(new Set(signals).size).toBe(signals.length);
    for (const p of problems) {
      expect(signals).toContain(p.signal);
    }
  });
});

describe("isFilterActive", () => {
  test.each([
    [EMPTY_FILTER, false],
    [filter({ query: "  " }), false],
    [filter({ query: "x" }), true],
    [filter({ industries: ["Fitness"] }), true],
    [filter({ signals: ["Promising"] }), true],
  ] as const)("%j → %s", (f, expected) => {
    expect(isFilterActive(f)).toBe(expected);
  });
});
