import { forwardRef, type InputHTMLAttributes } from "react";
import { cn } from "../../lib/cn";
import { Field, idRefs, RequiredMark } from "../../lib/Field";
import type { Size } from "../../lib/types";

export interface SwitchProps
	// `role="switch"` est l'invariant du composant (règle 3).
	extends Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "size" | "role"> {
	/** Libellé affiché à côté de l'interrupteur (reste dans le <label> cliquable). */
	label?: string;
	spread?: boolean;
	size?: Extract<Size, "sm" | "md">;
	/** Texte d'aide affiché sous l'interrupteur. */
	hint?: string;
	/** Message d'erreur : remplace l'aide, colore le texte et pose aria-invalid. */
	error?: string;
}

export const Switch = forwardRef<HTMLInputElement, SwitchProps>(
	(
		{
			label,
			hint,
			error,
			spread,
			size = "md",
			className,
			style,
			id,
			disabled,
			required,
			"aria-describedby": ariaDescribedBy,
			"aria-invalid": ariaInvalid,
			...props
		},
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
							<span className="camply-control__label">
								{label}
								{required && <RequiredMark />}
							</span>
						)}
						<span className="camply-control__box">
							<input
								ref={ref}
								id={inputId}
								type="checkbox"
								className="camply-control__input"
								disabled={disabled}
								required={required}
								{...props}
								// Règle 3.
								// biome-ignore lint/a11y/useAriaPropsForRole: l'état coché du checkbox natif est mappé sur aria-checked par HTML-AAM — pas besoin de le dupliquer
								role="switch"
								// Posés APRÈS le spread, mais composés : voir Input.
								aria-describedby={idRefs(describedBy, ariaDescribedBy)}
								aria-invalid={invalid ?? ariaInvalid}
							/>
							<span className="camply-control__face camply-switch__track" aria-hidden="true">
								<span className="camply-switch__thumb" />
							</span>
						</span>
					</label>
				)}
			</Field>
		);
	},
);

Switch.displayName = "Switch";
