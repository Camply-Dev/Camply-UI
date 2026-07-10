import {
	type CSSProperties,
	type PointerEvent,
	useCallback,
	useEffect,
	useRef,
	useState,
} from "react";
import { cn } from "../../lib/cn";
import { Check, Copy } from "../../lib/icons";
import { useControllable } from "../../lib/useControllable";
import { IconButton } from "../IconButton";
export interface ColorPickerProps {
	/** controlled hex value, e.g. "#38bdf8" */
	value?: string;
	defaultValue?: string;
	onChange?: (hex: string) => void;
	label?: string;
	/** show the copy-hex button */
	copyable?: boolean;
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
 * Full color picker: saturation/value square + hue slider, with live HEX & RGB
 * readout. Drag or click either surface. Controllable via value/onChange.
 */
export function ColorPicker({
	value,
	defaultValue = "#38bdf8",
	onChange,
	label,
	copyable = true,
	className,
	style,
}: ColorPickerProps) {
	const [hex, setHex] = useControllable<string>(value, defaultValue, onChange);
	const [hsv, setHsv] = useState<[number, number, number]>(() => {
		const rgb = parseHex(hex) ?? [56, 189, 248];
		return rgbToHsv(...rgb);
	});
	const [copied, setCopied] = useState(false);
	const svRef = useRef<HTMLDivElement>(null);
	const hueRef = useRef<HTMLDivElement>(null);

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

	const dragSV = (e: PointerEvent) => {
		const el = svRef.current;
		if (!el) return;
		const move = (clientX: number, clientY: number) => {
			const r = el.getBoundingClientRect();
			const s = Math.max(0, Math.min(1, (clientX - r.left) / r.width));
			const v = Math.max(0, Math.min(1, 1 - (clientY - r.top) / r.height));
			commit(hsv[0], s, v);
		};
		move(e.clientX, e.clientY);
		const onMove = (ev: globalThis.PointerEvent) => move(ev.clientX, ev.clientY);
		const onUp = () => {
			window.removeEventListener("pointermove", onMove);
			window.removeEventListener("pointerup", onUp);
		};
		window.addEventListener("pointermove", onMove);
		window.addEventListener("pointerup", onUp);
	};

	const dragHue = (e: PointerEvent) => {
		const el = hueRef.current;
		if (!el) return;
		const move = (clientX: number) => {
			const r = el.getBoundingClientRect();
			const h = Math.max(0, Math.min(360, ((clientX - r.left) / r.width) * 360));
			commit(h, hsv[1], hsv[2]);
		};
		move(e.clientX);
		const onMove = (ev: globalThis.PointerEvent) => move(ev.clientX);
		const onUp = () => {
			window.removeEventListener("pointermove", onMove);
			window.removeEventListener("pointerup", onUp);
		};
		window.addEventListener("pointermove", onMove);
		window.addEventListener("pointerup", onUp);
	};

	const [h, s, v] = hsv;
	const [r, g, b] = hsvToRgb(h, s, v);
	const hueHex = toHex(h, 1, 1);

	const copy = async () => {
		try {
			await navigator.clipboard?.writeText(hex);
			setCopied(true);
			setTimeout(() => setCopied(false), 1400);
		} catch {
			/* noop */
		}
	};

	return (
		<div className={cn("camply-colorpicker__root", className)} style={style}>
			{label && <span className={"camply-colorpicker__label"}>{label}</span>}

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
					style={{ left: `${s * 100}%`, top: `${(1 - v) * 100}%`, background: hex }}
				/>
			</div>

			<div ref={hueRef} className={"camply-colorpicker__hue"} onPointerDown={dragHue}>
				<span
					className={"camply-colorpicker__hueKnob"}
					style={{ left: `${(h / 360) * 100}%`, background: hueHex }}
				/>
			</div>

			<div className={"camply-colorpicker__readout"}>
				<span className={"camply-colorpicker__preview"} style={{ background: hex }} />
				<div className={"camply-colorpicker__field"}>
					<span className={"camply-colorpicker__fieldLabel"}>HEX</span>
					<span className={"camply-colorpicker__fieldValue"}>{hex.toUpperCase()}</span>
				</div>
				<div className={"camply-colorpicker__field"}>
					<span className={"camply-colorpicker__fieldLabel"}>RGB</span>
					<span className={"camply-colorpicker__fieldValue"}>
						{r}, {g}, {b}
					</span>
				</div>
				{copyable && (
					<IconButton
						label={copied ? "Copié" : "Copier"}
						variant="secondary"
						size="md"
						onClick={copy}
					>
						{copied ? <Check size={15} /> : <Copy size={15} />}
					</IconButton>
				)}
			</div>
		</div>
	);
}
