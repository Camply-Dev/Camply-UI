import { useCallback, useRef } from "react";
import { type Placement, useAnchor } from "./useAnchor";
import { type Controllable, useControllable } from "./useControllable";
import { useDismiss } from "./useDismiss";

interface ClickDisclosureOptions extends Controllable {
	placement?: Placement;
	minHeight?: number;
}

/**
 * Couche flottante ouverte au clic (Popover, DropdownMenu) : état contrôlable,
 * ancrage, et fermeture au clic extérieur / Échap.
 *
 * Ne pose PAS le `onClick` du trigger : c'est `cloneTrigger` qui le compose avec
 * celui du consommateur (voir `triggerProps`).
 */
export function useClickDisclosure({
	placement = "bottom-start",
	minHeight,
	open: openProp,
	defaultOpen = false,
	onOpenChange,
}: ClickDisclosureOptions = {}) {
	const [open, setOpen] = useControllable(openProp, defaultOpen, onOpenChange);
	const anchorRef = useRef<HTMLElement>(null);
	const floatRef = useRef<HTMLDivElement>(null);

	const { style, side } = useAnchor(anchorRef, floatRef, open, {
		placement,
		gap: 8,
		constrainHeight: true,
		minHeight,
	});

	// Si le focus était DANS la couche (navigation clavier), il faut le rendre au
	// déclencheur : sans ça, Échap ou la sélection d'une entrée le perdent sur <body>.
	const close = useCallback(() => {
		const hadFocus = floatRef.current?.contains(document.activeElement) ?? false;
		setOpen(false);
		if (hadFocus) anchorRef.current?.focus();
	}, [setOpen]);

	const toggle = useCallback(() => setOpen(!open), [open, setOpen]);
	useDismiss(open, close, [anchorRef, floatRef]);

	/** À passer tel quel à `cloneTrigger`, qui compose ref et handlers existants. */
	const triggerProps = { ref: anchorRef, "aria-expanded": open, onClick: toggle };

	return { open, setOpen, close, anchorRef, floatRef, style, side, triggerProps };
}
