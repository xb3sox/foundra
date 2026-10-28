export { cn } from "@/utils/cn";

/**
 * Security: Only allow safe `https:` URLs to be rendered as external links.
 * Guards against XSS and arbitrary code execution via `javascript:`, `data:`,
 * or other unexpected URI schemes if link targets originate from untrusted sources.
 */
export function toSafeHref(url: string | undefined): string | undefined {
  if (!url) return undefined;
  const trimmed = url.trim();
  if (!trimmed) return undefined;
  try {
    return new URL(trimmed).protocol === "https:" ? trimmed : undefined;
  } catch {
    return undefined;
  }
}
