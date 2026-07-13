import { type CSSProperties, forwardRef, type KeyboardEvent, useState } from "react";
import { clamp } from "../../lib/clamp";
import { cn } from "../../lib/cn";
import { Field } from "../../lib/Field";
import { Minus, Plus } from "../../lib/icons";
import { useControllable } from "../../lib/useControllable";

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
	// Brouillon de saisie : tant que le champ est focalisé, on affiche le texte brut
	// (pour pouvoir taper « 1. », « - », « 1,5 »…). `val` suit dès qu'une valeur est
	// analysable ; on resynchronise l'affichage à la validation/sortie.
	const [draft, setDraft] = useState<string | null>(null);

	const round = (n: number) => (precision != null ? parseFloat(n.toFixed(precision)) : n);

	// Borne + arrondit, puis efface le brouillon pour réafficher la valeur canonique.
	const commit = (n: number) => {
		setVal(round(clamp(n, min, max)));
		setDraft(null);
	};

	const bump = (dir: 1 | -1, big = false) => {
		const amount = step * (big ? 10 : 1) * dir;
		commit((val || 0) + amount);
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
		<Field
			label={label}
			hint={hint}
			error={error}
			idPrefix="number"
			className={className}
			style={style}
		>
			{({ id: inputId, describedBy, invalid }) => (
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
							id={inputId}
							inputMode="decimal"
							className={"camply-field-control camply-numberinput__input"}
							value={draft ?? display}
							placeholder={placeholder}
							disabled={disabled}
							aria-invalid={invalid}
							aria-describedby={describedBy}
							onChange={(e) => {
								const raw = e.target.value;
								setDraft(raw);
								const norm = raw.replace(",", ".");
								// Saisie partielle ("" ou "-") : on garde `val`, on validera à la sortie.
								if (norm === "" || norm === "-") return;
								const parsed = parseFloat(norm);
								if (!Number.isNaN(parsed)) setVal(parsed);
							}}
							onBlur={() => commit(val || 0)}
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
			)}
		</Field>
	);
});
