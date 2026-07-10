import { forwardRef, type InputHTMLAttributes } from "react";
import { cn } from "../../lib/cn";
export interface SwitchProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "size"> {
	label?: string;
	/** label on the left, control on the right, filling the row */
	spread?: boolean;
	size?: "sm" | "md";
}

export const Switch = forwardRef<HTMLInputElement, SwitchProps>(
	({ label, spread, size = "md", className, disabled, ...props }, ref) => {
		return (
			<label
				className={cn(
					"camply-switch__wrap",
					`camply-switch__${size}`,
					spread && "camply-switch__spread",
					disabled && "camply-switch__disabled",
					className,
				)}
			>
				{label && <span className={"camply-switch__label"}>{label}</span>}
				<span className={"camply-switch__control"}>
					<input
						ref={ref}
						type="checkbox"
						// biome-ignore lint/a11y/useAriaPropsForRole: l'état coché du checkbox natif est mappé sur aria-checked par HTML-AAM — pas besoin de le dupliquer
						role="switch"
						className={"camply-switch__input"}
						disabled={disabled}
						{...props}
					/>
					<span className={"camply-switch__track"} aria-hidden="true">
						<span className={"camply-switch__thumb"} />
					</span>
				</span>
			</label>
		);
	},
);

Switch.displayName = "Switch";
