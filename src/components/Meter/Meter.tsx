import type { CSSProperties, ReactNode } from "react";
import { clamp } from "../../lib/clamp";
import { cn } from "../../lib/cn";
import { meterTone } from "../../lib/meter";
import { valueToPercent } from "../../lib/sliderGeometry";
export interface MeterProps {
	value: number;
	min?: number;
	max?: number;
	/** thresholds: value below `low` is danger, below `high` is warn, else ok.
	 *  Set `optimum: "low"` if smaller is better (e.g. disk usage). */
	low?: number;
	high?: number;
	optimum?: "high" | "low";
	label?: ReactNode;
	showValue?: boolean;
	formatValue?: (value: number, max: number) => string;
	size?: "sm" | "md";
	className?: string;
	style?: CSSProperties;
}

/** A gauge for a measurement within a known range, coloured by how good the
 *  current value is (unlike Progress, which is neutral task completion). */
export function Meter({
	value,
	min = 0,
	max = 100,
	low,
	high,
	optimum = "high",
	label,
	showValue = true,
	// Le pourcentage se lit sur l'étendue [min, max], pas sur max seul — sinon
	// avec min=50/max=100/value=75 le libellé affiche 75 % alors que la barre
	// se remplit à 50 %.
	formatValue = (v, m) => `${Math.round(valueToPercent(v, min, m))}%`,
	size = "md",
	className,
	style,
}: MeterProps) {
	const clamped = clamp(value, min, max);
	const pct = valueToPercent(clamped, min, max);
	const tone = meterTone(clamped, pct, { low, high, optimum });

	return (
		<div className={cn("camply-meter__root", className)} style={style}>
			{(label || showValue) && (
				<div className={"camply-meter__head"}>
					{label && <span className={"camply-meter__label"}>{label}</span>}
					{showValue && <span className={"camply-meter__value"}>{formatValue(clamped, max)}</span>}
				</div>
			)}
			{/* biome-ignore lint/a11y/useSemanticElements: <meter> natif n'est pas stylable de façon fiable — div+role="meter" est le pattern usuel */}
			<div
				className={cn("camply-meter__track", `camply-meter__${size}`)}
				role="meter"
				aria-valuenow={clamped}
				aria-valuemin={min}
				aria-valuemax={max}
			>
				<div
					className={cn("camply-meter__fill", `camply-meter__${tone}`)}
					style={{ width: `${pct}%` }}
				/>
			</div>
		</div>
	);
}
