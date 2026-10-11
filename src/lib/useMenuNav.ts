import { type KeyboardEvent, type RefObject, useEffect } from "react";
import { wrapIndex } from "./rovingIndex";
import { useTypeahead } from "./typeahead";

/**
 * Navigation clavier ARIA APG d'un menu (DropdownMenu, Menubar) :
 * flèches, Home/End et saisie au clavier (typeahead). Le focus DOM se déplace
 * réellement d'un `[role="menuitem"]` à l'autre — sans ça, un menu portalisé
 * n'est atteignable ni au Tab ni aux flèches.
 */
export function useMenuNav(containerRef: RefObject<HTMLElement | null>, open: boolean) {
	const typeahead = useTypeahead();

	const items = () => {
		const el = containerRef.current;
		if (!el) return [] as HTMLElement[];
		return [...el.querySelectorAll<HTMLElement>('[role="menuitem"]:not([disabled])')];
	};

	// À l'ouverture, le focus entre dans le menu (première entrée active).
	// biome-ignore lint/correctness/useExhaustiveDependencies: containerRef est un RefObject stable
	useEffect(() => {
		// Chaque ouverture/fermeture repart d'une recherche vierge : sans ça, les
		// frappes de la fois précédente se recolleraient aux nouvelles pendant 500 ms.
		typeahead.reset();
		if (!open) return;
		const id = requestAnimationFrame(() => items()[0]?.focus());
		return () => cancelAnimationFrame(id);
	}, [open]);

	const onKeyDown = (e: KeyboardEvent) => {
		const list = items();
		if (list.length === 0) return;

		const current = list.indexOf(document.activeElement as HTMLElement);
		const focusAt = (i: number) => {
			e.preventDefault();
			list[wrapIndex(i, list.length)].focus();
		};

		if (e.key === "ArrowDown") return focusAt(current + 1);
		if (e.key === "ArrowUp") return focusAt(current - 1);
		if (e.key === "Home") return focusAt(0);
		if (e.key === "End") return focusAt(list.length - 1);

		// Typeahead : le texte des entrées est lu dans le DOM, la recherche elle-même
		// est partagée avec l'arbre (src/lib/typeahead.ts).
		const labels = list.map((el) => el.textContent);
		const at = typeahead.find(e, labels, current);
		if (at === -1) return;
		e.preventDefault();
		list[at].focus();
	};

	return { onKeyDown };
}
