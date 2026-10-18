import { forwardRef, type ReactNode } from "react";
import { cn } from "../../lib/cn";
import { DialogHeader } from "../../lib/DialogHeader";
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
				<DialogHeader
					prefix="drawer"
					title={title}
					titleId={titleId}
					showClose={showClose}
					onClose={onClose}
				/>
				{/* La zone qui défile n'a pas de marge : la marge est celle du corps. */}
				<div className="camply-drawer__content">
					<div className="camply-drawer__body">{children}</div>
				</div>
				{footer && <div className="camply-drawer__footer">{footer}</div>}
			</OverlayDialog>
		);
	},
);

Drawer.displayName = "Drawer";
