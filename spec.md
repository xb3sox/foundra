# spec.md — Foundra

Owner: product + eng lead · Status: approved (mirrors shipped MVP) · Source: intent.md · Last updated: 2026-10-22

## Functional requirements
- FR1 Problem board: search, industry filter, signal-strength filter (`src/lib/filter-problems.ts`)
- FR2 Problem detail: signal badges, proof cards with live source links, score breakdown (5 factors)
- FR3 Positions: feel-the-pain / can-build / know-market; persisted per problem
- FR4 Validation room: checklist progress, first-solution, first-interview prep; persisted
- FR5 Routing: hash-free client routing via `src/lib/router.tsx` (no router dependency)
- FR6 Commitment modal → toast confirmation; no data leaves the browser

## UX requirements
- Minimal single-column flow, card-based board, equal-height cards with clamped text
- Empty/first-run state explains the product in < 30 seconds (HeroReceipts)
- All illustrative people labeled as such (README honesty rule); no fake social proof UI

## Technical requirements
- React 19 + Vite 7 + Tailwind 4 + TypeScript strict; ESLint flat config; Vitest + Testing Library
- Persistence: localStorage only, versioned keys in `src/lib/store.tsx`
- Build outputs: chunked (Vercel) and `build:single` (vite-plugin-singlefile) artifact
- No runtime backend calls of any kind

## Security & privacy requirements
- SR1 Zero PII collection or transmission (frontend-only is the control)
- SR2 `npm audit --omit=dev` = 0 vulnerabilities on main
- SR3 CSP + security headers via `vercel.json`
- SR4 No secrets in repo; `.env*` gitignored

## Operational requirements
- OR1 CI runs typecheck, lint, tests, build on every push/PR (required gate)
- OR2 ErrorBoundary catches render failures; visible fallback
- OR3 Rollback = redeploy previous commit (static host, immutable builds)

## Acceptance criteria (release)
All gates green: `npm run typecheck && npm run lint && npm test && npm run build`; audit clean; README status section matches shipped behavior.

## Open questions
- Q1 Contact/privacy copy depth (footer link target) — pending product decision
- Q2 Whether dark-mode CSS scaffold stays dormant or is removed — pending design decision
