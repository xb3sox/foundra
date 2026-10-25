# Browser-state validation and recovery

## Policy

`foundra-state-v1` remains the only storage key. No migration, extra backup copy,
remote transfer, email logging, or automatic deletion is introduced.

On load, the app validates every map, commitment, counter, checklist value,
activity record, connection name, and email type. Counters must be nonnegative
safe integers; email strings are preserved without introducing a new format
restriction on legacy data. Missing fields in otherwise valid partial states
receive defaults. Valid entries beside malformed entries remain usable.
Reserved map keys are ignored. Unknown object fields trigger conservative mode
rather than risking destruction of a newer schema.

If any malformed/unknown field or JSON error is found, the app uses recovered
values **in memory only** and leaves the original stored string byte-for-byte
unchanged, including after subsequent user actions and StrictMode replay.
This deliberately favors preserving original progress over silently persisting a
lossy repair. Refreshing reloads the original values; temporary edits are lost.
An accessible notice explains this before the user leaves.

If reading storage is blocked, the app runs in memory and does not attempt to
write over unreadable data. If a normal save fails (for example quota), the same
notice appears. A later user edit retries normal persistence; the warning clears
only after a successful write. No changes are guaranteed durable before saving.

## User and support guidance

A warning is not a request to share localStorage; it may contain email. Keep a
private record of important progress before closing a session-only page. The app
never automatically clears the original data. There is intentionally no reset,
export/import or repair button in this patch: explicit recovery/deletion UX and
privacy requirements need separate product/human approval.

An owner-authorized reset of this site's browser storage is irreversible and
removes saved progress. A code rollback cannot restore deleted browser data.
Do not recommend a reset without explaining that consequence. Do not copy
browser data to another service as part of troubleshooting.

## Verification — 2026-10-25

The new tests were run against the old implementation first: 11 recovery cases
failed, including actual null-map and invalid-email render crashes. After the
fix, 50 tests pass across four files (previously 33 across three).

Coverage includes mixed valid/invalid state, null/wrong top-level types, bad JSON,
partial legacy rooms, reload preservation, malformed activity fields, unsafe
counters, reserved map keys, unknown future/nested fields, StrictMode replay,
blocked reads, failed writes, successful retry, and accessible privacy-safe notice.
Typecheck, zero-warning lint, both builds and audit at Low threshold passed;
audit reports zero known vulnerabilities. Existing bundle-size warning remains.
Browser/visual verification and independent human data/security review remain
outstanding. This document is evidence of local checks, not release approval.

## Review and rollback

Human review must approve the session-only recovery policy and notice before
merge. Revert this patch through a reviewed PR if needed. No storage migration
needs reversal, but reverting restores the old unsafe hydration and write behavior;
review that risk before exposing older code to malformed state.
