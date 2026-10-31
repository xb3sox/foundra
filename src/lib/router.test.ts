import { describe, expect, test } from "vitest";
import { matchRoute, resolveHashShim } from "./router";

describe("matchRoute", () => {
  test.each([
    ["/", "home", {}],
    ["", "home", {}],
    ["/problems/client-feedback", "problem", { id: "client-feedback" }],
    ["/rooms/gym-churn", "room", { id: "gym-churn" }],
  ] as const)("matches %s to %s", (path, name, params) => {
    expect(matchRoute(path)).toEqual({ name, params });
  });

  test.each([
    "/problems",
    "/problems/",
    "/problems/a/b",
    "/rooms",
    "/garbage",
    "/submit",
    "/submit/extra",
  ])("returns notfound for %s", (path) => {
    expect(matchRoute(path).name).toBe("notfound");
  });
});

describe("resolveHashShim", () => {
  test.each([
    ["#/problems/client-feedback", "/problems/client-feedback"],
    ["#/rooms/gym-churn", "/rooms/gym-churn"],
    ["#/", "/"],
    ["#/problems/client-feedback?filter=high", "/problems/client-feedback?filter=high"],
  ])("resolves valid internal hash %s to %s", (hash, expected) => {
    expect(resolveHashShim(hash)).toBe(expected);
  });

  test.each([
    "#//evil.com",
    "#///evil.com",
    "#/\\evil.com",
    "#/rooms\\test",
    "#",
    "#problems",
    "",
    "not a hash",
  ])("rejects invalid, empty, or dangerous hash %s", (hash) => {
    expect(resolveHashShim(hash)).toBeNull();
  });
});
