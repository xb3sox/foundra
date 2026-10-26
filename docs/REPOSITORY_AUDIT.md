# Repository preparation audit — 2026-10-25

> **Historical snapshot — 2026-10-25.** The current authoritative state and
> workflow are in [GITHUB_DELIVERY_PLAN.md](GITHUB_DELIVERY_PLAN.md). Claims
> below about a private repository, old Arena branch names, open PRs #2–#8,
> blocked issue creation, or a ruleset plan limitation are no longer current.
> Verified open gaps are tracked in GitHub issues #19–#23.

> Current dependency status: the later [security remediation verification](SECURITY_REMEDIATION.md)
> reports a clean install and zero known audit findings. Counts and dependency
> blockers below describe the earlier baseline, not the current lockfile.
> Human review and other readiness gates remain open.

## Goal and constraints
README defines a curated problem-discovery/validation frontend for founders.
11 problems; localStorage persistence; no accounts, scraping, submissions,
matching, messaging, or backend. React 19 / TypeScript / Vite 7 / Tailwind 4;
Vercel configuration exists. Time, budget and formal compliance requirements
are unspecified. No additional infrastructure is justified for this scope.

## Evidence and preservation
Authenticated GitHub user xb3sox; private xb3sox/foundra; API reports ADMIN.
Initial working tree clean on arena/bb322caa-foundra at 3662205; main matches
that commit. Shallow history was fetched without changing the branch. Existing
README, source, package/lockfile, configurations, historical review, history,
community profile, and open PR metadata were inspected. Historical review is
not current proof: its lint and storage-validation claims are stale.
No existing application work or remote settings were overwritten.

## Capability matrix
“Configured” below means present in this branch; default-branch activation is
not claimed. The branch was pushed and CI queued; no completed remote result
is claimed. Dependabot updates require merge to the default branch.

| Capability | Status | Evidence / decision |
| --- | --- | --- |
| Issues | Blocked | Enabled, zero standalone open issues found; createIssue denied by integration. Drafts in FOLLOW_UP_ISSUES.md. |
| Projects | Blocked | Enabled at repo level; installed gh lacks project command. No project created without an established need. |
| PRs | Already adequate | Six open PRs #2–#7; preserve and coordinate overlapping pairs #3/#6 and #4/#7. No merge performed. |
| Templates | Configured | Bug/work issue templates and PR checklist added. |
| CODEOWNERS | Requires approval | No ownership assignment inferred from admin identity; owner must nominate reviewers. |
| Rulesets | Blocked | API 403: upgrade plan or make public. Neither action authorized. |
| Branch protection | Blocked | Integration 403; cannot assert absence or enforcement. |
| Actions / CI | Configured | Initially zero workflows; SHA-pinned read-only CI, Node 22, timeout/concurrency bounds, quality and dependency jobs added. Remote execution unverified. |
| Actions permissions / runners | Blocked | APIs deny access; hosted ubuntu-latest proposed; no self-hosted runner added. |
| Environments / approvals | Requires approval | Preview and Production exist, admin bypass true, no rules or branch policy in API response; no mutation. Vercel-side policy unverified. |
| Dependabot updates | Configured | Weekly npm and Actions update config with bounded PR counts, effective after merge. |
| Dependabot alerts | Requires approval | API explicitly reports disabled. No remote security setting changed. |
| Code scanning | Requires approval | API reports not enabled; plan/access and preferred tool need owner confirmation. |
| Secret scanning | Blocked | API integration 403. Limited local pattern scan is not equivalent. |
| Packages | Blocked | User package-list API denied; app package is private, no publishing introduced. |
| Releases / versioning | Not applicable | No releases; private demo at 0.1.0. No release automation justified yet. |
| SBOM | Already adequate | npm sbom --sbom-format=cyclonedx generated locally for inspection; not committed as a large generated artifact. No release attachment claimed. |
| Provenance | Not applicable | No package/release publishing workflow; installed skills have source commit provenance. Add artifact attestations when publishing is approved. |
| Documentation | Configured | Contribution, security reporting, deployment, rollback, privacy/recovery and audit guidance. No product license chosen without owner approval. |
| Insights | Blocked | Traffic API integration 403; community health baseline 14%, not a readiness score. |
| Backups | Requires approval | Source versioned; no verified external mirror or restore drill. Browser data not backed up. |
| Cost controls | Configured | CI cancellation/timeouts; no artifact uploads/deployments; bounded dependency PRs. Account spending/quotas remain owner verification. Actions cache baseline zero. |

## Existing prioritized risks
- **Critical (advisory severity):** npm audit reports transitive proxy-addr critical.
  Exploitability in this frontend has not been established; tooling also matters.
- **High:** 14 high dependency findings; direct affected packages include shadcn
  and Vite. Do not force-update dependencies without isolated compatibility review.
- **High:** store hydration trusts nested values; top-level object validation is
  insufficient. Invalid commitments/rooms can break consumers. Fix with tests
  and a reviewed data recovery strategy, not silent state deletion.
- **High:** review/deployment/security protections cannot be fully established.
- **Medium:** no browser or accessibility audit executed; PRs #2/#5 cover related UI.
- **Medium:** email persists locally without documented retention/deletion product
  behavior; clarify requirements before more data collection.
- **Medium:** default bundle about 566 kB minified produces a size warning. Measure
  first; do not add speculative optimization alongside PRs #3/#6.
- **Low:** large curated data file and token/style debt noted in prior review.

## Validation and change review
Node 22.22.3 / npm 10.9.8; npm ci --ignore-scripts completed.
Baseline typecheck and lint passed; 33 tests across 3 files passed; default and
single-file builds passed. Default build emitted a >500 kB chunk warning.
Audit: 23 findings (1 critical, 14 high, 7 moderate, 1 low). High-level audit gate
is expected to fail until remediation; no allowlist or check bypass added.
Limited private-key/GitHub-token/AWS-access-key pattern scan found no matches in
working files excluding .git, node_modules and dist. Not full scanning or a
history/credential-exposure assessment. Browser/deployed headers unverified.

Second-pass author review checked least privilege, credential persistence,
workflow triggers, cost limits, no untrusted code with write tokens, no deployment,
no upstream hooks, preserved licenses, relative references, and PR overlap.
This is not an independent human review or security certification.
No application logic or dependency versions changed; no introduced runtime
regression is established. New CI intentionally exposes existing advisories and
will consume bounded Actions minutes if activated. Dependabot config creates
bounded update PRs after merge. Human review remains required.

## Approval and next action
Remediate dependency findings first, review hydration next, verify access and
production controls with the owner. Do not claim production readiness. Do not
merge or deploy until a human reviews and applicable gates pass.

## Publication evidence
Preparation commit 50f11ba pushed only to arena/bb322caa-foundra.
PR: https://github.com/xb3sox/foundra/pull/8 (not merged).
First CI run queued: https://github.com/xb3sox/foundra/actions/runs/40151559149.
GitHub may trigger existing integrations on a branch push; no deployment command
was issued, and remote deployment status is inaccessible to this integration.
