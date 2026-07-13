import { type CSSProperties, type ReactNode, useEffect, useRef } from "react";
import { cn } from "./cn";
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
	ariaLabel?: string;
	children: ReactNode;
	style?: CSSProperties;
}

export function OverlayDialog({
	open,
	onClose,
	closeOnBackdrop = true,
	backdropClassName,
	panelClassName,
	as = "div",
	focusPanel = true,
	ariaLabel,
	children,
	style,
}: OverlayDialogProps) {
	const panelRef = useRef<HTMLElement | null>(null);

	useEscapeAndScrollLock(open, onClose);

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
		"aria-label": ariaLabel,
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
