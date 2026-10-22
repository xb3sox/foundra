# plan.md — Foundra

Owner: eng lead · Status: P0/P1 done, P2 pending approval · Sources: intent.md, spec.md · Last updated: 2026-10-22

## Phase 0 — AI-native foundation ✅ DONE (this commit)
Create `intent.md`, `spec.md`, `plan.md`, `AGENTS.md`, minimal `CLAUDE.md`, `docs/architecture.md`.
Acceptance: artifacts committed; commands in AGENTS.md match package.json scripts.

## Phase 1 — CI & hygiene ✅ DONE
1. GitHub Actions: typecheck + lint + test + build on push/PR (`ci.yml`)
2. Removed `shadcn` runtime dep → 0 prod vulnerabilities; used CSS inlined to `src/styles/shadcn-compat.css`
3. Deleted dead components (`separator.tsx`, `textarea.tsx`); removed duplicate `lib/utils.ts` re-export
4. Restored broken peer: added `@testing-library/dom` (fresh installs had failing tests)
Acceptance: CI green on main; `npm audit --omit=dev` = 0; all local gates pass. ✅ verified.

## Phase 2 — Optional (needs approval)
- P2a Split `src/data/problems.ts` (1,065 lines) into per-problem modules — low risk, DX only
- P2b Footer contact/privacy copy decision (spec Q1) — product judgment, approval gate
- P2c Bundle-size: framer-motion dominates chunk; lazy-load detail routes if it matters post-launch

## Rejected / no change
- Router/state/backend/analytics libraries; UI redesign; dark-mode activation (keep dormant shadcn scaffold); forcing dev-only audit fixes (esbuild/vite advisories affect dev server only; upgrade when upstream releases, never `--force`).

## Risk notes
- npm 10.8.2 crashes building the ideal tree with strict peer resolution here → CI uses `npm ci` from lockfile (no tree rebuild). If `npm ci` fails in CI, add `--legacy-peer-deps`.
- Lockfile regenerated without `shadcn`; keep it committed and never edit by hand.

## Metrics
Leading: CI pass rate, time-to-green on PRs, open findings count. Lagging: prod vulns = 0 sustained; new-contributor setup < 10 min.

## Rollback
Static Vercel deploy: revert commit + redeploy. Each phase is a separate commit.
