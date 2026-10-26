# Contributing

Foundra is a single-player curated frontend. Do not imply accounts, matching,
messaging, automated sourcing, analytics, or a backend already exist. Read
`README.md` first. No budget, deadline, or formal compliance requirement is
documented; clarify those before expanding product scope.

Read the [product operating model](docs/GITHUB_DELIVERY_PLAN.md) before opening
an issue or starting work. Use the structured GitHub issue forms, native issue
types, status/priority labels, and the Definition of Ready/Done. Start
implementation only when an issue is Ready and important approvals are named.

Use Node 22 and `npm ci --ignore-scripts --no-fund`. Run:

```sh
npm run typecheck
npm run lint -- --max-warnings=0
npm test
npm run build
npm run build:single
npm audit --audit-level=high
```

The current lockfile reports zero known high-level audit findings; advisory data
changes, so rerun the check for every proposed change. Do not disable it.
Inspect lifecycle scripts before enabling any. Check open issues and PRs for
overlap; prefer small changes with focused regression tests. Keep generated
output, local state, secrets, and `node_modules` out of Git.

Use a feature branch and PR, never direct changes to `main`. Obtain human
review, especially for security, architecture, data, or deployment changes.
Agents must not self-merge. See `docs/OPERATIONS.md` for deployment and rollback
boundaries and `AGENTS.md` for the canonical AI-agent instructions.
