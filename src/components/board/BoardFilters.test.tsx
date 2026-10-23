import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { BoardFilters } from "./BoardFilters";
import { EMPTY_FILTER } from "../../lib/filter-problems";

describe("BoardFilters component", () => {
  it("renders clear button when query is present and clears query on click", () => {
    const handleChange = vi.fn();
    const filter = { ...EMPTY_FILTER, query: "payment" };

    render(
      <BoardFilters
        value={filter}
        onChange={handleChange}
        industries={["Fintech"]}
        signals={["Verified pain"]}
      />
    );

    const clearButton = screen.getByRole("button", { name: "Clear search query" });
    expect(clearButton).toBeInTheDocument();

    fireEvent.click(clearButton);
    expect(handleChange).toHaveBeenCalledWith({ ...filter, query: "" });
  });

  it("does not render clear button when query is empty", () => {
    const handleChange = vi.fn();

    render(
      <BoardFilters
        value={EMPTY_FILTER}
        onChange={handleChange}
        industries={["Fintech"]}
        signals={["Verified pain"]}
      />
    );

    expect(screen.queryByRole("button", { name: "Clear search query" })).not.toBeInTheDocument();
  });
});
