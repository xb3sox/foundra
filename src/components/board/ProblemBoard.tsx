import { useMemo, useState } from "react";
import { SearchX } from "lucide-react";
import { problems, todaysProblems } from "../../data/problems";
import { ProblemCard } from "../cards/ProblemCard";
import { Button } from "../ui/button";
import { BoardFilters } from "./BoardFilters";
import {
  EMPTY_FILTER,
  filterProblems,
  industriesFrom,
  isFilterActive,
  signalsFrom,
  type BoardFilter,
} from "../../lib/filter-problems";
import type { CommitmentType, Problem } from "../../types";

export function ProblemBoard({
  onCommit,
}: {
  onCommit: (problem: Problem, type: CommitmentType) => void;
}) {
  const [filter, setFilter] = useState<BoardFilter>(EMPTY_FILTER);

  const industries = useMemo(() => industriesFrom(problems), []);
  const signals = useMemo(() => signalsFrom(problems), []);
  const active = isFilterActive(filter);
  const results = useMemo(
    () => (active ? filterProblems(problems, filter) : []),
    [active, filter]
  );

  return (
    <>
      <section
        id="today"
        className="mx-auto max-w-6xl px-5 pt-16 sm:px-8 sm:pt-24"
      >
        <div className="flex items-end justify-between">
          <div>
            <h2
              className="text-2xl font-semibold tracking-tight sm:text-[28px]"
              aria-live="polite"
            >
              {active
                ? `${results.length} of ${problems.length} problems`
                : "Today's 3 problems"}
            </h2>
            <p className="mt-1.5 text-[15px] text-ink-soft">
              {active
                ? "Everything on the board that matches your filters."
                : "The three highest-signal problems from this week's pipeline. Open one, review the proof, pick your action."}
            </p>
          </div>
        </div>

        <BoardFilters
          value={filter}
          onChange={setFilter}
          industries={industries}
          signals={signals}
        />

        {active ? (
          results.length > 0 ? (
            <div className="mt-8 grid gap-5 md:grid-cols-3">
              {results.map((problem, i) => (
                <ProblemCard
                  key={problem.id}
                  problem={problem}
                  index={i % 3}
                  onCommit={(type) => onCommit(problem, type)}
                />
              ))}
            </div>
          ) : (
            <div className="mt-8 flex flex-col items-center gap-3 rounded-2xl border border-dashed border-line bg-surface/60 px-6 py-14 text-center">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-black/[0.05] text-ink-muted">
                <SearchX className="h-5 w-5" />
              </span>
              <p className="text-[15px] font-medium text-ink">
                No problems match.
              </p>
              <p className="-mt-2 text-[13.5px] text-ink-muted">
                Try fewer filters or a different search.
              </p>
              <Button
                size="sm"
                variant="secondary"
                className="mt-1"
                onClick={() => setFilter(EMPTY_FILTER)}
              >
                Reset filters
              </Button>
            </div>
          )
        ) : (
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {todaysProblems.map((problem, i) => (
              <ProblemCard
                key={problem.id}
                problem={problem}
                index={i}
                onCommit={(type) => onCommit(problem, type)}
              />
            ))}
          </div>
        )}
      </section>

      {!active && (
        <section className="mx-auto max-w-6xl px-5 pt-16 sm:px-8 sm:pt-20">
          <div>
            <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
              More problems on the board
            </h2>
            <p className="mt-1.5 text-[15px] text-ink-soft">
              Published earlier from the same pipeline. Signals keep accruing
              until someone builds.
            </p>
          </div>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {problems.slice(3).map((problem, i) => (
              <ProblemCard
                key={problem.id}
                problem={problem}
                index={i % 3}
                onCommit={(type) => onCommit(problem, type)}
              />
            ))}
          </div>
        </section>
      )}
    </>
  );
}
