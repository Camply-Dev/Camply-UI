import { forwardRef, type ReactNode } from "react";
import { cn } from "../../lib/cn";
import { DialogHeader } from "../../lib/DialogHeader";
import { idRefs } from "../../lib/Field";
import { type DialogPanelProps, OverlayDialog } from "../../lib/OverlayDialog";
import type { Size } from "../../lib/types";
import { useId } from "../../lib/useId";

/** `full` occupe toute la fenêtre, marges du voile comprises. */
export type ModalSize = Size | "full";

export interface ModalProps extends DialogPanelProps<"div"> {
	open: boolean;
	onClose: () => void;
	title?: ReactNode;
	description?: ReactNode;
	children?: ReactNode;
	footer?: ReactNode;
	/** Défaut `md`. */
	size?: ModalSize;
	closeOnBackdrop?: boolean;
	showClose?: boolean;
}

export const Modal = forwardRef<HTMLDivElement, ModalProps>(
	(
		{
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
			"aria-describedby": ariaDescribedBy,
			...rest
		},
		ref,
	) => {
		// Le titre visible donne son nom accessible au dialogue (aria-labelledby).
		const titleId = useId("modal-title");
		const descId = useId("modal-desc");
		// Pattern APG « Dialog » : la description visible est rattachée au dialogue.
		// Celle du consommateur s'y ajoute — `aria-describedby` est une liste d'ids.
		const describedBy = idRefs(description ? descId : undefined, ariaDescribedBy);

		return (
			<OverlayDialog
				open={open}
				onClose={onClose}
				closeOnBackdrop={closeOnBackdrop}
				backdropClassName="camply-modal__backdrop"
				panelClassName={cn("camply-modal__panel", `camply-modal__${size}`, className)}
				ariaLabelledBy={title ? titleId : undefined}
				style={style}
				panelRef={ref}
				panelProps={{ ...rest, "aria-describedby": describedBy }}
			>
				<DialogHeader
					prefix="modal"
					title={title}
					titleId={titleId}
					description={description}
					descriptionId={descId}
					showClose={showClose}
					onClose={onClose}
				/>
				{children && <div className="camply-modal__content">{children}</div>}
				{footer && <div className="camply-modal__footer">{footer}</div>}
			</OverlayDialog>
		);
	},
);

Modal.displayName = "Modal";
