/** Smooth-scroll to a section unless the user prefers reduced motion. */
export function scrollToSection(id: string): void {
  const behavior: ScrollBehavior = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches
    ? "auto"
    : "smooth";
  document.getElementById(id)?.scrollIntoView({ behavior });
}
