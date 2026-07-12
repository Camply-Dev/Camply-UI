import type { CSSProperties, ReactNode } from "react";
import { cn } from "../../lib/cn";
import { X } from "../../lib/icons";
import { OverlayDialog } from "../../lib/OverlayDialog";
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
	/** clic sur le voile pour fermer (défaut true) */
	closeOnBackdrop?: boolean;
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
	closeOnBackdrop = true,
	className,
	style,
}: SheetProps) {
	return (
		<OverlayDialog
			open={open}
			onClose={onClose}
			closeOnBackdrop={closeOnBackdrop}
			backdropClassName="camply-sheet__backdrop"
			panelClassName={cn("camply-sheet__sheet", `camply-sheet__${side}`, className)}
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
		</OverlayDialog>
	);
}
