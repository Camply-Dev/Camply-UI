import type { CSSProperties, ReactNode } from "react";
import { cn } from "../../lib/cn";
import { X } from "../../lib/icons";
import { Portal } from "../../lib/Portal";
import { useEscapeAndScrollLock } from "../../lib/useEscapeAndScrollLock";
import { IconButton } from "../IconButton";
export interface SheetProps {
	open: boolean;
	onClose: () => void;
	title?: ReactNode;
	children?: ReactNode;
	footer?: ReactNode;
	/** which edge the sheet slides from */
	side?: "bottom" | "top";
	/** cap the height (bottom/top sheets) */
	height?: number | string;
	showClose?: boolean;
	/** show the drag handle affordance (bottom sheets) */
	handle?: boolean;
	/** applied to the sheet panel */
	className?: string;
	style?: CSSProperties;
}

/** An edge sheet — like a Drawer but sliding from the top or bottom, ideal for
 *  mobile-style pickers and quick panels. Portalled, Esc to close, scroll-locked. */
export function Sheet({
	open,
	onClose,
	title,
	children,
	footer,
	side = "bottom",
	height = "auto",
	showClose = true,
	handle = true,
	className,
	style,
}: SheetProps) {
	useEscapeAndScrollLock(open, onClose);

	if (!open) return null;

	return (
		<Portal>
			{/* biome-ignore lint/a11y/noStaticElementInteractions: fermeture au clic sur le backdrop — chemin clavier équivalent : Échap */}
			<div
				className={"camply-sheet__backdrop"}
				onMouseDown={(e) => e.target === e.currentTarget && onClose()}
			>
				<div
					role="dialog"
					aria-modal="true"
					className={cn("camply-sheet__sheet", `camply-sheet__${side}`, className)}
					style={{ height, ...style }}
				>
					{handle && side === "bottom" && (
						<div className={"camply-sheet__handle"} aria-hidden="true" />
					)}
					{(title || showClose) && (
						<div className={"camply-sheet__header"}>
							{title && <h2 className={"camply-sheet__title"}>{title}</h2>}
							{showClose && (
								<IconButton
									label="Fermer"
									variant="ghost"
									size="sm"
									className={"camply-sheet__close"}
									onClick={onClose}
								>
									<X size={15} />
								</IconButton>
							)}
						</div>
					)}
					<div className={"camply-sheet__content"}>{children}</div>
					{footer && <div className={"camply-sheet__footer"}>{footer}</div>}
				</div>
			</div>
		</Portal>
	);
}
