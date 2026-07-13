import { type ButtonHTMLAttributes, forwardRef, type ReactNode } from "react";
import { cn } from "../../lib/cn";
import type { ButtonSize, ButtonVariant } from "../Button";
export interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	label: string;
	variant?: ButtonVariant;
	size?: ButtonSize;
	children: ReactNode;
}

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
	(
		{ label, variant = "secondary", size = "md", type = "button", className, children, ...props },
		ref,
	) => {
		return (
			<button
				ref={ref}
				type={type}
				aria-label={label}
				title={label}
				className={cn(
					"camply-iconbutton__btn",
					"camply-focus-ring",
					`camply-iconbutton__${variant}`,
					`camply-iconbutton__${size}`,
					className,
				)}
				{...props}
			>
				{children}
			</button>
		);
	},
);

IconButton.displayName = "IconButton";
