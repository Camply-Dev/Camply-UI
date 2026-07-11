import { forwardRef, type HTMLAttributes, type ReactNode, useState } from "react";
import { cn } from "../../lib/cn";
import { ChevronDown } from "../../lib/icons";

export interface SpoilerProps extends HTMLAttributes<HTMLDivElement> {
	children: ReactNode;
	/** collapsed height in px */
	maxHeight?: number;
	showLabel?: string;
	hideLabel?: string;
	defaultOpen?: boolean;
}

/** Truncates long content to a max height with a fade, and a "show more /
 *  less" toggle. */
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

		return (
			<div ref={ref} className={cn("camply-spoiler__root", className)} {...props}>
				<div className={"camply-spoiler__content"} style={{ maxHeight: open ? "none" : maxHeight }}>
					{children}
					{!open && <div className={"camply-spoiler__fade"} aria-hidden="true" />}
				</div>
				<button
					type="button"
					className={"camply-spoiler__toggle"}
					aria-expanded={open}
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
