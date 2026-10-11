import { forwardRef, type HTMLAttributes } from "react";
import { clamp } from "../../lib/clamp";
import { cn } from "../../lib/cn";
import { idRefs } from "../../lib/Field";
import { meterTone } from "../../lib/meter";
import { valueToPercent } from "../../lib/sliderGeometry";
import type { Size } from "../../lib/types";
import { useId } from "../../lib/useId";
export interface MeterProps extends Omit<HTMLAttributes<HTMLDivElement>, "children"> {
	value: number;
	min?: number;
	max?: number;
	low?: number;
	high?: number;
	optimum?: "high" | "low";
	/**
	 * `string` : ce libellé rendu devient le nom accessible via `aria-labelledby`, où
	 * du JSX donnerait un nom calculé imprévisible.
	 */
	label?: string;
	showValue?: boolean;
	/**
	 * Formate la valeur affichée et lue (`aria-valuetext`). Reçoit les deux bornes :
	 * le pourcentage par défaut dépend de `min` autant que de `max`.
	 */
	formatValue?: (value: number, min: number, max: number) => string;
	size?: Extract<Size, "sm" | "md">;
}

export const Meter = forwardRef<HTMLDivElement, MeterProps>(
	(
		{
			value,
			min = 0,
			max = 100,
			low,
			high,
			optimum = "high",
			label,
			showValue = true,
			formatValue = (v, lo, hi) => `${Math.round(valueToPercent(v, lo, hi))}%`,
			size = "md",
			className,
			"aria-label": ariaLabel,
			"aria-labelledby": ariaLabelledBy,
			...props
		},
		ref,
	) => {
		const labelId = useId("camply-meter-label");
		const clamped = clamp(value, min, max);
		const pct = valueToPercent(clamped, min, max);
		const tone = meterTone(clamped, pct, { low, high, optimum });
		const text = formatValue(clamped, min, max);
		// Le nom accessible vient du label rendu ; les aria-* fournis par l'appelant le complètent.
		const labelledBy = idRefs(label && labelId, ariaLabelledBy);

		return (
			<div ref={ref} className={cn("camply-meter__root", className)} {...props}>
				{(label || showValue) && (
					<div className="camply-meter__head">
						{label && (
							<span id={labelId} className="camply-meter__label">
								{label}
							</span>
						)}
						{showValue && <span className="camply-meter__value">{text}</span>}
					</div>
				)}
				{/* biome-ignore lint/a11y/useSemanticElements: <meter> natif n'est pas stylable de façon fiable — div+role="meter" est le pattern usuel */}
				<div
					className={cn("camply-meter__track", `camply-meter__${size}`)}
					role="meter"
					aria-valuenow={clamped}
					aria-valuemin={min}
					aria-valuemax={max}
					aria-valuetext={text}
					aria-label={labelledBy ? undefined : ariaLabel}
					aria-labelledby={labelledBy}
				>
					<div
						className={cn("camply-meter__fill", `camply-meter__${tone}`)}
						style={{ width: `${pct}%` }}
					/>
				</div>
			</div>
		);
	},
);

Meter.displayName = "Meter";
