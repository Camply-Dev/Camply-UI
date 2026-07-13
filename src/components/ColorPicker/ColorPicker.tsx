import {
	type CSSProperties,
	type PointerEvent,
	type RefObject,
	useCallback,
	useEffect,
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
import { ChevronDown } from "../../lib/icons";
import { Portal } from "../../lib/Portal";
import { useAnchor } from "../../lib/useAnchor";
import { useControllable } from "../../lib/useControllable";
import { useDismiss } from "../../lib/useDismiss";
import { Input } from "../Input";

export interface ColorPickerProps {
	/** controlled hex value, e.g. "#38bdf8" */
	value?: string;
	/** couleur initiale ; omise = aucune couleur (pastille vide en mode compact) */
	defaultValue?: string;
	onChange?: (hex: string) => void;
	/** opacité contrôlée (0–1). `value` reste un hex #RRGGBB — l'alpha est géré à part. */
	alpha?: number;
	defaultAlpha?: number;
	onAlphaChange?: (alpha: number) => void;
	label?: string;
	/**
	 * "full" (défaut) : sélecteur affiché en ligne.
	 * "compact" : un déclencheur (pastille + valeur + chevron) qui révèle le
	 * sélecteur dans une palette flottante au survol / focus / clic.
	 * "swatch" : uniquement le carré de couleur ; la même palette flottante
	 * apparaît au survol / focus / clic.
	 * Les trois variantes exposent les champs HEX & RGB éditables : taper une valeur
	 * applique la couleur (hex 3/6/8 chiffres — 8 = avec opacité ; RGB "r, g, b"
	 * ou "r, g, b, a").
	 */
	variant?: "full" | "compact" | "swatch";
	className?: string;
	style?: CSSProperties;
}

/**
 * Color picker : carré saturation/valeur + slider de teinte, avec lecture HEX &
 * RGB. Deux présentations via `variant` : "full" (en ligne) ou "compact"
 * (pastille + palette flottante au survol). Contrôlable via value/onChange.
 */
export function ColorPicker({
	value,
	defaultValue,
	onChange,
	alpha: alphaProp,
	defaultAlpha,
	onAlphaChange,
	label,
	variant = "full",
	className,
	style,
}: ColorPickerProps) {
	const [hex, setHex] = useControllable<string>(value, defaultValue ?? "", onChange);
	// Pas de couleur -> on part d'un blanc neutre pour que le carré reste utilisable.
	const [hsv, setHsv] = useState<[number, number, number]>(() => {
		const rgb = parseHex(hex);
		return rgb ? rgbToHsv(...rgb) : [0, 0, 1];
	});
	const [alpha, setAlpha] = useControllable<number>(alphaProp, defaultAlpha ?? 1, onAlphaChange);
	// Saisie éditable HEX / RGB : null = affiche la valeur dérivée ; sinon texte tapé.
	const [draftHex, setDraftHex] = useState<string | null>(null);
	const [draftRgb, setDraftRgb] = useState<string | null>(null);
	const svRef = useRef<HTMLDivElement>(null);
	const hueRef = useRef<HTMLDivElement>(null);
	const alphaRef = useRef<HTMLDivElement>(null);

	const hasColor = parseHex(hex) != null;

	// Les commits internes posent ce drapeau pour que l'effet de synchro ne recalcule
	// pas hsv depuis hex (redondant, et exécuté à chaque frame de glissé).
	const internalCommit = useRef(false);

	const commit = useCallback(
		(h: number, s: number, v: number) => {
			internalCommit.current = true;
			setHsv([h, s, v]);
			setHex(toHex(h, s, v));
		},
		[setHex],
	);

	// Synchronise hsv ← hex uniquement quand la valeur arrive de l'extérieur (contrôlé).
	useEffect(() => {
		if (internalCommit.current) {
			internalCommit.current = false;
			return;
		}
		const rgb = parseHex(hex);
		if (rgb) setHsv(rgbToHsv(...rgb));
	}, [hex]);

	// --- palette flottante (modes compact & swatch) ---
	const compact = variant === "compact";
	const floating = variant === "compact" || variant === "swatch";
	const [open, setOpen] = useState(false);
	const triggerRef = useRef<HTMLButtonElement>(null);
	const panelRef = useRef<HTMLDivElement>(null);
	const closeTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
	const draggingRef = useRef(false);
	// Champ éditable focus → on garde la palette ouverte (comme pendant un glissé).
	const focusedRef = useRef(false);

	const anchorStyle = useAnchor(triggerRef, panelRef, open, { placement: "bottom-start", gap: 8 });
	const close = useCallback(() => setOpen(false), []);
	useDismiss(open && floating, close, [triggerRef, panelRef]);

	const openNow = () => {
		clearTimeout(closeTimer.current);
		setOpen(true);
	};
	// Referme après un court délai — mais jamais pendant un glissé (on repousse
	// tant que draggingRef est vrai). Un survol de la pastille/palette annule le
	// timer via openNow.
	const scheduleClose = () => {
		clearTimeout(closeTimer.current);
		const tick = () => {
			if (draggingRef.current || focusedRef.current) closeTimer.current = setTimeout(tick, 150);
			else setOpen(false);
		};
		closeTimer.current = setTimeout(tick, 200);
	};
	useEffect(() => () => clearTimeout(closeTimer.current), []);

	// Suit un pointeur sur un élément et rappelle onMove avec des ratios x/y ∈ [0,1].
	// Le rect est lu UNE seule fois au pointerdown (l'élément ne bouge pas pendant le
	// glissé) → aucun reflow forcé à chaque pointermove.
	const startDrag = useCallback(
		(
			ref: RefObject<HTMLDivElement | null>,
			e: PointerEvent,
			onMove: (x: number, y: number) => void,
		) => {
			const el = ref.current;
			if (!el) return;
			const rect = el.getBoundingClientRect();
			draggingRef.current = true;
			const apply = (cx: number, cy: number) =>
				onMove(
					clamp((cx - rect.left) / rect.width, 0, 1),
					clamp((cy - rect.top) / rect.height, 0, 1),
				);
			apply(e.clientX, e.clientY);
			const move = (ev: globalThis.PointerEvent) => apply(ev.clientX, ev.clientY);
			const up = () => {
				window.removeEventListener("pointermove", move);
				window.removeEventListener("pointerup", up);
				draggingRef.current = false;
			};
			window.addEventListener("pointermove", move);
			window.addEventListener("pointerup", up);
		},
		[],
	);

	const dragSV = (e: PointerEvent) => startDrag(svRef, e, (x, y) => commit(hsv[0], x, 1 - y));
	const dragHue = (e: PointerEvent) => startDrag(hueRef, e, (x) => commit(x * 360, hsv[1], hsv[2]));
	const dragAlpha = (e: PointerEvent) => startDrag(alphaRef, e, (x) => setAlpha(x));

	const [h, s, v] = hsv;
	const [r, g, b] = hsvToRgb(h, s, v);
	const hueHex = toHex(h, 1, 1);
	const solidHex = toHex(h, s, v);
	// Couleur affichée AVEC son opacité (au-dessus d'un damier de transparence).
	const rgbaFill = `rgba(${r}, ${g}, ${b}, ${alpha})`;
	// Valeurs copiables incluant l'opacité : dès qu'alpha < 1, hex → #RRGGBBAA et
	// rgb → "r, g, b, a". À pleine opacité on garde la forme courte.
	const alphaByte = Math.round(alpha * 255)
		.toString(16)
		.padStart(2, "0");
	const alphaRounded = Math.round(alpha * 100) / 100;
	const hexOut = (alpha < 1 ? `${hex}${alphaByte}` : hex).toUpperCase();
	const rgbOut = alpha < 1 ? `${r}, ${g}, ${b}, ${alphaRounded}` : `${r}, ${g}, ${b}`;

	// Applique une couleur saisie (HEX ou RGB) dès qu'elle est valide ; l'opacité
	// suit quand elle est fournie (hex 8 chiffres ou 4e canal RGB).
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

	// Carré saturation/valeur + barre de teinte, partagés par les deux variantes.
	const pickerCore = (
		<>
			<div
				ref={svRef}
				className={"camply-colorpicker__square"}
				style={{
					background: `linear-gradient(to top, #000, transparent), linear-gradient(to right, #fff, ${hueHex})`,
				}}
				onPointerDown={dragSV}
			>
				<span
					className={"camply-colorpicker__svKnob"}
					style={{ left: `${s * 100}%`, top: `${(1 - v) * 100}%`, background: toHex(h, s, v) }}
				/>
			</div>

			<div ref={hueRef} className={"camply-colorpicker__hue"} onPointerDown={dragHue}>
				<span
					className={"camply-colorpicker__hueKnob"}
					style={{ left: `${(h / 360) * 100}%`, background: hueHex }}
				/>
			</div>

			<div ref={alphaRef} className={"camply-colorpicker__alpha"} onPointerDown={dragAlpha}>
				<span
					className={"camply-colorpicker__alphaFill"}
					style={{ background: `linear-gradient(to right, transparent, ${solidHex})` }}
				/>
				<span
					className={"camply-colorpicker__alphaKnob"}
					style={{ left: `${alpha * 100}%`, background: rgbaFill }}
				/>
			</div>
		</>
	);

	// HEX & RGB éditables (composant Input), partagés full/compact. Taper une valeur
	// applique la couleur ; on garde la palette ouverte tant qu'un champ est focus.
	const editFields = (
		<div className={"camply-colorpicker__fields"}>
			<Input
				label="HEX"
				size="sm"
				value={draftHex ?? (hasColor ? hexOut : "")}
				placeholder="#RRGGBB"
				spellCheck={false}
				autoComplete="off"
				maxLength={9}
				onChange={(e) => onHexInput(e.target.value)}
				onFocus={() => {
					focusedRef.current = true;
				}}
				onBlur={() => {
					focusedRef.current = false;
					setDraftHex(null);
					scheduleClose();
				}}
			/>
			<Input
				label={alpha < 1 ? "RGBA" : "RGB"}
				size="sm"
				value={draftRgb ?? (hasColor ? rgbOut : "")}
				placeholder="r, g, b"
				spellCheck={false}
				autoComplete="off"
				onChange={(e) => onRgbInput(e.target.value)}
				onFocus={() => {
					focusedRef.current = true;
				}}
				onBlur={() => {
					focusedRef.current = false;
					setDraftRgb(null);
					scheduleClose();
				}}
			/>
		</div>
	);

	// Palette flottante partagée par les modes compact & swatch.
	const floatingPanel = open && (
		<Portal>
			<div
				ref={panelRef}
				role="dialog"
				aria-label="Sélecteur de couleur"
				className="camply-floating-surface camply-colorpicker__pop"
				style={anchorStyle}
				onMouseEnter={openNow}
				onMouseLeave={scheduleClose}
			>
				{pickerCore}
				{editFields}
			</div>
		</Portal>
	);

	// Mode swatch : uniquement le carré de couleur ; la palette apparaît au survol.
	if (variant === "swatch") {
		return (
			<div
				className={cn("camply-colorpicker__root", "camply-colorpicker__swatchOnly", className)}
				style={style}
			>
				{label && <span className={"camply-colorpicker__label"}>{label}</span>}
				<button
					ref={triggerRef}
					type="button"
					aria-haspopup="dialog"
					aria-expanded={open}
					aria-label={
						label
							? `${label} : ${hasColor ? hexOut : "aucune"}`
							: `Couleur ${hasColor ? hexOut : "aucune"}`
					}
					className={cn("camply-colorpicker__swatch", "camply-colorpicker__swatchTrigger")}
					onMouseEnter={openNow}
					onMouseLeave={scheduleClose}
					onFocus={openNow}
					onClick={openNow}
				>
					<span
						className={"camply-colorpicker__swatchFill"}
						style={{ background: hasColor ? rgbaFill : "transparent" }}
					/>
				</button>
				{floatingPanel}
			</div>
		);
	}

	if (compact) {
		return (
			<div
				className={cn("camply-colorpicker__root", "camply-colorpicker__compact", className)}
				style={style}
			>
				{label && <span className={"camply-colorpicker__label"}>{label}</span>}
				<button
					ref={triggerRef}
					type="button"
					aria-haspopup="dialog"
					aria-expanded={open}
					aria-label={
						label
							? `${label} : ${hasColor ? hexOut : "aucune"}`
							: `Couleur ${hasColor ? hexOut : "aucune"}`
					}
					className={cn("camply-colorpicker__trigger", open && "camply-colorpicker__trigger--open")}
					onMouseEnter={openNow}
					onMouseLeave={scheduleClose}
					onFocus={openNow}
					onClick={openNow}
				>
					<span className={"camply-colorpicker__swatch"} aria-hidden="true">
						<span
							className={"camply-colorpicker__swatchFill"}
							style={{ background: hasColor ? rgbaFill : "transparent" }}
						/>
					</span>
					<span
						className={cn(
							"camply-colorpicker__triggerValue",
							!hasColor && "camply-colorpicker__triggerValue--empty",
						)}
					>
						{hasColor ? hexOut : "Choisir une couleur"}
					</span>
					<span className={"camply-colorpicker__triggerChevron"} aria-hidden="true">
						<ChevronDown size={16} />
					</span>
				</button>
				{floatingPanel}
			</div>
		);
	}

	// Mode full : sélecteur en ligne + champs HEX / RGB éditables.
	return (
		<div className={cn("camply-colorpicker__root", className)} style={style}>
			{label && <span className={"camply-colorpicker__label"}>{label}</span>}
			{pickerCore}
			{editFields}
		</div>
	);
}
