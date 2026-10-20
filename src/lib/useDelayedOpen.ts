import { useCallback, useEffect, useRef } from "react";
import { type Controllable, useControllable } from "./useControllable";
import { useDismiss } from "./useDismiss";

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
	const openRef = useRef(open);
	openRef.current = open;

	// Déjà ouverte, `show` ne fait qu'annuler une fermeture en attente ; fermée, `hide`
	// n'annule qu'une ouverture en attente : traverser le déclencheur en coup de vent
	// n'émet plus `onOpenChange(false)` pour une couche jamais ouverte.
	const show = useCallback(() => {
		clearTimeout(timer.current);
		if (openRef.current) return;
		timer.current = setTimeout(() => setOpenRef.current(true), openDelay);
	}, [openDelay]);

	const hide = useCallback(() => {
		clearTimeout(timer.current);
		if (!openRef.current) return;
		if (closeDelay > 0) timer.current = setTimeout(() => setOpenRef.current(false), closeDelay);
		else setOpenRef.current(false);
	}, [closeDelay]);

	// Un timer en vol après démontage appellerait setState sur un composant mort.
	useEffect(() => () => clearTimeout(timer.current), []);

	// Échap referme la couche de survol via la pile partagée, sinon la même frappe
	// fermerait aussi le dialogue qui la contient. `escapeOnly` : la sortie au
	// pointeur reste l'affaire de `hide()`.
	useDismiss(
		open,
		() => {
			clearTimeout(timer.current);
			setOpenRef.current(false);
		},
		[],
		{ escapeOnly: true },
	);

	return { open, show, hide };
}
