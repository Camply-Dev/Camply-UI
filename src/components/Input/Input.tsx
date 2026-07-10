import { forwardRef, type InputHTMLAttributes, type ReactNode } from "react";
import { cn } from "../../lib/cn";
import { useId } from "../../lib/useControllable";
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
		const autoId = useId("input");
		const inputId = id ?? autoId;
		const describedBy = error || hint ? `${inputId}-desc` : undefined;

		return (
			<div className={cn("camply-input__field", className)}>
				{label && (
					<label htmlFor={inputId} className={"camply-input__label"}>
						{label}
					</label>
				)}
				<div
					className={cn(
						"camply-input__wrap",
						`camply-input__${size}`,
						error && "camply-input__hasError",
						disabled && "camply-input__disabled",
					)}
				>
					{leftIcon && <span className={"camply-input__iconLeft"}>{leftIcon}</span>}
					<input
						ref={ref}
						id={inputId}
						className={"camply-input__input"}
						aria-invalid={error ? true : undefined}
						aria-describedby={describedBy}
						disabled={disabled}
						{...props}
					/>
					{rightIcon && <span className={"camply-input__iconRight"}>{rightIcon}</span>}
				</div>
				{(error || hint) && (
					<span
						id={describedBy}
						className={cn("camply-input__desc", error && "camply-input__descError")}
					>
						{error || hint}
					</span>
				)}
			</div>
		);
	},
);

Input.displayName = "Input";
