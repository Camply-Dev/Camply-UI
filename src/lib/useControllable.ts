import { useCallback, useRef, useState } from "react";

/** Le trio ouvert/fermé que tout overlay expose. Absent = l'overlay gère son état. */
export interface Controllable {
	/** Ouverture pilotée par le parent. */
	open?: boolean;
	/** État initial en mode non contrôlé. */
	defaultOpen?: boolean;
	onOpenChange?: (open: boolean) => void;
}

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
	options?: { allowUndefined?: boolean },
): [T | undefined, (next: T | undefined) => void] {
	const [internal, setInternal] = useState<T | undefined>(defaultValue);

	// `allowUndefined` : pour Select/Combobox/RadioGroup/Tree, `value === undefined`
	// veut dire « aucune sélection », pas « reprends la main ». Le mode est donc figé
	// au premier `value` défini, pour que vider la sélection depuis le parent ne
	// fasse pas resurgir l'état interne.
	const everControlled = useRef(value !== undefined);
	if (value !== undefined) everControlled.current = true;
	const isControlled = options?.allowUndefined ? everControlled.current : value !== undefined;
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
