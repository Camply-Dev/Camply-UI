import {
	type FocusEvent,
	forwardRef,
	type HTMLAttributes,
	type KeyboardEvent,
	type PointerEvent,
	type RefObject,
	useCallback,
	useEffect,
	useMemo,
	useRef,
	useState,
} from "react";
import { clamp } from "../../lib/clamp";
import { cn } from "../../lib/cn";
import {
	hsvToRgb,
	maskRgb,
	parseColorInput,
	parseHex,
	parseRgbInput,
	rgbToHsv,
	toHex,
} from "../../lib/color";
import { Field } from "../../lib/Field";
import { FieldChevron } from "../../lib/FieldChevron";
import { focusEdges } from "../../lib/focusTrap";
import { FormReset, HiddenField } from "../../lib/HiddenField";
import { useLabels, useLocale } from "../../lib/i18n";
import { Portal } from "../../lib/Portal";
import { nextSliderValue } from "../../lib/sliderKeys";
import { useAnchor } from "../../lib/useAnchor";
import { useControllable } from "../../lib/useControllable";
import { useDismiss } from "../../lib/useDismiss";
import { Input } from "../Input";

export interface ColorPickerProps
	extends Omit<HTMLAttributes<HTMLDivElement>, "color" | "defaultValue" | "onChange"> {
	value?: string;
	defaultValue?: string;
	onChange?: (hex: string) => void;
	alpha?: number;
	defaultAlpha?: number;
	onAlphaChange?: (alpha: number) => void;
	label?: string;
	hint?: string;
	error?: string;
	/** Texte du déclencheur tant qu'aucune couleur n'est choisie. */
	placeholder?: string;
	/** Nom du champ : rend un input caché pour la soumission d'un <form> natif. */
	name?: string;
	required?: boolean;
	variant?: "full" | "compact" | "swatch";
}

const HUE_MAX = 360;

/** Évite la dérive flottante des pas de 0,01 (0.1 + 0.2 -> 0.30000000000000004). */
const round2 = (n: number) => Math.round(n * 100) / 100;

