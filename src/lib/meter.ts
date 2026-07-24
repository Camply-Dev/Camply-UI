export type MeterTone = "ok" | "warn" | "danger";

export interface MeterToneOptions {
	low?: number;
	high?: number;
	optimum?: "high" | "low";
}

export function meterTone(
	clamped: number,
	pct: number,
	{ low, high, optimum = "high" }: MeterToneOptions,
): MeterTone {
	if (low != null && high != null) {
		const inLow = clamped < low;
		const inHigh = clamped >= high;
		if (optimum === "high") return inLow ? "danger" : inHigh ? "ok" : "warn";
		return inHigh ? "danger" : inLow ? "ok" : "warn";
	}
	return pct >= 85 ? "danger" : pct >= 60 ? "warn" : "ok";
}
