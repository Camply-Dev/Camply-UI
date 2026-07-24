import type { CSSProperties, ReactNode } from "react";
import { CloseButton } from "../../lib/CloseButton";
import { cn } from "../../lib/cn";
import { OverlayDialog } from "../../lib/OverlayDialog";
import { useId } from "../../lib/useId";
export interface ModalProps {
	open: boolean;
	onClose: () => void;
	title?: ReactNode;
	description?: ReactNode;
	children?: ReactNode;
	footer?: ReactNode;
	size?: "sm" | "md" | "lg";
	closeOnBackdrop?: boolean;
	showClose?: boolean;
	className?: string;
	style?: CSSProperties;
}

export function Modal({
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
}: ModalProps) {
	// Le titre visible donne son nom accessible au dialogue (aria-labelledby).
	const titleId = useId("modal-title");

	return (
		<OverlayDialog
			open={open}
			onClose={onClose}
			closeOnBackdrop={closeOnBackdrop}
			backdropClassName="camply-modal__backdrop"
			panelClassName={cn("camply-modal__panel", `camply-modal__${size}`, className)}
			ariaLabelledBy={title ? titleId : undefined}
			style={style}
		>
			{(title || showClose) && (
				<div className={"camply-modal__header"}>
					<div>
						{title && (
							<h2 id={titleId} className={"camply-modal__title"}>
								{title}
							</h2>
						)}
						{description && <p className={"camply-modal__desc"}>{description}</p>}
					</div>
					{showClose && <CloseButton className="camply-modal__close" onClick={onClose} />}
				</div>
			)}
			{children && <div className={"camply-modal__content"}>{children}</div>}
			{footer && <div className={"camply-modal__footer"}>{footer}</div>}
		</OverlayDialog>
	);
}
