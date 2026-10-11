import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { clamp } from "../../lib/clamp";
import { cn } from "../../lib/cn";
import type { Tone } from "../../lib/types";
export type RadialProgressTone = Extract<Tone, "accent" | "info" | "warn" | "danger">;

/**
 * Attributs qui portent la valeur annoncée. La racine est elle-même la barre de
 * progression : ils sont posés après le spread et retirés du type (règle 3), car
 * une valeur annoncée différente de l'arc dessiné serait un mensonge (règle 8).
 *
 * `aria-valuetext` reste ouvert : quand `children` remplace le centre (« 3/4 »),
 * le « 75 % » par défaut ne décrit plus l'affichage, et c'est le seul canal de
 * l'appelant. Il est pris avant le spread et sert de surcharge, comme `aria-label`.
 */
type ReservedRadialProgressAttr = "role" | "aria-valuenow" | "aria-valuemin" | "aria-valuemax";

export interface RadialProgressProps
	extends Omit<HTMLAttributes<HTMLDivElement>, ReservedRadialProgressAttr> {
	value: number;
	size?: number;
	thickness?: number;
	tone?: RadialProgressTone;
	showValue?: boolean;
	/** Nom accessible de la progression (le contenu du centre est décoratif pour le rôle progressbar). */
	label?: string;
	children?: ReactNode;
}

const TONE_VAR = {
	accent: "var(--camply-accent)",
	info: "var(--camply-info)",
	warn: "var(--camply-warn)",
	danger: "var(--camply-danger)",
} as const;

export const RadialProgress = forwardRef<HTMLDivElement, RadialProgressProps>(
	(
		{
			value,
			size = 96,
			thickness = 8,
			tone = "accent",
			showValue = true,
			label,
			children,
			className,
			style,
			"aria-label": ariaLabel,
			"aria-valuetext": ariaValueText,
			...props
		},
		ref,
	) => {
		const clamped = clamp(value, 0, 100);
		const r = (size - thickness) / 2;
		const circumference = 2 * Math.PI * r;
		const offset = circumference * (1 - clamped / 100);
		const text = `${Math.round(clamped)}%`;

		return (
			// Règle 3 : le spread d'abord, ce qui porte la valeur annoncée après.
			<div
				{...props}
				ref={ref}
				className={cn("camply-radialprogress__root", className)}
				style={{ width: size, height: size, ...style }}
				role="progressbar"
				aria-valuenow={Math.round(clamped)}
				aria-valuemin={0}
				aria-valuemax={100}
				aria-valuetext={ariaValueText ?? text}
				aria-label={label ?? ariaLabel}
			>
				<svg width={size} height={size} aria-hidden="true" className="camply-radialprogress__svg">
					<circle
						cx={size / 2}
						cy={size / 2}
						r={r}
						fill="none"
						stroke="var(--camply-border-strong)"
						strokeWidth={thickness}
					/>
					<circle
						cx={size / 2}
						cy={size / 2}
						r={r}
						fill="none"
						stroke={TONE_VAR[tone]}
						strokeWidth={thickness}
						strokeLinecap="round"
						strokeDasharray={circumference}
						strokeDashoffset={offset}
						className="camply-radialprogress__arc"
					/>
				</svg>
				<div className="camply-radialprogress__center">
					{children ?? (showValue && <span className="camply-radialprogress__value">{text}</span>)}
				</div>
			</div>
		);
	},
);

RadialProgress.displayName = "RadialProgress";
