import { forwardRef, type ReactNode } from "react";
import { cn } from "../../lib/cn";
import { DialogFrame } from "../../lib/DialogFrame";
import {
	type DialogFocusProps,
	type DialogPanelProps,
	OverlayDialog,
} from "../../lib/OverlayDialog";
import { useId } from "../../lib/useId";

export interface DrawerProps extends DialogPanelProps<"aside">, DialogFocusProps {
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
			initialFocus,
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
				initialFocus={initialFocus}
				style={{ width, ...style }}
				panelRef={ref}
				panelProps={rest}
			>
				<DialogFrame
					prefix="drawer"
					title={title}
					titleId={titleId}
					showClose={showClose}
					onClose={onClose}
					footer={footer}
				>
					{children}
				</DialogFrame>
			</OverlayDialog>
		);
	},
);

Drawer.displayName = "Drawer";
