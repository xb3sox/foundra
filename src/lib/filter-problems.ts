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
  const set = new Set<string>();
  for (let i = 0; i < problems.length; i++) {
    set.add(problems[i].industry);
  }
  return Array.from(set);
}

/** Unique signal labels in data order, for the signal chip row. */
export function signalsFrom(problems: Problem[]): SignalLabel[] {
  const set = new Set<SignalLabel>();
  for (let i = 0; i < problems.length; i++) {
    set.add(problems[i].signal);
  }
  return Array.from(set);
}

/**
 * Dimensions AND together; values within a dimension OR.
 * The query is a case-insensitive substring match over title, pain,
 * and industry.
 *
 * Performance Optimizations:
 * 1. Pre-convert `filter.industries` and `filter.signals` to Set instances before looping,
 *    enabling O(1) membership lookups instead of O(k) array scans per problem.
 * 2. Filter early using cheap O(1) Set checks to short-circuit non-matching items before
 *    performing string operations.
 * 3. Fast-path individual field checks (title, pain, industry) with `toLowerCase().includes(query)`.
 *    This avoids template string allocations (`${p.title} ${p.pain} ${p.industry}`) and skips
 *    lowercasing `pain` and `industry` when `title` matches.
 * 4. Fallback to full concatenated string match if fast-path individual field checks return false,
 *    ensuring 100% exact backward-compatible search behavior even for queries spanning field boundaries.
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
    // 1. Fast O(1) set checks first to short-circuit non-matching items
    if (industrySet && !industrySet.has(p.industry)) {
      return false;
    }
    if (signalSet && !signalSet.has(p.signal)) {
      return false;
    }

    // 2. Query check with fast-path short-circuiting and exact fallback
    if (query) {
      const matchesField =
        p.title.toLowerCase().includes(query) ||
        p.pain.toLowerCase().includes(query) ||
        p.industry.toLowerCase().includes(query);

      if (!matchesField) {
        // Fallback check for queries spanning across field boundaries
        const combined = `${p.title} ${p.pain} ${p.industry}`.toLowerCase();
        if (!combined.includes(query)) {
          return false;
        }
      }
    }

    return true;
  });
}
