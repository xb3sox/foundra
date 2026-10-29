export { cn } from "@/utils/cn";

/**
 * Security: Only allow safe `https:` URLs to be rendered as external links.
 * Guards against XSS and arbitrary code execution via `javascript:`, `data:`,
 * or other unexpected URI schemes if link targets originate from untrusted sources.
 */
export function toSafeHref(url: string | undefined): string | undefined {
  if (!url) return undefined;
  try {
    const trimmed = url.trim();
    const parsed = new URL(trimmed);
    if (
      parsed.protocol !== "https:" ||
      !parsed.hostname ||
      parsed.username ||
      parsed.password ||
      /[^\w.-]/.test(parsed.hostname)
    ) {
      return undefined;
    }
    return parsed.href;
  } catch {
    return undefined;
  }
}
