# PR #8 review follow-up — 2026-10-25

## Corrections
- Restrict push CI to main; pull_request still validates feature branches. This
  removes the duplicate push/PR execution for the Arena branch, without reducing
  PR checks or suppressing dependency failures.
- Scope Tailwind scanning to src plus explicit index.html. Agent instructions
  and documentation no longer add utility classes to the deployed stylesheet.
- Clarify installed Caveman capabilities in .agents/README.md. Unsupported modes,
  host command discovery, plugin configuration and persistence are explicit.
  Vendored upstream instructions and source provenance remain unchanged.

## Validation
- Typecheck and zero-warning lint passed.
- 33 unit tests passed.
- Default and single-file builds passed. Existing >500 kB JS warning remains.
- Temporary fixture experiment rebuilt production assets after each change:
  1. Adding z-[9876] to a docs Markdown fixture left CSS byte-for-byte unchanged.
  2. Adding it to a src TypeScript fixture generated z-index:9876.
  3. Adding z-[9875] to an index.html comment generated z-index:9875.
  All fixtures were removed and index.html restored before the final build.
- Clean CSS is back to 54,003 bytes, matching the pre-preparation baseline size
  and index-DvL6kpZv.css asset name. SHA256:
  a38877841519bee8b94e23e0ed8f0799aba905b882d2ff99e6b46c113b29d4f2.
- npm audit --audit-level=high still exits 1. Existing vulnerabilities are not
  fixed, waived or hidden by these review corrections.
- git diff --check passed. No production command or settings change performed.

## Remaining gates
Dependency remediation, nested storage validation, browser/accessibility testing,
owner verification of remote protections, and independent human review remain
outstanding. This follow-up is not production-readiness approval.

## Checkout preservation
The restored local preparation snapshot exactly matched PR #8. It was preserved
in a named git stash before fast-forwarding this same branch to the remote head.
No unique existing work was discarded; the stash was retained.
