import { type MouseEventHandler, useCallback, useEffect, useRef } from "react";
import { compose } from "./cloneTrigger";
import { type Placement, useAnchor } from "./useAnchor";
import { type Controllable, useControllable } from "./useControllable";
import { useDismiss } from "./useDismiss";

interface HoverDisclosureOptions extends Controllable {
	placement: Placement;
	/** Délai avant ouverture au survol ou au focus du déclencheur (ms). */
	openDelay: number;
	/** Délai avant fermeture (ms), le temps d'amener le pointeur sur la surface. */
	closeDelay: number;
	/** Handlers du consommateur sur la surface, composés avec les nôtres (règle 4). */
	onMouseEnter?: MouseEventHandler<HTMLDivElement>;
	onMouseLeave?: MouseEventHandler<HTMLDivElement>;
}

/**
 * Couche flottante ouverte au survol ou au focus (Tooltip, HoverCard) : état
 * contrôlable, délais d'ouverture et de fermeture, ancrage, et Échap.
 *
 * Comme `useClickDisclosure`, ne pose rien sur le déclencheur : `triggerProps` va
 * à `cloneTrigger`, qui compose ces handlers après ceux du consommateur et
 * respecte son `preventDefault()` — le veto qui fige une couche ou coupe le survol
 * sur mobile (règle 4). `surfaceProps` s'étale sur la surface.
 */
export function useHoverDisclosure({
	placement,
	openDelay,
	closeDelay,
	open: openProp,
	defaultOpen = false,
	onOpenChange,
	onMouseEnter,
	onMouseLeave,
}: HoverDisclosureOptions) {
	const [open, setOpen] = useControllable(openProp, defaultOpen, onOpenChange);
	const anchorRef = useRef<HTMLElement>(null);
	const floatRef = useRef<HTMLDivElement>(null);
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

	// Échap referme la couche via la pile partagée, sinon la même frappe fermerait
	// aussi le dialogue qui la contient. `escapeOnly` : la sortie au pointeur reste
	// l'affaire de `hide()`.
	useDismiss(
		open,
		() => {
			clearTimeout(timer.current);
			setOpenRef.current(false);
		},
		[],
		{ escapeOnly: true },
	);

	// `side` est le côté RÉELLEMENT retenu (après flip) : une flèche le suit.
	const { style, side } = useAnchor(anchorRef, floatRef, open, { placement, gap: 8 });

	return {
		open,
		floatRef,
		style,
		side,
		/** À passer à `cloneTrigger`, qui compose ref et handlers existants. */
		triggerProps: {
			ref: anchorRef,
			onMouseEnter: show,
			onMouseLeave: hide,
			onFocus: show,
			onBlur: hide,
		},
		/** Le pointeur doit pouvoir entrer dans la surface sans la faire fuir. */
		surfaceProps: {
			onMouseEnter: compose(onMouseEnter, show),
			onMouseLeave: compose(onMouseLeave, hide),
		},
	};
}
