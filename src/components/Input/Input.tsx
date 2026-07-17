import { forwardRef, type InputHTMLAttributes, type ReactNode } from "react";
import { cn } from "../../lib/cn";
import { Field } from "../../lib/Field";
export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
	label?: string;
	hint?: string;
	error?: string;
	leftIcon?: ReactNode;
	rightIcon?: ReactNode;
	size?: "sm" | "md" | "lg";
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
			id,
			disabled,
			required,
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
						{leftIcon && <span className={"camply-input__iconLeft"}>{leftIcon}</span>}
						<input
							ref={ref}
							id={inputId}
							className={"camply-field-control"}
							aria-invalid={invalid}
							aria-describedby={describedBy}
							disabled={disabled}
							required={isRequired}
							{...props}
						/>
						{rightIcon && <span className={"camply-input__iconRight"}>{rightIcon}</span>}
					</div>
				)}
			</Field>
		);
	},
);

Input.displayName = "Input";
