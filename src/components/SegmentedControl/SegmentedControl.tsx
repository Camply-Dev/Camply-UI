import { type CSSProperties, useLayoutEffect, useRef, useState } from "react";
import { cn } from "../../lib/cn";
import { useControllable } from "../../lib/useControllable";

export interface SegmentOption<T extends string = string> {
	value: T;
	label: string;
}

export interface SegmentedControlProps<T extends string = string> {
	options: SegmentOption<T>[];
	value?: T;
	defaultValue?: T;
	onChange?: (value: T) => void;
	size?: "sm" | "md";
	fullWidth?: boolean;
	className?: string;
	style?: CSSProperties;
}

export function SegmentedControl<T extends string = string>({
	options,
	value,
	defaultValue,
	onChange,
	size = "md",
	fullWidth,
	className,
	style,
}: SegmentedControlProps<T>) {
	const [current, setCurrent] = useControllable<T>(
		value,
		defaultValue ?? options[0]?.value,
		onChange,
	);
	const activeIndex = Math.max(
		0,
		options.findIndex((o) => o.value === current),
	);

	// La pilule est positionnée sur le bouton actif MESURÉ (offsetLeft/Width),
	// pas sur une fraction calculée — les segments peuvent avoir des largeurs
	// différentes sans jamais désaligner la pilule.
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

	return (
		<div
			role="tablist"
			className={cn(
				"camply-segmentedcontrol__root",
				`camply-segmentedcontrol__${size}`,
				fullWidth && "camply-segmentedcontrol__fullWidth",
				className,
			)}
			style={style}
		>
			{thumb && (
				<span
					aria-hidden="true"
					className={"camply-segmentedcontrol__thumb"}
					style={{ left: thumb.left, width: thumb.width }}
				/>
			)}
			{options.map((opt, i) => {
				const active = current === opt.value;
				return (
					<button
						key={opt.value}
						ref={(el) => {
							buttonRefs.current[i] = el;
						}}
						type="button"
						role="tab"
						aria-selected={active}
						className={cn(
							"camply-segmentedcontrol__segment",
							active && "camply-segmentedcontrol__active",
						)}
						onClick={() => setCurrent(opt.value)}
					>
						{opt.label}
					</button>
				);
			})}
		</div>
	);
}
