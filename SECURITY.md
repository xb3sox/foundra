# Security policy

This repository is a public frontend demo, not an account or messaging service.
Only the current default-branch code is maintained; no released version support
commitment exists yet.

Do not post secrets, exploit payloads containing personal data, or sensitive
security details in public issues. Check whether GitHub private vulnerability
reporting is available under the repository's Security tab. It was disabled at
the 2026-10-26 audit and is tracked for owner action in issue #19; enabling it
requires an admin-capable GitHub connection or the GitHub UI. If it is still
unavailable, contact the repository owner through an established private channel
before sharing details. No response-time SLA is currently promised.

Contributors must review dependencies, validate storage and URL trust boundaries,
keep credentials out of source and browser bundles, and obtain human review for
security-sensitive changes. `npm audit` is a dependency check, not proof that the
application is secure. Never use `npm audit fix --force` without compatibility
review and tests. Agents must not enable or weaken repository security settings,
protected-branch policy, bypass privileges, or secret controls without explicit
human approval.
