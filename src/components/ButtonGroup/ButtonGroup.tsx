import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "../../lib/cn";

export interface ButtonGroupProps extends HTMLAttributes<HTMLDivElement> {
	orientation?: "horizontal" | "vertical";
	/** visually attach children (shared borders) */
	attached?: boolean;
	size?: "sm" | "md" | "lg";
	children: ReactNode;
}

/** Groups Buttons/IconButtons. When `attached`, children share borders and
 *  only the outer corners are rounded. Otherwise it's a spaced cluster. */
export const ButtonGroup = forwardRef<HTMLDivElement, ButtonGroupProps>(
	({ orientation = "horizontal", attached = true, size, className, children, ...props }, ref) => {
		return (
			// biome-ignore lint/a11y/useSemanticElements: div+role="group" est le pattern ARIA voulu (fieldset imposerait sémantique et styles de formulaire)
			<div
				ref={ref}
				role="group"
				className={cn(
					"camply-buttongroup__group",
					`camply-buttongroup__${orientation}`,
					attached ? "camply-buttongroup__attached" : "camply-buttongroup__spaced",
					size && `camply-buttongroup__size-${size}`,
					className,
				)}
				{...props}
			>
				{children}
			</div>
		);
	},
);

ButtonGroup.displayName = "ButtonGroup";
