import { forwardRef, type InputHTMLAttributes } from "react";
import { cn } from "../../lib/cn";
import { Check } from "../../lib/icons";
export interface CheckboxProps
	extends Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "size"> {
	label?: string;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
	({ label, className, disabled, ...props }, ref) => {
		return (
			<label
				className={cn("camply-checkbox__wrap", disabled && "camply-checkbox__disabled", className)}
			>
				<span className={"camply-checkbox__box"}>
					<input
						ref={ref}
						type="checkbox"
						className={"camply-checkbox__input"}
						disabled={disabled}
						{...props}
					/>
					<span className={"camply-checkbox__control"} aria-hidden="true">
						<Check size={12} className={"camply-checkbox__tick"} />
					</span>
				</span>
				{label && <span className={"camply-checkbox__label"}>{label}</span>}
			</label>
		);
	},
);

Checkbox.displayName = "Checkbox";
