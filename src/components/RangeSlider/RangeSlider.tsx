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
import { ratioToValue, snapToStep, valueToPercent } from "../../lib/sliderGeometry";
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
	/** Nom accessible de la poignée basse (défaut : "<label> minimum"). */
	minLabel?: string;
	/** Nom accessible de la poignée haute (défaut : "<label> maximum"). */
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
		showValue = true,
		formatValue = (v) => `${v}`,
		minGap = 0,
		disabled = false,
		name,
		required,
		readOnly = false,
		minLabel,
		maxLabel,
		className,
		"aria-label": ariaLabel,
		"aria-labelledby": ariaLabelledBy,
		...rest
	},
	ref,
) {
	const [range, setRange] = useControllable<RangeValue>(value, defaultValue, onChange);
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
		const big = (max - min) / 10;
		const current = range[index];
		let next: number;
		switch (e.key) {
			case "ArrowRight":
			case "ArrowUp":
				next = current + step;
				break;
			case "ArrowLeft":
			case "ArrowDown":
				next = current - step;
				break;
			case "PageUp":
				next = current + big;
				break;
			case "PageDown":
				next = current - big;
				break;
			case "Home":
				next = min;
				break;
			case "End":
				next = max;
				break;
			default:
				return;
		}
		e.preventDefault();
		setHandle(index, next);
	};

	const pct = (v: number) => valueToPercent(v, min, max);
	// Les deux poignées portent des noms distincts : un seul intitulé partagé les
	// rendrait indiscernables au lecteur d'écran.
	const base = label ?? ariaLabel;
	const handleNames: [string | undefined, string | undefined] = [
		minLabel ?? (base ? `${base} minimum` : undefined),
		maxLabel ?? (base ? `${base} maximum` : undefined),
	];

	return (
		<div
			ref={ref}
			{...rest}
			className={cn(
				"camply-rangeslider__root",
				disabled && "camply-rangeslider__disabled",
				className,
			)}
		>
			{(label || showValue) && (
				<div className={"camply-rangeslider__head"}>
					{label && (
						<span className={"camply-rangeslider__label"}>
							{label}
							{required && (
								<span aria-hidden="true" className={"camply-field__required"}>
									*
								</span>
							)}
						</span>
					)}
					{showValue && (
						<span className={"camply-rangeslider__value"}>
							{formatValue(range[0])} – {formatValue(range[1])}
						</span>
					)}
				</div>
			)}
			<div
				ref={trackRef}
				className={"camply-rangeslider__track"}
				onPointerMove={onPointerMove}
				onPointerUp={onPointerUp}
			>
				<div
					className={"camply-rangeslider__fill"}
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
						aria-labelledby={handleNames[i] ? undefined : ariaLabelledBy}
						aria-orientation="horizontal"
						aria-disabled={disabled || undefined}
						aria-readonly={readOnly || undefined}
						className={"camply-rangeslider__knob camply-focus-ring camply-focus-ring--raised"}
						style={{ left: `${pct(range[i])}%` }}
						onPointerDown={onPointerDown(i)}
						onKeyDown={onKey(i)}
					/>
				))}
			</div>
			{name && (
				<>
					<input type="hidden" name={`${name}-min`} value={range[0]} />
					<input type="hidden" name={`${name}-max`} value={range[1]} />
				</>
			)}
		</div>
	);
});
