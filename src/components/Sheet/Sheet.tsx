import type { CSSProperties, ReactNode } from "react";
import { CloseButton } from "../../lib/CloseButton";
import { cn } from "../../lib/cn";
import { OverlayDialog } from "../../lib/OverlayDialog";
export interface SheetProps {
	open: boolean;
	onClose: () => void;
	title?: ReactNode;
	children?: ReactNode;
	footer?: ReactNode;
	side?: "bottom" | "top";
	height?: number | string;
	showClose?: boolean;
	handle?: boolean;
	closeOnBackdrop?: boolean;
	className?: string;
	style?: CSSProperties;
}

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
			{handle && side === "bottom" && <div className={"camply-sheet__handle"} aria-hidden="true" />}
			{(title || showClose) && (
				<div className={"camply-sheet__header"}>
					{title && <h2 className={"camply-sheet__title"}>{title}</h2>}
					{showClose && <CloseButton className="camply-sheet__close" onClick={onClose} />}
				</div>
			)}
			<div className={"camply-sheet__content"}>{children}</div>
			{footer && <div className={"camply-sheet__footer"}>{footer}</div>}
		</OverlayDialog>
	);
}
