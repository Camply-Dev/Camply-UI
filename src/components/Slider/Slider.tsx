import {
	type CSSProperties,
	forwardRef,
	type KeyboardEvent,
	type PointerEvent,
	useCallback,
	useRef,
} from "react";
import { clamp } from "../../lib/clamp";
import { cn } from "../../lib/cn";
import { useControllable } from "../../lib/useControllable";

export interface SliderProps {
	value?: number;
	defaultValue?: number;
	onChange?: (value: number) => void;
	min?: number;
	max?: number;
	step?: number;
	label?: string;
	/** show the numeric value, optionally formatted */
	showValue?: boolean;
	formatValue?: (value: number) => string;
	disabled?: boolean;
	className?: string;
	style?: CSSProperties;
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
		className,
		style,
	},
	ref,
) {
	const [val, setVal] = useControllable<number>(value, defaultValue, onChange);
	const trackRef = useRef<HTMLDivElement>(null);
	const dragging = useRef(false);

	// Cale une valeur brute sur le pas le plus proche, puis la borne à [min, max].
	const snap = useCallback(
		(v: number) => {
			const stepped = Math.round((v - min) / step) * step + min;
			return clamp(stepped, min, max);
		},
		[min, max, step],
	);

	const setFromClientX = useCallback(
		(clientX: number) => {
			const el = trackRef.current;
			if (!el) return;
			const rect = el.getBoundingClientRect();
			const ratio = (clientX - rect.left) / rect.width;
			setVal(snap(min + ratio * (max - min)));
		},
		[snap, min, max, setVal],
	);

	const onPointerDown = (e: PointerEvent) => {
		if (disabled) return;
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
		if (disabled) return;
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
		setVal(snap(next));
	};

	const pct = ((val - min) / (max - min)) * 100;

	return (
		<div
			ref={ref}
			className={cn("camply-slider__root", disabled && "camply-slider__disabled", className)}
			style={style}
		>
			{(label || showValue) && (
				<div className={"camply-slider__head"}>
					{label && <span className={"camply-slider__label"}>{label}</span>}
					{showValue && <span className={"camply-slider__value"}>{formatValue(val)}</span>}
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
					aria-label={label}
					className={"camply-slider__knob"}
					style={{ left: `${pct}%` }}
					onKeyDown={onKeyDown}
				/>
			</div>
		</div>
	);
});
