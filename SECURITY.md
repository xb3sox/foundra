# Security policy

This repository is a frontend demo, not an account or messaging service.
Only the current default-branch code is maintained; no released version support
commitment exists yet.

Do not post secrets, exploit payloads containing personal data, or sensitive
security details in public issues. Use GitHub private vulnerability reporting
if the repository exposes that option. Its availability has not been verified.
Otherwise contact the repository owner through an established private channel
before sharing details. No response-time SLA is currently promised.

Contributors must review dependencies, validate storage and URL trust boundaries,
keep credentials out of source and browser bundles, and obtain human review for
security-sensitive changes. `npm audit` is a dependency check, not proof that the
application is secure. Never use `npm audit fix --force` without compatibility
review and tests.
