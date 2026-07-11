import { type CSSProperties, type ReactElement, type ReactNode, useRef } from "react";
import { cloneTrigger } from "../../lib/cloneTrigger";
import { cn } from "../../lib/cn";
import { Portal } from "../../lib/Portal";
import { type Placement, useAnchor } from "../../lib/useAnchor";
import { useDelayedOpen } from "../../lib/useDelayedOpen";
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
	const anchorRef = useRef<HTMLElement>(null);
	const tipRef = useRef<HTMLDivElement>(null);
	const { open, show, hide } = useDelayedOpen(delay);

	const style = useAnchor(anchorRef, tipRef, open, { placement, gap: 8 });
	const side = placement.split("-")[0];

	const triggerEl = cloneTrigger(children, {
		ref: anchorRef,
		onMouseEnter: show,
		onMouseLeave: hide,
		onFocus: show,
		onBlur: hide,
	});

	return (
		<>
			{triggerEl}
			{open && (
				<Portal>
					<div
						ref={tipRef}
						role="tooltip"
						className={cn("camply-tooltip__tip", `camply-tooltip__${side}`, className)}
						style={{ ...style, ...styleProp }}
					>
						{content}
						<span aria-hidden="true" className={"camply-tooltip__arrow"} />
					</div>
				</Portal>
			)}
		</>
	);
}
