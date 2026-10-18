import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "../../lib/cn";

/**
 * Avec un nom le spinner annonce le chargement (région live `status`) ; sans nom il est
 * purement décoratif et doit rester muet. Le `label` est le TEXTE de la région, masqué à
 * l'écran (`LoadingText`) : une région live annonce son contenu, et plusieurs lecteurs
 * d'écran taisent un simple `aria-label`.
 *
 * `named` couvre le nom posé par le consommateur via `...rest` (`aria-label` ou
 * `aria-labelledby`) : `aria-hidden` le rendrait inaudible.
 */
function loadingA11y(label: string | undefined, named: boolean) {
	return label || named ? ({ role: "status" } as const) : ({ "aria-hidden": true } as const);
}

/** Le texte annoncé, invisible à l'écran. */
const LoadingText = ({ label }: { label?: string }) =>
	label ? <span className="camply-visually-hidden">{label}</span> : null;

const isNamed = (props: { "aria-label"?: string; "aria-labelledby"?: string }) =>
	Boolean(props["aria-label"] ?? props["aria-labelledby"]);

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
				{...loadingA11y(label, isNamed(props))}
				{...props}
			>
				<LoadingText label={label} />
			</span>
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
				{...loadingA11y(label, isNamed(props))}
				{...props}
			>
				<span style={{ width: size, height: size }} />
				<span style={{ width: size, height: size }} />
				<span style={{ width: size, height: size }} />
				<LoadingText label={label} />
			</span>
		);
	},
);

Dots.displayName = "Dots";
