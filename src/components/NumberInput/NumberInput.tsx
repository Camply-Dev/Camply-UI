import {
	type CSSProperties,
	forwardRef,
	type InputHTMLAttributes,
	type KeyboardEvent,
	useState,
} from "react";
import { clamp } from "../../lib/clamp";
import { cn } from "../../lib/cn";
import { Field } from "../../lib/Field";
import { useLabels } from "../../lib/i18n";
import { Minus, Plus } from "../../lib/icons";
import { useControllable } from "../../lib/useControllable";

/** Attributs natifs de l'input, moins ceux dont NumberInput redéfinit le sens. */
type NumberInputBase = Omit<
	InputHTMLAttributes<HTMLInputElement>,
	| "value"
	| "defaultValue"
	| "onChange"
	| "size"
	| "min"
	| "max"
	| "step"
	| "prefix"
	| "type"
	| "children"
>;

export interface NumberInputProps extends NumberInputBase {
	value?: number;
	defaultValue?: number;
	onChange?: (value: number) => void;
	min?: number;
	max?: number;
	step?: number;
	precision?: number;
	label?: string;
	hint?: string;
	error?: string;
	prefix?: string;
	suffix?: string;
	size?: "sm" | "md" | "lg";
	className?: string;
	style?: CSSProperties;
}

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
		disabled = false,
		readOnly = false,
		required,
		size = "md",
		className,
		style,
		id,
		onBlur,
		onKeyDown,
		...rest
	},
	ref,
) {
	const labels = useLabels();
	const [val, setVal] = useControllable<number>(value, defaultValue, onChange);
	const [draft, setDraft] = useState<string | null>(null);
	const locked = disabled || readOnly;

	const round = (n: number) => (precision != null ? parseFloat(n.toFixed(precision)) : n);

	const commit = (n: number) => {
		setVal(round(clamp(n, min, max)));
		setDraft(null);
	};

	const bump = (dir: 1 | -1, big = false) => {
		if (locked) return;
		const amount = step * (big ? 10 : 1) * dir;
		commit((val || 0) + amount);
	};

	const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
		onKeyDown?.(e);
		if (locked || e.defaultPrevented) return;
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
		<Field
			label={label}
			hint={hint}
			error={error}
			required={required}
			id={id}
			idPrefix="number"
			className={className}
			style={style}
		>
			{({ id: inputId, describedBy, invalid, required: isRequired }) => (
				<div
					className={cn(
						"camply-field-shell",
						"camply-field-shell--flush",
						`camply-field-shell--${size}`,
						"camply-numberinput__wrap",
						error && "camply-field-shell--error",
						disabled && "camply-field-shell--disabled",
					)}
				>
					<button
						type="button"
						className={"camply-numberinput__step"}
						aria-label={labels.decrease}
						tabIndex={-1}
						disabled={locked || val <= min}
						onClick={() => bump(-1)}
					>
						<Minus size={15} />
					</button>
					<div className={"camply-numberinput__inputWrap"}>
						{prefix && <span className={"camply-numberinput__affix"}>{prefix}</span>}
						<input
							ref={ref}
							id={inputId}
							inputMode="decimal"
							className={"camply-field-control camply-numberinput__input"}
							value={draft ?? display}
							disabled={disabled}
							readOnly={readOnly}
							required={isRequired}
							aria-invalid={invalid}
							aria-describedby={describedBy}
							onChange={(e) => {
								const raw = e.target.value;
								setDraft(raw);
								const norm = raw.replace(",", ".");
								if (norm === "" || norm === "-") return;
								const parsed = parseFloat(norm);
								if (!Number.isNaN(parsed)) setVal(parsed);
							}}
							onBlur={(e) => {
								commit(val || 0);
								onBlur?.(e);
							}}
							onKeyDown={handleKeyDown}
							{...rest}
						/>
						{suffix && <span className={"camply-numberinput__affix"}>{suffix}</span>}
					</div>
					<button
						type="button"
						className={"camply-numberinput__step"}
						aria-label={labels.increase}
						tabIndex={-1}
						disabled={locked || val >= max}
						onClick={() => bump(1)}
					>
						<Plus size={15} />
					</button>
				</div>
			)}
		</Field>
	);
});
