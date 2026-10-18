import {
	type FocusEvent,
	type ForwardedRef,
	forwardRef,
	type HTMLAttributes,
	type KeyboardEvent,
	useCallback,
	useEffect,
	useMemo,
	useRef,
	useState,
} from "react";
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
import { Field, idRefs } from "../../lib/Field";
import { trapTab } from "../../lib/focusTrap";
import { FormReset, HiddenField } from "../../lib/HiddenField";
import { useLabels, useLocale } from "../../lib/i18n";
import { Calendar, ChevronLeft, ChevronRight } from "../../lib/icons";
import { useMergedRefs } from "../../lib/mergeRefs";
import { Portal } from "../../lib/Portal";
import { useAnchor } from "../../lib/useAnchor";
import { useControllable } from "../../lib/useControllable";
import { useDismiss } from "../../lib/useDismiss";
import { useId } from "../../lib/useId";

export type DateRange = [Date | null, Date | null];

/** Valeur soumise : date locale en ISO court (YYYY-MM-DD), sans décalage UTC. */
const toISODate = (d: Date) =>
	`${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;

const addDays = (d: Date, n: number) => new Date(d.getFullYear(), d.getMonth(), d.getDate() + n);

/** `n` mois plus loin, le jour ramené au dernier du mois (31 janvier + 1 mois → 28 ou 29 février). */
const addMonths = (d: Date, n: number) => {
	const last = new Date(d.getFullYear(), d.getMonth() + n + 1, 0).getDate();
	return new Date(d.getFullYear(), d.getMonth() + n, Math.min(d.getDate(), last));
};

/** Déplacement du jour actif au clavier (pattern APG « Date Picker Dialog »). */
function dayFromKey(e: KeyboardEvent, day: Date, weekStart: number): Date | null {
	const column = (day.getDay() - weekStart + 7) % 7;
	switch (e.key) {
		case "ArrowLeft":
			return addDays(day, -1);
		case "ArrowRight":
			return addDays(day, 1);
		case "ArrowUp":
			return addDays(day, -7);
		case "ArrowDown":
			return addDays(day, 7);
		case "Home":
			return addDays(day, -column);
		case "End":
			return addDays(day, 6 - column);
		case "PageUp":
			return addMonths(day, e.shiftKey ? -12 : -1);
		case "PageDown":
			return addMonths(day, e.shiftKey ? 12 : 1);
		default:
			return null;
	}
}

interface DatePickerBaseProps
	extends Omit<HTMLAttributes<HTMLDivElement>, "onChange" | "defaultValue"> {
	min?: Date;
	max?: Date;
	placeholder?: string;
	label?: string;
	/** Texte d'aide affiché sous le champ. */
	hint?: string;
	/** Message d'erreur : remplace l'aide, colore le champ et pose aria-invalid. */
	error?: string;
	/**
	 * Nom soumis avec le formulaire, via un <input type="hidden"> au format
	 * YYYY-MM-DD. En mode `range`, DEUX inputs cachés partagent ce `name`, dans
	 * l'ordre [début, fin] — côté serveur : `FormData.getAll(name)`.
	 */
	name?: string;
	/**
	 * Marque le champ obligatoire (astérisque dans le label). En mode `single` la
	 * validation native s'applique, l'input étant réel ; en mode `range` le
	 * contrôle est un <button> (rôle qui n'admet pas aria-required) : signaler
	 * l'absence de valeur passe alors par `error`.
	 */
	required?: boolean;
	disabled?: boolean;
	/** Locale Intl ; par défaut celle du CamplyProvider. */
	locale?: string;
	/** Premier jour de semaine (0 = dimanche). Par défaut : celui de la locale. */
	weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
}

/** Mode par défaut : une date unique, saisissable au clavier. */
interface DatePickerSingleProps {
	mode?: "single";
	value?: Date | null;
	defaultValue?: Date | null;
	onChange?: (date: Date | null) => void;
}

/** Mode plage : début et fin, choisis au calendrier. */
interface DatePickerRangeProps {
	mode: "range";
	rangeValue?: DateRange;
	defaultRangeValue?: DateRange;
	onRangeChange?: (range: DateRange) => void;
}

/**
 * Les deux jeux valeur/rappel s'excluent, `mode` les discrimine : le compilateur
 * refuse `<DatePicker mode="single" rangeValue={…} />`, qui ignorerait la plage.
 */
export type DatePickerProps = DatePickerBaseProps & (DatePickerSingleProps | DatePickerRangeProps);

/** Vue interne : le corps lit les deux jeux, l'exclusion ne vaut qu'à l'appel. */
type DatePickerAllProps = DatePickerBaseProps &
	Omit<DatePickerSingleProps, "mode"> &
	Omit<DatePickerRangeProps, "mode"> & { mode?: "single" | "range" };

/** L'API est jeune : méthode partout depuis 2023, propriété sur les Safari d'avant. */
type WeekInfo = { firstDay: number };
type LocaleWithWeekInfo = Intl.Locale & { getWeekInfo?: () => WeekInfo; weekInfo?: WeekInfo };

/** Premier jour de semaine de la locale ; lundi quand l'information n'est pas exposée. */
function firstDayOfWeek(locale: string): number {
	try {
		const loc = new Intl.Locale(locale) as LocaleWithWeekInfo;
		const info = loc.getWeekInfo?.() ?? loc.weekInfo;
		return info ? info.firstDay % 7 : 1; // firstDay : 1 = lundi … 7 = dimanche
	} catch {
		return 1;
	}
}

/**
 * Champ date : saisie au clavier en mode « single », calendrier ancré dans les
 * deux modes. La ref vise le conteneur du champ — celui qui porte `{...rest}` et
 * que décrit `HTMLAttributes<HTMLDivElement>` —, pas le contrôle focusable, qui
 * change de nature selon `mode`.
 * Pas de cast sur l'export, contrairement aux composants génériques :
 * `forwardRef` distribue l'union discriminée sur `mode`, qui reste donc
 * vérifiée à l'appel.
 */
export const DatePicker = forwardRef(function DatePicker(
	props: DatePickerProps,
	ref: ForwardedRef<HTMLDivElement>,
) {
	const {
		value,
		defaultValue = null,
		onChange,
		rangeValue,
		defaultRangeValue = [null, null],
		onRangeChange,
		mode = "single",
		min,
		max,
		placeholder,
		label,
		hint,
		error,
		name,
		required,
		disabled = false,
		locale: localeProp,
		weekStartsOn,
		id,
		className,
		style,
		...rest
	} = props as DatePickerAllProps;
	const labels = useLabels();
	const contextLocale = useLocale();
	const locale = localeProp ?? contextLocale;
	const placeholderText = placeholder ?? labels.datePlaceholder;
	// Mémoïsé : `new Intl.Locale` à chaque rendu pour une valeur qui ne bouge jamais.
	const weekStart = useMemo(() => weekStartsOn ?? firstDayOfWeek(locale), [weekStartsOn, locale]);

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
	// Le jour actif de la grille : le seul atteint par Tab (tabindex mouvant), que
	// les flèches déplacent. `focusTarget` demande d'y porter le focus après rendu
	// (un objet neuf par demande : l'effet se relance même vers le même jour).
	const [focusDay, setFocusDay] = useState<Date>(() =>
		startOfDay(selected ?? range[0] ?? new Date()),
	);
	const [focusTarget, setFocusTarget] = useState<{ day: Date } | null>(null);
	const daysRef = useRef<HTMLDivElement>(null);
	const inputRef = useRef<HTMLInputElement>(null);
	const valueButtonRef = useRef<HTMLButtonElement>(null);
	const valueId = useId("datepicker-value");

	const triggerRef = useRef<HTMLDivElement>(null);
	// Le déclencheur exposé est le shell, pas le contrôle : celui-ci change de
	// nature selon `mode` (input en « single », bouton en « range »). Le shell est
	// le seul nœud commun aux deux, et c'est lui qui porte `{...rest}` — donc le
	// nœud que décrit le type public.
	const setTriggerRef = useMergedRefs(triggerRef, ref);
	const popRef = useRef<HTMLDivElement>(null);
	const popId = useId("datepicker");

	const { style: floatStyle } = useAnchor(triggerRef, popRef, open, {
		placement: "bottom-start",
		gap: 6,
		constrainHeight: true,
		minHeight: 300,
	});
	const close = useCallback(() => {
		setOpen(false);
		setYearView(false);
	}, []);
	/**
	 * Referme, et rend le focus au champ s'il était dans le calendrier (Échap, un
	 * jour choisi au clavier) : portalisé, le calendrier le perdrait sinon dans la
	 * page. Après un clic extérieur, le navigateur le pose ensuite où l'on a cliqué.
	 */
	const closeAndRestore = useCallback(() => {
		const active = document.activeElement;
		if (active && popRef.current?.contains(active)) {
			(mode === "single" ? inputRef.current : valueButtonRef.current)?.focus();
		}
		close();
	}, [close, mode]);
	useDismiss(open, closeAndRestore, [triggerRef, popRef]);

	useEffect(() => {
		if (!focusTarget) return;
		daysRef.current
			?.querySelector<HTMLButtonElement>(`[data-day="${toISODate(focusTarget.day)}"]`)
			?.focus();
	}, [focusTarget]);

	const weekdays = useMemo(() => weekdayNames(locale, weekStart), [locale, weekStart]);
	const grid = useMemo(() => buildMonthGrid(view, weekStart), [view, weekStart]);

	const outOfRange = (d: Date) =>
		(min && startOfDay(d) < startOfDay(min)) || (max && startOfDay(d) > startOfDay(max));

	/** Le jour ramené dans [min, max] : le jour actif n'est jamais un jour désactivé. */
	const clampDay = (d: Date) => {
		const day = startOfDay(d);
		if (min && day < startOfDay(min)) return startOfDay(min);
		if (max && day > startOfDay(max)) return startOfDay(max);
		return day;
	};

	/** Déplace le jour actif (et le mois affiché s'il en sort), puis y porte le focus. */
	const moveFocus = (d: Date) => {
		const day = clampDay(d);
		setFocusDay(day);
		if (day.getMonth() !== view.getMonth() || day.getFullYear() !== view.getFullYear()) {
			setView(new Date(day.getFullYear(), day.getMonth(), 1));
		}
		setFocusTarget({ day });
	};

	const onDaysKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
		const next = dayFromKey(e, focusDay, weekStart);
		if (!next) return;
		e.preventDefault();
		moveFocus(next);
	};

	/** Tab reste dans le calendrier tant qu'il est ouvert ; Échap en sort (useDismiss). */
	const onPopKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
		if (popRef.current) trapTab(e.nativeEvent, popRef.current);
	};

	/** Le focus quitte le champ pour ailleurs que le calendrier : on le referme. */
	const onControlBlur = (e: FocusEvent<HTMLElement>) => {
		if (!popRef.current?.contains(e.relatedTarget)) close();
	};

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
		setFocusDay(d);
		if (mode === "single") {
			setSelected(d);
			closeAndRestore();
			return;
		}
		if (!rangeStart || rangeEnd || d <= startOfDay(rangeStart)) {
			setRange([d, null]);
		} else {
			setRange([rangeStart, d]);
			closeAndRestore();
		}
	};

	const clear = () => {
		if (mode === "single") setSelected(null);
		else setRange([null, null]);
		closeAndRestore();
	};

	/** Mois (ou page d'années) précédent ou suivant ; le jour actif suit, sans prendre le focus. */
	const shiftPage = (delta: number) => {
		if (yearView) {
			setView(new Date(view.getFullYear() + delta * YEAR_PAGE, view.getMonth(), 1));
			return;
		}
		setView(new Date(view.getFullYear(), view.getMonth() + delta, 1));
		setFocusDay(clampDay(addMonths(focusDay, delta)));
	};

	/**
	 * Ouvre sur la date choisie, sinon aujourd'hui. `focusGrid` : le focus entre dans
	 * la grille (bouton calendrier, flèche bas) ; à la prise de focus du champ, il y
	 * reste pour la saisie.
	 */
	const openCalendar = (focusGrid: boolean) => {
		if (disabled) return;
		const day = clampDay((mode === "single" ? selected : range[0]) ?? new Date());
		setView(new Date(day.getFullYear(), day.getMonth(), 1));
		setFocusDay(day);
		setYearView(false);
		setOpen(true);
		if (focusGrid) setFocusTarget({ day });
	};
	const toggleCalendar = () => (open ? closeAndRestore() : openCalendar(true));

	/** Flèche bas (Alt+flèche bas comprise) depuis le champ : le focus entre dans le calendrier. */
	const onInputKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
		if (e.key !== "ArrowDown") return;
		e.preventDefault();
		if (open && !yearView) setFocusTarget({ day: focusDay });
		else openCalendar(true);
	};

	const onType = (raw: string) => {
		const masked = maskDate(raw);
		setDraft(masked);
		// Champ vidé = effacement explicite. Sans cette branche, le blur jette le
		// brouillon et l'ancienne date remonte toute seule — y compris dans l'input
		// caché `name` — sans qu'aucun onChange n'ait été émis. `onType` n'est câblé
		// qu'en mode « single » : pas de cas `range` ici.
		if (masked === "") {
			setSelected(null);
			return;
		}
		const d = parseDate(masked);
		if (d && !outOfRange(d)) {
			setSelected(startOfDay(d));
			setView(d);
		}
	};

	const pickYear = (year: number) => {
		setView(new Date(year, view.getMonth(), 1));
		setYearView(false);
		moveFocus(new Date(year, focusDay.getMonth(), Math.min(focusDay.getDate(), 28)));
	};

	const today = new Date();
	const yearBase = yearPageStart(view.getFullYear());
	const years = Array.from({ length: YEAR_PAGE }, (_, i) => yearBase + i);
	const yearDisabled = (y: number) =>
		(min != null && y < min.getFullYear()) || (max != null && y > max.getFullYear());

	// Libellé du bouton, que seul le mode « range » rend : en « single » la date
	// s'affiche dans l'input, pas ici.
	let display = placeholderText;
	if (rangeStart) {
		display = rangeEnd ? `${fmt(rangeStart)} — ${fmt(rangeEnd)}` : `${fmt(rangeStart)} — …`;
	}

	const hasValue = mode === "single" ? selected != null : rangeStart != null;

	return (
		<Field
			label={label}
			hint={hint}
			error={error}
			required={required}
			id={id}
			idPrefix="datepicker"
			className={className}
			style={style}
		>
			{({ id: controlId, labelId, describedBy, invalid }) => (
				<>
					<div
						ref={setTriggerRef}
						className={cn(
							"camply-field-shell",
							error && "camply-field-shell--error",
							open && "camply-field-shell--open",
							disabled && "camply-field-shell--disabled",
						)}
						{...rest}
					>
						<button
							type="button"
							disabled={disabled}
							aria-haspopup="dialog"
							aria-expanded={open}
							// Le popover n'est monté qu'en `open` : sinon l'IDREF pendrait.
							aria-controls={open ? popId : undefined}
							aria-label={labels.openCalendar}
							className="camply-icon-ghost-btn"
							onClick={toggleCalendar}
							onBlur={onControlBlur}
						>
							<Calendar size={16} />
						</button>
						{mode === "single" ? (
							<input
								ref={inputRef}
								id={controlId}
								className="camply-field-control"
								value={draft ?? (selected ? formatInput(selected) : "")}
								placeholder={labels.dateFormatHint}
								inputMode="numeric"
								disabled={disabled}
								required={required}
								aria-label={label ? undefined : placeholderText}
								aria-describedby={describedBy}
								aria-invalid={invalid}
								onChange={(e) => onType(e.target.value)}
								onFocus={() => openCalendar(false)}
								onKeyDown={onInputKeyDown}
								onBlur={(e) => {
									setDraft(null);
									onControlBlur(e);
								}}
							/>
						) : (
							<button
								ref={valueButtonRef}
								id={controlId}
								type="button"
								disabled={disabled}
								// Le libellé PUIS la plage : `aria-labelledby` seul remplaçait le texte
								// du bouton, et les dates choisies n'étaient jamais annoncées.
								aria-labelledby={label ? idRefs(labelId, valueId) : undefined}
								aria-describedby={describedBy}
								aria-invalid={invalid}
								className={cn(
									"camply-field-control",
									"camply-datepicker__valueBtn",
									!hasValue && "camply-datepicker__placeholder",
								)}
								onClick={toggleCalendar}
								onBlur={onControlBlur}
							>
								<span id={valueId}>{display}</span>
							</button>
						)}
					</div>

					{mode === "single" ? (
						<HiddenField
							name={name}
							value={selected ? toISODate(selected) : ""}
							disabled={disabled}
						/>
					) : (
						<>
							<HiddenField
								name={name}
								value={rangeStart ? toISODate(rangeStart) : ""}
								disabled={disabled}
							/>
							<HiddenField
								name={name}
								value={rangeEnd ? toISODate(rangeEnd) : ""}
								disabled={disabled}
							/>
						</>
					)}
					<FormReset
						onReset={
							(mode === "single" ? value : rangeValue) === undefined
								? () => {
										setDraft(null);
										if (mode === "single") setSelected(defaultValue);
										else setRange(defaultRangeValue);
									}
								: undefined
						}
					/>

					{open && (
						<Portal>
							<div
								ref={popRef}
								id={popId}
								role="dialog"
								aria-label={labels.calendar}
								className="camply-floating-surface camply-datepicker__pop"
								style={floatStyle}
								onKeyDown={onPopKeyDown}
								// Un clic garde le focus dans le champ : sans quoi certains navigateurs
								// le posent sur la page et le champ, quitté, refermerait le calendrier.
								onMouseDown={(e) => e.preventDefault()}
							>
								<div className="camply-datepicker__head">
									<button
										type="button"
										className="camply-round-btn camply-focus-ring"
										aria-label={labels.previous}
										onClick={() => shiftPage(-1)}
									>
										<ChevronLeft size={16} />
									</button>
									<button
										type="button"
										className="camply-datepicker__monthLabel"
										aria-label={labels.chooseYear}
										aria-expanded={yearView}
										onClick={() => setYearView((y) => !y)}
									>
										{yearView ? `${yearBase} – ${yearBase + YEAR_PAGE - 1}` : monthLabel}
									</button>
									<button
										type="button"
										className="camply-round-btn camply-focus-ring"
										aria-label={labels.next}
										onClick={() => shiftPage(1)}
									>
										<ChevronRight size={16} />
									</button>
								</div>

								{yearView ? (
									<div className="camply-datepicker__years">
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
										<div className="camply-datepicker__weekdays">
											{weekdays.map((w) => (
												<span key={w} className="camply-datepicker__weekday">
													{w}
												</span>
											))}
										</div>

										{/* biome-ignore lint/a11y/noStaticElementInteractions: délégation — les flèches pressées sur un jour (un vrai bouton, focalisé) remontent ici ; ce conteneur ne reçoit jamais le focus */}
										<div
											ref={daysRef}
											className="camply-datepicker__days"
											onKeyDown={onDaysKeyDown}
										>
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
														data-day={toISODate(d)}
														tabIndex={isSameDay(d, focusDay) ? 0 : -1}
														aria-label={fmt(d)}
														aria-current={isToday ? "date" : undefined}
														aria-pressed={isSel ? true : undefined}
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

								<div className="camply-datepicker__footer">
									<button
										type="button"
										className="camply-text-btn camply-datepicker__todayBtn"
										onClick={() => {
											setYearView(false);
											setView(new Date());
											pick(new Date());
										}}
									>
										{labels.today}
									</button>
									{hasValue && (
										<button
											type="button"
											className="camply-text-btn camply-datepicker__clearBtn"
											onClick={clear}
										>
											{labels.clear}
										</button>
									)}
								</div>
							</div>
						</Portal>
					)}
				</>
			)}
		</Field>
	);
});
