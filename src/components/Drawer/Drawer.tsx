import type { CSSProperties, ReactNode } from "react";
import { cn } from "../../lib/cn";
import { X } from "../../lib/icons";
import { OverlayDialog } from "../../lib/OverlayDialog";
import { IconButton } from "../IconButton";
export interface DrawerProps {
	open: boolean;
	onClose: () => void;
	title?: ReactNode;
	children?: ReactNode;
	footer?: ReactNode;
	side?: "left" | "right";
	width?: number | string;
	showClose?: boolean;
	/** clic sur le voile pour fermer (défaut true) */
	closeOnBackdrop?: boolean;
	/** applied to the drawer panel */
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
					{showClose && (
						<IconButton
							label="Fermer"
							variant="ghost"
							size="sm"
							className={"camply-drawer__close"}
							onClick={onClose}
						>
							<X size={15} />
						</IconButton>
					)}
				</div>
			)}
			<div className={"camply-drawer__content"}>{children}</div>
			{footer && <div className={"camply-drawer__footer"}>{footer}</div>}
		</OverlayDialog>
	);
}
