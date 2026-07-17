const FOCUSABLE = [
	"a[href]",
	"button:not([disabled])",
	"input:not([disabled]):not([type='hidden'])",
	"select:not([disabled])",
	"textarea:not([disabled])",
	"[tabindex]:not([tabindex='-1'])",
].join(",");

/** Éléments réellement focalisables d'un conteneur (visibles et non inertes). */
export function focusableWithin(container: HTMLElement): HTMLElement[] {
	return [...container.querySelectorAll<HTMLElement>(FOCUSABLE)].filter(
		(el) => el.offsetWidth > 0 || el.offsetHeight > 0 || el === document.activeElement,
	);
}

/**
 * Boucle le focus dans `container` sur Tab / Shift+Tab.
 * À brancher sur un `keydown`. Renvoie true si l'événement a été pris en charge.
 */
export function trapTab(e: KeyboardEvent, container: HTMLElement): boolean {
	if (e.key !== "Tab") return false;

	const items = focusableWithin(container);
	if (items.length === 0) {
		// Rien de focalisable : on garde le focus sur le conteneur lui-même.
		e.preventDefault();
		container.focus();
		return true;
	}

	const first = items[0];
	const last = items[items.length - 1];
	const active = document.activeElement;

	if (e.shiftKey && (active === first || active === container)) {
		e.preventDefault();
		last.focus();
		return true;
	}
	if (!e.shiftKey && active === last) {
		e.preventDefault();
		first.focus();
		return true;
	}
	// Le focus a fui hors du conteneur (ex. via la barre d'adresse) : on le rapatrie.
	if (active instanceof HTMLElement && !container.contains(active)) {
		e.preventDefault();
		first.focus();
		return true;
	}
	return false;
}
