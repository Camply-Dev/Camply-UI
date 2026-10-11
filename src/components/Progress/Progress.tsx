import { forwardRef, type HTMLAttributes } from "react";
import { clamp } from "../../lib/clamp";
import { cn } from "../../lib/cn";
import { idRefs } from "../../lib/Field";
import type { Size, Tone } from "../../lib/types";
import { useId } from "../../lib/useId";

export type ProgressTone = Extract<Tone, "accent" | "info" | "warn" | "danger">;

// `children` fermé comme chez Meter : la barre rend son propre en-tête, un
// contenu passé de l'extérieur n'aurait nulle part où aller.
export interface ProgressProps extends Omit<HTMLAttributes<HTMLDivElement>, "children"> {
	/** Avancement, de 0 à `max` ; absent = indéterminé. */
	value?: number;
	/** Valeur d'une barre pleine (défaut 100) : `value={3} max={12}` remplit un quart. */
	max?: number;
	tone?: ProgressTone;
	size?: Extract<Size, "sm" | "md">;
	label?: string;
	showValue?: boolean;
}

export const Progress = forwardRef<HTMLDivElement, ProgressProps>(
	(
		{
			value,
			max = 100,
			tone = "accent",
			size = "md",
			label,
			showValue,
			className,
			"aria-label": ariaLabel,
			"aria-labelledby": ariaLabelledBy,
			...props
		},
		ref,
	) => {
		const labelId = useId("camply-progress-label");
		const indeterminate = value == null;
		const clamped = indeterminate ? 0 : clamp(value, 0, max);
		const percent = max > 0 ? (clamped / max) * 100 : 0;
		const text = `${Math.round(percent)}%`;
		// Le nom accessible vient du label rendu ; les aria-* fournis par l'appelant le complètent.
		const labelledBy = idRefs(label && labelId, ariaLabelledBy);

		return (
			<div ref={ref} className={cn("camply-progress__root", className)} {...props}>
				{(label || showValue) && (
					<div className="camply-progress__head">
						{label && (
							<span id={labelId} className="camply-progress__label">
								{label}
							</span>
						)}
						{showValue && !indeterminate && <span className="camply-progress__value">{text}</span>}
					</div>
				)}
				<div
					className={cn("camply-progress__track", `camply-progress__${size}`)}
					role="progressbar"
					aria-valuenow={indeterminate ? undefined : clamped}
					aria-valuemin={0}
					aria-valuemax={max}
					aria-valuetext={indeterminate ? undefined : text}
					aria-label={labelledBy ? undefined : ariaLabel}
					aria-labelledby={labelledBy}
				>
					<div
						className={cn(
							"camply-progress__fill",
							`camply-progress__${tone}`,
							indeterminate && "camply-progress__indeterminate",
						)}
						style={indeterminate ? undefined : { width: `${percent}%` }}
					/>
				</div>
			</div>
		);
	},
);

Progress.displayName = "Progress";
