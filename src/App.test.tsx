import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import App from "./App";

describe("App accessibility landmarks and skip link", () => {
  test("renders an accessible skip-to-content link pointing to main landmark", () => {
    const { container } = render(<App />);

    const skipLink = screen.getByRole("link", { name: "Skip to content" });
    expect(skipLink).toBeInTheDocument();
    expect(skipLink).toHaveAttribute("href", "#main-content");

    const main = container.querySelector("#main-content");
    expect(main).toBeInTheDocument();
    expect(main?.tagName.toLowerCase()).toBe("main");
    expect(main).toHaveAttribute("tabIndex", "-1");
  });
});
