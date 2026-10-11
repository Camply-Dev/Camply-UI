import { type ButtonHTMLAttributes, forwardRef, type ReactNode } from "react";
import { renderAsChild } from "../../lib/asChild";
import { useButtonGroupSize } from "../../lib/buttonGroupSize";
import { cn } from "../../lib/cn";
import type { ButtonSize, ButtonTone, ButtonVariant } from "../Button";

/**
 * Dérivé de `ButtonTone` (règle 1) : les deux boutons partagent une seule table
 * de tons, celle de `tokens.css`, qui vise `.camply-button__tone-*` et
 * `.camply-iconbutton__tone-*` d'un même sélecteur.
 */
export type IconButtonTone = ButtonTone;

/**
 * Attribut que la racine se réserve. Un bouton qui n'affiche qu'une icône n'a
 * pas de texte : `aria-label` EST son nom accessible, et `label` est obligatoire
 * exactement pour le garantir. L'accepter dans le type reviendrait à le prendre
 * puis à l'écraser en silence — ou pire, à laisser un `aria-label=""` vider le
 * nom sans que rien ne le signale (règles 3 et 8). On préfère que `tsc` pointe
 * l'appel, et le canal `aria-labelledby` reste ouvert pour l'autre besoin.
 */
type ReservedIconButtonAttr = "aria-label";

export interface IconButtonProps
	extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, ReservedIconButtonAttr> {
	/**
	 * Nom accessible du bouton, et infobulle par défaut. Obligatoire : sans lui
	 * le bouton n'annonce rien.
	 * Pour nommer le bouton par un élément DÉJÀ présent dans la page, passer
	 * `aria-labelledby` : ARIA lui donne la priorité sur `aria-label`, `label`
	 * redevient alors la seule infobulle (que `title` peut encore remplacer).
	 */
	label: string;
	/** Forme, partagée avec Button. Défaut `secondary`. */
	variant?: ButtonVariant;
	/** Sémantique. Défaut `accent`. */
	tone?: IconButtonTone;
	/**
	 * Défaut `md`, sauf dans un `ButtonGroup` porteur d'une `size` : celle du
	 * groupe prend alors le relais. La valeur posée ici gagne toujours.
	 */
	size?: ButtonSize;
	/**
	 * Rend l'unique enfant (un `<a>`, un `Link`…) avec l'apparence du bouton :
	 * l'icône y est placée, et le nom accessible reste `label`. Voir `Button`.
	 */
	asChild?: boolean;
	children: ReactNode;
}

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
	(
		{
			label,
			variant = "secondary",
			tone = "accent",
			// Voir Button : un défaut ici masquerait l'absence de prop, et le
			// groupe n'aurait plus de place entre la prop et le défaut.
			size,
			type = "button",
			asChild,
			disabled,
			className,
			children,
			...props
		},
		ref,
	) => {
		const groupSize = useButtonGroupSize();
		// Du plus précis au plus large : la prop, puis le groupe, puis le défaut.
		const resolvedSize = size ?? groupSize ?? "md";
		const classes = cn(
			"camply-iconbutton__btn",
			"camply-focus-ring",
			`camply-iconbutton__${variant}`,
			`camply-iconbutton__tone-${tone}`,
			`camply-iconbutton__${resolvedSize}`,
			className,
		);

		if (asChild) {
			// Même ordre que le <button> : `title` remplaçable, `aria-label` imposé.
			return renderAsChild(children, {
				className: classes,
				// L'icône vit dans l'enfant : `<IconButton asChild label="…"><a href="…"><Icône /></a></IconButton>`.
				wrap: (icon) => icon,
				inert: Boolean(disabled),
				props: { title: label, ...props, "aria-label": label, ref },
			});
		}
		return (
			<button
				ref={ref}
				type={type}
				// `title` n'est qu'un DÉFAUT d'infobulle : posé avant le spread, il
				// reste remplaçable par un libellé plus long, sans toucher au nom
				// accessible ci-dessous.
				title={label}
				className={classes}
				disabled={disabled}
				{...props}
				// Invariant (règle 3). Un `aria-labelledby` du consommateur le supplante quand
				// même : ARIA arbitre, pas l'ordre du JSX, et le bouton garde un nom.
				aria-label={label}
			>
				{children}
			</button>
		);
	},
);

IconButton.displayName = "IconButton";
