# Foundra product operating model

> This is the current authoritative delivery workflow. The filename is retained
> for existing links. Other documents in `docs/` that describe PR #2–#8 or
> 2026-10-25 dependency counts are historical snapshots, not current status.

## 1. Product and lifecycle

Foundra is a single-player curated React/TypeScript frontend for founders. It
uses browser-local state only. There is no backend, account system, messaging,
live matching, automated sourcing, or analytics. Do not turn roadmap ideas into
implicit current capabilities. See `README.md` for the product boundary.

Use this lifecycle, adapted to a one-repository product:

```text
Customer problem or engineering risk
  → concise opportunity / work item
  → agent-ready issue (Ready)
  → human or AI implementation
  → small pull request
  → deterministic CI
  → independent human review and merge
  → deployment smoke check
  → separately recorded release / outcome evidence
```

No customer adoption, satisfaction, revenue, or production reliability metrics
are currently collected. Do not invent them. Until a measurement system exists,
record only observed evidence and verified outcomes.

## 2. GitHub capability decision

Verified on 2026-10-26 with the authenticated GitHub integration:

- GitHub Projects v2 exists with table, board, roadmap, fields, workflows,
  templates, and insights, but this integration cannot list all user projects
  or run `createProjectV2`: both return `Resource not accessible by integration`.
  A project-title search found no existing Foundra project, and the repository
  has no linked project. **No duplicate or half-configured project was created.**
- GitHub Issues are enabled. Native issue types are organization-level and
  are not currently applicable to this user-owned repository; REST issue-type
  definitions are exposed but attempts to set a type are silently dropped.
  Sub-issues and issue dependencies remain available for real hierarchies or
  blockers, but no artificial hierarchy is needed today.
- The Arena integration can create issues and labels but cannot attach labels
  to existing issues. A one-time, narrowly scoped Actions workflow applied the
  documented labels to the seed issues. Future UI-created issues receive
  `status: backlog` from the forms automatically; those forms are now active on
  the default branch.
- There is no GraphQL mutation for creating the newer issue-list saved views.
  Version-controlled search-query links therefore act as the fallback views.
- Organization-level issue fields and project templates do not apply: this is
  a user-owned repository with one product.
- Milestones, iterations, estimates, start/target dates, and roadmap layouts
  are intentionally unused: no dated release, iteration cadence, or deadline
  requirement is documented. Add one only when a real commitment exists.
- Built-in project workflows and Insights are unavailable in this fallback.
  Deterministic CI and repository activity views are used instead. Project
  Insights must not be represented as customer-outcome measurement.

If GitHub is later reconnected with user-Projects and repository
Administration:write permissions, replace the query links with exactly **one**
private project named
`Foundra — Delivery`, link `xb3sox/foundra`, use its default Status field plus
one Priority field, and keep two views: Backlog and Delivery. Do not create a
second board or copy unrelated user projects.

## 3. Issues-only board

Use one status label and one priority label per issue. A human sets priority
from the issue's evidence and rationale; it is not derived from the form name.

| Purpose | Mechanism |
| --- | --- |
| Classification | issue form name and title; native issue types are organization-level and unavailable here |
| Flow state | exactly one `status: *` label |
| Priority | exactly one `priority: P0`–`priority: P3` label |
| Topic | existing `bug`, `documentation`, `dependencies`, etc. only when useful |
| Human authority | existing `help wanted` label when an owner decision is required |
| Blocked work | native issue dependencies, not a `Blocked` status |
| Decomposition | native sub-issues only when work genuinely has parent/child scope |
| Dated goals | native milestones only when a real dated goal exists |

Status transitions:

```text
status: backlog → status: ready → status: in-progress
  → status: in-review → status: done (then close)
```

- **Backlog:** captured, but not sufficiently understood or approved.
- **Ready:** objective, scope, testable acceptance criteria, constraints, and
  verification are present; important dependencies and approvals are named.
- **In Progress:** one person/agent is actively implementing the issue.
- **In Review:** a focused PR is open and CI has run.
- **Done:** acceptance criteria, checks, independent review, and documentation
  are complete. Close the issue. Record deployment and customer-outcome
  verification separately if they happen later.

### Fallback views

These links are standard issue/PR searches, not custom dashboards. Save them in
the GitHub Issues UI if desired.

