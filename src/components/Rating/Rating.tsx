import { forwardRef, type HTMLAttributes, type ReactNode, useState } from "react";
import { cn } from "../../lib/cn";
import { Star } from "../../lib/icons";
import { useControllable } from "../../lib/useControllable";

export interface RatingProps extends Omit<HTMLAttributes<HTMLDivElement>, "onChange"> {
	value?: number;
	defaultValue?: number;
	onChange?: (value: number) => void;
	max?: number;
	size?: number;
	readOnly?: boolean;
	disabled?: boolean;
	/** click the current value again to reset to 0 */
	allowClear?: boolean;
	/** custom icon; defaults to a star */
	icon?: ReactNode;
}

export const Rating = forwardRef<HTMLDivElement, RatingProps>(
	(
		{
			value,
			defaultValue = 0,
			onChange,
			max = 5,
			size = 24,
			readOnly = false,
			disabled = false,
			allowClear = true,
			icon,
			className,
			...props
		},
		ref,
	) => {
		const [val, setVal] = useControllable<number>(value, defaultValue, onChange);
		const [hover, setHover] = useState(0);
		const active = hover || val;
		const interactive = !readOnly && !disabled;

		const pick = (n: number) => {
			if (!interactive) return;
			setVal(allowClear && n === val ? 0 : n);
		};

		// Interactif : rôle slider complet ; sinon : simple image avec libellé.
		const ariaLabel = `Note : ${val} sur ${max}`;
		const rootA11y = interactive
			? {
					role: "slider" as const,
					"aria-label": ariaLabel,
					"aria-valuenow": val,
					"aria-valuemin": 0,
					"aria-valuemax": max,
					onMouseLeave: () => setHover(0),
				}
			: { role: "img" as const, "aria-label": ariaLabel };

		return (
			<div
				ref={ref}
				className={cn(
					"camply-rating__root",
					interactive && "camply-rating__interactive",
					disabled && "camply-rating__disabled",
					className,
				)}
				{...rootA11y}
				{...props}
			>
				{Array.from({ length: max }, (_, i) => i + 1).map((n) => (
					<button
						key={n}
						type="button"
						tabIndex={interactive ? 0 : -1}
						className={cn("camply-rating__star", n <= active && "camply-rating__on")}
						style={{ width: size, height: size }}
						aria-label={`${n} étoile${n > 1 ? "s" : ""}`}
						disabled={!interactive}
						onMouseEnter={() => interactive && setHover(n)}
						onClick={() => pick(n)}
					>
						{icon ?? <Star size={size} />}
					</button>
				))}
			</div>
		);
	},
);

Rating.displayName = "Rating";
