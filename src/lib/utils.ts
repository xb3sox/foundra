export { cn } from "@/utils/cn";

/**
 * Security: Only allow safe `https:` URLs to be rendered as external links.
 * Guards against XSS and arbitrary code execution via `javascript:`, `data:`,
 * or other unexpected URI schemes if link targets originate from untrusted sources.
 */
export function toSafeHref(url: string | undefined): string | undefined {
  // eslint-disable-next-line no-control-regex
  if (!url || /[\s\x00-\x1F\x7F]/.test(url)) return undefined;
  try {
    return new URL(url).protocol === "https:" ? url : undefined;
  } catch {
    return undefined;
  }
}
