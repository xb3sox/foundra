import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { RoomChecklist } from "./RoomChecklist";
import { StoreProvider } from "../../lib/store";
import type { Problem } from "../../types";

const mockProblem: Problem = {
  id: "test-problem",
  title: "Test Problem Title",
  industry: "SaaS",
  signal: "Hot",
  pain: "Test Pain",
  checklist: [
    { id: "c1", label: "First checklist item", done: false },
    { id: "c2", label: "Second checklist item", done: true },
  ],
  pipeline: {
    signals: [],
    signalCount: 0,
  },
  scores: {
    pain: 0,
    market: 0,
    build: 0,
  },
  evidence: [],
  receipts: [],
  people: [],
  activity: [],
};

describe("RoomChecklist", () => {
  it("renders checklist buttons with role='checkbox' and correct aria-checked attributes", () => {
    render(
      <StoreProvider>
        <RoomChecklist problem={mockProblem} />
      </StoreProvider>
    );

    const checkboxes = screen.getAllByRole("checkbox");
    expect(checkboxes).toHaveLength(2);

    expect(checkboxes[0]).toHaveAttribute("aria-checked", "false");
    expect(checkboxes[0]).toHaveTextContent("First checklist item");

    expect(checkboxes[1]).toHaveAttribute("aria-checked", "true");
    expect(checkboxes[1]).toHaveTextContent("Second checklist item");
  });

  it("toggles checkbox when clicked", () => {
    render(
      <StoreProvider>
        <RoomChecklist problem={mockProblem} />
      </StoreProvider>
    );

    const checkboxes = screen.getAllByRole("checkbox");
    expect(checkboxes[0]).toHaveAttribute("aria-checked", "false");

    fireEvent.click(checkboxes[0]);
    expect(checkboxes[0]).toHaveAttribute("aria-checked", "true");
  });
});
