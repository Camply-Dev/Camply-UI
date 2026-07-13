/** Logique de tri d'un tableau, isolée du composant Table pour la testabilité. */

export type SortDir = "asc" | "desc";
export interface SortState {
	key: string;
	dir: SortDir;
}

/** Renvoie une copie triée de `rows` selon `sortValue` et la direction. */
export function sortRows<Row>(
	rows: Row[],
	sortValue: (row: Row) => string | number,
	dir: SortDir,
): Row[] {
	const factor = dir === "asc" ? 1 : -1;
	return [...rows].sort((a, b) => {
		const va = sortValue(a);
		const vb = sortValue(b);
		if (va < vb) return -1 * factor;
		if (va > vb) return 1 * factor;
		return 0;
	});
}

/** Prochain état de tri au clic sur une colonne : autre colonne → asc ; asc → desc ;
 *  desc → null (retour à l'ordre d'origine). */
export function nextSortState(prev: SortState | null, key: string): SortState | null {
	if (prev?.key !== key) return { key, dir: "asc" };
	if (prev.dir === "asc") return { key, dir: "desc" };
	return null;
}
