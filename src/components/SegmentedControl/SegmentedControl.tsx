import {
	type ComponentPropsWithoutRef,
	type ForwardedRef,
	forwardRef,
	type ReactNode,
	type RefAttributes,
	useLayoutEffect,
	useRef,
	useState,
} from "react";
import { compose } from "../../lib/cloneTrigger";
import { cn } from "../../lib/cn";
import { Field, idRefs } from "../../lib/Field";
import { FormReset, HiddenField } from "../../lib/HiddenField";
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
	/**
	 * Libellé visible, quand le groupe est un champ de formulaire (« Ajouter
	 * comme »…) : il nomme le groupe (`aria-labelledby`), comme chez `RadioGroup`.
	 * Un simple sélecteur de vue se nomme plutôt par `aria-label`.
	 */
	label?: string;
	/** Aide sous le groupe, rattachée par `aria-describedby`. */
	hint?: string;
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
		label,
		hint,
		name,
		required,
		readOnly = false,
		className,
		style,
		id,
		onKeyDown,
		"aria-labelledby": ariaLabelledBy,
		"aria-describedby": ariaDescribedBy,
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

	// Règle 4.
	const handleKeyDown = compose(onKeyDown, (e) => {
		if (readOnly || options.length === 0) return;
		// La lib ne connaît que des segments horizontaux, mais un radiogroup accepte
		// aussi les flèches verticales : on tente les deux axes.
		const next =
			nextRovingIndex(e.key, activeIndex, options.length) ??
			nextRovingIndex(e.key, activeIndex, options.length, "vertical");
		if (next === null) return;
		e.preventDefault();
		select(next);
	});

	// Sans libellé ni aide, le groupe est la racine (`className`, `style`) ; avec, c'est
	// le `Field` qui l'entoure, comme pour tout champ de la lib.
	const field = Boolean(label || hint);
	const group = (groupId: string | undefined, labelId?: string, describedBy?: string) => (
		<div
			ref={ref}
			{...rest}
			id={groupId}
			// Règle 4 : le libellé et l'aide du champ s'ajoutent à ceux du consommateur.
			aria-labelledby={idRefs(labelId, ariaLabelledBy)}
			aria-describedby={idRefs(describedBy, ariaDescribedBy)}
			// Invariants du composant — cf. `ReservedSegmentedControlAttr`.
			role="radiogroup"
			aria-orientation="horizontal"
			aria-readonly={readOnly || undefined}
			aria-required={required || undefined}
			className={cn(
				"camply-segmentedcontrol__root",
				`camply-segmentedcontrol__${size}`,
				fullWidth && "camply-segmentedcontrol__fullWidth",
				!field && className,
			)}
			style={field ? undefined : style}
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
			<FormReset
				onReset={
					value === undefined ? () => setCurrent(defaultValue ?? options[0]?.value) : undefined
				}
			/>
		</div>
	);

	if (!field) return group(id);
	return (
		<Field
			label={label}
			hint={hint}
			required={required}
			id={id}
			idPrefix="segmented"
			className={className}
			style={style}
		>
			{({ id: groupId, labelId, describedBy }) => group(groupId, labelId, describedBy)}
		</Field>
	);
});

/**
 * Groupe de segments exclusifs (pattern radiogroup : tabindex mouvant + flèches).
 * Sélecteur de vue, il se nomme par `aria-label` ; champ de formulaire, il prend un
 * `label` visible et un `hint`, comme `RadioGroup`. Couleurs : variables
 * `--camply-segmented-*` (rail, curseur, encre du segment actif).
 * `forwardRef` efface le paramètre générique : on le restaure par un cast pour que
 * `T` continue d'être inféré depuis `options`.
 */
export const SegmentedControl = SegmentedControlBase as <T extends string = string>(
	props: SegmentedControlProps<T> & RefAttributes<HTMLDivElement>,
) => ReactNode;
