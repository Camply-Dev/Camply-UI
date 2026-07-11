import {
	type CSSProperties,
	type PointerEvent,
	useCallback,
	useEffect,
	useRef,
	useState,
} from "react";
import { clamp } from "../../lib/clamp";
import { cn } from "../../lib/cn";
import { Check, Copy } from "../../lib/icons";
import { Portal } from "../../lib/Portal";
import { useAnchor } from "../../lib/useAnchor";
import { useControllable } from "../../lib/useControllable";
import { useDismiss } from "../../lib/useDismiss";
import { IconButton } from "../IconButton";

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
	/** show the copy-hex button (mode full uniquement) */
	copyable?: boolean;
	/**
	 * "full" (défaut) : sélecteur affiché en ligne.
	 * "compact" : une pastille de couleur qui révèle le sélecteur (carré,
	 * barre de teinte, HEX/RGB cliquables-pour-copier) dans une palette
	 * flottante au survol (ou au focus/clic).
	 */
	variant?: "full" | "compact";
	className?: string;
	style?: CSSProperties;
}

/* ---- color math ---- */
function hsvToRgb(h: number, s: number, v: number): [number, number, number] {
	const c = v * s;
	const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
	const m = v - c;
	let r = 0,
		g = 0,
		b = 0;
	if (h < 60) {
		r = c;
		g = x;
	} else if (h < 120) {
		r = x;
		g = c;
	} else if (h < 180) {
		g = c;
		b = x;
	} else if (h < 240) {
		g = x;
		b = c;
	} else if (h < 300) {
		r = x;
		b = c;
	} else {
		r = c;
		b = x;
	}
	return [Math.round((r + m) * 255), Math.round((g + m) * 255), Math.round((b + m) * 255)];
}
function rgbToHsv(r: number, g: number, b: number): [number, number, number] {
	r /= 255;
	g /= 255;
	b /= 255;
	const max = Math.max(r, g, b),
		min = Math.min(r, g, b),
		d = max - min;
	let h = 0;
	if (d !== 0) {
		if (max === r) h = ((g - b) / d) % 6;
		else if (max === g) h = (b - r) / d + 2;
		else h = (r - g) / d + 4;
		h *= 60;
		if (h < 0) h += 360;
	}
	return [h, max === 0 ? 0 : d / max, max];
}
const toHex = (h: number, s: number, v: number) =>
	"#" +
	hsvToRgb(h, s, v)
		.map((n) => n.toString(16).padStart(2, "0"))
		.join("");
