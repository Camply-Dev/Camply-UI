import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "../../lib/cn";

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
	/** subtle lift + accent border on hover */
	interactive?: boolean;
	padding?: "none" | "sm" | "md" | "lg";
	children: ReactNode;
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
	({ interactive, padding = "md", className, children, ...props }, ref) => {
		return (
			<div
				ref={ref}
				className={cn(
					"camply-card__card",
					`camply-card__pad-${padding}`,
					interactive && "camply-card__interactive",
					className,
				)}
				{...props}
			>
				{children}
			</div>
		);
	},
);

Card.displayName = "Card";

export const CardHeader = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
	({ className, children, ...props }, ref) => {
		return (
			<div ref={ref} className={cn("camply-card__header", className)} {...props}>
				{children}
			</div>
		);
	},
);

CardHeader.displayName = "CardHeader";

export const CardTitle = forwardRef<HTMLHeadingElement, HTMLAttributes<HTMLHeadingElement>>(
	({ className, children, ...props }, ref) => {
		return (
			<h3 ref={ref} className={cn("camply-card__title", className)} {...props}>
				{children}
			</h3>
		);
	},
);

CardTitle.displayName = "CardTitle";

export const CardDescription = forwardRef<
	HTMLParagraphElement,
	HTMLAttributes<HTMLParagraphElement>
>(({ className, children, ...props }, ref) => {
	return (
		<p ref={ref} className={cn("camply-card__desc", className)} {...props}>
			{children}
		</p>
	);
});

CardDescription.displayName = "CardDescription";

export const CardFooter = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
	({ className, children, ...props }, ref) => {
		return (
			<div ref={ref} className={cn("camply-card__footer", className)} {...props}>
				{children}
			</div>
		);
	},
);

CardFooter.displayName = "CardFooter";
