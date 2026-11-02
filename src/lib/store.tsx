import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { CommitmentType } from "../types";

import {
  loadPersistedState,
  STORAGE_KEY,
  type FoundraState,
  type RoomState,
} from "./persisted-state";

interface StoreContextValue {
  state: FoundraState;
  sessionOnly: boolean;
  addCommitment: (problemId: string, type: CommitmentType) => void;
  setEmail: (email: string) => void;
  toggleChecklist: (
    problemId: string,
    itemId: string,
    base: Record<string, boolean>
  ) => void;
  addActivity: (problemId: string, text: string) => void;
  markConnected: (problemId: string, name: string) => void;
  getRoom: (problemId: string) => RoomState | undefined;
}

const StoreContext = createContext<StoreContextValue | null>(null);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [loaded] = useState(loadPersistedState);
  const [state, setState] = useState<FoundraState>(loaded.state);
  const [writeFailed, setWriteFailed] = useState(false);

  useEffect(() => {
    if (loaded.sessionOnly) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
      setWriteFailed(false);
    } catch {
      setWriteFailed(true);
    }
  }, [state, loaded.sessionOnly]);

  const addCommitment = (problemId: string, type: CommitmentType) => {
    setState((s) => {
      const existing = s.commitments[problemId] ?? [];
      const has = existing.includes(type);
      const commitments = {
        ...s.commitments,
        [problemId]: has ? existing : [...existing, type],
      };
      const ec = s.extraCounts[problemId] ?? { feel: 0, build: 0, know: 0 };
      const extraCounts = has
        ? s.extraCounts
        : {
            ...s.extraCounts,
            [problemId]: {
              feel: ec.feel + (type === "I have this problem" ? 1 : 0),
              build: ec.build + (type === "I can build this" ? 1 : 0),
              know: ec.know + (type === "I know this market" ? 1 : 0),
            },
          };
      return { ...s, commitments, extraCounts };
    });
  };

  const setEmail = (email: string) =>
    setState((s) => ({ ...s, email }));

  const toggleChecklist = (
    problemId: string,
    itemId: string,
    base: Record<string, boolean>
  ) => {
    setState((s) => {
      const room = s.rooms[problemId] ?? {
        checklist: { ...base },
        activity: [],
        connected: [],
      };
      const current = room.checklist[itemId] ?? base[itemId] ?? false;
      return {
        ...s,
        rooms: {
          ...s.rooms,
          [problemId]: {
            ...room,
            checklist: { ...base, ...room.checklist, [itemId]: !current },
          },
        },
      };
    });
  };

  const addActivity = (problemId: string, text: string) => {
    setState((s) => {
      const room = s.rooms[problemId] ?? {
        checklist: {},
        activity: [],
        connected: [],
      };
      return {
        ...s,
        rooms: {
          ...s.rooms,
          [problemId]: {
            ...room,
            activity: [
              { id: `u${Date.now()}`, text, time: "Just now" },
              ...room.activity,
            ],
          },
        },
      };
    });
  };

  const markConnected = (problemId: string, name: string) => {
    setState((s) => {
      const room = s.rooms[problemId] ?? {
        checklist: {},
        activity: [],
        connected: [],
      };
      if (room.connected.includes(name)) return s;
      return {
        ...s,
        rooms: {
          ...s.rooms,
          [problemId]: { ...room, connected: [...room.connected, name] },
        },
      };
    });
  };

  const getRoom = (problemId: string) => state.rooms[problemId];

  // Memoize context value to avoid re-rendering consumers when parent re-renders
  const value = useMemo(
    () => ({
      state,
      sessionOnly: loaded.sessionOnly || writeFailed,
      addCommitment,
      setEmail,
      toggleChecklist,
      addActivity,
      markConnected,
      getRoom,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [state, loaded.sessionOnly, writeFailed]
  );

  return (
    <StoreContext.Provider value={value}>
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used within StoreProvider");
  return ctx;
}

interface Counts {
  feel: number;
  build: number;
  know: number;
}

/** Seed counts plus any signals the current user added locally.
    Accepts undefined so pages can call it before their not-found guard
    (hooks must run unconditionally). */
export function useLiveCounts(
  problem: { id: string; counts: Counts } | undefined
): Counts {
  const { state } = useStore();
  const problemId = problem?.id;
  const extra = problemId ? state.extraCounts[problemId] : undefined;
  const feel = (problem?.counts.feel ?? 0) + (extra?.feel ?? 0);
  const build = (problem?.counts.build ?? 0) + (extra?.build ?? 0);
  const know = (problem?.counts.know ?? 0) + (extra?.know ?? 0);

  // Return referentially stable counts to prevent downstream consumer re-renders
  return useMemo(() => ({ feel, build, know }), [feel, build, know]);
}
