import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { CommitmentModal } from "./CommitmentModal";
import { StoreProvider } from "../../lib/store";
import { RouterProvider } from "../../lib/router";
import { problems } from "../../data/problems";

describe("CommitmentModal accessibility", () => {
  it("associates the label and helper text with the email input and focuses input on label click", () => {
    const problem = problems[0];
    const handleClose = vi.fn();

    render(
      <RouterProvider>
        <StoreProvider>
          <CommitmentModal
            open={true}
            type="I have this problem"
            problem={problem}
            onClose={handleClose}
          />
        </StoreProvider>
      </RouterProvider>
    );

    const input = screen.getByRole("textbox", { name: "Email (optional)" });
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute("id", "commitment-email");
    expect(input).toHaveAttribute("aria-describedby", "commitment-email-hint");

    const helperText = screen.getByText("So we can save your spot in the room. You can skip it.");
    expect(helperText).toHaveAttribute("id", "commitment-email-hint");

    const label = screen.getByText("Email (optional)");
    fireEvent.click(label);
    expect(document.activeElement).toBe(input);
  });
});
