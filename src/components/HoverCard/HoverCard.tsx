import { type CSSProperties, type ReactElement, type ReactNode, useRef } from "react";
import { cloneTrigger } from "../../lib/cloneTrigger";
import { cn } from "../../lib/cn";
import { Portal } from "../../lib/Portal";
import { type Placement, useAnchor } from "../../lib/useAnchor";
import { useDelayedOpen } from "../../lib/useDelayedOpen";
export interface HoverCardProps {
	trigger: ReactElement;
	children: ReactNode;
	placement?: Placement;
	openDelay?: number;
	closeDelay?: number;
	className?: string;
	style?: CSSProperties;
}

export function HoverCard({
	trigger,
	children,
	placement = "bottom-start",
	openDelay = 250,
	closeDelay = 150,
	className,
	style: styleProp,
}: HoverCardProps) {
	const anchorRef = useRef<HTMLElement>(null);
	const cardRef = useRef<HTMLDivElement>(null);
	const { open, show, hide } = useDelayedOpen(openDelay, closeDelay);

	const style = useAnchor(anchorRef, cardRef, open, { placement, gap: 8 });

	const triggerEl = cloneTrigger(trigger, {
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
					{/* biome-ignore lint/a11y/noStaticElementInteractions: survol uniquement par nature (garde la carte ouverte) — au clavier, focus/blur du trigger pilotent l'ouverture */}
					<div
						ref={cardRef}
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
}
