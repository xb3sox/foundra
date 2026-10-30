import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { CommitmentModal } from "./CommitmentModal";
import { StoreProvider } from "../../lib/store";
import { RouterProvider } from "../../lib/router";
import type { Problem } from "../../types";

const sampleProblem: Problem = {
  id: "test-problem",
  title: "Test Problem Title",
  pain: "Test problem pain",
  summary: "Test summary",
  industry: "Fintech",
  signal: "Strong signal",
  score: 85,
  scoreReasons: [],
  whoFeels: "Freelancers",
  problemDetail: "Detail",
  proof: [],
  whatTheyDoToday: "Today detail",
  whyToolsFail: "Why fail detail",
  firstVersion: {
    firstFeature: "Feature",
    forWho: "Users",
    avoid: "Avoid",
    findUsers: "Find",
    pricing: "$10",
  },
  scoreBreakdown: [],
  roomStatus: "Proving",
  activity: [],
  pipeline: {
    signalCount: 12,
    clusters: 3,
    confidence: "Strong",
    sources: [],
    lastUpdated: "Today",
  },
  counts: {
    feel: 10,
    build: 5,
    know: 3,
  },
  people: [],
  checklist: [],
};

describe("CommitmentModal component", () => {
  it("associates the label with the email text input via htmlFor and id", () => {
    render(
      <RouterProvider>
        <StoreProvider>
          <CommitmentModal
            type="I have this problem"
            problem={sampleProblem}
            open={true}
            onClose={vi.fn()}
          />
        </StoreProvider>
      </RouterProvider>
    );

    const emailInput = screen.getByLabelText(/email \(optional\)/i);
    expect(emailInput).toBeInTheDocument();
    expect(emailInput).toHaveAttribute("id", "commitment-email");
    expect(emailInput).toHaveAttribute("type", "email");
  });
});
