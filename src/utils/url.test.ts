import { describe, expect, it } from "vitest";
import { toSafeHref } from "./url";

describe("toSafeHref", () => {
  it("allows valid https URLs", () => {
    expect(toSafeHref("https://example.com")).toBe("https://example.com");
    expect(toSafeHref("https://reddit.com/r/freelance")).toBe(
      "https://reddit.com/r/freelance"
    );
  });

  it("blocks non-https schemes (javascript, data, http, etc)", () => {
    expect(toSafeHref("javascript:alert(1)")).toBeUndefined();
    expect(toSafeHref("data:text/html,<script>alert(1)</script>")).toBeUndefined();
    expect(toSafeHref("http://example.com")).toBeUndefined();
  });

  it("handles empty or invalid inputs safely", () => {
    expect(toSafeHref(undefined)).toBeUndefined();
    expect(toSafeHref("")).toBeUndefined();
    expect(toSafeHref("not-a-url")).toBeUndefined();
  });
});
