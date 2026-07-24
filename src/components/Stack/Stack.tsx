import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "../../lib/cn";

/** Pas d'espacement, calqué sur l'échelle `--camply-space-*`. */
export type StackGap = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 8;
export type StackDirection = "vertical" | "horizontal";
export type StackAlign = "start" | "center" | "end" | "stretch" | "baseline";
export type StackJustify = "start" | "center" | "end" | "between" | "around";

export interface StackProps extends HTMLAttributes<HTMLDivElement> {
	direction?: StackDirection;
	gap?: StackGap;
	/** alignement sur l'axe transversal */
	align?: StackAlign;
	/** répartition sur l'axe principal */
	justify?: StackJustify;
	wrap?: boolean;
}

/** Empilement flex : la primitive de mise en page de base (colonne par défaut). */
export const Stack = forwardRef<HTMLDivElement, StackProps>(
	(
		{ direction = "vertical", gap = 4, align, justify, wrap, className, children, ...props },
		ref,
	) => (
		<div
			ref={ref}
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
		</div>
	),
);

Stack.displayName = "Stack";
