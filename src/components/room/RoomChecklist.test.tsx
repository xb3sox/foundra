import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { RoomChecklist } from "./RoomChecklist";
import { StoreProvider } from "../../lib/store";
import type { Problem } from "../../types";

const mockProblem: Problem = {
  id: "test-problem",
  industry: "SaaS",
  title: "Test Problem Title",
  pain: "Pain description",
  summary: "Summary",
  signal: "Strong signal",
  score: 85,
  scoreReasons: ["Reason 1"],
  counts: { feel: 5, build: 3, know: 2 },
  whoFeels: "Developers",
  problemDetail: "Detail",
  proof: [],
  whatTheyDoToday: "Workaround",
  whyToolsFail: "Fail reasons",
  firstVersion: {
    firstFeature: "MVP",
    forWho: "Devs",
    avoid: "Bloat",
    findUsers: "Reddit",
    pricing: "$10/mo",
  },
  scoreBreakdown: [{ name: "Demand", value: 90 }],
  people: [],
  roomStatus: "Proving",
  checklist: [
    { id: "c1", label: "Task 1", done: false },
    { id: "c2", label: "Task 2", done: true },
  ],
  activity: [],
  pipeline: {
    signalCount: 10,
    clusters: 2,
    confidence: "Strong",
    sources: [{ platform: "Reddit", count: 5 }],
    lastUpdated: "2 days ago",
  },
};

describe("RoomChecklist", () => {
  it("renders accessible progress bar and checkbox items with correct state", () => {
    render(
      <StoreProvider>
        <RoomChecklist problem={mockProblem} />
      </StoreProvider>
    );

    const progressbar = screen.getByRole("progressbar", {
      name: "Progress to proof",
    });
    expect(progressbar).toBeInTheDocument();
    expect(progressbar).toHaveAttribute("aria-valuenow", "1");
    expect(progressbar).toHaveAttribute("aria-valuemin", "0");
    expect(progressbar).toHaveAttribute("aria-valuemax", "2");

    const task1 = screen.getByRole("checkbox", { name: "Task 1" });
    const task2 = screen.getByRole("checkbox", { name: "Task 2" });

    expect(task1).toHaveAttribute("aria-checked", "false");
    expect(task2).toHaveAttribute("aria-checked", "true");

    fireEvent.click(task1);
    expect(task1).toHaveAttribute("aria-checked", "true");
  });
});
