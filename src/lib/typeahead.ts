import { type KeyboardEvent, useRef } from "react";
import { wrapIndex } from "./rovingIndex";

/** Délai au-delà duquel la saisie au clavier repart d'une nouvelle recherche. */
const RESET_AFTER = 500;

/** Le strict nécessaire d'un évènement : la recherche ne lit jamais le DOM elle-même. */
type Keystroke = Pick<KeyboardEvent, "key" | "ctrlKey" | "metaKey" | "altKey">;

/**
 * Recherche clavier d'une liste (menu, arbre), horloge et remise à zéro comprises :
 * cet état reste ici pour que chaque liste réponde à la frappe exactement de la même
 * façon. L'appelant ne fournit que des CHAÎNES et garde la conséquence du saut — le
 * menu déplace le focus DOM, l'arbre passe par son roving tabindex.
 */
export function useTypeahead() {
	const search = useRef({ query: "", at: 0 });

	/** À reposer quand la liste change de contexte (ouverture, fermeture). */
	const reset = () => {
		search.current = { query: "", at: 0 };
	};

	/** Index visé par la frappe ; `-1` si ce n'est pas une saisie ou si rien ne correspond. */
	const find = (e: Keystroke, labels: readonly (string | null | undefined)[], current: number) => {
		// Touche nommée (« Enter », « ArrowDown ») ou raccourci : ce n'est pas une saisie.
		if (e.key.length !== 1 || e.ctrlKey || e.metaKey || e.altKey || !e.key.trim()) return -1;

		// Accumuler la frappe : sans ça, taper « pa » sauterait aux entrées en « p »
		// puis à celles en « a » au lieu de viser « Paramètres ».
		const now = Date.now();
		const kept = now - search.current.at < RESET_AFTER ? search.current.query : "";
		const query = kept + e.key.toLowerCase();
		search.current = { query, at: now };

		// Une frappe isolée part de l'entrée suivante : retaper la même lettre après la
		// pause avance donc d'une entrée en « p » à la suivante. Dans la fenêtre, la
		// frappe s'accumule et affine sur place — « pp » rapide cherche la chaîne « pp ».
		const from = query.length > 1 && current >= 0 ? current : current + 1;
		for (let i = 0; i < labels.length; i++) {
			const at = wrapIndex(from + i, labels.length);
			if (labels[at]?.trim().toLowerCase().startsWith(query)) return at;
		}
		return -1;
	};

	return { find, reset };
}
