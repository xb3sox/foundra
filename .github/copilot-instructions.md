# GitHub Copilot instructions

`AGENTS.md` at the repository root is the authoritative shared context for all
coding agents. Read it before planning or editing. Also read the `Status`
section of `README.md` and `docs/GITHUB_DELIVERY_PLAN.md` for the product
boundary and GitHub-native delivery workflow.

Foundra is a static React 19 / TypeScript / Vite single-player demo. State is
stored only in `localStorage`; there are no accounts, backend, messaging,
matching, live scraping, or runtime third-party API calls. Never present a
roadmap idea as an existing capability.

Before declaring work complete, run the gates in `AGENTS.md` and follow the PR
template. Require human approval for ambiguous product decisions, dataset
schema or branding changes, dependency changes, security settings, protected
branch policy, deployments, releases, and merges. Do not self-merge or bypass
CI. If instructions conflict, `AGENTS.md` wins; ask a human to reconcile it.
