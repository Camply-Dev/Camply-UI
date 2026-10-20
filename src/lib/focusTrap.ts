import { isInDismissLayer } from "./dismissStack";

const FOCUSABLE = [
	"a[href]",
	"button:not([disabled])",
	"input:not([disabled]):not([type='hidden'])",
	"select:not([disabled])",
	"textarea:not([disabled])",
	"iframe",
	"audio[controls]",
	"video[controls]",
	"details > summary",
	"[contenteditable]:not([contenteditable='false'])",
	"[tabindex]:not([tabindex='-1'])",
].join(",");

/**
 * `inert` retire tout le sous-arbre de l'ordre de tabulation : sans ce filtre, la
 * liste contiendrait des éléments que le navigateur saute (diapositives masquées
 * d'un Carousel, par exemple) et le piège ne boucle jamais sur le bon élément.
 * La remontée s'arrête à `container` : un `inert` posé par l'application PLUS HAUT
 * ne doit pas vider la liste et avaler le Tab.
 */
function inInertSubtree(el: HTMLElement, container: HTMLElement): boolean {
	for (let node: HTMLElement | null = el; node && node !== container; node = node.parentElement) {
		if (node.hasAttribute("inert")) return true;
	}
	return false;
}

/** Un candidat que le clavier atteint vraiment : visible et hors d'un sous-arbre inerte. */
function isReachable(el: HTMLElement, container: HTMLElement): boolean {
	return (
		!inInertSubtree(el, container) &&
		(el.offsetWidth > 0 || el.offsetHeight > 0 || el === document.activeElement)
	);
}

/**
 * Premier et dernier éléments focalisables d'un conteneur, cherchés depuis chaque
 * bout : seuls les bords sont mesurés. Mesurer TOUTE la liste à chaque Tab
 * (`offsetWidth` force la mise en page, et celle de chaque bloc en
 * `content-visibility: auto` traversé) figeait un dialogue de quelques centaines
 * de boutons ; le piège n'a besoin que des deux bouts.
 */
export function focusEdges(container: HTMLElement): {
	first: HTMLElement | undefined;
	last: HTMLElement | undefined;
} {
	const candidates = container.querySelectorAll<HTMLElement>(FOCUSABLE);
	let first: HTMLElement | undefined;
	let last: HTMLElement | undefined;
	for (let i = 0; i < candidates.length && !first; i++) {
		if (isReachable(candidates[i], container)) first = candidates[i];
	}
	for (let i = candidates.length - 1; i >= 0 && !last; i--) {
		if (isReachable(candidates[i], container)) last = candidates[i];
	}
	return { first, last };
}

/**
 * Fait entrer le focus dans `panel` à l'ouverture, sauf s'il y est déjà (un
 * contrôle `autoFocus` le garde) : `preferred`, sinon le premier focalisable,
 * sinon le panneau lui-même.
 */
export function focusInto(panel: HTMLElement, preferred?: HTMLElement | null): void {
	if (panel.contains(document.activeElement)) return;
	(preferred ?? focusEdges(panel).first ?? panel).focus();
}

/**
 * Ce Tab (ou Maj+Tab) quitte-t-il `panel` par son bout ? Vrai depuis le dernier
 * focalisable (le premier), depuis le panneau lui-même, ou si rien n'y est
 * focalisable. Un panneau portalisé referme alors et rend le focus au
 * déclencheur : le navigateur l'enverrait en fin de page.
 */
export function tabLeavesPanel(
	e: Pick<KeyboardEvent, "key" | "shiftKey">,
	panel: HTMLElement,
): boolean {
	if (e.key !== "Tab") return false;
	const { first, last } = focusEdges(panel);
	const edge = e.shiftKey ? first : last;
	const active = document.activeElement;
	return !edge || active === edge || active === panel;
}

/**
 * Rend le focus au déclencheur s'il était dans `panel` : un panneau portalisé qui
 * se démonte le laisserait retomber sur <body>. À appeler AVANT de refermer.
 * Après un clic extérieur, le navigateur le pose ensuite où l'on a cliqué.
 */
export function restoreFocus(panel: HTMLElement | null, trigger: HTMLElement | null | undefined) {
	if (panel?.contains(document.activeElement)) trigger?.focus();
}

/**
 * Boucle le focus dans `container` sur Tab / Shift+Tab.
 * À brancher sur un `keydown`. Renvoie true si l'événement a été pris en charge.
 */
export function trapTab(e: KeyboardEvent, container: HTMLElement): boolean {
	if (e.key !== "Tab") return false;

	const { first, last } = focusEdges(container);
	if (!first || !last) {
		// Rien de focalisable : on garde le focus sur le conteneur lui-même.
		e.preventDefault();
		container.focus();
		return true;
	}

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
	// Sauf s'il est dans une autre couche ouverte (un menu portalisé, ouvert depuis
	// le dialogue) : c'est elle qui gère Tab, se referme et rend le focus.
	if (active instanceof HTMLElement && !container.contains(active)) {
		if (isInDismissLayer(active)) return false;
		e.preventDefault();
		first.focus();
		return true;
	}
	return false;
}
