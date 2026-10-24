# Palette's Journal - Critical Learnings

## 2025-05-18 - Interactive Checklists and Progress Bars
**Learning:** Custom interactive checklist buttons and progress bars in React components can lack semantic screen reader roles (`role="checkbox"`, `aria-checked`, `role="progressbar"`), making them silent or unclear to assistive technology users.
**Action:** Always provide explicit ARIA accessibility states (`role="checkbox"`, `aria-checked`, `aria-label`) for interactive list items and progress indicators (`role="progressbar"`, `aria-valuenow`, `aria-valuemin`, `aria-valuemax`).
