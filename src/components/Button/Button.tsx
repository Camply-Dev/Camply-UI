import { type ButtonHTMLAttributes, forwardRef, type ReactNode } from "react";
import { cn } from "../../lib/cn";

export type ButtonVariant = "primary" | "secondary" | "ghost" | "soft" | "danger";
export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	variant?: ButtonVariant;
	size?: ButtonSize;
	fullWidth?: boolean;
	loading?: boolean;
	leftIcon?: ReactNode;
	rightIcon?: ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
	(
		{
			variant = "primary",
			size = "md",
			fullWidth,
			loading,
			leftIcon,
			rightIcon,
			disabled,
			type = "button",
			className,
			children,
			...props
		},
		ref,
	) => {
		return (
			<button
				ref={ref}
				type={type}
				className={cn(
					"camply-button__btn",
					"camply-focus-ring",
					`camply-button__${variant}`,
					`camply-button__${size}`,
					fullWidth && "camply-button__fullWidth",
					loading && "camply-button__loading",
					className,
				)}
				disabled={disabled || loading}
				{...props}
			>
				{loading && <span className="camply-button__spinner" aria-hidden="true" />}
				{!loading && leftIcon && <span className="camply-button__icon">{leftIcon}</span>}
				{children && <span className="camply-button__label">{children}</span>}
				{!loading && rightIcon && <span className="camply-button__icon">{rightIcon}</span>}
			</button>
		);
	},
);

Button.displayName = "Button";
