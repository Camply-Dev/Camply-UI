import type { ButtonHTMLAttributes, ReactNode } from "react";

export type ButtonVariant = "primary" | "secondary" | "ghost";
export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	children: ReactNode;
	variant?: ButtonVariant;
	size?: ButtonSize;
}

const variantStyles: Record<ButtonVariant, string> = {
	primary: "camply-btn--primary",
	secondary: "camply-btn--secondary",
	ghost: "camply-btn--ghost",
};

const sizeStyles: Record<ButtonSize, string> = {
	sm: "camply-btn--sm",
	md: "camply-btn--md",
	lg: "camply-btn--lg",
};

export function Button({
	children,
	variant = "primary",
	size = "md",
	className = "",
	type = "button",
	...props
}: ButtonProps) {
	const classes = ["camply-btn", variantStyles[variant], sizeStyles[size], className]
		.filter(Boolean)
		.join(" ");

	return (
		<button type={type} className={classes} {...props}>
			{children}
		</button>
	);
}
