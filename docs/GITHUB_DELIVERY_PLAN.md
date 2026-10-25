# Foundra delivery backlog and minimal GitHub board

## Publication status — 2026-10-25

**Blocked, not created.** Read-only issue enumeration found no standalone issues;
PRs #2–#8 already exist. A REST create-issue request returned HTTP 403,
`Resource not accessible by integration`. The user-project GraphQL query returned
four inaccessible project nodes; the repository has no linked project. Existing
user projects therefore cannot be deduplicated safely. No project creation,
project visibility change, permission change, or issue creation succeeded.

The connected GitHub integration needs repository Issues read/write and user
Projects read/write access (or equivalent supported authorization). An ADMIN
viewerPermission response does not establish those integration capabilities.
Do not request credentials in chat. Update/reconnect GitHub through Arena.

This document refines the four drafts in FOLLOW_UP_ISSUES.md into actionable,
non-overlapping work items. Those earlier drafts are retained as audit history;
publish the items below, not both sets. Recheck existing resources before writes.

## Product boundary

Foundra remains a single-player, curated React frontend with browser-local state.
Accounts, matching, messaging, scraping, analytics and backend infrastructure are
not approved scope. No deadline, budget or formal compliance target is documented.
Do not create speculative product-roadmap issues for those capabilities.

## Minimal board specification

- Owner: xb3sox. Proposed name: **Foundra — Delivery**.
- Reuse an existing Foundra project if one exists. Otherwise create exactly one.
- Keep non-public: verify access before linking this private repository or adding
  private issue content. Do not change existing visibility without approval.
- Link only xb3sox/foundra. Use the default Title, Assignees and Status fields.
- One board view, grouped by **Todo / In Progress / Done**.
- Use title prefixes for priority; no custom fields, sprint dates, milestones,
  extra views, automations, organization-wide resources or new label taxonomy.
- Priorities: Critical, High, Medium, Low; advisory severity is not exploitability.
- Put approval/dependency blockers in issue bodies; avoid a fourth status column.
- Keep at most one engineering item In Progress. Waiting work stays Todo with
  the blocker named. Do not assign humans without their agreement.
- Initially all new items are Todo. Existing PR #8 may be added In Progress;
  do not add every overlapping PR as a separate delivery item.
- Done means acceptance evidence and human-reviewed resolution, not a draft PR.
- Keep issue dependencies as real issue links after IDs exist. Never invent IDs.

## Execution order

Publish all ten scoped issues after access is restored. Start security advisory
triage and owner-control verification; review URL work already in #4/#7. Then
storage validation, privacy/recovery, accessibility, browser validation, backup
verification, and measured performance. Close readiness acceptance last.
Independent streams can proceed, but production remains gated on human review.

## Issue-ready work items

### F01 — [Critical] Triage and remediate dependency audit findings

Existing baseline: 23 findings, including one Critical and 14 High. Do not treat
the advisory count as proof of application exploitability.

Acceptance:
- [ ] Refresh audit; classify advisory reachability for runtime and build tools.
- [ ] Isolate compatible remediation; review shadcn CLI placement, upstream notes
  and lockfile changes; no force updates or suppressed gate.
- [ ] Pass typecheck, zero-warning lint, tests, both builds and high-level audit.

Dependencies: none. Blocks F10. Human security review. Rollback: reviewed revert
of dependency and lockfile changes. Existing label: bug.

### F02 — [High] Validate nested persisted state without losing valid progress

load() currently checks only the top-level object and trusts nested values.

Acceptance:
- [ ] Failing regression tests cover null/wrong maps, invalid commitments/counts,
  malformed rooms, corrupt JSON and valid partial/legacy data.
- [ ] Validate the storage boundary with a documented partial recovery policy;
  do not silently discard valid progress or introduce a breaking migration.
- [ ] Verify reload persistence, error paths and all quality checks.

Dependencies: coordinate recovery behavior with F05. Human data/security review.
Rollback: reviewed compatible code revert; do not claim it restores browser data.
Existing label: bug.

### F03 — [High] Resolve overlapping external-link security PRs

Existing PRs #4 and #7 address the same trust boundary. Do not implement a third
competing fix or automatically close either author's work.

Acceptance:
- [ ] Compare current diffs and tests; establish affected callers and schemes.
- [ ] Human selects or requests a consolidated solution; cover allowed HTTPS,
  rejected unsafe schemes and malformed input through focused regression tests.
- [ ] All applicable checks pass; document which PR supersedes which and why.

Dependencies: none; reuse #4/#7. Human security review; no self-merge.
Rollback: reviewed revert with unsafe input remaining disabled where needed.
Existing label: bug.

### F04 — [High] Verify review, security and deployment protections

GitHub API access is incomplete; Preview/Production environments have no reported
protection rules. This does not establish Vercel-side policy.

Acceptance:
- [ ] Owner records available plan controls, branch review/check enforcement,
  security/secret scanning, Actions permissions/runners and CODEOWNERS nominees.
