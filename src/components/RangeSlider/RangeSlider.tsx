import {
	type ComponentPropsWithoutRef,
	forwardRef,
	type KeyboardEvent,
	type PointerEvent,
	useCallback,
	useRef,
} from "react";
import { clamp } from "../../lib/clamp";
import { cn } from "../../lib/cn";
import { Field, idRefs } from "../../lib/Field";
import { HiddenField } from "../../lib/HiddenField";
import { useLabels } from "../../lib/i18n";
import { ratioToValue, snapToStep, valueToPercent } from "../../lib/sliderGeometry";
import { nextSliderValue } from "../../lib/sliderKeys";
import { useControllable } from "../../lib/useControllable";

export type RangeValue = [number, number];

export interface RangeSliderProps
	extends Omit<ComponentPropsWithoutRef<"div">, "onChange" | "defaultValue"> {
	value?: RangeValue;
	defaultValue?: RangeValue;
	onChange?: (value: RangeValue) => void;
	min?: number;
	max?: number;
	step?: number;
	label?: string;
	/** Texte d'aide affiché sous la piste. */
	hint?: string;
	/** Message d'erreur : remplace l'aide, teinte la jauge et pose aria-invalid. */
	error?: string;
	showValue?: boolean;
	formatValue?: (value: number) => string;
	minGap?: number;
	disabled?: boolean;
	/**
	 * Nom soumis avec le formulaire : la plage part dans deux <input type="hidden">
	 * nommés `${name}-min` et `${name}-max` (deux champs plutôt qu'une chaîne
	 * "min,max", pour rester lisible côté serveur sans parsing).
	 */
	name?: string;
	/**
	 * Marque le champ obligatoire : astérisque à côté du label. ARIA n'autorise pas
	 * aria-required sur role="slider" et une plage porte toujours une valeur — la
	 * prop existe pour l'alignement visuel avec les autres champs.
	 */
	required?: boolean;
	/** Plage figée : les poignées restent focusables mais n'acceptent plus de modification. */
	readOnly?: boolean;
	/** Nom accessible de la poignée basse (défaut : « <label> » + labels.minimum). */
	minLabel?: string;
	/** Nom accessible de la poignée haute (défaut : « <label> » + labels.maximum). */
	maxLabel?: string;
}

