import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "../../lib/cn";

/**
 * Avec un label le spinner annonce le chargement (région live) ; sans label il est purement
 * décoratif et doit rester muet — un `aria-label` sur un `<span>` sans rôle serait ignoré.
 */
function loadingA11y(label: string | undefined) {
	return label
		? ({ role: "status", "aria-label": label } as const)
		: ({ "aria-hidden": true } as const);
}

export interface SpinnerProps extends Omit<HTMLAttributes<HTMLSpanElement>, "children"> {
	size?: number;
	thickness?: number;
	/** Nom accessible du chargement. Sans label, le spinner est décoratif (aria-hidden). */
	label?: string;
}

export const Spinner = forwardRef<HTMLSpanElement, SpinnerProps>(
	({ size = 24, thickness = 3, label, className, style, ...props }, ref) => {
		return (
			<span
				ref={ref}
				className={cn("camply-spinner__spinner", className)}
				style={{ width: size, height: size, borderWidth: thickness, ...style }}
				{...loadingA11y(label)}
				{...props}
			/>
		);
	},
);

Spinner.displayName = "Spinner";

export interface DotsProps extends Omit<HTMLAttributes<HTMLSpanElement>, "children"> {
	size?: number;
	/** Nom accessible du chargement. Sans label, les points sont décoratifs (aria-hidden). */
	label?: string;
}

export const Dots = forwardRef<HTMLSpanElement, DotsProps>(
	({ size = 9, label, className, ...props }, ref) => {
		return (
			<span
				ref={ref}
				className={cn("camply-spinner__dots", className)}
				{...loadingA11y(label)}
				{...props}
			>
				<span style={{ width: size, height: size }} />
				<span style={{ width: size, height: size }} />
				<span style={{ width: size, height: size }} />
			</span>
		);
	},
);

Dots.displayName = "Dots";
