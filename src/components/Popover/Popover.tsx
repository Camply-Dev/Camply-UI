import type { CSSProperties, ReactElement, ReactNode } from "react";
import { cloneTrigger } from "../../lib/cloneTrigger";
import { cn } from "../../lib/cn";
import { Portal } from "../../lib/Portal";
import type { Placement } from "../../lib/useAnchor";
import { useClickDisclosure } from "../../lib/useClickDisclosure";
export interface PopoverProps {
	trigger: ReactElement;
	children: ReactNode;
	placement?: Placement;
	className?: string;
	style?: CSSProperties;
}

export function Popover({
	trigger,
	children,
	placement = "bottom-start",
	className,
	style: styleProp,
}: PopoverProps) {
	const { open, floatRef, style, triggerProps } = useClickDisclosure({ placement, minHeight: 140 });

	return (
		<>
			{cloneTrigger(trigger, triggerProps(trigger))}
			{open && (
				<Portal>
					<div
						ref={floatRef}
						className={cn("camply-floating-surface", "camply-popover__panel", className)}
						style={{ ...style, ...styleProp }}
					>
						{children}
					</div>
				</Portal>
			)}
		</>
	);
}
