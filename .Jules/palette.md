## 2025-05-18 - Clear button in search input pattern
**Learning:** Search inputs without an easy clear mechanism force users to manually select and backspace search text. Adding an inline clear button with explicit `aria-label="Clear search query"` and `type="button"` significantly improves micro-UX and keyboard accessibility.
**Action:** When adding or editing search inputs, provide a conditionally rendered clear button with `aria-label` and adequate `pr-9` padding to prevent text overlap.
