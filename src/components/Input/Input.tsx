import { forwardRef, type InputHTMLAttributes, type ReactNode } from "react";
import { cn } from "../../lib/cn";
import { Field, idRefs } from "../../lib/Field";
import type { Size } from "../../lib/types";
export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
	label?: string;
	hint?: string;
	error?: string;
	leftIcon?: ReactNode;
	rightIcon?: ReactNode;
	size?: Size;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
	(
		{
			label,
			hint,
			error,
			leftIcon,
			rightIcon,
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
				label={label}
				hint={hint}
				error={error}
				required={required}
				id={id}
				idPrefix="input"
				className={className}
				style={style}
			>
				{({ id: inputId, describedBy, invalid, required: isRequired }) => (
					<div
						className={cn(
							"camply-input__wrap",
							"camply-field-shell",
							`camply-field-shell--${size}`,
							error && "camply-field-shell--error",
							disabled && "camply-field-shell--disabled",
						)}
					>
						{leftIcon && <span className="camply-input__iconLeft">{leftIcon}</span>}
						<input
							ref={ref}
							id={inputId}
							className="camply-field-control"
							disabled={disabled}
							required={isRequired}
							{...props}
							// Posés APRÈS le spread : le lien vers le message du Field est un
							// invariant. Ils restent dans le type public parce qu'on COMPOSE —
							// l'IDREF du consommateur s'ajoute, son aria-invalid ne sert que
							// tant qu'aucune `error` n'est rendue (règles 3 et 4).
							aria-describedby={idRefs(describedBy, ariaDescribedBy)}
							aria-invalid={invalid ?? ariaInvalid}
						/>
						{rightIcon && <span className="camply-input__iconRight">{rightIcon}</span>}
					</div>
				)}
			</Field>
		);
	},
);

Input.displayName = "Input";
