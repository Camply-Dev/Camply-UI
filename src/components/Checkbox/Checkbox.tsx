import { forwardRef, type InputHTMLAttributes } from "react";
import { cn } from "../../lib/cn";
import { Field } from "../../lib/Field";
import { Check } from "../../lib/icons";

export interface CheckboxProps
	extends Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "size"> {
	/** Libellé affiché à côté de la case (reste dans le <label> cliquable). */
	label?: string;
	/** Texte d'aide affiché sous la case. */
	hint?: string;
	/** Message d'erreur : remplace l'aide, colore le texte et pose aria-invalid. */
	error?: string;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
	({ label, hint, error, className, style, id, disabled, required, ...props }, ref) => {
		return (
			<Field
				hint={hint}
				error={error}
				id={id}
				idPrefix="checkbox"
				className={cn("camply-checkbox__field", className)}
				style={style}
			>
				{({ id: inputId, describedBy, invalid }) => (
					<label className={cn("camply-control__wrap", disabled && "camply-control__disabled")}>
						<span className={"camply-control__box"}>
							<input
								ref={ref}
								id={inputId}
								type="checkbox"
								className={"camply-control__input"}
								disabled={disabled}
								required={required}
								aria-invalid={invalid}
								aria-describedby={describedBy}
								{...props}
							/>
							<span className="camply-control__face camply-checkbox__control" aria-hidden="true">
								<Check size={12} className={"camply-checkbox__tick"} />
							</span>
						</span>
						{label && (
							<span className={"camply-control__label"}>
								{label}
								{required && (
									<span aria-hidden="true" className={"camply-field__required"}>
										*
									</span>
								)}
							</span>
						)}
					</label>
				)}
			</Field>
		);
	},
);

Checkbox.displayName = "Checkbox";
