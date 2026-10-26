import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { StoreProvider } from "../../lib/store";
import { RouterProvider } from "../../lib/router";
import { CommitmentModal } from "./CommitmentModal";
import type { Problem } from "../../types";

const dummyProblem: Problem = {
  id: "test-problem",
  title: "Test Problem",
  industry: "Tech",
  signal: "Strong signal",
  summary: "Summary text",
  pain: "Pain text",
  problemDetail: "Detail",
  whatTheyDoToday: "Today",
  whyToolsFail: "Fail",
  whoFeels: "Who",
  score: 82,
  scoreReasons: ["High demand", "Clear pain point"],
  proof: [],
  scoreBreakdown: [],
  pipeline: {
    signalCount: 10,
    clusters: 3,
    confidence: "Strong",
    sources: [],
    lastUpdated: "2025-01-01",
  },
  firstVersion: {
    firstFeature: "Feature",
    forWho: "Who",
    avoid: "Avoid",
    findUsers: "Users",
    pricing: "Free",
  },
  people: [],
  checklist: [],
  activity: [],
  counts: { feel: 5, build: 2, know: 1 },
  roomStatus: "Proving",
};

function TestWrapper({ children }: { children: React.ReactNode }) {
  return (
    <StoreProvider>
      <RouterProvider>{children}</RouterProvider>
    </StoreProvider>
  );
}

describe("CommitmentModal", () => {
  it("associates FieldLabel with email TextInput via id/htmlFor", () => {
    render(
      <TestWrapper>
        <CommitmentModal
          type="I have this problem"
          problem={dummyProblem}
          open={true}
          onClose={vi.fn()}
        />
      </TestWrapper>
    );

    const emailInput = screen.getByLabelText(/Email \(optional\)/i);
    expect(emailInput).toBeInTheDocument();
    expect(emailInput).toHaveAttribute("id", "commitment-email");
  });

  it("triggers enterRoom when Enter is pressed in email input", () => {
    const handleClose = vi.fn();
    render(
      <TestWrapper>
        <CommitmentModal
          type="I have this problem"
          problem={dummyProblem}
          open={true}
          onClose={handleClose}
        />
      </TestWrapper>
    );

    const emailInput = screen.getByLabelText(/Email \(optional\)/i);
    fireEvent.change(emailInput, { target: { value: "user@example.com" } });
    fireEvent.keyDown(emailInput, { key: "Enter" });

    expect(handleClose).toHaveBeenCalled();
  });
});
