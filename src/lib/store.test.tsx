import { describe, expect, test } from "vitest";
import { act, render, screen } from "@testing-library/react";
import { StoreProvider, useStore } from "./store";

const KEY = "foundra-state-v1";

// Probe component exposing the store for assertions without UI coupling.
let store: ReturnType<typeof useStore>;
function Probe() {
  store = useStore();
  return (
    <span data-testid="email">{store.state.email ?? "no-email"}</span>
  );
}

function renderStore() {
  return render(
    <StoreProvider>
      <Probe />
    </StoreProvider>
  );
}

describe("StoreProvider", () => {
  test("addCommitment records the type once and dedupes repeats", () => {
    renderStore();
    act(() => store.addCommitment("p1", "I have this problem"));
    act(() => store.addCommitment("p1", "I have this problem"));
    expect(store.state.commitments.p1).toEqual(["I have this problem"]);
    expect(store.state.extraCounts.p1).toEqual({ feel: 1, build: 0, know: 0 });
  });

  test("each commitment type increments its own counter", () => {
    renderStore();
    act(() => store.addCommitment("p1", "I can build this"));
    act(() => store.addCommitment("p1", "I know this market"));
    expect(store.state.extraCounts.p1).toEqual({ feel: 0, build: 1, know: 1 });
  });

  test("state persists to localStorage", () => {
    renderStore();
    act(() => store.setEmail("founder@example.com"));
    const raw = localStorage.getItem(KEY);
    expect(raw).toBeTruthy();
    expect(JSON.parse(raw!).email).toBe("founder@example.com");
  });

  test("hydrates from a previously saved state", () => {
    localStorage.setItem(
      KEY,
      JSON.stringify({ email: "saved@example.com" })
    );
    renderStore();
    expect(screen.getByTestId("email")).toHaveTextContent("saved@example.com");
    expect(store.state.commitments).toEqual({});
  });

  test("survives corrupt localStorage without throwing", () => {
    localStorage.setItem(KEY, "{definitely not json");
    renderStore();
    expect(screen.getByTestId("email")).toHaveTextContent("no-email");
  });

  test("toggleChecklist overlays the base checklist per room", () => {
    renderStore();
    const base = { a: false, b: true };
    act(() => store.toggleChecklist("p1", "a", base));
    expect(store.getRoom).toBeDefined();
    expect(store.state.rooms.p1.checklist).toEqual({ a: true, b: true });
    act(() => store.toggleChecklist("p1", "a", base));
    expect(store.state.rooms.p1.checklist.a).toBe(false);
  });

  test("markConnected ignores duplicate names", () => {
    renderStore();
    act(() => store.markConnected("p1", "Sara K."));
    act(() => store.markConnected("p1", "Sara K."));
    expect(store.state.rooms.p1.connected).toEqual(["Sara K."]);
  });
});
