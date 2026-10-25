# Contributing

Foundra is a single-player curated frontend. Do not imply accounts, matching,
messaging, automated sourcing, or a backend already exist. Read README.md first.
No budget, deadline, or formal compliance requirements are documented; clarify
those before expanding product scope.

Use Node 22 and `npm ci --ignore-scripts`. Run:

```sh
npm run typecheck
npm run lint -- --max-warnings=0
npm test
npm run build
npm run build:single
npm audit --audit-level=high
```

The dependency audit passed with zero known findings after the 2026-10-25
remediation; advisory data changes, so rerun it for every proposed change.
Do not disable that check. Inspect lifecycle scripts before enabling any.
Check open PRs for overlap; prefer small changes with focused regression tests.
Keep generated output, local state, secrets, and node_modules out of Git.

Use a feature branch and PR, never direct changes to main. This Arena session is
fixed to `arena/bb322caa-foundra`. Obtain human review, especially for security,
architecture, data, or deployment changes. Agents must not self-merge. See
`docs/OPERATIONS.md` for deployment and rollback boundaries.
