import { type ButtonHTMLAttributes, forwardRef, type ReactNode } from "react";
import { cn } from "../../lib/cn";
import { useControllable } from "../../lib/useControllable";
export interface ToggleProps
	extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "onChange" | "type"> {
	pressed?: boolean;
	defaultPressed?: boolean;
	onChange?: (pressed: boolean) => void;
	size?: "sm" | "md" | "lg";
	children: ReactNode;
}

/** A single two-state pressable button (aria-pressed). Great for toolbar
 *  actions like bold/italic or show/hide. */
export const Toggle = forwardRef<HTMLButtonElement, ToggleProps>(
	(
		{ pressed, defaultPressed = false, onChange, size = "md", className, children, ...props },
		ref,
	) => {
		const [on, setOn] = useControllable<boolean>(pressed, defaultPressed, onChange);
		return (
			<button
				ref={ref}
				type="button"
				aria-pressed={on}
				className={cn(
					"camply-toggle__toggle",
					"camply-focus-ring",
					`camply-toggle__${size}`,
					on && "camply-toggle__on",
					className,
				)}
				onClick={() => setOn(!on)}
				{...props}
			>
				{children}
			</button>
		);
	},
);

Toggle.displayName = "Toggle";
