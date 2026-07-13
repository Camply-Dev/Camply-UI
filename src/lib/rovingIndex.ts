/** Arithmétique d'index bouclé, partagée par les groupes navigables au clavier. */

export type Orientation = "horizontal" | "vertical";

/** Ramène un index dans [0, length) en bouclant (gère les valeurs négatives). */
export function wrapIndex(value: number, length: number): number {
	return ((value % length) + length) % length;
}

/** Prochain index d'un roving-tabindex selon la touche : flèche → voisin bouclé
 *  (axe selon `orientation`), Home → 0, End → count-1. `null` si la touche n'est
 *  pas une touche de navigation. */
export function nextRovingIndex(
	key: string,
	current: number,
	count: number,
	orientation: Orientation = "horizontal",
): number | null {
	const nextKey = orientation === "vertical" ? "ArrowDown" : "ArrowRight";
	const prevKey = orientation === "vertical" ? "ArrowUp" : "ArrowLeft";
	if (key === nextKey) return wrapIndex(current + 1, count);
	if (key === prevKey) return wrapIndex(current - 1, count);
	if (key === "Home") return 0;
	if (key === "End") return count - 1;
	return null;
}
