import { type ButtonHTMLAttributes, forwardRef, type ReactNode } from "react";

export type ButtonVariant = "primary" | "secondary" | "ghost" | "soft" | "danger";
export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	variant?: ButtonVariant;
	size?: ButtonSize;
	loading?: boolean;
	leftIcon?: ReactNode;
	rightIcon?: ReactNode;
	fullWidth?: boolean;
}

const variantStyles: Record<ButtonVariant, string> = {
	primary: "camply-btn--primary",
	secondary: "camply-btn--secondary",
	ghost: "camply-btn--ghost",
	soft: "camply-btn--soft",
	danger: "camply-btn--danger",
};

const sizeStyles: Record<ButtonSize, string> = {
	sm: "camply-btn--sm",
	md: "camply-btn--md",
	lg: "camply-btn--lg",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
	(
		{
			children,
			variant = "primary",
			size = "md",
			loading = false,
			leftIcon,
			rightIcon,
			fullWidth = false,
			disabled,
			className = "",
			type = "button",
			...props
		},
		ref,
	) => {
		const classes = [
			"camply-btn",
			variantStyles[variant],
			sizeStyles[size],
			fullWidth && "camply-btn--full",
			loading && "camply-btn--loading",
			className,
		]
			.filter(Boolean)
			.join(" ");

		return (
			<button
				ref={ref}
				type={type}
				className={classes}
				disabled={disabled || loading}
				aria-busy={loading || undefined}
				{...props}
			>
				{loading && <span className="camply-btn__spinner" aria-hidden="true" />}
				{!loading && leftIcon && <span className="camply-btn__icon">{leftIcon}</span>}
				{children && <span className="camply-btn__label">{children}</span>}
				{rightIcon && <span className="camply-btn__icon">{rightIcon}</span>}
			</button>
		);
	},
);

Button.displayName = "Button";
