/**
 * Converts frontend slugs (URL-safe) into readable database strings.
 * Example: "new-arrivals" → "New Arrivals"
 */
export const normalizeSlug = (slug: string): string => {
  return slug
    .replace(/-/g, " ") // replace hyphens with spaces
    .replace(/\b\w/g, (char) => char.toUpperCase()); // capitalize each word
};
