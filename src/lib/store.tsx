import {
  createContext,
  useCallback,
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

  /**
   * Performance Optimizations:
   * 1. Wrap state-mutating actions in `useCallback` to maintain reference equality across renders,
   *    preventing unnecessary re-renders in consumer components that receive these handlers.
   * 2. Wrap `StoreContext.Provider` value in `useMemo` so context consumers only re-render when
   *    actual state or status flags change.
   */
  const addCommitment = useCallback((problemId: string, type: CommitmentType) => {
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
  }, []);

  const setEmail = useCallback((email: string) => {
    setState((s) => ({ ...s, email }));
  }, []);

  const toggleChecklist = useCallback((
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
  }, []);

  const addActivity = useCallback((problemId: string, text: string) => {
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
  }, []);

  const markConnected = useCallback((problemId: string, name: string) => {
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
  }, []);

  const getRoom = useCallback(
    (problemId: string) => state.rooms[problemId],
    [state.rooms]
  );

  const sessionOnly = loaded.sessionOnly || writeFailed;

  const value = useMemo(
    () => ({
      state,
      sessionOnly,
      addCommitment,
      setEmail,
      toggleChecklist,
      addActivity,
      markConnected,
      getRoom,
    }),
    [
      state,
      sessionOnly,
      addCommitment,
      setEmail,
      toggleChecklist,
      addActivity,
      markConnected,
      getRoom,
    ]
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

/**
 * Seed counts plus any signals the current user added locally.
 * Accepts undefined so pages can call it before their not-found guard
 * (hooks must run unconditionally).
 *
 * Performance Optimization:
 * Memoizes count object calculation so components calling `useLiveCounts` receive stable
 * object references when counts have not changed, reducing unnecessary child component re-renders.
 */
export function useLiveCounts(
  problem: { id: string; counts: Counts } | undefined
): Counts {
  const { state } = useStore();
  const problemId = problem?.id;
  const feelSeed = problem?.counts.feel;
  const buildSeed = problem?.counts.build;
  const knowSeed = problem?.counts.know;
  const extra = problemId ? state.extraCounts[problemId] : undefined;

  return useMemo(() => {
    if (!problem || feelSeed === undefined || buildSeed === undefined || knowSeed === undefined) {
      return { feel: 0, build: 0, know: 0 };
    }
    return {
      feel: feelSeed + (extra?.feel ?? 0),
      build: buildSeed + (extra?.build ?? 0),
      know: knowSeed + (extra?.know ?? 0),
    };
  }, [problem, feelSeed, buildSeed, knowSeed, extra?.feel, extra?.build, extra?.know]);
}
