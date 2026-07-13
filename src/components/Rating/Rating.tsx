import {
	forwardRef,
	type HTMLAttributes,
	type KeyboardEvent,
	type ReactNode,
	useState,
} from "react";
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
	allowClear?: boolean;
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

		const setRating = (n: number) => setVal(Math.max(allowClear ? 0 : 1, Math.min(n, max)));
		const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
			if (!interactive) return;
			if (e.key === "ArrowRight" || e.key === "ArrowUp") {
				e.preventDefault();
				setRating(val + 1);
			} else if (e.key === "ArrowLeft" || e.key === "ArrowDown") {
				e.preventDefault();
				setRating(val - 1);
			} else if (e.key === "Home") {
				e.preventDefault();
				setRating(allowClear ? 0 : 1);
			} else if (e.key === "End") {
				e.preventDefault();
				setRating(max);
			}
		};

		const ariaLabel = `Note : ${val} sur ${max}`;
		const rootA11y = interactive
			? {
					role: "slider" as const,
					tabIndex: 0,
					"aria-label": ariaLabel,
					"aria-valuenow": val,
					"aria-valuemin": 0,
					"aria-valuemax": max,
					onMouseLeave: () => setHover(0),
					onKeyDown,
				}
			: { role: "img" as const, "aria-label": ariaLabel };

		return (
			<div
				ref={ref}
				className={cn(
					"camply-rating__root",
					"camply-focus-ring",
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
						tabIndex={-1}
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
