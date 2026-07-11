import type { CSSProperties, ReactNode } from "react";
import { clamp } from "../../lib/clamp";
import { cn } from "../../lib/cn";
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
	formatValue = (v, m) => `${Math.round((v / m) * 100)}%`,
	size = "md",
	className,
	style,
}: MeterProps) {
	const clamped = clamp(value, min, max);
	const pct = ((clamped - min) / (max - min)) * 100;

	// Decide the tone. With explicit low/high thresholds, colour by how good the
	// value is; otherwise auto-colour by fill level (higher = worse, gauge style).
	let tone: "ok" | "warn" | "danger" = "ok";
	if (low != null && high != null) {
		const inLow = clamped < low;
		const inHigh = clamped >= high;
		if (optimum === "high") {
			tone = inLow ? "danger" : inHigh ? "ok" : "warn";
		} else {
			tone = inHigh ? "danger" : inLow ? "ok" : "warn";
		}
	} else {
		tone = pct >= 85 ? "danger" : pct >= 60 ? "warn" : "ok";
	}

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
