/**
 * Tiny className joiner. Falsy values are dropped.
 *   cn("btn", isActive && "btn--active", undefined)  →  "btn btn--active"
 */
export function cn(...parts: Array<string | false | null | undefined>): string {
	return parts.filter(Boolean).join(" ");
}