export const ColorPicker = forwardRef<HTMLDivElement, ColorPickerProps>(function ColorPicker(
	{
		value,
		defaultValue,
		onChange,
		alpha: alphaProp,
		defaultAlpha,
		onAlphaChange,
		label,
		hint,
		error,
		placeholder,
		name,
		required,
		variant = "full",
		className,
		style,
		id,
		...rest
	},
	ref,
) {
	const labels = useLabels();
	const locale = useLocale();
	const percent = useMemo(
		() => new Intl.NumberFormat(locale, { style: "percent", maximumFractionDigits: 0 }),
		[locale],
	);

	const [hex, setHex] = useControllable<string>(value, defaultValue ?? "", onChange);
	const [hsv, setHsv] = useState<[number, number, number]>(() => {
		const rgb = parseHex(hex);
		return rgb ? rgbToHsv(...rgb) : [0, 0, 1];
	});
	const [alpha, setAlpha] = useControllable<number>(alphaProp, defaultAlpha ?? 1, onAlphaChange);
	const [draftHex, setDraftHex] = useState<string | null>(null);
	const [draftRgb, setDraftRgb] = useState<string | null>(null);
	const svRef = useRef<HTMLDivElement>(null);
	const hueRef = useRef<HTMLDivElement>(null);
	const alphaRef = useRef<HTMLDivElement>(null);

	const hasColor = parseHex(hex) != null;

	const commit = useCallback(
		(h: number, s: number, v: number) => {
			setHsv([h, s, v]);
			setHex(toHex(h, s, v));
		},
		[setHex],
	);

	useEffect(() => {
		const rgb = parseHex(hex);
		if (!rgb) return;
		// `hsv` n'est recalé que si `hex` vient de l'EXTÉRIEUR, par comparaison et non
		// par un drapeau « commit interne » : un parent contrôlé qui n'applique pas notre
		// onChange (palette restreinte, validation) le laisserait armé, et il mangerait
		// sa mise à jour suivante. La comparaison porte sur les canaux RGB : un parent qui
		// normalise la casse ne déclenche pas d'aller-retour rgbToHsv, lossy sur les gris.
		setHsv((prev) => {
			const [pr, pg, pb] = hsvToRgb(...prev);
			if (pr === rgb[0] && pg === rgb[1] && pb === rgb[2]) return prev;
			return rgbToHsv(...rgb);
		});
	}, [hex]);

	const compact = variant === "compact";
	const floating = variant === "compact" || variant === "swatch";
	const [open, setOpen] = useState(false);
	const triggerRef = useRef<HTMLButtonElement>(null);
	const panelRef = useRef<HTMLDivElement>(null);
	const closeTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
	const draggingRef = useRef(false);
	/** Ferme le glisser en cours : appelé au démontage et avant tout nouveau glisser. */
	const stopDragRef = useRef<(() => void) | null>(null);
	const hoverRef = useRef(false);
	// Le déclencheur ouvre au focus : ce drapeau évite qu'il rouvre le panneau
	// quand c'est NOUS qui lui rendons le focus (Échap, sortie par Tab).
	const restoringRef = useRef(false);

	const { style: anchorStyle } = useAnchor(triggerRef, panelRef, open, {
		placement: "bottom-start",
		gap: 8,
	});

	const isInside = (node: Node | null) =>
		Boolean(node && (panelRef.current?.contains(node) || triggerRef.current?.contains(node)));

	/**
	 * Le focus retient le panneau ouvert — mais seulement s'il est *visible* : une
	 * surface focalisée au clic ne doit pas empêcher la fermeture au survol, alors
	 * qu'un focus clavier (ou un champ en cours de saisie) doit la bloquer.
	 */
	const heldByFocus = () => {
		const active = document.activeElement;
		if (!active || !isInside(active)) return false;
		try {
			return active.matches(":focus-visible");
		} catch {
			// Pseudo-classe inconnue (jsdom…) : on retient plutôt que de fermer.
			return true;
		}
	};

	const openNow = () => {
		if (restoringRef.current) return;
		clearTimeout(closeTimer.current);
		setOpen(true);
	};

	const scheduleClose = () => {
		clearTimeout(closeTimer.current);
		const tick = () => {
			// Un glisser en cours retient le panneau, même curseur sorti.
			if (draggingRef.current) {
				closeTimer.current = setTimeout(tick, 150);
				return;
			}
			// Encore survolé ou encore focalisé au clavier : on abandonne la fermeture.
			if (hoverRef.current || heldByFocus()) return;
			setOpen(false);
		};
		closeTimer.current = setTimeout(tick, 200);
	};
	// Au démontage : la fermeture différée ET un glisser éventuellement en cours,
	// dont les listeners vivent sur `window` et survivraient au composant.
	useEffect(
		() => () => {
			clearTimeout(closeTimer.current);
			stopDragRef.current?.();
		},
		[],
	);

	/** Referme, et rend le focus au déclencheur s'il était dans le panneau. */
	const closeAndRestore = useCallback(() => {
		const panel = panelRef.current;
		const active = document.activeElement;
		if (panel && active && panel.contains(active)) {
			restoringRef.current = true;
			triggerRef.current?.focus();
			restoringRef.current = false;
		}
		setOpen(false);
	}, []);

	useDismiss(open && floating, closeAndRestore, [triggerRef, panelRef]);

	const onEnter = () => {
		hoverRef.current = true;
		openNow();
	};
	const onLeave = () => {
		hoverRef.current = false;
		scheduleClose();
	};
	const onFocusOut = (e: FocusEvent<HTMLElement>) => {
		if (isInside(e.relatedTarget)) return;
		scheduleClose();
	};

	/** Tab depuis le déclencheur : le panneau est portalisé, on y entre à la main. */
	const onTriggerKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
		if (!open || e.key !== "Tab" || e.shiftKey) return;
		const panel = panelRef.current;
		const first = panel && focusEdges(panel).first;
		if (!first) return;
		e.preventDefault();
		first.focus();
	};

	/** Tab hors du panneau par l'un ou l'autre bout : on referme et on revient au déclencheur. */
	const onPanelKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
		if (e.key !== "Tab" || !panelRef.current) return;
		const { first, last } = focusEdges(panelRef.current);
		const edge = e.shiftKey ? first : last;
		if (!edge || document.activeElement !== edge) return;
		e.preventDefault();
		closeAndRestore();
	};

	const startDrag = useCallback(
		(
			target: RefObject<HTMLDivElement | null>,
			e: PointerEvent,
			onMove: (x: number, y: number) => void,
		) => {
			const el = target.current;
			if (!el) return;
			// Un glisser déjà en cours (2e doigt sur une autre surface) est fermé
			// d'abord : sans ça sa paire de listeners resterait orpheline sur window.
			stopDragRef.current?.();
			// La surface prend le focus : le clavier prend le relais du glisser.
			el.focus();
			draggingRef.current = true;
			// rect relu à chaque mouvement : useAnchor repositionne le panneau au
			// défilement, un rect figé désaligne la couleur du pointeur.
			const apply = (cx: number, cy: number) => {
				const r = el.getBoundingClientRect();
				onMove(clamp((cx - r.left) / r.width, 0, 1), clamp((cy - r.top) / r.height, 0, 1));
			};
			apply(e.clientX, e.clientY);
			const move = (ev: globalThis.PointerEvent) => apply(ev.clientX, ev.clientY);
			const up = () => {
				window.removeEventListener("pointermove", move);
				window.removeEventListener("pointerup", up);
				// pointercancel : sur tactile le navigateur reprend le pointeur (défilement,
				// appui long, mise en arrière-plan) sans jamais émettre pointerup.
				window.removeEventListener("pointercancel", up);
				draggingRef.current = false;
				stopDragRef.current = null;
			};
			stopDragRef.current = up;
			window.addEventListener("pointermove", move);
			window.addEventListener("pointerup", up);
			window.addEventListener("pointercancel", up);
		},
		[],
	);

	const [h, s, v] = hsv;

	const dragSV = (e: PointerEvent) => startDrag(svRef, e, (x, y) => commit(h, x, 1 - y));
	const dragHue = (e: PointerEvent) => startDrag(hueRef, e, (x) => commit(x * HUE_MAX, s, v));
	const dragAlpha = (e: PointerEvent) => startDrag(alphaRef, e, (x) => setAlpha(x));

	const onSvKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
		const step = e.shiftKey ? 0.1 : 0.01;
		let nextS = s;
		let nextV = v;
		switch (e.key) {
			case "ArrowRight":
				nextS += step;
				break;
			case "ArrowLeft":
				nextS -= step;
				break;
			case "ArrowUp":
				nextV += step;
				break;
			case "ArrowDown":
				nextV -= step;
				break;
			default:
				return;
		}
		e.preventDefault();
		commit(h, round2(clamp(nextS, 0, 1)), round2(clamp(nextV, 0, 1)));
	};

	// Teinte et opacité sont des sliders 1D : même clavier que Slider/RangeSlider
	// (flèches, Page±, Home/End), Maj accélérant le pas comme sur la surface 2D.
	const onHueKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
		const next = nextSliderValue(e.key, Math.round(h), 0, HUE_MAX, e.shiftKey ? 10 : 1);
		if (next == null) return;
		e.preventDefault();
		commit(clamp(next, 0, HUE_MAX), s, v);
	};

	const onAlphaKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
		const next = nextSliderValue(e.key, alpha, 0, 1, e.shiftKey ? 0.1 : 0.01);
		if (next == null) return;
		e.preventDefault();
		setAlpha(round2(clamp(next, 0, 1)));
	};

	const [r, g, b] = hsvToRgb(h, s, v);
	const hueHex = toHex(h, 1, 1);
	const solidHex = toHex(h, s, v);
	const rgbaFill = `rgba(${r}, ${g}, ${b}, ${alpha})`;
	const alphaByte = Math.round(alpha * 255)
		.toString(16)
		.padStart(2, "0");
	const alphaRounded = round2(alpha);
	const hexOut = (alpha < 1 ? `${hex}${alphaByte}` : hex).toUpperCase();
	const rgbOut = alpha < 1 ? `${r}, ${g}, ${b}, ${alphaRounded}` : `${r}, ${g}, ${b}`;
	const valueText = hasColor ? hexOut : (placeholder ?? labels.colorPlaceholder);

	const applyColor = (parsed: { rgb: [number, number, number]; alpha?: number } | null) => {
		if (!parsed) return;
		commit(...rgbToHsv(...parsed.rgb));
		if (parsed.alpha != null) setAlpha(parsed.alpha);
	};
	const onHexInput = (raw: string) => {
		setDraftHex(raw);
		applyColor(parseColorInput(raw));
	};
	const onRgbInput = (raw: string) => {
		const masked = maskRgb(raw);
		setDraftRgb(masked);
		applyColor(parseRgbInput(masked));
	};

	const pickerCore = (
		<>
			{/* Surface 2D : un seul curseur, dont aria-valuetext porte les DEUX axes. */}
			<div
				ref={svRef}
				role="slider"
				tabIndex={0}
				aria-label={labels.colorPickerSaturation}
				aria-valuemin={0}
				aria-valuemax={100}
				aria-valuenow={Math.round(s * 100)}
				aria-valuetext={`${percent.format(s)} / ${percent.format(v)}`}
				className="camply-focus-ring camply-colorpicker__square"
				style={{
					background: `linear-gradient(to top, #000, transparent), linear-gradient(to right, #fff, ${hueHex})`,
				}}
				onPointerDown={dragSV}
				onKeyDown={onSvKeyDown}
			>
				<span
					className="camply-colorpicker__svKnob"
					style={{ left: `${s * 100}%`, top: `${(1 - v) * 100}%`, background: solidHex }}
				/>
			</div>

			<div
				ref={hueRef}
				role="slider"
				tabIndex={0}
				aria-label={labels.colorPickerHue}
				aria-valuemin={0}
				aria-valuemax={HUE_MAX}
				aria-valuenow={Math.round(h)}
				aria-valuetext={`${Math.round(h)}°`}
				className="camply-focus-ring camply-colorpicker__hue"
				onPointerDown={dragHue}
				onKeyDown={onHueKeyDown}
			>
				<span
					className="camply-colorpicker__hueKnob"
					style={{ left: `${(h / HUE_MAX) * 100}%`, background: hueHex }}
				/>
			</div>

			<div
				ref={alphaRef}
				role="slider"
				tabIndex={0}
				aria-label={labels.colorPickerAlpha}
				aria-valuemin={0}
				aria-valuemax={100}
				aria-valuenow={Math.round(alpha * 100)}
				aria-valuetext={percent.format(alpha)}
				className="camply-checkerboard camply-focus-ring camply-colorpicker__alpha"
				onPointerDown={dragAlpha}
				onKeyDown={onAlphaKeyDown}
			>
				<span
					className="camply-colorpicker__alphaFill"
					style={{ background: `linear-gradient(to right, transparent, ${solidHex})` }}
				/>
				<span
					className="camply-colorpicker__alphaKnob"
					style={{ left: `${alpha * 100}%`, background: rgbaFill }}
				/>
			</div>
		</>
	);

	const editFields = (
		<div className="camply-colorpicker__fields">
			<Input
				label="HEX"
				size="sm"
				value={draftHex ?? (hasColor ? hexOut : "")}
				placeholder="#RRGGBB"
				spellCheck={false}
				autoComplete="off"
				maxLength={9}
				onChange={(e) => onHexInput(e.target.value)}
				onBlur={() => setDraftHex(null)}
			/>
			<Input
				label={alpha < 1 ? "RGBA" : "RGB"}
				size="sm"
				value={draftRgb ?? (hasColor ? rgbOut : "")}
				placeholder="r, g, b"
				spellCheck={false}
				autoComplete="off"
				onChange={(e) => onRgbInput(e.target.value)}
				onBlur={() => setDraftRgb(null)}
			/>
		</div>
	);

	return (
		<div
			ref={ref}
			className={cn(
				"camply-colorpicker__root",
				compact && "camply-colorpicker__root--compact",
				variant === "swatch" && "camply-colorpicker__root--swatch",
				className,
			)}
			style={style}
			{...rest}
		>
			<Field
				label={label}
				hint={hint}
				error={error}
				required={required}
				id={id}
				idPrefix="colorpicker"
				className="camply-colorpicker__field"
			>
				{({ id: controlId, labelId, describedBy, invalid }) => {
					const panelId = `${controlId}-panel`;
					const valueId = `${controlId}-value`;
					const nameId = `${controlId}-name`;

					return (
						<>
							{floating ? (
								<>
									{/* Sans label visible, le nom du widget vient de cette source cachée. */}
									{!labelId && (
										<span id={nameId} hidden>
											{labels.colorPicker}
										</span>
									)}
									<button
										ref={triggerRef}
										type="button"
										id={controlId}
										aria-haspopup="dialog"
										aria-expanded={open}
										aria-controls={open ? panelId : undefined}
										aria-labelledby={`${labelId ?? nameId} ${valueId}`}
										aria-describedby={describedBy}
										aria-invalid={invalid}
										className={cn(
											"camply-focus-ring",
											compact
												? "camply-field-shell camply-colorpicker__trigger"
												: "camply-checkerboard camply-colorpicker__swatch camply-colorpicker__swatchTrigger",
											compact && open && "camply-field-shell--open",
											compact && error && "camply-field-shell--error",
										)}
										onMouseEnter={onEnter}
										onMouseLeave={onLeave}
										onFocus={openNow}
										onBlur={onFocusOut}
										onClick={openNow}
										onKeyDown={onTriggerKeyDown}
									>
										{compact ? (
											<>
												<span
													className="camply-checkerboard camply-colorpicker__swatch"
													aria-hidden="true"
												>
													<span
														className="camply-colorpicker__swatchFill"
														style={{ background: hasColor ? rgbaFill : "transparent" }}
													/>
												</span>
												<span
													id={valueId}
													className={cn(
														"camply-colorpicker__triggerValue",
														!hasColor && "camply-colorpicker__triggerValue--empty",
													)}
												>
													{valueText}
												</span>
												<FieldChevron open={open} />
											</>
										) : (
											<>
												<span
													className="camply-colorpicker__swatchFill"
													style={{ background: hasColor ? rgbaFill : "transparent" }}
												/>
												<span id={valueId} hidden>
													{valueText}
												</span>
											</>
										)}
									</button>

									{open && (
										<Portal>
											<div
												ref={panelRef}
												id={panelId}
												role="dialog"
												aria-labelledby={labelId}
												aria-label={labelId ? undefined : labels.colorPicker}
												className="camply-floating-surface camply-colorpicker__pop"
												style={anchorStyle}
												onMouseEnter={onEnter}
												onMouseLeave={onLeave}
												onBlur={onFocusOut}
												onKeyDown={onPanelKeyDown}
											>
												{pickerCore}
												{editFields}
											</div>
										</Portal>
									)}
								</>
							) : (
								<>
									<fieldset
										id={controlId}
										aria-labelledby={labelId}
										aria-label={labelId ? undefined : labels.colorPicker}
										aria-describedby={describedBy}
										aria-invalid={invalid}
										className="camply-colorpicker__core"
									>
										{pickerCore}
									</fieldset>
									{editFields}
								</>
							)}

							{/* Valeur soumise par un <form> natif (les champs du panneau sont portalisés). */}
							<HiddenField name={name} value={hasColor ? hexOut : ""} />
							<FormReset
								onReset={
									value === undefined && alphaProp === undefined
										? () => {
												setHex(defaultValue ?? "");
												setAlpha(defaultAlpha ?? 1);
											}
										: undefined
								}
							/>
						</>
					);
				}}
			</Field>
		</div>
	);
});
