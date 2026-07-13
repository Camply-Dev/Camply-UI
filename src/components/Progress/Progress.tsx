import type { CSSProperties } from "react";
import { clamp } from "../../lib/clamp";
import { cn } from "../../lib/cn";
export interface ProgressProps {
	value?: number;
	tone?: "accent" | "info" | "warn" | "danger";
	size?: "sm" | "md";
	label?: string;
	showValue?: boolean;
	className?: string;
	style?: CSSProperties;
}

export function Progress({
	value,
	tone = "accent",
	size = "md",
	label,
	showValue,
	className,
	style,
}: ProgressProps) {
	const indeterminate = value == null;
	const clamped = indeterminate ? 0 : clamp(value, 0, 100);

	return (
		<div className={cn("camply-progress__root", className)} style={style}>
			{(label || showValue) && (
				<div className={"camply-progress__head"}>
					{label && <span className={"camply-progress__label"}>{label}</span>}
					{showValue && !indeterminate && (
						<span className={"camply-progress__value"}>{Math.round(clamped)}%</span>
					)}
				</div>
			)}
			<div
				className={cn("camply-progress__track", `camply-progress__${size}`)}
				role="progressbar"
				aria-valuenow={indeterminate ? undefined : clamped}
				aria-valuemin={0}
				aria-valuemax={100}
			>
				<div
					className={cn(
						"camply-progress__fill",
						`camply-progress__${tone}`,
						indeterminate && "camply-progress__indeterminate",
					)}
					style={indeterminate ? undefined : { width: `${clamped}%` }}
				/>
			</div>
		</div>
	);
}
