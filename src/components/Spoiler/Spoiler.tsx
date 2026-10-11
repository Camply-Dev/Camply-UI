import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "../../lib/cn";
import { useLabels } from "../../lib/i18n";
import { ChevronDown } from "../../lib/icons";
import { type Controllable, useControllable } from "../../lib/useControllable";
import { useId } from "../../lib/useId";

export interface SpoilerProps extends HTMLAttributes<HTMLDivElement>, Controllable {
	children: ReactNode;
	maxHeight?: number;
	/** Surcharge ponctuelle du libellé replié ; sinon `CamplyLabels.showMore`. */
	showLabel?: string;
	/** Surcharge ponctuelle du libellé déplié ; sinon `CamplyLabels.showLess`. */
	hideLabel?: string;
}

export const Spoiler = forwardRef<HTMLDivElement, SpoilerProps>(
	(
		{
			children,
			maxHeight = 120,
			showLabel,
			hideLabel,
			open: openProp,
			defaultOpen = false,
			onOpenChange,
			className,
			...props
		},
		ref,
	) => {
		const [open, setOpen] = useControllable<boolean>(openProp, defaultOpen, onOpenChange);
		const contentId = useId("camply-spoiler");
		const labels = useLabels();

		return (
			<div ref={ref} className={cn("camply-spoiler__root", className)} {...props}>
				<div
					id={contentId}
					className="camply-spoiler__content"
					style={{ maxHeight: open ? "none" : maxHeight }}
				>
					{children}
					{!open && <div className="camply-spoiler__fade" aria-hidden="true" />}
				</div>
				<button
					type="button"
					className="camply-spoiler__toggle camply-focus-ring"
					aria-expanded={open}
					aria-controls={contentId}
					onClick={() => setOpen(!open)}
				>
					{open ? (hideLabel ?? labels.showLess) : (showLabel ?? labels.showMore)}
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
