import type { CSSProperties, ReactNode } from "react";
import { cn } from "../../lib/cn";
export interface RadialProgressProps {
	/** 0–100 */
	value: number;
	size?: number;
	thickness?: number;
	tone?: "accent" | "info" | "warn" | "danger";
	/** show the numeric percentage in the middle */
	showValue?: boolean;
	/** custom center content (overrides showValue) */
	children?: ReactNode;
	className?: string;
	style?: CSSProperties;
}

const TONE_VAR = {
	accent: "var(--camply-accent)",
	info: "var(--camply-info)",
	warn: "var(--camply-warning)",
	danger: "var(--camply-danger)",
} as const;

export function RadialProgress({
	value,
	size = 96,
	thickness = 8,
	tone = "accent",
	showValue = true,
	children,
	className,
	style,
}: RadialProgressProps) {
	const clamped = Math.max(0, Math.min(100, value));
	const r = (size - thickness) / 2;
	const circumference = 2 * Math.PI * r;
	const offset = circumference * (1 - clamped / 100);

	return (
		<div
			className={cn("camply-radialprogress__root", className)}
			style={{ width: size, height: size, ...style }}
			role="progressbar"
			aria-valuenow={Math.round(clamped)}
			aria-valuemin={0}
			aria-valuemax={100}
		>
			<svg width={size} height={size} aria-hidden="true" className={"camply-radialprogress__svg"}>
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
					className={"camply-radialprogress__arc"}
				/>
			</svg>
			<div className={"camply-radialprogress__center"}>
				{children ??
					(showValue && (
						<span className={"camply-radialprogress__value"}>{Math.round(clamped)}%</span>
					))}
			</div>
		</div>
	);
}
