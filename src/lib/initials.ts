/** First letters of the first two words, e.g. "Maya T." -> "MT". */
export function initials(name: string): string {
  const result = name
    .split(" ")
    .filter(Boolean)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
  return result || "?";
}
