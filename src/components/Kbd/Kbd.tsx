import { forwardRef, type HTMLAttributes, type ReactNode, type Ref } from "react";
import { cn } from "../../lib/cn";

export interface KbdProps extends HTMLAttributes<HTMLElement> {
	keys?: string[];
	size?: "sm" | "md";
	children?: ReactNode;
}

export const Kbd = forwardRef<HTMLElement, KbdProps>(
	({ keys, size = "md", children, className, ...props }, ref) => {
		if (keys) {
			return (
				<span
					ref={ref as Ref<HTMLSpanElement>}
					className={cn("camply-kbd__group", className)}
					{...props}
				>
					{keys.map((k) => (
						<kbd key={k} className={cn("camply-kbd__kbd", `camply-kbd__${size}`)}>
							{k}
						</kbd>
					))}
				</span>
			);
		}
		return (
			<kbd ref={ref} className={cn("camply-kbd__kbd", `camply-kbd__${size}`, className)} {...props}>
				{children}
			</kbd>
		);
	},
);

Kbd.displayName = "Kbd";
