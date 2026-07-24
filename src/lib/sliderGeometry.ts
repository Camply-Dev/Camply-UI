import { clamp } from "./clamp";

/** Nombre de décimales d'un pas (0.1 -> 1, 0.25 -> 2, 1 -> 0). */
function decimalsOf(step: number): number {
	const [, decimals = ""] = String(step).split(".");
	return decimals.length;
}

/**
 * Cale une valeur sur le pas le plus proche, puis la borne à [min, max].
 * L'arrondi final à la précision du pas évite les flottants dérivés
 * (0.1 + 0.2 -> 0.30000000000000004) qui remonteraient jusqu'à l'API publique.
 */
export function snapToStep(value: number, min: number, max: number, step: number): number {
	if (!Number.isFinite(value) || step <= 0) return clamp(min, min, max);
	const stepped = Math.round((value - min) / step) * step + min;
	const rounded = Number(stepped.toFixed(decimalsOf(step)));
	return clamp(rounded, min, max);
}

export function ratioToValue(clientX: number, rect: DOMRect, min: number, max: number): number {
	if (rect.width === 0) return min;
	const ratio = (clientX - rect.left) / rect.width;
	return min + ratio * (max - min);
}

/** Position en % dans la piste. Renvoie 0 si la plage est nulle (évite NaN dans le DOM). */
export function valueToPercent(value: number, min: number, max: number): number {
	if (max === min) return 0;
	return clamp(((value - min) / (max - min)) * 100, 0, 100);
}
