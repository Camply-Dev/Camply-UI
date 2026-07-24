import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { clamp } from "../../lib/clamp";
import { cn } from "../../lib/cn";
import { meterTone } from "../../lib/meter";
import { valueToPercent } from "../../lib/sliderGeometry";
import { useId } from "../../lib/useId";
export interface MeterProps extends Omit<HTMLAttributes<HTMLDivElement>, "children"> {
	value: number;
	min?: number;
	max?: number;
	low?: number;
	high?: number;
	optimum?: "high" | "low";
	label?: ReactNode;
	showValue?: boolean;
	formatValue?: (value: number, max: number) => string;
	size?: "sm" | "md";
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
			formatValue = (v, m) => `${Math.round(valueToPercent(v, min, m))}%`,
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
		const text = formatValue(clamped, max);
		// Le nom accessible vient du label rendu ; les aria-* fournis par l'appelant le complètent.
		const labelledBy = [label ? labelId : undefined, ariaLabelledBy].filter(Boolean).join(" ");

		return (
			<div ref={ref} className={cn("camply-meter__root", className)} {...props}>
				{(label || showValue) && (
					<div className={"camply-meter__head"}>
						{label && (
							<span id={labelId} className={"camply-meter__label"}>
								{label}
							</span>
						)}
						{showValue && <span className={"camply-meter__value"}>{text}</span>}
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
					aria-labelledby={labelledBy || undefined}
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