- [ ] Verify Vercel production branch, preview exposure, approvals, quotas/spend
  alerts; document compensating manual controls where features are unavailable.
- [ ] Obtain explicit approval before permissions, billing, visibility or
  production changes; verify approved changes afterward.

Dependencies: owner access. Blocks F10. No upgrades, deployment or new services
preauthorized. Rollback plan must accompany each proposed settings change.
Existing labels: documentation, help wanted.

### F05 — [Medium] Define local email privacy and state recovery behavior

Email and validation progress live in browser storage, without server recovery.

Acceptance:
- [ ] Confirm necessity and user-facing purpose of email collection and define
  retention/deletion expectations without inventing compliance claims.
- [ ] Specify minimal, understandable deletion/recovery behavior and irreversible
  consequences; preserve valid state when recovering malformed entries.
- [ ] Implement only approved behavior with tests and accurate user-facing copy;
  no analytics, backend or external data transfer added.

Dependencies: owner product decision; coordinate F02. Human data/privacy review.
Rollback: revert UI/code through review; deletion is not reversible.
Existing label: enhancement.

### F06 — [Medium] Complete keyboard and accessibility validation

Existing PRs #2/#5 address search and room-checklist accessibility.

Acceptance:
- [ ] Review/reuse those PRs, covering search clear, labels, checklist state,
  dialog focus, keyboard operation and visible focus across core pages.
- [ ] Record browser/manual evidence and focused automated regression checks;
  fix verified defects without an unrelated redesign.
- [ ] Check narrow viewports and contrast; record remaining limitations honestly.

Dependencies: coordinate existing #2/#5; no duplicate implementation.
Human UI review. Rollback: reviewed revert retaining accessible behavior.
Existing label: bug.

### F07 — [Medium] Validate end-to-end flows and deployment smoke checks

Acceptance:
- [ ] Test board filters, detail, commitments, room checklist, reload persistence,
  unknown routes and browser history using clean and persisted states.
- [ ] On an authorized preview, verify direct deep links, assets and configured
  security/cache headers; record browser/version and outcome.
- [ ] Capture repeatable steps or a small justified test suite; no production
  mutations, sensitive localStorage dumps or new paid service.

Dependencies: F02, F03, F06 for final signoff. Blocks F10.
Human authorization for external environments; fix failures before acceptance.
Existing label: enhancement.

### F08 — [Medium] Verify source backup and rollback recovery

Acceptance:
- [ ] Owner approves a private backup destination and retention/access policy;
  distinguish code/data seeds from unsynced browser progress.
- [ ] Perform an authorized source restore drill and record evidence without
  exposing secrets or copying user browser data.
- [ ] Verify known-good deployment identifiers and rollback steps through an
  authorized exercise or explicitly document an untested production procedure.

Dependencies: F04 owner access. No external transfer authorized by issue creation.
No paid storage or production rollback without approval.
Existing labels: documentation, help wanted.

### F09 — [Low] Measure bundle and filtering performance before optimization

Existing >500 kB bundle warning; overlapping filter PRs #3/#6.

Acceptance:
- [ ] Record repeatable baseline size and representative board interaction metrics.
- [ ] Compare #3/#6 and choose only measured, readable improvements; do not create
  a third competing implementation or add speculative infrastructure.
- [ ] Prove behavior parity and document before/after results; close with evidence
  if no optimization is warranted.

Dependencies: critical correctness work takes priority. Human chooses overlapping
PRs. Rollback: reviewed revert. Existing label: enhancement.

### F10 — [High] Complete independent release-readiness acceptance

This is a final gate, not a duplicate CI implementation task. PR #8 already adds
quality gates, bounded Dependabot updates and operational guidance.

Acceptance:
- [ ] Independent human reviews security/data changes and PR #8; no agent approval
  or merge substitutes for human review. Verify one PR CI run after trigger fix.
- [ ] F01–F08 have verified evidence or explicit owner-approved dispositions;
  confirm quality, audit, browser and deployment checks apply and pass.
- [ ] Owner records go/no-go, known-good rollback target and authorized release
  scope. Do not deploy or label production-ready when gates remain unresolved.

Dependencies: F01–F08; F09 nonblocking unless measurements establish a defect.
Existing labels: documentation, help wanted. No automatic merge/deployment.

## Publication checklist

- [ ] Restore integration access and list all existing owner/repo projects.
- [ ] Recheck issues including closed issues and existing PR overlap.
- [ ] Reuse or create the one non-public project with the minimal fields/view.
- [ ] Create only missing F01–F10 issues; replace dependency codes with real links.
- [ ] Add issues to Todo; optionally add PR #8 In Progress; no false Done claims.
- [ ] Read back each issue, item, status, project visibility and repository link.
- [ ] Record real URLs and IDs here; report any unsupported board configuration.

No publication checkbox is currently complete; no GitHub issue/project URL is
claimed. Do not retry writes indefinitely while authorization is denied.
