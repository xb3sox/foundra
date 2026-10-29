import { describe, expect, test } from "vitest";
import { toSafeHref } from "./utils";

describe("toSafeHref", () => {
  test("returns valid https URLs unchanged", () => {
    const validUrl = "https://example.com/path?query=1#hash";
    expect(toSafeHref(validUrl)).toBe(validUrl);
  });

  test("rejects dangerous or non-https schemes", () => {
    expect(toSafeHref("javascript:alert(1)")).toBeUndefined();
    expect(toSafeHref("data:text/html,<script>alert(1)</script>")).toBeUndefined();
    expect(toSafeHref("http://insecure-example.com")).toBeUndefined();
    expect(toSafeHref("ftp://files.example.com")).toBeUndefined();
  });

  test("returns undefined for undefined or empty inputs", () => {
    expect(toSafeHref(undefined)).toBeUndefined();
    expect(toSafeHref("")).toBeUndefined();
  });

  test("returns undefined for invalid URL strings", () => {
    expect(toSafeHref("not a url")).toBeUndefined();
    expect(toSafeHref("::invalid::")).toBeUndefined();
    expect(toSafeHref("https:alert(1)")).toBeUndefined();
  });

  test("rejects embedded credentials in URLs", () => {
    expect(toSafeHref("https://user:pass@example.com/path")).toBeUndefined();
  });

  test("trims whitespace from otherwise valid https URLs", () => {
    expect(toSafeHref("   https://example.com/path   ")).toBe("https://example.com/path");
  });
});
