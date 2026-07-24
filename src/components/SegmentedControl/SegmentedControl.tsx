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
import { nextRovingIndex } from "../../lib/rovingIndex";
import { useControllable } from "../../lib/useControllable";

export interface SegmentOption<T extends string = string> {
	value: T;
	label: string;
}

export interface SegmentedControlProps<T extends string = string>
	extends Omit<ComponentPropsWithoutRef<"div">, "onChange" | "defaultValue"> {
	options: SegmentOption<T>[];
	value?: T;
	defaultValue?: T;
	onChange?: (value: T) => void;
	size?: "sm" | "md";
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

	const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
		if (readOnly || options.length === 0) return;
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
			onKeyDown={onKeyDown}
		>
			{thumb && (
				<span
					aria-hidden="true"
					className={"camply-segmentedcontrol__thumb"}
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
			{name && <input type="hidden" name={name} value={current ?? ""} />}
		</div>
	);
});

/**
 * Groupe de segments exclusifs (pattern radiogroup : tabindex mouvant + flèches).
 * `forwardRef` efface le paramètre générique : on le restaure par un cast pour que
 * `T` continue d'être inféré depuis `options`.
 */
export const SegmentedControl = SegmentedControlBase as <T extends string = string>(
	props: SegmentedControlProps<T> & RefAttributes<HTMLDivElement>,
) => ReactNode;