- [Triage — open issues with no label](https://github.com/xb3sox/foundra/issues?q=is%3Aissue+is%3Aopen+no%3Alabel)
- [Backlog](https://github.com/xb3sox/foundra/issues?q=is%3Aissue+is%3Aopen+label%3A%22status%3A+backlog%22)
- [Ready / agent queue](https://github.com/xb3sox/foundra/issues?q=is%3Aissue+is%3Aopen+label%3A%22status%3A+ready%22)
- [In Progress](https://github.com/xb3sox/foundra/issues?q=is%3Aissue+is%3Aopen+label%3A%22status%3A+in-progress%22)
- [In Review issues](https://github.com/xb3sox/foundra/issues?q=is%3Aissue+is%3Aopen+label%3A%22status%3A+in-review%22)
- [Open PRs awaiting review](https://github.com/xb3sox/foundra/pulls?q=is%3Apr+is%3Aopen)
- [Done / closed issues](https://github.com/xb3sox/foundra/issues?q=is%3Aissue+is%3Aclosed)
- [Repository Pulse](https://github.com/xb3sox/foundra/pulse) and [CI history](https://github.com/xb3sox/foundra/actions/workflows/ci.yml)

Pulse and CI history show work activity and validation, not customer value or
production reliability. No project charts, burndowns, or velocity claims are
implied.

## 4. Issue contract and quality gates

Use the two issue forms in `.github/ISSUE_TEMPLATE/`. They default to
`status: backlog`; the form name/title distinguishes bug reports from work
items because native issue types are unavailable on this user-owned repository.
A maintainer applies the matching priority label during triage and moves the
issue to `status: ready` only when the Definition of Ready is met.

**Definition of Ready:** the problem and outcome are clear, scope is
actionable, acceptance criteria are observable, constraints and approvals are
named, and important dependencies are identified.

**Definition of Done:** those acceptance criteria are satisfied; typecheck,
zero-warning lint, tests, both builds, and the high-level dependency audit
pass; required human review is complete; security/privacy implications are
reviewed; relevant docs are updated; and rollout or rollback evidence is
recorded. Deployment and outcome verification are separate checkboxes when
they occur after merge.

Required local commands are in `AGENTS.md` and `CONTRIBUTING.md`. CI runs the
same gates as `quality` and `dependencies`. A green CI run is necessary, never
sufficient to self-merge.

## 5. AI-native workflow

`AGENTS.md` is the canonical cross-agent repository context.
`.github/copilot-instructions.md` is a concise compatibility pointer for
GitHub Copilot Chat. `.agents/` contains reviewed, instruction-only skills with
source provenance; they are not executable hooks, registered custom agents, or
extra permissions.

An AI agent may investigate the repository, refine an issue, detect
duplicates, propose a plan, implement a Ready issue, add tests/docs, investigate
CI failures, and prepare a PR. Use deterministic CI for validation. No
scheduled agentic workflow, custom reviewer agent, or AI write automation is
currently justified for this repository's scale.

Humans retain authority over ambiguous product decisions, dataset schema or
branding changes, dependency changes, security settings, protected-branch
policy, secrets, paid capabilities, production deployment, releases, and
merges. AI output is never automatically correct and must not bypass
independent review or CI.

## 6. Delivery and security controls

Current repository-native controls:

- SHA-pinned `actions/checkout` and `actions/setup-node`, Node 22,
  `ubuntu-24.04`, read-only workflow token, timeouts, and concurrency
  cancellation.
- Typecheck, zero-warning lint, unit tests, both production builds, and
  `npm audit --audit-level=high`.
- Weekly bounded Dependabot version updates for npm and GitHub Actions.
- Security headers and SPA rewrites in `vercel.json`.
- Structured issue/PR templates and human-review expectations.

At audit time, no active repository ruleset or branch rule was visible, private
vulnerability reporting was disabled, and the integration received HTTP 403 for
security settings, ruleset creation, and classic branch protection. Reconnect
GitHub in Arena with repository Administration:write permission, or perform the
following in the GitHub UI. They are tracked in issue #19:

1. Enforce the PR workflow and `quality` / `dependencies` checks on `main`.
   Independent human review remains a policy until a second reviewer exists.
2. Enable private vulnerability reporting, Dependabot alerts, and Dependabot
   security updates.
3. Verify secret scanning and push protection for this public repository.
4. Verify Vercel production-branch and preview exposure settings.

Do not weaken a security control, create bypass privileges, buy a plan, or
change repository visibility without that approval.

## 7. Current seed issues

Five genuine open gaps were published as issues #19–#23. Their documented
status/priority labels have been applied and independently verified. Native
issue types are unavailable on this user-owned repository, so classification
uses the issue form name/title rather than duplicate labels. Future UI-created
issues receive `status: backlog` automatically.

Use the Triage view above to find any unlabeled issue. Do not create duplicate
issues to work around missing metadata.

## 8. Meaningful metrics

Observe only what GitHub and the product actually record:

- Engineering: PR lead time and CI/change-failure evidence from PRs, Actions,
  and deployment history.
- Quality: escaped defects and browser/accessibility smoke evidence linked to
  issues.
- AI: completed assigned issues, validation success, human rework, and cost
  only when those are actually measured.
- Product: adoption, task success, and feedback only after an approved,
  privacy-conscious measurement method exists.

No vanity dashboards, velocity targets, or maturity scores are part of this
operating model.

## 9. Capability coverage summary

| Area | Decision |
| --- | --- |
| Issues, labels, dependencies, sub-issues | Available; issue types are organization-level and intentionally unused. |
| Projects, views, custom fields, workflows, Insights | Available on GitHub but blocked for this integration; intentionally unused. Issues fallback implemented. |
| Milestones, iterations, estimates, dates, roadmap | Available but intentionally deferred until a dated commitment exists. |
| Cross-repository coordination | Not applicable to this one-repository product. |
| GitHub Actions and Dependabot | Used for deterministic quality/dependency gates. |
| Agentic workflows and custom agents | Available but rejected for now: no demonstrated recurring value; human-controlled agents plus CI are simpler. |
| Insights/reporting | Repository Pulse/CI used as activity evidence; no customer-outcome claim. |
| Governance/security | In-repo controls implemented; remote branch/security settings await owner approval (#19). |

## 10. Reference documentation

- [About Projects](https://docs.github.com/en/issues/planning-and-tracking-with-projects/learning-about-projects/about-projects)
- [Best practices for Projects](https://docs.github.com/en/issues/planning-and-tracking-with-projects/learning-about-projects/best-practices-for-projects)
- [Issue forms syntax](https://docs.github.com/en/communities/using-templates-to-encourage-useful-issues-and-pull-requests/syntax-for-issue-forms)
- [Issue types, sub-issues, and dependencies](https://docs.github.com/en/issues/tracking-your-work-with-issues/learning-about-issues/about-issues)
- [Managing issue types in an organization](https://docs.github.com/en/issues/tracking-your-work-with-issues/using-issues/managing-issue-types-in-an-organization)
- [Copilot custom-instruction support](https://docs.github.com/en/copilot/reference/custom-instructions-support)
- [Available rules for rulesets](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-rulesets/available-rules-for-rulesets)
