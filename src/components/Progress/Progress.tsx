import { forwardRef, type HTMLAttributes } from "react";
import { clamp } from "../../lib/clamp";
import { cn } from "../../lib/cn";
import { useId } from "../../lib/useId";
export interface ProgressProps extends HTMLAttributes<HTMLDivElement> {
	value?: number;
	tone?: "accent" | "info" | "warn" | "danger";
	size?: "sm" | "md";
	label?: string;
	showValue?: boolean;
}

export const Progress = forwardRef<HTMLDivElement, ProgressProps>(
	(
		{
			value,
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
		const clamped = indeterminate ? 0 : clamp(value, 0, 100);
		const text = `${Math.round(clamped)}%`;
		// Le nom accessible vient du label rendu ; les aria-* fournis par l'appelant le complètent.
		const labelledBy = [label ? labelId : undefined, ariaLabelledBy].filter(Boolean).join(" ");

		return (
			<div ref={ref} className={cn("camply-progress__root", className)} {...props}>
				{(label || showValue) && (
					<div className={"camply-progress__head"}>
						{label && (
							<span id={labelId} className={"camply-progress__label"}>
								{label}
							</span>
						)}
						{showValue && !indeterminate && (
							<span className={"camply-progress__value"}>{text}</span>
						)}
					</div>
				)}
				<div
					className={cn("camply-progress__track", `camply-progress__${size}`)}
					role="progressbar"
					aria-valuenow={indeterminate ? undefined : clamped}
					aria-valuemin={0}
					aria-valuemax={100}
					aria-valuetext={indeterminate ? undefined : text}
					aria-label={labelledBy ? undefined : ariaLabel}
					aria-labelledby={labelledBy || undefined}
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
	},
);

Progress.displayName = "Progress";
