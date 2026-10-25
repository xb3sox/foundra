import { StrictMode } from "react";
import { describe, expect, test, vi } from "vitest";
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


describe("persisted state recovery", () => {
  test("invalid maps cannot crash mutations or overwrite the original payload", () => {
    const raw = JSON.stringify({ commitments: null, extraCounts: [], rooms: 4 });
    localStorage.setItem(KEY, raw);
    renderStore();
    act(() => store.addCommitment("p1", "I have this problem"));
    act(() => store.toggleChecklist("p1", "a", { a: false }));
    expect(store.state.commitments.p1).toEqual(["I have this problem"]);
    expect(store.state.rooms.p1.checklist.a).toBe(true);
    expect(store.sessionOnly).toBe(true);
    expect(localStorage.getItem(KEY)).toBe(raw);
  });

  test("preserves valid nested progress alongside malformed entries", () => {
    const raw = JSON.stringify({
      email: "saved@example.com",
      commitments: { p1: ["I can build this", 42, "unknown"], p2: null },
      extraCounts: { p1: { feel: 2, build: -1, know: "3" } },
      rooms: { p1: {
        checklist: { done: true, invalid: "yes" },
        activity: [{ id: "a", text: "Valid", time: "Today" }, null],
        connected: ["Sara", 9],
      } },
    });
    localStorage.setItem(KEY, raw);
    const view = renderStore();
    expect(store.state.email).toBe("saved@example.com");
    expect(store.state.commitments.p1).toEqual(["I can build this"]);
    expect(store.state.extraCounts.p1).toEqual({ feel: 2, build: 0, know: 0 });
    expect(store.state.rooms.p1).toEqual({
      checklist: { done: true },
      activity: [{ id: "a", text: "Valid", time: "Today" }], connected: ["Sara"],
    });
    expect(localStorage.getItem(KEY)).toBe(raw);
    view.unmount();
    renderStore();
    expect(store.state.rooms.p1.checklist.done).toBe(true);
  });

  test("valid partial legacy state remains writable and survives remount", () => {
    localStorage.setItem(KEY, JSON.stringify({ rooms: { p1: { checklist: { a: true } } } }));
    const view = renderStore();
    expect(store.sessionOnly).toBe(false);
    act(() => store.markConnected("p1", "Sara"));
    view.unmount();
    renderStore();
    expect(store.state.rooms.p1).toEqual({ checklist: { a: true }, activity: [], connected: ["Sara"] });
  });

  test.each(["not JSON", "null", "[]", "42", '{"email":{}}'])(
    "retains unreadable or wrong-shaped payload %s without crashing", (raw) => {
      localStorage.setItem(KEY, raw);
      renderStore();
      expect(store.state.email).toBeNull();
      expect(store.sessionOnly).toBe(true);
      expect(localStorage.getItem(KEY)).toBe(raw);
    },
  );

  test("does not overwrite unknown future fields or reserved map keys", () => {
    const raw = '{"futureVersion":2,"commitments":{"__proto__":["I can build this"]}}';
    localStorage.setItem(KEY, raw);
    renderStore();
    expect(Object.prototype.hasOwnProperty.call(store.state.commitments, "__proto__")).toBe(false);
    expect(store.sessionOnly).toBe(true);
    expect(localStorage.getItem(KEY)).toBe(raw);
  });

  test("rejects unsafe numeric counts and malformed activity fields", () => {
    localStorage.setItem(KEY, '{"extraCounts":{"p1":{"feel":1e400,"build":1.5,"know":9007199254740992}},"rooms":{"p1":{"activity":[{"id":7,"text":"x","time":"now"}]}}}');
    renderStore();
    expect(store.state.extraCounts.p1).toEqual({ feel: 0, build: 0, know: 0 });
    expect(store.state.rooms.p1.activity).toEqual([]);
    expect(store.sessionOnly).toBe(true);
  });

  test("reports a failed persistence write instead of pretending state was saved", () => {
    const spy = vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => {
      throw new DOMException("Storage full", "QuotaExceededError");
    });
    try {
      renderStore();
      act(() => store.setEmail("founder@example.com"));
      expect(store.sessionOnly).toBe(true);
      expect(store.state.email).toBe("founder@example.com");
    } finally { spy.mockRestore(); }
  });
});


test("a storage read failure never attempts to overwrite inaccessible data", () => {
  const read = vi.spyOn(Storage.prototype, "getItem").mockImplementation(() => {
    throw new DOMException("Blocked", "SecurityError");
  });
  const write = vi.spyOn(Storage.prototype, "setItem");
  try {
    renderStore();
    act(() => store.markConnected("p1", "Sara"));
    expect(store.sessionOnly).toBe(true);
    expect(write).not.toHaveBeenCalled();
  } finally { read.mockRestore(); write.mockRestore(); }
});

test("StrictMode never rewrites recoverable data or unknown nested fields", () => {
  const raw = JSON.stringify({ rooms: { p1: {
    activity: [{ id: "a", text: "Valid", time: "Today", futureField: true }],
  } } });
  localStorage.setItem(KEY, raw);
  render(<StrictMode><StoreProvider><Probe /></StoreProvider></StrictMode>);
  act(() => store.addActivity("p1", "Temporary"));
  expect(store.sessionOnly).toBe(true);
  expect(store.state.rooms.p1.activity).toHaveLength(2);
  expect(localStorage.getItem(KEY)).toBe(raw);
});

test("persistence recovers after a transient quota failure on the next edit", () => {
  renderStore();
  const spy = vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => {
    throw new DOMException("Full", "QuotaExceededError");
  });
  try {
    act(() => store.setEmail("first@example.com"));
    expect(store.sessionOnly).toBe(true);
  } finally { spy.mockRestore(); }
  act(() => store.setEmail("second@example.com"));
  expect(store.sessionOnly).toBe(false);
  expect(JSON.parse(localStorage.getItem(KEY)!).email).toBe("second@example.com");
});
