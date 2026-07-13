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
	value?: string;
	defaultValue?: string;
	onChange?: (hex: string) => void;
	alpha?: number;
	defaultAlpha?: number;
	onAlphaChange?: (alpha: number) => void;
	label?: string;
	variant?: "full" | "compact" | "swatch";
	className?: string;
	style?: CSSProperties;
}

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

	const internalCommit = useRef(false);

	const commit = useCallback(
		(h: number, s: number, v: number) => {
			internalCommit.current = true;
			setHsv([h, s, v]);
			setHex(toHex(h, s, v));
		},
		[setHex],
	);

	useEffect(() => {
		if (internalCommit.current) {
			internalCommit.current = false;
			return;
		}
		const rgb = parseHex(hex);
		if (rgb) setHsv(rgbToHsv(...rgb));
	}, [hex]);

	const compact = variant === "compact";
	const floating = variant === "compact" || variant === "swatch";
	const [open, setOpen] = useState(false);
	const triggerRef = useRef<HTMLButtonElement>(null);
	const panelRef = useRef<HTMLDivElement>(null);
	const closeTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
	const draggingRef = useRef(false);
	const focusedRef = useRef(false);

	const anchorStyle = useAnchor(triggerRef, panelRef, open, { placement: "bottom-start", gap: 8 });
	const close = useCallback(() => setOpen(false), []);
	useDismiss(open && floating, close, [triggerRef, panelRef]);

	const openNow = () => {
		clearTimeout(closeTimer.current);
		setOpen(true);
	};
	const scheduleClose = () => {
		clearTimeout(closeTimer.current);
		const tick = () => {
			if (draggingRef.current || focusedRef.current) closeTimer.current = setTimeout(tick, 150);
			else setOpen(false);
		};
		closeTimer.current = setTimeout(tick, 200);
	};
	useEffect(() => () => clearTimeout(closeTimer.current), []);

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
	const rgbaFill = `rgba(${r}, ${g}, ${b}, ${alpha})`;
	const alphaByte = Math.round(alpha * 255)
		.toString(16)
		.padStart(2, "0");
	const alphaRounded = Math.round(alpha * 100) / 100;
	const hexOut = (alpha < 1 ? `${hex}${alphaByte}` : hex).toUpperCase();
	const rgbOut = alpha < 1 ? `${r}, ${g}, ${b}, ${alphaRounded}` : `${r}, ${g}, ${b}`;

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

			<div
				ref={alphaRef}
				className={"camply-checkerboard camply-colorpicker__alpha"}
				onPointerDown={dragAlpha}
			>
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

	if (variant === "swatch") {
		return (
			<div
				className={cn(
					"camply-field",
					"camply-colorpicker__root",
					"camply-colorpicker__swatchOnly",
					className,
				)}
				style={style}
			>
				{label && <span className={"camply-field__label"}>{label}</span>}
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
					className={cn(
						"camply-checkerboard",
						"camply-focus-ring",
						"camply-colorpicker__swatch",
						"camply-colorpicker__swatchTrigger",
					)}
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
				className={cn(
					"camply-field",
					"camply-colorpicker__root",
					"camply-colorpicker__compact",
					className,
				)}
				style={style}
			>
				{label && <span className={"camply-field__label"}>{label}</span>}
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
					className={cn(
						"camply-field-shell",
						"camply-focus-ring",
						"camply-colorpicker__trigger",
						open && "camply-field-shell--open",
					)}
					onMouseEnter={openNow}
					onMouseLeave={scheduleClose}
					onFocus={openNow}
					onClick={openNow}
				>
					<span className={"camply-checkerboard camply-colorpicker__swatch"} aria-hidden="true">
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
					<span className={cn("camply-chevron", open && "camply-chevron--open")} aria-hidden="true">
						<ChevronDown size={16} />
					</span>
				</button>
				{floatingPanel}
			</div>
		);
	}

	return (
		<div className={cn("camply-field", "camply-colorpicker__root", className)} style={style}>
			{label && <span className={"camply-field__label"}>{label}</span>}
			{pickerCore}
			{editFields}
		</div>
	);
}
