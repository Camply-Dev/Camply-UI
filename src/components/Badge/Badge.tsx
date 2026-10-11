import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "../../lib/cn";
import type { Size, Tone } from "../../lib/types";

export type BadgeVariant = "soft" | "solid" | "outline";
// Badge.css couvre les 6 tons : alias direct. L'échelle s'arrête à `md` (pas de
// `.camply-badge--lg`) : dérivée de `Size` (règle 1).
export type BadgeTone = Tone;
export type BadgeSize = Extract<Size, "sm" | "md">;

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
	variant?: BadgeVariant;
	tone?: BadgeTone;
	size?: BadgeSize;
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
