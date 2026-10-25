# Follow-up issue drafts

GitHub createIssue failed with “Resource not accessible by integration” for all
four drafts on 2026-10-25. No issue was created. Check for duplicates before
publishing these when issue-write access is available.

## Critical — Triage and remediate dependency audit findings
Existing audit: 23 findings (1 critical, 14 high, 7 moderate, 1 low).
Critical transitive proxy-addr; affected direct packages shadcn, vite, vitest.
Acceptance:
- Inspect advisory details and runtime/build-tool reachability; document disposition.
- Review whether shadcn CLI belongs in runtime dependencies. Isolate changes,
  review upstream migration notes and lockfile diff, add regression coverage.
- Pass quality gates and npm audit --audit-level=high. No force updates or bypass.
Human security review required. Rollback by reviewed revert PR.

## High — Validate nested persisted state before hydration
Existing load() checks only top-level object. commitments:null or malformed room
arrays can crash callers. Historical review overstates the protection.
Acceptance:
- Failing regressions for null/wrong maps, invalid types/counts, malformed rooms,
  corrupt JSON, and valid partial/legacy state.
- Validate boundary data with a documented recovery strategy that preserves valid
  progress. Prove reload persistence and pass all checks.
Data-sensitive change; human review required. Separate from URL PRs #4/#7.

## High — Confirm repository and deployment review protections
Acceptance:
- Owner verifies plan limits, review/check enforcement, security/secret settings,
  Actions permissions/runners, quotas and spend controls.
- Verify Vercel production branch, preview exposure and approvals independently
  of GitHub environments; document unavailable controls and manual safeguards.
- Explicit approval before permissions, billing, visibility or production changes.
- Human selects overlapping PRs #4/#7; no automatic merge.

## Medium — Complete browser, privacy and recovery validation
Acceptance:
- Test board/detail/commitment/room, reload, keyboard/focus, mobile, history and
  deployed deep links; coordinate PRs #2/#5.
- Define email collection, retention, deletion and local-state recovery behavior.
- Measure bundle performance before changes; coordinate PRs #3/#6.
- Owner verifies a private code backup/restore procedure and records evidence.
No new backend, analytics or paid service required. Human reviews scope/data changes.

## Refined publication plan

The four historical drafts above are superseded for publication by
[GITHUB_DELIVERY_PLAN.md](GITHUB_DELIVERY_PLAN.md), which splits combined work
into ten scoped issues with dependencies and defines one minimal board.
Publish that set only after rechecking duplicates and restoring GitHub access.
