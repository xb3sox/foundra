import { describe, expect, it } from "vitest";
import { toSafeHref } from "./url";

describe("toSafeHref", () => {
  it("allows valid https and http URLs", () => {
    expect(toSafeHref("https://example.com")).toBe("https://example.com");
    expect(toSafeHref("http://example.com/path?query=1")).toBe("http://example.com/path?query=1");
  });

  it("returns undefined for undefined or empty input", () => {
    expect(toSafeHref(undefined)).toBeUndefined();
    expect(toSafeHref("")).toBeUndefined();
  });

  it("rejects dangerous javascript: schemes", () => {
    expect(toSafeHref("javascript:alert(1)")).toBeUndefined();
    expect(toSafeHref("JAVASCRIPT:alert(1)")).toBeUndefined();
  });

  it("rejects data: and file: schemes", () => {
    expect(toSafeHref("data:text/html,<script>alert(1)</script>")).toBeUndefined();
    expect(toSafeHref("file:///etc/passwd")).toBeUndefined();
  });

  it("rejects invalid URL strings", () => {
    expect(toSafeHref("not a url")).toBeUndefined();
    expect(toSafeHref("://bad.url")).toBeUndefined();
  });
});
