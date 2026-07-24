import { forwardRef, type InputHTMLAttributes } from "react";
import { cn } from "../../lib/cn";
import { Field } from "../../lib/Field";

export interface SwitchProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "size"> {
	/** Libellé affiché à côté de l'interrupteur (reste dans le <label> cliquable). */
	label?: string;
	spread?: boolean;
	size?: "sm" | "md";
	/** Texte d'aide affiché sous l'interrupteur. */
	hint?: string;
	/** Message d'erreur : remplace l'aide, colore le texte et pose aria-invalid. */
	error?: string;
}

export const Switch = forwardRef<HTMLInputElement, SwitchProps>(
	(
		{ label, hint, error, spread, size = "md", className, style, id, disabled, required, ...props },
		ref,
	) => {
		return (
			<Field
				hint={hint}
				error={error}
				id={id}
				idPrefix="switch"
				className={cn("camply-switch__field", spread && "camply-switch__fieldSpread", className)}
				style={style}
			>
				{({ id: inputId, describedBy, invalid }) => (
					<label
						className={cn(
							"camply-control__wrap",
							`camply-switch__${size}`,
							spread && "camply-switch__spread",
							disabled && "camply-control__disabled",
						)}
					>
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
						<span className={"camply-control__box"}>
							<input
								ref={ref}
								id={inputId}
								type="checkbox"
								// biome-ignore lint/a11y/useAriaPropsForRole: l'état coché du checkbox natif est mappé sur aria-checked par HTML-AAM — pas besoin de le dupliquer
								role="switch"
								className={"camply-control__input"}
								disabled={disabled}
								required={required}
								aria-invalid={invalid}
								aria-describedby={describedBy}
								{...props}
							/>
							<span className="camply-control__face camply-switch__track" aria-hidden="true">
								<span className={"camply-switch__thumb"} />
							</span>
						</span>
					</label>
				)}
			</Field>
		);
	},
);

Switch.displayName = "Switch";
