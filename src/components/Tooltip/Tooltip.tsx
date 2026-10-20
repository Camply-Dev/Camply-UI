import {
	type ComponentPropsWithoutRef,
	forwardRef,
	type ReactElement,
	type ReactNode,
} from "react";
import { cloneTrigger, markTriggerSlot } from "../../lib/cloneTrigger";
import { cn } from "../../lib/cn";
import { idRefs } from "../../lib/Field";
import { useMergedRefs } from "../../lib/mergeRefs";
import { Portal } from "../../lib/Portal";
import type { Tone } from "../../lib/types";
import type { Placement } from "../../lib/useAnchor";
import type { Controllable } from "../../lib/useControllable";
import { useHoverDisclosure } from "../../lib/useHoverDisclosure";
import { useId } from "../../lib/useId";

/**
 * `default`, `plain` et `dark` sont les habillages neutres de l'infobulle (d'où
 * l'absence de `neutral`) ; les autres dérivent de `Tone` (règle 1).
 */
export type TooltipTone =
	| Extract<Tone, "accent" | "success" | "warn" | "danger" | "info">
	| "default"
	| "plain"
	| "dark";

/**
 * `content` et `children` sont retypés (HTMLAttributes les destine à RDFa / du
 * ReactNode). `role` et `dangerouslySetInnerHTML` sont l'invariant de la bulle,
 * le `role="tooltip"` que désigne l'`aria-describedby` du déclencheur (règle 3).
 */
export interface TooltipProps
	extends Omit<
			ComponentPropsWithoutRef<"div">,
			"content" | "children" | "role" | "dangerouslySetInnerHTML"
		>,
		Controllable {
	content: ReactNode;
	children: ReactElement;
	icon?: ReactNode;
	placement?: Placement;
	tone?: TooltipTone;
	/** Délai avant ouverture au survol (ms). */
	delay?: number;
	/**
	 * Délai avant fermeture (ms). Il laisse le temps d'amener le pointeur sur
	 * l'infobulle : sans lui elle disparaît dès qu'on la vise, ce qui interdit de
	 * lire un contenu long (WCAG 1.4.13, critère « Hoverable »).
	 */
	closeDelay?: number;
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
			closeDelay = 150,
			open: openProp,
			defaultOpen,
			onOpenChange,
			id,
			className,
			style: styleProp,
			onMouseEnter,
			onMouseLeave,
			...rest
		},
		ref,
	) => {
		const autoId = useId("tooltip");
		const tipId = id ?? autoId;

		// `side` est le côté RÉELLEMENT retenu (après flip) : la flèche suit.
		const { open, floatRef, style, side, triggerProps, surfaceProps } = useHoverDisclosure({
			placement,
			openDelay: delay,
			closeDelay,
			open: openProp,
			defaultOpen,
			onOpenChange,
			onMouseEnter,
			onMouseLeave,
		});
		const setTipRef = useMergedRefs(floatRef, ref);

		// `cloneTrigger` ne compose que les `onX` : posé seul, notre id effacerait la
		// description du consommateur (règles 4 et 8). `aria-describedby` étant une
		// liste d'ids, on concatène.
		const theirDescribedBy = (children.props as { "aria-describedby"?: string } | undefined)?.[
			"aria-describedby"
		];

		return (
			<>
				{cloneTrigger(children, {
					...triggerProps,
					// Sans ça, le contenu de l'infobulle n'est jamais annoncé au lecteur d'écran.
					"aria-describedby": idRefs(theirDescribedBy, open && tipId),
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
							{...surfaceProps}
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
markTriggerSlot(Tooltip, "children");
