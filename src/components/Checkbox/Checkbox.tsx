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
				className={cn("camply-control__wrap", disabled && "camply-control__disabled", className)}
			>
				<span className={"camply-control__box"}>
					<input
						ref={ref}
						type="checkbox"
						className={"camply-control__input"}
						disabled={disabled}
						{...props}
					/>
					<span className="camply-control__face camply-checkbox__control" aria-hidden="true">
						<Check size={12} className={"camply-checkbox__tick"} />
					</span>
				</span>
				{label && <span className={"camply-control__label"}>{label}</span>}
			</label>
		);
	},
);

Checkbox.displayName = "Checkbox";
