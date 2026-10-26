# AGENTS.md

Instructions for AI coding agents (Jules, Claude Code, Codex, Cursor, Copilot, …)
working in this repository. This is the canonical shared context;
`.github/copilot-instructions.md` is only a compatibility pointer. If a
`CLAUDE.md` or similar agent file is added, it must reference this file rather
than fork it.

## What this is

Frontend-only static site (Vercel). No backend, no accounts, no runtime network
calls. Persistence is `localStorage` only. Read `README.md` → "Status" before
adding features: honesty about demo data is a product requirement.

For the product lifecycle, Issues-only delivery board, Definition of
Ready/Done, AI authority, and current GitHub capability decisions, read
`docs/GITHUB_DELIVERY_PLAN.md`. Do not assume a GitHub Project board exists;
the current integration does not have Projects scope.

## Toolchain

**This repo uses npm.** `package-lock.json` is the only lockfile; CI runs
`npm ci --ignore-scripts --no-fund`.

- Do **not** add `pnpm-lock.yaml`, `yarn.lock`, or `bun.lockb`. Some agent VMs
  preinstall pnpm and generate one by accident — delete it before committing.
- Do not edit `package-lock.json` by hand; change `package.json` and let npm
  regenerate it.
- Never commit `node_modules/`, `dist/`, `.env*`, or local state.

## Gates — all must pass before committing

```sh
npm ci --ignore-scripts --no-fund
npm run typecheck          # tsc --noEmit, strict
npm run lint -- --max-warnings=0
npm test                   # vitest run
npm run build
npm run build:single
npm audit --audit-level=high
```

CI (`.github/workflows/ci.yml`) runs these as `quality` + `dependencies`. A red
`quality` job means the PR is not ready, whatever the local run said.

## Work selection and scope discipline

- Start only from an issue that is understood, has testable acceptance criteria,
  and is marked `status: ready`. Clarify ambiguity before implementation.
- Use native issue types, status/priority labels, dependencies, and sub-issues
  as documented in `docs/GITHUB_DELIVERY_PLAN.md`; do not invent parallel
  metadata or a second board.
- **One concern per PR.** Don't bundle a dataset rewrite, dependency changes,
  and docs into one branch.
- **Check open issues and PRs before you start.** If an open PR already fixes
  the issue, comment on it instead of opening a duplicate. Prefer coordinated
  work on the existing branch. Never re-solve a problem that already has an
  open PR.
- Keep diffs small and reversible. Do not delete `src/components/ui/*`
  primitives, downgrade dependency versions, or remove the `shadcn` CLI config
  unless the task explicitly asks for it.
- No journal/notes files (`.jules/`, `.Jules/`, `plan.md`, `spec.md`, agent
  scratchpads) in committed changes. Use the agent's own memory/settings for
  that. PR bodies carry the rationale.

## Code conventions

- TypeScript strict; no `any` without a justification comment. Path alias `@/` → `src/`.
- Tailwind 4 utility-first. Design tokens are CSS vars in `src/index.css`;
  the dark-mode scaffold is dormant — do not activate or delete it.
- `cn()` lives only in `src/utils/cn.ts` (import via `@/utils/cn`). Shared
  helpers (`toSafeHref`, …) belong in `src/utils/` or `src/lib/`, never inlined
  per component.
- Tests are colocated (`*.test.ts(x)`). New pure logic in `src/lib/` needs unit
  tests. Test fixtures must satisfy the real types in `src/types/` — run
  `npm run typecheck` after writing a fixture, not just `npm test`.
- External links always go through `toSafeHref` (https only) with
  `rel="noopener noreferrer"`.
- Dataset edits: keep every external claim backed by a real public URL. Never
  imply live users, matching, messaging, or scraping exist; people in rooms are
  illustrative.
- Accessibility: interactive non-`<button>` controls need `role` + state
  (`aria-checked`, `aria-valuenow`). Reuse existing primitives in
  `src/components/ui/`.

## Security and approvals

- Never commit secrets; no runtime third-party API calls.
- `npm audit --omit=dev` must stay at 0. Dev-server advisories (esbuild/vite)
  are tracked, not force-fixed.
- Ask a human before: changing dependencies, touching `vercel.json` headers/CSP,
  editing the dataset schema, altering product copy/branding, changing security
  settings or protected-branch policy, deploying, publishing a release, or
  incurring cost.
- Agents must not self-merge. Open a PR and wait for independent human review.
- Deployment and rollback boundaries: `docs/OPERATIONS.md`.
- AI may investigate, refine, plan, implement, test, document, and triage CI
  failures. Human approval is required for ambiguous product decisions and
  consequential changes. Never treat an agent output as automatically correct.

## Definition of done

Acceptance criteria are satisfied; all gates and remote CI checks pass; focused
regression coverage exists or its absence is justified; independent human review
is complete; security/privacy impact and rollback are recorded; relevant docs
are updated; no unrelated files are touched. The PR body explains what/why and
names anything still open. Implementation completion, production release, and
verified customer outcome are recorded separately when they occur after merge.
