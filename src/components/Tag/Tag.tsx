import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "../../lib/cn";
import { useLabels } from "../../lib/i18n";
import { X } from "../../lib/icons";

export interface TagProps extends HTMLAttributes<HTMLSpanElement> {
	onRemove?: () => void;
	/** Surcharge ponctuelle du nom accessible ; sinon `CamplyLabels.remove`. */
	removeLabel?: string;
	children: ReactNode;
}

export const Tag = forwardRef<HTMLSpanElement, TagProps>(
	({ onRemove, removeLabel, className, children, ...props }, ref) => {
		const labels = useLabels();
		return (
			<span ref={ref} className={cn("camply-tag__tag", className)} {...props}>
				<span className="camply-tag__text">{children}</span>
				{onRemove && (
					<button
						type="button"
						className="camply-tag__remove camply-focus-ring"
						aria-label={removeLabel ?? labels.remove}
						onClick={(e) => {
							e.stopPropagation();
							onRemove();
						}}
					>
						<X size={12} strokeWidth={2.5} />
					</button>
				)}
			</span>
		);
	},
);

Tag.displayName = "Tag";
