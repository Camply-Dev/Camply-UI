import { type CSSProperties, forwardRef, type KeyboardEvent } from "react";
import { clamp } from "../../lib/clamp";
import { cn } from "../../lib/cn";
import { Minus, Plus } from "../../lib/icons";
import { useControllable } from "../../lib/useControllable";
import { useId } from "../../lib/useId";

export interface NumberInputProps {
	value?: number;
	defaultValue?: number;
	onChange?: (value: number) => void;
	min?: number;
	max?: number;
	step?: number;
	/** decimal places to display */
	precision?: number;
	label?: string;
	hint?: string;
	error?: string;
	prefix?: string;
	suffix?: string;
	placeholder?: string;
	disabled?: boolean;
	size?: "sm" | "md" | "lg";
	className?: string;
	style?: CSSProperties;
}

/** Numeric field with +/- steppers, clamping, keyboard (↑/↓, PageUp/Down) and
 *  optional precision, prefix/suffix. Fully controllable. */
export const NumberInput = forwardRef<HTMLInputElement, NumberInputProps>(function NumberInput(
	{
		value,
		defaultValue = 0,
		onChange,
		min = -Infinity,
		max = Infinity,
		step = 1,
		precision,
		label,
		hint,
		error,
		prefix,
		suffix,
		placeholder,
		disabled = false,
		size = "md",
		className,
		style,
	},
	ref,
) {
	const [val, setVal] = useControllable<number>(value, defaultValue, onChange);
	const autoId = useId("number");
	const describedBy = error || hint ? `${autoId}-desc` : undefined;

	const round = (n: number) => (precision != null ? parseFloat(n.toFixed(precision)) : n);

	const bump = (dir: 1 | -1, big = false) => {
		const amount = step * (big ? 10 : 1) * dir;
		setVal(round(clamp((val || 0) + amount, min, max)));
	};

	const onKeyDown = (e: KeyboardEvent) => {
		if (disabled) return;
		if (e.key === "ArrowUp") {
			e.preventDefault();
			bump(1);
		} else if (e.key === "ArrowDown") {
			e.preventDefault();
			bump(-1);
		} else if (e.key === "PageUp") {
			e.preventDefault();
			bump(1, true);
		} else if (e.key === "PageDown") {
			e.preventDefault();
			bump(-1, true);
		}
	};

	const display = precision != null && !Number.isNaN(val) ? val.toFixed(precision) : `${val}`;

	return (
		<div className={cn("camply-numberinput__field", className)} style={style}>
			{label && (
				<label htmlFor={autoId} className={"camply-numberinput__label"}>
					{label}
				</label>
			)}
			<div
				className={cn(
					"camply-numberinput__wrap",
					`camply-numberinput__${size}`,
					error && "camply-numberinput__hasError",
					disabled && "camply-numberinput__disabled",
				)}
			>
				<button
					type="button"
					className={"camply-numberinput__step"}
					aria-label="Diminuer"
					tabIndex={-1}
					disabled={disabled || val <= min}
					onClick={() => bump(-1)}
				>
					<Minus size={15} />
				</button>
				<div className={"camply-numberinput__inputWrap"}>
					{prefix && <span className={"camply-numberinput__affix"}>{prefix}</span>}
					<input
						ref={ref}
						id={autoId}
						inputMode="decimal"
						className={"camply-numberinput__input"}
						value={display}
						placeholder={placeholder}
						disabled={disabled}
						aria-describedby={describedBy}
						onChange={(e) => {
							const raw = e.target.value.replace(",", ".");
							if (raw === "" || raw === "-") {
								setVal(0);
								return;
							}
							const parsed = parseFloat(raw);
							if (!Number.isNaN(parsed)) setVal(parsed);
						}}
						onBlur={() => setVal(round(clamp(val || 0, min, max)))}
						onKeyDown={onKeyDown}
					/>
					{suffix && <span className={"camply-numberinput__affix"}>{suffix}</span>}
				</div>
				<button
					type="button"
					className={"camply-numberinput__step"}
					aria-label="Augmenter"
					tabIndex={-1}
					disabled={disabled || val >= max}
					onClick={() => bump(1)}
				>
					<Plus size={15} />
				</button>
			</div>
			{(error || hint) && (
				<span
					id={describedBy}
					className={cn("camply-numberinput__desc", error && "camply-numberinput__descError")}
				>
					{error || hint}
				</span>
			)}
		</div>
	);
});
