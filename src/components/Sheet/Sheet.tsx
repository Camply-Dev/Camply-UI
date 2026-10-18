import { forwardRef, type ReactNode } from "react";
import { cn } from "../../lib/cn";
import { DialogHeader } from "../../lib/DialogHeader";
import {
	type DialogFocusProps,
	type DialogPanelProps,
	OverlayDialog,
} from "../../lib/OverlayDialog";
import { useId } from "../../lib/useId";

export interface SheetProps extends DialogPanelProps<"div">, DialogFocusProps {
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
}

export const Sheet = forwardRef<HTMLDivElement, SheetProps>(
	(
		{
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
			initialFocus,
			className,
			style,
			...rest
		},
		ref,
	) => {
		const titleId = useId("sheet-title");

		return (
			<OverlayDialog
				open={open}
				onClose={onClose}
				closeOnBackdrop={closeOnBackdrop}
				backdropClassName="camply-sheet__backdrop"
				panelClassName={cn("camply-sheet__sheet", `camply-sheet__${side}`, className)}
				ariaLabelledBy={title ? titleId : undefined}
				initialFocus={initialFocus}
				style={{ height, ...style }}
				panelRef={ref}
				panelProps={rest}
			>
				{handle && side === "bottom" && <div className="camply-sheet__handle" aria-hidden="true" />}
				<DialogHeader
					prefix="sheet"
					title={title}
					titleId={titleId}
					showClose={showClose}
					onClose={onClose}
				/>
				{/* La zone qui défile n'a pas de marge : la marge est celle du corps. */}
				<div className="camply-sheet__content">
					<div className="camply-sheet__body">{children}</div>
				</div>
				{footer && <div className="camply-sheet__footer">{footer}</div>}
			</OverlayDialog>
		);
	},
);

Sheet.displayName = "Sheet";
