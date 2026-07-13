import type { CSSProperties } from "react";
import { cn } from "../../lib/cn";
export interface SpinnerProps {
	size?: number;
	thickness?: number;
	label?: string;
	className?: string;
	style?: CSSProperties;
}

export function Spinner({
	size = 24,
	thickness = 3,
	label = "Chargement",
	className,
	style,
}: SpinnerProps) {
	return (
		<span
			role="status"
			aria-label={label}
			className={cn("camply-spinner__spinner", className)}
			style={{ width: size, height: size, borderWidth: thickness, ...style }}
		/>
	);
}

export interface DotsProps {
	size?: number;
	label?: string;
	className?: string;
	style?: CSSProperties;
}

export function Dots({ size = 9, label = "Chargement", className, style }: DotsProps) {
	return (
		<span
			role="status"
			aria-label={label}
			className={cn("camply-spinner__dots", className)}
			style={style}
		>
			<span style={{ width: size, height: size }} />
			<span style={{ width: size, height: size }} />
			<span style={{ width: size, height: size }} />
		</span>
	);
}
