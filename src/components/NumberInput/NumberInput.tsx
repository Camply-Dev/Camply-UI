import { type CSSProperties, forwardRef, type InputHTMLAttributes, useState } from "react";
import { clamp } from "../../lib/clamp";
import { compose } from "../../lib/cloneTrigger";
import { cn } from "../../lib/cn";
import { Field, fieldShell, idRefs } from "../../lib/Field";
import { useLabels } from "../../lib/i18n";
import { Minus, Plus } from "../../lib/icons";
import type { Size } from "../../lib/types";
import { useControllable } from "../../lib/useControllable";

/** Nombre de décimales écrites (`0.25` → 2) : un pas décimal arrondit à son échelle. */
const decimalsOf = (n: number) => (Number.isFinite(n) ? (`${n}`.split(".")[1]?.length ?? 0) : 0);

/**
 * Le nombre saisi, ou `null` s'il n'en est pas un (encore) : virgule ou point, espaces
 * de milliers ignorés (« 1 000,5 »). `Number` et non `parseFloat`, qui lirait « 12abc »
 * comme 12.
 */
function parseTyped(raw: string): number | null {
	const norm = raw.replace(/[\s\u00a0\u202f]/g, "").replace(",", ".");
	if (norm === "" || norm === "-" || norm === ".") return null;
	const n = Number(norm);
	return Number.isNaN(n) ? null : n;
}

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

interface NumberInputCommon extends NumberInputBase {
	min?: number;
	max?: number;
	step?: number;
	precision?: number;
	label?: string;
	hint?: string;
	error?: string;
	prefix?: string;
	suffix?: string;
	size?: Size;
	className?: string;
	style?: CSSProperties;
}

/** Toujours un nombre : vidé, le champ reprend sa dernière valeur quand on le quitte. */
interface NumberInputFilled {
	allowEmpty?: false;
	value?: number;
	/** Défaut 0. */
	defaultValue?: number;
	onChange?: (value: number) => void;
}

/** Peut rester vide (une valeur facultative) : vide vaut `null`. */
interface NumberInputEmptiable {
	allowEmpty: true;
	value?: number | null;
	/** Défaut `null` : le champ commence vide. */
	defaultValue?: number | null;
	onChange?: (value: number | null) => void;
}

/**
 * Union sur `allowEmpty` : `null` n'entre dans `value` et `onChange` que si le champ
 * a le droit d'être vide — un `onChange: (n: number) => void` ne reçoit jamais `null`.
 */
export type NumberInputProps = NumberInputCommon & (NumberInputFilled | NumberInputEmptiable);

export const NumberInput = forwardRef<HTMLInputElement, NumberInputProps>(function NumberInput(
	{
		allowEmpty = false,
		value,
		defaultValue,
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
		"aria-describedby": ariaDescribedBy,
		"aria-invalid": ariaInvalid,
		...rest
	},
	ref,
) {
	const labels = useLabels();
	// `null` n'est émis que si `allowEmpty` : le cast ne fait qu'unir les deux signatures.
	const [val, setVal] = useControllable<number | null>(
		value,
		defaultValue ?? (allowEmpty ? null : 0),
		onChange as ((value: number | null) => void) | undefined,
	);
	const [draft, setDraft] = useState<string | null>(null);
	const locked = disabled || readOnly;

	const round = (n: number) => (precision != null ? parseFloat(n.toFixed(precision)) : n);

	/** Émet `next`, sauf s'il ne change rien : quitter le champ ne renvoie pas la même valeur. */
	const emit = (next: number | null) => {
		if (next !== val) setVal(next);
	};

	const commit = (n: number) => {
		emit(round(clamp(n, min, max)));
		setDraft(null);
	};

	// À l'échelle du pas (et de `min`) : 0,1 + 0,2 vaut 0,3, pas 0,30000000000000004.
	const stepDecimals = Math.max(decimalsOf(step), decimalsOf(min));
	const bump = (dir: 1 | -1, big = false) => {
		if (locked) return;
		const amount = step * (big ? 10 : 1) * dir;
		commit(parseFloat(((val || 0) + amount).toFixed(stepDecimals)));
	};

	/**
	 * En quittant le champ, le texte tapé est relu et ramené dans les bornes (« 150 »
	 * avec `max` 100 → 100) ; illisible, ou vidé sans `allowEmpty`, la dernière valeur
	 * revient. Rien de tapé : rien n'est émis.
	 */
	const leave = () => {
		if (draft === null) return;
		const typed = parseTyped(draft);
		if (typed !== null) commit(typed);
		else setDraft(null);
	};

	const handleKeyDown = compose(onKeyDown, (e) => {
		if (locked) return;
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
	});

	const display =
		val === null ? "" : precision != null && !Number.isNaN(val) ? val.toFixed(precision) : `${val}`;

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
						fieldShell({ size, layout: "flush", error, disabled }),
						"camply-numberinput__wrap",
					)}
				>
					<button
						type="button"
						className="camply-numberinput__step"
						aria-label={labels.decrease}
						tabIndex={-1}
						disabled={locked || (val !== null && val <= min)}
						onClick={() => bump(-1)}
					>
						<Minus size={15} />
					</button>
					<div className="camply-numberinput__inputWrap">
						{prefix && <span className="camply-numberinput__affix">{prefix}</span>}
						<input
							ref={ref}
							id={inputId}
							inputMode="decimal"
							className="camply-field-control camply-numberinput__input"
							value={draft ?? display}
							disabled={disabled}
							readOnly={readOnly}
							required={isRequired}
							onChange={(e) => {
								const raw = e.target.value;
								setDraft(raw);
								if (raw.trim() === "" && allowEmpty) return emit(null);
								// Hors bornes (« 15 » en route vers « 150 », avec `max` 100), rien n'est
								// émis pendant la frappe : quitter le champ ramène dans les bornes.
								const typed = parseTyped(raw);
								if (typed !== null && typed >= min && typed <= max) emit(typed);
							}}
							onBlur={compose(onBlur, leave)}
							onKeyDown={handleKeyDown}
							{...rest}
							// Posés APRÈS le spread, mais composés : voir Input.
							aria-describedby={idRefs(describedBy, ariaDescribedBy)}
							aria-invalid={invalid ?? ariaInvalid}
						/>
						{suffix && <span className="camply-numberinput__affix">{suffix}</span>}
					</div>
					<button
						type="button"
						className="camply-numberinput__step"
						aria-label={labels.increase}
						tabIndex={-1}
						disabled={locked || (val !== null && val >= max)}
						onClick={() => bump(1)}
					>
						<Plus size={15} />
					</button>
				</div>
			)}
		</Field>
	);
});
