# PR Review: #1 — Solid honest MVP + impeccable shadcn UI pass

**Reviewed**: 2026-06-18
**Author**: xb3sox (Basem Sufan)
**Branch**: mvp/solid-honest-foundra → main
**Decision**: APPROVE with comments (HIGH + cheap MEDIUM/LOW fixed in `32c608b`; remaining items are non-blocking follow-ups)

## Summary

Large, coherent PR (39 files, +738/-1220) that fixes a broken core loop, makes proof verifiable, removes over-claims, and adds a crafted shadcn UI layer. Two independent reviews (React + general quality/security) found **no CRITICAL** issues, one real HIGH bug (duplicate activity log), and a set of robustness/style items. The HIGH and the cheap MEDIUM/LOW were fixed in this PR; the rest are noted as follow-ups.

## Findings

### CRITICAL
None. No `dangerouslySetInnerHTML`, no secrets, no injection path. External links are https-validated (`toSafeHref`) and use `rel="noopener noreferrer"`. No `any`.

### HIGH
- **Duplicate room activity on re-commit** (`CommitmentModal.tsx`, `CommitmentActions.tsx`) — re-opening an already-"Added" position re-ran `addActivity`, duplicating the feed (the count was already guarded, the activity wasn't). **Fixed** `32c608b`: `register()` logs activity only for a new position, and "Added" now routes straight to the room.

### MEDIUM
- **Unvalidated localStorage hydration** (`store.tsx:load`) — `{...defaultState, ...JSON.parse(raw)}` had no shape guard; a tampered/stale payload could inject wrong-typed keys and crash at access. **Fixed**: plain-object guard before merge. (Note: object spread does not enable `__proto__` prototype pollution, so the security angle was over-stated; the real risk is shape drift.)
- **Email stored without format validation** (`CommitmentModal.tsx`). **Fixed**: regex guard before `setEmail`.
- **`type="button"` missing on raw buttons** (Room/ProblemDetail/RoomPeople) — no current bug (none in a form), defensive. **Fixed**.
- **`problems.ts` is ~1065 lines** (> 800 house limit) — pre-existing seed file. **Deferred**: split into `src/data/problems/`.

### LOW
- `ProofCard` used array-index keys — **Fixed** (stable composite key).
- `initials("")` returned `""` (blank avatar) — **Fixed** (`"?"` fallback).
- `Routes` effect omits `route` from deps (derived from `path`, correct) — **Fixed** (comment).
- `TooltipProvider` outside Router/Store — **Fixed** (moved inside).
- `console.error` in `ErrorBoundary` — kept (standard for an error boundary; no logger exists).
- Amber hex pair repeated in 3 files without a token — **Deferred** (design token).
- No ESLint / `eslint-plugin-react-hooks` — **Deferred** (pre-existing; recommend adding for CI).
- `radix-ui` unified import (bundle-size note only) — no action.

## Validation Results

| Check | Result |
|---|---|
| Type check (`tsc --noEmit`) | Pass |
| Lint | Skipped (no lint script configured) |
| Tests (`vitest`, 33) | Pass |
| Build (`vite build`) | Pass |

## Files Reviewed
39 changed (Added: ui/card, ui/tooltip, ui/avatar, HeroReceipts, lib/initials, room/RoomFirstSolution; Deleted: PipelineQueue, RoomBrief, RoomPrompts, ui/field, lib/role-icons; Modified: pages, store, router, data, types, primitives, copy). Read in full at PR head.
