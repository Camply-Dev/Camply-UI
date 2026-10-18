export type SortDir = "asc" | "desc";
export interface SortState {
	key: string;
	dir: SortDir;
}

/**
 * Trie sans muter. Les textes se comparent comme on les lit (`Intl.Collator` de la
 * locale : « Émile » avec les E, « alice » avec « Alice », « 9 » avant « 10 ») ;
 * comparer par `<` rangeait les majuscules avant les minuscules et les lettres
 * accentuées après le « z ». Les nombres, par leur valeur.
 */
export function sortRows<Row>(
	rows: Row[],
	sortValue: (row: Row) => string | number,
	dir: SortDir,
	locale?: string,
): Row[] {
	const factor = dir === "asc" ? 1 : -1;
	const collator = new Intl.Collator(locale, { numeric: true, sensitivity: "base" });
	return [...rows].sort((a, b) => {
		const va = sortValue(a);
		const vb = sortValue(b);
		if (typeof va === "string" && typeof vb === "string") return collator.compare(va, vb) * factor;
		if (va < vb) return -1 * factor;
		if (va > vb) return 1 * factor;
		return 0;
	});
}

export function nextSortState(prev: SortState | null, key: string): SortState | null {
	if (prev?.key !== key) return { key, dir: "asc" };
	if (prev.dir === "asc") return { key, dir: "desc" };
	return null;
}
