export function parseColor(v: string): { hex: string; alpha: number } {
	const s = v.trim();
	const hex6 = /^#([0-9a-f]{6})$/i.exec(s);
	if (hex6) return { hex: `#${hex6[1].toLowerCase()}`, alpha: 1 };
	const hex3 = /^#([0-9a-f]{3})$/i.exec(s);
	if (hex3) {
		const full = hex3[1]
			.split("")
			.map((c) => c + c)
			.join("");
		return { hex: `#${full.toLowerCase()}`, alpha: 1 };
	}
	const rgb = /^rgba?\(([^)]+)\)$/i.exec(s);
	if (rgb) {
		const parts = rgb[1].split(",").map((p) => p.trim());
		const [r, g, b] = parts.map(Number);
		const a = parts[3] != null ? Number(parts[3]) : 1;
		const hex = `#${[r, g, b].map((n) => Math.round(n).toString(16).padStart(2, "0")).join("")}`;
		return { hex, alpha: Number.isNaN(a) ? 1 : a };
	}
	return { hex: "#000000", alpha: 1 };
}

export function toCss(hex: string, alpha: number): string {
	if (alpha >= 1) return hex.toLowerCase();
	const int = parseInt(hex.slice(1), 16);
	const rounded = Math.round(alpha * 100) / 100;
	return `rgba(${(int >> 16) & 255}, ${(int >> 8) & 255}, ${int & 255}, ${rounded})`;
}
