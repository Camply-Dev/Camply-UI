import {
	forwardRef,
	type HTMLAttributes,
	type KeyboardEvent,
	type ReactNode,
	useRef,
	useState,
} from "react";
import { clamp } from "../../lib/clamp";
import { cn } from "../../lib/cn";
import { Star } from "../../lib/icons";
import { useControllable } from "../../lib/useControllable";

export interface RatingProps
	extends Omit<HTMLAttributes<HTMLDivElement>, "onChange" | "defaultValue"> {
	value?: number;
	defaultValue?: number;
	onChange?: (value: number) => void;
	max?: number;
	size?: number;
	readOnly?: boolean;
	disabled?: boolean;
	allowClear?: boolean;
	icon?: ReactNode;
	/** Nom soumis avec le formulaire : la note part dans un <input type="hidden">. */
	name?: string;
	/**
	 * Marque le champ obligatoire (aria-required). Un input caché n'étant pas soumis
	 * à la validation native, une note à 0 doit être rejetée côté application.
	 */
	required?: boolean;
	/**
	 * Nom accessible d'une étoile (défaut : "3/5"). Point d'entrée d'i18n : la lib
	 * ne rend ici aucun texte figé.
	 */
	formatValue?: (value: number, max: number) => string;
}

/**
 * Note en étoiles, exposée comme un radiogroup : chaque étoile est une option
 * (flèches pour changer de note, Home/End pour les bornes).
 */
export const Rating = forwardRef<HTMLDivElement, RatingProps>(function Rating(
	{
		value,
		defaultValue = 0,
		onChange,
		max = 5,
		size = 24,
		readOnly = false,
		disabled = false,
		allowClear = true,
		icon,
		name,
		required,
		formatValue = (v, m) => `${v}/${m}`,
		className,
		...props
	},
	ref,
) {
	const [val, setVal] = useControllable<number>(value, defaultValue, onChange);
	const [hover, setHover] = useState(0);
	const starRefs = useRef<(HTMLButtonElement | null)[]>([]);
	const active = hover || val;
	const interactive = !readOnly && !disabled;
	// Note la plus basse atteignable : 0 (aucune étoile) seulement si on peut effacer.
	const lowest = allowClear ? 0 : 1;
	// Sans note, c'est la 1re étoile qui entre dans l'ordre de tabulation (pattern radiogroup).
	const focused = clamp(val, 1, max);

	const pick = (n: number) => {
		if (!interactive) return;
		setVal(allowClear && n === val ? 0 : n);
	};

	/** Déplace la note et suit avec le focus, l'étoile sélectionnée portant tabindex=0. */
	const setRating = (n: number) => {
		const next = clamp(n, lowest, max);
		setVal(next);
		starRefs.current[Math.max(next, 1) - 1]?.focus();
	};

	const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
		if (!interactive) return;
		switch (e.key) {
			case "ArrowRight":
			case "ArrowUp":
				setRating(val + 1);
				break;
			case "ArrowLeft":
			case "ArrowDown":
				setRating(val - 1);
				break;
			case "Home":
				setRating(lowest);
				break;
			case "End":
				setRating(max);
				break;
			default:
				return;
		}
		e.preventDefault();
	};

	return (
		<div
			ref={ref}
			{...props}
			className={cn(
				"camply-rating__root",
				interactive && "camply-rating__interactive",
				disabled && "camply-rating__disabled",
				className,
			)}
			role="radiogroup"
			aria-orientation="horizontal"
			aria-disabled={disabled || undefined}
			aria-readonly={readOnly || undefined}
			aria-required={required || undefined}
			onKeyDown={onKeyDown}
			onMouseLeave={() => setHover(0)}
		>
			{Array.from({ length: max }, (_, i) => i + 1).map((n) => (
				// biome-ignore lint/a11y/useSemanticElements: <input type="radio"> n'est pas stylable en étoile survolable — bouton + role="radio" est le pattern APG
				<button
					key={n}
					ref={(el) => {
						starRefs.current[n - 1] = el;
					}}
					type="button"
					role="radio"
					aria-checked={n === val}
					tabIndex={n === focused ? 0 : -1}
					className={cn(
						"camply-rating__star",
						"camply-focus-ring",
						n <= active && "camply-rating__on",
					)}
					style={{ width: size, height: size }}
					aria-label={formatValue(n, max)}
					disabled={disabled}
					onMouseEnter={() => interactive && setHover(n)}
					onClick={() => pick(n)}
				>
					{icon ?? <Star size={size} />}
				</button>
			))}
			{name && <input type="hidden" name={name} value={val} />}
		</div>
	);
});
