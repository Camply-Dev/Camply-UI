import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { clamp } from "../../lib/clamp";
import { cn } from "../../lib/cn";
export interface RadialProgressProps extends HTMLAttributes<HTMLDivElement> {
	value: number;
	size?: number;
	thickness?: number;
	tone?: "accent" | "info" | "warn" | "danger";
	showValue?: boolean;
	/** Nom accessible de la progression (le contenu du centre est décoratif pour le rôle progressbar). */
	label?: string;
	children?: ReactNode;
}

const TONE_VAR = {
	accent: "var(--camply-accent)",
	info: "var(--camply-info)",
	warn: "var(--camply-warning)",
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
			<div
				ref={ref}
				className={cn("camply-radialprogress__root", className)}
				style={{ width: size, height: size, ...style }}
				role="progressbar"
				aria-valuenow={Math.round(clamped)}
				aria-valuemin={0}
				aria-valuemax={100}
				aria-valuetext={text}
				aria-label={label ?? ariaLabel}
				{...props}
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
						(showValue && <span className={"camply-radialprogress__value"}>{text}</span>)}
				</div>
			</div>
		);
	},
);

RadialProgress.displayName = "RadialProgress";
