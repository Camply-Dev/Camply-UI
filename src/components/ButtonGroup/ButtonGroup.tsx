import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
// Le contexte de taille est partagé avec Button et IconButton : il vit donc
// dans src/lib/ (convention 6) et non dans ce fichier.
import { ButtonGroupSizeContext, useButtonGroupSize } from "../../lib/buttonGroupSize";
import { cn } from "../../lib/cn";
import type { Size } from "../../lib/types";

/**
 * Attribut que la racine se réserve (règle 3) : `role="group"` est le contrat du
 * composant. `role="toolbar"` n'est pas offert : l'APG lui attache un tabindex
 * tournant et une navigation aux flèches que ce composant n'implémente pas.
 */
type ReservedButtonGroupAttr = "role";

export interface ButtonGroupProps
	extends Omit<HTMLAttributes<HTMLDivElement>, ReservedButtonGroupAttr> {
	orientation?: "horizontal" | "vertical";
	attached?: boolean;
	/**
	 * Taille appliquée à tous les `Button` / `IconButton` descendants. Une
	 * `size` posée sur un enfant l'emporte : le plus précis gagne.
	 * Absente, le groupe est transparent — il laisse passer celle d'un groupe
	 * englobant, et à défaut chaque enfant garde la sienne (`md`), ce qui
	 * permet un groupe hétérogène tout en le rendant explicite.
	 */
	size?: Size;
	children: ReactNode;
}

export const ButtonGroup = forwardRef<HTMLDivElement, ButtonGroupProps>(
	({ orientation = "horizontal", attached = true, size, className, children, ...rest }, ref) => {
		// Un groupe sans `size` ne doit pas EFFACER celle d'un groupe englobant :
		// sans prop, il se contente de relayer. Même cascade que dans les boutons,
		// du plus précis au plus large — et la classe d'écart suit la taille
		// réellement rendue par les enfants, pas seulement la prop locale.
		const inheritedSize = useButtonGroupSize();
		const resolvedSize = size ?? inheritedSize;

		return (
			<ButtonGroupSizeContext.Provider value={resolvedSize}>
				{/* biome-ignore lint/a11y/useSemanticElements: div+role="group" est le pattern ARIA voulu (fieldset imposerait sémantique et styles de formulaire) */}
				<div
					ref={ref}
					className={cn(
						"camply-buttongroup__group",
						`camply-buttongroup__${orientation}`,
						attached ? "camply-buttongroup__attached" : "camply-buttongroup__spaced",
						resolvedSize && `camply-buttongroup__size-${resolvedSize}`,
						className,
					)}
					{...rest}
					// Invariant du composant (règle 3).
					role="group"
				>
					{children}
				</div>
			</ButtonGroupSizeContext.Provider>
		);
	},
);

ButtonGroup.displayName = "ButtonGroup";
