import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import App from "./App";

describe("App", () => {
  test("renders skip-to-content link pointing to main content landmark", () => {
    const { container } = render(<App />);

    const skipLink = screen.getByRole("link", { name: /skip to main content/i });
    expect(skipLink).toBeInTheDocument();
    expect(skipLink).toHaveAttribute("href", "#main-content");

    const mainLandmark = container.querySelector("#main-content");
    expect(mainLandmark).toBeInTheDocument();
    expect(mainLandmark?.tagName.toLowerCase()).toBe("main");
  });
});
