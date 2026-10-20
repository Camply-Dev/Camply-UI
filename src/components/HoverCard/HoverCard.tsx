import {
	type ComponentPropsWithoutRef,
	forwardRef,
	type ReactElement,
	type ReactNode,
} from "react";
import { cloneTrigger, markTriggerSlot } from "../../lib/cloneTrigger";
import { cn } from "../../lib/cn";
import { useMergedRefs } from "../../lib/mergeRefs";
import { Portal } from "../../lib/Portal";
import type { Placement } from "../../lib/useAnchor";
import type { Controllable } from "../../lib/useControllable";
import { useHoverDisclosure } from "../../lib/useHoverDisclosure";

export interface HoverCardProps extends ComponentPropsWithoutRef<"div">, Controllable {
	trigger: ReactElement;
	children: ReactNode;
	placement?: Placement;
	openDelay?: number;
	closeDelay?: number;
}

export const HoverCard = forwardRef<HTMLDivElement, HoverCardProps>(
	(
		{
			trigger,
			children,
			placement = "bottom-start",
			openDelay = 250,
			closeDelay = 150,
			open: openProp,
			defaultOpen,
			onOpenChange,
			className,
			style: styleProp,
			onMouseEnter,
			onMouseLeave,
			...rest
		},
		ref,
	) => {
		const { open, floatRef, style, triggerProps, surfaceProps } = useHoverDisclosure({
			placement,
			openDelay,
			closeDelay,
			open: openProp,
			defaultOpen,
			onOpenChange,
			onMouseEnter,
			onMouseLeave,
		});
		const setCardRef = useMergedRefs(floatRef, ref);

		return (
			<>
				{cloneTrigger(trigger, triggerProps)}
				{open && (
					<Portal>
						{/* Survol uniquement par nature (garde la carte ouverte) — au clavier, focus/blur du déclencheur pilotent l'ouverture. */}
						<div
							{...rest}
							ref={setCardRef}
							className={cn("camply-floating-surface", "camply-hovercard__card", className)}
							style={{ ...style, ...styleProp }}
							{...surfaceProps}
						>
							{children}
						</div>
					</Portal>
				)}
			</>
		);
	},
);

HoverCard.displayName = "HoverCard";
markTriggerSlot(HoverCard, "trigger");
