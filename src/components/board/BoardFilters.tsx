import { Search, X } from "lucide-react";
import { cn } from "../../utils/cn";
import { TextInput, chipBase, chipOff } from "../forms/Fields";
import { ToggleGroup, ToggleGroupItem } from "../ui/toggle-group";
import {
  isFilterActive,
  EMPTY_FILTER,
  type BoardFilter,
} from "../../lib/filter-problems";
import type { SignalLabel } from "../../types";

const compactChip = "gap-1.5 px-3 py-1.5 text-[12.5px]";

export function BoardFilters({
  value,
  onChange,
  industries,
  signals,
}: {
  value: BoardFilter;
  onChange: (filter: BoardFilter) => void;
  industries: string[];
  signals: SignalLabel[];
}) {
  return (
    <div className="mt-6 flex flex-col gap-3">
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative w-full sm:w-72">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-muted" />
          <TextInput
            type="text"
            value={value.query}
            onChange={(e) => onChange({ ...value, query: e.target.value })}
            onKeyDown={(e) => {
              if (e.key === "Escape" && value.query) {
                onChange({ ...value, query: "" });
              }
            }}
            placeholder="Search problems…"
            aria-label="Search problems"
            className={cn(
              "rounded-full py-2 pl-10 text-[13.5px]",
              value.query && "pr-9"
            )}
          />
          {value.query && (
            <button
              type="button"
              onClick={() => onChange({ ...value, query: "" })}
              aria-label="Clear search query"
              className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-ink-muted transition-colors hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40 rounded-full p-0.5"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
        </div>

        <ToggleGroup
          type="multiple"
          value={value.signals}
          onValueChange={(signals) =>
            onChange({ ...value, signals: signals as SignalLabel[] })
          }
          aria-label="Filter by signal strength"
          className="flex w-fit flex-wrap justify-start gap-2"
        >
          {signals.map((signal) => (
            <ToggleGroupItem
              key={signal}
              value={signal}
              className={cn(
                chipBase,
                chipOff,
                compactChip,
                "data-[state=on]:border-accent data-[state=on]:bg-accent-soft data-[state=on]:text-accent-ink"
              )}
            >
              {signal}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>

        {isFilterActive(value) && (
          <button
            type="button"
            onClick={() => onChange(EMPTY_FILTER)}
            className="inline-flex cursor-pointer items-center gap-1 rounded-full px-2 py-1.5 text-[12.5px] font-medium text-ink-muted transition-colors hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40"
          >
            <X className="h-3.5 w-3.5" />
            Reset
          </button>
        )}
      </div>

      {/* Industry row scrolls horizontally on small screens instead of
          stacking eleven chips. */}
      <div className="-mx-5 overflow-x-auto px-5 sm:mx-0 sm:px-0">
        <ToggleGroup
          type="single"
          value={value.industries[0] ?? ""}
          onValueChange={(industry) =>
            onChange({ ...value, industries: industry ? [industry] : [] })
          }
          aria-label="Filter by industry"
          className="flex w-max flex-nowrap justify-start gap-2 pb-1 sm:w-full sm:flex-wrap"
        >
          {industries.map((industry) => (
            <ToggleGroupItem
              key={industry}
              value={industry}
              className={cn(
                chipBase,
                chipOff,
                compactChip,
                "shrink-0 data-[state=on]:border-ink data-[state=on]:bg-ink data-[state=on]:text-white"
              )}
            >
              {industry}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
      </div>
    </div>
  );
}
