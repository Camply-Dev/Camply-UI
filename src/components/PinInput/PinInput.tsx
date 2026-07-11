import { type ClipboardEvent, type CSSProperties, type KeyboardEvent, useRef } from "react";
import { clamp } from "../../lib/clamp";
import { cn } from "../../lib/cn";
import { useControllable } from "../../lib/useControllable";
export interface PinInputProps {
	length?: number;
	value?: string;
	defaultValue?: string;
	onChange?: (value: string) => void;
	/** fired when all cells are filled */
	onComplete?: (value: string) => void;
	type?: "number" | "alphanumeric";
	/** hide characters (password-style) */
	mask?: boolean;
	disabled?: boolean;
	autoFocus?: boolean;
	size?: "sm" | "md" | "lg";
	className?: string;
	style?: CSSProperties;
}

/** One box per character. Handles paste, backspace navigation, arrow keys and
 *  auto-advance. Emits onComplete when full. */
export function PinInput({
	length = 6,
	value,
	defaultValue = "",
	onChange,
	onComplete,
	type = "number",
	mask = false,
	disabled = false,
	autoFocus = false,
	size = "md",
	className,
	style,
}: PinInputProps) {
	const [val, setVal] = useControllable<string>(value, defaultValue, onChange);
	const refs = useRef<(HTMLInputElement | null)[]>([]);
	const chars = Array.from({ length }, (_, i) => val[i] ?? "");

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
		if (e.key === "Backspace") {
			e.preventDefault();
			if (chars[i]) {
				setCharAt(i, "");
			} else if (i > 0) {
				focusCell(i - 1);
				setCharAt(i - 1, "");
			}
		} else if (e.key === "ArrowLeft") {
			e.preventDefault();
			focusCell(i - 1);
		} else if (e.key === "ArrowRight") {
			e.preventDefault();
			focusCell(i + 1);
		}
	};

	const onPaste = (e: ClipboardEvent) => {
		e.preventDefault();
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

	return (
		<div
			className={cn(
				"camply-pininput__root",
				`camply-pininput__${size}`,
				disabled && "camply-pininput__disabled",
				className,
			)}
			style={style}
			onPaste={onPaste}
		>
			{chars.map((c, i) => (
				<input
					// biome-ignore lint/suspicious/noArrayIndexKey: cellules à position fixe — l'index EST l'identité
					key={i}
					ref={(el) => {
						refs.current[i] = el;
					}}
					className={cn("camply-pininput__cell", c && "camply-pininput__filled")}
					type={mask && c ? "password" : "text"}
					inputMode={type === "number" ? "numeric" : "text"}
					maxLength={1}
					value={c}
					disabled={disabled}
					// biome-ignore lint/a11y/noAutofocus: opt-in explicite via la prop autoFocus (cas OTP)
					autoFocus={autoFocus && i === 0}
					aria-label={`Chiffre ${i + 1}`}
					onChange={(e) => onCellChange(i, e.target.value)}
					onKeyDown={(e) => onKeyDown(i, e)}
					onFocus={(e) => e.target.select()}
				/>
			))}
		</div>
	);
}
