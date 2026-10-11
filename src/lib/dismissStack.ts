import type { RefObject } from "react";

export interface DismissLayer {
	/** Éléments qui comptent comme « intérieur » : le déclencheur ET la surface. */
	refs: Array<RefObject<HTMLElement | null>>;
	onClose: () => void;
	/**
	 * Couche que SEULE Échap referme : le clic extérieur ne la ferme pas.
	 * Un dialogue modal a déjà son voile pour ça, une couche de survol a
	 * `mouseleave` — mais tous deux doivent s'empiler pour qu'Échap n'en ferme
	 * qu'un à la fois. Ses `refs` comptent toujours comme intérieur : un clic
	 * dans le panneau d'un dialogue épargne les couches qu'il recouvre.
	 */
	escapeOnly?: boolean;
}

/**
 * Pile des couches renvoyables (menus, popovers, listes…), du plus ancien au
 * plus récent. Sans elle, une seule Échap fermerait TOUT le stack, et un portail
 * enfant (la liste d'un Select dans un Popover) compterait comme « extérieur »,
 * ce qui refermerait le parent au premier clic.
 */
const stack: DismissLayer[] = [];

const containsTarget = (layer: DismissLayer, target: Node) =>
	layer.refs.some((r) => r.current?.contains(target));

function onKeyDown(e: KeyboardEvent) {
	if (e.key !== "Escape" || stack.length === 0) return;
	// Seule la couche du sommet réagit : Échap ferme un niveau à la fois.
	stack[stack.length - 1].onClose();
}

function onPointerDown(e: PointerEvent) {
	const target = e.target as Node;
	// Couche la plus profonde qui contient la cible (-1 = clic hors de tout).
	// Toutes les couches peuvent contenir la cible, `escapeOnly` compris : un
	// dialogue ouvert depuis un Popover est portalisé hors du panneau de ce
	// dernier, et c'est sa propre couche qui doit arrêter la remontée.
	let deepest = -1;
	for (let i = stack.length - 1; i >= 0; i--) {
		if (containsTarget(stack[i], target)) {
			deepest = i;
			break;
		}
	}
	// On ne referme que ce qui est AU-DESSUS de la couche cliquée, du haut vers le
	// bas ; une couche `escapeOnly` n'est jamais fermée par le pointeur.
	for (let i = stack.length - 1; i > deepest; i--) {
		if (!stack[i].escapeOnly) stack[i].onClose();
	}
}

function listen() {
	document.addEventListener("keydown", onKeyDown);
	document.addEventListener("pointerdown", onPointerDown, true);
}
function unlisten() {
	document.removeEventListener("keydown", onKeyDown);
	document.removeEventListener("pointerdown", onPointerDown, true);
}

/** Empile une couche ; renvoie la fonction de dépilement. */
export function pushDismissLayer(layer: DismissLayer): () => void {
	if (stack.length === 0) listen();
	stack.push(layer);

	return () => {
		const i = stack.indexOf(layer);
		if (i !== -1) stack.splice(i, 1);
		if (stack.length === 0) unlisten();
	};
}
