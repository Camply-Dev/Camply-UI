import { type CSSProperties, useCallback, useMemo, useRef, useState } from "react";
import { cn } from "../../lib/cn";
import { Calendar, ChevronLeft, ChevronRight } from "../../lib/icons";
import { Portal } from "../../lib/Portal";
import { useAnchor } from "../../lib/useAnchor";
import { useControllable, useId } from "../../lib/useControllable";
import { useDismiss } from "../../lib/useDismiss";

export type DateRange = [Date | null, Date | null];

export interface DatePickerProps {
	/** date simple (mode "single") */
	value?: Date | null;
	defaultValue?: Date | null;
	onChange?: (date: Date | null) => void;
	/** plage [début, fin] (mode "range") */
	rangeValue?: DateRange;
	defaultRangeValue?: DateRange;
	onRangeChange?: (range: DateRange) => void;
	/** date simple (défaut) ou plage de dates */
	mode?: "single" | "range";
	min?: Date;
	max?: Date;
	placeholder?: string;
	label?: string;
	disabled?: boolean;
	/** Intl locale for month/day names */
	locale?: string;
	/** first day of week: 0 = Sunday, 1 = Monday (default) */
	weekStartsOn?: 0 | 1;
	className?: string;
	style?: CSSProperties;
}

const isSameDay = (a: Date, b: Date) =>
	a.getFullYear() === b.getFullYear() &&
	a.getMonth() === b.getMonth() &&
	a.getDate() === b.getDate();

const startOfDay = (d: Date) => new Date(d.getFullYear(), d.getMonth(), d.getDate());

/** Date field with a portalled month calendar. Navigate months with the
 *  arrows, pick a day (or a start/end range with mode="range"), respects
 *  min/max. Fully controllable. */
