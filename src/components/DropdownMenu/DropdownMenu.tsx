import { type CSSProperties, forwardRef, type ReactElement, type ReactNode } from "react";
import { cloneTrigger } from "../../lib/cloneTrigger";
import { cn } from "../../lib/cn";
import { Portal } from "../../lib/Portal";
import type { Placement } from "../../lib/useAnchor";
import { useClickDisclosure } from "../../lib/useClickDisclosure";
export interface DropdownMenuProps {
	trigger: ReactElement;
	children: ReactNode;
	placement?: Placement;
	className?: string;
}

export function DropdownMenu({
	trigger,
	children,
	placement = "bottom-start",
	className,
}: DropdownMenuProps) {
	const { open, close, floatRef, style, triggerProps } = useClickDisclosure({
		placement,
		minHeight: 100,
	});

	return (
		<>
			{cloneTrigger(trigger, triggerProps(trigger, { "aria-haspopup": "menu" }))}
			{open && (
				<Portal>
					<div
						ref={floatRef}
						role="menu"
						className={cn("camply-floating-surface", "camply-dropdownmenu__menu", className)}
						style={style}
						onPointerDown={close}
					>
						{children}
					</div>
				</Portal>
			)}
		</>
	);
}

export interface MenuItemProps {
	children: ReactNode;
	icon?: ReactNode;
	onSelect?: () => void;
	danger?: boolean;
	disabled?: boolean;
	shortcut?: string;
	className?: string;
	style?: CSSProperties;
}

export const MenuItem = forwardRef<HTMLButtonElement, MenuItemProps>(
	({ children, icon, onSelect, danger, disabled, shortcut, className, style }, ref) => {
		return (
			<button
				ref={ref}
				type="button"
				role="menuitem"
				disabled={disabled}
				className={cn("camply-menu-item", danger && "camply-menu-item--danger", className)}
				style={style}
				onClick={() => onSelect?.()}
			>
				{icon && <span className={"camply-menu-item__icon"}>{icon}</span>}
				<span className={"camply-menu-item__label"}>{children}</span>
				{shortcut && <span className={"camply-menu-item__shortcut"}>{shortcut}</span>}
			</button>
		);
	},
);

MenuItem.displayName = "MenuItem";

export function MenuSeparator({ className, style }: { className?: string; style?: CSSProperties }) {
	return <hr className={cn("camply-menu-separator", className)} style={style} />;
}

export function MenuLabel({
	children,
	className,
	style,
}: {
	children: ReactNode;
	className?: string;
	style?: CSSProperties;
}) {
	return (
		<div className={cn("camply-dropdownmenu__menuLabel", className)} style={style}>
			{children}
		</div>
	);
}
