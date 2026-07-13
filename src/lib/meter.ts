/** Logique de tonalité d'une jauge (Meter), isolée pour être testable. */

export type MeterTone = "ok" | "warn" | "danger";

export interface MeterToneOptions {
	low?: number;
	high?: number;
	/** ce qui est « bon » : valeurs hautes (défaut) ou basses */
	optimum?: "high" | "low";
}

/**
 * Tonalité d'une jauge selon la valeur (déjà clampée) et son pourcentage de
 * remplissage. Avec des seuils `low`/`high` explicites → couleur selon la qualité
 * (sens donné par `optimum`). Sans seuils → auto par niveau de remplissage
 * (≥ 85 % danger, ≥ 60 % warn, sinon ok).
 */
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
