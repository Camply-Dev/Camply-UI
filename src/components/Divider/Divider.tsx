import { forwardRef, type HTMLAttributes, type ReactNode, type Ref } from "react";
import { cn } from "../../lib/cn";

export interface DividerProps extends HTMLAttributes<HTMLElement> {
	orientation?: "horizontal" | "vertical";
	label?: ReactNode;
	align?: "start" | "center" | "end";
	variant?: "solid" | "dashed";
}

export const Divider = forwardRef<HTMLElement, DividerProps>(
	(
		{ orientation = "horizontal", label, align = "center", variant = "solid", className, ...props },
		ref,
	) => {
		if (orientation === "vertical") {
			return (
				<span
					ref={ref as Ref<HTMLSpanElement>}
					aria-hidden="true"
					className={cn("camply-divider__vertical", `camply-divider__${variant}`, className)}
					{...props}
				/>
			);
		}

		// Le libellé doit rester lisible par un lecteur d'écran : on garde un conteneur
		// neutre (un role="separator" masquerait son contenu) et on cache les traits.
		if (label) {
			return (
				<div
					ref={ref as Ref<HTMLDivElement>}
					className={cn("camply-divider__labelled", `camply-divider__align-${align}`, className)}
					{...props}
				>
					<span
						aria-hidden="true"
						className={cn("camply-divider__line", `camply-divider__${variant}`)}
					/>
					<span className={"camply-divider__label"}>{label}</span>
					<span
						aria-hidden="true"
						className={cn("camply-divider__line", `camply-divider__${variant}`)}
					/>
				</div>
			);
		}

		return (
			<hr
				ref={ref as Ref<HTMLHRElement>}
				className={cn("camply-divider__horizontal", `camply-divider__${variant}`, className)}
				{...props}
			/>
		);
	},
);

Divider.displayName = "Divider";
