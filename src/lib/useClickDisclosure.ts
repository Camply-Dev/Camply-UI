import { type MouseEvent, type ReactElement, useCallback, useRef, useState } from "react";
import { type Placement, useAnchor } from "./useAnchor";
import { useDismiss } from "./useDismiss";

interface ClickDisclosureOptions {
	placement?: Placement;
	/** hauteur minimale conservée par useAnchor (défaut du hook d'ancrage sinon) */
	minHeight?: number;
}

/**
 * Orchestration d'un panneau flottant déclenché au clic (Popover, DropdownMenu) :
 * état ouvert/fermé, ancrage positionné (useAnchor), fermeture Échap + clic-dehors
 * (useDismiss). `triggerProps(trigger, extra?)` produit les props à cloner sur le
 * déclencheur — ref d'ancrage, aria-expanded, et un onClick qui préserve celui du
 * trigger puis bascule l'ouverture (le cast un peu délicat vit ici, à un seul endroit).
 */
export function useClickDisclosure({
	placement = "bottom-start",
	minHeight,
}: ClickDisclosureOptions = {}) {
	const [open, setOpen] = useState(false);
	const anchorRef = useRef<HTMLElement>(null);
	const floatRef = useRef<HTMLDivElement>(null);

	const style = useAnchor(anchorRef, floatRef, open, {
		placement,
		gap: 8,
		constrainHeight: true,
		minHeight,
	});
	const close = useCallback(() => setOpen(false), []);
	useDismiss(open, close, [anchorRef, floatRef]);

	const triggerProps = (trigger: ReactElement, extra?: Record<string, unknown>) => ({
		ref: anchorRef,
		"aria-expanded": open,
		...extra,
		onClick: (e: MouseEvent) => {
			(trigger.props as { onClick?: (e: MouseEvent) => void }).onClick?.(e);
			setOpen((o) => !o);
		},
	});

	return { open, close, floatRef, style, triggerProps };
}
