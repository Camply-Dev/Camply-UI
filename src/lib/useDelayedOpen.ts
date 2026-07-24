import { useCallback, useEffect, useRef } from "react";
import { type Controllable, useControllable } from "./useControllable";

/**
 * Ouverture/fermeture au survol avec délais (Tooltip, HoverCard).
 * `show()` ouvre après `openDelay` ms ; `hide()` ferme après `closeDelay` ms
 * (immédiatement si 0). Échap ferme, et le timer est nettoyé au démontage.
 *
 * L'état est contrôlable : passer `open` le pilote depuis le parent.
 */
export function useDelayedOpen(openDelay: number, closeDelay = 0, controlled: Controllable = {}) {
	const [open, setOpen] = useControllable(
		controlled.open,
		controlled.defaultOpen ?? false,
		controlled.onOpenChange,
	);
	const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

	// Les timers appellent setOpen en différé : on lit toujours la version fraîche
	// pour ne pas capturer un onOpenChange périmé.
	const setOpenRef = useRef(setOpen);
	setOpenRef.current = setOpen;

	const show = useCallback(() => {
		clearTimeout(timer.current);
		timer.current = setTimeout(() => setOpenRef.current(true), openDelay);
	}, [openDelay]);

	const hide = useCallback(() => {
		clearTimeout(timer.current);
		if (closeDelay > 0) timer.current = setTimeout(() => setOpenRef.current(false), closeDelay);
		else setOpenRef.current(false);
	}, [closeDelay]);

	// Un timer en vol après démontage appellerait setState sur un composant mort.
	useEffect(() => () => clearTimeout(timer.current), []);

	// Échap referme la couche de survol (Tooltip/HoverCard restaient collés).
	useEffect(() => {
		if (!open) return;
		const onKey = (e: KeyboardEvent) => {
			if (e.key !== "Escape") return;
			clearTimeout(timer.current);
			setOpenRef.current(false);
		};
		document.addEventListener("keydown", onKey);
		return () => document.removeEventListener("keydown", onKey);
	}, [open]);

	return { open, show, hide };
}
