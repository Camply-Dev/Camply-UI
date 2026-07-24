import type { RefObject } from "react";

export interface DismissLayer {
	/** Éléments qui comptent comme « intérieur » : le déclencheur ET la surface. */
	refs: Array<RefObject<HTMLElement | null>>;
	onClose: () => void;
}

/**
 * Pile des couches renvoyables (menus, popovers, listes…), du plus ancien au
 * plus récent. Sans elle : une seule Échap fermait TOUT le stack, et un portail
 * enfant (la liste d'un Select dans un Popover) comptait comme « extérieur »,
 * ce qui refermait le parent au premier clic.
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
	let deepest = -1;
	for (let i = stack.length - 1; i >= 0; i--) {
		if (containsTarget(stack[i], target)) {
			deepest = i;
			break;
		}
	}
	// On ne referme que ce qui est AU-DESSUS de la couche cliquée, du haut vers le bas.
	for (let i = stack.length - 1; i > deepest; i--) {
		stack[i].onClose();
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
