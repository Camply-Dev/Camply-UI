import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "../../lib/cn";

export type BadgeVariant = "soft" | "solid" | "outline";
export type BadgeTone = "accent" | "neutral" | "success" | "warning" | "danger" | "info";
export type BadgeSize = "sm" | "md";

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
	variant?: BadgeVariant;
	tone?: BadgeTone;
	size?: BadgeSize;
	/** icône affichée avant le contenu (n'importe quel ReactNode) */
	icon?: ReactNode;
	children?: ReactNode;
}

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
	(
		{ children, variant = "soft", tone = "accent", size = "md", icon, className, ...props },
		ref,
	) => {
		return (
			<span
				ref={ref}
				className={cn(
					"camply-badge",
					`camply-badge--${variant}`,
					`camply-badge--${tone}`,
					`camply-badge--${size}`,
					className,
				)}
				{...props}
			>
				{icon && (
					<span className="camply-badge__icon" aria-hidden="true">
						{icon}
					</span>
				)}
				{children}
			</span>
		);
	},
);

Badge.displayName = "Badge";
