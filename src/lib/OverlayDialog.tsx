import { type CSSProperties, type ReactNode, useEffect, useRef } from "react";
import { cn } from "./cn";
import { Portal } from "./Portal";
import { useEscapeAndScrollLock } from "./useEscapeAndScrollLock";

export interface OverlayDialogProps {
	open: boolean;
	onClose: () => void;
	/** clic sur le voile pour fermer (défaut true) */
	closeOnBackdrop?: boolean;
	/** classe de disposition du voile (centrage, padding…), propre au composant */
	backdropClassName?: string;
	/** classe(s) du panneau (taille, côté, animation…), propres au composant */
	panelClassName?: string;
	/** élément du panneau : div (défaut) ou aside (Drawer) */
	as?: "div" | "aside";
	/** déplace le focus dans le panneau à l'ouverture (défaut true) */
	focusPanel?: boolean;
	children: ReactNode;
	/** style inline appliqué au panneau */
	style?: CSSProperties;
}

/**
 * Coquille commune des overlays modaux (Modal, Drawer, Sheet). Possède le Portal,
 * le voile + la fermeture au clic (guardée par `closeOnBackdrop`), Échap + verrou
 * de défilement, et le focus-on-open du panneau. Le contenu (en-tête, corps, pied)
 * est fourni par chaque composant, qui garde ses propres classes de disposition.
 */
export function OverlayDialog({
	open,
	onClose,
	closeOnBackdrop = true,
	backdropClassName,
	panelClassName,
	as = "div",
	focusPanel = true,
	children,
	style,
}: OverlayDialogProps) {
	const panelRef = useRef<HTMLElement | null>(null);

	useEscapeAndScrollLock(open, onClose);

	// Le focus-on-open vit ici (le panelRef est dans la coquille) et NON dans le
	// hook Échap/scroll — que CommandPalette partage mais qui doit focaliser son
	// input, pas un panneau.
	useEffect(() => {
		if (open && focusPanel) panelRef.current?.focus();
	}, [open, focusPanel]);

	if (!open) return null;

	const panelProps = {
		ref: (el: HTMLElement | null) => {
			panelRef.current = el;
		},
		role: "dialog",
		"aria-modal": true,
		tabIndex: -1,
		className: cn("camply-overlay-panel", panelClassName),
		style,
	};

	return (
		<Portal>
			{/* biome-ignore lint/a11y/noStaticElementInteractions: fermeture au clic sur le voile — chemin clavier équivalent : Échap */}
			<div
				className={cn("camply-overlay-backdrop", backdropClassName)}
				onMouseDown={(e) => {
					if (closeOnBackdrop && e.target === e.currentTarget) onClose();
				}}
			>
				{as === "aside" ? (
					<aside {...panelProps}>{children}</aside>
				) : (
					<div {...panelProps}>{children}</div>
				)}
			</div>
		</Portal>
	);
}
