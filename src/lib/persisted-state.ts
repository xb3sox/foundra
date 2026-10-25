import type { CommitmentType } from "../types";

export interface RoomState {
  checklist: Record<string, boolean>;
  activity: { id: string; text: string; time: string }[];
  connected: string[];
}

export interface FoundraState {
  commitments: Record<string, CommitmentType[]>;
  extraCounts: Record<string, { feel: number; build: number; know: number }>;
  email: string | null;
  rooms: Record<string, RoomState>;
}

export const STORAGE_KEY = "foundra-state-v1";

function emptyState(): FoundraState {
  return { commitments: {}, extraCounts: {}, email: null, rooms: {} };
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

const isString = (value: unknown): value is string => typeof value === "string";
const isBoolean = (value: unknown): value is boolean => typeof value === "boolean";
const isCount = (value: unknown): value is number =>
  typeof value === "number" && Number.isSafeInteger(value) && value >= 0;
const isCommitment = (value: unknown): value is CommitmentType =>
  value === "I have this problem" || value === "I can build this" ||
  value === "I know this market";

/** Recover usable fields in memory; never rewrite malformed or newer saved data. */
export function loadPersistedState(): { state: FoundraState; sessionOnly: boolean } {
  let damaged = false;
  function object(value: unknown, knownKeys?: string[]): Record<string, unknown> {
    if (value === undefined) return {};
    if (!isRecord(value)) { damaged = true; return {}; }
    if (knownKeys && Object.keys(value).some((key) => !knownKeys.includes(key))) {
      damaged = true;
    }
    return value;
  }
  function field<T>(value: unknown, guard: (v: unknown) => v is T, fallback: T): T {
    if (value === undefined) return fallback;
    if (guard(value)) return value;
    damaged = true;
    return fallback;
  }
  function list<T>(value: unknown, guard: (v: unknown) => v is T): T[] {
    if (value === undefined) return [];
    if (!Array.isArray(value)) { damaged = true; return []; }
    return value.filter((entry): entry is T => {
      if (guard(entry)) return true;
      damaged = true;
      return false;
    });
  }
  function map<T>(value: unknown, parse: (v: unknown) => T | undefined): Record<string, T> {
    return Object.fromEntries(Object.entries(object(value)).flatMap(([key, entry]) => {
      if (["__proto__", "prototype", "constructor"].includes(key)) {
        damaged = true;
        return [];
      }
      const parsed = parse(entry);
      return parsed === undefined ? [] : [[key, parsed]];
    }));
  }
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw === null) return { state: emptyState(), sessionOnly: false };
    const parsed: unknown = JSON.parse(raw);
    const data = object(parsed, ["commitments", "extraCounts", "email", "rooms"]);
    const state: FoundraState = {
      commitments: map(data.commitments, (value) => list(value, isCommitment)),
      extraCounts: map(data.extraCounts, (value) => {
        const counts = object(value, ["feel", "build", "know"]);
        return {
          feel: field(counts.feel, isCount, 0),
          build: field(counts.build, isCount, 0),
          know: field(counts.know, isCount, 0),
        };
      }),
      email: field(data.email, (v): v is string | null => v === null || isString(v), null),
      rooms: map(data.rooms, (value) => {
        const room = object(value, ["checklist", "activity", "connected"]);
        return {
          checklist: map(room.checklist, (entry) => {
            if (isBoolean(entry)) return entry;
            damaged = true;
            return undefined;
          }),
          activity: list(room.activity, (entry): entry is RoomState["activity"][number] => {
            if (!isRecord(entry)) return false;
            object(entry, ["id", "text", "time"]);
            return isString(entry.id) && isString(entry.text) && isString(entry.time);
          }),
          connected: list(room.connected, isString),
        };
      }),
    };
    return { state, sessionOnly: damaged };
  } catch {
    // Includes unavailable storage. Do not attempt to overwrite unreadable data.
    return { state: emptyState(), sessionOnly: true };
  }
}
