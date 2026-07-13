export type Rgb = [number, number, number];
export interface ParsedColor {
	rgb: Rgb;
	alpha?: number;
}

export function hsvToRgb(h: number, s: number, v: number): Rgb {
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

export function rgbToHsv(r: number, g: number, b: number): Rgb {
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

export const toHex = (h: number, s: number, v: number) =>
	"#" +
	hsvToRgb(h, s, v)
		.map((n) => n.toString(16).padStart(2, "0"))
		.join("");

export function parseHex(hex: string): Rgb | null {
	const m = /^#?([0-9a-f]{6})$/i.exec(hex.trim());
	if (!m) return null;
	const int = parseInt(m[1], 16);
	return [(int >> 16) & 255, (int >> 8) & 255, int & 255];
}

export function parseColorInput(text: string): ParsedColor | null {
	let s = text.trim().replace(/^#/, "").toLowerCase();
	if (/^[0-9a-f]{3}$/.test(s)) {
		s = s
			.split("")
			.map((ch) => ch + ch)
			.join("");
	}
	if (/^[0-9a-f]{6}$/.test(s)) {
		const int = parseInt(s, 16);
		return { rgb: [(int >> 16) & 255, (int >> 8) & 255, int & 255] };
	}
	if (/^[0-9a-f]{8}$/.test(s)) {
		const int = parseInt(s.slice(0, 6), 16);
		return {
			rgb: [(int >> 16) & 255, (int >> 8) & 255, int & 255],
			alpha: parseInt(s.slice(6, 8), 16) / 255,
		};
	}
	return null;
}

export function parseRgbInput(text: string): ParsedColor | null {
	let parts = text.split(",").map((p) => p.trim());
	if (parts.length > 0 && parts[parts.length - 1] === "") parts = parts.slice(0, -1);
	if (parts.length < 3 || parts.length > 4 || parts.some((p) => p === "")) return null;
	const nums = parts.map(Number);
	if (nums.some((n) => Number.isNaN(n))) return null;
	const [r, g, b, a] = nums;
	if ([r, g, b].some((n) => n < 0 || n > 255)) return null;
	const rgb: Rgb = [Math.round(r), Math.round(g), Math.round(b)];
	if (parts.length === 4) {
		if (a < 0 || a > 1) return null;
		return { rgb, alpha: a };
	}
	return { rgb };
}

function clampChannel(digits: string): string {
	const d = digits.slice(0, 3);
	return d !== "" && Number(d) > 255 ? "255" : d;
}

function packChannels(digits: string, channels: string[]): void {
	let cur = "";
	for (const ch of digits) {
		if (channels.length >= 3) break;
		const candidate = cur + ch;
		if (channels.length === 2) {
			if (cur.length >= 3) continue;
			cur = Number(candidate) > 255 ? "255" : candidate;
		} else if (cur.length >= 3 || Number(candidate) > 255) {
			channels.push(cur);
			cur = ch;
		} else {
			cur = candidate;
		}
	}
	if (cur !== "" && channels.length < 3) channels.push(cur);
}

export function maskRgb(raw: string): string {
	const segs = raw.split(",");
	const channels: string[] = [];
	let alpha: string | null = null;
	for (let i = 0; i < segs.length; i++) {
		if (channels.length >= 3) {
			const a = segs
				.slice(i)
				.join("")
				.replace(/[^0-9.]/g, "");
			const dot = a.indexOf(".");
			alpha = dot === -1 ? a : a.slice(0, dot + 1) + a.slice(dot + 1).replace(/\./g, "");
			break;
		}
		const digits = segs[i].replace(/\D/g, "");
		if (i === segs.length - 1) packChannels(digits, channels);
		else channels.push(clampChannel(digits));
	}
	let out = channels.slice(0, 3).join(", ");
	if (alpha !== null) out += `, ${alpha}`;
	else if (channels.length < 3 && /,\s*$/.test(raw)) out += ", ";
	return out;
}
