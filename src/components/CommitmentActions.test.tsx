import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { CommitmentActions } from "./CommitmentActions";
import { StoreProvider } from "../lib/store";
import { RouterProvider } from "../lib/router";
import type { Problem } from "../types";

const mockProblem: Problem = {
  id: "test-prob-1",
  industry: "SaaS",
  title: "Test Problem",
  pain: "Test Pain",
  summary: "Summary",
  signal: "Strong signal",
  score: 80,
  scoreReasons: ["Reason"],
  counts: { feel: 3, build: 1, know: 1 },
  whoFeels: "Users",
  problemDetail: "Detail",
  proof: [],
  whatTheyDoToday: "Workaround",
  whyToolsFail: "Fail",
  firstVersion: {
    firstFeature: "Feature",
    forWho: "Who",
    avoid: "Avoid",
    findUsers: "Users",
    pricing: "Free",
  },
  scoreBreakdown: [],
  people: [],
  roomStatus: "Proving",
  checklist: [],
  activity: [],
  pipeline: {
    signalCount: 5,
    clusters: 1,
    confidence: "Strong",
    sources: [],
    lastUpdated: "Today",
  },
};

describe("CommitmentActions", () => {
  it("renders commitment buttons with correct initial ARIA attributes", () => {
    const handleCommit = vi.fn();
    render(
      <RouterProvider>
        <StoreProvider>
          <CommitmentActions problem={mockProblem} onCommit={handleCommit} />
        </StoreProvider>
      </RouterProvider>
    );

    const button = screen.getByRole("button", { name: "I have this problem" });
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute("aria-pressed", "false");
  });
});
