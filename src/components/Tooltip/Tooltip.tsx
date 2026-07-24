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
import { useId } from "../../lib/useId";

export type TooltipTone =
	| "default"
	| "plain"
	| "dark"
	| "accent"
	| "success"
	| "warning"
	| "danger"
	| "info";

// `content` et `children` existent déjà sur HTMLAttributes (RDFa / ReactNode) :
// on les remplace par nos types au lieu de les élargir.
export interface TooltipProps
	extends Omit<ComponentPropsWithoutRef<"div">, "content" | "children">,
		Controllable {
	content: ReactNode;
	children: ReactElement;
	icon?: ReactNode;
	placement?: Placement;
	tone?: TooltipTone;
	delay?: number;
}

export const Tooltip = forwardRef<HTMLDivElement, TooltipProps>(
	(
		{
			content,
			children,
			icon,
			placement = "top",
			tone = "default",
			delay = 200,
			open: openProp,
			defaultOpen,
			onOpenChange,
			id,
			className,
			style: styleProp,
			...rest
		},
		ref,
	) => {
		const anchorRef = useRef<HTMLElement>(null);
		const tipRef = useRef<HTMLDivElement>(null);
		const autoId = useId("tooltip");
		const tipId = id ?? autoId;

		const { open, show, hide } = useDelayedOpen(delay, 0, {
			open: openProp,
			defaultOpen,
			onOpenChange,
		});

		// `side` est le côté RÉELLEMENT retenu (après flip) : la flèche suit.
		const { style, side } = useAnchor(anchorRef, tipRef, open, { placement, gap: 8 });
		const setTipRef = useMergedRefs(tipRef, ref);

		return (
			<>
				{cloneTrigger(children, {
					ref: anchorRef,
					// Sans ça, le contenu de l'infobulle n'est jamais annoncé au lecteur d'écran.
					"aria-describedby": open ? tipId : undefined,
					onMouseEnter: show,
					onMouseLeave: hide,
					onFocus: show,
					onBlur: hide,
				})}
				{open && (
					<Portal>
						<div
							{...rest}
							ref={setTipRef}
							id={tipId}
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
								<span aria-hidden="true" className="camply-tooltip__icon">
									{icon}
								</span>
							)}
							<span className="camply-tooltip__label">{content}</span>
							<span aria-hidden="true" className="camply-tooltip__arrow" />
						</div>
					</Portal>
				)}
			</>
		);
	},
);

Tooltip.displayName = "Tooltip";