export function DatePicker({
	value,
	defaultValue = null,
	onChange,
	rangeValue,
	defaultRangeValue = [null, null],
	onRangeChange,
	mode = "single",
	min,
	max,
	placeholder = "Choisir une date",
	label,
	disabled = false,
	locale = "fr-FR",
	weekStartsOn = 1,
	className,
	style,
}: DatePickerProps) {
	const [selected, setSelected] = useControllable<Date | null>(value, defaultValue, onChange);
	const [range, setRange] = useControllable<DateRange>(
		rangeValue,
		defaultRangeValue,
		onRangeChange,
	);
	const [open, setOpen] = useState(false);
	const [view, setView] = useState<Date>(() => selected ?? range[0] ?? new Date());

	const triggerRef = useRef<HTMLButtonElement>(null);
	const popRef = useRef<HTMLDivElement>(null);
	const popId = useId("datepicker");

	const floatStyle = useAnchor(triggerRef, popRef, open, {
		placement: "bottom-start",
		gap: 6,
		constrainHeight: true,
		minHeight: 300,
	});
	const close = useCallback(() => setOpen(false), []);
	useDismiss(open, close, [triggerRef, popRef]);

	const weekdays = useMemo(() => {
		const base = new Date(2023, 0, 1); // a Sunday
		const names: string[] = [];
		for (let i = 0; i < 7; i++) {
			const d = new Date(base);
			d.setDate(base.getDate() + ((i + weekStartsOn) % 7));
			names.push(new Intl.DateTimeFormat(locale, { weekday: "short" }).format(d).replace(".", ""));
		}
		return names;
	}, [locale, weekStartsOn]);

	const grid = useMemo(() => {
		const year = view.getFullYear();
		const month = view.getMonth();
		const first = new Date(year, month, 1);
		const offset = (first.getDay() - weekStartsOn + 7) % 7;
		const start = new Date(year, month, 1 - offset);
		return Array.from({ length: 42 }, (_, i) => {
			const d = new Date(start);
			d.setDate(start.getDate() + i);
			return d;
		});
	}, [view, weekStartsOn]);

	const outOfRange = (d: Date) =>
		(min && startOfDay(d) < startOfDay(min)) || (max && startOfDay(d) > startOfDay(max));

	const monthLabel = new Intl.DateTimeFormat(locale, {
		month: "long",
		year: "numeric",
	}).format(view);

	const fmt = (d: Date) =>
		new Intl.DateTimeFormat(locale, { day: "2-digit", month: "long", year: "numeric" }).format(d);

	const [rangeStart, rangeEnd] = range;

	const pick = (raw: Date) => {
		if (outOfRange(raw)) return;
		const d = startOfDay(raw);
		if (mode === "single") {
			setSelected(d);
			setOpen(false);
			return;
		}
		// Plage : 1er clic = début ; clic avant le début = nouveau début ;
		// clic après = fin (et fermeture) ; recommencer une fois complète.
		if (!rangeStart || rangeEnd) {
			setRange([d, null]);
		} else if (d < rangeStart) {
			setRange([d, null]);
		} else if (isSameDay(d, rangeStart)) {
			setRange([d, null]);
		} else {
			setRange([rangeStart, d]);
			setOpen(false);
		}
	};

	const clear = () => {
		if (mode === "single") setSelected(null);
		else setRange([null, null]);
		setOpen(false);
	};

	const shiftMonth = (delta: number) =>
		setView(new Date(view.getFullYear(), view.getMonth() + delta, 1));

	const today = new Date();

	const display =
		mode === "single"
			? selected
				? fmt(selected)
				: placeholder
			: rangeStart && rangeEnd
				? `${fmt(rangeStart)} — ${fmt(rangeEnd)}`
				: rangeStart
					? `${fmt(rangeStart)} — …`
					: placeholder;

	const hasValue = mode === "single" ? selected != null : rangeStart != null;

	return (
		<div className={cn("camply-datepicker__root", className)} style={style}>
			{label && <span className={"camply-datepicker__label"}>{label}</span>}
			<button
				ref={triggerRef}
				type="button"
				disabled={disabled}
				aria-haspopup="dialog"
				aria-expanded={open}
				aria-controls={popId}
				className={cn("camply-datepicker__trigger", open && "camply-datepicker__open")}
				onClick={() => {
					const focusDate = mode === "single" ? selected : rangeStart;
					if (focusDate) setView(focusDate);
					setOpen((o) => !o);
				}}
			>
				<Calendar size={16} className={"camply-datepicker__calIcon"} />
				<span
					className={cn("camply-datepicker__value", !hasValue && "camply-datepicker__placeholder")}
				>
					{display}
				</span>
			</button>

			{open && (
				<Portal>
					<div
						ref={popRef}
						id={popId}
						role="dialog"
						aria-label="Calendrier"
						className={"camply-datepicker__pop"}
						style={{ ...floatStyle, zIndex: "var(--camply-z-dropdown)" as never }}
					>
						<div className={"camply-datepicker__head"}>
							<button
								type="button"
								className={"camply-datepicker__nav"}
								aria-label="Mois précédent"
								onClick={() => shiftMonth(-1)}
							>
								<ChevronLeft size={16} />
							</button>
							<span className={"camply-datepicker__monthLabel"}>{monthLabel}</span>
							<button
								type="button"
								className={"camply-datepicker__nav"}
								aria-label="Mois suivant"
								onClick={() => shiftMonth(1)}
							>
								<ChevronRight size={16} />
							</button>
						</div>

						<div className={"camply-datepicker__weekdays"}>
							{weekdays.map((w) => (
								<span key={w} className={"camply-datepicker__weekday"}>
									{w}
								</span>
							))}
						</div>

						<div className={"camply-datepicker__days"}>
							{grid.map((d) => {
								const muted = d.getMonth() !== view.getMonth();
								const disabledDay = outOfRange(d);
								const isToday = isSameDay(d, today);
								const isSel =
									mode === "single"
										? selected && isSameDay(d, selected)
										: (rangeStart && isSameDay(d, rangeStart)) ||
											(rangeEnd && isSameDay(d, rangeEnd));
								const inRange =
									mode === "range" &&
									rangeStart &&
									rangeEnd &&
									startOfDay(d) > rangeStart &&
									startOfDay(d) < rangeEnd;
								return (
									<button
										key={d.getTime()}
										type="button"
										disabled={disabledDay}
										className={cn(
											"camply-datepicker__day",
											muted && "camply-datepicker__muted",
											isToday && "camply-datepicker__today",
											inRange && "camply-datepicker__inRange",
											isSel && "camply-datepicker__selected",
										)}
										onClick={() => pick(d)}
									>
										{d.getDate()}
									</button>
								);
							})}
						</div>

						<div className={"camply-datepicker__footer"}>
							<button
								type="button"
								className={"camply-datepicker__todayBtn"}
								onClick={() => {
									setView(new Date());
									pick(new Date());
								}}
							>
								Aujourd'hui
							</button>
							{hasValue && (
								<button type="button" className={"camply-datepicker__clearBtn"} onClick={clear}>
									Effacer
								</button>
							)}
						</div>
					</div>
				</Portal>
			)}
		</div>
	);
}
