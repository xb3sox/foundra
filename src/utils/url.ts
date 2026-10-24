/**
 * Safely parses and validates external URLs to ensure they use allowed secure protocols (https: or http:).
 * Guards against unsafe schemes such as javascript: or data: that could lead to XSS vulnerabilities.
 */
export function toSafeHref(url: string | undefined): string | undefined {
  if (!url) return undefined;
  try {
    const parsed = new URL(url);
    return parsed.protocol === "https:" || parsed.protocol === "http:"
      ? url
      : undefined;
  } catch {
    return undefined;
  }
}
