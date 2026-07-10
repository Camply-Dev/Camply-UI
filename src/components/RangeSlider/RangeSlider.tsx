import {
	type CSSProperties,
	forwardRef,
	type KeyboardEvent,
	type PointerEvent,
	useCallback,
	useRef,
} from "react";
import { cn } from "../../lib/cn";
import { useControllable } from "../../lib/useControllable";

export type RangeValue = [number, number];

export interface RangeSliderProps {
	value?: RangeValue;
	defaultValue?: RangeValue;
	onChange?: (value: RangeValue) => void;
	min?: number;
	max?: number;
	step?: number;
	label?: string;
	showValue?: boolean;
	formatValue?: (value: number) => string;
	/** keep at least this gap between the two handles */
	minGap?: number;
	disabled?: boolean;
	className?: string;
	style?: CSSProperties;
}

/** Dual-handle slider producing a [min, max] range. Handles can't cross;
 *  keyboard-accessible on each thumb. */
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
		className,
		style,
	},
	ref,
) {
	const [range, setRange] = useControllable<RangeValue>(value, defaultValue, onChange);
	const trackRef = useRef<HTMLDivElement>(null);
	const dragging = useRef<0 | 1 | null>(null);

	const clamp = useCallback(
		(v: number) => {
			const stepped = Math.round((v - min) / step) * step + min;
			return Math.max(min, Math.min(max, stepped));
		},
		[min, max, step],
	);

	const setHandle = useCallback(
		(index: 0 | 1, raw: number) => {
			const v = clamp(raw);
			const next: RangeValue = [range[0], range[1]];
			if (index === 0) next[0] = Math.min(v, range[1] - minGap);
			else next[1] = Math.max(v, range[0] + minGap);
			setRange(next);
		},
		[clamp, range, minGap, setRange],
	);

	const valueFromX = useCallback(
		(clientX: number) => {
			const el = trackRef.current;
			if (!el) return min;
			const rect = el.getBoundingClientRect();
			const ratio = (clientX - rect.left) / rect.width;
			return min + ratio * (max - min);
		},
		[min, max],
	);

	const onPointerDown = (index: 0 | 1) => (e: PointerEvent) => {
		if (disabled) return;
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
		if (disabled) return;
		let delta = 0;
		if (e.key === "ArrowRight" || e.key === "ArrowUp") delta = step;
		else if (e.key === "ArrowLeft" || e.key === "ArrowDown") delta = -step;
		else return;
		e.preventDefault();
		setHandle(index, range[index] + delta);
	};

	const pct = (v: number) => ((v - min) / (max - min)) * 100;

	return (
		<div
			ref={ref}
			className={cn(
				"camply-rangeslider__root",
				disabled && "camply-rangeslider__disabled",
				className,
			)}
			style={style}
		>
			{(label || showValue) && (
				<div className={"camply-rangeslider__head"}>
					{label && <span className={"camply-rangeslider__label"}>{label}</span>}
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
				{[0, 1].map((i) => (
					<div
						key={i}
						role="slider"
						tabIndex={disabled ? -1 : 0}
						aria-valuemin={min}
						aria-valuemax={max}
						aria-valuenow={range[i as 0 | 1]}
						aria-label={label ? `${label} ${i === 0 ? "minimum" : "maximum"}` : undefined}
						className={"camply-rangeslider__knob"}
						style={{ left: `${pct(range[i as 0 | 1])}%` }}
						onPointerDown={onPointerDown(i as 0 | 1)}
						onKeyDown={onKey(i as 0 | 1)}
					/>
				))}
			</div>
		</div>
	);
});
