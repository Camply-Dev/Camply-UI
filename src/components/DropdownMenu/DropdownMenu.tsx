import {
	type CSSProperties,
	cloneElement,
	forwardRef,
	isValidElement,
	type ReactElement,
	type ReactNode,
	useCallback,
	useRef,
	useState,
} from "react";
import { cn } from "../../lib/cn";
import { Portal } from "../../lib/Portal";
import { type Placement, useAnchor } from "../../lib/useAnchor";
import { useDismiss } from "../../lib/useDismiss";
export interface DropdownMenuProps {
	/** the clickable element that toggles the menu */
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
	const [open, setOpen] = useState(false);
	const anchorRef = useRef<HTMLElement>(null);
	const menuRef = useRef<HTMLDivElement>(null);

	const style = useAnchor(anchorRef, menuRef, open, {
		placement,
		gap: 8,
		constrainHeight: true,
		minHeight: 100,
	});
	const close = useCallback(() => setOpen(false), []);
	useDismiss(open, close, [anchorRef, menuRef]);

	const triggerEl = isValidElement(trigger)
		? cloneElement(trigger as ReactElement<Record<string, unknown>>, {
				ref: anchorRef,
				onClick: (e: React.MouseEvent) => {
					(trigger.props as { onClick?: (e: React.MouseEvent) => void }).onClick?.(e);
					setOpen((o) => !o);
				},
				"aria-haspopup": "menu",
				"aria-expanded": open,
			})
		: trigger;

	return (
		<>
			{triggerEl}
			{open && (
				<Portal>
					{/* biome-ignore lint/a11y/useKeyWithClickEvents: délégation de fermeture au clic — les items sont de vrais boutons (clavier natif) et Échap ferme via useDismiss */}
					<div
						ref={menuRef}
						role="menu"
						className={cn("camply-dropdownmenu__menu", className)}
						style={{ ...style, zIndex: "var(--camply-z-dropdown)" as never }}
						onClick={() => setOpen(false)}
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
	/** trailing hint, e.g. a keyboard shortcut */
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
				className={cn(
					"camply-dropdownmenu__item",
					danger && "camply-dropdownmenu__danger",
					className,
				)}
				style={style}
				onClick={() => onSelect?.()}
			>
				{icon && <span className={"camply-dropdownmenu__itemIcon"}>{icon}</span>}
				<span className={"camply-dropdownmenu__itemLabel"}>{children}</span>
				{shortcut && <span className={"camply-dropdownmenu__shortcut"}>{shortcut}</span>}
			</button>
		);
	},
);

MenuItem.displayName = "MenuItem";

export function MenuSeparator({ className, style }: { className?: string; style?: CSSProperties }) {
	return <hr className={cn("camply-dropdownmenu__separator", className)} style={style} />;
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
