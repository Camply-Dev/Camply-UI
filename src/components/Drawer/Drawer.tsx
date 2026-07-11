import type { CSSProperties, ReactNode } from "react";
import { cn } from "../../lib/cn";
import { X } from "../../lib/icons";
import { Portal } from "../../lib/Portal";
import { useEscapeAndScrollLock } from "../../lib/useEscapeAndScrollLock";
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
	className,
	style,
}: DrawerProps) {
	useEscapeAndScrollLock(open, onClose);

	if (!open) return null;

	return (
		<Portal>
			{/* biome-ignore lint/a11y/noStaticElementInteractions: fermeture au clic sur le backdrop — chemin clavier équivalent : Échap */}
			<div
				className={"camply-drawer__backdrop"}
				onMouseDown={(e) => e.target === e.currentTarget && onClose()}
			>
				<aside
					role="dialog"
					aria-modal="true"
					className={cn("camply-drawer__panel", `camply-drawer__${side}`, className)}
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
				</aside>
			</div>
		</Portal>
	);
}
