import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "../../lib/cn";

export interface KbdProps extends HTMLAttributes<HTMLElement> {
	/** render a sequence of keys, e.g. ["⌘", "K"] */
	keys?: string[];
	size?: "sm" | "md";
	children?: ReactNode;
}

export function Kbd({ keys, size = "md", children, className, ...props }: KbdProps) {
	if (keys) {
		return (
			<span className={cn("camply-kbd__group", className)} {...props}>
				{keys.map((k) => (
					<kbd key={k} className={cn("camply-kbd__kbd", `camply-kbd__${size}`)}>
						{k}
					</kbd>
				))}
			</span>
		);
	}
	return (
		<kbd className={cn("camply-kbd__kbd", `camply-kbd__${size}`, className)} {...props}>
			{children}
		</kbd>
	);
}
