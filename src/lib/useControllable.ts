import { useCallback, useState } from "react";

/**
 * Supports both controlled and uncontrolled usage of a value.
 * - Controlled: pass `value` (+ usually `onChange`).
 * - Uncontrolled: omit `value`, pass `defaultValue`; state lives internally.
 */
export function useControllable<T>(
	value: T | undefined,
	defaultValue: T,
	onChange?: (value: T) => void,
): [T, (next: T) => void] {
	const [internal, setInternal] = useState<T>(defaultValue);
	const isControlled = value !== undefined;
	const current = isControlled ? (value as T) : internal;

	const set = useCallback(
		(next: T) => {
			if (!isControlled) setInternal(next);
			onChange?.(next);
		},
		[isControlled, onChange],
	);

	return [current, set];
}

let idCounter = 0;
/** Stable unique id for a11y (label/aria-controls) without extra deps. */
export function useId(prefix = "gv"): string {
	const [id] = useState(() => `${prefix}-${++idCounter}`);
	return id;
}
