import { type CSSProperties, type ReactNode, useEffect, useRef } from "react";
import { cn } from "../../lib/cn";
import { X } from "../../lib/icons";
import { Portal } from "../../lib/Portal";
import { IconButton } from "../IconButton";
export interface ModalProps {
	open: boolean;
	onClose: () => void;
	title?: ReactNode;
	description?: ReactNode;
	children?: ReactNode;
	/** rendered in the footer, right-aligned */
	footer?: ReactNode;
	size?: "sm" | "md" | "lg";
	/** clicking the backdrop closes (default true) */
	closeOnBackdrop?: boolean;
	showClose?: boolean;
	/** applied to the dialog panel */
	className?: string;
	style?: CSSProperties;
}

export function Modal({
	open,
	onClose,
	title,
	description,
	children,
	footer,
	size = "md",
	closeOnBackdrop = true,
	showClose = true,
	className,
	style,
}: ModalProps) {
	const panelRef = useRef<HTMLDivElement>(null);

	// Esc to close + lock body scroll while open.
	useEffect(() => {
		if (!open) return;
		const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
		document.addEventListener("keydown", onKey);
		const prev = document.body.style.overflow;
		document.body.style.overflow = "hidden";
		return () => {
			document.removeEventListener("keydown", onKey);
			document.body.style.overflow = prev;
		};
	}, [open, onClose]);

	// Move focus into the dialog when it opens.
	useEffect(() => {
		if (open) panelRef.current?.focus();
	}, [open]);

	if (!open) return null;

	return (
		<Portal>
			{/* biome-ignore lint/a11y/noStaticElementInteractions: fermeture au clic sur le backdrop — chemin clavier équivalent : Échap */}
			<div
				className={"camply-modal__backdrop"}
				onMouseDown={(e) => {
					if (closeOnBackdrop && e.target === e.currentTarget) onClose();
				}}
			>
				<div
					ref={panelRef}
					role="dialog"
					aria-modal="true"
					tabIndex={-1}
					className={cn("camply-modal__panel", `camply-modal__${size}`, className)}
					style={style}
				>
					{(title || showClose) && (
						<div className={"camply-modal__header"}>
							<div>
								{title && <h2 className={"camply-modal__title"}>{title}</h2>}
								{description && <p className={"camply-modal__desc"}>{description}</p>}
							</div>
							{showClose && (
								<IconButton
									label="Fermer"
									variant="ghost"
									size="sm"
									className={"camply-modal__close"}
									onClick={onClose}
								>
									<X size={15} />
								</IconButton>
							)}
						</div>
					)}
					{children && <div className={"camply-modal__content"}>{children}</div>}
					{footer && <div className={"camply-modal__footer"}>{footer}</div>}
				</div>
			</div>
		</Portal>
	);
}
