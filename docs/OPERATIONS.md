# Deployment, recovery, and cost controls

> Current delivery workflow and capability decisions live in
> [GITHUB_DELIVERY_PLAN.md](GITHUB_DELIVERY_PLAN.md). This document covers
> deployment, recovery, privacy, and cost boundaries.

## Current architecture
Static React/Vite SPA; curated source data; browser-local commitments, room state,
and email under `foundra-state-v1`. No backend, database, authentication, or
server-side recovery exists. See [storage recovery](STORAGE_RECOVERY.md) for
validated loading, session-only recovery, and failed-save warnings. Browser data is not synced or backed up by Git.
Do not introduce Supabase or other infrastructure without an approved need.

## Pre-merge gate
Run all CONTRIBUTING.md checks. Audit existing dependency advisories and obtain
human review. Unit tests do not replace browser checks: exercise board filters,
problem detail, commitment, room checklist, reload persistence, unknown routes,
back/forward navigation, keyboard focus, and narrow viewport. Verify deep links
on a preview deployment. Browser and remote deployment checks remain outstanding.

## Deployment (human-authorized only)
Existing `vercel.json` defines SPA rewrites and several security/cache headers.
Default `npm run build` creates the deployable chunked `dist/`. The sharing build
`npm run build:single` overwrites dist; rerun the default build before deploying.
No credentials belong in Vite environment variables: browser bundles are public.
Verify Vercel Git integration, production branch, preview exposure, account
ownership, project limits, and deployment approvals before approving a rollout.
GitHub environment rules do not establish Vercel deployment protections.

## Rollback
Record the known-good commit and deployment ID before rollout. An authorized
operator should restore the previous verified Vercel deployment using its
rollback/redeploy controls. Alternatively revert the change through a reviewed
PR, rerun checks, then authorize deployment. Do not reset shared branch history.
Smoke-test root and deep links, asset loading, headers, and persisted state.
A code rollback does not restore browser-local data. Storage schema changes must
be backward compatible or have a separately reviewed migration/recovery plan.

## Backups and privacy
Git tracks code and curated data, not browser state. Do not request users' raw
localStorage dumps; they may contain email. Define retention, deletion controls,
and informed export/import before adding a backup feature. A user can remove
this site's browser storage to erase local progress, irreversibly.
Owner should document and test a private repository mirror/export and restore
procedure; no external backup destination is authorized by this preparation.

## Cost and governance
CI has timeouts, cancellation of superseded runs, and read-only token access.
Dependency PR counts are bounded. No deployments, schedules in CI, uploaded
artifacts, paid services, or self-hosted runners are added. Dependabot runs weekly.
Owner must confirm Actions and Vercel quotas/spend limits and alerts. The
2026-10-26 audit found no active repository ruleset; requiring PR review and CI
checks on `main` is an explicit owner action tracked in issue #19. Do not buy a
plan, add bypass privileges, or change visibility without separate approval.
