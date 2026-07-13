import type { CSSProperties, ReactNode } from "react";
import { CloseButton } from "../../lib/CloseButton";
import { cn } from "../../lib/cn";
import { OverlayDialog } from "../../lib/OverlayDialog";
export interface DrawerProps {
	open: boolean;
	onClose: () => void;
	title?: ReactNode;
	children?: ReactNode;
	footer?: ReactNode;
	side?: "left" | "right";
	width?: number | string;
	showClose?: boolean;
	closeOnBackdrop?: boolean;
	className?: string;
	style?: CSSProperties;
}

export function Drawer({
	open,
	onClose,
	title,
	children,
	footer,
	side = "right",
	width = 380,
	showClose = true,
	closeOnBackdrop = true,
	className,
	style,
}: DrawerProps) {
	return (
		<OverlayDialog
			open={open}
			onClose={onClose}
			closeOnBackdrop={closeOnBackdrop}
			as="aside"
			backdropClassName="camply-drawer__backdrop"
			panelClassName={cn("camply-drawer__panel", `camply-drawer__${side}`, className)}
			style={{ width, ...style }}
		>
			{(title || showClose) && (
				<div className={"camply-drawer__header"}>
					{title && <h2 className={"camply-drawer__title"}>{title}</h2>}
					{showClose && <CloseButton className="camply-drawer__close" onClick={onClose} />}
				</div>
			)}
			<div className={"camply-drawer__content"}>{children}</div>
			{footer && <div className={"camply-drawer__footer"}>{footer}</div>}
		</OverlayDialog>
	);
}
