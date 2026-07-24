import { forwardRef, type HTMLAttributes, type ReactNode, useState } from "react";
import { cn } from "../../lib/cn";
import { ChevronDown } from "../../lib/icons";
import { useId } from "../../lib/useId";

export interface SpoilerProps extends HTMLAttributes<HTMLDivElement> {
	children: ReactNode;
	maxHeight?: number;
	showLabel?: string;
	hideLabel?: string;
	defaultOpen?: boolean;
}

export const Spoiler = forwardRef<HTMLDivElement, SpoilerProps>(
	(
		{
			children,
			maxHeight = 120,
			showLabel = "Voir plus",
			hideLabel = "Voir moins",
			defaultOpen = false,
			className,
			...props
		},
		ref,
	) => {
		const [open, setOpen] = useState(defaultOpen);
		const contentId = useId("camply-spoiler");

		return (
			<div ref={ref} className={cn("camply-spoiler__root", className)} {...props}>
				<div
					id={contentId}
					className={"camply-spoiler__content"}
					style={{ maxHeight: open ? "none" : maxHeight }}
				>
					{children}
					{!open && <div className={"camply-spoiler__fade"} aria-hidden="true" />}
				</div>
				<button
					type="button"
					className={"camply-spoiler__toggle camply-focus-ring"}
					aria-expanded={open}
					aria-controls={contentId}
					onClick={() => setOpen((o) => !o)}
				>
					{open ? hideLabel : showLabel}
					<ChevronDown
						size={15}
						className={cn("camply-spoiler__icon", open && "camply-spoiler__iconOpen")}
					/>
				</button>
			</div>
		);
	},
);

Spoiler.displayName = "Spoiler";
