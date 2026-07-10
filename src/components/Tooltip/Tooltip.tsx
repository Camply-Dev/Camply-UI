import {
	type CSSProperties,
	cloneElement,
	isValidElement,
	type ReactElement,
	type ReactNode,
	useRef,
	useState,
} from "react";
import { cn } from "../../lib/cn";
import { Portal } from "../../lib/Portal";
import { type Placement, useAnchor } from "../../lib/useAnchor";
export interface TooltipProps {
	content: ReactNode;
	children: ReactElement;
	placement?: Placement;
	/** delay before showing, ms */
	delay?: number;
	className?: string;
	style?: CSSProperties;
}

/**
 * Hover/focus tooltip rendered in a Portal — positioned above the trigger by
 * default and flipped/clamped to stay on screen.
 */
export function Tooltip({
	content,
	children,
	placement = "top",
	delay = 200,
	className,
	style: styleProp,
}: TooltipProps) {
	const [open, setOpen] = useState(false);
	const anchorRef = useRef<HTMLElement>(null);
	const tipRef = useRef<HTMLDivElement>(null);
	const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

	const style = useAnchor(anchorRef, tipRef, open, { placement, gap: 8 });
	const side = placement.split("-")[0];

	const show = () => {
		clearTimeout(timer.current);
		timer.current = setTimeout(() => setOpen(true), delay);
	};
	const hide = () => {
		clearTimeout(timer.current);
		setOpen(false);
	};

	const triggerEl = isValidElement(children)
		? cloneElement(children as ReactElement<Record<string, unknown>>, {
				ref: anchorRef,
				onMouseEnter: show,
				onMouseLeave: hide,
				onFocus: show,
				onBlur: hide,
			})
		: children;

	return (
		<>
			{triggerEl}
			{open && (
				<Portal>
					<div
						ref={tipRef}
						role="tooltip"
						className={cn("camply-tooltip__tip", `camply-tooltip__${side}`, className)}
						style={{ ...style, ...styleProp, zIndex: "var(--camply-z-tooltip)" as never }}
					>
						{content}
						<span aria-hidden="true" className={"camply-tooltip__arrow"} />
					</div>
				</Portal>
			)}
		</>
	);
}
