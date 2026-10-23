import type { Problem, SignalLabel } from "../types";

export interface BoardFilter {
  query: string;
  industries: string[];
  signals: SignalLabel[];
}

export const EMPTY_FILTER: BoardFilter = {
  query: "",
  industries: [],
  signals: [],
};

export function isFilterActive(filter: BoardFilter): boolean {
  return (
    filter.query.trim() !== "" ||
    filter.industries.length > 0 ||
    filter.signals.length > 0
  );
}

/** Unique industries in data order, for building the filter chip row. */
export function industriesFrom(problems: Problem[]): string[] {
  return [...new Set(problems.map((p) => p.industry))];
}

/** Unique signal labels in data order, for the signal chip row. */
export function signalsFrom(problems: Problem[]): SignalLabel[] {
  return [...new Set(problems.map((p) => p.signal))];
}

/**
 * Dimensions AND together; values within a dimension OR.
 * The query is a case-insensitive substring match over title, pain, and industry.
 * Optimized for live-filtering over problem sets:
 * - Pre-allocates Sets for industry/signal filtering to enable O(1) lookups instead of O(M) Array.includes.
 * - Avoids string template heap allocations (`${p.title} ${p.pain} ${p.industry}`) on every iteration step.
 */
export function filterProblems(
  problems: Problem[],
  filter: BoardFilter
): Problem[] {
  const query = filter.query.trim().toLowerCase();
  const industrySet =
    filter.industries.length > 0 ? new Set(filter.industries) : null;
  const signalSet =
    filter.signals.length > 0 ? new Set(filter.signals) : null;

  return problems.filter((p) => {
    if (
      query &&
      !p.title.toLowerCase().includes(query) &&
      !p.pain.toLowerCase().includes(query) &&
      !p.industry.toLowerCase().includes(query)
    ) {
      return false;
    }
    if (industrySet && !industrySet.has(p.industry)) {
      return false;
    }
    if (signalSet && !signalSet.has(p.signal)) {
      return false;
    }
    return true;
  });
}