function parseHex(hex: string): [number, number, number] | null {
	const m = /^#?([0-9a-f]{6})$/i.exec(hex.trim());
	if (!m) return null;
	const int = parseInt(m[1], 16);
	return [(int >> 16) & 255, (int >> 8) & 255, int & 255];
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
	copyable = true,
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
	const [copiedField, setCopiedField] = useState<"hex" | "rgb" | null>(null);
	const svRef = useRef<HTMLDivElement>(null);
	const hueRef = useRef<HTMLDivElement>(null);
	const alphaRef = useRef<HTMLDivElement>(null);

	const hasColor = parseHex(hex) != null;

	// keep internal HSV in sync when a controlled hex arrives from outside
	useEffect(() => {
		const rgb = parseHex(hex);
		if (!rgb) return;
		const next = rgbToHsv(...rgb);
		// avoid clobbering hue when saturation/value collapse
		setHsv((prev) => (toHex(...prev) === hex ? prev : next));
	}, [hex]);

	const commit = useCallback(
		(h: number, s: number, v: number) => {
			setHsv([h, s, v]);
			setHex(toHex(h, s, v));
		},
		[setHex],
	);

	// --- palette flottante (mode compact) ---
	const compact = variant === "compact";
	const [open, setOpen] = useState(false);
	const swatchRef = useRef<HTMLButtonElement>(null);
	const panelRef = useRef<HTMLDivElement>(null);
	const closeTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
	const draggingRef = useRef(false);

	const anchorStyle = useAnchor(swatchRef, panelRef, open, { placement: "bottom-start", gap: 8 });
	const close = useCallback(() => setOpen(false), []);
	useDismiss(open && compact, close, [swatchRef, panelRef]);

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
			if (draggingRef.current) closeTimer.current = setTimeout(tick, 150);
			else setOpen(false);
		};
		closeTimer.current = setTimeout(tick, 200);
	};
	useEffect(() => () => clearTimeout(closeTimer.current), []);

	const dragSV = (e: PointerEvent) => {
		const el = svRef.current;
		if (!el) return;
		draggingRef.current = true;
		const move = (clientX: number, clientY: number) => {
			const r = el.getBoundingClientRect();
			const s = clamp((clientX - r.left) / r.width, 0, 1);
			const v = clamp(1 - (clientY - r.top) / r.height, 0, 1);
			commit(hsv[0], s, v);
		};
		move(e.clientX, e.clientY);
		const onMove = (ev: globalThis.PointerEvent) => move(ev.clientX, ev.clientY);
		const onUp = () => {
			window.removeEventListener("pointermove", onMove);
			window.removeEventListener("pointerup", onUp);
			draggingRef.current = false;
		};
		window.addEventListener("pointermove", onMove);
		window.addEventListener("pointerup", onUp);
	};

	const dragHue = (e: PointerEvent) => {
		const el = hueRef.current;
		if (!el) return;
		draggingRef.current = true;
		const move = (clientX: number) => {
			const r = el.getBoundingClientRect();
			const h = clamp(((clientX - r.left) / r.width) * 360, 0, 360);
			commit(h, hsv[1], hsv[2]);
		};
		move(e.clientX);
		const onMove = (ev: globalThis.PointerEvent) => move(ev.clientX);
		const onUp = () => {
			window.removeEventListener("pointermove", onMove);
			window.removeEventListener("pointerup", onUp);
			draggingRef.current = false;
		};
		window.addEventListener("pointermove", onMove);
		window.addEventListener("pointerup", onUp);
	};

	const dragAlpha = (e: PointerEvent) => {
		const el = alphaRef.current;
		if (!el) return;
		draggingRef.current = true;
		const move = (clientX: number) => {
			const rr = el.getBoundingClientRect();
			setAlpha(clamp((clientX - rr.left) / rr.width, 0, 1));
		};
		move(e.clientX);
		const onMove = (ev: globalThis.PointerEvent) => move(ev.clientX);
		const onUp = () => {
			window.removeEventListener("pointermove", onMove);
			window.removeEventListener("pointerup", onUp);
			draggingRef.current = false;
		};
		window.addEventListener("pointermove", onMove);
		window.addEventListener("pointerup", onUp);
	};

	const [h, s, v] = hsv;
	const [r, g, b] = hsvToRgb(h, s, v);
	const hueHex = toHex(h, 1, 1);
	const solidHex = toHex(h, s, v);
	const rgbText = `${r}, ${g}, ${b}`;
	// Couleur affichée AVEC son opacité (au-dessus d'un damier de transparence).
	const rgbaFill = `rgba(${r}, ${g}, ${b}, ${alpha})`;

	const copyValue = async (text: string, field: "hex" | "rgb") => {
		try {
			await navigator.clipboard?.writeText(text);
			setCopiedField(field);
			setTimeout(() => setCopiedField(null), 1400);
		} catch {
			/* noop */
		}
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

	// Mode compact : HEX & RGB cliquables (copient la valeur au clic).
	const copyReadout = (
		<div className={"camply-colorpicker__readout"}>
			<button
				type="button"
				className={"camply-colorpicker__field camply-colorpicker__fieldCopy"}
				onClick={() => hasColor && copyValue(hex, "hex")}
			>
				<span className={"camply-colorpicker__fieldLabel"}>
					{copiedField === "hex" ? "Copié !" : "HEX"}
				</span>
				<span className={"camply-colorpicker__fieldValue"}>
					{hasColor ? hex.toUpperCase() : "—"}
				</span>
			</button>
			<button
				type="button"
				className={"camply-colorpicker__field camply-colorpicker__fieldCopy"}
				onClick={() => hasColor && copyValue(rgbText, "rgb")}
			>
				<span className={"camply-colorpicker__fieldLabel"}>
					{copiedField === "rgb" ? "Copié !" : "RGB"}
				</span>
				<span className={"camply-colorpicker__fieldValue"}>{hasColor ? rgbText : "—"}</span>
			</button>
		</div>
	);

	if (compact) {
		return (
			<div
				className={cn("camply-colorpicker__root", "camply-colorpicker__compact", className)}
				style={style}
			>
				{label && <span className={"camply-colorpicker__label"}>{label}</span>}
				<button
					ref={swatchRef}
					type="button"
					aria-haspopup="dialog"
					aria-expanded={open}
					aria-label={label ? `${label} : ${hasColor ? hex : "aucune"}` : `Couleur ${hex}`}
					className={"camply-colorpicker__swatch"}
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
				{open && (
					<Portal>
						<div
							ref={panelRef}
							role="dialog"
							aria-label="Sélecteur de couleur"
							className={"camply-colorpicker__pop"}
							style={anchorStyle}
							onMouseEnter={openNow}
							onMouseLeave={scheduleClose}
						>
							{pickerCore}
							{copyReadout}
						</div>
					</Portal>
				)}
			</div>
		);
	}

	// Mode full : lecture avec aperçu, HEX, RGB et bouton copier.
	return (
		<div className={cn("camply-colorpicker__root", className)} style={style}>
			{label && <span className={"camply-colorpicker__label"}>{label}</span>}
			{pickerCore}
			<div className={"camply-colorpicker__readout"}>
				<span className={"camply-colorpicker__preview"}>
					<span
						className={"camply-colorpicker__swatchFill"}
						style={{ background: hasColor ? rgbaFill : "transparent" }}
					/>
				</span>
				<div className={"camply-colorpicker__field"}>
					<span className={"camply-colorpicker__fieldLabel"}>HEX</span>
					<span className={"camply-colorpicker__fieldValue"}>
						{hasColor ? hex.toUpperCase() : "—"}
					</span>
				</div>
				<div className={"camply-colorpicker__field"}>
					<span className={"camply-colorpicker__fieldLabel"}>RGB</span>
					<span className={"camply-colorpicker__fieldValue"}>{hasColor ? rgbText : "—"}</span>
				</div>
				{copyable && (
					<IconButton
						label={copiedField ? "Copié" : "Copier"}
						variant="secondary"
						size="md"
						onClick={() => hasColor && copyValue(hex, "hex")}
					>
						{copiedField ? <Check size={15} /> : <Copy size={15} />}
					</IconButton>
				)}
			</div>
		</div>
	);
}
