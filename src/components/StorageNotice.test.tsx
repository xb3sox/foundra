import { describe, expect, test, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { StoreProvider } from "../lib/store";
import { StorageNotice } from "./StorageNotice";

function renderNotice() {
  render(<StoreProvider><StorageNotice /></StoreProvider>);
}

describe("StorageNotice", () => {
  test("is absent when progress can be saved", () => {
    renderNotice();
    expect(screen.queryByRole("status")).not.toBeInTheDocument();
  });

  test("warns accessibly without exposing malformed private contents", () => {
    localStorage.setItem("foundra-state-v1", '{"email":{"private":"secret@example.com"}}');
    renderNotice();
    const notice = screen.getByRole("status", { name: "Browser storage warning" });
    expect(notice).toHaveTextContent("Changes are temporary");
    expect(notice).toHaveTextContent("Existing saved data has not been cleared");
    expect(notice).not.toHaveTextContent("secret@example.com");
  });

  test("warns when saving fails", () => {
    const spy = vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => {
      throw new DOMException("Full", "QuotaExceededError");
    });
    try {
      renderNotice();
      expect(screen.getByRole("status")).toHaveTextContent("may be lost");
    } finally { spy.mockRestore(); }
  });
});
