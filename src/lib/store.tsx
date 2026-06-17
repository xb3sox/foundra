import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import type { CommitmentType } from "../types";

interface RoomState {
  checklist: Record<string, boolean>;
  activity: { id: string; text: string; time: string }[];
  connected: string[]; // names of people the user marked connected
}

interface FoundraState {
  // problemId -> set of commitment types the current user took
  commitments: Record<string, CommitmentType[]>;
  // extra signal counts added by the user, problemId -> {feel,build,know}
  extraCounts: Record<string, { feel: number; build: number; know: number }>;
  email: string | null;
  rooms: Record<string, RoomState>;
}

const KEY = "foundra-state-v1";

const defaultState: FoundraState = {
  commitments: {},
  extraCounts: {},
  email: null,
  rooms: {},
};

interface StoreContextValue {
  state: FoundraState;
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

function load(): FoundraState {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) return { ...defaultState, ...JSON.parse(raw) };
  } catch {
    /* ignore */
  }
  return defaultState;
}

export function StoreProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<FoundraState>(load);

  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(state));
    } catch {
      /* ignore */
    }
  }, [state]);

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

  return (
    <StoreContext.Provider
      value={{
        state,
        addCommitment,
        setEmail,
        toggleChecklist,
        addActivity,
        markConnected,
        getRoom,
      }}
    >
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
  if (!problem) return { feel: 0, build: 0, know: 0 };
  const extra = state.extraCounts[problem.id] ?? { feel: 0, build: 0, know: 0 };
  return {
    feel: problem.counts.feel + extra.feel,
    build: problem.counts.build + extra.build,
    know: problem.counts.know + extra.know,
  };
}
