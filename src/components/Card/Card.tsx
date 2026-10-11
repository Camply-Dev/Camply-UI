import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "../../lib/cn";
import type { HeadingLevel } from "../../lib/types";

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
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

export interface CardTitleProps extends HTMLAttributes<HTMLHeadingElement> {
	/** Niveau du titre dans le plan de la page. Défaut 3 (`<h3>`) ; le style ne change pas. */
	headingLevel?: HeadingLevel;
}

export const CardTitle = forwardRef<HTMLHeadingElement, CardTitleProps>(
	({ headingLevel = 3, className, children, ...props }, ref) => {
		const Heading = `h${headingLevel}` as const;
		return (
			<Heading ref={ref} className={cn("camply-card__title", className)} {...props}>
				{children}
			</Heading>
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
