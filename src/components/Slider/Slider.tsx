import {
	type ComponentPropsWithoutRef,
	forwardRef,
	type KeyboardEvent,
	type PointerEvent,
	useCallback,
	useRef,
} from "react";
import { cn } from "../../lib/cn";
import { ratioToValue, snapToStep, valueToPercent } from "../../lib/sliderGeometry";
import { useControllable } from "../../lib/useControllable";
import { useId } from "../../lib/useId";

export interface SliderProps
	extends Omit<ComponentPropsWithoutRef<"div">, "onChange" | "defaultValue"> {
	value?: number;
	defaultValue?: number;
	onChange?: (value: number) => void;
	min?: number;
	max?: number;
	step?: number;
	label?: string;
	showValue?: boolean;
	formatValue?: (value: number) => string;
	disabled?: boolean;
	/** Nom soumis avec le formulaire : la valeur part dans un <input type="hidden">. */
	name?: string;
	/**
	 * Marque le champ obligatoire : astérisque à côté du label. ARIA n'autorise pas
	 * aria-required sur role="slider" et un slider porte toujours une valeur — la
	 * prop existe pour l'alignement visuel avec les autres champs.
	 */
	required?: boolean;
	/** Valeur figée : la poignée reste focusable mais n'accepte plus de modification. */
	readOnly?: boolean;
}

export const Slider = forwardRef<HTMLDivElement, SliderProps>(function Slider(
	{
		value,
		defaultValue = 50,
		onChange,
		min = 0,
		max = 100,
		step = 1,
		label,
		showValue = true,
		formatValue = (v) => `${v}`,
		disabled = false,
		name,
		required,
		readOnly = false,
		className,
		"aria-label": ariaLabel,
		"aria-labelledby": ariaLabelledBy,
		...rest
	},
	ref,
) {
	const [val, setVal] = useControllable<number>(value, defaultValue, onChange);
	const trackRef = useRef<HTMLDivElement>(null);
	const dragging = useRef(false);
	const labelId = useId("camply-slider-label");
	const locked = disabled || readOnly;

	const setFromClientX = useCallback(
		(clientX: number) => {
			const el = trackRef.current;
			if (!el) return;
			const rect = el.getBoundingClientRect();
			setVal(snapToStep(ratioToValue(clientX, rect, min, max), min, max, step));
		},
		[min, max, step, setVal],
	);

	const onPointerDown = (e: PointerEvent) => {
		if (locked) return;
		dragging.current = true;
		(e.target as HTMLElement).setPointerCapture(e.pointerId);
		setFromClientX(e.clientX);
	};
	const onPointerMove = (e: PointerEvent) => {
		if (!dragging.current) return;
		setFromClientX(e.clientX);
	};
	const onPointerUp = (e: PointerEvent) => {
		dragging.current = false;
		(e.target as HTMLElement).releasePointerCapture?.(e.pointerId);
	};

	const onKeyDown = (e: KeyboardEvent) => {
		if (locked) return;
		const big = (max - min) / 10;
		let next = val;
		switch (e.key) {
			case "ArrowRight":
			case "ArrowUp":
				next = val + step;
				break;
			case "ArrowLeft":
			case "ArrowDown":
				next = val - step;
				break;
			case "PageUp":
				next = val + big;
				break;
			case "PageDown":
				next = val - big;
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
		setVal(snapToStep(next, min, max, step));
	};

	const pct = valueToPercent(val, min, max);
	const text = formatValue(val);

	return (
		<div
			ref={ref}
			{...rest}
			className={cn("camply-slider__root", disabled && "camply-slider__disabled", className)}
		>
			{(label || showValue) && (
				<div className={"camply-slider__head"}>
					{label && (
						<span id={labelId} className={"camply-slider__label"}>
							{label}
							{required && (
								<span aria-hidden="true" className={"camply-field__required"}>
									*
								</span>
							)}
						</span>
					)}
					{showValue && <span className={"camply-slider__value"}>{text}</span>}
				</div>
			)}
			<div
				ref={trackRef}
				className={"camply-slider__track"}
				onPointerDown={onPointerDown}
				onPointerMove={onPointerMove}
				onPointerUp={onPointerUp}
			>
				<div className={"camply-slider__fill"} style={{ width: `${pct}%` }} />
				<div
					role="slider"
					tabIndex={disabled ? -1 : 0}
					aria-valuemin={min}
					aria-valuemax={max}
					aria-valuenow={val}
					aria-valuetext={text}
					aria-label={ariaLabel}
					aria-labelledby={label ? labelId : ariaLabelledBy}
					aria-orientation="horizontal"
					aria-disabled={disabled || undefined}
					aria-readonly={readOnly || undefined}
					className={"camply-slider__knob camply-focus-ring camply-focus-ring--raised"}
					style={{ left: `${pct}%` }}
					onKeyDown={onKeyDown}
				/>
			</div>
			{name && <input type="hidden" name={name} value={val} />}
		</div>
	);
});
