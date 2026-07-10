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
export interface HoverCardProps {
	trigger: ReactElement;
	children: ReactNode;
	placement?: Placement;
	openDelay?: number;
	closeDelay?: number;
	className?: string;
	style?: CSSProperties;
}

/** Rich content shown on hover/focus (user cards, previews). Portalled and
 *  anchored; stays open while the pointer is over the card. */
export function HoverCard({
	trigger,
	children,
	placement = "bottom-start",
	openDelay = 250,
	closeDelay = 150,
	className,
	style: styleProp,
}: HoverCardProps) {
	const [open, setOpen] = useState(false);
	const anchorRef = useRef<HTMLElement>(null);
	const cardRef = useRef<HTMLDivElement>(null);
	const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

	const style = useAnchor(anchorRef, cardRef, open, { placement, gap: 8 });

	const show = () => {
		clearTimeout(timer.current);
		timer.current = setTimeout(() => setOpen(true), openDelay);
	};
	const hide = () => {
		clearTimeout(timer.current);
		timer.current = setTimeout(() => setOpen(false), closeDelay);
	};

	const triggerEl = isValidElement(trigger)
		? cloneElement(trigger as ReactElement<Record<string, unknown>>, {
				ref: anchorRef,
				onMouseEnter: show,
				onMouseLeave: hide,
				onFocus: show,
				onBlur: hide,
			})
		: trigger;

	return (
		<>
			{triggerEl}
			{open && (
				<Portal>
					{/* biome-ignore lint/a11y/noStaticElementInteractions: survol uniquement par nature (garde la carte ouverte) — au clavier, focus/blur du trigger pilotent l'ouverture */}
					<div
						ref={cardRef}
						className={cn("camply-hovercard__card", className)}
						style={{ ...style, ...styleProp, zIndex: "var(--camply-z-tooltip)" as never }}
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
