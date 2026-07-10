import { type ButtonHTMLAttributes, forwardRef, type ReactNode } from "react";
import { cn } from "../../lib/cn";
export interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	/** accessible label — required, since there's no visible text */
	label: string;
	variant?: "primary" | "secondary" | "ghost" | "soft" | "danger";
	size?: "sm" | "md" | "lg";
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
