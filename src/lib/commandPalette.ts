/**
 * Filtrage et regroupement des commandes de la CommandPalette (pur, testable).
 * Générique sur une forme minimale (label + keywords/group optionnels) pour ne
 * pas dépendre du type public `Command` du composant.
 */

interface CommandLike {
	label: string;
	keywords?: string;
	group?: string;
}

/** Filtre par sous-chaîne insensible à la casse sur label + keywords + group. */
export function filterCommands<T extends CommandLike>(commands: T[], query: string): T[] {
	const q = query.trim().toLowerCase();
	if (!q) return commands;
	return commands.filter((c) =>
		`${c.label} ${c.keywords ?? ""} ${c.group ?? ""}`.toLowerCase().includes(q),
	);
}

export interface GroupedCommands<T> {
	byGroup: Map<string, T[]>;
	/** toutes les commandes à plat, dans l'ordre d'affichage */
	flat: T[];
	/** index à plat de chaque commande (évite un indexOf O(n) par ligne rendue) */
	index: Map<T, number>;
}

/** Regroupe par `group` en préservant l'ordre de première apparition des groupes,
 *  et fournit la liste à plat + l'index de chaque commande pour la nav clavier. */
export function groupCommands<T extends CommandLike>(commands: T[]): GroupedCommands<T> {
	const byGroup = new Map<string, T[]>();
	for (const cmd of commands) {
		const key = cmd.group ?? "";
		const list = byGroup.get(key);
		if (list) list.push(cmd);
		else byGroup.set(key, [cmd]);
	}
	const flat: T[] = [];
	const index = new Map<T, number>();
	for (const list of byGroup.values()) {
		for (const cmd of list) {
			index.set(cmd, flat.length);
			flat.push(cmd);
		}
	}
	return { byGroup, flat, index };
}