export const RangeSlider = forwardRef<HTMLDivElement, RangeSliderProps>(function RangeSlider(
	{
		value,
		defaultValue = [25, 75],
		onChange,
		min = 0,
		max = 100,
		step = 1,
		label,
		hint,
		error,
		showValue = true,
		formatValue = (v) => `${v}`,
		minGap = 0,
		disabled = false,
		name,
		required,
		readOnly = false,
		minLabel,
		maxLabel,
		id,
		className,
		"aria-label": ariaLabel,
		"aria-labelledby": ariaLabelledBy,
		...rest
	},
	ref,
) {
	const [range, setRange] = useControllable<RangeValue>(value, defaultValue, onChange);
	const labels = useLabels();
	const trackRef = useRef<HTMLDivElement>(null);
	const dragging = useRef<0 | 1 | null>(null);
	const locked = disabled || readOnly;

	const setHandle = useCallback(
		(index: 0 | 1, raw: number) => {
			const v = snapToStep(raw, min, max, step);
			const next: RangeValue = [range[0], range[1]];
			// Chaque poignée reste bornée par l'autre, écart minimal compris.
			if (index === 0) next[0] = clamp(Math.min(v, range[1] - minGap), min, max);
			else next[1] = clamp(Math.max(v, range[0] + minGap), min, max);
			setRange(next);
		},
		[min, max, step, range, minGap, setRange],
	);

	const valueFromX = useCallback(
		(clientX: number) => {
			const el = trackRef.current;
			if (!el) return min;
			const rect = el.getBoundingClientRect();
			return ratioToValue(clientX, rect, min, max);
		},
		[min, max],
	);

	const onPointerDown = (index: 0 | 1) => (e: PointerEvent) => {
		if (locked) return;
		dragging.current = index;
		(e.target as HTMLElement).setPointerCapture(e.pointerId);
	};
	const onPointerMove = (e: PointerEvent) => {
		if (dragging.current === null) return;
		setHandle(dragging.current, valueFromX(e.clientX));
	};
	const onPointerUp = (e: PointerEvent) => {
		dragging.current = null;
		(e.target as HTMLElement).releasePointerCapture?.(e.pointerId);
	};

	const onKey = (index: 0 | 1) => (e: KeyboardEvent) => {
		if (locked) return;
		const next = nextSliderValue(e.key, range[index], min, max, step);
		if (next === null) return;
		e.preventDefault();
		setHandle(index, next);
	};

	const pct = (v: number) => valueToPercent(v, min, max);
	// Les deux poignées portent des noms distincts : un seul intitulé partagé les
	// rendrait indiscernables au lecteur d'écran.
	const base = label ?? ariaLabel;
	const handleNames: [string | undefined, string | undefined] = [
		minLabel ?? (base ? `${base} ${labels.minimum}` : undefined),
		maxLabel ?? (base ? `${base} ${labels.maximum}` : undefined),
	];

	// La racine `.camply-rangeslider__root` porte la ref, les props DOM, `className`
	// et `style` ; `Field` est imbriqué dedans pour que ce sélecteur reste ciblable.
	return (
		<div
			ref={ref}
			{...rest}
			className={cn(
				"camply-rangeslider__root",
				disabled && "camply-rangeslider__disabled",
				error && "camply-rangeslider__root--error",
				className,
			)}
		>
			<Field
				label={label}
				hint={hint}
				error={error}
				required={required}
				id={id}
				idPrefix="rangeslider"
			>
				{({ id: groupId, labelId, describedBy, invalid }) => {
					// Règle 4 : le libellé rendu et un `aria-labelledby` de l'appelant se composent.
					const labelledBy = idRefs(labelId, ariaLabelledBy);
					return (
						<>
							{showValue && (
								<div className="camply-rangeslider__head">
									<span className="camply-rangeslider__value">
										{formatValue(range[0])} – {formatValue(range[1])}
									</span>
								</div>
							)}
							{/* La piste est le groupe : c'est elle qui porte l'id du champ (le `htmlFor`
							    du label ne peut pas cibler un <div role="slider">) et le nom d'ensemble,
							    chaque poignée gardant son propre nom « … minimum » / « … maximum ». */}
							{/* biome-ignore lint/a11y/useSemanticElements: <fieldset> impose un <legend> et un habillage natif incontournable sur une piste positionnée — div+role="group" est le pattern APG du curseur à deux poignées */}
							<div
								ref={trackRef}
								id={groupId}
								role="group"
								aria-label={labelledBy ? undefined : ariaLabel}
								aria-labelledby={labelledBy}
								className="camply-rangeslider__track"
								onPointerMove={onPointerMove}
								onPointerUp={onPointerUp}
							>
								<div
									className="camply-rangeslider__fill"
									style={{ left: `${pct(range[0])}%`, right: `${100 - pct(range[1])}%` }}
								/>
								{([0, 1] as const).map((i) => (
									<div
										key={i}
										role="slider"
										tabIndex={disabled ? -1 : 0}
										aria-valuemin={i === 0 ? min : clamp(range[0] + minGap, min, max)}
										aria-valuemax={i === 0 ? clamp(range[1] - minGap, min, max) : max}
										aria-valuenow={range[i]}
										aria-valuetext={formatValue(range[i])}
										aria-label={handleNames[i]}
										// Sans nom composé (ni `label` ni `aria-label`), la poignée retombe sur
										// la source de nom du groupe plutôt que de rester anonyme.
										aria-labelledby={handleNames[i] ? undefined : labelledBy}
										aria-describedby={describedBy}
										aria-invalid={invalid}
										aria-orientation="horizontal"
										aria-disabled={disabled || undefined}
										aria-readonly={readOnly || undefined}
										className="camply-rangeslider__knob camply-focus-ring camply-focus-ring--raised"
										style={{ left: `${pct(range[i])}%` }}
										onPointerDown={onPointerDown(i)}
										onKeyDown={onKey(i)}
									/>
								))}
							</div>
						</>
					);
				}}
			</Field>
			<HiddenField name={name && `${name}-min`} value={range[0]} disabled={disabled} />
			<HiddenField name={name && `${name}-max`} value={range[1]} disabled={disabled} />
		</div>
	);
});

RangeSlider.displayName = "RangeSlider";
