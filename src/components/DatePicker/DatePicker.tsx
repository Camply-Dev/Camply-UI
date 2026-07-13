import { type CSSProperties, useCallback, useMemo, useRef, useState } from "react";
import { cn } from "../../lib/cn";
import {
	buildMonthGrid,
	formatInput,
	isSameDay,
	maskDate,
	parseDate,
	startOfDay,
	weekdayNames,
	YEAR_PAGE,
	yearPageStart,
} from "../../lib/dateField";
import { Calendar, ChevronLeft, ChevronRight } from "../../lib/icons";
import { Portal } from "../../lib/Portal";
import { useAnchor } from "../../lib/useAnchor";
import { useControllable } from "../../lib/useControllable";
import { useDismiss } from "../../lib/useDismiss";
import { useId } from "../../lib/useId";

export type DateRange = [Date | null, Date | null];

export interface DatePickerProps {
	value?: Date | null;
	defaultValue?: Date | null;
	onChange?: (date: Date | null) => void;
	rangeValue?: DateRange;
	defaultRangeValue?: DateRange;
	onRangeChange?: (range: DateRange) => void;
	mode?: "single" | "range";
	min?: Date;
	max?: Date;
	placeholder?: string;
	label?: string;
	disabled?: boolean;
	locale?: string;
	weekStartsOn?: 0 | 1;
	className?: string;
	style?: CSSProperties;
}

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
	const [draft, setDraft] = useState<string | null>(null);
	const [yearView, setYearView] = useState(false);

	const triggerRef = useRef<HTMLDivElement>(null);
	const popRef = useRef<HTMLDivElement>(null);
	const popId = useId("datepicker");

	const floatStyle = useAnchor(triggerRef, popRef, open, {
		placement: "bottom-start",
		gap: 6,
		constrainHeight: true,
		minHeight: 300,
	});
	const close = useCallback(() => {
		setOpen(false);
		setYearView(false);
	}, []);
	useDismiss(open, close, [triggerRef, popRef]);

	const weekdays = useMemo(() => weekdayNames(locale, weekStartsOn), [locale, weekStartsOn]);
	const grid = useMemo(() => buildMonthGrid(view, weekStartsOn), [view, weekStartsOn]);

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
		setDraft(null);
		if (mode === "single") {
			setSelected(d);
			setOpen(false);
			return;
		}
		if (!rangeStart || rangeEnd || d <= startOfDay(rangeStart)) {
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

	const shiftPage = (delta: number) =>
		setView(
			yearView
				? new Date(view.getFullYear() + delta * YEAR_PAGE, view.getMonth(), 1)
				: new Date(view.getFullYear(), view.getMonth() + delta, 1),
		);

	const syncView = () => {
		const focus = mode === "single" ? selected : range[0];
		if (focus) setView(focus);
	};
	const openCalendar = () => {
		if (disabled) return;
		syncView();
		setYearView(false);
		setOpen(true);
	};
	const toggleCalendar = () => (open ? close() : openCalendar());

	const onType = (raw: string) => {
		const masked = maskDate(raw);
		setDraft(masked);
		const d = parseDate(masked);
		if (d && !outOfRange(d)) {
			setSelected(startOfDay(d));
			setView(d);
		}
	};

	const pickYear = (year: number) => {
		setView(new Date(year, view.getMonth(), 1));
		setYearView(false);
	};

	const today = new Date();
	const yearBase = yearPageStart(view.getFullYear());
	const years = Array.from({ length: YEAR_PAGE }, (_, i) => yearBase + i);
	const yearDisabled = (y: number) =>
		(min != null && y < min.getFullYear()) || (max != null && y > max.getFullYear());

	let display = placeholder;
	if (mode === "single") {
		if (selected) display = fmt(selected);
	} else if (rangeStart) {
		display = rangeEnd ? `${fmt(rangeStart)} — ${fmt(rangeEnd)}` : `${fmt(rangeStart)} — …`;
	}

	const hasValue = mode === "single" ? selected != null : rangeStart != null;

	return (
		<div className={cn("camply-field", className)} style={style}>
			{label && <span className={"camply-field__label"}>{label}</span>}
			<div
				ref={triggerRef}
				className={cn(
					"camply-field-shell",
					open && "camply-field-shell--open",
					disabled && "camply-field-shell--disabled",
				)}
			>
				<button
					type="button"
					disabled={disabled}
					aria-haspopup="dialog"
					aria-expanded={open}
					aria-controls={popId}
					aria-label="Ouvrir le calendrier"
					className={"camply-icon-ghost-btn"}
					onClick={toggleCalendar}
				>
					<Calendar size={16} />
				</button>
				{mode === "single" ? (
					<input
						className={"camply-field-control"}
						value={draft ?? (selected ? formatInput(selected) : "")}
						placeholder="JJ/MM/AAAA"
						inputMode="numeric"
						disabled={disabled}
						aria-label={label ?? "Date"}
						onChange={(e) => onType(e.target.value)}
						onFocus={openCalendar}
						onBlur={() => setDraft(null)}
					/>
				) : (
					<button
						type="button"
						disabled={disabled}
						className={cn(
							"camply-field-control",
							"camply-datepicker__valueBtn",
							!hasValue && "camply-datepicker__placeholder",
						)}
						onClick={toggleCalendar}
					>
						{display}
					</button>
				)}
			</div>

			{open && (
				<Portal>
					<div
						ref={popRef}
						id={popId}
						role="dialog"
						aria-label="Calendrier"
						className="camply-floating-surface camply-datepicker__pop"
						style={floatStyle}
					>
						<div className={"camply-datepicker__head"}>
							<button
								type="button"
								className={"camply-round-btn camply-focus-ring"}
								aria-label={yearView ? "Années précédentes" : "Mois précédent"}
								onClick={() => shiftPage(-1)}
							>
								<ChevronLeft size={16} />
							</button>
							<button
								type="button"
								className={"camply-datepicker__monthLabel"}
								aria-label="Choisir l'année"
								aria-expanded={yearView}
								onClick={() => setYearView((y) => !y)}
							>
								{yearView ? `${yearBase} – ${yearBase + YEAR_PAGE - 1}` : monthLabel}
							</button>
							<button
								type="button"
								className={"camply-round-btn camply-focus-ring"}
								aria-label={yearView ? "Années suivantes" : "Mois suivant"}
								onClick={() => shiftPage(1)}
							>
								<ChevronRight size={16} />
							</button>
						</div>

						{yearView ? (
							<div className={"camply-datepicker__years"}>
								{years.map((y) => (
									<button
										key={y}
										type="button"
										disabled={yearDisabled(y)}
										className={cn(
											"camply-picker-cell",
											"camply-datepicker__year",
											y === view.getFullYear() && "camply-datepicker__yearCurrent",
										)}
										onClick={() => pickYear(y)}
									>
										{y}
									</button>
								))}
							</div>
						) : (
							<>
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
													"camply-picker-cell",
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
							</>
						)}

						<div className={"camply-datepicker__footer"}>
							<button
								type="button"
								className={"camply-text-btn camply-datepicker__todayBtn"}
								onClick={() => {
									setYearView(false);
									setView(new Date());
									pick(new Date());
								}}
							>
								Aujourd'hui
							</button>
							{hasValue && (
								<button
									type="button"
									className={"camply-text-btn camply-datepicker__clearBtn"}
									onClick={clear}
								>
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
