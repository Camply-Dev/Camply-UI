import { type CSSProperties, type ReactElement, type ReactNode, useRef } from "react";
import { cloneTrigger } from "../../lib/cloneTrigger";
import { cn } from "../../lib/cn";
import { Portal } from "../../lib/Portal";
import { type Placement, useAnchor } from "../../lib/useAnchor";
import { useDelayedOpen } from "../../lib/useDelayedOpen";

export type TooltipTone =
	| "default"
	| "plain"
	| "dark"
	| "accent"
	| "success"
	| "warning"
	| "danger"
	| "info";

export interface TooltipProps {
	content: ReactNode;
	children: ReactElement;
	icon?: ReactNode;
	placement?: Placement;
	tone?: TooltipTone;
	delay?: number;
	className?: string;
	style?: CSSProperties;
}

export function Tooltip({
	content,
	children,
	icon,
	placement = "top",
	tone = "default",
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
						className={cn(
							"camply-tooltip__tip",
							`camply-tooltip__${side}`,
							`camply-tooltip__${tone}`,
							className,
						)}
						style={{ ...style, ...styleProp }}
					>
						{icon && (
							<span aria-hidden="true" className={"camply-tooltip__icon"}>
								{icon}
							</span>
						)}
						<span className={"camply-tooltip__label"}>{content}</span>
						<span aria-hidden="true" className={"camply-tooltip__arrow"} />
					</div>
				</Portal>
			)}
		</>
	);
}
