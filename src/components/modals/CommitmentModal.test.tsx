import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { CommitmentModal } from "./CommitmentModal";
import { StoreProvider } from "../../lib/store";
import { RouterProvider } from "../../lib/router";
import type { Problem } from "../../types";

const mockProblem: Problem = {
  id: "test-problem",
  title: "Test Problem Title",
  industry: "Finance",
  signal: "Strong signal",
  score: 90,
  pain: "Manual pain description",
  summary: "Summary text",
  problemDetail: "Details",
  whatTheyDoToday: "Spreadsheets",
  whyToolsFail: "Too rigid",
  whoFeels: "Small business owners",
  counts: { feel: 10, build: 5, know: 2 },
  firstVersion: {
    firstFeature: "Feature",
    forWho: "Users",
    avoid: "Bloat",
    findUsers: "Outreach",
    pricing: "Free trial",
  },
  proof: [],
  scoreReasons: [],
  scoreBreakdown: [],
  people: [],
  pipeline: {
    signalCount: 15,
    clusters: 5,
    confidence: "Strong",
    sources: [],
    lastUpdated: "Today",
  },
  checklist: [],
  roomStatus: "Building",
  activity: [],
};

describe("CommitmentModal", () => {
  it("associates the email input with its label and helper description", () => {
    render(
      <RouterProvider>
        <StoreProvider>
          <CommitmentModal
            type="I have this problem"
            problem={mockProblem}
            open={true}
            onClose={vi.fn()}
          />
        </StoreProvider>
      </RouterProvider>
    );

    const input = screen.getByRole("textbox", { name: /email \(optional\)/i });
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute("id", "commitment-email");
    expect(input).toHaveAttribute("aria-describedby", "commitment-email-help");

    const helper = document.getElementById("commitment-email-help");
    expect(helper).toBeInTheDocument();
    expect(helper).toHaveTextContent(/so we can save your spot in the room/i);
  });
});
