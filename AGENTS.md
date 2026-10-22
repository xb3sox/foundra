# AGENTS.md — Foundra

Canonical, tool-neutral instructions for humans and AI agents. Tool-specific files (e.g. CLAUDE.md) must reference this file, not duplicate it. Lifecycle: `intent.md → spec.md → plan.md → code+tests → PR → deploy → feedback → intent.md`.

## What this is
Frontend-only MVP static site (Vercel). No backend, no accounts, no network calls at runtime. Persistence = localStorage only. Read README "Status" before adding features — honesty about demo data is a product requirement.

## Commands (all must pass before committing)
```bash
npm install        # if node_modules missing/corrupt: rm -rf node_modules package-lock.json? NO — keep lockfile; delete node_modules only
npm run dev
npm run typecheck  # tsc --noEmit, strict
npm run lint       # eslint flat config
npm test           # vitest run (33 tests)
npm run build      # chunked prod build
npm run build:single  # single-file HTML artifact
```
If npm crashes with "edgesOut" on tree rebuild (known npm 10.8.2 issue), use `--legacy-peer-deps` for installs; CI uses `npm ci`.

## Architecture map
See `docs/architecture.md` for boundaries, data flow, and decisions.
- `src/App.tsx` — route switch (custom router in `src/lib/router.tsx`, hash-free paths)
- `src/data/problems.ts` — hand-curated dataset (single source of problem content)
- `src/lib/store.tsx` — positions + room progress, localStorage-backed React context
- `src/lib/filter-problems.ts` — board search/filter logic (unit-tested)
- `src/components/board|cards|room|problem|modals|layout` — feature UI
- `src/components/ui/*` — shadcn-style primitives; `cn()` lives ONLY in `src/utils/cn.ts` (import via `@/utils/cn`)
- `src/styles/shadcn-compat.css` — inlined subset replacing the removed `shadcn` dep
- `vercel.json` — headers/CSP; `components.json` — shadcn CLI config (CLI itself NOT installed)

## Conventions
- TypeScript strict; no `any` without justification; path alias `@/` → `src/`
- Tailwind 4 utility-first; design tokens as CSS vars in `src/index.css`; dark-mode scaffold is dormant by design — do not activate or delete without approval
- Tests colocated: `*.test.ts(x)` next to source; new pure logic in `src/lib/` gets tests
- Dataset edits: touch `problems.ts` only; every external claim needs a real public URL
- Copy rule: never imply live users/matching/scraping exist; label illustrative people

## Guardrails for agents
- Never: add runtime dependencies without updating this doc + plan.md rationale; edit package-lock.json by hand; commit secrets/.env; call external APIs; change UI copy/branding without explicit approval
- Keep changes minimal and reversible; one logical change per commit; verify all gates after every change
- Security posture: `npm audit --omit=dev` must stay 0. Dev-server advisories (esbuild/vite) are tracked, not force-fixed
- Before nontrivial work: read intent.md + spec.md; if behavior requirements change, update spec first, then code

## Definition of done
Gates green · lockfile consistent · docs/artifacts updated if scope changed · no dead code introduced · README status still true.
