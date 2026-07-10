import {
	type CSSProperties,
	cloneElement,
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
export interface PopoverProps {
	trigger: ReactElement;
	children: ReactNode;
	placement?: Placement;
	className?: string;
	style?: CSSProperties;
}

/** Click-triggered floating panel for rich content (forms, pickers, cards). */
export function Popover({
	trigger,
	children,
	placement = "bottom-start",
	className,
	style: styleProp,
}: PopoverProps) {
	const [open, setOpen] = useState(false);
	const anchorRef = useRef<HTMLElement>(null);
	const panelRef = useRef<HTMLDivElement>(null);

	const style = useAnchor(anchorRef, panelRef, open, {
		placement,
		gap: 8,
		constrainHeight: true,
		minHeight: 140,
	});
	const close = useCallback(() => setOpen(false), []);
	useDismiss(open, close, [anchorRef, panelRef]);

	const triggerEl = isValidElement(trigger)
		? cloneElement(trigger as ReactElement<Record<string, unknown>>, {
				ref: anchorRef,
				onClick: (e: React.MouseEvent) => {
					(trigger.props as { onClick?: (e: React.MouseEvent) => void }).onClick?.(e);
					setOpen((o) => !o);
				},
				"aria-expanded": open,
			})
		: trigger;

	return (
		<>
			{triggerEl}
			{open && (
				<Portal>
					<div
						ref={panelRef}
						className={cn("camply-popover__panel", className)}
						style={{ ...style, ...styleProp, zIndex: "var(--camply-z-dropdown)" as never }}
					>
						{children}
					</div>
				</Portal>
			)}
		</>
	);
}
