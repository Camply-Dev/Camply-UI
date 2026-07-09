import { type HTMLAttributes, forwardRef, type ReactNode } from "react";

export type BadgeVariant = "soft" | "solid" | "outline";
export type BadgeTone = "accent" | "neutral" | "success" | "warning" | "danger" | "info";
export type BadgeSize = "sm" | "md";

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
	variant?: BadgeVariant;
	tone?: BadgeTone;
	size?: BadgeSize;
	dot?: boolean;
	children?: ReactNode;
}

const variantStyles: Record<BadgeVariant, string> = {
	soft: "camply-badge--soft",
	solid: "camply-badge--solid",
	outline: "camply-badge--outline",
};

const toneStyles: Record<BadgeTone, string> = {
	accent: "camply-badge--accent",
	neutral: "camply-badge--neutral",
	success: "camply-badge--success",
	warning: "camply-badge--warning",
	danger: "camply-badge--danger",
	info: "camply-badge--info",
};

const sizeStyles: Record<BadgeSize, string> = {
	sm: "camply-badge--sm",
	md: "camply-badge--md",
};

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
	(
		{ children, variant = "soft", tone = "accent", size = "md", dot = false, className = "", ...props },
		ref,
	) => {
		const classes = [
			"camply-badge",
			variantStyles[variant],
			toneStyles[tone],
			sizeStyles[size],
			className,
		]
			.filter(Boolean)
			.join(" ");

		return (
			<span ref={ref} className={classes} {...props}>
				{dot && <span className="camply-badge__dot" aria-hidden="true" />}
				{children}
			</span>
		);
	},
);

Badge.displayName = "Badge";
