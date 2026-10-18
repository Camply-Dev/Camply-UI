import { type ButtonHTMLAttributes, forwardRef, type ReactNode } from "react";
import { renderAsChild } from "../../lib/asChild";
import { useButtonGroupSize } from "../../lib/buttonGroupSize";
import { cn } from "../../lib/cn";
import type { Size, Tone } from "../../lib/types";

/**
 * FORME du bouton, et rien d'autre : la sémantique (action destructrice
 * comprise) passe par `tone`, le même vocabulaire que Badge.
 */
export type ButtonVariant = "primary" | "secondary" | "ghost" | "soft";

/**
 * SÉMANTIQUE du bouton. Button.css couvre les 6 tons de la palette : l'alias est
 * direct, sans `Extract` — comme `BadgeTone`. Il est nommé plutôt qu'écrit
 * `tone?: Tone` en ligne parce que `Tone` n'est pas exporté par le barrel :
 * sans cet alias, le consommateur ne peut pas nommer le type de sa propre prop.
 */
export type ButtonTone = Tone;

/** Dérivée de l'échelle commune (convention 1), jamais recopiée. */
export type ButtonSize = Size;

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	/** Forme : comment le bouton occupe la surface. Défaut `primary`. */
	variant?: ButtonVariant;
	/** Sémantique : ce que l'action signifie. Défaut `accent`. */
	tone?: ButtonTone;
	/**
	 * Défaut `md`, sauf dans un `ButtonGroup` porteur d'une `size` : celle du
	 * groupe prend alors le relais. La valeur posée ici gagne toujours.
	 */
	size?: ButtonSize;
	fullWidth?: boolean;
	loading?: boolean;
	leftIcon?: ReactNode;
	rightIcon?: ReactNode;
	/**
	 * Rend l'unique enfant (un `<a>`, le `Link` d'un routeur…) avec l'apparence
	 * du bouton, au lieu d'un `<button>` : `<Button asChild><Link to="/">Accueil</Link></Button>`.
	 * La `ref` vise alors cet enfant, `type` ne s'applique pas, et `disabled` /
	 * `loading` deviennent `aria-disabled` avec le clic annulé.
	 */
	asChild?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
	(
		{
			variant = "primary",
			tone = "accent",
			// Pas de valeur par défaut ici : elle rendrait `size` indiscernable
			// d'une taille explicitement demandée, et le groupe ne pourrait plus
			// se glisser entre les deux.
			size,
			fullWidth,
			loading,
			leftIcon,
			rightIcon,
			disabled,
			type = "button",
			asChild,
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
			"camply-button__btn",
			"camply-focus-ring",
			`camply-button__${variant}`,
			`camply-button__tone-${tone}`,
			`camply-button__${resolvedSize}`,
			fullWidth && "camply-button__fullWidth",
			loading && "camply-button__loading",
			className,
		);
		const content = (label: ReactNode) => (
			<>
				{loading && <span className="camply-button__spinner" aria-hidden="true" />}
				{!loading && leftIcon && <span className="camply-button__icon">{leftIcon}</span>}
				{label && <span className="camply-button__label">{label}</span>}
				{!loading && rightIcon && <span className="camply-button__icon">{rightIcon}</span>}
			</>
		);

		if (asChild) {
			return renderAsChild(children, {
				className: classes,
				wrap: content,
				inert: Boolean(disabled || loading),
				props: { ...props, ref },
			});
		}
		return (
			<button
				ref={ref}
				type={type}
				className={classes}
				disabled={disabled}
				{...props}
				// En chargement, le bouton garde le focus (`disabled` le jetterait sur la page,
				// au moment même où l'on vient de l'activer) : il est annoncé occupé et
				// indisponible, et son clic — soumission comprise — est annulé.
				aria-disabled={loading || props["aria-disabled"] || undefined}
				aria-busy={loading || undefined}
				onClick={loading ? (e) => e.preventDefault() : props.onClick}
			>
				{content(children)}
			</button>
		);
	},
);

Button.displayName = "Button";
