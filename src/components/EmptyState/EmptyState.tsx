import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "../../lib/cn";
import type { HeadingLevel } from "../../lib/types";

export type EmptyStateAlign = "center" | "start";

/** `title` maison (ReactNode) : le `title` natif (string) est retiré, comme sur Alert. */
export interface EmptyStateProps extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
	/** Ce qui manque, en une phrase : « Aucun projet pour l'instant ». */
	title: ReactNode;
	/** Pourquoi c'est vide, et comment le remplir. Peut contenir plusieurs paragraphes. */
	description?: ReactNode;
	/** Icône ou illustration au-dessus du titre — décorative, masquée aux lecteurs d'écran. */
	icon?: ReactNode;
	/** Boutons ou liens : ce que l'on peut faire maintenant. */
	actions?: ReactNode;
	/** Niveau du titre dans le plan de la page. Défaut 3. */
	headingLevel?: HeadingLevel;
	/** `center` (défaut) au milieu d'une zone vide, `start` dans un flux de texte. */
	align?: EmptyStateAlign;
}

/**
 * Une zone sans contenu, et la marche à suivre : liste vide, recherche sans
 * résultat, premier lancement. Ce n'est pas une alerte : rien n'est annoncé aux
 * lecteurs d'écran, le titre se lit dans le plan de la page.
 */
export const EmptyState = forwardRef<HTMLDivElement, EmptyStateProps>(
	(
		{ title, description, icon, actions, headingLevel = 3, align = "center", className, ...rest },
		ref,
	) => {
		const Heading = `h${headingLevel}` as const;
		return (
			<div
				ref={ref}
				className={cn("camply-emptystate__root", `camply-emptystate__${align}`, className)}
				{...rest}
			>
				{icon && (
					<span className="camply-emptystate__icon" aria-hidden="true">
						{icon}
					</span>
				)}
				<Heading className="camply-emptystate__title">{title}</Heading>
				{description && <div className="camply-emptystate__desc">{description}</div>}
				{actions && <div className="camply-emptystate__actions">{actions}</div>}
			</div>
		);
	},
);

EmptyState.displayName = "EmptyState";
