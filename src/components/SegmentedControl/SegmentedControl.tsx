import {
	type ComponentPropsWithoutRef,
	type ForwardedRef,
	forwardRef,
	type KeyboardEvent,
	type ReactNode,
	type RefAttributes,
	useLayoutEffect,
	useRef,
	useState,
} from "react";
import { cn } from "../../lib/cn";
import { HiddenField } from "../../lib/HiddenField";
import { nextRovingIndex } from "../../lib/rovingIndex";
import type { Option, Size } from "../../lib/types";
import { useControllable } from "../../lib/useControllable";

/**
 * Un segment est une `Option` dérivée, jamais recopiée (règle 1) — comme
 * `SelectOption` ou `ComboboxOption`. `disabled` en est retiré : un segment isolé
 * ne se désactive pas ici, et l'accepter pour l'ignorer serait une prop sans effet.
 */
export type SegmentOption<T extends string = string> = Omit<Option<T>, "disabled">;

/**
 * Règle 3. Les `role="radio"` des segments dépendent de `role="radiogroup"` ; les
 * états ARIA dérivent de `required` et `readOnly` ; l'orientation est le contrat
 * du clavier.
 */
type ReservedSegmentedControlAttr = "role" | "aria-orientation" | "aria-readonly" | "aria-required";

export interface SegmentedControlProps<T extends string = string>
	extends Omit<
		ComponentPropsWithoutRef<"div">,
		"onChange" | "defaultValue" | ReservedSegmentedControlAttr
	> {
	options: SegmentOption<T>[];
	value?: T;
	defaultValue?: T;
	onChange?: (value: T) => void;
	size?: Extract<Size, "sm" | "md">;
	fullWidth?: boolean;
	/** Nom soumis avec le formulaire : la valeur part dans un <input type="hidden">. */
	name?: string;
	/**
	 * Marque le champ obligatoire (aria-required). Un input caché n'étant pas soumis
	 * à la validation native, la contrainte reste indicative — un segment est toujours
	 * sélectionné.
	 */
	required?: boolean;
	/** Sélection figée : le segment actif reste focusable mais ne change plus. */
	readOnly?: boolean;
}

const SegmentedControlBase = forwardRef(function SegmentedControl<T extends string>(
	{
		options,
		value,
		defaultValue,
		onChange,
		size = "md",
		fullWidth,
		name,
		required,
		readOnly = false,
		className,
		onKeyDown,
		...rest
	}: SegmentedControlProps<T>,
	ref: ForwardedRef<HTMLDivElement>,
) {
	const [current, setCurrent] = useControllable<T>(
		value,
		defaultValue ?? options[0]?.value,
		onChange,
	);
	const activeIndex = Math.max(
		0,
		options.findIndex((o) => o.value === current),
	);

	const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);
	const [thumb, setThumb] = useState<{ left: number; width: number } | null>(null);

	useLayoutEffect(() => {
		const el = buttonRefs.current[activeIndex];
		if (!el) return;
		const measure = () => setThumb({ left: el.offsetLeft, width: el.offsetWidth });
		measure();
		const ro = typeof ResizeObserver !== "undefined" ? new ResizeObserver(measure) : undefined;
		ro?.observe(el);
		return () => ro?.disconnect();
	}, [activeIndex]);

	const select = (index: number) => {
		const option = options[index];
		if (!option) return;
		setCurrent(option.value);
		buttonRefs.current[index]?.focus();
	};

	const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
		// Règle 4.
		onKeyDown?.(e);
		if (e.defaultPrevented || readOnly || options.length === 0) return;
		// La lib ne connaît que des segments horizontaux, mais un radiogroup accepte
		// aussi les flèches verticales : on tente les deux axes.
		const next =
			nextRovingIndex(e.key, activeIndex, options.length) ??
			nextRovingIndex(e.key, activeIndex, options.length, "vertical");
		if (next === null) return;
		e.preventDefault();
		select(next);
	};

	return (
		<div
			ref={ref}
			{...rest}
			// Invariants du composant — cf. `ReservedSegmentedControlAttr`.
			role="radiogroup"
			aria-orientation="horizontal"
			aria-readonly={readOnly || undefined}
			aria-required={required || undefined}
			className={cn(
				"camply-segmentedcontrol__root",
				`camply-segmentedcontrol__${size}`,
				fullWidth && "camply-segmentedcontrol__fullWidth",
				className,
			)}
			onKeyDown={handleKeyDown}
		>
			{thumb && (
				<span
					aria-hidden="true"
					className="camply-segmentedcontrol__thumb"
					style={{ left: thumb.left, width: thumb.width }}
				/>
			)}
			{options.map((opt, i) => (
				// biome-ignore lint/a11y/useSemanticElements: <input type="radio"> n'est pas stylable en segment (thumb animé) — bouton + role="radio" est le pattern APG
				<button
					key={opt.value}
					ref={(el) => {
						buttonRefs.current[i] = el;
					}}
					type="button"
					role="radio"
					aria-checked={current === opt.value}
					tabIndex={i === activeIndex ? 0 : -1}
					className={cn(
						"camply-segmentedcontrol__segment",
						"camply-focus-ring",
						current === opt.value && "camply-segmentedcontrol__active",
					)}
					onClick={() => {
						if (!readOnly) setCurrent(opt.value);
					}}
				>
					{opt.label}
				</button>
			))}
			<HiddenField name={name} value={current ?? ""} />
		</div>
	);
});

/**
 * Groupe de segments exclusifs (pattern radiogroup : tabindex mouvant + flèches).
 * Le groupe se nomme par `aria-label`, qui traverse le spread : c'est un sélecteur
 * de vue, pas un champ — il n'a pas de libellé visible, et `label` mentirait sur ce
 * point puisque partout ailleurs dans la lib cette prop rend un vrai `<label>`.
 * `forwardRef` efface le paramètre générique : on le restaure par un cast pour que
 * `T` continue d'être inféré depuis `options`.
 */
export const SegmentedControl = SegmentedControlBase as <T extends string = string>(
	props: SegmentedControlProps<T> & RefAttributes<HTMLDivElement>,
) => ReactNode;
