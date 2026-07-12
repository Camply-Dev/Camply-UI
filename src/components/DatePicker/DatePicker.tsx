import { type CSSProperties, useCallback, useMemo, useRef, useState } from "react";
import { cn } from "../../lib/cn";
import { Calendar, ChevronLeft, ChevronRight } from "../../lib/icons";
import { Portal } from "../../lib/Portal";
import { useAnchor } from "../../lib/useAnchor";
import { useControllable } from "../../lib/useControllable";
import { useDismiss } from "../../lib/useDismiss";
import { useId } from "../../lib/useId";

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

const pad2 = (n: number) => String(n).padStart(2, "0");
/** Date → "JJ/MM/AAAA" (format de saisie). */
const formatInput = (d: Date) => `${pad2(d.getDate())}/${pad2(d.getMonth() + 1)}/${d.getFullYear()}`;

/** Masque de saisie JJ/MM/AAAA : "/" insérés automatiquement. Respecte les "/"
 *  déjà présents comme frontières fermes : seul le dernier segment (celui qu'on
 *  tape) peut déborder, les segments figés sont tronqués sans décaler les autres —
 *  éditer le mois ne corrompt donc plus l'année. */
function maskDate(raw: string): string {
	const segs = raw.split("/");
	const maxes = [2, 2, 4];
	const out = ["", "", ""];
	let carry = "";
	for (let i = 0; i < 3; i++) {
		let seg = carry + (segs[i] ?? "").replace(/\D/g, "");
		carry = "";
		const isLast = i >= segs.length - 1;
		if (seg.length > maxes[i]) {
			// Segment actif → l'excédent déborde sur le suivant ; segment figé → ignoré.
			if (isLast) carry = seg.slice(maxes[i]);
			seg = seg.slice(0, maxes[i]);
		}
		out[i] = seg;
	}
	let end = 3;
	while (end > 0 && out[end - 1] === "") end--;
	return out.slice(0, end).join("/");
}

/** Parse "JJ/MM/AAAA" (année sur 4 chiffres) → Date valide, sinon null (rejette 31/02…). */
function parseDate(text: string): Date | null {
	const m = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/.exec(text.trim());
	if (!m) return null;
	const day = +m[1];
	const month = +m[2];
	const year = +m[3];
	const d = new Date(year, month - 1, day);
	if (d.getFullYear() !== year || d.getMonth() !== month - 1 || d.getDate() !== day) return null;
	return d;
}

// 12 années par page, alignées (…2012–2023, 2024–2035…).
const YEAR_PAGE = 12;
const yearPageStart = (year: number) => Math.floor(year / YEAR_PAGE) * YEAR_PAGE;

/** Date field with a portalled month calendar. Navigate months with the arrows,
 *  jump to any year via the year grid (click the month/year label), pick a day
 *  (or a start/end range with mode="range"), respects min/max. In single mode the
 *  field is typable in JJ/MM/AAAA. Fully controllable. */
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
	// Saisie éditable (mode single) : null = affiche la date formatée ; sinon texte tapé.
	const [draft, setDraft] = useState<string | null>(null);
	// Vue de sélection d'année (grille) vs. calendrier des jours.
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
		setDraft(null);
		if (mode === "single") {
			setSelected(d);
			setOpen(false);
			return;
		}
		// Plage : 1er clic = début ; clic avant/sur le début = nouveau début ;
		// clic après = fin (et fermeture) ; recommencer une fois complète.
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

	// Ouverture / synchro de la vue sur la valeur courante.
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

	// Saisie éditable JJ/MM/AAAA (mode single) : masque + sélection si date valide.
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
		<div className={cn("camply-datepicker__root", className)} style={style}>
			{label && <span className={"camply-datepicker__label"}>{label}</span>}
			<div
				ref={triggerRef}
				className={cn(
					"camply-datepicker__trigger",
					open && "camply-datepicker__open",
					disabled && "camply-datepicker__disabled",
				)}
			>
				<button
					type="button"
					disabled={disabled}
					aria-haspopup="dialog"
					aria-expanded={open}
					aria-controls={popId}
					aria-label="Ouvrir le calendrier"
					className={"camply-datepicker__calBtn"}
					onClick={toggleCalendar}
				>
					<Calendar size={16} />
				</button>
				{mode === "single" ? (
					<input
						className={"camply-datepicker__input"}
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
								className={"camply-datepicker__nav"}
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
								className={"camply-datepicker__nav"}
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
								className={"camply-datepicker__todayBtn"}
								onClick={() => {
									setYearView(false);
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
