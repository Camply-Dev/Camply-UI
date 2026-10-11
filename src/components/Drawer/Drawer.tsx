import { forwardRef, type ReactNode } from "react";
import { cn } from "../../lib/cn";
import { DialogHeader } from "../../lib/DialogHeader";
import { type DialogPanelProps, OverlayDialog } from "../../lib/OverlayDialog";
import { useId } from "../../lib/useId";

export interface DrawerProps extends DialogPanelProps<"aside"> {
	open: boolean;
	onClose: () => void;
	title?: ReactNode;
	children?: ReactNode;
	footer?: ReactNode;
	side?: "left" | "right";
	width?: number | string;
	showClose?: boolean;
	closeOnBackdrop?: boolean;
}

export const Drawer = forwardRef<HTMLElement, DrawerProps>(
	(
		{
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
			...rest
		},
		ref,
	) => {
		const titleId = useId("drawer-title");

		return (
			<OverlayDialog
				open={open}
				onClose={onClose}
				closeOnBackdrop={closeOnBackdrop}
				as="aside"
				backdropClassName="camply-drawer__backdrop"
				panelClassName={cn("camply-drawer__panel", `camply-drawer__${side}`, className)}
				ariaLabelledBy={title ? titleId : undefined}
				style={{ width, ...style }}
				panelRef={ref}
				panelProps={rest}
			>
				<DialogHeader
					prefix="drawer"
					title={title}
					titleId={titleId}
					showClose={showClose}
					onClose={onClose}
				/>
				<div className="camply-drawer__content">{children}</div>
				{footer && <div className="camply-drawer__footer">{footer}</div>}
			</OverlayDialog>
		);
	},
);

Drawer.displayName = "Drawer";
