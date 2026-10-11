import { forwardRef, type HTMLAttributes, type Ref } from "react";
import { cn } from "../../lib/cn";

/** Pas d'espacement, calqué sur l'échelle `--camply-space-*`. */
export type StackGap = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 8;
export type StackDirection = "vertical" | "horizontal";
export type StackAlign = "start" | "center" | "end" | "stretch" | "baseline";
export type StackJustify = "start" | "center" | "end" | "between" | "around";
/** Balises que la pile peut rendre : un empilement est souvent une section ou une liste. */
export type StackElement =
	| "div"
	| "section"
	| "article"
	| "aside"
	| "header"
	| "footer"
	| "nav"
	| "main"
	| "ul"
	| "ol"
	| "form"
	| "fieldset";

export interface StackProps extends HTMLAttributes<HTMLElement> {
	/** Balise rendue (défaut `div`) : la mise en page ne doit pas coûter la sémantique. */
	as?: StackElement;
	direction?: StackDirection;
	gap?: StackGap;
	/** alignement sur l'axe transversal */
	align?: StackAlign;
	/** répartition sur l'axe principal */
	justify?: StackJustify;
	wrap?: boolean;
}

/** Empilement flex : la primitive de mise en page de base (colonne par défaut). */
export const Stack = forwardRef<HTMLElement, StackProps>(
	(
		{
			as = "div",
			direction = "vertical",
			gap = 4,
			align,
			justify,
			wrap,
			className,
			children,
			...props
		},
		ref,
	) => {
		// Typé comme un `div` : TS croise sinon les refs des douze balises possibles.
		// Toutes sont des HTMLElement, et seule celle de `as` est réellement rendue.
		const Element = as as "div";
		return (
			<Element
				ref={ref as Ref<HTMLDivElement>}
				className={cn(
					"camply-stack__root",
					`camply-stack__${direction}`,
					`camply-stack__gap-${gap}`,
					align && `camply-stack__align-${align}`,
					justify && `camply-stack__justify-${justify}`,
					wrap && "camply-stack__wrap",
					className,
				)}
				{...props}
			>
				{children}
			</Element>
		);
	},
);

Stack.displayName = "Stack";
