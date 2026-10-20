import {
	type CSSProperties,
	forwardRef,
	type HTMLAttributes,
	type KeyboardEvent,
	useRef,
	useState,
} from "react";
import { clamp } from "../../lib/clamp";
import { compose } from "../../lib/cloneTrigger";
import { cn } from "../../lib/cn";
import { Field, idRefs } from "../../lib/Field";
import { FormReset, HiddenField } from "../../lib/HiddenField";
import type { Size } from "../../lib/types";
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
	size?: Size;
	className?: string;
	style?: CSSProperties;
}

/** Découpe une valeur compacte en `n` cellules, en complétant par du vide. */
const pad = (value: string, n: number) => Array.from({ length: n }, (_, i) => value[i] ?? "");

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
		"aria-labelledby": ariaLabelledBy,
		...rest
	},
	ref,
) {
	const [val, setVal] = useControllable<string>(value, defaultValue, onChange);
	const refs = useRef<(HTMLInputElement | null)[]>([]);
	// Tronqué : une `value` plus longue que `length` ne doit pas faire diverger la
	// comparaison de resynchro ci-dessous.
	const capped = val.slice(0, length);
	// Les cellules sont positionnelles : vider celle du milieu doit laisser un trou
	// sur place, alors que `val` — le contrat public — reste une chaîne compacte.
	const [cells, setCells] = useState<string[]>(() => pad(capped, length));
	// Resynchro seulement quand la valeur vient d'ailleurs (parent, `length`) : tout
	// commit d'ici passe par `commit`, qui garde `cells.join("") === val` — les trous
	// survivent donc à cette comparaison.
	if (cells.length !== length || cells.join("") !== capped) setCells(pad(capped, length));
	const locked = disabled || readOnly;

	const pattern = type === "number" ? /[0-9]/ : /[a-zA-Z0-9]/;

	/**
	 * Seule porte de sortie : les cellules sont la vérité, `val` n'en est que la
	 * projection compacte. Passer par ici garantit que les deux ne divergent pas.
	 */
	const commit = (next: string[]) => {
		setCells(next);
		const compact = next.join("");
		setVal(compact);
		if (compact.length === length) onComplete?.(compact);
	};

	const setCharAt = (index: number, char: string) => {
		const next = cells.slice();
		next[index] = char;
		commit(next);
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
		// Un caractère tapé au clavier est posé ici, pas par `onChange` : retaper le
		// chiffre déjà présent ne change pas la valeur, React n'émet alors aucun
		// changement, et le focus restait sur place (`maxLength` bloquant la suite).
		// Les claviers virtuels (`key` « Unidentified ») passent toujours par `onChange`.
		if (e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey && !readOnly) {
			e.preventDefault();
			if (!pattern.test(e.key)) return;
			if (cells[i] !== e.key) setCharAt(i, e.key);
			focusCell(i + 1);
			return;
		}
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
			if (cells[i]) {
				setCharAt(i, "");
			} else if (i > 0) {
				focusCell(i - 1);
				setCharAt(i - 1, "");
			}
		}
	};

	const handlePaste = compose(onPaste, (e) => {
		e.preventDefault();
		if (locked) return;
		const text = e.clipboardData
			.getData("text")
			.split("")
			.filter((c) => pattern.test(c))
			.join("")
			.slice(0, length);
		if (text) {
			// Un collage réécrit la disposition : les trous d'un effacement précédent ne
			// doivent pas survivre, même si le collage redonne la même chaîne compacte.
			commit(pad(text, length));
			focusCell(text.length);
		}
	});

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
					{...rest}
					// Posé APRÈS le spread mais composé, comme sur les autres champs : le
					// libellé du Field et un `aria-labelledby` du consommateur se cumulent.
					aria-labelledby={idRefs(labelId, ariaLabelledBy)}
					className={cn(
						"camply-pininput__root",
						`camply-pininput__${size}`,
						disabled && "camply-pininput__disabled",
					)}
					onPaste={handlePaste}
				>
					<HiddenField name={name} value={val} disabled={disabled} />
					<FormReset onReset={value === undefined ? () => setVal(defaultValue) : undefined} />
					{cells.map((c, i) => (
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
