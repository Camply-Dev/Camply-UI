import { type ButtonHTMLAttributes, forwardRef, type ReactNode } from "react";
import { compose } from "../../lib/cloneTrigger";
import { cn } from "../../lib/cn";
import type { Size } from "../../lib/types";
import { useControllable } from "../../lib/useControllable";

/**
 * Attributs que la racine se réserve (règle 3). `aria-pressed` est l'état du
 * bouton bascule, piloté par `pressed` / `defaultPressed` : franchissable, il
 * annoncerait l'inverse du visuel. `type` : un Toggle ne soumet jamais un `<form>`.
 *
 * `role` est retiré du type sans être réécrit après le spread (un `role` redondant
 * sur `<button>` est du bruit) : `switch` ou `menuitemcheckbox` attendent
 * `aria-checked`, que le composant ne pose pas.
 *
 * Limite assumée : `aria-pressed="mixed"` (tri-état APG) n'a pas de canal ; le
 * prendre en charge suppose d'ouvrir `pressed` et `onChange` au tri-état.
 */
type ReservedToggleAttr = "type" | "role" | "aria-pressed";

export interface ToggleProps
	extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "onChange" | ReservedToggleAttr> {
	pressed?: boolean;
	defaultPressed?: boolean;
	onChange?: (pressed: boolean) => void;
	size?: Size;
	children: ReactNode;
}

export const Toggle = forwardRef<HTMLButtonElement, ToggleProps>(
	(
		{
			pressed,
			defaultPressed = false,
			onChange,
			size = "md",
			className,
			children,
			onClick,
			...props
		},
		ref,
	) => {
		const [on, setOn] = useControllable<boolean>(pressed, defaultPressed, onChange);
		return (
			// Règle 3 : le spread d'abord, l'état du bouton bascule après (le type
			// `ReservedToggleAttr` en est le pendant à la compilation).
			<button
				{...props}
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
				// Règle 4.
				onClick={compose(onClick, () => setOn(!on))}
			>
				{children}
			</button>
		);
	},
);

Toggle.displayName = "Toggle";
