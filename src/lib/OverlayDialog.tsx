import { type CSSProperties, type ReactNode, useEffect, useRef } from "react";
import { cn } from "./cn";
import { focusableWithin, trapTab } from "./focusTrap";
import { Portal } from "./Portal";
import { useEscapeAndScrollLock } from "./useEscapeAndScrollLock";

export interface OverlayDialogProps {
	open: boolean;
	onClose: () => void;
	closeOnBackdrop?: boolean;
	backdropClassName?: string;
	panelClassName?: string;
	as?: "div" | "aside";
	focusPanel?: boolean;
	/** Nom accessible explicite (si le dialogue n'a pas de titre visible). */
	ariaLabel?: string;
	/** id du titre visible — donne son nom accessible au dialogue (à préférer). */
	ariaLabelledBy?: string;
	children: ReactNode;
	style?: CSSProperties;
}

/**
 * Socle commun des dialogues modaux (Modal, Drawer, Sheet, CommandPalette).
 * Implémente ce qu'`aria-modal="true"` promet : le focus entre dans le
 * dialogue, y reste (piège Tab), et revient au déclencheur à la fermeture.
 */
export function OverlayDialog({
	open,
	onClose,
	closeOnBackdrop = true,
	backdropClassName,
	panelClassName,
	as = "div",
	focusPanel = true,
	ariaLabel,
	ariaLabelledBy,
	children,
	style,
}: OverlayDialogProps) {
	const panelRef = useRef<HTMLElement | null>(null);

	useEscapeAndScrollLock(open, onClose);

	// Mémorise le focus d'origine et le restaure à la fermeture.
	useEffect(() => {
		if (!open) return;
		const previous = document.activeElement as HTMLElement | null;
		return () => previous?.focus?.();
	}, [open]);

	// Entrée du focus dans le dialogue : premier élément focalisable, sinon le panneau.
	useEffect(() => {
		if (!open || !focusPanel) return;
		const panel = panelRef.current;
		if (!panel) return;
		const [first] = focusableWithin(panel);
		(first ?? panel).focus();
	}, [open, focusPanel]);

	// Piège Tab : le focus ne peut pas sortir derrière le voile.
	useEffect(() => {
		if (!open) return;
		const onKeyDown = (e: KeyboardEvent) => {
			const panel = panelRef.current;
			if (panel) trapTab(e, panel);
		};
		document.addEventListener("keydown", onKeyDown, true);
		return () => document.removeEventListener("keydown", onKeyDown, true);
	}, [open]);

	if (!open) return null;

	const panelProps = {
		ref: (el: HTMLElement | null) => {
			panelRef.current = el;
		},
		role: "dialog",
		"aria-modal": true,
		"aria-label": ariaLabelledBy ? undefined : ariaLabel,
		"aria-labelledby": ariaLabelledBy,
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
