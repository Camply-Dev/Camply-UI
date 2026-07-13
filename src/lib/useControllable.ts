import { useCallback, useState } from "react";

export function useControllable<T>(
	value: T | undefined,
	defaultValue: T,
	onChange?: (value: T) => void,
): [T, (next: T) => void];

export function useControllable<T>(
	value: T | undefined,
	defaultValue: T | undefined,
	onChange: ((value: T) => void) | undefined,
	options: { allowUndefined: true },
): [T | undefined, (next: T | undefined) => void];

export function useControllable<T>(
	value: T | undefined,
	defaultValue: T | undefined,
	onChange?: ((value: T) => void) | ((value: T | undefined) => void),
	_options?: { allowUndefined?: boolean },
): [T | undefined, (next: T | undefined) => void] {
	const [internal, setInternal] = useState<T | undefined>(defaultValue);
	const isControlled = value !== undefined;
	const current = isControlled ? value : internal;

	const set = useCallback(
		(next: T | undefined) => {
			if (!isControlled) setInternal(next);
			onChange?.(next as T);
		},
		[isControlled, onChange],
	);

	return [current, set];
}
