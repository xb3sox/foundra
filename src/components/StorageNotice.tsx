import { useStore } from "../lib/store";

export function StorageNotice() {
  const { sessionOnly } = useStore();
  if (!sessionOnly) return null;

  return (
    <aside role="status" aria-label="Browser storage warning" className="border-b border-line bg-surface px-5 py-3 text-sm text-ink">
      <strong>Changes are temporary.</strong> Saved browser data could not be
      safely loaded or updated. Changes made in this session may be lost when
      you reload or close this page. Existing saved data has not been cleared.
      Keep a private record of important progress before leaving. Do not share
      browser-storage contents: they may contain your email.
    </aside>
  );
}
