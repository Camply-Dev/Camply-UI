import { forwardRef, type HTMLAttributes, type ReactNode, type Ref } from "react";
import { cn } from "../../lib/cn";
import type { Size } from "../../lib/types";

export interface KbdProps extends HTMLAttributes<HTMLElement> {
	keys?: string[];
	size?: Extract<Size, "sm" | "md">;
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
					{keys.map((k, i) => (
						// biome-ignore lint/suspicious/noArrayIndexKey: la touche seule ne fait pas une clé (une séquence peut la répéter : ⌘ K K) et la liste est figée, jamais réordonnée
						<kbd key={`${i}-${k}`} className={cn("camply-kbd__kbd", `camply-kbd__${size}`)}>
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
