import { createElement, forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "../../lib/cn";
import type { HeadingLevel } from "../../lib/types";

/** Balises que `Card` sait rendre : la sémantique du bloc (un article, une section, un élément de liste…). */
export type CardElement = "div" | "article" | "section" | "aside" | "li";

export interface CardProps extends HTMLAttributes<HTMLElement> {
	/** Balise rendue (défaut `div`) : `article` pour un contenu autonome, `li` dans une liste… */
	as?: CardElement;
	interactive?: boolean;
	padding?: "none" | "sm" | "md" | "lg";
	children: ReactNode;
}

export const Card = forwardRef<HTMLElement, CardProps>(
	({ as = "div", interactive, padding = "md", className, children, ...props }, ref) =>
		// `createElement` : une balise variable en JSX exigerait de typer la ref de
		// chacune ; ce sont toutes des `HTMLElement` sans attribut propre.
		createElement(
			as,
			{
				ref,
				className: cn(
					"camply-card__card",
					`camply-card__pad-${padding}`,
					interactive && "camply-card__interactive",
					className,
				),
				...props,
			},
			children,
		),
);

Card.displayName = "Card";

export const CardHeader = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
	({ className, children, ...props }, ref) => {
		return (
			<div ref={ref} className={cn("camply-card__header", className)} {...props}>
				{children}
			</div>
		);
	},
);

CardHeader.displayName = "CardHeader";

export interface CardTitleProps extends HTMLAttributes<HTMLHeadingElement> {
	/**
	 * Niveau du titre dans le plan de la page. Défaut 3 (`<h3>`) ; 1 quand la carte
	 * porte le titre de la page (une page de connexion). Le style ne change pas.
	 */
	headingLevel?: 1 | HeadingLevel;
}

export const CardTitle = forwardRef<HTMLHeadingElement, CardTitleProps>(
	({ headingLevel = 3, className, children, ...props }, ref) => {
		const Heading = `h${headingLevel}` as const;
		return (
			<Heading ref={ref} className={cn("camply-card__title", className)} {...props}>
				{children}
			</Heading>
		);
	},
);

CardTitle.displayName = "CardTitle";

export const CardDescription = forwardRef<
	HTMLParagraphElement,
	HTMLAttributes<HTMLParagraphElement>
>(({ className, children, ...props }, ref) => {
	return (
		<p ref={ref} className={cn("camply-card__desc", className)} {...props}>
			{children}
		</p>
	);
});

CardDescription.displayName = "CardDescription";

export const CardFooter = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
	({ className, children, ...props }, ref) => {
		return (
			<div ref={ref} className={cn("camply-card__footer", className)} {...props}>
				{children}
			</div>
		);
	},
);

CardFooter.displayName = "CardFooter";
