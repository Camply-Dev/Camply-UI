import {
	createContext,
	forwardRef,
	type HTMLAttributes,
	type InputHTMLAttributes,
	type ReactNode,
	useContext,
} from "react";
import { cn } from "../../lib/cn";
import { Field, idRefs } from "../../lib/Field";
import { useControllable } from "../../lib/useControllable";
import { useId } from "../../lib/useId";

interface RadioContextValue {
	name: string;
	value?: string;
	onChange: (value: string) => void;
	disabled?: boolean;
	/** Propagé à chaque <input> : un groupe requis exige qu'une option soit cochée. */
	required?: boolean;
	invalid?: true;
}
const RadioContext = createContext<RadioContextValue | null>(null);

/**
 * Règle 3. Les `<Radio>` enfants dépendent de `role="radiogroup"`, et
 * `aria-required` dérive de `required` : il ne doit pas pouvoir le contredire.
 */
type ReservedRadioGroupAttr = "role" | "aria-required";

export interface RadioGroupProps
	extends Omit<
		HTMLAttributes<HTMLDivElement>,
		"onChange" | "defaultValue" | ReservedRadioGroupAttr
	> {
	value?: string;
	defaultValue?: string;
	onChange?: (value: string) => void;
	/** Nom soumis avec le formulaire (généré si absent). */
	name?: string;
	disabled?: boolean;
	/** Exige qu'une option soit cochée (validation native + astérisque). */
	required?: boolean;
	label?: string;
	/** Texte d'aide affiché sous le groupe. */
	hint?: string;
	/** Message d'erreur : remplace l'aide, colore le texte et pose aria-invalid. */
	error?: string;
	children: ReactNode;
}

export const RadioGroup = forwardRef<HTMLDivElement, RadioGroupProps>(
	(
		{
			value,
			defaultValue,
			onChange,
			name,
			disabled,
			required,
			label,
			hint,
			error,
			id,
			className,
			style,
			children,
			"aria-labelledby": ariaLabelledBy,
			"aria-describedby": ariaDescribedBy,
			"aria-invalid": ariaInvalid,
			...rest
		},
		ref,
	) => {
		const [current, setCurrent] = useControllable(value, defaultValue, onChange, {
			allowUndefined: true,
		});
		const autoName = useId("radio");

		return (
			<Field
				label={label}
				hint={hint}
				error={error}
				required={required}
				id={id}
				idPrefix="radiogroup"
				className={className}
				style={style}
			>
				{({ id: groupId, labelId, describedBy, invalid }) => (
					<RadioContext.Provider
						value={{
							name: name ?? autoName,
							value: current,
							onChange: setCurrent,
							disabled,
							required,
							invalid,
						}}
					>
						<div
							ref={ref}
							id={groupId}
							className="camply-radio__group"
							{...rest}
							// Invariants du composant — cf. `ReservedRadioGroupAttr`.
							role="radiogroup"
							aria-required={required || undefined}
							// Posés APRÈS le spread, mais composés : voir Input.
							aria-labelledby={idRefs(labelId, ariaLabelledBy)}
							aria-describedby={idRefs(describedBy, ariaDescribedBy)}
							aria-invalid={invalid ?? ariaInvalid}
						>
							{children}
						</div>
					</RadioContext.Provider>
				)}
			</Field>
		);
	},
);

RadioGroup.displayName = "RadioGroup";

export interface RadioProps
	extends Omit<
		InputHTMLAttributes<HTMLInputElement>,
		// `required` fait partie de ce que le GROUPE possède : posé sur une
		// seule option, l'attribut natif rend tout le groupe obligatoire — il
		// contredirait en silence le `required` de `<RadioGroup>` (règle 3).
		"type" | "name" | "value" | "checked" | "defaultChecked" | "onChange" | "size" | "required"
	> {
	value: string;
	label?: string;
	/** Précision sous le libellé de CETTE option, annoncée comme sa description. */
	hint?: string;
	disabled?: boolean;
}

export const Radio = forwardRef<HTMLInputElement, RadioProps>(
	(
		{
			value,
			label,
			hint,
			disabled,
			className,
			style,
			"aria-invalid": ariaInvalid,
			"aria-describedby": ariaDescribedBy,
			...rest
		},
		ref,
	) => {
		const ctx = useContext(RadioContext);
		const hintId = useId("radio-hint");
		if (!ctx) throw new Error("<Radio> must be used inside <RadioGroup>");
		const isDisabled = disabled || ctx.disabled;
		const checked = ctx.value === value;

		return (
			<label
				className={cn(
					"camply-control__wrap",
					hint && "camply-radio__described",
					isDisabled && "camply-control__disabled",
					className,
				)}
				style={style}
			>
				<span className="camply-control__box">
					<input
						ref={ref}
						type="radio"
						className="camply-control__input"
						name={ctx.name}
						value={value}
						checked={checked}
						disabled={isDisabled}
						onChange={() => ctx.onChange(value)}
						{...rest}
						// Invariants venus du groupe, donc posés APRÈS le spread. `aria-invalid`
						// reste composable : hors erreur de groupe, celui de l'appelant passe.
						required={ctx.required}
						aria-invalid={ctx.invalid ?? ariaInvalid}
						// Composé comme partout : l'aide de l'option, puis celle de l'appelant.
						aria-describedby={idRefs(hint && hintId, ariaDescribedBy)}
					/>
					<span className="camply-control__face camply-radio__control" aria-hidden="true">
						<span className="camply-radio__dot" />
					</span>
				</span>
				{hint ? (
					<span className="camply-radio__text">
						{label && <span className="camply-control__label">{label}</span>}
						{/* Dans le <label>, l'aide entrerait dans le NOM de l'option. Masquée, elle
						    en sort, mais reste sa description : un nœud désigné par
						    aria-describedby compte même caché (accname, « hidden referenced »). */}
						<span id={hintId} className="camply-radio__hint" aria-hidden="true">
							{hint}
						</span>
					</span>
				) : (
					label && <span className="camply-control__label">{label}</span>
				)}
			</label>
		);
	},
);

Radio.displayName = "Radio";
