import {
	type ComponentPropsWithoutRef,
	forwardRef,
	type ReactElement,
	type ReactNode,
	useRef,
} from "react";
import { cloneTrigger } from "../../lib/cloneTrigger";
import { cn } from "../../lib/cn";
import { idRefs } from "../../lib/Field";
import { useMergedRefs } from "../../lib/mergeRefs";
import { Portal } from "../../lib/Portal";
import type { Tone } from "../../lib/types";
import { type Placement, useAnchor } from "../../lib/useAnchor";
import type { Controllable } from "../../lib/useControllable";
import { useDelayedOpen } from "../../lib/useDelayedOpen";
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
		const anchorRef = useRef<HTMLElement>(null);
		const tipRef = useRef<HTMLDivElement>(null);
		const autoId = useId("tooltip");
		const tipId = id ?? autoId;

		const { open, show, hide } = useDelayedOpen(delay, closeDelay, {
			open: openProp,
			defaultOpen,
			onOpenChange,
		});

		// `side` est le côté RÉELLEMENT retenu (après flip) : la flèche suit.
		const { style, side } = useAnchor(anchorRef, tipRef, open, { placement, gap: 8 });
		const setTipRef = useMergedRefs(tipRef, ref);

		// `cloneTrigger` ne compose que les `onX` : posé seul, notre id effacerait la
		// description du consommateur (règles 4 et 8). `aria-describedby` étant une
		// liste d'ids, on concatène.
		const theirDescribedBy = (children.props as { "aria-describedby"?: string } | undefined)?.[
			"aria-describedby"
		];

		return (
			<>
				{cloneTrigger(children, {
					ref: anchorRef,
					// Sans ça, le contenu de l'infobulle n'est jamais annoncé au lecteur d'écran.
					"aria-describedby": idRefs(theirDescribedBy, open && tipId),
					// `cloneTrigger` compose ces handlers après ceux du consommateur et
					// respecte son `preventDefault()` : c'est ce veto qui permet de figer
					// une infobulle ou de couper le survol sur mobile (règle 4). React
					// marque `defaultPrevented` même sur focus/blur, non annulables côté DOM.
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
							// Le pointeur doit pouvoir entrer dans l'infobulle sans la faire fuir (règle 4).
							onMouseEnter={(e) => {
								onMouseEnter?.(e);
								if (e.defaultPrevented) return;
								show();
							}}
							onMouseLeave={(e) => {
								onMouseLeave?.(e);
								if (e.defaultPrevented) return;
								hide();
							}}
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
