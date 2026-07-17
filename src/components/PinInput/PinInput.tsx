import {
	type ClipboardEvent,
	type CSSProperties,
	forwardRef,
	type HTMLAttributes,
	type KeyboardEvent,
	useRef,
} from "react";
import { clamp } from "../../lib/clamp";
import { cn } from "../../lib/cn";
import { Field } from "../../lib/Field";
import { useControllable } from "../../lib/useControllable";

export interface PinInputProps
	extends Omit<HTMLAttributes<HTMLFieldSetElement>, "onChange" | "defaultValue" | "children"> {
	length?: number;
	value?: string;
	defaultValue?: string;
	onChange?: (value: string) => void;
	onComplete?: (value: string) => void;
	type?: "number" | "alphanumeric";
	mask?: boolean;
	disabled?: boolean;
	readOnly?: boolean;
	/** Soumis dans un formulaire via un <input type="hidden"> portant le code complet. */
	name?: string;
	/** Chaque cellule devient obligatoire : le code doit être complet pour soumettre. */
	required?: boolean;
	label?: string;
	hint?: string;
	error?: string;
	/** Nom accessible d'une cellule (défaut : « <label> <position> »). */
	cellLabel?: (index: number) => string;
	size?: "sm" | "md" | "lg";
	className?: string;
	style?: CSSProperties;
}

export const PinInput = forwardRef<HTMLFieldSetElement, PinInputProps>(function PinInput(
	{
		length = 6,
		value,
		defaultValue = "",
		onChange,
		onComplete,
		type = "number",
		mask = false,
		disabled = false,
		readOnly = false,
		autoFocus = false,
		name,
		required,
		label,
		hint,
		error,
		cellLabel,
		size = "md",
		className,
		style,
		id,
		onPaste,
		...rest
	},
	ref,
) {
	const [val, setVal] = useControllable<string>(value, defaultValue, onChange);
	const refs = useRef<(HTMLInputElement | null)[]>([]);
	const chars = Array.from({ length }, (_, i) => val[i] ?? "");
	const locked = disabled || readOnly;

	const pattern = type === "number" ? /[0-9]/ : /[a-zA-Z0-9]/;

	const commit = (next: string) => {
		const trimmed = next.slice(0, length);
		setVal(trimmed);
		if (trimmed.length === length) onComplete?.(trimmed);
	};

	const setCharAt = (index: number, char: string) => {
		const arr = chars.slice();
		arr[index] = char;
		commit(arr.join(""));
	};

	const focusCell = (i: number) => {
		const el = refs.current[clamp(i, 0, length - 1)];
		el?.focus();
		el?.select();
	};

	const onCellChange = (i: number, raw: string) => {
		const char = raw.slice(-1);
		if (char && !pattern.test(char)) return;
		setCharAt(i, char);
		if (char) focusCell(i + 1);
	};

	const onKeyDown = (i: number, e: KeyboardEvent) => {
		if (e.key === "ArrowLeft") {
			e.preventDefault();
			focusCell(i - 1);
			return;
		}
		if (e.key === "ArrowRight") {
			e.preventDefault();
			focusCell(i + 1);
			return;
		}
		if (e.key === "Backspace") {
			e.preventDefault();
			if (locked) return;
			if (chars[i]) {
				setCharAt(i, "");
			} else if (i > 0) {
				focusCell(i - 1);
				setCharAt(i - 1, "");
			}
		}
	};

	const handlePaste = (e: ClipboardEvent<HTMLFieldSetElement>) => {
		onPaste?.(e);
		if (e.defaultPrevented) return;
		e.preventDefault();
		if (locked) return;
		const text = e.clipboardData
			.getData("text")
			.split("")
			.filter((c) => pattern.test(c))
			.join("")
			.slice(0, length);
		if (text) {
			commit(text);
			focusCell(text.length);
		}
	};

	const nameOf = (i: number) => cellLabel?.(i) ?? (label ? `${label} ${i + 1}` : `${i + 1}`);

	return (
		<Field
			label={label}
			hint={hint}
			error={error}
			required={required}
			id={id}
			idPrefix="pin"
			className={cn("camply-pininput__field", className)}
			style={style}
		>
			{({ id: firstId, labelId, describedBy, invalid, required: isRequired }) => (
				// <fieldset> : groupe natif (role=group) nommé par le label du Field.
				<fieldset
					ref={ref}
					aria-labelledby={labelId}
					className={cn(
						"camply-pininput__root",
						`camply-pininput__${size}`,
						disabled && "camply-pininput__disabled",
					)}
					onPaste={handlePaste}
					{...rest}
				>
					{name && <input type="hidden" name={name} value={val} disabled={disabled} />}
					{chars.map((c, i) => (
						<input
							// biome-ignore lint/suspicious/noArrayIndexKey: cellules à position fixe — l'index EST l'identité
							key={i}
							ref={(el) => {
								refs.current[i] = el;
							}}
							id={i === 0 ? firstId : undefined}
							className={cn("camply-pin-cell", c && "camply-pin-cell--filled")}
							type={mask && c ? "password" : "text"}
							inputMode={type === "number" ? "numeric" : "text"}
							maxLength={1}
							value={c}
							disabled={disabled}
							readOnly={readOnly}
							required={isRequired}
							// biome-ignore lint/a11y/noAutofocus: opt-in explicite via la prop autoFocus (cas OTP)
							autoFocus={autoFocus && i === 0}
							aria-label={nameOf(i)}
							aria-invalid={invalid}
							aria-describedby={describedBy}
							onChange={(e) => onCellChange(i, e.target.value)}
							onKeyDown={(e) => onKeyDown(i, e)}
							onFocus={(e) => e.target.select()}
						/>
					))}
				</fieldset>
			)}
		</Field>
	);
});
