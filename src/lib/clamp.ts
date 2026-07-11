/** Borne une valeur entre min et max. Remplace le piège classique
 *  `Math.max(min, Math.min(max, v))` répété un peu partout dans la lib. */
export const clamp = (value: number, min: number, max: number): number =>
	Math.max(min, Math.min(max, value));
