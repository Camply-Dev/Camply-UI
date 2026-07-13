import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "../../lib/cn";

export interface DividerProps extends HTMLAttributes<HTMLElement> {
	orientation?: "horizontal" | "vertical";
	label?: ReactNode;
	align?: "start" | "center" | "end";
	variant?: "solid" | "dashed";
}

export function Divider({
	orientation = "horizontal",
	label,
	align = "center",
	variant = "solid",
	className,
	...props
}: DividerProps) {
	if (orientation === "vertical") {
		return (
			<span
				aria-hidden="true"
				className={cn("camply-divider__vertical", `camply-divider__${variant}`, className)}
				{...props}
			/>
		);
	}

	if (label) {
		return (
			<div
				className={cn("camply-divider__labelled", `camply-divider__align-${align}`, className)}
				{...props}
			>
				<span className={cn("camply-divider__line", `camply-divider__${variant}`)} />
				<span className={"camply-divider__label"}>{label}</span>
				<span className={cn("camply-divider__line", `camply-divider__${variant}`)} />
			</div>
		);
	}

	return (
		<hr
			className={cn("camply-divider__horizontal", `camply-divider__${variant}`, className)}
			{...props}
		/>
	);
}
