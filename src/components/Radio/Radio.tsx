import {
	createContext,
	forwardRef,
	type HTMLAttributes,
	type InputHTMLAttributes,
	type ReactNode,
	useContext,
} from "react";
import { cn } from "../../lib/cn";
import { Field } from "../../lib/Field";
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

export interface RadioGroupProps
	extends Omit<HTMLAttributes<HTMLDivElement>, "onChange" | "defaultValue"> {
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
							role="radiogroup"
							aria-labelledby={labelId}
							aria-describedby={describedBy}
							aria-invalid={invalid}
							aria-required={required || undefined}
							className={"camply-radio__group"}
							{...rest}
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
		"type" | "name" | "value" | "checked" | "defaultChecked" | "onChange" | "size"
	> {
	value: string;
	label?: string;
	disabled?: boolean;
}

export const Radio = forwardRef<HTMLInputElement, RadioProps>(
	({ value, label, disabled, className, style, ...rest }, ref) => {
		const ctx = useContext(RadioContext);
		if (!ctx) throw new Error("<Radio> must be used inside <RadioGroup>");
		const isDisabled = disabled || ctx.disabled;
		const checked = ctx.value === value;

		return (
			<label
				className={cn("camply-control__wrap", isDisabled && "camply-control__disabled", className)}
				style={style}
			>
				<span className={"camply-control__box"}>
					<input
						ref={ref}
						type="radio"
						className={"camply-control__input"}
						name={ctx.name}
						value={value}
						checked={checked}
						disabled={isDisabled}
						required={ctx.required}
						aria-invalid={ctx.invalid}
						onChange={() => ctx.onChange(value)}
						{...rest}
					/>
					<span className="camply-control__face camply-radio__control" aria-hidden="true">
						<span className={"camply-radio__dot"} />
					</span>
				</span>
				{label && <span className={"camply-control__label"}>{label}</span>}
			</label>
		);
	},
);

Radio.displayName = "Radio";
