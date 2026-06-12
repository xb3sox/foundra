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
 * The query is a case-insensitive substring match over title, pain,
 * and industry.
 */
export function filterProblems(
  problems: Problem[],
  filter: BoardFilter
): Problem[] {
  const query = filter.query.trim().toLowerCase();
  return problems.filter((p) => {
    if (
      query &&
      !`${p.title} ${p.pain} ${p.industry}`.toLowerCase().includes(query)
    ) {
      return false;
    }
    if (
      filter.industries.length > 0 &&
      !filter.industries.includes(p.industry)
    ) {
      return false;
    }
    if (filter.signals.length > 0 && !filter.signals.includes(p.signal)) {
      return false;
    }
    return true;
  });
}
