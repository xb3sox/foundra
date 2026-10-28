import { describe, expect, test } from "vitest";
import { matchRoute } from "./router";

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
    "//evil.com",
    "//problems/client-feedback",
  ])("returns notfound for %s", (path) => {
    expect(matchRoute(path).name).toBe("notfound");
  });
});
