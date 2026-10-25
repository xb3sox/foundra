/**
 * Only allow safe https: URLs to render in links to prevent cross-site scripting
 * and malicious scheme execution (e.g. javascript:, data:, or vbscript:).
 */
export function toSafeHref(url: string | undefined): string | undefined {
  if (!url) return undefined;
  try {
    const parsed = new URL(url);
    return parsed.protocol === "https:" ? url : undefined;
  } catch {
    return undefined;
  }
}
