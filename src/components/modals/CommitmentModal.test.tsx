import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { CommitmentModal } from "./CommitmentModal";
import { StoreProvider } from "../../lib/store";
import type { Problem } from "../../types";

const mockNavigate = vi.fn();

vi.mock("../../lib/router", () => ({
  useRouter: () => ({
    navigate: mockNavigate,
  }),
}));

const sampleProblem: Problem = {
  id: "test-prob",
  title: "Test Problem Title",
  summary: "Test summary",
  pain: "Test pain",
  industry: "Fintech",
  signal: "Strong signal",
  score: 90,
  scoreReasons: ["High repetition"],
  counts: { feel: 5, build: 3, know: 2 },
  pipeline: {
    signalCount: 15,
    lastUpdated: "Today",
    confidence: "Strong",
    clusters: 3,
    sources: [],
  },
  people: [],
  proof: [],
  scoreBreakdown: [],
  checklist: [],
  firstVersion: {
    firstFeature: "Test MVP",
    forWho: "Test who",
    avoid: "Test avoid",
    findUsers: "Test find",
    pricing: "Test pricing",
  },
  whatTheyDoToday: "Today workaround",
  whyToolsFail: "Tools fail",
  problemDetail: "Problem detail",
  whoFeels: "Who feels",
  roomStatus: "Proving",
  activity: [],
};

describe("CommitmentModal component", () => {
  it("associates label with email input and links description hint via aria-describedby", () => {
    render(
      <StoreProvider>
        <CommitmentModal
          type="I have this problem"
          problem={sampleProblem}
          open={true}
          onClose={() => {}}
        />
      </StoreProvider>
    );

    const emailInput = screen.getByLabelText("Email (optional)");
    expect(emailInput).toBeInTheDocument();
    expect(emailInput).toHaveAttribute("id", "commitment-email");
    expect(emailInput).toHaveAttribute("aria-describedby", "commitment-email-hint");

    const hint = screen.getByText("So we can save your spot in the room. You can skip it.");
    expect(hint).toHaveAttribute("id", "commitment-email-hint");
  });

  it("submits form and navigates to problem room when pressing enter in the email input", () => {
    const handleClose = vi.fn();
    render(
      <StoreProvider>
        <CommitmentModal
          type="I can build this"
          problem={sampleProblem}
          open={true}
          onClose={handleClose}
        />
      </StoreProvider>
    );

    const emailInput = screen.getByLabelText("Email (optional)");
    fireEvent.change(emailInput, { target: { value: "builder@example.com" } });
    fireEvent.submit(emailInput.closest("form")!);

    expect(mockNavigate).toHaveBeenCalledWith("/rooms/test-prob");
    expect(handleClose).toHaveBeenCalled();
  });
});
