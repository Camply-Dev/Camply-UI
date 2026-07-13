import { forwardRef, type InputHTMLAttributes, type ReactNode } from "react";
import { cn } from "../../lib/cn";
import { Field } from "../../lib/Field";
export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
	label?: string;
	/** helper text shown under the field */
	hint?: string;
	/** error message — overrides hint and styles the field red */
	error?: string;
	leftIcon?: ReactNode;
	rightIcon?: ReactNode;
	size?: "sm" | "md" | "lg";
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
	(
		{ label, hint, error, leftIcon, rightIcon, size = "md", className, id, disabled, ...props },
		ref,
	) => {
		return (
			<Field label={label} hint={hint} error={error} id={id} idPrefix="input" className={className}>
				{({ id: inputId, describedBy, invalid }) => (
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
