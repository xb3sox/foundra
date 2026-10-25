## 2025-10-25 - ARIA attributes for custom interactive checklist items
**Learning:** Custom checklist items rendered using standard `<button>` elements require explicit `role="checkbox"` and `aria-checked={isDone}` attributes so screen readers recognize them as togglable checklist controls rather than standard push buttons.
**Action:** When creating custom checkbox or checklist controls with `<button>` elements, always specify `type="button"`, `role="checkbox"`, and `aria-checked={booleanState}`.
