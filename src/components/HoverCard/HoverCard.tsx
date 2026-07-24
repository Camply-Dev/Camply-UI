import {
	type ComponentPropsWithoutRef,
	forwardRef,
	type ReactElement,
	type ReactNode,
	useRef,
} from "react";
import { cloneTrigger } from "../../lib/cloneTrigger";
import { cn } from "../../lib/cn";
import { useMergedRefs } from "../../lib/mergeRefs";
import { Portal } from "../../lib/Portal";
import { type Placement, useAnchor } from "../../lib/useAnchor";
import type { Controllable } from "../../lib/useControllable";
import { useDelayedOpen } from "../../lib/useDelayedOpen";

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
			...rest
		},
		ref,
	) => {
		const anchorRef = useRef<HTMLElement>(null);
		const cardRef = useRef<HTMLDivElement>(null);

		const { open, show, hide } = useDelayedOpen(openDelay, closeDelay, {
			open: openProp,
			defaultOpen,
			onOpenChange,
		});

		const { style } = useAnchor(anchorRef, cardRef, open, { placement, gap: 8 });
		const setCardRef = useMergedRefs(cardRef, ref);

		return (
			<>
				{cloneTrigger(trigger, {
					ref: anchorRef,
					onMouseEnter: show,
					onMouseLeave: hide,
					onFocus: show,
					onBlur: hide,
				})}
				{open && (
					<Portal>
						{/* biome-ignore lint/a11y/noStaticElementInteractions: survol uniquement par nature (garde la carte ouverte) — au clavier, focus/blur du trigger pilotent l'ouverture */}
						<div
							{...rest}
							ref={setCardRef}
							className={cn("camply-floating-surface", "camply-hovercard__card", className)}
							style={{ ...style, ...styleProp }}
							onMouseEnter={show}
							onMouseLeave={hide}
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
